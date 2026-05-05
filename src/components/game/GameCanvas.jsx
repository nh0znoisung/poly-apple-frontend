import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Renderer } from '../../lib/Renderer.js';
import { GameState } from '../../lib/GameState.js';

const GameCanvas = forwardRef(function GameCanvas({ gameState, onHover }, ref) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const hoveredAppleRef = useRef(null);
  const animIdRef = useRef(null);
  const tooltipRef = useRef(null);

  // Expose renderer to parent
  useImperativeHandle(ref, () => ({
    getRenderer: () => rendererRef.current,
    stopLoop: () => { if (animIdRef.current) cancelAnimationFrame(animIdRef.current); },
  }), []);

  useEffect(() => {
    if (!canvasRef.current || !gameState) return;

    const renderer = new Renderer(canvasRef.current);
    renderer.gridSize = gameState.gridSize;
    renderer.displayUnits = (renderer.gridSize - 1) + 2 * renderer.pad;
    renderer.resize();
    rendererRef.current = renderer;

    const onResize = () => renderer.resize();
    window.addEventListener('resize', onResize);

    let running = true;
    function loop() {
      if (!running) return;
      renderer.render(gameState, hoveredAppleRef.current);
      animIdRef.current = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      running = false;
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [gameState]);

  function handleMouseMove(e) {
    const renderer = rendererRef.current;
    if (!renderer || !gameState) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { x, y } = renderer.c2w(e.clientX - rect.left, e.clientY - rect.top);
    const gs = gameState.gridSize;

    if (tooltipRef.current) {
      if (x >= 0 && x <= gs && y >= 0 && y <= gs) {
        tooltipRef.current.textContent = `(${x}, ${y})`;
        tooltipRef.current.style.left = (e.clientX + 12) + 'px';
        tooltipRef.current.style.top  = (e.clientY - 28) + 'px';
        tooltipRef.current.style.display = 'block';
      } else {
        tooltipRef.current.style.display = 'none';
      }
    }

    const hov = gameState.apples.find(a => a.x === x && a.y === y);
    hoveredAppleRef.current = (hov && !hov.eaten) ? hov : null;
    canvasRef.current.style.cursor = hov ? (hov.eaten ? 'not-allowed' : 'pointer') : 'crosshair';
  }

  function handleMouseLeave() {
    if (tooltipRef.current) tooltipRef.current.style.display = 'none';
    hoveredAppleRef.current = null;
  }

  return (
    <div className="canvas-wrapper" style={{ position: 'relative', flex: 1, minWidth: 0, minHeight: 0 }}>
      <canvas
        ref={canvasRef}
        id="gameCanvas"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'block' }}
      />
      {/* coord tooltip */}
      <div
        ref={tooltipRef}
        id="coordTooltip"
        style={{
          position: 'fixed', display: 'none',
          background: 'rgba(0,0,0,0.7)', color: '#fff',
          fontSize: '0.8em', padding: '2px 8px', borderRadius: 6,
          pointerEvents: 'none', zIndex: 9999,
        }}
      />
    </div>
  );
});

export default GameCanvas;
