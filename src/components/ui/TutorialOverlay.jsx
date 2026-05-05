import { useEffect } from 'react';

export default function TutorialOverlay({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="tutorial-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="tutorial-scroll">
        <svg className="vine vine-tl" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 115 Q30 60 80 20 Q50 40 60 80 Q40 50 90 10" stroke="#7a5c2e" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <ellipse cx="80" cy="20" rx="8" ry="5" fill="#4a7c3f" transform="rotate(-30 80 20)" opacity="0.8"/>
          <ellipse cx="60" cy="80" rx="7" ry="4" fill="#4a7c3f" transform="rotate(20 60 80)" opacity="0.7"/>
          <ellipse cx="35" cy="55" rx="6" ry="3.5" fill="#5a8c4a" transform="rotate(-50 35 55)" opacity="0.75"/>
        </svg>
        <svg className="vine vine-tr" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M115 115 Q90 60 40 20 Q70 40 60 80 Q80 50 30 10" stroke="#7a5c2e" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <ellipse cx="40" cy="20" rx="8" ry="5" fill="#4a7c3f" transform="rotate(30 40 20)" opacity="0.8"/>
          <ellipse cx="60" cy="80" rx="7" ry="4" fill="#4a7c3f" transform="rotate(-20 60 80)" opacity="0.7"/>
          <ellipse cx="85" cy="55" rx="6" ry="3.5" fill="#5a8c4a" transform="rotate(50 85 55)" opacity="0.75"/>
        </svg>

        <button className="tutorial-close" onClick={onClose}>✕</button>

        <div className="scroll-header">
          <div className="scroll-title-ornament">✦ ── ✦</div>
          <h2 className="scroll-title">📜 Poly Apple — Grimoire</h2>
          <div className="scroll-title-ornament">✦ ── ✦</div>
        </div>

        <div className="scroll-body">
          <section className="scroll-section">
            <h3>⚔️ The Battle</h3>
            <p>Two wizards face each other across an enchanted coordinate plane, where Apples gleam at the <strong>integer lattice points</strong>. Each turn, conjure a <strong>polynomial spell</strong> of the form <code>y = f(x)</code>. Every Apple whose coordinates satisfy your equation is consumed. The wizard who harvests the most apples claims victory.</p>
          </section>

          <div className="scroll-divider">⁂</div>

          <section className="scroll-section">
            <h3>🍎 Harvesting Apples</h3>
            <p>Your spell is a curve on the coordinate grid. Any <strong>Apple that lies on the curve</strong> (at integer grid points) is consumed. The more apples your spell captures, the higher your score.</p>
            <div className="scroll-tip">💡 A well-placed parabola can sweep entire rows of apples in one cast!</div>
          </section>

          <div className="scroll-divider">⁂</div>

          <section className="scroll-section">
            <h3>✍️ Casting a Spell</h3>
            <p>Type your equation in the input panel, then press <kbd>Enter</kbd> or click <strong>Cast</strong>. Every spell must be a true <strong>polynomial in <em>x</em></strong>:</p>
            <div className="scroll-formula">f(x) = a<sub>n</sub>x<sup>n</sup> + a<sub>n−1</sub>x<sup>n−1</sup> + … + a<sub>1</sub>x + a<sub>0</sub></div>
            <ul className="scroll-list">
              <li>⚡ <strong>Degree ≤ 10</strong></li>
              <li>⚡ <strong>Integer coefficients only</strong></li>
              <li>⚡ <strong>|aᵢ| ≤ 10⁹</strong></li>
              <li>⚡ <strong>No parentheses</strong></li>
              <li>✨ <strong>Free ordering &amp; repetition</strong> of terms</li>
            </ul>
          </section>

          <div className="scroll-divider">⁂</div>

          <section className="scroll-section">
            <h3>⚡ Game Modes</h3>
            <ul className="scroll-list mode-list">
              <li><strong>Free Play</strong> — All spells allowed.</li>
              <li><strong>Balanced</strong> — Trivial spells (degree 0 &amp; 1) limited to <em>3 uses</em> with exponential cooldown (2s → 4s → 8s).</li>
              <li><strong>Poly Masters</strong> — Only degree ≥ 2 spells permitted.</li>
            </ul>
          </section>

          <div className="scroll-divider">⁂</div>

          <section className="scroll-section">
            <h3>⏳ The Arcane Timer</h3>
            <p>Each turn is timed. If the hourglass runs out before you cast, your turn is forfeited.</p>
          </section>

          <div className="scroll-divider">⁂</div>

          <section className="scroll-section">
            <h3>🏆 Victory Conditions</h3>
            <p>The duel ends when all apples are harvested or time expires.</p>
            <ol className="scroll-list">
              <li>🥇 <strong>Score</strong></li>
              <li>🍎 <strong>Apples eaten</strong></li>
              <li>✍️ <strong>Fewer spells cast</strong></li>
              <li>⏱ <strong>Earlier last cast</strong></li>
              <li>🤝 <strong>Draw</strong></li>
            </ol>
            <p style={{ marginTop: '10px', fontStyle: 'italic' }}>May your polynomials be ever in your favour.</p>
          </section>
        </div>

        <div className="scroll-footer">── ⚜ Poly Apple Academy ⚜ ──</div>
      </div>
    </div>
  );
}
