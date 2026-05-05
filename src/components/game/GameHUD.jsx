export default function GameHUD({
  myPlayerNum,
  p1Penalty, p2Penalty,
  history, mode,
  equationValue, onEquationChange, onSubmit, errorMsg,
  myCooldown,
}) {
  const myNum = myPlayerNum;
  const myPenalty = myNum === 1 ? p1Penalty : p2Penalty;
  const showPenalty = mode === 'balanced' || mode === 'pro';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Equation input */}
      {myNum !== 0 && (
        <div className="player-input">
          <h3>Enter equation:</h3>
          <div className="input-group">
            <span className="equation-prefix">y =</span>
            <input
              className="equation-input"
              type="text"
              placeholder="x^2 + x - 1"
              value={equationValue}
              onChange={e => onEquationChange(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') onSubmit(); }}
              autoComplete="off"
            />
            <button
              className="btn btn-submit"
              onClick={onSubmit}
              disabled={!!myCooldown}
              style={{ padding: '9px 16px', flexShrink: 0 }}
            >
              {myCooldown ? `${myCooldown}s` : 'Go'}
            </button>
          </div>
          {errorMsg && <div className="error-message error-flash">{errorMsg}</div>}
          {showPenalty && (
            <div className="penalty-display">Penalty: ×{myPenalty.toFixed(2)}</div>
          )}
        </div>
      )}

      {/* History */}
      <div className="history-panel">
        <div className="history-title">📋 History</div>
        <div className="history-log">
          {history.map((entry) => {
            const color = entry.playerNum === 1 ? '#4a9eff' : '#e24a4a';
            const totalMs = entry.time;
            const m  = Math.floor(totalMs / 60000);
            const s  = Math.floor((totalMs % 60000) / 1000);
            const cs = Math.round((totalMs % 1000) / 10);
            const timeStr = `[${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')},${cs.toString().padStart(2,'0')}]`;
            const hasApples  = entry.applesEaten > 0;
            const resultText = hasApples ? `+${entry.applesEaten}🍎 +${entry.pointsGained}pts` : 'miss';
            return (
              <div key={`${entry.playerNum}-${entry.time}`} className="history-entry">
                <span className="h-time">{timeStr}</span>
                <span className="h-name" style={{ color }}>{entry.playerName}</span>
                <span className="h-eq">{entry.equation}</span>
                {entry.penalty != null && <span className="h-penalty">×{entry.penalty.toFixed(2)}</span>}
                <span className={`h-result${hasApples ? '' : ' miss'}`}>{resultText}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
