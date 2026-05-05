// ─── Firebase Config ──────────────────────────────────────────────────────────
// Setup guide:
//   1. Go to https://console.firebase.google.com → Create/select your project
//   2. Authentication → Sign-in method → Enable: Google, GitHub, Email/Password
//   3. GitHub: create OAuth App at github.com/settings/developers
//      Authorization callback URL: https://YOUR_PROJECT.firebaseapp.com/__/auth/handler
//   4. Project Settings → Your apps → Web → copy config below

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBMqa9nRs2FtSw7EiY9DyofYmFVtKSGea8",
  authDomain: "poly-apple.firebaseapp.com",
  projectId: "poly-apple",
  storageBucket: "poly-apple.firebasestorage.app",
  messagingSenderId: "814766466152",
  appId: "1:814766466152:web:04fc3b85193444002387dd",
  measurementId: "G-DCQC11ZSKX"
};

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider  = new firebase.auth.GithubAuthProvider();

// ─── State ────────────────────────────────────────────────────────────────────
let _currentUser = null;

// Exposed so script.js can read: getCurrentUser()
window.getCurrentUser = () => _currentUser;

// ─── Auth State Observer ──────────────────────────────────────────────────────
auth.onAuthStateChanged(user => {
    _currentUser = user;
    if (user) _onSignedIn(user);
    else      _onSignedOut();
});

function _onSignedIn(user) {
    // Navbar: hide sign-in btn, show user badge
    const signInBtn = document.getElementById('navSignInBtn');
    const badge     = document.getElementById('navUserBadge');
    const photo     = document.getElementById('navUserPhoto');
    const nameEl    = document.getElementById('navUserName');
    if (signInBtn) signInBtn.style.display = 'none';
    if (badge)     badge.style.display     = 'flex';
    if (nameEl)    nameEl.textContent      = user.displayName || user.email?.split('@')[0] || 'Player';
    if (photo) {
        if (user.photoURL) { photo.src = user.photoURL; photo.style.display = 'block'; }
        else               { photo.style.display = 'none'; }
    }

    // Clear #login from URL
    if (location.hash === '#login') {
        history.replaceState(null, '', location.pathname);
    }

    // Show lobby, hide auth screen
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('lobbyScreen').classList.remove('hidden');

    // Hand off to game app
    if (typeof globalThis.onAuthReady === 'function') globalThis.onAuthReady(user);
}

function _onSignedOut() {
    _currentUser = null;
    // Navbar: restore Sign In button
    const signInBtn = document.getElementById('navSignInBtn');
    const badge     = document.getElementById('navUserBadge');
    if (signInBtn) signInBtn.style.display = '';
    if (badge)     badge.style.display     = 'none';
    // Return to lobby (login is opt-in, not forced)
    if (location.hash === '#login') {
        history.replaceState(null, '', location.pathname);
        document.getElementById('authScreen').classList.add('hidden');
        document.getElementById('lobbyScreen').classList.remove('hidden');
    }
    // If mid-game, kick back to lobby
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('summaryScreen').classList.add('hidden');
}

// ─── Sign In Methods ──────────────────────────────────────────────────────────
async function signInWithGoogle() {
    try {
        _setLoading(true);
        await auth.signInWithPopup(googleProvider);
    } catch(e) {
        _showError(_friendly(e.code, e.message));
    } finally {
        _setLoading(false);
    }
}

async function signInWithGitHub() {
    try {
        _setLoading(true);
        await auth.signInWithPopup(githubProvider);
    } catch(e) {
        _showError(_friendly(e.code, e.message));
    } finally {
        _setLoading(false);
    }
}

async function signInWithEmail(email, password) {
    try {
        _setLoading(true);
        _clearError();
        await auth.signInWithEmailAndPassword(email, password);
    } catch(e) {
        _showError(_friendly(e.code, e.message));
    } finally {
        _setLoading(false);
    }
}

