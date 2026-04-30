// ===========================
// AVATAR & NAME DATA
// ===========================
const KAHOOT_NAMES = [
    'SpeedyNoodle','CosmicPanda','NeonWaffle','LazyRocket',
    'BoldSushi','PixelNinja','FrostyTaco','ZappyLlama',
    'GoldenMochi','SilverFox','CrimsonOwl','TurboSloth',
    'MysticBagel','NovaSeal','ChaoticPug','WildDumpling',
    'SwiftCorgi','BlazeHedgehog','StormyKoala','LuckyPanda',
    'EchoWaffle','RadiantCrab','VelvetMoose','ZengoGhost',
    'CoolNarwhal','FluffyQuasar','SpunkyDragon','TinyBullet',
    'PrismaticToad','BraveCookie','GloomyLobster','JazzyUnicorn',
    'WarpedKoala','SneakyBambi','TurboRaccoon','CrypticOtter',
    'FierceYokai','ChilledKitsune','HyperTofu','MightyMochi'
];

const AVATARS = [
    // 0: Blue Cat
    { color: '#4a9eff', svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><polygon points="12,24 17,6 23,24" fill="#4a9eff"/><polygon points="41,24 47,6 52,24" fill="#4a9eff"/><circle cx="32" cy="36" r="22" fill="#4a9eff"/><circle cx="22" cy="34" r="6" fill="white"/><circle cx="42" cy="34" r="6" fill="white"/><circle cx="23" cy="34" r="3.5" fill="#1e272e"/><circle cx="43" cy="34" r="3.5" fill="#1e272e"/><circle cx="24" cy="33" r="1" fill="white"/><circle cx="44" cy="33" r="1" fill="white"/><path d="M26 43 Q32 48 38 43" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/><line x1="8" y1="39" x2="22" y2="41" stroke="#aaa" stroke-width="1"/><line x1="42" y1="41" x2="56" y2="39" stroke="#aaa" stroke-width="1"/></svg>` },
    // 1: Pink Bunny
    { color: '#ff7eb3', svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><ellipse cx="18" cy="14" rx="7" ry="13" fill="#ffb3d1"/><ellipse cx="46" cy="14" rx="7" ry="13" fill="#ffb3d1"/><circle cx="32" cy="36" r="22" fill="#ffe0ee"/><circle cx="22" cy="34" r="6" fill="white"/><circle cx="42" cy="34" r="6" fill="white"/><circle cx="23" cy="34" r="3.5" fill="#6c5ce7"/><circle cx="43" cy="34" r="3.5" fill="#6c5ce7"/><circle cx="24" cy="33" r="1" fill="white"/><circle cx="44" cy="33" r="1" fill="white"/><circle cx="32" cy="42" r="3" fill="#ff7eb3"/><path d="M26 45 Q32 49 38 45" stroke="#555" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>` },
    // 2: Orange Fox
    { color: '#fd9644', svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><polygon points="10,22 4,4 22,16" fill="#fd9644"/><polygon points="54,22 60,4 42,16" fill="#fd9644"/><circle cx="32" cy="36" r="22" fill="#fd9644"/><ellipse cx="32" cy="44" rx="14" ry="9" fill="#fff5e0"/><circle cx="22" cy="32" r="6" fill="white"/><circle cx="42" cy="32" r="6" fill="white"/><circle cx="23" cy="32" r="3.5" fill="#2d3436"/><circle cx="43" cy="32" r="3.5" fill="#2d3436"/><circle cx="24" cy="31" r="1" fill="white"/><circle cx="44" cy="31" r="1" fill="white"/><path d="M27 43 Q32 47 37 43" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>` },
    // 3: Purple Bear
    { color: '#a29bfe', svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="18" r="10" fill="#a29bfe"/><circle cx="51" cy="18" r="10" fill="#a29bfe"/><circle cx="32" cy="36" r="22" fill="#a29bfe"/><ellipse cx="32" cy="44" rx="12" ry="8" fill="#d6cefc"/><circle cx="22" cy="32" r="6" fill="white"/><circle cx="42" cy="32" r="6" fill="white"/><circle cx="23" cy="32" r="3.5" fill="#2d3436"/><circle cx="43" cy="32" r="3.5" fill="#2d3436"/><circle cx="24" cy="31" r="1" fill="white"/><circle cx="44" cy="31" r="1" fill="white"/><path d="M27 44 Q32 48 37 44" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>` },
    // 4: Green Frog
    { color: '#00b894', svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="20" r="11" fill="#00b894"/><circle cx="52" cy="20" r="11" fill="#00b894"/><circle cx="32" cy="38" r="22" fill="#00b894"/><circle cx="22" cy="30" r="8" fill="white"/><circle cx="42" cy="30" r="8" fill="white"/><circle cx="22" cy="30" r="4.5" fill="#1a1a2e"/><circle cx="42" cy="30" r="4.5" fill="#1a1a2e"/><circle cx="23" cy="29" r="1.5" fill="white"/><circle cx="43" cy="29" r="1.5" fill="white"/><path d="M24 44 Q32 50 40 44" stroke="#006952" stroke-width="2" fill="none" stroke-linecap="round"/></svg>` },
    // 5: Yellow Chick
    { color: '#f9ca24', svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="26" r="8" fill="#f9ca24"/><circle cx="52" cy="26" r="8" fill="#f9ca24"/><circle cx="32" cy="36" r="22" fill="#f9ca24"/><circle cx="22" cy="34" r="6" fill="white"/><circle cx="42" cy="34" r="6" fill="white"/><circle cx="23" cy="34" r="3.5" fill="#2d3436"/><circle cx="43" cy="34" r="3.5" fill="#2d3436"/><circle cx="24" cy="33" r="1" fill="white"/><circle cx="44" cy="33" r="1" fill="white"/><polygon points="28,43 32,50 36,43" fill="#e67e22"/></svg>` },
    // 6: Red Panda
    { color: '#e17055', svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="18" r="10" fill="#e17055"/><circle cx="51" cy="18" r="10" fill="#e17055"/><circle cx="32" cy="36" r="22" fill="#e17055"/><ellipse cx="32" cy="44" rx="13" ry="8" fill="#fff5f0"/><circle cx="22" cy="33" r="6" fill="white"/><circle cx="42" cy="33" r="6" fill="white"/><circle cx="23" cy="33" r="3.5" fill="#2d3436"/><circle cx="43" cy="33" r="3.5" fill="#2d3436"/><circle cx="24" cy="32" r="1" fill="white"/><circle cx="44" cy="32" r="1" fill="white"/><path d="M26 44 Q32 49 38 44" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>` },
    // 7: Teal Owl
    { color: '#00cec9', svg: `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><polygon points="20,16 26,26 14,26" fill="#00cec9"/><polygon points="44,16 50,26 38,26" fill="#00cec9"/><circle cx="32" cy="36" r="22" fill="#00cec9"/><circle cx="22" cy="34" r="9" fill="white"/><circle cx="42" cy="34" r="9" fill="white"/><circle cx="22" cy="34" r="5" fill="#fdcb6e"/><circle cx="42" cy="34" r="5" fill="#fdcb6e"/><circle cx="22" cy="34" r="3" fill="#2d3436"/><circle cx="42" cy="34" r="3" fill="#2d3436"/><circle cx="23" cy="33" r="1" fill="white"/><circle cx="43" cy="33" r="1" fill="white"/><polygon points="29,43 32,48 35,43" fill="#e67e22"/></svg>` },
];

function getRandomName() {
    return KAHOOT_NAMES[Math.floor(Math.random() * KAHOOT_NAMES.length)];
}

function getRandomAvatarIndex() {
    return Math.floor(Math.random() * AVATARS.length);
}

function renderAvatar(avatarIndex, size = 48) {
    const av = AVATARS[avatarIndex] || AVATARS[0];
    return `<div style="width:${size}px;height:${size}px;border-radius:50%;overflow:hidden;border:3px solid ${av.color};display:inline-flex;align-items:center;justify-content:center;background:white;flex-shrink:0;">${av.svg}</div>`;
}

// ===========================
// SOUND MANAGER
// ===========================
class SoundManager {
    constructor() {
        this.enabled = true;
        this._ctx = null;
    }

    get ctx() {
        if (!this._ctx) {
            try { this._ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
        }
        return this._ctx;
    }

    tone(freq, duration, vol = 0.3, type = 'sine') {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
            osc.start(this.ctx.currentTime);
            osc.stop(this.ctx.currentTime + duration);
        } catch(e) {}
    }

    countdown(n) {
        // 3→high, 2→mid, 1→low, 0→GO chord
        if (n > 0) {
            const pitches = [0, 415, 466, 523]; // index = n
            this.tone(pitches[Math.min(n, 3)] || 440, 0.35, 0.5);
        } else {
            this.tone(523, 0.4, 0.4);
            setTimeout(() => this.tone(659, 0.4, 0.35), 60);
            setTimeout(() => this.tone(784, 0.6, 0.3), 120);
        }
    }

    appleEat() {
        this.tone(880, 0.1, 0.5);
        setTimeout(() => this.tone(1174, 0.15, 0.3), 60);
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

const soundManager = new SoundManager();

function toggleSound() {
    const on = soundManager.toggle();
    const btn = document.getElementById('soundToggleBtn');
    if (btn) btn.textContent = on ? '🔊' : '🔇';
}

// ===========================
// GAME STATE
// ===========================
class GameState {
    constructor(player1Name, player2Name, appleDensity, timePerTurn, applePositions = null) {
        this.initialTimePerTurn = timePerTurn;
        this.timeRemaining = timePerTurn;
        this.startedAt = Date.now();

        this.player1 = {
            name: player1Name, score: 0, expressionsUsed: 0,
            penaltyFactor: 1.0, currentLine: null,
            eatenApples: [], history: [],
            linearUsesCount: 0, linearCooldownEnd: 0
        };
        this.player2 = {
            name: player2Name, score: 0, expressionsUsed: 0,
            penaltyFactor: 1.0, currentLine: null,
            eatenApples: [], history: [],
            linearUsesCount: 0, linearCooldownEnd: 0
        };

        this.apples = [];
        this.appleDensity = appleDensity;
        this.gridSize = 10;
        this.totalApples = 0;
        this.gameOver = false;
        this.endReason = null;

        this.initializeApples(applePositions);
    }

    initializeApples(positions) {
        if (positions && positions.length > 0) {
            this.apples = positions.map(p => ({ x: p.x, y: p.y, eaten: false, eatenBy: null }));
        } else {
            const total = (this.gridSize + 1) * (this.gridSize + 1);
            const count = Math.floor(total * this.appleDensity);
            const posSet = new Set();
            while (posSet.size < count) {
                const x = Math.floor(Math.random() * (this.gridSize + 1));
                const y = Math.floor(Math.random() * (this.gridSize + 1));
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

// ===========================
// INPUT PARSER  (polynomial up to degree 10)
// ===========================
class InputParser {
    static parse(input) {
        if (!input || typeof input !== 'string') throw new Error('Invalid input');

        const norm = input.trim().toLowerCase().replace(/\s+/g, '');

        // x = c  (vertical line) — not supported
        if (/^x=(-?\d+\.?\d*)$/.test(norm)) {
            throw new Error('x = constant not supported — use y = f(x) instead');
        }

        // must start with y =
        const m = norm.match(/^y=(.+)$/);
        if (!m) throw new Error('Format: y = f(x)');

        const expr = m[1];

        // Allow only safe math characters
        if (!/^[\dx+\-*/^().]+$/i.test(expr)) {
            throw new Error('Only numbers, x, and operators ( + − × / ^ ) are allowed');
        }

        // Convert ^ to ** for JS eval
        const jsExpr = expr.replace(/\^/g, '**');

        // Build evaluator
        let evalFn;
        try {
            // eslint-disable-next-line no-new-func
            evalFn = new Function('x', `"use strict"; return (${jsExpr});`);
            const test = evalFn(1);
            if (typeof test !== 'number' || !isFinite(test)) throw new Error('non-finite result');
        } catch(e) {
            throw new Error('Cannot evaluate expression — check syntax');
        }

        const degree = InputParser.detectDegree(evalFn);
        const points = InputParser.getCurvePoints(evalFn);

        return { type: 'polynomial', evalFn, expr: input.trim(), degree, isValid: true, points };
    }

    // Finite-difference method: n-th differences of a degree-n polynomial are constant
    static detectDegree(evalFn) {
        try {
            let vals = [];
            for (let i = 0; i <= 13; i++) vals.push(evalFn(i));

            for (let n = 0; n <= 10; n++) {
                const range = Math.max(...vals) - Math.min(...vals);
                if (range < 1e-6) return n;
                const next = [];
                for (let i = 1; i < vals.length; i++) next.push(vals[i] - vals[i - 1]);
                vals = next;
                if (vals.length === 0) return n;
            }
        } catch(e) { /* fall through */ }
        return 10;
    }

    // Sample 400 points x ∈ [-1, 11]; null marks discontinuities / off-range values
    static getCurvePoints(evalFn) {
        const pts = [];
        const steps = 400;
        for (let i = 0; i <= steps; i++) {
            const x = -1 + (12 / steps) * i;
            try {
                const y = evalFn(x);
                pts.push(isFinite(y) ? { x, y } : null);
            } catch(e) { pts.push(null); }
        }
        return pts;
    }
}

// ===========================
// RENDERER
// ===========================
class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 10;
        this.pad = 1;
        this.displayUnits = this.gridSize + 2 * this.pad; // 12

        this.pan = { x: 0, y: 0 };
        this.dragging = false;
        this.dragOrigin = { x: 0, y: 0 };
        this.panOrigin  = { x: 0, y: 0 };
        this.panLimit = 45;

        this.resize();
        this._bindPan();
    }

    resize() {
        const wrapper = this.canvas.parentElement;
        const s = Math.max(260, Math.min(wrapper.clientWidth - 20, wrapper.clientHeight - 20));
        this.canvas.width  = s;
        this.canvas.height = s;
        this.size = s;
        this.unit = s / this.displayUnits;
    }

    w2c(wx, wy) {
        return {
            cx: (wx + this.pad) * this.unit + this.pan.x,
            cy: (this.gridSize + this.pad - wy) * this.unit + this.pan.y
        };
    }

    c2w(cx, cy) {
        const wx = (cx - this.pan.x) / this.unit - this.pad;
        const wy = this.gridSize + this.pad - (cy - this.pan.y) / this.unit;
        return { x: Math.round(wx), y: Math.round(wy) };
    }

    _bindPan() {
        const c = this.canvas;
        c.addEventListener('mousedown', e => {
            if (e.button !== 1 && !e.altKey) return;
            this.dragging = true;
            this.dragOrigin = { x: e.clientX, y: e.clientY };
            this.panOrigin  = { x: this.pan.x, y: this.pan.y };
            c.style.cursor = 'grabbing';
        });
        window.addEventListener('mousemove', e => {
            if (!this.dragging) return;
            const dx = e.clientX - this.dragOrigin.x;
            const dy = e.clientY - this.dragOrigin.y;
            const lim = this.panLimit;
            this.pan.x = Math.max(-lim, Math.min(lim, this.panOrigin.x + dx));
            this.pan.y = Math.max(-lim, Math.min(lim, this.panOrigin.y + dy));
        });
        window.addEventListener('mouseup', () => {
            if (this.dragging) { this.dragging = false; c.style.cursor = 'crosshair'; }
        });
    }

    clear() {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, this.size, this.size);
    }

    drawGrid() {
        const ctx = this.ctx;
        for (let i = 0; i <= this.gridSize; i++) {
            const { cx }  = this.w2c(i, 0);
            ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, this.size);
            ctx.strokeStyle = i === 0 ? '#888' : '#e4e4e4';
            ctx.lineWidth   = i === 0 ? 1.5 : 1;
            ctx.stroke();

            const { cy } = this.w2c(0, i);
            ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(this.size, cy);
            ctx.strokeStyle = i === 0 ? '#888' : '#e4e4e4';
            ctx.lineWidth   = i === 0 ? 1.5 : 1;
            ctx.stroke();
        }
    }

    drawAxes() {
        const ctx = this.ctx;
        const arrowSz = Math.max(6, this.unit * 0.18);

        const { cx: ax,  cy: ayBot } = this.w2c(0, -0.3);
        const { cx: ax2, cy: ayTop } = this.w2c(0, this.gridSize + 0.5);
        ctx.save();
        ctx.strokeStyle = '#333'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(ax, ayBot); ctx.lineTo(ax2, ayTop); ctx.stroke();
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(ax2, ayTop);
        ctx.lineTo(ax2 - arrowSz * 0.45, ayTop + arrowSz);
        ctx.lineTo(ax2 + arrowSz * 0.45, ayTop + arrowSz);
        ctx.closePath(); ctx.fill();
        ctx.font = `bold ${Math.max(11, Math.floor(this.unit * 0.35))}px Arial`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText('y', ax2, ayTop - 4);

        const { cx: axLeft, cy: ay  } = this.w2c(-0.3, 0);
        const { cx: axRight, cy: ay2 } = this.w2c(this.gridSize + 0.5, 0);
        ctx.beginPath(); ctx.moveTo(axLeft, ay); ctx.lineTo(axRight, ay2); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(axRight, ay2);
        ctx.lineTo(axRight - arrowSz, ay2 - arrowSz * 0.45);
        ctx.lineTo(axRight - arrowSz, ay2 + arrowSz * 0.45);
        ctx.closePath(); ctx.fill();
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText('x', axRight + 6, ay2);
        ctx.restore();
    }

    drawLabels() {
        const ctx = this.ctx;
        const fs = Math.max(9, Math.floor(this.unit * 0.28));
        ctx.save();
        ctx.font = `${fs}px Arial`;
        ctx.fillStyle = '#666';

        for (let i = 0; i <= this.gridSize; i++) {
            const { cx, cy: yAxis } = this.w2c(i, 0);
            // numbers below x-axis — extra offset so apples don't cover them
            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillText(i, cx, yAxis + 14);

            if (i > 0) {
                const { cx: xAxis, cy } = this.w2c(0, i);
                // numbers left of y-axis
                ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                ctx.fillText(i, xAxis - 10, cy);
            }
        }
        ctx.restore();
    }

    drawApples(apples, hoveredX = null, hoveredY = null) {
        const ctx = this.ctx;
        const r = Math.max(5, this.unit * 0.17);

        apples.forEach(apple => {
            const { cx, cy } = this.w2c(apple.x, apple.y);
            if (apple.eaten) {
                const color = apple.eatenBy === 1 ? '#4a9eff' : '#e24a4a';
                const d = r * 0.75;
                ctx.save();
                ctx.globalAlpha = 0.5;
                ctx.strokeStyle = color;
                ctx.lineWidth = Math.max(2, r * 0.5);
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(cx - d, cy - d); ctx.lineTo(cx + d, cy + d);
                ctx.moveTo(cx + d, cy - d); ctx.lineTo(cx - d, cy + d);
                ctx.stroke();
                ctx.restore();
            } else {
                const isHov = apple.x === hoveredX && apple.y === hoveredY;
                const rad   = isHov ? r * 1.35 : r;
                ctx.save();
                ctx.shadowColor = '#ff3300';
                ctx.shadowBlur  = isHov ? 16 : 9;
                ctx.fillStyle   = isHov ? '#ff1a1a' : '#ff4444';
                ctx.beginPath();
                ctx.arc(cx, cy, rad, 0, 2 * Math.PI);
                ctx.fill();
                ctx.shadowBlur = 0;
                ctx.fillStyle  = 'rgba(255,255,255,0.45)';
                ctx.beginPath();
                ctx.arc(cx - rad * 0.28, cy - rad * 0.28, rad * 0.28, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
            }
        });
    }

    // Draws a line or polynomial curve from parsed lineData
    drawLineFromData(lineData, color, width = 2.5) {
        if (!lineData) return;
        const ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineJoin = 'round';
        ctx.lineCap  = 'round';

        if (lineData.type === 'vertical') {
            const { cx } = this.w2c(lineData.x, 0);
            ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, this.size); ctx.stroke();
        } else if (lineData.points && lineData.points.length > 0) {
            ctx.beginPath();
            let penDown = false;
            let prevCy  = null;
            lineData.points.forEach(p => {
                if (p === null) { penDown = false; prevCy = null; return; }
                const { cx, cy } = this.w2c(p.x, p.y);
                if (cy < -this.size * 2 || cy > this.size * 3) { penDown = false; prevCy = null; return; }
                // Lift pen on discontinuity (e.g. asymptote)
                if (prevCy !== null && Math.abs(cy - prevCy) > this.size * 1.5) {
                    penDown = false;
                }
                if (!penDown) { ctx.moveTo(cx, cy); penDown = true; }
                else ctx.lineTo(cx, cy);
                prevCy = cy;
            });
            ctx.stroke();
        }
        ctx.restore();
    }

    render(gameState, highlightApple = null) {
        this.clear();
        this.drawGrid();
        this.drawAxes();
        this.drawLabels();

        if (gameState.player1.currentLine) {
            this.drawLineFromData(gameState.player1.currentLine, '#4a9eff', 2.5);
        }
        if (gameState.player2.currentLine) {
            this.ctx.setLineDash([6, 4]);
            this.drawLineFromData(gameState.player2.currentLine, '#e24a4a', 2.5);
            this.ctx.setLineDash([]);
        }

        const hx = highlightApple?.x ?? null;
        const hy = highlightApple?.y ?? null;
        this.drawApples(gameState.apples, hx, hy);
    }
}

// ===========================
// TIMER MANAGER
// ===========================
class TimerManager {
    constructor() { this.timer = null; }

    start(gameState) {
        this.stop();
        this.timer = setInterval(() => {
            if (gameState.startedAt) {
                const elapsedSec = Math.floor((Date.now() - gameState.startedAt) / 1000);
                gameState.timeRemaining = Math.max(0, gameState.initialTimePerTurn - elapsedSec);
            } else {
                gameState.timeRemaining--;
            }
            this.updateDisplay(gameState.timeRemaining);
            if (gameState.timeRemaining <= 0) {
                gameState.timeRemaining = 0;
                this.stop();
                if (typeof gameLogic !== 'undefined' && gameLogic.checkGameEnd) {
                    gameLogic.checkGameEnd();
                }
            }
        }, 100);
        this.updateDisplay(gameState.timeRemaining);
    }

    stop() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }

    updateDisplay(seconds) {
        const el = document.getElementById('gameTimer');
        if (!el) return;
        el.textContent = this.formatTime(seconds);
        el.style.color = seconds <= 10 ? '#ff4444' : '';
    }

    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    }
}

// ===========================
// FIREWORKS
// ===========================
class Fireworks {
    constructor() {
        this.canvas = document.getElementById('fireworksCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    start() {
        if (!this.canvas) return;
        this.canvas.classList.remove('hidden');
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height * 0.6;
            for (let j = 0; j < 50; j++) {
                const angle = Math.random() * 2 * Math.PI;
                const speed = Math.random() * 8 + 4;
                this.particles.push({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    decay: Math.random() * 0.015 + 0.015,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`
                });
            }
        }
        this.animate();
    }

    animate() {
        if (!this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = this.particles.filter(p => p.life > 0);
        if (this.particles.length === 0) { this.canvas.classList.add('hidden'); return; }
        this.particles.forEach(p => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life -= p.decay;
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life;
            this.ctx.fillRect(p.x, p.y, 3, 3);
        });
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// ===========================
// GAME LOGIC
// ===========================
class GameLogic {
    constructor() {
        this.gameState   = null;
        this.renderer    = null;
        this.timerManager = new TimerManager();
        this.fireworks   = new Fireworks();
        this.hoveredApple = null;
        this.gameConfig  = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const canvas = document.getElementById('gameCanvas');
        if (canvas) {
            canvas.addEventListener('mousemove', e => this.handleCanvasMouseMove(e));
            canvas.addEventListener('mouseleave', () => this.handleCanvasMouseLeave());
        }

        document.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                if (document.activeElement.id === 'equation1') this.submitEquation(1);
                else if (document.activeElement.id === 'equation2') this.submitEquation(2);
            }
        });
    }

    startGameMultiplayer(creatorName, joinerName, myPlayerNum, appleDensity, timePerTurn, applePositions) {
        this.startGameWithConfig(creatorName, joinerName, myPlayerNum, appleDensity, timePerTurn, applePositions);
    }

    startGameWithConfig(player1Name, player2Name, myPlayerNum, appleDensity, timePerTurn, applePositions) {
        this.gameConfig = { player1Name, player2Name, myPlayerNum, appleDensity, timePerTurn };
        this.gameState  = new GameState(player1Name, player2Name, appleDensity, timePerTurn, applePositions);
        this.renderer   = new Renderer('gameCanvas');

        // Show only my input panel (if player)
        const myInput  = document.getElementById(`player${myPlayerNum}Input`);
        const oppNum   = myPlayerNum === 1 ? 2 : 1;
        const oppInput = document.getElementById(`player${oppNum}Input`);
        
        if (myPlayerNum === 0) {
            // Guest mode
            const p1Input = document.getElementById('player1Input');
            const p2Input = document.getElementById('player2Input');
            if (p1Input) p1Input.classList.add('hidden');
            if (p2Input) p2Input.classList.add('hidden');
            
            const surrenderBtn = document.getElementById('surrenderBtn');
            const exitBtn = document.getElementById('exitBtn');
            if (surrenderBtn) surrenderBtn.style.display = 'none';
            if (exitBtn) {
                exitBtn.textContent = '🚪 Leave Spectate';
                exitBtn.onclick = exitGuestView;
            }
        } else {
            if (myInput)  myInput.classList.remove('hidden');
            if (oppInput) oppInput.classList.add('hidden');
            
            const surrenderBtn = document.getElementById('surrenderBtn');
            const exitBtn = document.getElementById('exitBtn');
            if (surrenderBtn) surrenderBtn.style.display = 'inline-block';
            if (exitBtn) {
                exitBtn.textContent = '🚪 Exit';
                exitBtn.onclick = () => gameLogic.exit();
            }
        }

        // Clear old identity text (no longer used)
        const identEl = document.getElementById(`myPlayerIdentity${myPlayerNum}`);
        if (identEl) identEl.textContent = '';

        // Highlight own player card with team color (skip for guest, myPlayerNum=0)
        if (myPlayerNum !== 0) {
            const oppNum2 = myPlayerNum === 1 ? 2 : 1;
            document.getElementById(`playerCard${myPlayerNum}`).classList.add(`my-player-card-${myPlayerNum}`);
            document.getElementById(`playerCard${oppNum2}`).classList.remove('my-player-card-1', 'my-player-card-2');
            const myTag  = document.getElementById(`youTag${myPlayerNum}`);
            const oppTag = document.getElementById(`youTag${oppNum2}`);
            myTag.className      = `you-tag you-tag-${myPlayerNum}`;
            myTag.style.display  = '';
            oppTag.className     = 'you-tag you-tag-hidden';
            oppTag.style.display = 'none';
        } else {
            document.getElementById('playerCard1').classList.remove('my-player-card-1', 'my-player-card-2');
            document.getElementById('playerCard2').classList.remove('my-player-card-1', 'my-player-card-2');
            document.getElementById('youTag1').style.display = 'none';
            document.getElementById('youTag2').style.display = 'none';
        }

        // Header names
        document.getElementById('player1NameDisplay').textContent = player1Name;
        document.getElementById('player2NameDisplay').textContent = player2Name;

        // Avatars: creator is always P1 (left), joiner is always P2 (right)
        const p1Av = myPlayerNum === 2 ? gameInstance.opponentAvatarIndex : gameInstance.myAvatarIndex;
        const p2Av = myPlayerNum === 2 ? gameInstance.myAvatarIndex : gameInstance.opponentAvatarIndex;
        document.getElementById('player1Avatar').innerHTML = renderAvatar(p1Av, 44);
        document.getElementById('player2Avatar').innerHTML = renderAvatar(p2Av, 44);
        // Override avatar borders to consistent team colors
        const av1 = document.getElementById('player1Avatar').firstElementChild;
        const av2 = document.getElementById('player2Avatar').firstElementChild;
        if (av1) av1.style.borderColor = '#4a9eff';
        if (av2) av2.style.borderColor = '#e24a4a';

        // Clear history log for new game
        const histLog = document.getElementById('historyLog');
        if (histLog) histLog.innerHTML = '';

        // Show game screen
        document.getElementById('lobbyScreen').classList.add('hidden');
        document.getElementById('summaryScreen').classList.add('hidden');
        document.getElementById('reviewBanner').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');

        this.updateApplesRemaining();
        this.updateHeaderStats();
        this.updateLinearQuotaUI(1);
        this.updateLinearQuotaUI(2);
        this.updatePenaltyDisplay(1);
        this.updatePenaltyDisplay(2);

        this.renderer.resize();
        if (this._resizeHandler) window.removeEventListener('resize', this._resizeHandler);
        this._resizeHandler = () => { if (this.renderer) this.renderer.resize(); };
        window.addEventListener('resize', this._resizeHandler);

        this.timerManager.start(this.gameState);
        this.gameLoop();
    }

    gameLoop() {
        if (!this.gameState.gameOver) {
            this.renderer.render(this.gameState, this.hoveredApple);
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    handleCanvasMouseMove(e) {
        if (!this.renderer) return;
        const rect = this.renderer.canvas.getBoundingClientRect();
        const { x, y } = this.renderer.c2w(e.clientX - rect.left, e.clientY - rect.top);

        const tooltip = document.getElementById('coordTooltip');
        if (x >= 0 && x <= 10 && y >= 0 && y <= 10) {
            tooltip.textContent = `(${x}, ${y})`;
            tooltip.style.left = (e.clientX + 12) + 'px';
            tooltip.style.top  = (e.clientY - 28) + 'px';
            tooltip.classList.remove('hidden');
        } else {
            tooltip.classList.add('hidden');
        }

        const hov = this.gameState.apples.find(a => a.x === x && a.y === y);
        this.hoveredApple = (hov && !hov.eaten) ? hov : null;
        this.renderer.canvas.style.cursor = hov ? (hov.eaten ? 'not-allowed' : 'pointer') : 'crosshair';
    }

    handleCanvasMouseLeave() {
        const tooltip = document.getElementById('coordTooltip');
        if (tooltip) tooltip.classList.add('hidden');
        this.hoveredApple = null;
    }

    submitEquation(playerNum) {
        if (this.gameState.gameOver) return;
        const inputEl  = document.getElementById(`equation${playerNum}`);
        const errorEl  = document.getElementById(`error${playerNum}`);
        const rawRHS   = inputEl.value.trim();
        const equation = rawRHS ? 'y = ' + rawRHS : '';
        errorEl.textContent = '';

        try {
            if (!equation.trim()) throw new Error('Please enter an equation');

            const lineData = InputParser.parse(equation);
            const player   = playerNum === 1 ? this.gameState.player1 : this.gameState.player2;
            player.currentLine = lineData;

            // Universal cooldown gate — ANY submission blocked during cooldown
            const now = Date.now();
            if (now < player.linearCooldownEnd) {
                const secs = Math.ceil((player.linearCooldownEnd - now) / 1000);
                errorEl.textContent = `✗ Cooldown: wait ${secs}s before submitting`;
                return;
            }

            // Check quota for degree ≤ 1 (linear/constant) only
            if (lineData.degree <= 1) {
                const MAX_LINEAR = 3;
                if (player.linearUsesCount >= MAX_LINEAR) {
                    errorEl.textContent = '✗ No more degree ≤ 1 equations (quota: 3/3 used)';
                    return;
                }
            }

            player.expressionsUsed++;

            const degree       = lineData.degree ?? 0;
            const basePoints   = 100 * Math.pow(2, degree);
            const curPenalty   = player.penaltyFactor;
            let applesEaten    = 0;

            if (lineData.type === 'vertical') {
                this.gameState.apples.forEach(apple => {
                    if (apple.x === lineData.x && !apple.eaten) {
                        this.gameState.eatApple(apple.x, apple.y, playerNum, basePoints * curPenalty);
                        applesEaten++;
                    }
                });
            } else if (lineData.evalFn) {
                this.gameState.apples.forEach(apple => {
                    if (apple.eaten) return;
                    try {
                        if (Math.abs(lineData.evalFn(apple.x) - apple.y) < 0.1) {
                            this.gameState.eatApple(apple.x, apple.y, playerNum, basePoints * curPenalty);
                            applesEaten++;
                        }
                    } catch(e) { /* ignore eval errors for this apple */ }
                });
            }

            // Sound on apple eat
            if (applesEaten > 0) soundManager.appleEat();

            const pointsGained = Math.round(applesEaten * basePoints * curPenalty);

            // Update penalty for next submission
            player.penaltyFactor *= applesEaten > 0 ? 0.95 : 0.85;

            // Apply cooldown for degree ≤ 1
            if (degree <= 1) {
                player.linearUsesCount++;
                player.linearCooldownEnd = Date.now() + (Math.pow(2, player.linearUsesCount) * 1000);
            }

            const entry = { equation: equation.trim(), applesEaten, pointsGained, degree, time: this.gameState.getElapsedMs(), penalty: curPenalty };
            player.history.push(entry);
            this.appendHistoryLog(playerNum, player.name, entry);

            this.updateApplesRemaining();
            this.updateHeaderStats();
            this.updateLinearQuotaUI(playerNum);
            this.updatePenaltyDisplay(playerNum);

            if (gameInstance.isMultiplayer) {
                socket.emit('updateGameState', {
                    playerNum,
                    equation: equation.trim(),
                    applesEaten,
                    pointsGained,
                    degree,
                    time: entry.time,
                    totalScore: player.score,
                    penaltyFactor: player.penaltyFactor,
                    usedPenalty: curPenalty,
                    expressionsUsed: player.expressionsUsed,
                    appleStates: this.gameState.apples.map(a => ({ x: a.x, y: a.y, eaten: a.eaten, eatenBy: a.eatenBy }))
                });
            }

            inputEl.value = '';
            this.checkGameEnd();

        } catch(err) {
            errorEl.textContent = '✗ ' + err.message;
        }
    }

    appendHistoryLog(playerNum, playerName, entry) {
        const log = document.getElementById('historyLog');
        if (!log) return;
        const color = playerNum === 1 ? '#4a9eff' : '#e24a4a';

        const totalMs = entry.time;
        const m = Math.floor(totalMs / 60000);
        const s = Math.floor((totalMs % 60000) / 1000);
        const cs = Math.round((totalMs % 1000) / 10);
        const timeStr = `[${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')},${cs.toString().padStart(2,'0')}]`;

        const hasApples = entry.applesEaten > 0;
        const resultText = hasApples ? `+${entry.applesEaten}🍎 +${entry.pointsGained}pts` : 'miss';
        const penaltyText = entry.penalty == null
            ? ''
            : `<span class="h-penalty">×${entry.penalty.toFixed(2)}</span>`;

        const div = document.createElement('div');
        div.className = 'history-entry';
        div.innerHTML = `<span class="h-time">${timeStr}</span><span class="h-name" style="color:${color}">${playerName}</span><span class="h-eq">${entry.equation}</span>${penaltyText}<span class="h-result${hasApples ? '' : ' miss'}">${resultText}</span>`;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    }

    updateHeaderStats() {
        const p1 = this.gameState.player1, p2 = this.gameState.player2;
        const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        set('player1Score', Math.round(p1.score));
        set('player2Score', Math.round(p2.score));
        set('player1Expr',  p1.expressionsUsed);
        set('player2Expr',  p2.expressionsUsed);

        const crown1 = document.getElementById('crown1');
        const crown2 = document.getElementById('crown2');
        if (crown1 && crown2) {
            crown1.style.visibility = p1.score > p2.score ? 'visible' : 'hidden';
            crown2.style.visibility = p2.score > p1.score ? 'visible' : 'hidden';
        }
    }

    updateApplesRemaining() {
        const el = document.getElementById('applesRemaining');
        if (el) el.textContent = `🍎 ${this.gameState.getRemainingApples().length} left`;
    }

    updateLinearQuotaUI(playerNum) {
        const player = playerNum === 1 ? this.gameState.player1 : this.gameState.player2;
        const remaining = 3 - player.linearUsesCount;
        const el = document.getElementById(`linearQuota${playerNum}`);
        if (!el) return;
        if (remaining > 0) {
            el.textContent = `Linear uses: ${remaining}/3 left`;
            el.className = 'linear-quota ' + (remaining === 1 ? 'quota-low' : '');
        } else {
            el.textContent = 'Linear uses: 0/3 — must use degree ≥ 2';
            el.className = 'linear-quota quota-empty';
        }
    }

    updatePenaltyDisplay(playerNum) {
        const player = playerNum === 1 ? this.gameState.player1 : this.gameState.player2;
        const penalty = Math.round(player.penaltyFactor * 100) / 100;
        const el = document.getElementById(`penaltyDisplay${playerNum}`);
        if (!el) return;
        el.textContent = `Penalty: ×${penalty.toFixed(2)}`;
    }

    checkGameEnd() {
        if (this.gameState.gameOver) return;
        const noApples = this.gameState.getRemainingApples().length === 0;
        const timeOut  = this.gameState.timeRemaining <= 0;

        if (noApples || timeOut) {
            // In multiplayer, rely on the server to declare the game over
            if (gameInstance.isMultiplayer && gameInstance.playerRole !== 'guest') {
                socket.emit('gameEnded', { 
                    roomCode: gameInstance.roomCode,
                    reason: timeOut ? 'timeout' : 'apples_cleared'
                });
            } else if (!gameInstance.isMultiplayer) {
                this.handleGameEndFromServer(timeOut ? 'timeout' : 'apples_cleared', null);
            }
        }
    }

    handleGameEndFromServer(reason, loserNum) {
        if (this.gameState.gameOver) return;
        this.gameState.gameOver = true;
        this.gameState.endReason = reason;
        this.timerManager.stop();

        if (this.renderer) this.renderer.render(this.gameState);

        const p1 = this.gameState.player1, p2 = this.gameState.player2;
        let winner, loser, isDraw = false;

        if (loserNum === 1) {
            winner = p2; loser = p1;
        } else if (loserNum === 2) {
            winner = p1; loser = p2;
        } else {
            const p1Apples = p1.eatenApples.length;
            const p2Apples = p2.eatenApples.length;
            const p1LastTime = p1.history.length > 0 ? p1.history[p1.history.length - 1].time : Infinity;
            const p2LastTime = p2.history.length > 0 ? p2.history[p2.history.length - 1].time : Infinity;

            if (p1.score !== p2.score) {
                [winner, loser] = p1.score > p2.score ? [p1, p2] : [p2, p1];
            } else if (p1Apples !== p2Apples) {
                [winner, loser] = p1Apples > p2Apples ? [p1, p2] : [p2, p1];
            } else if (p1.expressionsUsed !== p2.expressionsUsed) {
                [winner, loser] = p1.expressionsUsed < p2.expressionsUsed ? [p1, p2] : [p2, p1];
            } else if (p1LastTime !== p2LastTime) {
                if (p1LastTime === Infinity && p2LastTime === Infinity) {
                    isDraw = true; [winner, loser] = [p1, p2];
                } else {
                    [winner, loser] = p1LastTime < p2LastTime ? [p1, p2] : [p2, p1];
                }
            } else {
                isDraw = true; [winner, loser] = [p1, p2];
            }
        }

        this.showSummaryScreen(winner, loser, reason, isDraw);
        if (!isDraw && ((gameInstance.myPlayerNum === 1 && winner === p1) || (gameInstance.myPlayerNum === 2 && winner === p2))) {
            this.fireworks.start();
        } else if (!gameInstance.isMultiplayer) {
            this.fireworks.start();
        }
    }

    showSummaryScreen(winner, loser, reason, isDraw = false) {
        let reasonText = '';
        if (reason === 'surrender' || reason === 'exit') {
            reasonText = `${loser.name} ${reason === 'exit' ? 'left early' : 'surrendered'}`;
        } else if (reason === 'majority' || reason === 'apples_cleared') {
            reasonText = `All apples eaten!`;
        } else if (reason === 'timeout') {
            reasonText = 'Time ran out';
        }

        const noteText = (reason === 'surrender' || reason === 'exit') && loser.score > winner.score
            ? `<div class="summary-note">⚠️ ${loser.name} was leading but ended early.</div>`
            : '';

        const elapsed   = this.timerManager.formatTime(this.gameState.getElapsedSeconds());
        const remaining = this.gameState.getRemainingApples().length;
        const p1 = this.gameState.player1, p2 = this.gameState.player2;
        const isP1Winner = winner === p1;
        const currentPlayerNum = this.gameConfig?.myPlayerNum;
        let winnerMessage = '';

        if (isDraw) {
            winnerMessage = '🤝 Draw!';
        } else if (currentPlayerNum === 1 || currentPlayerNum === 2) {
            const isCurrentPlayerWinner = (currentPlayerNum === 1) ? isP1Winner : !isP1Winner;
            winnerMessage = isCurrentPlayerWinner ? '🏆 Victory!' : '😤 Defeat';
        } else {
            winnerMessage = `🏆 ${winner.name} Wins!`;
        }

        // Use stored avatar indices (P1=creator, P2=joiner)
        const cfg = this.gameConfig;
        const p1Av = cfg ? (cfg.myPlayerNum === 2 ? gameInstance.opponentAvatarIndex : gameInstance.myAvatarIndex) : 0;
        const p2Av = cfg ? (cfg.myPlayerNum === 2 ? gameInstance.myAvatarIndex : gameInstance.opponentAvatarIndex) : 0;

        const buildLog = (player) => player.history.map(h => {
            const totalMs = h.time;
            const m = Math.floor(totalMs / 60000);
            const s = Math.floor((totalMs % 60000) / 1000);
            const cs = Math.round((totalMs % 1000) / 10);
            const timeStr = `[${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')},${cs.toString().padStart(2,'0')}]`;
            const hasApples = h.applesEaten > 0;
            const resultText = hasApples ? `+${h.applesEaten}🍎 +${h.pointsGained}pts` : 'miss';
            const penaltyText = h.penalty == null ? '' : `<span class="h-penalty">×${h.penalty.toFixed(2)}</span>`;
            return `<div class="sum-log-entry"><span class="h-time">${timeStr}</span><span class="h-eq">${h.equation}</span>${penaltyText}<span class="h-result${hasApples ? '' : ' miss'}">${resultText}</span></div>`;
        }).join('') || '<div style="color:#aaa">No moves</div>';

        document.getElementById('summaryContent').innerHTML = `
          <div class="sum-winner">${winnerMessage}</div>
          <div class="sum-reason">${reasonText}</div>
          ${noteText}
          <div class="sum-meta">⏱ Duration: <b>${elapsed}</b> &nbsp;|&nbsp; 🍎 Left: <b>${remaining}</b></div>
          <div class="sum-columns">
            <div class="sum-col ${isP1Winner ? 'sum-col-winner' : ''}">
              <div class="sum-col-header">${renderAvatar(p1Av, 40)} <span>${p1.name}</span> <span class="host-badge">HOST</span>${currentPlayerNum === 1 ? ' <span class="you-badge">YOU</span>' : ''}${isP1Winner ? ' 👑' : ''}</div>
              <div class="sum-stat">⭐ Points: <b>${Math.round(p1.score)}</b></div>
              <div class="sum-stat">🍎 Apples: <b>${p1.eatenApples.length}</b></div>
              <div class="sum-stat">📝 Expressions: <b>${p1.expressionsUsed}</b></div>
              <div class="sum-log">${buildLog(p1)}</div>
            </div>
            <div class="sum-col ${!isP1Winner ? 'sum-col-winner' : ''}">
              <div class="sum-col-header">${renderAvatar(p2Av, 40)} <span>${p2.name}</span>${currentPlayerNum === 2 ? ' <span class="you-badge">YOU</span>' : ''}${isP1Winner ? '' : ' 👑'}</div>
              <div class="sum-stat">⭐ Points: <b>${Math.round(p2.score)}</b></div>
              <div class="sum-stat">🍎 Apples: <b>${p2.eatenApples.length}</b></div>
              <div class="sum-stat">📝 Expressions: <b>${p2.expressionsUsed}</b></div>
              <div class="sum-log">${buildLog(p2)}</div>
            </div>
          </div>`;

        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('summaryScreen').classList.remove('hidden');

        // Show "Return to Room" only in multiplayer, but hide for guests
        const returnBtn = document.getElementById('returnToRoomBtn');
        if (returnBtn) {
            if (gameInstance.isMultiplayer && gameInstance.playerRole !== 'guest') {
                returnBtn.style.display = 'inline-block';
            } else {
                returnBtn.style.display = 'none';
            }
        }
    }
}

// ===========================
// CONSTANTS & GLOBALS
// ===========================
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let playerId = sessionStorage.getItem('playerId');
if (!playerId) {
    playerId = generateUUID();
    sessionStorage.setItem('playerId', playerId);
}

const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : 'https://poly-apple-backend.onrender.com'; // Update this to your actual Render API URL later

const socket = io(BACKEND_URL);
const gameLogic = new GameLogic();

// ===========================
// SOCKET.IO MULTIPLAYER
// ===========================
function switchLobbyTab(tab) {
    const createTab = document.getElementById('createTab');
    const joinTab   = document.getElementById('joinTab');
    const btns      = document.querySelectorAll('.tab-btn');

    if (tab === 'create') {
        createTab.classList.add('active');  joinTab.classList.remove('active');
        btns[0].classList.add('active');    btns[1].classList.remove('active');
        stopRoomRefresh();
    } else {
        joinTab.classList.add('active');    createTab.classList.remove('active');
        btns[1].classList.add('active');    btns[0].classList.remove('active');
        startRoomRefresh();
        
        // Setup search input listener if not already set
        const searchInput = document.getElementById('roomSearchInput');
        if (searchInput && !searchInput.dataset.listenerSet) {
            searchInput.addEventListener('input', renderRooms);
            searchInput.dataset.listenerSet = 'true';
        }
    }
}

let gameInstance = {
    isMultiplayer: false,
    roomCode: null,
    playerRole: 'creator', // 'creator' | 'joiner'
    myPlayerNum: 1,        // 1 = creator, 2 = joiner
    myName: null,
    myAvatarIndex: 0,
    opponentName: null,
    opponentId: null,
    opponentAvatarIndex: 0,
    isJoining: false,
    roomRefreshInterval: null
};

function copyRoomCode() {
    const code = gameInstance.roomCode;
    if (!code) return;
    const btn = document.getElementById('copyRoomCodeBtn');
    navigator.clipboard.writeText(code)
        .then(() => flashBtn(btn, '✓ Copied!', '#4caf50'))
        .catch(() => {
            const ta = document.createElement('textarea');
            ta.value = code; document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); document.body.removeChild(ta);
            flashBtn(btn, '✓ Copied!', '#4caf50');
        });
}

