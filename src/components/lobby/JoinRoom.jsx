import { useState, useEffect, useRef } from 'react';
import { useGameContext } from '../../context/GameContext.jsx';
import { useProfile } from '../../context/ProfileContext.jsx';
import { useSocket } from '../../hooks/useSocket.js';

const TAG_ICONS = { grid: '⊞', apple: '🍎', clock: '⏱', bolt: '⚡' };
const MODE_LABELS = { free: 'Free Play', balanced: 'Balanced', pro: 'Poly Masters' };

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

function RoomCard({ room, onJoin }) {
  const cfg = room.config || {};
  const gs = cfg.gridSize || 10;
  const appleCount = cfg.appleDensity != null ? Math.round(cfg.appleDensity * gs * gs) : 50;
  const secs = cfg.timePerTurn || 60;
  const modeLabel = MODE_LABELS[cfg.mode] || 'Balanced';

  return (
    <div className="room-item">
      <div className="room-info">
        <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          Room: {room.code}&nbsp;
          {room.status === 'waiting' && <span style={{ fontSize: '0.75em', color: '#27ae60', fontWeight: 600 }}>● Open</span>}
          {room.status === 'playing' && <span style={{ fontSize: '0.75em', color: '#e74c3c', fontWeight: 600 }}>● Live</span>}
        </div>
        <div className="muted-text" style={{ fontSize: '0.9em' }}>Host: {room.creator}</div>
        <div className="room-config-tags">
          <span className="rtag rtag-grid">{TAG_ICONS.grid} {gs}×{gs}</span>
          <span className="rtag rtag-density">{TAG_ICONS.apple} {appleCount} Apples</span>
          <span className="rtag rtag-time">{TAG_ICONS.clock} {secs}s</span>
          <span className="rtag rtag-mode">{TAG_ICONS.bolt} {modeLabel}</span>
        </div>
      </div>
      {room.status === 'waiting' && (
        <button className="btn btn-submit" onClick={e => { e.stopPropagation(); onJoin(room.code); }}>Join</button>
      )}
      {room.status === 'playing' && (
        <span className="muted-text" style={{ fontSize: '0.8em', fontWeight: 600, whiteSpace: 'nowrap' }}>In progress</span>
      )}
    </div>
  );
}

export default function JoinRoom({ onWaiting }) {
  const { setPlayerInfo, setRoom, setPlayerNum, setConfig, setOpponent, setOpponentReady } = useGameContext();
  const { profile, updateProfile } = useProfile();
  const { socketRef } = useSocket();

  const [name, setName] = useState(profile.name);
  const [code, setCode] = useState('');
  const [rooms, setRooms] = useState([]);
  const [joining, setJoining] = useState(false);
  const refreshRef = useRef(null);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handleRooms = (data) => setRooms(data);
    socket.on('availableRooms', handleRooms);
    socket.emit('getAvailableRooms');

    refreshRef.current = setInterval(() => {
      if (!joining) socket.emit('getAvailableRooms');
    }, 2000);

    return () => {
      socket.off('availableRooms', handleRooms);
      clearInterval(refreshRef.current);
    };
  }, [socketRef, joining]);

  function joinByCode(roomCode) {
    if (joining) return;
    const playerName = name.trim() || profile.name;
    if (!name.trim()) setName(playerName);
    if (playerName !== profile.name) updateProfile({ name: playerName });
    const avatarIndex = profile.avatarIndex;
    setJoining(true);

    const socket = socketRef.current;
    if (!socket) return;

    setPlayerInfo(playerName, avatarIndex);
    setPlayerNum(2);

    socket.emit('joinRoom', { roomCode, playerId: profile.id, name: playerName, avatarIndex });

    socket.once('joinFailed', (err) => {
      setJoining(false);
      alert('Failed to join: ' + err.message);
    });

    socket.once('playerJoined', (data) => {
      if (data.config) setConfig(data.config);
      const creator = (data.players || []).find(p => p.id === data.creatorId);
      if (creator) {
        setOpponent(creator.name, creator.avatarIndex, creator.id);
        setOpponentReady(true);
      }
      setRoom(roomCode, 'joiner', data.config);
      setJoining(false);
      onWaiting();
    });
  }

  const filtered = code
    ? rooms.filter(r =>
        r.code.toLowerCase().includes(code.toLowerCase()) ||
        (r.creator || '').toLowerCase().includes(code.toLowerCase())
      )
    : rooms;

  return (
    <div className="lobby-tab active">

      <div className="form-group">
        <label htmlFor="playerNameJoin">Your Name (optional):</label>
        <input
          id="playerNameJoin"
          type="text"
          placeholder="Leave blank for a random name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          className="search-input"
          type="text"
          placeholder="Enter room ID"
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          onKeyDown={e => { if (e.key === 'Enter' && code.trim()) joinByCode(code.trim()); }}
        />
        <button
          className="search-btn"
          onClick={() => code.trim() && joinByCode(code.trim())}
          disabled={joining}
        >
          <SearchIcon />
        </button>
      </div>

      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '20px 0', fontWeight: 600 }}>
          No rooms available
        </p>
      ) : (
        <div className="rooms-list">
          {filtered.map(r => (
            <RoomCard key={r.code} room={r} onJoin={joinByCode} />
          ))}
        </div>
      )}

    </div>
  );
}
