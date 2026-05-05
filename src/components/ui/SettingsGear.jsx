import { useState, useEffect } from 'react';
import { triggerThemeTransition } from '../../lib/bgAnimation.js';
import { soundManager } from '../../lib/SoundManager.js';
import { useGameContext } from '../../context/GameContext.jsx';

const SoundOnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);

const SoundOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/>
    <line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
);

const SunSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

function ThemeToggleIcon({ isDark }) {
  return (
    <div className="theme-toggle-icon">
      <div className={`theme-icon-layer theme-icon-sun${!isDark ? ' visible' : ''}`}>
        <SunSvg />
      </div>
      <div className={`theme-icon-layer theme-icon-moon${isDark ? ' visible' : ''}`}>
        <MoonSvg />
      </div>
    </div>
  );
}

export default function SettingsGear({ onRulesClick }) {
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('polyapple_theme');
    return saved ? saved === 'dark' : false;
  });
  useGameContext();

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    document.body.dataset.theme = theme;
  }, [isDark]);

  function toggleTheme() {
    const from = document.body.dataset.theme || 'light';
    triggerThemeTransition(from);
    const next = from === 'dark' ? 'light' : 'dark';
    localStorage.setItem('polyapple_theme', next);
    setIsDark(next === 'dark');
  }

  function toggleSound() {
    const on = soundManager.toggle();
    setSoundOn(on);
  }

  return (
    <div className="fixed-actions">
      <div className={`fixed-gear-menu${open ? ' gear-open' : ''}`}>

        <div className="pill-wrapper">
          <button
            className="action-pill action-pill-book"
            onClick={() => { setOpen(false); onRulesClick?.(); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </button>
          <span className="pill-tooltip">Rules</span>
        </div>

        <div className="pill-wrapper">
          <button
            className="action-pill"
            style={{ background: soundOn ? '#16a085' : '#7f8c8d', borderColor: 'rgba(255,255,255,0.3)' }}
            onClick={toggleSound}
          >
            {soundOn ? <SoundOnIcon /> : <SoundOffIcon />}
          </button>
          <span className="pill-tooltip">{soundOn ? 'Mute Sound' : 'Unmute Sound'}</span>
        </div>

        <div className="pill-wrapper">
          <button
            className="action-pill action-pill-theme"
            style={{ display: 'flex' }}
            onClick={toggleTheme}
          >
            <ThemeToggleIcon isDark={isDark} />
          </button>
          <span className="pill-tooltip">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </div>

      </div>

      <div className="pill-wrapper">
        <button
          className={`action-pill fixed-gear-btn${open ? ' gear-open' : ''}`}
          onClick={() => setOpen(o => !o)}
        >
          <svg className="nav-gear-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
        <span className="pill-tooltip">Settings</span>
      </div>
    </div>
  );
}
