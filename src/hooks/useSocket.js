import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext.jsx';

export function useSocket() {
  const { socketRef, connected } = useSocketContext();
  return { socket: socketRef.current, connected, socketRef };
}

/**
 * Subscribe to a socket event, auto-cleanup on unmount.
 * Usage: useSocketEvent('gameStart', (data) => ...)
 */
export function useSocketEvent(event, handler) {
  const { socketRef } = useSocketContext();

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.on(event, handler);
    return () => socket.off(event, handler);
  }, [event, handler, socketRef]);
}
