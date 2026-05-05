export class GameState {
    constructor(player1Name, player2Name, appleDensity, timePerTurn, applePositions = null, gridSize = 10) {
        this.initialTimePerTurn = timePerTurn;
        this.timeRemaining = timePerTurn;
        this.startedAt = Date.now();

        this.player1 = {
            name: player1Name, score: 0, expressionsUsed: 0,
            penaltyFactor: 1.0, currentLine: null, previewLine: null,
            eatenApples: [], history: [],
            linearUsesCount: 0, linearCooldownEnd: 0,
        };
        this.player2 = {
            name: player2Name, score: 0, expressionsUsed: 0,
            penaltyFactor: 1.0, currentLine: null, previewLine: null,
            eatenApples: [], history: [],
            linearUsesCount: 0, linearCooldownEnd: 0,
        };

        this.apples = [];
        this.appleDensity = appleDensity;
        this.gridSize = parseInt(gridSize) || 10;
        this.totalPoints = this.gridSize * this.gridSize;
        this.gameOver = false;
        this.endReason = null;

        this.initializeApples(applePositions);
    }

    initializeApples(positions) {
        if (positions && positions.length > 0) {
            this.apples = positions.map(p => ({ x: p.x, y: p.y, eaten: false, eatenBy: null }));
        } else {
            const count = Math.floor(this.totalPoints * this.appleDensity);
            const posSet = new Set();
            while (posSet.size < count) {
                const x = Math.floor(Math.random() * this.gridSize);
                const y = Math.floor(Math.random() * this.gridSize);
                posSet.add(`${x},${y}`);
            }
            this.apples = Array.from(posSet).map(p => {
                const [x, y] = p.split(',').map(Number);
                return { x, y, eaten: false, eatenBy: null };
            });
        }
        this.totalApples = this.apples.length;
    }

    eatApple(x, y, playerNum, points) {
        const apple = this.apples.find(a => a.x === x && a.y === y && !a.eaten);
        if (!apple) return false;
        apple.eaten = true;
        apple.eatenBy = playerNum;
        const player = playerNum === 1 ? this.player1 : this.player2;
        player.eatenApples.push({ x, y });
        player.score += points;
        return true;
    }

    getRemainingApples() { return this.apples.filter(a => !a.eaten); }
    getElapsedSeconds() { return Math.floor((Date.now() - this.startedAt) / 1000); }
    getElapsedMs() { return Date.now() - this.startedAt; }
}
