import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useSocketContext } from './SocketContext.jsx';
import { useAuthContext } from './AuthContext.jsx';
import { getRandomName } from '../constants/names.js';
import { getRandomAvatarIndex } from '../constants/avatars.js';

const KEY = 'polyapple_profile';

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'g-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Load the persisted guest profile, or mint a fresh one (fun random defaults).
function loadLocal() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p && p.id) return p;
    }
  } catch (_) { /* ignore */ }
  const fresh = { id: newId(), name: getRandomName(), avatarIndex: getRandomAvatarIndex() };
  try { localStorage.setItem(KEY, JSON.stringify(fresh)); } catch (_) { /* ignore */ }
  return fresh;
}

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const { socketRef, connected } = useSocketContext();
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(loadLocal);
  const profileRef = useRef(profile);
  profileRef.current = profile;

  const persist = useCallback((next) => {
    setProfile(next);
    try {
      localStorage.setItem(KEY, JSON.stringify({ id: next.id, name: next.name, avatarIndex: next.avatarIndex }));
    } catch (_) { /* ignore */ }
  }, []);

  // Server replies with the canonical profile — adopt its id + stats.
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    const onProfile = ({ player }) => {
      if (!player) return;
      persist({
        id: player.id,
        name: player.name,
        avatarIndex: player.avatarIndex,
        firebaseUid: player.firebaseUid ?? null,
        stats: player.stats ?? null,
      });
    };
    socket.on('profile', onProfile);
    socket.on('profileLinked', onProfile);
    return () => { socket.off('profile', onProfile); socket.off('profileLinked', onProfile); };
  }, [socketRef, connected, persist]);

  // Announce identity whenever the socket (re)connects.
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !connected) return;
    const p = profileRef.current;
    socket.emit('identify', { playerId: p.id, name: p.name, avatarIndex: p.avatarIndex, firebaseUid: user?.uid || null });
  }, [connected, socketRef, user]);

  // Link the signed-in Firebase account to this profile.
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !connected || !user?.uid) return;
    socket.emit('linkAccount', { firebaseUid: user.uid, email: user.email || null });
  }, [user, connected, socketRef]);

  const updateProfile = useCallback((patch) => {
    const next = { ...profileRef.current, ...patch };
    persist(next);
    const socket = socketRef.current;
    if (socket) socket.emit('updateProfile', { name: next.name, avatarIndex: next.avatarIndex });
  }, [persist, socketRef]);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
