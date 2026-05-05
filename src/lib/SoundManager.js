// Web Audio synthesis — no external assets, runs offline.
// All sounds generated from oscillators + filtered noise envelopes.

export class SoundManager {
    constructor() {
        this.enabled = true;
        this._ctx = null;
        this._bgNodes = null;       // running BG music nodes
        this._bgTimer = null;
        this._masterGain = null;
    }

    get ctx() {
        if (!this._ctx) {
            try {
                this._ctx = new (window.AudioContext || window.webkitAudioContext)();
                this._masterGain = this._ctx.createGain();
                this._masterGain.gain.value = 1;
                this._masterGain.connect(this._ctx.destination);
            } catch (e) { /* no audio support */ }
        }
        if (this._ctx && this._ctx.state === 'suspended') {
            // Browsers require a user gesture; resume() is idempotent.
            this._ctx.resume().catch(() => {});
        }
        return this._ctx;
    }

    _dest() { return this._masterGain || this.ctx?.destination; }

    tone(freq, duration, vol = 0.3, type = 'sine') {
        if (!this.enabled || !this.ctx) return;
        try {
            const t0 = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, t0);
            gain.gain.setValueAtTime(vol, t0);
            gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
            osc.connect(gain).connect(this._dest());
            osc.start(t0);
            osc.stop(t0 + duration);
        } catch (e) { /* ignore */ }
    }

    // ─── Countdown 3-2-1-Go (race-car beeps) ────────────────────────
    countdown(n) {
        if (!this.enabled || !this.ctx) return;
        if (n > 0) {
            // ascending short beeps Ab-Bb-C
            const pitches = [0, 415, 466, 523];
            this.tone(pitches[Math.min(n, 3)] || 440, 0.28, 0.5, 'square');
        } else {
            // GO! — triumphant ascending triad
            this.tone(523, 0.18, 0.4, 'square');
            setTimeout(() => this.tone(659, 0.18, 0.38, 'square'), 70);
            setTimeout(() => this.tone(784, 0.45, 0.35, 'square'), 140);
        }
    }

    // ─── Arrow shoot ("vút") — quick descending whoosh + air ────────
    arrowShoot() {
        if (!this.enabled || !this.ctx) return;
        try {
            const t0 = this.ctx.currentTime;
            const dur = 0.18;
            // pitched body — sweep down
            const osc = this.ctx.createOscillator();
            const gOsc = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(900, t0);
            osc.frequency.exponentialRampToValueAtTime(180, t0 + dur);
            gOsc.gain.setValueAtTime(0.0001, t0);
            gOsc.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02);
            gOsc.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
            osc.connect(gOsc).connect(this._dest());
            osc.start(t0); osc.stop(t0 + dur);

            // air noise — filtered
            const buf = this._noiseBuffer(dur);
            const src = this.ctx.createBufferSource();
            const bp = this.ctx.createBiquadFilter();
            const gN = this.ctx.createGain();
            src.buffer = buf;
            bp.type = 'bandpass';
            bp.frequency.setValueAtTime(2400, t0);
            bp.frequency.exponentialRampToValueAtTime(800, t0 + dur);
            bp.Q.value = 1.4;
            gN.gain.setValueAtTime(0.18, t0);
            gN.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
            src.connect(bp).connect(gN).connect(this._dest());
            src.start(t0); src.stop(t0 + dur);
        } catch (e) { /* ignore */ }
    }

    // ─── Arrow hits apple — short woody "thock" ─────────────────────
    arrowHit() {
        if (!this.enabled || !this.ctx) return;
        try {
            const t0 = this.ctx.currentTime;
            const dur = 0.16;
            // low body
            const osc = this.ctx.createOscillator();
            const g1 = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(220, t0);
            osc.frequency.exponentialRampToValueAtTime(80, t0 + dur);
            g1.gain.setValueAtTime(0.35, t0);
            g1.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
            osc.connect(g1).connect(this._dest());
            osc.start(t0); osc.stop(t0 + dur);
            // crisp click — short noise burst
            const buf = this._noiseBuffer(0.04);
            const src = this.ctx.createBufferSource();
            const hp = this.ctx.createBiquadFilter();
            const g2 = this.ctx.createGain();
            src.buffer = buf;
            hp.type = 'highpass'; hp.frequency.value = 1500;
            g2.gain.setValueAtTime(0.22, t0);
            g2.gain.exponentialRampToValueAtTime(0.001, t0 + 0.04);
            src.connect(hp).connect(g2).connect(this._dest());
            src.start(t0); src.stop(t0 + 0.05);
        } catch (e) { /* ignore */ }
    }

    // ─── Apple eat (kept for backward compat) ───────────────────────
    appleEat() {
        this.tone(880, 0.1, 0.5);
        setTimeout(() => this.tone(1174, 0.15, 0.3), 60);
    }

    // ─── Polynomial line slices ≥1 apples — slicing chime ───────────
    appleSlice(count = 1) {
        if (!this.enabled || !this.ctx) return;
        try {
            const t0 = this.ctx.currentTime;
            // swoosh — narrow noise sweep (the slice itself)
            const buf = this._noiseBuffer(0.18);
            const src = this.ctx.createBufferSource();
            const bp = this.ctx.createBiquadFilter();
            const gS = this.ctx.createGain();
            src.buffer = buf;
            bp.type = 'bandpass';
            bp.frequency.setValueAtTime(800, t0);
            bp.frequency.exponentialRampToValueAtTime(4000, t0 + 0.18);
            bp.Q.value = 4;
            gS.gain.setValueAtTime(0.18, t0);
            gS.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
            src.connect(bp).connect(gS).connect(this._dest());
            src.start(t0); src.stop(t0 + 0.18);

            // ascending arpeggio — one note per apple, capped at 4
            const notes = [659, 784, 988, 1175];
            const n = Math.min(count, 4);
            for (let i = 0; i < n; i++) {
                const f = notes[i] || 1175;
                const start = t0 + 0.06 + i * 0.07;
                const osc = this.ctx.createOscillator();
                const g = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = f;
                g.gain.setValueAtTime(0.0001, start);
                g.gain.exponentialRampToValueAtTime(0.32, start + 0.01);
                g.gain.exponentialRampToValueAtTime(0.001, start + 0.22);
                osc.connect(g).connect(this._dest());
                osc.start(start); osc.stop(start + 0.24);
            }
        } catch (e) { /* ignore */ }
    }

    // ─── Background music — gentle looped chord progression ─────────
    // I-vi-IV-V in C major, slow tempo, low volume.
    startBgMusic() {
        if (!this.enabled || !this.ctx || this._bgNodes) return;
        try {
            const ctx = this.ctx;
            const bgGain = ctx.createGain();
            bgGain.gain.value = 0.06; // quiet background
            bgGain.connect(this._dest());
            this._bgNodes = { gain: bgGain, voices: [] };

            // C major arpeggio progression: C-E-G, A-C-E, F-A-C, G-B-D
            const chords = [
                [262, 330, 392], // C
                [220, 262, 330], // Am
                [175, 220, 262], // F
                [196, 247, 294], // G
            ];
            const stepDur = 0.45; // seconds per note
            const chordDur = stepDur * 4; // 4 notes per chord
            const loopDur = chordDur * chords.length;

            const schedule = (startAt) => {
                if (!this._bgNodes) return;
                chords.forEach((chord, ci) => {
                    // pluck each chord tone in arpeggio
                    for (let i = 0; i < 4; i++) {
                        const noteIdx = i % 3;
                        const freq = chord[noteIdx] * (i === 3 ? 2 : 1); // octave on 4th note
                        const t = startAt + ci * chordDur + i * stepDur;
                        const osc = ctx.createOscillator();
                        const g = ctx.createGain();
                        osc.type = 'triangle';
                        osc.frequency.value = freq;
                        g.gain.setValueAtTime(0.0001, t);
                        g.gain.exponentialRampToValueAtTime(0.6, t + 0.02);
                        g.gain.exponentialRampToValueAtTime(0.001, t + stepDur * 0.95);
                        osc.connect(g).connect(bgGain);
                        osc.start(t);
                        osc.stop(t + stepDur);
                        this._bgNodes.voices.push(osc);
                    }
                });
            };

            const startAt = ctx.currentTime + 0.05;
            schedule(startAt);
            // re-schedule slightly before current loop ends
            this._bgTimer = setInterval(() => {
                if (!this._bgNodes) return;
                schedule(ctx.currentTime + 0.1);
            }, loopDur * 1000);
        } catch (e) { /* ignore */ }
    }

    stopBgMusic() {
        if (this._bgTimer) { clearInterval(this._bgTimer); this._bgTimer = null; }
        if (this._bgNodes) {
            try {
                const t = this.ctx?.currentTime || 0;
                this._bgNodes.gain.gain.cancelScheduledValues(t);
                this._bgNodes.gain.gain.setValueAtTime(this._bgNodes.gain.gain.value, t);
                this._bgNodes.gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
                setTimeout(() => {
                    try {
                        this._bgNodes?.voices.forEach(v => { try { v.stop(); } catch (_) {} });
                        this._bgNodes?.gain.disconnect();
                    } catch (_) {}
                    this._bgNodes = null;
                }, 350);
            } catch (e) { this._bgNodes = null; }
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) this.stopBgMusic();
        return this.enabled;
    }

    // ─── Internal: white-noise buffer for filtered effects ──────────
    _noiseBuffer(seconds) {
        const sr = this.ctx.sampleRate;
        const buf = this.ctx.createBuffer(1, Math.max(1, Math.floor(sr * seconds)), sr);
        const ch = buf.getChannelData(0);
        for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
        return buf;
    }
}

export const soundManager = new SoundManager();
