export class TimerManager {
    constructor(onTick, onExpire) {
        this.timer = null;
        this.onTick = onTick;     // (secondsRemaining) => void
        this.onExpire = onExpire; // () => void
    }

    start(gameState) {
        this.stop();
        this.timer = setInterval(() => {
            if (gameState.startedAt) {
                const elapsedSec = Math.floor((Date.now() - gameState.startedAt) / 1000);
                gameState.timeRemaining = Math.max(0, gameState.initialTimePerTurn - elapsedSec);
            } else {
                gameState.timeRemaining--;
            }
            this.onTick?.(gameState.timeRemaining);
            if (gameState.timeRemaining <= 0) {
                gameState.timeRemaining = 0;
                this.stop();
                this.onExpire?.();
            }
        }, 100);
        this.onTick?.(gameState.timeRemaining);
    }

    stop() {
        if (this.timer) { clearInterval(this.timer); this.timer = null; }
    }

    static formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }
}
