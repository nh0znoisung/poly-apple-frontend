import { useState } from 'react';
import { getRandomName } from '../../constants/names.js';
import { getRandomAvatarIndex } from '../../constants/avatars.js';
import { useGameContext } from '../../context/GameContext.jsx';
import { useSocket } from '../../hooks/useSocket.js';

const GRID_OPTIONS = [
  { value: 5,  label: '5x5 — Compact'        },
  { value: 10, label: '10x10 — Standard'      },
  { value: 15, label: '15x15 — Large'         },
  { value: 20, label: '20x20 — Massive'       },
];

const MODE_OPTIONS = [
  { value: 'free',     label: 'Free Play — all equations allowed'       },
  { value: 'balanced', label: 'Balanced — trivials limited'              },
  { value: 'pro',      label: 'Poly Masters — degree ≥ 2 only'          },
];

const MODE_SHORT = { free: 'Free Play', balanced: 'Balanced', pro: 'Poly Masters' };

// Grid icon SVG (renders like # — matches the original stag-grid icon)
const GridIcon = () => (
  <svg className="tag-icon" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <line x1="3" y1="0" x2="3" y2="9"/><line x1="6" y1="0" x2="6" y2="9"/>
    <line x1="0" y1="3" x2="9" y2="3"/><line x1="0" y1="6" x2="9" y2="6"/>
  </svg>
);

// ── Density slider with ruler ─────────────────────────────────────────────────
function DensitySlider({ value, gridSize, onChange }) {
  const max = gridSize * gridSize;
  const fillPct = ((value - 1) / Math.max(max - 1, 1)) * 100;
  const ticks = Array.from({ length: 7 }, (_, i) => Math.round(max * i / 6));

  return (
    <div className="slider-container">
      <input
        type="range"
        className="custom-slider"
        id="density"
        min={1} max={max} step={1}
        value={value}
        style={{ '--slider-fill': `${fillPct.toFixed(1)}%` }}
        onChange={e => onChange(Number(e.target.value))}
      />
      <div className="slider-ruler">
        {ticks.map(t => <span key={t}>{t}</span>)}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CreateRoom({ onWaiting }) {
  const { setPlayerInfo, setRoom, setPlayerNum, setConfig } = useGameContext();
  const { socketRef } = useSocket();

  const [name, setName]             = useState('');
  const [gridSize, setGridSize]     = useState(10);
  const [appleCount, setAppleCount] = useState(Math.round(10 * 10 * 0.25));
  const [mode, setMode]             = useState('balanced');
  const [time, setTime]             = useState(60);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const maxApples = gridSize * gridSize;

  function handleGridChange(gs) {
    const pct = appleCount / maxApples;
    setGridSize(gs);
    setAppleCount(Math.round(pct * gs * gs));
  }

  function handleCreate() {
    const playerName = name.trim() || getRandomName();
    if (!name.trim()) setName(playerName);
    const avatarIndex = getRandomAvatarIndex();
    const config = { appleDensity: appleCount / maxApples, gridSize, timePerTurn: time || 60, mode };

    setPlayerInfo(playerName, avatarIndex);
    setPlayerNum(1);
    setConfig(config);

    const socket = socketRef.current;
    if (!socket) return;

    socket.emit('createRoom', { name: playerName, avatarIndex, config });
    socket.once('roomCreated', (data) => {
      setRoom(data.roomCode, 'creator', config);
      onWaiting();
    });
  }

  return (
    <div className="lobby-tab active">

      {/* Player name */}
      <div className="form-group">
        <label htmlFor="playerNameCreate">Your Name (optional):</label>
        <input
          id="playerNameCreate"
          type="text"
          placeholder="Leave blank for a random name"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
        />
      </div>

      {/* ── Settings panel ── */}
      <div className="settings-panel">
        <button
          type="button"
          className={`settings-header${settingsOpen ? ' open-header' : ''}`}
          style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', alignItems: 'flex-start', textAlign: 'left' }}
          onClick={() => setSettingsOpen(o => !o)}
        >
          {/* Two-row left side: SETTINGS label on top, tags below */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
            <span className="settings-label" style={{ fontSize: '1.1em' }}>Settings</span>
            <div className="settings-tags">
              <span className="stag stag-grid" style={{ fontSize: '0.85em' }}><GridIcon /> {gridSize}×{gridSize}</span>
              <span className="stag stag-density" style={{ fontSize: '0.85em' }}>🍎 {appleCount} Apples</span>
              <span className="stag stag-time" style={{ fontSize: '0.85em' }}>⏱ {time || 60}s</span>
              <span className="stag stag-mode" style={{ fontSize: '0.85em' }}>⚡ {MODE_SHORT[mode]}</span>
            </div>
          </div>
        </button>

        <div className={`settings-body${settingsOpen ? ' open' : ''}`}>

          {/* Grid Size */}
          <div className="form-group">
            <label htmlFor="gridSize">🌐 Grid Size</label>
            <select id="gridSize" value={gridSize} onChange={e => handleGridChange(Number(e.target.value))}>
              {GRID_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Apple Density */}
          <div className="form-group">
            <label htmlFor="density">
              🍎 Apples: <strong>{appleCount}</strong>
            </label>
            <DensitySlider value={appleCount} gridSize={gridSize} onChange={setAppleCount} />
          </div>

          {/* Timer */}
          <div className="form-group">
            <label htmlFor="time">⏱ Timer (seconds)</label>
            <input
              id="time"
              type="number"
              step={30}
              value={time}
              onChange={e => {
                const v = Number.parseInt(e.target.value, 10);
                setTime(Number.isNaN(v) ? 0 : v);
              }}
              onBlur={() => { if (!time) setTime(60); }}
              onWheel={e => e.currentTarget.blur()}
            />
          </div>

          {/* Game Mode */}
          <div className="form-group">
            <label htmlFor="mode">⚡ Game Mode</label>
            <select id="mode" value={mode} onChange={e => setMode(e.target.value)}>
              {MODE_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      <button className="btn btn-primary btn-large" onClick={handleCreate}>
        🚀 CREATE ROOM
      </button>
    </div>
  );
}