async function signUpWithEmail(email, password, displayName) {
    try {
        _setLoading(true);
        _clearError();
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        if (displayName) await cred.user.updateProfile({ displayName });
    } catch(e) {
        _showError(_friendly(e.code, e.message));
    } finally {
        _setLoading(false);
    }
}

async function signOut() {
    try { await auth.signOut(); } catch(e) { /* ignore */ }
}

async function handleForgotPassword() {
    const email = document.getElementById('authEmail')?.value.trim();
    if (!email) { _showError('Enter your email address above first.'); return; }
    try {
        await auth.sendPasswordResetEmail(email);
        _showError('Password reset email sent — check your inbox.', 'success');
    } catch(e) {
        _showError(_friendly(e.code, e.message));
    }
}

// ─── Tab / Mode Switching ─────────────────────────────────────────────────────
let _mode = 'signin';

function switchAuthMode(mode) {
    _mode = mode;
    _clearError();
    document.getElementById('signinTab').classList.toggle('auth-tab-active', mode === 'signin');
    document.getElementById('signupTab').classList.toggle('auth-tab-active', mode === 'signup');

    const isSignup = mode === 'signup';
    const nameGroup = document.getElementById('authNameGroup');
    const submitBtn = document.getElementById('authSubmitBtn');
    const forgotEl  = document.getElementById('authForgotLink');
    const switchEl  = document.getElementById('authSwitchLink');

    if (nameGroup) nameGroup.style.display = isSignup ? 'block' : 'none';
    if (submitBtn) submitBtn.textContent   = isSignup ? 'Create Account' : 'Sign In';
    if (forgotEl)  forgotEl.style.display  = isSignup ? 'none' : 'block';
    if (switchEl)  switchEl.innerHTML      = isSignup
        ? `Already have an account? <button type="button" class="auth-text-btn" onclick="switchAuthMode('signin')">Sign In</button>`
        : `Don't have an account? <button type="button" class="auth-text-btn" onclick="switchAuthMode('signup')">Sign Up</button>`;
}

function handleEmailSubmit(e) {
    e.preventDefault();
    const email    = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    if (_mode === 'signin') {
        signInWithEmail(email, password);
    } else {
        const name = document.getElementById('authDisplayName')?.value.trim() || '';
        signUpWithEmail(email, password, name);
    }
}

// ─── UI Helpers ───────────────────────────────────────────────────────────────
function _setLoading(on) {
    const el = document.getElementById('authLoadingOverlay');
    if (el) el.style.display = on ? 'flex' : 'none';
    const btn = document.getElementById('authSubmitBtn');
    if (btn) btn.disabled = on;
}

function _showError(msg, type = 'error') {
    const el = document.getElementById('authErrorMsg');
    if (!el) return;
    el.textContent = msg;
    el.className   = type === 'success' ? 'auth-success-msg' : 'auth-error-msg';
    el.style.display = 'block';
}

function _clearError() {
    const el = document.getElementById('authErrorMsg');
    if (el) el.style.display = 'none';
}

function _friendly(code, fallback) {
    const map = {
        'auth/user-not-found':                           'No account found with this email.',
        'auth/wrong-password':                           'Incorrect password.',
        'auth/invalid-credential':                       'Email or password is incorrect.',
        'auth/email-already-in-use':                     'Email already registered — try signing in.',
        'auth/weak-password':                            'Password must be at least 6 characters.',
        'auth/invalid-email':                            'Invalid email address.',
        'auth/popup-blocked':                            'Popup blocked — please allow popups for this site.',
        'auth/popup-closed-by-user':                     'Sign-in cancelled.',
        'auth/account-exists-with-different-credential': 'Account exists with a different sign-in method.',
        'auth/network-request-failed':                   'Network error — check your connection.',
        'auth/too-many-requests':                        'Too many attempts. Please try again later.',
    };
    return map[code] || fallback || 'Something went wrong. Please try again.';
}
