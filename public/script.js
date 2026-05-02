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
    const iconOn = document.getElementById('soundIconOn');
    const iconOff = document.getElementById('soundIconOff');
    if (iconOn && iconOff) {
        iconOn.classList.toggle('hidden', !on);
        iconOff.classList.toggle('hidden', on);
    }
}

function toggleTutorial() {
    const overlay = document.getElementById('tutorialOverlay');
    if (!overlay) return;
    overlay.classList.toggle('hidden');
}

function closeTutorialOnBackdrop(e) {
    if (e.target.id === 'tutorialOverlay') {
        toggleTutorial();
    }
}

// Global key listeners
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const tutorial = document.getElementById('tutorialOverlay');
        if (tutorial && !tutorial.classList.contains('hidden')) {
            toggleTutorial();
        }
    }
});

// ===========================
// GAME STATE
// ===========================
class GameState {
    constructor(player1Name, player2Name, appleDensity, timePerTurn, applePositions = null, gridSize = 10) {
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

// ===========================
// INPUT PARSER  (polynomial up to degree 10)
// ===========================
class InputParser {
    static parse(input, gridSize = 10) {
        if (!input || typeof input !== 'string') throw new Error('Invalid input');

        const norm = input.trim().toLowerCase().replace(/\s+/g, '');

        // x = c  (vertical line) — not supported
        if (/^x=(-?\d+\.?\d*)$/.test(norm)) {
            throw new Error('x = constant not supported — use y = f(x) instead');
        }

        // must start with y =
        const m = norm.match(/^y=(.+)$/);
        if (!m) throw new Error('Format: y = f(x)');

        // Implicit multiplication: "2x" → "2*x", "3x^2" → "3*x^2"
        const expr = m[1].replace(/(\d)(x)/g, '$1*x');

        // Rule: No parentheses
        if (/[()]/.test(expr)) {
            throw new Error('Parentheses are forbidden — expand the expression manually');
        }

        // Rule: No division
        if (/\//.test(expr)) {
            throw new Error('Division is forbidden — use integer polynomial coefficients only');
        }

        // Rule: Integer coefficients only — no decimal points
        if (/\d\.\d|\.\d/.test(expr)) {
            throw new Error('Decimal numbers are forbidden — use integer coefficients only');
        }

        // Rule: No negative exponents
        if (/\^-/.test(expr)) {
            throw new Error('Negative exponents are forbidden');
        }

        // Rule: Exponent must be a non-negative integer (no x^x)
        if (/\^[^0-9]/.test(expr)) {
            throw new Error('Exponent must be a non-negative integer (e.g. x^3), not a variable');
        }

        // Allowed characters only: digits, x, +, -, *, ^
        if (!/^[\dx+\-*^]+$/i.test(expr)) {
            throw new Error('Only numbers, x, and operators ( + − * ^ ) are allowed');
        }

        // Rule: All explicit exponents must be ≤ 10
        const expTokens = expr.match(/\^(\d+)/g) || [];
        for (const tok of expTokens) {
            const exp = parseInt(tok.slice(1), 10);
            if (exp > 10) {
                throw new Error(`Exponent ^${exp} exceeds the maximum degree of 10`);
            }
        }

        // Rule: |coefficient| ≤ 10^9 — check all numeric literals
        const numLiterals = expr.match(/\d+/g) || [];
        for (const n of numLiterals) {
            if (parseInt(n, 10) > 1_000_000_000) {
                throw new Error(`Coefficient ${n} exceeds the maximum |aᵢ| ≤ 10⁹`);
            }
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

        // Rule: Degree ≤ 10 (catches composed high-degree cases like x^5*x^7 = x^12)
        const degree = InputParser.detectDegree(evalFn);
        if (degree > 10) {
            throw new Error('Degree exceeds 10 — reduce the total degree of your polynomial');
        }

        const points = InputParser.getCurvePoints(evalFn, gridSize);

        return { type: 'polynomial', evalFn, expr: input.trim(), degree, isValid: true, points };
    }

    // Finite-difference method: n-th differences of a degree-n polynomial are constant.
    // Detects up to degree 14 so that composed expressions like x^5*x^7=x^12 are caught.
    // Uses a dual absolute+relative tolerance to handle large-coefficient polynomials
    // (e.g. 1e9*x^10) where floating-point rounding in the differences is significant.
    static detectDegree(evalFn) {
        try {
            let vals = [];
            for (let i = 0; i <= 15; i++) vals.push(evalFn(i));

            for (let n = 0; n <= 14; n++) {
                const range = Math.max(...vals) - Math.min(...vals);
                if (range < 1e-6) return n; // absolute: covers zero polynomial / near-zero diffs
                const scale = Math.max(...vals.map(v => Math.abs(v)));
                if (range / scale < 1e-5) return n; // relative: covers large-coeff polys
                const next = [];
                for (let i = 1; i < vals.length; i++) next.push(vals[i] - vals[i - 1]);
                vals = next;
                if (vals.length === 0) return n;
            }
        } catch(e) { /* fall through */ }
        return 15; // degree > 14, well above the limit
    }

    // Sample points across the full grid range; null marks discontinuities / off-range values
    static getCurvePoints(evalFn, gridSize = 10) {
        const pts = [];
        const xMin = -1;
        const xMax = gridSize;
        const steps = Math.max(400, gridSize * 30);
        for (let i = 0; i <= steps; i++) {
            const x = xMin + ((xMax - xMin) / steps) * i;
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
        this.gridSize = 10; // default, will be updated by game
        this.pad = 1;
        this.displayUnits = (this.gridSize - 1) + 2 * this.pad; // 11

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
        const lastCoord = this.gridSize - 1;
        return {
            cx: (wx + this.pad) * this.unit + this.pan.x,
            cy: (lastCoord + this.pad - wy) * this.unit + this.pan.y
        };
    }

    c2w(cx, cy) {
        const lastCoord = this.gridSize - 1;
        const wx = (cx - this.pan.x) / this.unit - this.pad;
        const wy = lastCoord + this.pad - (cy - this.pan.y) / this.unit;
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
        const lastCoord = this.gridSize - 1;
        for (let i = 0; i <= lastCoord; i++) {
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
        const lastCoord = this.gridSize - 1;

        const { cx: ax,  cy: ayBot } = this.w2c(0, -0.3);
        const { cx: ax2, cy: ayTop } = this.w2c(0, lastCoord + 0.5);
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
        const { cx: axRight, cy: ay2 } = this.w2c(lastCoord + 0.5, 0);
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
        const fs  = Math.max(9, Math.floor(this.unit * 0.28));
        const off = Math.max(5, Math.round(this.unit * 0.28));
        const lastCoord = this.gridSize - 1;
        ctx.save();
        ctx.font = `${fs}px Arial`;
        ctx.fillStyle = '#666';

        for (let i = 0; i <= lastCoord; i++) {
            const { cx, cy: yAxis } = this.w2c(i, 0);
            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillText(i, cx, yAxis + off);

            if (i > 0) {
                const { cx: xAxis, cy } = this.w2c(0, i);
                ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
                ctx.fillText(i, xAxis - off, cy);
            }
        }
        ctx.restore();
    }

    drawApples(apples, hoveredX = null, hoveredY = null) {
        const ctx = this.ctx;
        const baseSize = Math.max(10, Math.round(this.unit * 0.38));
        const crossR   = Math.max(4, this.unit * 0.13);

        apples.forEach(apple => {
            const { cx, cy } = this.w2c(apple.x, apple.y);
            if (apple.eaten) {
                const color = apple.eatenBy === 1 ? '#4a9eff' : '#e24a4a';
                const d = crossR;
                ctx.save();
                ctx.globalAlpha = 0.55;
                ctx.strokeStyle = color;
                ctx.lineWidth = Math.max(1.5, crossR * 0.55);
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(cx - d, cy - d); ctx.lineTo(cx + d, cy + d);
                ctx.moveTo(cx + d, cy - d); ctx.lineTo(cx - d, cy + d);
                ctx.stroke();
                ctx.restore();
            } else {
                const isHov = apple.x === hoveredX && apple.y === hoveredY;
                const sz = isHov ? Math.round(baseSize * 1.3) : baseSize;
                ctx.save();
                ctx.font = `${sz}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                if (isHov) {
                    ctx.shadowColor = 'rgba(255, 60, 0, 0.8)';
                    ctx.shadowBlur  = 14;
                }
                ctx.fillText('🍎', cx, cy);
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

    startGameMultiplayer(creatorName, joinerName, myPlayerNum, appleDensity, timePerTurn, applePositions, gridSize) {
        this.startGameWithConfig(creatorName, joinerName, myPlayerNum, appleDensity, timePerTurn, applePositions, gridSize);
    }

    startGameWithConfig(player1Name, player2Name, myPlayerNum, appleDensity, timePerTurn, applePositions, gridSize = 10) {
        this.gameConfig = { player1Name, player2Name, myPlayerNum, appleDensity, timePerTurn, gridSize };
        this.gameState  = new GameState(player1Name, player2Name, appleDensity, timePerTurn, applePositions, gridSize);
        this.renderer   = new Renderer('gameCanvas');
        this.renderer.gridSize = this.gameState.gridSize;
        this.renderer.displayUnits = (this.renderer.gridSize - 1) + 2 * this.renderer.pad;
        this.renderer.resize();

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
        document.body.classList.add('game-active');

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

            const lineData = InputParser.parse(equation, this.gameState.gridSize);
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
            const wasLeading = loser.score > winner.score;
            if (reason === 'exit') {
                reasonText = wasLeading
                    ? `${loser.name} left while leading — a Pyrrhic retreat.`
                    : `${loser.name} left early.`;
            } else {
                reasonText = wasLeading
                    ? `${loser.name} surrendered while leading — a noble concession.`
                    : `${loser.name} surrendered.`;
            }
        } else if (reason === 'majority' || reason === 'apples_cleared') {
            reasonText = `All apples eaten!`;
        } else if (reason === 'timeout') {
            reasonText = 'Time ran out';
        }

        const noteText = '';

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
            <div class="sum-col sum-col-p1 ${isP1Winner ? 'sum-col-winner' : 'sum-col-loser'}">
              <div class="sum-col-header">${renderAvatar(p1Av, 40)} <span>${p1.name}</span> <span class="host-badge">HOST</span>${currentPlayerNum === 1 ? ' <span class="you-badge">YOU</span>' : ''}${isP1Winner ? ' 👑' : ''}</div>
              <div class="sum-stat">⭐ Points: <b>${Math.round(p1.score)}</b></div>
              <div class="sum-stat">🍎 Apples: <b>${p1.eatenApples.length}</b></div>
              <div class="sum-stat">📝 Expressions: <b>${p1.expressionsUsed}</b></div>
              <div class="sum-log">${buildLog(p1)}</div>
            </div>
            <div class="sum-col sum-col-p2 ${!isP1Winner ? 'sum-col-winner' : 'sum-col-loser'}">
              <div class="sum-col-header">${renderAvatar(p2Av, 40)} <span>${p2.name}</span>${currentPlayerNum === 2 ? ' <span class="you-badge">YOU</span>' : ''}${isP1Winner ? '' : ' 👑'}</div>
              <div class="sum-stat">⭐ Points: <b>${Math.round(p2.score)}</b></div>
              <div class="sum-stat">🍎 Apples: <b>${p2.eatenApples.length}</b></div>
              <div class="sum-stat">📝 Expressions: <b>${p2.expressionsUsed}</b></div>
              <div class="sum-log">${buildLog(p2)}</div>
            </div>
          </div>`;

        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('summaryScreen').classList.remove('hidden');
        document.body.classList.remove('game-active');

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
// THEME TOGGLE
// ===========================
function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('polyapple_theme', next);
    const chk      = document.getElementById('themeToggleCheck');
    const icon     = document.getElementById('themeIcon');
    const gameIcon = document.getElementById('gameThemeIcon');
    if (chk)      chk.checked = (next === 'light');
    if (icon)     icon.textContent     = next === 'light' ? '☀️' : '🌙';
    if (gameIcon) gameIcon.textContent = next === 'light' ? '☀️' : '🌙';
    // Trigger smooth sun/moon transition
    bgAnimationState.themeTransition = { start: Date.now(), from: current };
}

function setWaitingMessage(text) {
    const textEl = document.getElementById('waitingText');
    if (textEl) textEl.textContent = text;
    // Show/hide hourglass based on context
    const hg = document.getElementById('waitingHourglass');
    if (hg) hg.style.display = text.includes('Start') ? 'none' : 'inline-block';
}

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('polyapple_theme') || 'dark';
    document.body.setAttribute('data-theme', saved);
    const chk      = document.getElementById('themeToggleCheck');
    const icon     = document.getElementById('themeIcon');
    const gameIcon = document.getElementById('gameThemeIcon');
    if (chk)      chk.checked = (saved === 'light');
    if (icon)     icon.textContent     = saved === 'light' ? '☀️' : '🌙';
    if (gameIcon) gameIcon.textContent = saved === 'light' ? '☀️' : '🌙';
    // Init settings tags
    updateSettingsTags();
    // Init animated background
    initBgCanvas();
});

// ===========================
// SETTINGS PANEL
// ===========================
function toggleSettings() {
    const body   = document.getElementById('settingsBody');
    const header = document.querySelector('.settings-header');
    if (!body) return;
    const isOpen = body.classList.contains('open');
    body.classList.toggle('open', !isOpen);
    if (header) header.classList.toggle('open-header', !isOpen);
}

const MODE_LABELS = { free: 'Free Play', balanced: 'Balanced', pro: 'Poly Masters' };

// SVG icons for config tags
const TAG_ICONS = {
    grid: `<svg class="tag-icon" viewBox="0 0 9 9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><line x1="3" y1="0" x2="3" y2="9"/><line x1="6" y1="0" x2="6" y2="9"/><line x1="0" y1="3" x2="9" y2="3"/><line x1="0" y1="6" x2="9" y2="6"/></svg>`,
    apple: `<svg class="tag-icon" viewBox="0 0 12 13" fill="currentColor"><path d="M10.3 5.2c-.1-.1-1.3-.7-1.3-2.1 0-1.2.8-1.8.9-1.9l.1-.1-.1-.1C9.5.8 9 .6 8.5.6c-.8 0-1.3.5-1.6.5S6 .6 5.3.6C4 .6 2.6 1.6 2.6 3.7c0 1.3.5 2.7 1.1 3.6.5.8 1 1.4 1.7 1.4.6 0 .9-.4 1.7-.4s.9.4 1.7.4 1.2-.6 1.6-1.3c.3-.4.4-.8.5-.9l.1-.2-.1-.1c-.3-.2-.8-.6-.9-1zm-2.4-4c.2-.3.4-.7.4-1.1v-.1h-.1c-.5 0-1 .3-1.3.7-.2.3-.4.7-.4 1.1v.1h.1c.5 0 1-.3 1.3-.7z"/></svg>`,
    clock: `<svg class="tag-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="6" cy="6" r="5"/><polyline points="6,3 6,6 8,7.5"/></svg>`,
    bolt: `<svg class="tag-icon" viewBox="0 0 9 12" fill="currentColor"><polygon points="5.5,0 1,6.5 4.5,6.5 3.5,12 9,5.5 5.5,5.5"/></svg>`
};

function makeTag(icon, text) {
    return `${icon}<span>${text}</span>`;
}

function updateSettingsTags() {
    const densityEl  = document.getElementById('density');
    const gridSizeEl = document.getElementById('gridSize');
    const timeEl     = document.getElementById('time');
    const modeEl     = document.getElementById('mode');
    if (!densityEl || !gridSizeEl || !timeEl || !modeEl) return;

    const pct   = parseInt(densityEl.value); // 0-100
    const gs    = parseInt(gridSizeEl.value) || 10;
    const count = Math.floor((gs * gs) * (pct / 100));
    const secs  = parseInt(timeEl.value) || 60;
    const mode  = modeEl.value;

    // Set CSS custom property so the ::webkit-slider-runnable-track pseudo-element can read it
    const sliderMin = parseInt(densityEl.min) || 1;
    const max = parseInt(densityEl.max) || 100;
    const fillPct = ((pct - sliderMin) / (max - sliderMin)) * 100;
    densityEl.style.setProperty('--slider-fill', fillPct.toFixed(1) + '%');

    // Regenerate ruler ticks: 7 apple-count labels from 0 to gs²
    const ruler = document.getElementById('sliderRuler');
    if (ruler) {
        const total = gs * gs;
        ruler.innerHTML = Array.from({ length: 7 }, (_, i) =>
            `<span>${Math.round(total * i / 6)}</span>`
        ).join('');
    }

    const tagG = document.getElementById('tagGrid');
    const tagD = document.getElementById('tagDensity');
    const tagT = document.getElementById('tagTime');
    const tagM = document.getElementById('tagMode');
    if (tagG) tagG.innerHTML = makeTag(TAG_ICONS.grid,  `${gs}×${gs}`);
    if (tagD) tagD.innerHTML = makeTag(TAG_ICONS.apple, `${count} Apples`);
    if (tagT) tagT.innerHTML = makeTag(TAG_ICONS.clock, `${secs}s`);
    if (tagM) tagM.innerHTML = makeTag(TAG_ICONS.bolt,  MODE_LABELS[mode] || mode);

    const densityValEl = document.getElementById('densityVal');
    const densityPctEl = document.getElementById('densityPct');
    if (densityValEl) densityValEl.textContent = Math.max(1, count);
    if (densityPctEl) densityPctEl.textContent = `(${pct}%)`;
}

function populateConfigTags(config, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const cfg = config || {};
    const gs    = cfg.gridSize || 10;
    const count = cfg.appleDensity != null ? Math.round(cfg.appleDensity * (gs * gs)) : 50;
    const secs  = cfg.timePerTurn  || 60;
    const mode  = cfg.mode         || 'balanced';
    const modeLabel = { free: 'Free Play', balanced: 'Balanced', pro: 'Poly Masters' }[mode] || mode;

    container.innerHTML = `
        <span class="rtag rtag-grid">${makeTag(TAG_ICONS.grid, `${gs}×${gs}`)}</span>
        <span class="rtag rtag-density">${makeTag(TAG_ICONS.apple, `${count} Apples`)}</span>
        <span class="rtag rtag-time">${makeTag(TAG_ICONS.clock, `${secs}s`)}</span>
        <span class="rtag rtag-mode">${makeTag(TAG_ICONS.bolt, modeLabel)}</span>
    `;
}

// ===========================
// CONSTANTS & GLOBALS
// ===========================
const DEFAULT_GRID_SIZE = 10;
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
        createTab.classList.add('active');   createTab.classList.remove('hidden');
        joinTab.classList.remove('active');  joinTab.classList.add('hidden');
        btns[0].classList.add('active');     btns[1].classList.remove('active');
        stopRoomRefresh();
    } else {
        joinTab.classList.add('active');     joinTab.classList.remove('hidden');
        createTab.classList.remove('active'); createTab.classList.add('hidden');
        btns[1].classList.add('active');     btns[0].classList.remove('active');
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
    myPlayerId: null,      // Player ID (UUID or socket.id)
    myName: null,
    myAvatarIndex: 0,
    opponentName: null,
    opponentId: null,
    opponentAvatarIndex: 0,
    isJoining: false,
    roomRefreshInterval: null,
    currentConfig: null
};

function copyRoomCode() {
    const code = gameInstance.roomCode;
    if (!code) return;
    const toast = document.getElementById('copyToast');
    navigator.clipboard.writeText(code)
        .then(() => {
            if (toast) {
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2000);
            }
        });
}

function showWaitingScreen(roomCode, message) {
    document.querySelector('.lobby-tabs').style.display = 'none';
    const createTab = document.getElementById('createTab');
    const joinTab   = document.getElementById('joinTab');
    const ws        = document.getElementById('waitingScreen');

    if (createTab) { createTab.classList.add('hidden'); createTab.classList.remove('active'); }
    if (joinTab)   { joinTab.classList.add('hidden');   joinTab.classList.remove('active');   }
    
    if (ws) {
        ws.classList.remove('hidden'); 
        ws.classList.add('active');
    }
    
    const codeEl = document.getElementById('roomCodeDisplay');
    if (codeEl) {
        // Find the text node that contains the room code (usually the first child)
        for (let node of codeEl.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = roomCode + ' ';
                break;
            }
        }
    }
    
    setWaitingMessage(message);

    updateWaitingSlots();
    populateConfigTags(gameInstance.currentConfig, 'waitingConfigTags');
}

function updateWaitingSlots() {
    const hostSlot  = document.getElementById('slotHost');
    const guestCont = document.getElementById('slotGuestContainer');
    if (!hostSlot || !guestCont) return;

    const isMeHost = (gameInstance.playerRole === 'creator');

    // Resolve Host data
    const hostName = isMeHost ? (gameInstance.myName || 'You') : (gameInstance.opponentName || 'Host');
    const hostAvatarIndex = isMeHost ? (gameInstance.myAvatarIndex || 0) : (gameInstance.opponentAvatarIndex || 0);

    hostSlot.className = `waiting-player-card vibe-${hostAvatarIndex}`;
    hostSlot.innerHTML = `
        ${renderAvatar(hostAvatarIndex, 48)}
        <div>
            <div style="font-weight:800;font-size:1.1em;color:var(--text-primary);">
                ${hostName}
                <span class="wb-tag wb-host">HOST</span>
                ${isMeHost ? '<span class="wb-tag wb-you">YOU</span>' : ''}
            </div>
            <div class="muted-text" style="font-size:0.85em;">Room Owner</div>
        </div>
    `;

    // Resolve Guest data
    const hasGuest = isMeHost ? !!gameInstance.opponentName : true;

    if (hasGuest) {
        const guestName = isMeHost ? gameInstance.opponentName : (gameInstance.myName || 'You');
        const guestAvatarIndex = isMeHost ? (gameInstance.opponentAvatarIndex || 0) : (gameInstance.myAvatarIndex || 0);
        const isMeGuest = !isMeHost;

        guestCont.innerHTML = `
            <div class="waiting-player-card vibe-${guestAvatarIndex}">
                ${renderAvatar(guestAvatarIndex, 48)}
                <div>
                    <div style="font-weight:800;font-size:1.1em;color:var(--text-primary);">
                        ${guestName}
                        ${isMeGuest ? '<span class="wb-tag wb-you">YOU</span>' : ''}
                    </div>
                    <div class="muted-text" style="font-size:0.85em;">Guest</div>
                </div>
            </div>
        `;
    } else {
        guestCont.innerHTML = `<div class="waiting-placeholder">Waiting for opponent to join…</div>`;
    }

    // Update button text and handler based on role
    const cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
        if (isMeHost) {
            cancelBtn.textContent = '✕ Cancel Room';
            cancelBtn.onclick = cancelRoom;
        } else {
            cancelBtn.textContent = '← Exit Room';
            cancelBtn.onclick = exitRoom;
        }
    }

    const startBtn = document.getElementById('startGameBtn');
    if (startBtn) {
        startBtn.style.display = (gameInstance.playerRole === 'creator' && gameInstance.opponentName) ? 'block' : 'none';
    }
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

    const pct = parseInt(document.getElementById('density').value);
    const gs  = parseInt(document.getElementById('gridSize').value);
    const config = {
        appleDensity: pct / 100,
        gridSize: gs,
        timePerTurn:  parseInt(document.getElementById('time').value),
        mode: document.getElementById('mode')?.value || 'balanced'
    };
    gameInstance.currentConfig = config;

    socket.emit('createRoom', {
        name: playerName,
        avatarIndex,
        config: config,
        playerId
    });
}

socket.on('roomCreated', (data) => {
    gameInstance.roomCode    = data.roomCode;
    gameInstance.isMultiplayer = true;
    gameInstance.playerRole  = 'creator';
    gameInstance.myPlayerNum = 1;
    gameInstance.myPlayerId  = playerId;
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
        list.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:20px;font-weight:600;">No rooms available</p>';
        list.style.border = 'none';
        list.style.background = 'transparent';
        return;
    }
    
    list.style.border = '';
    list.style.background = '';
    
    list.innerHTML = filteredRooms.map(r => {
        let btn, badge;
        if (r.status === 'waiting') {
            btn   = `<button class="btn btn-submit" onclick="event.stopPropagation();joinRoomWithCode('${r.code}')">Join</button>`;
            badge = `<span style="font-size:0.75em;color:#27ae60;font-weight:600;">● Open</span>`;
        } else if (r.status === 'playing') {
            btn   = `<button class="btn btn-secondary" style="font-size:0.85em;padding:7px 12px;" onclick="event.stopPropagation();viewGameAsGuest('${r.code}')">👁 View</button>`;
            badge = `<span style="font-size:0.75em;color:#e74c3c;font-weight:600;">● Live</span>`;
        } else {
            btn   = '';
            badge = `<span style="font-size:0.75em;color:#c0392b;font-weight:600;">● Full</span>`;
        }

        // Config tags
        const cfg   = r.config || {};
        const gs    = cfg.gridSize || 10;
        const count = cfg.appleDensity != null ? Math.round(cfg.appleDensity * (gs * gs)) : 50;
        const secs  = cfg.timePerTurn  || 60;
        const mode  = cfg.mode         || 'balanced';
        const modeLabel = { free: 'Free Play', balanced: 'Balanced', pro: 'Poly Masters' }[mode] || mode;
        const cfgTags = `<div class="room-config-tags">
            <span class="rtag rtag-grid">${makeTag(TAG_ICONS.grid, `${gs}\u00d7${gs}`)}</span>
            <span class="rtag rtag-density">${makeTag(TAG_ICONS.apple, `${count} Apples`)}</span>
            <span class="rtag rtag-time">${makeTag(TAG_ICONS.clock, `${secs}s`)}</span>
            <span class="rtag rtag-mode">${makeTag(TAG_ICONS.bolt, modeLabel)}</span>
        </div>`;

        return `
            <div class="room-item">
                <div class="room-info">
                    <div style="font-weight:600;display:flex;align-items:center;gap:6px;">Room: ${r.code} ${badge}</div>
                    <div class="muted-text" style="font-size:0.9em;">Host: ${r.creator}</div>
                    ${cfgTags}
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
    gameInstance.myPlayerId = playerId;
    gameInstance.isJoining   = true;
    gameInstance.playerRole  = 'joiner';
    gameInstance.myPlayerNum = 2;
    gameInstance.roomCode    = roomCode;
    socket.emit('joinRoom', { roomCode, name, avatarIndex, playerId });
}



socket.on('playerJoined', (data) => {
    // data.players is an array of {id, name, avatarIndex}
    if (data.players) {
        const opponent = data.players.find(p => p.id !== playerId);
        if (opponent) {
            gameInstance.opponentName        = opponent.name;
            gameInstance.opponentId          = opponent.id;
            gameInstance.opponentAvatarIndex = opponent.avatarIndex;
            gameInstance.isMultiplayer       = true;
        }
    }

    if (data.config) gameInstance.currentConfig = data.config;

    if (gameInstance.playerRole === 'joiner') {
        gameInstance.isJoining = false;
        showWaitingScreen(gameInstance.roomCode, 'Waiting for host to start the game…');
    } else if (gameInstance.playerRole === 'creator') {
        updateWaitingSlots();
        setWaitingMessage(`${gameInstance.opponentName || 'Opponent'} is here! Start the duel?`);
    }
});

socket.on('joinFailed', (error) => {
    gameInstance.isJoining  = false;
    gameInstance.roomCode   = null;
    gameInstance.playerRole = 'creator';
    alert('Failed to join: ' + error.message);
    showLobbyTab('join');
});

socket.on('hostPromoted', (data) => {
    if (data.newHostId !== gameInstance.myPlayerId) return;

    gameInstance.playerRole = 'creator';
    gameInstance.myPlayerNum = 1;

    const opp = (data.players || []).find(p => p.id !== data.newHostId);
    if (opp) {
        gameInstance.opponentName = opp.name;
        gameInstance.opponentId = opp.id;
        gameInstance.opponentAvatarIndex = opp.avatarIndex;
    } else {
        gameInstance.opponentName = null;
        gameInstance.opponentId = null;
        gameInstance.opponentAvatarIndex = null;
    }

    updateWaitingSlots();

    if (!opp) setWaitingMessage('Waiting for opponent to join…');

    const startBtn = document.getElementById('startGameBtn');
    if (startBtn && !opp) startBtn.style.display = 'none';

    showNotification('You are now the room host!');
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
            data.applePositions,
            data.gridSize
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

function exitRoom() {
    // Joiner leaves the room
    if (gameInstance.roomCode) socket.emit('playerLeft', { roomCode: gameInstance.roomCode });
    showLobbyTab('join');
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
    document.body.classList.remove('game-active');

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
    document.body.classList.add('game-active');
}

function backToSummary() {
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('reviewBanner').classList.add('hidden');
    document.getElementById('summaryScreen').classList.remove('hidden');
    document.body.classList.remove('game-active');
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
    // Refresh slots so my own card is visible
    updateWaitingSlots();
    if (data.isCreator && data.bothBack) {
        const startBtn = document.getElementById('startGameBtn');
        if (startBtn) startBtn.style.display = 'block';
        setWaitingMessage('Opponent is back! Start a new game?');
    }
});

socket.on('playerReturnedToRoom', (data) => {
    // Sync opponent info from the returning player payload
    if (data.player) {
        const returnerIsMyOpponent = (gameInstance.playerRole === 'creator')
            ? !data.player.isCreator
            : data.player.isCreator;
        if (returnerIsMyOpponent) {
            gameInstance.opponentName        = data.player.name;
            gameInstance.opponentAvatarIndex = data.player.avatarIndex ?? gameInstance.opponentAvatarIndex;
        }
    }
    updateWaitingSlots();
    if (gameInstance.playerRole === 'creator') {
        const startBtn = document.getElementById('startGameBtn');
        if (startBtn) startBtn.style.display = 'block';
        setWaitingMessage('Opponent is back! Start a new game?');
    } else {
        setWaitingMessage('Host is ready — waiting for them to start…');
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
    document.body.classList.remove('game-active');
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
        data.applePositions,
        data.gridSize
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

// ===========================
// ANIMATED BACKGROUND
// ===========================

let bgAnimationState = {
    apples: [],
    curves: [],
    arrows: [],
    particles: [],
    arrowCooldown: 250,
    themeTransition: null,
    animationId: null
};

function initBgCanvas() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const BG = bgAnimationState;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Helpers ──────────────────────────────────────
    function mkApple(spawn) {
        const size  = 45;
        const speed = 2.5 + Math.random() * 2.0;

        if (!spawn) {
            // Initial placement: scatter inside canvas with random direction
            const angle = Math.random() * Math.PI * 2;
            return {
                x: size + Math.random() * (canvas.width  - size * 2),
                y: 60 + size + Math.random() * (canvas.height - 60 - size * 2),
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.05,
                opacity: 1, dying: false, dyingTick: 0
            };
        }

        // Respawn: enter from one of 8 spawn points (4 edges + 4 corners)
        const W = canvas.width, H = canvas.height;
        const type = Math.floor(Math.random() * 8);
        const spread = 0.45; // ±~13° angular jitter
        let x, y, angle;

        if      (type === 0) { x = size + Math.random()*(W-size*2); y = -size;   angle =  Math.PI*0.50 + (Math.random()-0.5)*spread; } // top → down
        else if (type === 1) { x = W+size; y = 60+size+Math.random()*(H-60-size*2); angle =  Math.PI      + (Math.random()-0.5)*spread; } // right → left
        else if (type === 2) { x = size + Math.random()*(W-size*2); y = H+size;   angle = -Math.PI*0.50 + (Math.random()-0.5)*spread; } // bottom → up
        else if (type === 3) { x = -size; y = 60+size+Math.random()*(H-60-size*2); angle =               (Math.random()-0.5)*spread; } // left → right
        else if (type === 4) { x = -size;   y = -size;   angle =  Math.PI*0.25 + (Math.random()-0.5)*spread; } // ↙ top-left → diagonal down-right
        else if (type === 5) { x = W+size;  y = -size;   angle =  Math.PI*0.75 + (Math.random()-0.5)*spread; } // ↘ top-right → diagonal down-left
        else if (type === 6) { x = -size;   y = H+size;  angle = -Math.PI*0.25 + (Math.random()-0.5)*spread; } // ↗ bottom-left → diagonal up-right
        else                 { x = W+size;  y = H+size;  angle = -Math.PI*0.75 + (Math.random()-0.5)*spread; } // ↖ bottom-right → diagonal up-left

        return {
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.05,
            opacity: 1, dying: false, dyingTick: 0
        };
    }

    function mkArrow() {
        const edge = Math.floor(Math.random() * 4);
        const spd  = 10 + Math.random() * 6;
        const w = canvas.width, h = canvas.height;
        let x, y, vx, vy;
        if (edge === 0)      { x = Math.random() * w; y = -20;  vx = (Math.random()-0.5)*spd*0.25; vy =  spd; }
        else if (edge === 1) { x = w + 20; y = Math.random() * h; vx = -spd; vy = (Math.random()-0.5)*spd*0.25; }
        else if (edge === 2) { x = Math.random() * w; y = h + 20; vx = (Math.random()-0.5)*spd*0.25; vy = -spd; }
        else                 { x = -20; y = Math.random() * h; vx =  spd; vy = (Math.random()-0.5)*spd*0.25; }
        return { x, y, vx, vy, done: false };
    }

    function spawnBurst(x, y, appleSize) {
        // Expanding ring
        BG.particles.push({ type: 'ring', x, y, life: 22, maxLife: 22, radius: appleSize * 0.3 });
        // 8 yellow rays shooting outward
        for (let i = 0; i < 8; i++) {
            BG.particles.push({
                type: 'ray', x, y,
                angle: (i / 8) * Math.PI * 2,
                life: 20, maxLife: 20,
                maxLen: appleSize * 2.5
            });
        }
        // Apple chunks
        for (let i = 0; i < 5; i++) {
            const ang = (i / 5) * Math.PI * 2 + Math.random() * 0.5;
            const spd = 3 + Math.random() * 4;
            BG.particles.push({
                type: 'chunk', x, y,
                vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
                life: 22 + Math.random() * 6, maxLife: 28,
                size: 4 + Math.random() * 4,
                color: Math.random() < 0.5 ? '#e53e3e' : '#c0392b'
            });
        }
        // Leaf fragments
        for (let i = 0; i < 2; i++) {
            const ang = Math.random() * Math.PI * 2;
            const spd = 2 + Math.random() * 3;
            BG.particles.push({
                type: 'leaf', x, y,
                vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 1.5,
                life: 20 + Math.random() * 8, maxLife: 28,
                size: 7, rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.25
            });
        }
        // Stem fragment
        BG.particles.push({
            type: 'chunk', x, y: y - appleSize * 0.3,
            vx: (Math.random() - 0.5) * 2, vy: -3 - Math.random() * 2,
            life: 18, maxLife: 18, size: 3, color: '#5d4037'
        });
    }

    // ── Init ─────────────────────────────────────────
    BG.apples = Array.from({ length: 10 }, () => mkApple(false));
    BG.arrows = [];
    BG.particles = [];
    BG.arrowCooldown = 60 + Math.floor(Math.random() * 60);
    BG.curves = Array.from({ length: 3 }, () => ({
        offset: Math.random() * canvas.width,
        amplitude: 30 + Math.random() * 40,
        frequency: 0.002 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7
    }));

    // ── Draw functions ────────────────────────────────
    function drawBackground() {
        const isDark = document.body.dataset.theme !== 'light';
        if (isDark) {
            const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            g.addColorStop(0, '#2d3748');
            g.addColorStop(1, '#4a5568');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            // Vintage parchment + botanical gradient
            const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            g.addColorStop(0,    '#ede0c4'); // warm parchment
            g.addColorStop(0.28, '#cfddb0'); // sage green
            g.addColorStop(0.55, '#b8cfe0'); // muted sky
            g.addColorStop(0.78, '#d5c4e8'); // soft lavender
            g.addColorStop(1,    '#e8d4b8'); // warm peach
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Subtle warm overlay (parchment texture feel)
            ctx.fillStyle = 'rgba(160,120,60,0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawVineDecor();
        }
    }

    function drawVineDecor() {
        const stem = 'rgba(100,72,40,0.13)';
        const leaf = 'rgba(65,105,48,0.11)';
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = stem;
        ctx.lineCap = 'round';

        function vineCorner(ox, oy, sx, sy) {
            // Main arcing stem
            ctx.beginPath();
            ctx.moveTo(ox, oy);
            ctx.bezierCurveTo(ox + sx*40, oy + sy*100, ox + sx*100, oy + sy*40, ox + sx*160, oy + sy*18);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ox, oy);
            ctx.bezierCurveTo(ox + sx*100, oy + sy*40, ox + sx*40, oy + sy*100, ox + sx*18, oy + sy*160);
            ctx.stroke();
            // Small tendrils
            ctx.lineWidth = 1.2;
            ctx.strokeStyle = 'rgba(80,110,50,0.10)';
            ctx.beginPath();
            ctx.moveTo(ox + sx*55, oy + sy*55);
            ctx.quadraticCurveTo(ox + sx*80, oy + sy*35, ox + sx*70, oy + sy*20);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(ox + sx*55, oy + sy*55);
            ctx.quadraticCurveTo(ox + sx*35, oy + sy*80, ox + sx*20, oy + sy*70);
            ctx.stroke();
            // Leaves (ellipses)
            ctx.fillStyle = leaf;
            [[ox+sx*72, oy+sy*32, -sy*0.6+sx*0.4],
             [ox+sx*32, oy+sy*72,  sx*0.6-sy*0.4],
             [ox+sx*55, oy+sy*55,  (sx+sy)*0.3],
             [ox+sx*100, oy+sy*20, -sy*0.3],
             [ox+sx*20, oy+sy*100, sx*0.3]].forEach(([lx, ly, ang]) => {
                ctx.save();
                ctx.translate(lx, ly);
                ctx.rotate(ang);
                ctx.beginPath();
                ctx.ellipse(0, 0, 13, 6, 0, 0, Math.PI*2);
                ctx.fill();
                ctx.restore();
            });
            ctx.lineWidth = 2;
            ctx.strokeStyle = stem;
        }

        const W = canvas.width, H = canvas.height;
        vineCorner(0,  0,   1,  1);   // top-left
        vineCorner(W,  0,  -1,  1);   // top-right
        vineCorner(0,  H,   1, -1);   // bottom-left
        vineCorner(W,  H,  -1, -1);   // bottom-right

        // Sparse leaf scatter along edges
        ctx.fillStyle = 'rgba(70,105,50,0.07)';
        for (let i = 0; i < 6; i++) {
            const lx = (i + 0.5) * (W / 6);
            ctx.save(); ctx.translate(lx, 20 + Math.sin(lx*0.02)*8);
            ctx.rotate(Math.sin(lx*0.015)*0.5);
            ctx.beginPath(); ctx.ellipse(0,0,10,5,0,0,Math.PI*2); ctx.fill();
            ctx.restore();
            ctx.save(); ctx.translate(lx, H - 20 + Math.sin(lx*0.02)*8);
            ctx.rotate(Math.sin(lx*0.015+1)*0.5 + Math.PI);
            ctx.beginPath(); ctx.ellipse(0,0,10,5,0,0,Math.PI*2); ctx.fill();
            ctx.restore();
        }
        ctx.restore();
    }

    function drawCurves() {
        const isDark = document.body.dataset.theme !== 'light';
        BG.curves.forEach(curve => {
            if (isDark) {
                curve.offset += curve.speed;
                if (curve.offset > canvas.width) curve.offset = -100;
                ctx.strokeStyle = 'rgba(139,92,246,0.15)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                for (let x = 0; x < canvas.width + 100; x += 10) {
                    const xv = x + curve.offset;
                    const yv = canvas.height / 2 + curve.amplitude * Math.sin(xv * curve.frequency + curve.phase);
                    x === 0 ? ctx.moveTo(xv, yv) : ctx.lineTo(xv, yv);
                }
                ctx.stroke();
            } else {
                // Gentle vine-like waves
                curve.offset += curve.speed * 0.25;
                if (curve.offset > canvas.width * 4) curve.offset = 0;
                ctx.strokeStyle = 'rgba(80,115,55,0.09)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x += 8) {
                    const yv = canvas.height * (0.25 + curve.phase * 0.15)
                        + curve.amplitude * 1.4 * Math.sin(x * curve.frequency * 0.8 + curve.phase + curve.offset * 0.004);
                    x === 0 ? ctx.moveTo(x, yv) : ctx.lineTo(x, yv);
                }
                ctx.stroke();
            }
        });
    }

    function paintSun(time, scale, extraRot) {
        const r = 45;
        ctx.rotate(extraRot);
        ctx.scale(scale, scale);
        const glow = ctx.createRadialGradient(0, 0, r*0.7, 0, 0, r*2.2);
        glow.addColorStop(0, 'rgba(255,215,0,0.35)');
        glow.addColorStop(1, 'rgba(255,180,0,0)');
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(0, 0, r*2.2, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#FFD000';
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = 'rgba(255,245,150,0.5)';
        ctx.beginPath(); ctx.arc(-8, -8, r*0.45, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = 'rgba(255,160,0,0.75)';
        ctx.lineWidth = 3.5; ctx.lineCap = 'round';
        for (let i = 0; i < 8; i++) {
            const ang = (i/8)*Math.PI*2 + time;
            ctx.beginPath();
            ctx.moveTo(Math.cos(ang)*(r+10), Math.sin(ang)*(r+10));
            ctx.lineTo(Math.cos(ang)*(r+28), Math.sin(ang)*(r+28));
            ctx.stroke();
        }
    }

    function paintMoon(scale, extraRot) {
        const r = 45;
        ctx.rotate(extraRot);
        ctx.scale(scale, scale);
        ctx.fillStyle = 'rgba(139,92,246,0.45)';
        ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#2d3748';
        ctx.beginPath(); ctx.arc(15, 0, r-5, 0, Math.PI*2); ctx.fill();
    }

    function drawSunMoon() {
        const isDark = document.body.dataset.theme !== 'light';
        const time   = Date.now() * 0.0002;
        const trans  = BG.themeTransition;
        const cx = 100, cy = 80;

        if (!trans) {
            // Steady state
            ctx.save(); ctx.translate(cx, cy);
            isDark ? paintMoon(1, 0) : paintSun(time, 1, 0);
            ctx.restore();
            return;
        }

        const progress = Math.min(1, (Date.now() - trans.start) / 600);
        if (progress >= 1) { BG.themeTransition = null; }

        const towardDark = (trans.from === 'light');

        if (progress < 0.5) {
            // Phase 1: old body shrinks + spins out (0→0.5)
            const p = progress / 0.5;           // 0→1
            const scale = 1 - p;
            const rot   = p * Math.PI * 0.75;  // 0 → 135deg
            ctx.save(); ctx.translate(cx, cy);
            towardDark ? paintSun(time, scale, rot) : paintMoon(scale, -rot);
            ctx.restore();
        } else {
            // Phase 2: new body grows + spins in (0.5→1)
            const p = (progress - 0.5) / 0.5;  // 0→1
            const scale = p;
            const rot   = (1 - p) * Math.PI * 0.75; // 135deg → 0
            ctx.save(); ctx.translate(cx, cy);
            towardDark ? paintMoon(scale, rot) : paintSun(time, scale, -rot);
            ctx.restore();
        }
    }

    function drawApples() {
        const POP_TICKS  = 5;
        const FADE_TICKS = 20;
        // Remove fully dead apples and spawn replacements
        const dead = BG.apples.filter(a => a.dying && a.dyingTick > POP_TICKS + FADE_TICKS);
        if (dead.length) {
            BG.apples = BG.apples.filter(a => !(a.dying && a.dyingTick > POP_TICKS + FADE_TICKS));
            const cap = Math.max(0, 13 - BG.apples.length);
            const add = Math.min(dead.length * (Math.random() < 0.5 ? 2 : 1), cap, 3);
            for (let i = 0; i < add; i++) BG.apples.push(mkApple(true));
        }

        // Update
        BG.apples.forEach(apple => {
            if (apple.dying) {
                apple.dyingTick++;
                if (apple.dyingTick > POP_TICKS) {
                    apple.opacity = Math.max(0, 1 - (apple.dyingTick - POP_TICKS) / FADE_TICKS);
                }
                return;
            }
            apple.x += apple.vx; apple.y += apple.vy;
            apple.rotation += apple.rotSpeed;
            const h = apple.size / 2;
            if (apple.x - h < 0)            { apple.vx =  Math.abs(apple.vx); apple.x = h; }
            if (apple.x + h > canvas.width)  { apple.vx = -Math.abs(apple.vx); apple.x = canvas.width - h; }
            if (apple.y - h < 60)            { apple.vy =  Math.abs(apple.vy); apple.y = 60 + h; }
            if (apple.y + h > canvas.height) { apple.vy = -Math.abs(apple.vy); apple.y = canvas.height - h; }
        });

        // Draw
        const isLightMode = document.body.dataset.theme === 'light';
        BG.apples.forEach(apple => {
            if (apple.opacity <= 0) return;
            ctx.save();
            ctx.translate(apple.x, apple.y);
            ctx.rotate(apple.rotation);

            if (apple.dying && apple.dyingTick <= POP_TICKS) {
                // Pop flash: brief scale-up + white glow
                const pop = 1 + (1 - apple.dyingTick / POP_TICKS) * 0.38;
                const gr = ctx.createRadialGradient(0, 0, 0, 0, 0, apple.size * pop * 0.75);
                gr.addColorStop(0, 'rgba(255,255,220,0.95)');
                gr.addColorStop(1, 'rgba(255,240,160,0)');
                ctx.fillStyle = gr;
                ctx.beginPath(); ctx.arc(0, 0, apple.size * pop * 0.75, 0, Math.PI * 2); ctx.fill();
                ctx.font = `${Math.round(apple.size * pop)}px Arial`;
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText('🍎', 0, 0);
            } else {
                ctx.globalAlpha = apple.opacity;
                if (isLightMode) {
                    const glow = ctx.createRadialGradient(0, 0, apple.size*0.2, 0, 0, apple.size*0.65);
                    glow.addColorStop(0, 'rgba(255,120,60,0.38)');
                    glow.addColorStop(1, 'rgba(255,80,30,0)');
                    ctx.fillStyle = glow;
                    ctx.beginPath(); ctx.arc(0, 0, apple.size*0.65, 0, Math.PI*2); ctx.fill();
                }
                ctx.font = `${apple.size}px Arial`;
                ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
                ctx.fillText('🍎', 0, 0);
            }
            ctx.restore();
        });
    }

    function drawArrows() {
        BG.arrowCooldown--;
        if (BG.arrowCooldown <= 0) {
            BG.arrows.push(mkArrow());
            BG.arrows.push(mkArrow()); // always two arrows per cycle
            if (Math.random() < 0.35) BG.arrows.push(mkArrow()); // occasional triple-shot
            BG.arrowCooldown = 80 + Math.floor(Math.random() * 80);
        }

        const isDark = document.body.dataset.theme !== 'light';
        const shaftColor = isDark ? 'rgba(210,175,90,0.9)' : 'rgba(130,80,30,0.9)';
        const headColor  = isDark ? 'rgba(200,160,70,1)'   : 'rgba(110,60,20,1)';
        const fletchColor= isDark ? 'rgba(190,90,90,0.85)' : 'rgba(160,55,55,0.85)';

        BG.arrows = BG.arrows.filter(a => !a.done);
        BG.arrows.forEach(arrow => {
            arrow.x += arrow.vx; arrow.y += arrow.vy;
            // Off-screen → done
            if (arrow.x < -80 || arrow.x > canvas.width+80 || arrow.y < -80 || arrow.y > canvas.height+80) {
                arrow.done = true; return;
            }
            // Collision check
            BG.apples.forEach(apple => {
                if (apple.dying) return;
                const dx = arrow.x - apple.x, dy = arrow.y - apple.y;
                if (Math.sqrt(dx*dx+dy*dy) < apple.size * 0.55) {
                    apple.dying = true; arrow.done = true;
                    spawnBurst(apple.x, apple.y, apple.size);
                }
            });

            const ang = Math.atan2(arrow.vy, arrow.vx);
            const len = 55;
            const tx = arrow.x - Math.cos(ang)*len, ty = arrow.y - Math.sin(ang)*len;

            // Shaft
            ctx.save();
            ctx.strokeStyle = shaftColor; ctx.lineWidth = 3; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(arrow.x, arrow.y); ctx.stroke();

            // Arrowhead
            ctx.fillStyle = headColor;
            ctx.save();
            ctx.translate(arrow.x, arrow.y); ctx.rotate(ang);
            ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(-5,5); ctx.lineTo(-5,-5); ctx.closePath();
            ctx.fill(); ctx.restore();

            // Fletching at tail
            ctx.strokeStyle = fletchColor; ctx.lineWidth = 2;
            const px = -Math.sin(ang)*8, py = Math.cos(ang)*8;
            const tail2x = tx + Math.cos(ang)*12, tail2y = ty + Math.sin(ang)*12;
            [[tx+px, ty+py], [tx-px, ty-py]].forEach(([fx,fy]) => {
                ctx.beginPath(); ctx.moveTo(fx,fy); ctx.lineTo(tail2x,tail2y); ctx.stroke();
            });
            ctx.restore();
        });
    }

    function drawParticles() {
        const isDarkTheme = document.body.dataset.theme !== 'light';
        BG.particles = BG.particles.filter(p => p.life > 0);
        BG.particles.forEach(p => {
            p.life--;
            const t = p.life / p.maxLife;
            if (p.type === 'ring') {
                const r = p.radius + (1 - t) * p.radius * 3.5;
                ctx.save();
                ctx.globalAlpha = t * 0.85;
                ctx.strokeStyle = isDarkTheme ? 'rgba(255,220,50,1)' : 'rgba(200,120,0,1)';
                ctx.lineWidth = isDarkTheme ? 2.5 : 3;
                ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.stroke();
                ctx.restore();
            } else if (p.type === 'ray') {
                const progress = 1 - t;
                const rayLen = p.maxLen * Math.sqrt(progress);
                ctx.save();
                ctx.globalAlpha = t * 0.9;
                ctx.strokeStyle = isDarkTheme ? 'rgba(255,220,50,1)' : 'rgba(200,110,0,1)';
                ctx.lineWidth = isDarkTheme ? 2.5 : 3;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + Math.cos(p.angle) * rayLen, p.y + Math.sin(p.angle) * rayLen);
                ctx.stroke();
                ctx.restore();
            } else if (p.type === 'chunk') {
                p.vx *= 0.91; p.vy *= 0.91;
                p.x += p.vx; p.y += p.vy;
                ctx.save();
                ctx.globalAlpha = t;
                ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(1, p.size * t + 1), 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            } else if (p.type === 'leaf') {
                p.vx *= 0.88; p.vy *= 0.88; p.vy += 0.12;
                p.x += p.vx; p.y += p.vy;
                p.rotation += p.rotSpeed;
                ctx.save();
                ctx.globalAlpha = t * 0.9;
                ctx.fillStyle = 'rgba(56,142,60,0.95)';
                ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
                ctx.beginPath(); ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }
        });
    }

    function animate() {
        drawBackground();
        drawCurves();
        drawArrows();
        drawApples();
        drawParticles();
        drawSunMoon();
        BG.animationId = requestAnimationFrame(animate);
    }

    animate();
}

updateSettingsTags();
