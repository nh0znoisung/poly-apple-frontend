import { useAuth } from '../../hooks/useAuth.js';
import { signOut } from '../../lib/firebase.js';
import { useGameContext, SCREENS } from '../../context/GameContext.jsx';
import ProfileChip from './ProfileChip.jsx';

export default function Navbar({ onSignInClick }) {
  const { user } = useAuth();
  const { screen } = useGameContext();
  const isGameActive = screen === SCREENS.GAME;

  return (
    <nav className={`top-navbar${isGameActive ? ' hidden' : ''}`}>
      <a className="nav-brand" href="#">
        <span>🍎</span>
        <span className="nav-brand-name">Poly Apple</span>
      </a>

      <div className="nav-controls">
        <ProfileChip />
        <div className="nav-auth-area">
          {user ? (
            <div className="nav-user-badge">
              {user.photoURL ? (
                <img className="nav-user-photo" src={user.photoURL} alt={user.displayName} />
              ) : (
                <div className="nav-user-photo" style={{ background: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75em', fontWeight: 700, color: '#fff' }}>
                  {(user.displayName || user.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <span className="nav-user-name">{user.displayName || user.email}</span>
              <button className="nav-logout-btn" onClick={() => signOut()}>Out</button>
            </div>
          ) : (
            <button className="nav-signin-btn" onClick={onSignInClick}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
