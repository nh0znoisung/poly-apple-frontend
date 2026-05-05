export class Renderer {
    constructor(canvasEl) {
        this.canvas = canvasEl;
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 10;
        this.pad = 1;
        this.displayUnits = (this.gridSize - 1) + 2 * this.pad;

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
            cy: (lastCoord + this.pad - wy) * this.unit + this.pan.y,
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

        // committed lines (solid)
        if (gameState.player1.currentLine) {
            this.drawLineFromData(gameState.player1.currentLine, '#4a9eff', 2.5);
        }
        if (gameState.player2.currentLine) {
            this.drawLineFromData(gameState.player2.currentLine, '#e24a4a', 2.5);
        }

        // live preview lines (dashed, ghost) — only the local player ever sets these
        const drawPreview = (line, color) => {
            if (!line) return;
            this.ctx.save();
            this.ctx.setLineDash([8, 6]);
            this.ctx.globalAlpha = 0.7;
            this.drawLineFromData(line, color, 2);
            this.ctx.restore();
            this.ctx.setLineDash([]);
        };
        drawPreview(gameState.player1.previewLine, '#4a9eff');
        drawPreview(gameState.player2.previewLine, '#e24a4a');

        const hx = highlightApple?.x ?? null;
        const hy = highlightApple?.y ?? null;
        this.drawApples(gameState.apples, hx, hy);
    }
}
