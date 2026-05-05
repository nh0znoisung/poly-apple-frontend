import { useGameContext, SCREENS } from '../context/GameContext.jsx';
import { useSocket } from '../hooks/useSocket.js';
import { AVATARS } from '../constants/avatars.js';

function Avatar({ avatarIndex, size = 44 }) {
  const av = AVATARS[avatarIndex] || AVATARS[0];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${av.color}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'white', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: av.svg }} />
  );
}

function fmtTime(totalMs) {
  const m  = Math.floor(totalMs / 60000);
  const s  = Math.floor((totalMs % 60000) / 1000);
  const cs = Math.round((totalMs % 1000) / 10);
  return `[${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')},${cs.toString().padStart(2,'0')}]`;
}

function LogEntry({ h }) {
  const hasApples = h.applesEaten > 0;
  const resultText = hasApples ? `+${h.applesEaten}🍎 +${h.pointsGained}pts` : 'miss';
  return (
    <div className="history-entry">
      <span className="h-time">{fmtTime(h.time)}</span>
      <span className="h-eq">{h.equation}</span>
      {h.penalty != null && <span className="h-penalty">×{h.penalty.toFixed(2)}</span>}
      <span className={`h-result${hasApples ? '' : ' miss'}`}>{resultText}</span>
    </div>
  );
}

function PlayerLog({ player }) {
  if (!player.history || player.history.length === 0) {
    return <div className="sum-no-moves">No moves</div>;
  }
  return player.history.map((h) => <LogEntry key={h.time} h={h} />);
}

function colClass(base, isWinner, isDraw) {
  if (isWinner) return `sum-col ${base} sum-col-winner`;
  if (!isDraw)  return `sum-col ${base} sum-col-loser`;
  return `sum-col ${base}`;
}

export default function SummaryScreen() {
  const {
    screen, summaryData, playerRole, spectating, roomCode,
    viewBoard, returnToRoom, reset,
  } = useGameContext();
  const { socketRef } = useSocket();

  if (screen !== SCREENS.SUMMARY || !summaryData) return null;

  const showReturnBtn = playerRole && playerRole !== 'guest' && !spectating;

  function handleViewBoard() {
    viewBoard();
  }

  function handleReturnToRoom() {
    const socket = socketRef.current;
    if (socket && roomCode) socket.emit('returnToRoom', { roomCode });
    returnToRoom();
  }

  function handleExitToLobby() {
    const socket = socketRef.current;
    if (socket && roomCode) {
      if (spectating) socket.emit('guestLeaveRoom');
      else socket.emit('playerLeft', { roomCode, reason: 'exit' });
    }
    reset();
  }

  const {
    winnerMessage, reasonText, elapsed, remaining,
    p1, p2, isP1Winner, isDraw,
    myPlayerNum, p1AvatarIndex, p2AvatarIndex,
  } = summaryData;

  const p1IsWinner = isP1Winner && !isDraw;
  const p2IsWinner = !isP1Winner && !isDraw;

  return (
    <div className="screen summary-screen">
      <div className="summary-card">

        <div className="sum-title">{winnerMessage}</div>
        <div className="sum-reason">{reasonText}</div>
        <div className="sum-meta">
          ⏱ Duration: <b>{elapsed}</b>&nbsp;&nbsp;|&nbsp;&nbsp;🍎 Left: <b>{remaining}</b>
        </div>

        <div className="sum-columns">
          <div className={colClass('sum-col-p1', p1IsWinner, isDraw)}>
            <div className="sum-col-header">
              <Avatar avatarIndex={p1AvatarIndex} />
              <span className="sum-player-name">{p1.name}</span>
              <span className="host-badge">HOST</span>
              {myPlayerNum === 1 && <span className="you-badge">YOU</span>}
              {p1IsWinner && <span>👑</span>}
            </div>
            <div className="sum-stat">⭐ Points: <b>{Math.round(p1.score)}</b></div>
            <div className="sum-stat">🍎 Apples: <b>{p1.eatenApples.length}</b></div>
            <div className="sum-stat">📝 Expressions: <b>{p1.expressionsUsed}</b></div>
            <div className="sum-log"><PlayerLog player={p1} /></div>
          </div>

          <div className={colClass('sum-col-p2', p2IsWinner, isDraw)}>
            <div className="sum-col-header">
              <Avatar avatarIndex={p2AvatarIndex} />
              <span className="sum-player-name">{p2.name}</span>
              {myPlayerNum === 2 && <span className="you-badge">YOU</span>}
              {p2IsWinner && <span>👑</span>}
            </div>
            <div className="sum-stat">⭐ Points: <b>{Math.round(p2.score)}</b></div>
            <div className="sum-stat">🍎 Apples: <b>{p2.eatenApples.length}</b></div>
            <div className="sum-stat">📝 Expressions: <b>{p2.expressionsUsed}</b></div>
            <div className="sum-log"><PlayerLog player={p2} /></div>
          </div>
        </div>

        <div className="summary-actions">
          <div className="summary-actions-row">
            <button className="btn btn-sum-view" onClick={handleViewBoard}>
              🔍 View Board
            </button>
            {showReturnBtn && (
              <button className="btn btn-sum-return" onClick={handleReturnToRoom}>
                ⬅ Return to Room
              </button>
            )}
          </div>
          <button className="btn btn-sum-exit" onClick={handleExitToLobby}>
            🚪 Exit to Lobby
          </button>
        </div>

      </div>
    </div>
  );
}
