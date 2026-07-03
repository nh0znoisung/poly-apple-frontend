import { useState, useCallback, useEffect } from 'react';
import { useGameContext, SCREENS } from '../../context/GameContext.jsx';
import { useSocket, useSocketEvent } from '../../hooks/useSocket.js';
import { soundManager } from '../../lib/SoundManager.js';
import CreateRoom from './CreateRoom.jsx';
import JoinRoom from './JoinRoom.jsx';
import WaitingRoom from './WaitingRoom.jsx';

const LOBBY_TABS = { CREATE: 'create', JOIN: 'join', WAITING: 'waiting' };

export default function LobbyPage() {
  const {
    screen, startGame, reset, lobbyView, setLobbyView,
    setOpponent, setOpponentReady, setRole,
  } = useGameContext();
  const { socketRef } = useSocket();

  const [tab, setTab] = useState(LOBBY_TABS.CREATE);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (lobbyView === 'waiting') {
      setTab(LOBBY_TABS.WAITING);
      setLobbyView('default');
    }
  }, [lobbyView, setLobbyView]);

  // Room roster/readiness sync — handled here (LobbyPage is always mounted) so the
  // event is never missed during the summary→waiting-room transition.
  useSocketEvent('roomRejoined', useCallback((data) => {
    const myId = socketRef.current?.id;
    const { players = [], creatorId, bothBack } = data;
    if (creatorId && myId) setRole(myId === creatorId ? 'creator' : 'joiner');
    const opp = players.find(p => p.id !== myId);
    if (opp) setOpponent(opp.name, opp.avatarIndex, opp.id);
    else setOpponent('', 0, null);
    setOpponentReady(!!bothBack);
  }, [socketRef, setRole, setOpponent, setOpponentReady]));

  // The room was cleaned up (expired / everyone left) before we could return.
  useSocketEvent('roomGone', useCallback(() => {
    setTab(LOBBY_TABS.CREATE);
    reset();
  }, [reset]));

  const handleCountdown = useCallback((gameStartData) => {
    let count = 3;
    setCountdown(count);
    soundManager.countdown(3);
    const iv = setInterval(() => {
      count--;
      if (count <= 0) {
        clearInterval(iv);
        setCountdown(null);
        soundManager.countdown(0); // GO!
        startGame(gameStartData.applePositions, gameStartData.sessionId);
      } else {
        setCountdown(count);
        soundManager.countdown(count);
      }
    }, 1000);
  }, [startGame]);

  if (screen !== SCREENS.LOBBY) return null;

  function showWaiting() {
    setTab(LOBBY_TABS.WAITING);
  }

  function handleCancel() {
    const socket = socketRef.current;
    if (socket) socket.emit('cancelRoom');
    setTab(LOBBY_TABS.CREATE);
    reset();
  }

  const isWaiting = tab === LOBBY_TABS.WAITING;

  return (
    <div className="screen lobby-screen" id="lobbyScreen">
      {countdown !== null && (
        <div className="countdown-overlay">
          <div className="countdown-number">{countdown}</div>
        </div>
      )}

      <div className="lobby-container">
        {isWaiting ? (
          <WaitingRoom
            onCancel={handleCancel}
            onCountdown={handleCountdown}
          />
        ) : (
          <>
            <h1>🍎 Poly Apple</h1>
            <p className="subtitle">Eat Apples by Drawing Polynomial Curves!</p>

            <div className="lobby-tabs">
              <button
                className={`tab-btn${tab === LOBBY_TABS.CREATE ? ' active' : ''}`}
                onClick={() => setTab(LOBBY_TABS.CREATE)}
              >
                Create Room
              </button>
              <button
                className={`tab-btn${tab === LOBBY_TABS.JOIN ? ' active' : ''}`}
                onClick={() => setTab(LOBBY_TABS.JOIN)}
              >
                Join Room
              </button>
            </div>

            {tab === LOBBY_TABS.CREATE && (
              <CreateRoom onWaiting={showWaiting} />
            )}
            {tab === LOBBY_TABS.JOIN && (
              <JoinRoom onWaiting={showWaiting} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
