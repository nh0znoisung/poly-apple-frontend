import { useEffect, useRef, useState, useCallback } from 'react';
import { useGameContext, SCREENS } from '../../context/GameContext.jsx';
import { useSocket, useSocketEvent } from '../../hooks/useSocket.js';
import { GameState } from '../../lib/GameState.js';
import { InputParser } from '../../lib/InputParser.js';
import { TimerManager } from '../../lib/TimerManager.js';
import { Fireworks } from '../../lib/Fireworks.js';
import { soundManager } from '../../lib/SoundManager.js';
import { AVATARS } from '../../constants/avatars.js';
import GameCanvas from './GameCanvas.jsx';
import GameHUD from './GameHUD.jsx';

function Avatar({ avatarIndex, size = 44, borderColor }) {
  const av = AVATARS[avatarIndex] || AVATARS[0];
  return (
    <div
      style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${borderColor || av.color}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'white', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: av.svg }}
    />
  );
}

/* Botanical vine decorations for the background corners */
const VineTL = () => (
  <svg className="gs-vine gs-vine-tl" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 215 Q50 140 130 70 Q90 100 105 155 Q75 110 160 45" stroke="#7a5c2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M5 215 Q35 160 80 120 Q55 145 90 180" stroke="#8d6e38" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
    <ellipse cx="130" cy="70" rx="12" ry="7" fill="#4a7c3f" transform="rotate(-40 130 70)" opacity="0.85"/>
    <ellipse cx="105" cy="155" rx="10" ry="6" fill="#3d6e34" transform="rotate(25 105 155)" opacity="0.75"/>
    <ellipse cx="60" cy="125" rx="9" ry="5" fill="#5a8c4a" transform="rotate(-60 60 125)" opacity="0.7"/>
    <ellipse cx="160" cy="45" rx="11" ry="6" fill="#4a7c3f" transform="rotate(-20 160 45)" opacity="0.8"/>
    <ellipse cx="80" cy="120" rx="7" ry="4" fill="#5a8c4a" transform="rotate(50 80 120)" opacity="0.65"/>
  </svg>
);

const VineBL = () => (
  <svg className="gs-vine gs-vine-bl" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 5 Q50 80 130 150 Q90 120 105 65 Q75 110 160 175" stroke="#7a5c2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M5 5 Q35 60 80 100 Q55 75 90 40" stroke="#8d6e38" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
    <ellipse cx="130" cy="150" rx="12" ry="7" fill="#4a7c3f" transform="rotate(40 130 150)" opacity="0.85"/>
    <ellipse cx="105" cy="65" rx="10" ry="6" fill="#3d6e34" transform="rotate(-25 105 65)" opacity="0.75"/>
    <ellipse cx="60" cy="95" rx="9" ry="5" fill="#5a8c4a" transform="rotate(60 60 95)" opacity="0.7"/>
    <ellipse cx="160" cy="175" rx="11" ry="6" fill="#4a7c3f" transform="rotate(20 160 175)" opacity="0.8"/>
    <ellipse cx="80" cy="100" rx="7" ry="4" fill="#5a8c4a" transform="rotate(-50 80 100)" opacity="0.65"/>
  </svg>
);

const VineTR = () => (
  <svg className="gs-vine gs-vine-tr" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M215 215 Q170 140 90 70 Q130 100 115 155 Q145 110 60 45" stroke="#7a5c2e" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <ellipse cx="90" cy="70" rx="12" ry="7" fill="#4a7c3f" transform="rotate(40 90 70)" opacity="0.85"/>
    <ellipse cx="115" cy="155" rx="10" ry="6" fill="#3d6e34" transform="rotate(-25 115 155)" opacity="0.75"/>
    <ellipse cx="60" cy="45" rx="11" ry="6" fill="#4a7c3f" transform="rotate(20 60 45)" opacity="0.8"/>
  </svg>
);

function reasonVerb(reason) {
  if (reason === 'surrender') return 'surrendered';
  if (reason === 'exit') return 'left';
  return 'disconnected';
}

function buildReasonText(reason, loserNum, p1, p2) {
  if (reason === 'surrender' || reason === 'exit' || reason === 'disconnect') {
    const loser = loserNum === 1 ? p1 : p2;
    const winner = loserNum === 1 ? p2 : p1;
    const verb = reasonVerb(reason);
    const wasLeading = loser.score > winner.score;
    if (wasLeading) {
      const tail = reason === 'surrender' ? ' — a noble concession.' : '.';
      return `${loser.name} ${verb} while leading${tail}`;
    }
    const suffix = verb === 'left' ? ' early' : '';
    return `${loser.name} ${verb}${suffix}.`;
  }
  if (reason === 'apples_cleared') return 'All apples eaten!';
  if (reason === 'timeout') return 'Time ran out';
  return '';
}

