import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut as _signOut,
} from 'firebase/auth';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBMqa9nRs2FtSw7EiY9DyofYmFVtKSGea8",
    authDomain: "poly-apple.firebaseapp.com",
    projectId: "poly-apple",
    storageBucket: "poly-apple.firebasestorage.app",
    messagingSenderId: "814766466152",
    appId: "1:814766466152:web:04fc3b85193444002387dd",
    measurementId: "G-DCQC11ZSKX",
};

const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

export { onAuthStateChanged };

export async function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
}

export async function signInWithGitHub() {
    return signInWithPopup(auth, githubProvider);
}

export async function signInEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpEmail(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) await updateProfile(cred.user, { displayName });
    return cred;
}

export async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
}

export async function signOut() {
    return _signOut(auth);
}

const ERROR_MAP = {
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

export function friendlyAuthError(code, fallback) {
    return ERROR_MAP[code] || fallback || 'Something went wrong. Please try again.';
}
