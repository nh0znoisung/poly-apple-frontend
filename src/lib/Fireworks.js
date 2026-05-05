export class Fireworks {
    constructor(canvasEl) {
        this.canvas = canvasEl;
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
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
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
