import { useState, useCallback, useEffect } from 'react';
import { useGameContext, SCREENS } from '../../context/GameContext.jsx';
import { useSocket } from '../../hooks/useSocket.js';
import { soundManager } from '../../lib/SoundManager.js';
import CreateRoom from './CreateRoom.jsx';
import JoinRoom from './JoinRoom.jsx';
import WaitingRoom from './WaitingRoom.jsx';

const LOBBY_TABS = { CREATE: 'create', JOIN: 'join', WAITING: 'waiting' };

export default function LobbyPage() {
  const { screen, startGame, reset, lobbyView, setLobbyView } = useGameContext();
  const { socketRef } = useSocket();

  const [tab, setTab] = useState(LOBBY_TABS.CREATE);
  const [waitingMsg, setWaitingMsg] = useState('');
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (lobbyView === 'waiting') {
      setTab(LOBBY_TABS.WAITING);
      setWaitingMsg('Waiting for opponent to be ready…');
      setLobbyView('default');
    }
  }, [lobbyView, setLobbyView]);

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

  function showWaiting(_roomCode, msg) {
    setWaitingMsg(msg);
    setTab(LOBBY_TABS.WAITING);
  }

  function handleCancel() {
    const socket = socketRef.current;
    if (socket) socket.emit('cancelRoom');
    setTab(LOBBY_TABS.CREATE);
    reset();
  }

  function handleSpectate(roomCode) {
    const socket = socketRef.current;
    if (socket) socket.emit('spectate', { roomCode });
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
            message={waitingMsg}
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
              <JoinRoom onWaiting={showWaiting} onSpectate={handleSpectate} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