function flashBtn(btn, text, bg) {
    const prev = btn.textContent;
    btn.textContent = text; btn.style.background = bg; btn.style.color = 'white';
    setTimeout(() => { btn.textContent = prev; btn.style.background = ''; btn.style.color = ''; }, 2000);
}

function showWaitingScreen(roomCode, message) {
    document.querySelector('.lobby-tabs').style.display = 'none';
    document.getElementById('createTab').classList.remove('active');
    document.getElementById('joinTab').classList.remove('active');
    const ws = document.getElementById('waitingScreen');
    ws.classList.remove('hidden'); ws.classList.add('active');
    document.getElementById('roomCodeDisplay').textContent = roomCode;
    document.getElementById('waitingMessage').textContent  = message;

    const avatarEl = document.getElementById('waitingAvatar');
    const nameEl   = document.getElementById('waitingPlayerName');
    if (avatarEl) avatarEl.innerHTML = renderAvatar(gameInstance.myAvatarIndex, 44);
    if (nameEl)   nameEl.textContent = gameInstance.myName || 'You';

    // Start button only for creator
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) startBtn.style.display = 'none';
}

function runCountdown(from, onDone) {
    const overlay = document.getElementById('countdownOverlay');
    const numEl   = document.getElementById('countdownNumber');
    if (!overlay || !numEl) { onDone(); return; }

    overlay.classList.remove('hidden');
    let n = from;

    function tick() {
        numEl.textContent = n > 0 ? n : 'GO!';
        numEl.style.animation = 'none';
        void numEl.offsetWidth;
        numEl.style.animation = '';

        soundManager.countdown(n);

        if (n <= 0) {
            setTimeout(() => { overlay.classList.add('hidden'); onDone(); }, 700);
        } else {
            n--;
            setTimeout(tick, 900);
        }
    }
    tick();
}