function buildWinnerMessage(isDraw, isP1Winner, myPlayerNum, p1, p2) {
  if (isDraw) return '🤝 Draw!';
  if (myPlayerNum === 1 || myPlayerNum === 2) {
    const iWon = (myPlayerNum === 1) ? isP1Winner : !isP1Winner;
    return iWon ? '🏆 Victory!' : '😤 Defeat';
  }
  const winnerName = isP1Winner ? p1.name : p2.name;
  return `🏆 ${winnerName} Wins!`;
}

export default function GameScreen() {
  const {
    screen, myPlayerNum, myName, myAvatarIndex,
    opponentName, opponentAvatarIndex, roomConfig, applePositions,
    roomCode, spectating,
    summaryData, viewingFinishedGame,
    endGame, backToSummary, reset,
  } = useGameContext();
  const { socketRef } = useSocket();
  const isViewOnly = viewingFinishedGame && !!summaryData;

  const p1AvatarIndex = myPlayerNum === 2 ? opponentAvatarIndex : myAvatarIndex;
  const p2AvatarIndex = myPlayerNum === 2 ? myAvatarIndex : opponentAvatarIndex;

  const gameStateRef       = useRef(null);
  const timerRef           = useRef(null);
  const fireworksCanvasRef = useRef(null);
  const fireworksRef       = useRef(null);
  const canvasCompRef      = useRef(null);

  const cfg = roomConfig || {};

  const [p1Score, setP1Score]     = useState(0);
  const [p2Score, setP2Score]     = useState(0);
  const [p1Expr, setP1Expr]       = useState(0);
  const [p2Expr, setP2Expr]       = useState(0);
  const [p1Penalty, setP1Penalty] = useState(1);
  const [p2Penalty, setP2Penalty] = useState(1);
  const [applesLeft, setApplesLeft] = useState(0);
  const [timerDisplay, setTimerDisplay] = useState('01:00');
  const [equationValue, setEquationValue] = useState('');
  const [errorMsg, setErrorMsg]   = useState('');
  const [history, setHistory]     = useState([]);
  const [myCooldown, setMyCooldown] = useState(0);

  const player1Name = myPlayerNum === 2 ? opponentName : myName;
  const player2Name = myPlayerNum === 2 ? myName : opponentName;

  useEffect(() => {
    if (screen !== SCREENS.GAME) return;

    if (isViewOnly) {
      // Build a frozen GameState from the canonical server payload
      const raw = summaryData.raw;
      const gs = new GameState(
        raw.p1.name, raw.p2.name,
        cfg.appleDensity ?? 0.35,
        cfg.timePerTurn  ?? 60,
        raw.applePositions,
        raw.gridSize ?? cfg.gridSize ?? 10,
      );
      raw.eatenApples.forEach(a => {
        const apple = gs.apples.find(x => x.x === a.x && x.y === a.y);
        if (apple) { apple.eaten = true; apple.eatenBy = a.owner; }
      });
      gs.player1.score = raw.p1.score;
      gs.player2.score = raw.p2.score;
      gs.player1.expressionsUsed = raw.p1.expressionsUsed;
      gs.player2.expressionsUsed = raw.p2.expressionsUsed;
      gs.player1.history = raw.p1.history;
      gs.player2.history = raw.p2.history;
      gs.player1.eatenApples = raw.p1.eatenApples;
      gs.player2.eatenApples = raw.p2.eatenApples;
      gs.gameOver = true;
      gameStateRef.current = gs;

      setP1Score(raw.p1.score);
      setP2Score(raw.p2.score);
      setP1Expr(raw.p1.expressionsUsed);
      setP2Expr(raw.p2.expressionsUsed);
      setApplesLeft(raw.remainingApples);

      const m = Math.floor(raw.elapsedMs / 60000);
      const s = Math.floor((raw.elapsedMs % 60000) / 1000);
      setTimerDisplay(`${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`);

      const merged = [
        ...raw.p1.history.map(h => ({ ...h, playerNum: 1, playerName: raw.p1.name })),
        ...raw.p2.history.map(h => ({ ...h, playerNum: 2, playerName: raw.p2.name })),
      ].sort((a, b) => a.time - b.time);
      setHistory(merged);

      document.body.classList.add('game-active');
      return () => {
        document.body.classList.remove('game-active');
        gameStateRef.current = null;
      };
    }

    const gs = new GameState(
      player1Name || 'Player 1',
      player2Name || 'Player 2',
      cfg.appleDensity ?? 0.35,
      cfg.timePerTurn  ?? 60,
      applePositions,
      cfg.gridSize     ?? 10,
    );
    gameStateRef.current = gs;
    setApplesLeft(gs.getRemainingApples().length);
    setTimerDisplay(TimerManager.formatTime(cfg.timePerTurn ?? 60));

    const timer = new TimerManager(
      (secs) => setTimerDisplay(TimerManager.formatTime(secs)),
      () => {
        if (gs.gameOver) return;
        // Server is authoritative — emit timeout, wait for gameEnd broadcast.
        const socket = socketRef.current;
        if (socket) socket.emit('gameEnded', { roomCode, reason: 'timeout' });
      },
    );
    timerRef.current = timer;
    timer.start(gs);

    if (fireworksCanvasRef.current) {
      fireworksRef.current = new Fireworks(fireworksCanvasRef.current);
    }

    document.body.classList.add('game-active');
    soundManager.startBgMusic();
    return () => {
      timer.stop();
      soundManager.stopBgMusic();
      document.body.classList.remove('game-active');
      gameStateRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, isViewOnly]);

  useEffect(() => {
    if (myCooldown <= 0) return;
    const iv = setInterval(() => {
      setMyCooldown(c => {
        if (c <= 1) { clearInterval(iv); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [myCooldown]);

  // Live preview — silently parse user's typed expression into a dashed ghost line
  useEffect(() => {
    const gs = gameStateRef.current;
    if (!gs || isViewOnly || spectating || !myPlayerNum) return;
    const player = myPlayerNum === 1 ? gs.player1 : gs.player2;
    if (!player) return;

    const rhs = equationValue.trim();
    if (!rhs) { player.previewLine = null; return; }
    try {
      player.previewLine = InputParser.parse('y = ' + rhs, gs.gridSize);
    } catch (_) {
      player.previewLine = null;
    }
  }, [equationValue, myPlayerNum, isViewOnly, spectating]);

  // Auto-clear transient error message after 3s
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(''), 3000);
    return () => clearTimeout(t);
  }, [errorMsg]);

  function syncHUD() {
    const gs = gameStateRef.current;
    if (!gs) return;
    const p1 = gs.player1, p2 = gs.player2;
    setP1Score(Math.round(p1.score));
    setP2Score(Math.round(p2.score));
    setP1Expr(p1.expressionsUsed);
    setP2Expr(p2.expressionsUsed);
    setP1Penalty(p1.penaltyFactor);
    setP2Penalty(p2.penaltyFactor);
    setApplesLeft(gs.getRemainingApples().length);
  }

  function addHistoryEntry(playerNum, playerName, entry) {
    setHistory(prev => [...prev, { ...entry, playerNum, playerName }]);
  }

  function applyServerEnd(payload) {
    const gs = gameStateRef.current;
    if (gs) {
      gs.gameOver = true;
      gs.endReason = payload.reason;
    }
    timerRef.current?.stop();
    canvasCompRef.current?.stopLoop();

    const { reason, loserNum, elapsedMs, remainingApples, p1, p2 } = payload;
    const isDraw = loserNum == null;
    const isP1Winner = !isDraw && loserNum === 2;

    const reasonText = buildReasonText(reason, loserNum, p1, p2);
    const winnerMessage = buildWinnerMessage(isDraw, isP1Winner, myPlayerNum, p1, p2);

    const m = Math.floor(elapsedMs / 60000);
    const s = Math.floor((elapsedMs % 60000) / 1000);
    const elapsed = `${m}:${s.toString().padStart(2,'0')}`;

    endGame({
      raw: payload,
      winnerMessage, reasonText, elapsed, remaining: remainingApples,
      isDraw, isP1Winner, myPlayerNum,
      p1: { ...p1, eatenApples: p1.eatenApples || [] },
      p2: { ...p2, eatenApples: p2.eatenApples || [] },
      p1AvatarIndex: p1.avatarIndex ?? p1AvatarIndex,
      p2AvatarIndex: p2.avatarIndex ?? p2AvatarIndex,
    });

    if (!isDraw && fireworksRef.current) {
      const iWon = myPlayerNum !== 0 && ((myPlayerNum === 1 && isP1Winner) || (myPlayerNum === 2 && !isP1Winner));
      if (iWon) fireworksRef.current.start();
    }

    document.body.classList.remove('game-active');
  }

  function submitEquation() {
    const gs = gameStateRef.current;
    if (!gs || gs.gameOver) return;
    const rawRHS = equationValue.trim();
    const equation = rawRHS ? 'y = ' + rawRHS : '';
    setErrorMsg('');

    try {
      if (!equation.trim()) throw new Error('Please enter an equation');

      const lineData = InputParser.parse(equation, gs.gridSize);
      const player = myPlayerNum === 1 ? gs.player1 : gs.player2;
      player.currentLine = lineData;

      const now = Date.now();
      if (now < player.linearCooldownEnd) {
        const secs = Math.ceil((player.linearCooldownEnd - now) / 1000);
        setErrorMsg(`✗ Cooldown: wait ${secs}s before submitting`);
        setMyCooldown(secs);
        return;
      }

      if (cfg.mode === 'pro' && lineData.degree < 2) {
        throw new Error('Poly Masters mode: only degree ≥ 2 equations allowed');
      }

      if ((cfg.mode === 'balanced' || cfg.mode === 'pro') && lineData.degree <= 1) {
        if (player.linearUsesCount >= 3) {
          throw new Error('No more degree ≤ 1 equations (quota: 3/3 used)');
        }
      }

      player.expressionsUsed++;
      const degree     = lineData.degree ?? 0;
      const basePoints = 100 * Math.pow(2, degree);
      const curPenalty = player.penaltyFactor;
      let applesEaten  = 0;

      if (lineData.type === 'vertical') {
        gs.apples.forEach(apple => {
          if (apple.x === lineData.x && !apple.eaten) {
            gs.eatApple(apple.x, apple.y, myPlayerNum, basePoints * curPenalty);
            applesEaten++;
          }
        });
      } else if (lineData.evalFn) {
        gs.apples.forEach(apple => {
          if (apple.eaten) return;
          try {
            if (Math.abs(lineData.evalFn(apple.x) - apple.y) < 0.1) {
              gs.eatApple(apple.x, apple.y, myPlayerNum, basePoints * curPenalty);
              applesEaten++;
            }
          } catch (_) { /* skip */ }
        });
      }

      if (applesEaten > 0) soundManager.appleSlice(applesEaten);

      const pointsGained = Math.round(applesEaten * basePoints * curPenalty);
      player.penaltyFactor *= applesEaten > 0 ? 0.95 : 0.85;

      if (degree <= 1 && cfg.mode !== 'free') {
        player.linearUsesCount++;
        const coolSecs = Math.pow(2, player.linearUsesCount);
        player.linearCooldownEnd = Date.now() + coolSecs * 1000;
        setMyCooldown(coolSecs);
      }

      const entry = { equation: equation.trim(), applesEaten, pointsGained, degree, time: gs.getElapsedMs(), penalty: curPenalty };
      player.history.push(entry);
      addHistoryEntry(myPlayerNum, player.name, entry);
      syncHUD();
      setEquationValue('');

      const socket = socketRef.current;
      if (socket) {
        socket.emit('updateGameState', {
          playerNum: myPlayerNum,
          equation: equation.trim(),
          applesEaten,
          pointsGained,
          degree,
          time: entry.time,
          totalScore: player.score,
          penaltyFactor: player.penaltyFactor,
          usedPenalty: curPenalty,
          expressionsUsed: player.expressionsUsed,
          roomCode,
          appleStates: gs.apples.map(a => ({ x: a.x, y: a.y, eaten: a.eaten, eatenBy: a.eatenBy })),
        });
      }

      if (gs.getRemainingApples().length === 0 && socket) {
        socket.emit('gameEnded', { roomCode, reason: 'apples_cleared' });
      }
    } catch (err) {
      setErrorMsg('✗ ' + err.message);
    }
  }

  useSocketEvent('gameStateUpdated', useCallback((data) => {
    const gs = gameStateRef.current;
    if (!gs || gs.gameOver) return;

    const oppNum = data.playerNum !== undefined ? data.playerNum : (myPlayerNum === 1 ? 2 : 1);
    const oppPlayer = oppNum === 1 ? gs.player1 : gs.player2;

    if (data.appleStates) {
      data.appleStates.forEach(inc => {
        const local = gs.apples.find(a => a.x === inc.x && a.y === inc.y);
        if (local && !local.eaten && inc.eaten) {
          local.eaten = true;
          local.eatenBy = inc.eatenBy;
          oppPlayer.eatenApples.push({ x: inc.x, y: inc.y });
        }
      });
    }

    if (data.totalScore !== undefined) oppPlayer.score = data.totalScore;
    if (data.expressionsUsed !== undefined) oppPlayer.expressionsUsed = data.expressionsUsed;
    if (data.penaltyFactor !== undefined) oppPlayer.penaltyFactor = data.penaltyFactor;

    if (data.equation) {
      const entry = {
        equation: data.equation, applesEaten: data.applesEaten ?? 0,
        pointsGained: data.pointsGained ?? 0, degree: data.degree ?? 0,
        time: data.time ?? gs.getElapsedMs(), penalty: data.usedPenalty,
      };
      oppPlayer.history.push(entry);
      addHistoryEntry(oppNum, oppPlayer.name, entry);
    }

    syncHUD();
  }, [myPlayerNum]));

  useSocketEvent('gameEnd', useCallback((payload) => {
    if (!payload) return;
    applyServerEnd(payload);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myPlayerNum, p1AvatarIndex, p2AvatarIndex]));

  if (screen !== SCREENS.GAME) return null;

  const gs = gameStateRef.current;
  const p1Winning = p1Score > p2Score;
  const p2Winning = p2Score > p1Score;

  return (
    <div className="screen game-screen" style={{ flexDirection: 'column' }}>
      <canvas ref={fireworksCanvasRef} className="fireworks-canvas" />

      {/* Botanical vine corner decorations */}
      <VineTL />
      <VineBL />
      <VineTR />

      {/* Full-width header */}
      <div className="game-header">
        {/* P1 — avatar + YOU tag below avatar, name + stats to the right */}
        <div className={`player-card${myPlayerNum === 1 ? ' my-player-card-1' : ''}`}>
          <div className="avatar-col">
            <Avatar avatarIndex={p1AvatarIndex} borderColor="#4a9eff" />
            {myPlayerNum === 1 && (
              <div className="avatar-tags">
                <span className="you-tag you-tag-1">YOU</span>
              </div>
            )}
          </div>
          <div className="player-meta">
            <div className="player-name">
              {p1Winning && <span className="crown">👑</span>}
              <span>{player1Name || 'Player 1'}</span>
            </div>
            <div className="player-stats">⭐{Math.round(p1Score)} 📋{p1Expr}</div>
          </div>
        </div>

        <div className="game-centre">
          <div className="game-title-text">🍎 POLY APPLE</div>
          <div className="game-timer">{timerDisplay}</div>
          <div className="apples-remaining">🍎 {applesLeft} left</div>
        </div>

        {/* P2 — name + stats on the left, avatar + YOU tag below avatar on the right */}
        <div className={`player-card player-card-right${myPlayerNum === 2 ? ' my-player-card-2' : ''}`}>
          <div className="player-meta" style={{ textAlign: 'right' }}>
            <div className="player-name" style={{ justifyContent: 'flex-end' }}>
              {p2Winning && <span className="crown">👑</span>}
              <span>{player2Name || 'Player 2'}</span>
            </div>
            <div className="player-stats">⭐{Math.round(p2Score)} 📋{p2Expr}</div>
          </div>
          <div className="avatar-col">
            <Avatar avatarIndex={p2AvatarIndex} borderColor="#e24a4a" />
            {myPlayerNum === 2 && (
              <div className="avatar-tags">
                <span className="you-tag you-tag-2">YOU</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body: canvas + right panel — fills to bottom edge */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <GameCanvas ref={canvasCompRef} gameState={gs} />
        <div className="right-panel">
          <GameHUD
            myPlayerNum={(spectating || isViewOnly) ? 0 : myPlayerNum}
            p1Penalty={p1Penalty}
            p2Penalty={p2Penalty}
            history={history}
            mode={cfg.mode || 'balanced'}
            equationValue={equationValue}
            onEquationChange={setEquationValue}
            onSubmit={submitEquation}
            errorMsg={errorMsg}
            myCooldown={myCooldown}
          />

          {/* Bottom action — single button: view-only → Back to Results; player → Surrender; spectator → Leave */}
          <div className="game-panel-actions">
            {isViewOnly ? (
              <button
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '0.9em' }}
                onClick={backToSummary}
              >
                ← Back to Results
              </button>
            ) : spectating ? (
              <button
                className="btn btn-danger"
                style={{ flex: 1, fontSize: '0.9em' }}
                onClick={() => {
                  const socket = socketRef.current;
                  if (socket) socket.emit('guestLeaveRoom');
                  reset();
                }}
              >
                🚪 Leave Room
              </button>
            ) : (
              <button
                className="btn btn-danger"
                style={{ flex: 1, fontSize: '0.9em' }}
                onClick={() => {
                  if (confirm('Surrender — give up the match?')) {
                    const socket = socketRef.current;
                    if (socket) socket.emit('surrender', { roomCode });
                  }
                }}
              >
                🏳️ Surrender
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
