import { useState, useCallback } from 'react';
import { useGameContext } from '../../context/GameContext.jsx';
import { useSocket, useSocketEvent } from '../../hooks/useSocket.js';
import { AVATARS } from '../../constants/avatars.js';

function AvatarEl({ avatarIndex, size = 48 }) {
  const av = AVATARS[avatarIndex] || AVATARS[0];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${av.color}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'white', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: av.svg }} />
  );
}

const MODE_LABELS = { free: 'Free Play', balanced: 'Balanced', pro: 'Poly Masters' };

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function WaitingRoom({ message: initialMessage, onCancel, onCountdown }) {
  const {
    roomCode, playerRole, myName, myAvatarIndex,
    opponentName, opponentAvatarIndex, roomConfig,
    setOpponent, setConfig,
  } = useGameContext();
  const { socketRef } = useSocket();

  const [message, setMessage] = useState(initialMessage || '');
  const [copied, setCopied] = useState(false);
  const isCreator = playerRole === 'creator';

  const cfg = roomConfig || {};
  const gs = cfg.gridSize || 10;
  const appleCount = cfg.appleDensity != null ? Math.round(cfg.appleDensity * gs * gs) : 50;
  const secs = cfg.timePerTurn || 60;
  const modeLabel = MODE_LABELS[cfg.mode] || 'Balanced';

  useSocketEvent('playerJoined', useCallback((data) => {
    if (data.config) setConfig(data.config);
    const { players = [], creatorId } = data;
    const opponent = playerRole === 'creator'
      ? players.find(p => p.id !== creatorId)
      : players.find(p => p.id === creatorId);
    if (opponent) setOpponent(opponent.name, opponent.avatarIndex, opponent.id);
    if (playerRole === 'creator') {
      setMessage(`${opponent?.name || 'Opponent'} is here! Start the duel?`);
    } else {
      setMessage('Waiting for host to start the game…');
    }
  }, [setConfig, setOpponent, playerRole]));

  useSocketEvent('hostPromoted', useCallback((data) => {
    const socket = socketRef.current;
    if (data.newHostId !== socket?.id) return;
    const opp = (data.players || []).find(p => p.id !== data.newHostId);
    if (opp) setOpponent(opp.name, opp.avatarIndex, opp.id);
    setMessage(opp ? `${opp.name} is here! Start the duel?` : 'Waiting for opponent to join…');
  }, [setOpponent, socketRef]));

  useSocketEvent('gameStart', useCallback((data) => {
    onCountdown(data);
  }, [onCountdown]));

  function handleStart() {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('gameReady', { roomCode });
  }

  function copyCode() {
    navigator.clipboard.writeText(roomCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const showStartBtn = isCreator && !!opponentName;
  const hostAvatar = isCreator ? myAvatarIndex : (opponentAvatarIndex ?? 0);
  const hostName   = isCreator ? (myName || 'You') : (opponentName || 'Host');
  const guestAvatar = isCreator ? (opponentAvatarIndex ?? 0) : myAvatarIndex;
  const guestName  = isCreator ? opponentName : (myName || 'You');

  return (
    <div style={{ position: 'relative' }}>

      {/* Header */}
      <h1>🍎 Poly Apple</h1>
      <p className="subtitle">Eat Apples by Drawing Polynomial Curves!</p>

      {/* Player slots */}
      <div className="waiting-slots">

        {/* Host card */}
        <div className={`waiting-player-card vibe-${hostAvatar}`}>
          <AvatarEl avatarIndex={hostAvatar} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1em', color: 'var(--text-primary)', display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              {hostName}
              <span className="wb-tag wb-host">HOST</span>
              {isCreator && <span className="wb-tag wb-you">YOU</span>}
            </div>
            <div className="muted-text" style={{ fontSize: '0.85em' }}>Room Owner</div>
          </div>
        </div>

        {/* Guest slot */}
        {opponentName ? (
          <div className={`waiting-player-card vibe-${guestAvatar}`}>
            <AvatarEl avatarIndex={guestAvatar} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.1em', color: 'var(--text-primary)', display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                {guestName}
                {!isCreator && <span className="wb-tag wb-you">YOU</span>}
              </div>
              <div className="muted-text" style={{ fontSize: '0.85em' }}>Guest</div>
            </div>
          </div>
        ) : (
          <div className="waiting-placeholder">Waiting for opponent to join…</div>
        )}

      </div>

      {/* Room code card */}
      <div className="room-settings-box">
        <div className="room-code-label">Share This Room Code</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div className="room-code-display">{roomCode}</div>
          <button
            className={`copy-icon-btn${copied ? ' copied' : ''}`}
            type="button"
            onClick={copyCode}
            title="Copy room code"
          >
            {copied ? <CheckIcon /> : <ClipboardIcon />}
          </button>
        </div>
        <div className="room-config-tags" style={{ justifyContent: 'center', marginTop: 14 }}>
          <span className="rtag rtag-grid">⊞ {gs}×{gs}</span>
          <span className="rtag rtag-density">🍎 {appleCount} Apples</span>
          <span className="rtag rtag-time">⏱ {secs}s</span>
          <span className="rtag rtag-mode">⚡ {modeLabel}</span>
        </div>
      </div>

      {/* Status message */}
      {message && (
        <p id="waitingMessage" style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14 }}>
          <span className="hourglass-flip">⏳</span> {message}
        </p>
      )}

      {/* Actions */}
      <div style={{ height: 12 }} />
      {showStartBtn && (
        <button
          className="btn btn-primary btn-large"
          style={{ marginBottom: 8, background: '#27ae60' }}
          onClick={handleStart}
        >
          ⚔️ Start Duel!
        </button>
      )}
      <button
        className="btn btn-cancel"
        style={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 6 }}
        onClick={onCancel}
      >
        ✕ {isCreator ? 'Cancel Room' : 'Exit Room'}
      </button>

    </div>
  );
}