function showLobbyTab(tab) {
    document.querySelector('.lobby-tabs').style.display = '';
    const ws = document.getElementById('waitingScreen');
    ws.classList.remove('active'); ws.classList.add('hidden');
    switchLobbyTab(tab);
}

// ── Room creation ──────────────────────────────
function createRoom(playerName) {
    if (!playerName?.trim()) {
        playerName = getRandomName();
        document.getElementById('playerNameCreate').value = playerName;
    }

    const avatarIndex = getRandomAvatarIndex();
    gameInstance.myName = playerName;
    gameInstance.myAvatarIndex = avatarIndex;

    socket.emit('createRoom', {
        name: playerName,
        avatarIndex,
        config: {
            appleDensity: parseFloat(document.getElementById('density').value),
            timePerTurn:  parseInt(document.getElementById('time').value)
        },
        playerId
    });
}

socket.on('roomCreated', (data) => {
    gameInstance.roomCode    = data.roomCode;
    gameInstance.isMultiplayer = true;
    gameInstance.playerRole  = 'creator';
    gameInstance.myPlayerNum = 1;
    gameInstance.isJoining   = false;
    document.getElementById('createRoomForm').reset();
    showWaitingScreen(data.roomCode, 'Waiting for opponent to join…');
    console.log('Room created:', data.roomCode);
});

