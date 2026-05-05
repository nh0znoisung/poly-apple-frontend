import { useState } from 'react';
import {
  signInWithGoogle, signInWithGitHub,
  signInEmail, signUpEmail, resetPassword,
  friendlyAuthError,
} from '../../lib/firebase.js';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

export default function LoginPage({ onClose }) {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { text, type: 'error'|'success' }

  const isSignup = mode === 'signup';

  async function handleSocial(fn) {
    setMessage(null);
    setLoading(true);
    try { await fn(); }
    catch (e) { setMessage({ text: friendlyAuthError(e.code, e.message), type: 'error' }); }
    finally { setLoading(false); }
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      if (isSignup) await signUpEmail(email, password, displayName);
      else          await signInEmail(email, password);
    } catch (e) {
      setMessage({ text: friendlyAuthError(e.code, e.message), type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) { setMessage({ text: 'Enter your email address above first.', type: 'error' }); return; }
    try {
      await resetPassword(email.trim());
      setMessage({ text: 'Password reset email sent — check your inbox.', type: 'success' });
    } catch (e) {
      setMessage({ text: friendlyAuthError(e.code, e.message), type: 'error' });
    }
  }

  return (
    <div className="screen auth-screen" style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
      <div className="auth-card">
        {loading && (
          <div className="auth-loading-overlay">
            <div className="auth-spinner" />
          </div>
        )}

        <div className="auth-header">
          <span className="auth-logo-emoji">🍎</span>
          <h1 className="auth-brand">Poly Apple</h1>
          <p className="auth-tagline">Sign in to save your stats &amp; play ranked</p>
        </div>

        <button className="auth-social-btn auth-btn-google" onClick={() => handleSocial(signInWithGoogle)}>
          <GoogleIcon /> Continue with Google
        </button>
        <button className="auth-social-btn auth-btn-github" onClick={() => handleSocial(signInWithGitHub)}>
          <GitHubIcon /> Continue with GitHub
        </button>

        <div className="auth-or">or</div>

        <div className="auth-tabs">
          <button className={`auth-tab${mode === 'signin' ? ' auth-tab-active' : ''}`} onClick={() => { setMode('signin'); setMessage(null); }}>Sign In</button>
          <button className={`auth-tab${mode === 'signup' ? ' auth-tab-active' : ''}`} onClick={() => { setMode('signup'); setMessage(null); }}>Sign Up</button>
        </div>

        <form onSubmit={handleEmailSubmit}>
          {isSignup && (
            <input
              className="auth-input" type="text" placeholder="Display Name"
              value={displayName} onChange={e => setDisplayName(e.target.value)}
            />
          )}
          <input
            className="auth-input" type="email" placeholder="Email" required
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <input
            className="auth-input" type="password" placeholder="Password" required
            value={password} onChange={e => setPassword(e.target.value)}
          />

          {message && (
            <div className={message.type === 'success' ? 'auth-success-msg' : 'auth-error-msg'}>
              {message.text}
            </div>
          )}

          <button className="auth-submit-btn" type="submit" disabled={loading}>
            {isSignup ? 'Create Account' : 'Sign In'}
          </button>

          {!isSignup && (
            <button type="button" className="auth-small-link" onClick={handleForgotPassword}>
              Forgot password?
            </button>
          )}
        </form>

        <p className="auth-switch-text">
          {isSignup
            ? <>Already have an account? <button type="button" className="auth-text-btn" onClick={() => { setMode('signin'); setMessage(null); }}>Sign In</button></>
            : <>Don&apos;t have an account? <button type="button" className="auth-text-btn" onClick={() => { setMode('signup'); setMessage(null); }}>Sign Up</button></>
          }
        </p>

        {onClose && (
          <button type="button" className="auth-small-link" style={{ marginTop: 8 }} onClick={onClose}>
            Continue without account
          </button>
        )}
      </div>
    </div>
  );
}
