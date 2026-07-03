import { useState, useEffect } from 'react';
import { useProfile } from '../../context/ProfileContext.jsx';
import { AVATARS } from '../../constants/avatars.js';

function Av({ i, size = 28 }) {
  const a = AVATARS[i] || AVATARS[0];
  return (
    <div
      style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${a.color}`, background: '#fff', display: 'inline-flex', flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: a.svg }}
    />
  );
}

// Compact profile chip + inline editor (name / avatar / stats) for the navbar.
export default function ProfileChip() {
  const { profile, updateProfile } = useProfile();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(profile.name);

  useEffect(() => { setName(profile.name); }, [profile.name]);

  const stats = profile.stats || {};

  function saveName() {
    const n = name.trim();
    if (n && n !== profile.name) updateProfile({ name: n });
    else setName(profile.name);
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--input-bg)', border: '1px solid var(--panel-border)', borderRadius: 22, padding: '4px 12px 4px 4px', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.85em' }}
        title="Your profile"
      >
        <Av i={profile.avatarIndex} />
        <span style={{ maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{profile.name}</span>
      </button>

      {open && (
        <>
          <div onClick={() => { saveName(); setOpen(false); }} style={{ position: 'fixed', inset: 0, zIndex: 1099 }} />
          <div
            style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 1100, width: 260, background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: 14, padding: 16, boxShadow: '0 12px 32px rgba(0,0,0,0.25)', backdropFilter: 'blur(12px)' }}
          >
            <div style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: 1, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>Your name</div>
            <input
              value={name}
              maxLength={24}
              onChange={(e) => setName(e.target.value)}
              onBlur={saveName}
              onKeyDown={(e) => { if (e.key === 'Enter') { saveName(); e.currentTarget.blur(); } }}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: '0.95em', boxSizing: 'border-box' }}
            />

            <div style={{ fontSize: '0.7em', fontWeight: 800, letterSpacing: 1, color: 'var(--text-secondary)', textTransform: 'uppercase', margin: '14px 0 8px' }}>Avatar</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {AVATARS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => updateProfile({ avatarIndex: i })}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, borderRadius: 10, cursor: 'pointer', background: i === profile.avatarIndex ? 'var(--accent-green)' : 'transparent', border: `2px solid ${i === profile.avatarIndex ? 'var(--accent-green)' : 'var(--panel-border)'}` }}
                >
                  <Av i={i} size={30} />
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--panel-border)', fontSize: '0.85em', fontWeight: 700, color: 'var(--text-primary)' }}>
              <span title="Games played">🎮 {stats.gamesPlayed || 0}</span>
              <span title="Wins">🏆 {stats.wins || 0}</span>
              <span title="Draws">🤝 {stats.draws || 0}</span>
              <span title="Apples eaten">🍎 {stats.applesEaten || 0}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