// ── Room list ──────────────────────────────────
function refreshRoomList() { socket.emit('getAvailableRooms'); }

function startRoomRefresh() {
    if (gameInstance.roomRefreshInterval) clearInterval(gameInstance.roomRefreshInterval);
    refreshRoomList();
    gameInstance.roomRefreshInterval = setInterval(() => {
        if (!gameInstance.isJoining) refreshRoomList();
    }, 2000);
}

function stopRoomRefresh() {
    if (gameInstance.roomRefreshInterval) {
        clearInterval(gameInstance.roomRefreshInterval);
        gameInstance.roomRefreshInterval = null;
    }
}

let lastFetchedRooms = [];

socket.on('availableRooms', (rooms) => {
    lastFetchedRooms = rooms;
    renderRooms();
});

function renderRooms() {
    const list = document.getElementById('roomsList');
    if (!list) return;

    const searchInput = document.getElementById('roomSearchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let filteredRooms = lastFetchedRooms;
    if (query) {
        filteredRooms = lastFetchedRooms.filter(r => 
            r.code.toLowerCase().includes(query) || 
            (r.creator && r.creator.toLowerCase().includes(query))
        );
    }

    if (filteredRooms.length === 0) {
        list.innerHTML = '<div class="room-item" style="text-align:center;color:#999;cursor:default;">No rooms available</div>';
        return;
    }
    list.innerHTML = filteredRooms.map(r => {
        let btn, badge;
        if (r.status === 'waiting') {
            btn   = `<button class="btn btn-submit" onclick="event.stopPropagation();joinRoomWithCode('${r.code}')">Join</button>`;
            badge = `<span style="font-size:0.75em;color:#27ae60;font-weight:600;">● Open</span>`;
        } else if (r.status === 'playing') {
            btn   = `<button class="btn btn-secondary" style="font-size:0.85em;padding:7px 12px;" onclick="event.stopPropagation();viewGameAsGuest('${r.code}')">👁 View</button>`;
            badge = `<span style="font-size:0.75em;color:#e74c3c;font-weight:600;">● Live</span>`;
        } else {
            // 'full': room is full but not yet started, or game just ended
            btn   = '';
            badge = `<span style="font-size:0.75em;color:#c0392b;font-weight:600;">● Full</span>`;
        }
        return `
            <div class="room-item">
                <div class="room-info">
                    <div style="font-weight:600;display:flex;align-items:center;gap:6px;">Room: ${r.code} ${badge}</div>
                    <div style="font-size:0.9em;color:#666;">Host: ${r.creator}</div>
                </div>
                ${btn}
            </div>
        `;
    }).join('');
}

// ── Join room ──────────────────────────────────
function joinRoomWithCode(roomCode) {
    if (gameInstance.isJoining) return;
    let name = document.getElementById('playerNameJoin').value.trim();
    if (!name) { name = getRandomName(); document.getElementById('playerNameJoin').value = name; }

    const avatarIndex = getRandomAvatarIndex();
    gameInstance.myName = name;
    gameInstance.myAvatarIndex = avatarIndex;
    gameInstance.isJoining   = true;
    gameInstance.playerRole  = 'joiner';
    gameInstance.myPlayerNum = 2;
    gameInstance.roomCode    = roomCode;
    socket.emit('joinRoom', { roomCode, name, avatarIndex, playerId });
}



socket.on('playerJoined', (data) => {
    gameInstance.opponentName        = data.joinerName;
    gameInstance.opponentId          = data.joinerId;
    gameInstance.opponentAvatarIndex = data.joinerAvatarIndex ?? 0;
    gameInstance.isMultiplayer = true;

    if (gameInstance.playerRole === 'joiner') {
        gameInstance.isJoining = false;
        showWaitingScreen(gameInstance.roomCode, 'Waiting for opponent to start the game…');
    } else if (gameInstance.playerRole === 'creator') {
        const startBtn = document.getElementById('startGameBtn');
        if (startBtn) startBtn.style.display = 'block';
        document.getElementById('waitingMessage').textContent = `${data.joinerName} joined! Ready to start!`;
    }
});

socket.on('joinFailed', (error) => {
    gameInstance.isJoining  = false;
    gameInstance.roomCode   = null;
    gameInstance.playerRole = 'creator';
    alert('Failed to join: ' + error.message);
    showLobbyTab('join');
});

function startGameWithOpponent() {
    if (gameInstance.playerRole !== 'creator') return;
    socket.emit('gameReady', { roomCode: gameInstance.roomCode });
}

socket.on('gameStart', (data) => {
    gameInstance.myAvatarIndex       = data.yourAvatarIndex ?? gameInstance.myAvatarIndex;
    gameInstance.opponentAvatarIndex = data.opponentAvatarIndex ?? 0;
    gameInstance.myPlayerNum         = data.myPlayerNum ?? 1;
    stopRoomRefresh();
    gameInstance.isMultiplayer = true;

    const myPlayerNum = gameInstance.myPlayerNum;  // snapshot before async countdown
    runCountdown(3, () => {
        gameLogic.startGameMultiplayer(
            data.creatorName || 'Player 1',
            data.joinerName  || 'Player 2',
            myPlayerNum,
            data.appleDensity,
            data.timePerTurn,
            data.applePositions
        );
    });
});

// ── Game state sync ────────────────────────────
socket.on('gameStateUpdated', (data) => {
    if (!gameLogic.gameState || gameLogic.gameState.gameOver) return;

    const oppNum    = data.playerNum !== undefined ? data.playerNum : (gameInstance.myPlayerNum === 1 ? 2 : 1);
    const oppPlayer = oppNum === 1 ? gameLogic.gameState.player1 : gameLogic.gameState.player2;

    // Sync apple states
    if (data.appleStates) {
        data.appleStates.forEach(inc => {
            const local = gameLogic.gameState.apples.find(a => a.x === inc.x && a.y === inc.y);
            if (local && !local.eaten && inc.eaten) {
                local.eaten   = true;
                local.eatenBy = inc.eatenBy;
                oppPlayer.eatenApples.push({ x: inc.x, y: inc.y });
            }
        });
    }

    // Sync authoritative score/state
    if (data.totalScore      !== undefined) oppPlayer.score           = data.totalScore;
    if (data.expressionsUsed !== undefined) oppPlayer.expressionsUsed = data.expressionsUsed;
    if (data.penaltyFactor   !== undefined) oppPlayer.penaltyFactor   = data.penaltyFactor;

    const entry = {
        equation: data.equation, applesEaten: data.applesEaten,
        pointsGained: data.pointsGained ?? 0, degree: data.degree ?? null,
        time: gameLogic.gameState.getElapsedMs(),
        penalty: data.usedPenalty ?? oppPlayer.penaltyFactor
    };
    oppPlayer.history.push(entry);
    gameLogic.appendHistoryLog(oppNum, oppPlayer.name, entry);
    gameLogic.updateApplesRemaining();
    gameLogic.updateHeaderStats();
    gameLogic.checkGameEnd();
});

socket.on('opponentLeft',         () => { 
    const oppName = gameInstance.myPlayerNum === 1 ? 
        document.getElementById('player2NameDisplay').textContent : 
        document.getElementById('player1NameDisplay').textContent;
    showNotification(`${oppName} left the room.`);
});
socket.on('opponentDisconnected', () => { 
    const oppName = gameInstance.myPlayerNum === 1 ? 
        document.getElementById('player2NameDisplay').textContent : 
        document.getElementById('player1NameDisplay').textContent;
    showNotification(`${oppName} disconnected.`);
});
socket.on('gameEndedServer',      (data) => { if (!gameLogic.gameState?.gameOver) gameLogic.handleGameEndFromServer(data.reason || 'timeout', data.loserNum); });
socket.on('disconnect', () => { gameInstance.isMultiplayer = false; });

// ── Room / game controls ───────────────────────
function cancelRoom() {
    if (gameInstance.roomCode) socket.emit('playerLeft', { roomCode: gameInstance.roomCode });
    showLobbyTab('create');
    document.getElementById('createRoomForm').reset();
    document.getElementById('playerNameJoin').value = '';
    const searchInput = document.getElementById('roomSearchInput');
    if (searchInput) searchInput.value = '';
    gameInstance.roomCode   = null;
    gameInstance.playerRole = 'creator';
    gameInstance.isJoining  = false;
}

GameLogic.prototype.surrender = function() {
    if (gameInstance.isMultiplayer && gameInstance.roomCode) {
        socket.emit('playerLeft', { roomCode: gameInstance.roomCode, reason: 'surrender' });
    } else {
        this.handleGameEndFromServer('surrender', 1);
    }
};

GameLogic.prototype.exit = function() {
    if (gameInstance.isMultiplayer && gameInstance.roomCode) {
        socket.emit('playerLeft', { roomCode: gameInstance.roomCode, reason: 'exit' });
    } else {
        this.handleGameEndFromServer('exit', 1);
    }
};

function exitToLobby() {
    // Notify server so room is cleaned up
    if (gameInstance.isMultiplayer && gameInstance.roomCode) {
        socket.emit('playerLeft', { roomCode: gameInstance.roomCode });
    }

    document.getElementById('summaryScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('reviewBanner').classList.add('hidden');
    document.getElementById('lobbyScreen').classList.remove('hidden');

    // Clear history for next game
    const histLog = document.getElementById('historyLog');
    if (histLog) histLog.innerHTML = '';

    showLobbyTab('create');
    gameInstance.isMultiplayer = false;
    gameInstance.roomCode      = null;
    gameInstance.opponentName  = null;
    gameInstance.playerRole    = 'creator';
    gameInstance.myPlayerNum   = 1;
}

function viewBoard() {
    document.getElementById('summaryScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    document.getElementById('reviewBanner').classList.remove('hidden');
    document.getElementById('player1Input').classList.add('hidden');
    document.getElementById('player2Input').classList.add('hidden');
}

function backToSummary() {
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('reviewBanner').classList.add('hidden');
    document.getElementById('summaryScreen').classList.remove('hidden');
}

// ── Return to room after game ends ────────────────
function returnToRoom() {
    if (!gameInstance.isMultiplayer || !gameInstance.roomCode) {
        // Solo / no room — just go to lobby
        exitToLobby();
        return;
    }

    document.getElementById('summaryScreen').classList.add('hidden');
    document.getElementById('lobbyScreen').classList.remove('hidden');

    const waitMsg = gameInstance.playerRole === 'creator'
        ? 'Waiting for opponent to return…'
        : 'Waiting for host to start a new game…';
    showWaitingScreen(gameInstance.roomCode, waitMsg);

    // Hide Start button until server confirms both players are back
    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
        startBtn.style.display = 'none';
        startBtn.textContent = '▶️ START NEW GAME!';
    }

    socket.emit('returnToRoom', { roomCode: gameInstance.roomCode, playerId });
}

socket.on('returnedToRoomAck', (data) => {
    if (data.isCreator && data.bothBack) {
        const startBtn = document.getElementById('startGameBtn');
        if (startBtn) startBtn.style.display = 'block';
        document.getElementById('waitingMessage').textContent = 'Opponent is back! Start a new game?';
    }
});

socket.on('playerReturnedToRoom', () => {
    if (gameInstance.playerRole === 'creator') {
        // Joiner came back — show Start button
        const startBtn = document.getElementById('startGameBtn');
        if (startBtn) startBtn.style.display = 'block';
        document.getElementById('waitingMessage').textContent = 'Opponent is back! Start a new game?';
    } else {
        document.getElementById('waitingMessage').textContent = 'Host is ready — waiting for them to start…';
    }
});

socket.on('roomGone', () => {
    alert('The room no longer exists. Returning to lobby.');
    exitToLobby();
});

// ── Guest View ─────────────────────────────────────
function hideAllScreens() {
    document.getElementById('lobbyScreen').classList.add('hidden');
    document.getElementById('summaryScreen').classList.add('hidden');
    document.getElementById('reviewBanner').classList.add('hidden');
    document.getElementById('gameScreen').classList.add('hidden');
}

function viewGameAsGuest(roomCode) {
    socket.emit('guestJoinRoom', { roomCode, playerId });
}

socket.on('guestGameSync', (data) => {
    stopRoomRefresh();

    gameInstance.isMultiplayer = true;
    gameInstance.playerRole = 'guest';
    gameInstance.roomCode = data.roomCode;
    // Use player avatars so startGameWithConfig can read them
    gameInstance.myAvatarIndex       = data.players[0]?.avatarIndex ?? 0;
    gameInstance.opponentAvatarIndex = data.players[1]?.avatarIndex ?? 0;

    // Start game in guest mode (myPlayerNum=0 hides inputs and shows Leave button)
    gameLogic.startGameWithConfig(
        data.creatorName,
        data.joinerName,
        0,
        data.appleDensity,
        data.timePerTurn,
        data.applePositions
    );

    // Override avatars with actual player data
    const s1 = data.players[0], s2 = data.players[1];
    if (s1) {
        document.getElementById('player1Avatar').innerHTML = renderAvatar(s1.avatarIndex, 44);
        const av = document.getElementById('player1Avatar').firstElementChild;
        if (av) av.style.borderColor = '#4a9eff';
    }
    if (s2) {
        document.getElementById('player2Avatar').innerHTML = renderAvatar(s2.avatarIndex, 44);
        const av = document.getElementById('player2Avatar').firstElementChild;
        if (av) av.style.borderColor = '#e24a4a';
    }

    // Sync history, scores, penalties
    if (data.players) {
        let combinedHistory = [];
        data.players.forEach((pData, idx) => {
            const pNum = idx + 1;
            const pObj = pNum === 1 ? gameLogic.gameState.player1 : gameLogic.gameState.player2;
            pObj.score = pData.score || 0;
            pObj.expressionsUsed = pData.expressionsUsed || 0;
            pObj.penaltyFactor = pData.penaltyFactor || 1;
            
            if (pData.history) {
                pData.history.forEach(entry => {
                    pObj.history.push(entry);
                    combinedHistory.push({ pNum, name: pObj.name, entry });
                });
            }
        });
        
        combinedHistory.sort((a, b) => a.entry.time - b.entry.time);
        combinedHistory.forEach(item => {
            gameLogic.appendHistoryLog(item.pNum, item.name, item.entry);
        });
    }

    // Sync eaten apples — server sends { pos: "x,y", eatenBy: playerNum }
    if (data.eatenApples) {
        data.eatenApples.forEach(item => {
            if (!item || !item.pos) return;
            const [xs, ys] = item.pos.split(',');
            const x = parseInt(xs, 10), y = parseInt(ys, 10);
            const apple = gameLogic.gameState.apples.find(a => a.x === x && a.y === y);
            if (apple) {
                apple.eaten = true;
                apple.eatenBy = item.eatenBy;
                const pObj = item.eatenBy === 1 ? gameLogic.gameState.player1 : gameLogic.gameState.player2;
                if (pObj) pObj.eatenApples.push({ x, y });
            }
        });
    }

    gameLogic.updateApplesRemaining();
    gameLogic.updateHeaderStats();

    // Sync elapsed time so the guest timer starts from the right point
    if (data.elapsedTime !== undefined) {
        gameLogic.gameState.startedAt = Date.now() - data.elapsedTime;
        const elapsed = Math.floor(data.elapsedTime / 1000);
        const remaining = Math.max(0, Math.min(data.timePerTurn, data.timePerTurn - elapsed));
        gameLogic.gameState.timeRemaining = remaining;
        if (gameLogic.timerManager) {
            gameLogic.timerManager.updateDisplay(remaining);
        }
    }
});

socket.on('guestJoinFailed', (data) => {
    alert('Cannot view game: ' + data.message);
});

function exitGuestView() {
    socket.emit('guestLeaveRoom');
    exitToLobby();
}
