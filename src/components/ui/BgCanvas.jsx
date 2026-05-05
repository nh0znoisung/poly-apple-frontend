import { useEffect, useRef } from 'react';
import { initBgCanvas } from '../../lib/bgAnimation.js';

export default function BgCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cleanup = initBgCanvas(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
}
