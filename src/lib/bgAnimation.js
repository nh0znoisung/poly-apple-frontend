// Animated background: floating apples, arrows, vine curves, sun/moon
import { soundManager } from './SoundManager.js';

let _state = null;

function shouldPlayBgSounds() {
    // Suppress arrow SFX when in the actual game so BG music isn't drowned out.
    return !document.body.classList.contains('game-active');
}

export function initBgCanvas(canvas) {
    if (!canvas) return () => {};
    const ctx = canvas.getContext('2d');

    const BG = {
        apples: [],
        curves: [],
        arrows: [],
        particles: [],
        arrowCooldown: 60 + Math.floor(Math.random() * 60),
        themeTransition: null,
        animationId: null,
    };
    _state = BG;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    // ── Helpers ──────────────────────────────────────
    function mkApple(spawn) {
        const size  = 45;
        const speed = 2.5 + Math.random() * 2.0;
        if (!spawn) {
            const angle = Math.random() * Math.PI * 2;
            return {
                x: size + Math.random() * (canvas.width  - size * 2),
                y: 60 + size + Math.random() * (canvas.height - 60 - size * 2),
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size, rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.05,
                opacity: 1, dying: false, dyingTick: 0,
            };
        }
        const W = canvas.width, H = canvas.height;
        const type = Math.floor(Math.random() * 8);
        const spread = 0.45;
        let x, y, angle;
        if      (type === 0) { x = size + Math.random()*(W-size*2); y = -size;   angle =  Math.PI*0.50 + (Math.random()-0.5)*spread; }
        else if (type === 1) { x = W+size; y = 60+size+Math.random()*(H-60-size*2); angle =  Math.PI      + (Math.random()-0.5)*spread; }
        else if (type === 2) { x = size + Math.random()*(W-size*2); y = H+size;   angle = -Math.PI*0.50 + (Math.random()-0.5)*spread; }
        else if (type === 3) { x = -size; y = 60+size+Math.random()*(H-60-size*2); angle =               (Math.random()-0.5)*spread; }
        else if (type === 4) { x = -size;   y = -size;   angle =  Math.PI*0.25 + (Math.random()-0.5)*spread; }
        else if (type === 5) { x = W+size;  y = -size;   angle =  Math.PI*0.75 + (Math.random()-0.5)*spread; }
        else if (type === 6) { x = -size;   y = H+size;  angle = -Math.PI*0.25 + (Math.random()-0.5)*spread; }
        else                 { x = W+size;  y = H+size;  angle = -Math.PI*0.75 + (Math.random()-0.5)*spread; }
        return { x, y, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, size,
            rotation: Math.random()*Math.PI*2, rotSpeed: (Math.random()-0.5)*0.05,
            opacity: 1, dying: false, dyingTick: 0 };
    }

    function mkArrow() {
        const edge = Math.floor(Math.random() * 4);
        const spd  = 10 + Math.random() * 6;
        const w = canvas.width, h = canvas.height;
        let x, y, vx, vy;
        if (edge === 0)      { x = Math.random()*w; y = -20;  vx = (Math.random()-0.5)*spd*0.25; vy =  spd; }
        else if (edge === 1) { x = w+20; y = Math.random()*h; vx = -spd; vy = (Math.random()-0.5)*spd*0.25; }
        else if (edge === 2) { x = Math.random()*w; y = h+20; vx = (Math.random()-0.5)*spd*0.25; vy = -spd; }
        else                 { x = -20; y = Math.random()*h; vx =  spd; vy = (Math.random()-0.5)*spd*0.25; }
        return { x, y, vx, vy, done: false };
    }

    function spawnBurst(x, y, appleSize) {
        BG.particles.push({ type: 'ring', x, y, life: 22, maxLife: 22, radius: appleSize * 0.3 });
        for (let i = 0; i < 8; i++) {
            BG.particles.push({ type: 'ray', x, y, angle: (i/8)*Math.PI*2, life: 20, maxLife: 20, maxLen: appleSize*2.5 });
        }
        for (let i = 0; i < 5; i++) {
            const ang = (i/5)*Math.PI*2 + Math.random()*0.5;
            const spd = 3 + Math.random()*4;
            BG.particles.push({ type: 'chunk', x, y,
                vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd,
                life: 22+Math.random()*6, maxLife: 28,
                size: 4+Math.random()*4, color: Math.random()<0.5?'#e53e3e':'#c0392b' });
        }
        for (let i = 0; i < 2; i++) {
            const ang = Math.random()*Math.PI*2;
            const spd = 2+Math.random()*3;
            BG.particles.push({ type: 'leaf', x, y,
                vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd-1.5,
                life: 20+Math.random()*8, maxLife: 28,
                size: 7, rotation: Math.random()*Math.PI*2,
                rotSpeed: (Math.random()-0.5)*0.25 });
        }
        BG.particles.push({ type: 'chunk', x, y: y-appleSize*0.3,
            vx: (Math.random()-0.5)*2, vy: -3-Math.random()*2,
            life: 18, maxLife: 18, size: 3, color: '#5d4037' });
    }

    // ── Init ─────────────────────────────────────────
    BG.apples = Array.from({ length: 10 }, () => mkApple(false));
    BG.arrows = [];
    BG.particles = [];
    BG.curves = Array.from({ length: 3 }, () => ({
        offset: Math.random() * canvas.width,
        amplitude: 30 + Math.random() * 40,
        frequency: 0.002 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.7,
    }));

    // ── Draw functions ────────────────────────────────
    function drawBackground() {
        const isDark = document.body.dataset.theme !== 'light';
        if (isDark) {
            const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            g.addColorStop(0, '#2d3748'); g.addColorStop(1, '#4a5568');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            g.addColorStop(0, '#ede0c4'); g.addColorStop(0.28, '#cfddb0');
            g.addColorStop(0.55, '#b8cfe0'); g.addColorStop(0.78, '#d5c4e8');
            g.addColorStop(1, '#e8d4b8');
            ctx.fillStyle = g; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(160,120,60,0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawVineDecor();
        }
    }

    function drawVineDecor() {
        const stem = 'rgba(100,72,40,0.13)', leaf = 'rgba(65,105,48,0.11)';
        ctx.save(); ctx.lineWidth = 2; ctx.strokeStyle = stem; ctx.lineCap = 'round';
        function vineCorner(ox, oy, sx, sy) {
            ctx.beginPath(); ctx.moveTo(ox,oy);
            ctx.bezierCurveTo(ox+sx*40,oy+sy*100,ox+sx*100,oy+sy*40,ox+sx*160,oy+sy*18); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(ox,oy);
            ctx.bezierCurveTo(ox+sx*100,oy+sy*40,ox+sx*40,oy+sy*100,ox+sx*18,oy+sy*160); ctx.stroke();
            ctx.lineWidth=1.2; ctx.strokeStyle='rgba(80,110,50,0.10)';
            ctx.beginPath(); ctx.moveTo(ox+sx*55,oy+sy*55); ctx.quadraticCurveTo(ox+sx*80,oy+sy*35,ox+sx*70,oy+sy*20); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(ox+sx*55,oy+sy*55); ctx.quadraticCurveTo(ox+sx*35,oy+sy*80,ox+sx*20,oy+sy*70); ctx.stroke();
            ctx.fillStyle=leaf;
            [[ox+sx*72,oy+sy*32,-sy*0.6+sx*0.4],[ox+sx*32,oy+sy*72,sx*0.6-sy*0.4],
             [ox+sx*55,oy+sy*55,(sx+sy)*0.3],[ox+sx*100,oy+sy*20,-sy*0.3],[ox+sx*20,oy+sy*100,sx*0.3]]
            .forEach(([lx,ly,ang]) => {
                ctx.save(); ctx.translate(lx,ly); ctx.rotate(ang);
                ctx.beginPath(); ctx.ellipse(0,0,13,6,0,0,Math.PI*2); ctx.fill(); ctx.restore();
            });
            ctx.lineWidth=2; ctx.strokeStyle=stem;
        }
        const W=canvas.width, H=canvas.height;
        vineCorner(0,0,1,1); vineCorner(W,0,-1,1); vineCorner(0,H,1,-1); vineCorner(W,H,-1,-1);
        ctx.fillStyle='rgba(70,105,50,0.07)';
        for (let i=0;i<6;i++) {
            const lx=(i+0.5)*(W/6);
            ctx.save(); ctx.translate(lx,20+Math.sin(lx*0.02)*8); ctx.rotate(Math.sin(lx*0.015)*0.5);
            ctx.beginPath(); ctx.ellipse(0,0,10,5,0,0,Math.PI*2); ctx.fill(); ctx.restore();
            ctx.save(); ctx.translate(lx,H-20+Math.sin(lx*0.02)*8); ctx.rotate(Math.sin(lx*0.015+1)*0.5+Math.PI);
            ctx.beginPath(); ctx.ellipse(0,0,10,5,0,0,Math.PI*2); ctx.fill(); ctx.restore();
        }
        ctx.restore();
    }

    function drawCurves() {
        const isDark = document.body.dataset.theme !== 'light';
        BG.curves.forEach(curve => {
            if (isDark) {
                curve.offset += curve.speed;
                if (curve.offset > canvas.width) curve.offset = -100;
                ctx.strokeStyle = 'rgba(139,92,246,0.15)'; ctx.lineWidth = 2;
                ctx.beginPath();
                for (let x=0;x<canvas.width+100;x+=10) {
                    const xv = x+curve.offset;
                    const yv = canvas.height/2+curve.amplitude*Math.sin(xv*curve.frequency+curve.phase);
                    x===0?ctx.moveTo(xv,yv):ctx.lineTo(xv,yv);
                }
                ctx.stroke();
            } else {
                curve.offset += curve.speed*0.25;
                if (curve.offset > canvas.width*4) curve.offset = 0;
                ctx.strokeStyle = 'rgba(80,115,55,0.09)'; ctx.lineWidth = 1.5;
                ctx.beginPath();
                for (let x=0;x<canvas.width;x+=8) {
                    const yv = canvas.height*(0.25+curve.phase*0.15)
                        +curve.amplitude*1.4*Math.sin(x*curve.frequency*0.8+curve.phase+curve.offset*0.004);
                    x===0?ctx.moveTo(x,yv):ctx.lineTo(x,yv);
                }
                ctx.stroke();
            }
        });
    }

    function paintSun(time, scale, extraRot) {
        const r=45;
        ctx.rotate(extraRot); ctx.scale(scale,scale);
        const glow=ctx.createRadialGradient(0,0,r*0.7,0,0,r*2.2);
        glow.addColorStop(0,'rgba(255,215,0,0.35)'); glow.addColorStop(1,'rgba(255,180,0,0)');
        ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(0,0,r*2.2,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#FFD000'; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='rgba(255,245,150,0.5)'; ctx.beginPath(); ctx.arc(-8,-8,r*0.45,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle='rgba(255,160,0,0.75)'; ctx.lineWidth=3.5; ctx.lineCap='round';
        for (let i=0;i<8;i++) {
            const ang=(i/8)*Math.PI*2+time;
            ctx.beginPath(); ctx.moveTo(Math.cos(ang)*(r+10),Math.sin(ang)*(r+10));
            ctx.lineTo(Math.cos(ang)*(r+28),Math.sin(ang)*(r+28)); ctx.stroke();
        }
    }

    function paintMoon(scale, extraRot) {
        const r=45;
        ctx.rotate(extraRot); ctx.scale(scale,scale);
        ctx.fillStyle='rgba(139,92,246,0.45)'; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#2d3748'; ctx.beginPath(); ctx.arc(15,0,r-5,0,Math.PI*2); ctx.fill();
    }

    function drawSunMoon() {
        const isDark=document.body.dataset.theme!=='light';
        const time=Date.now()*0.0002;
        const trans=BG.themeTransition;
        const cx=100, cy=80;
        if (!trans) {
            ctx.save(); ctx.translate(cx,cy);
            isDark?paintMoon(1,0):paintSun(time,1,0);
            ctx.restore(); return;
        }
        const progress=Math.min(1,(Date.now()-trans.start)/600);
        if (progress>=1) BG.themeTransition=null;
        const towardDark=(trans.from==='light');
        if (progress<0.5) {
            const p=progress/0.5, scale=1-p, rot=p*Math.PI*0.75;
            ctx.save(); ctx.translate(cx,cy);
            towardDark?paintSun(time,scale,rot):paintMoon(scale,-rot);
            ctx.restore();
        } else {
            const p=(progress-0.5)/0.5, scale=p, rot=(1-p)*Math.PI*0.75;
            ctx.save(); ctx.translate(cx,cy);
            towardDark?paintMoon(scale,rot):paintSun(time,scale,-rot);
            ctx.restore();
        }
    }

    function drawApples() {
        const POP_TICKS=5, FADE_TICKS=20;
        const dead=BG.apples.filter(a=>a.dying&&a.dyingTick>POP_TICKS+FADE_TICKS);
        if (dead.length) {
            BG.apples=BG.apples.filter(a=>!(a.dying&&a.dyingTick>POP_TICKS+FADE_TICKS));
            const cap=Math.max(0,13-BG.apples.length);
            const add=Math.min(dead.length*(Math.random()<0.5?2:1),cap,3);
            for (let i=0;i<add;i++) BG.apples.push(mkApple(true));
        }
        BG.apples.forEach(apple => {
            if (apple.dying) {
                apple.dyingTick++;
                if (apple.dyingTick>POP_TICKS) apple.opacity=Math.max(0,1-(apple.dyingTick-POP_TICKS)/FADE_TICKS);
                return;
            }
            apple.x+=apple.vx; apple.y+=apple.vy; apple.rotation+=apple.rotSpeed;
            const h=apple.size/2;
            if (apple.x-h<0)            { apple.vx=Math.abs(apple.vx); apple.x=h; }
            if (apple.x+h>canvas.width)  { apple.vx=-Math.abs(apple.vx); apple.x=canvas.width-h; }
            if (apple.y-h<60)            { apple.vy=Math.abs(apple.vy); apple.y=60+h; }
            if (apple.y+h>canvas.height) { apple.vy=-Math.abs(apple.vy); apple.y=canvas.height-h; }
        });
        const isLightMode=document.body.dataset.theme==='light';
        BG.apples.forEach(apple => {
            if (apple.opacity<=0) return;
            ctx.save(); ctx.translate(apple.x,apple.y); ctx.rotate(apple.rotation);
            if (apple.dying&&apple.dyingTick<=POP_TICKS) {
                const pop=1+(1-apple.dyingTick/POP_TICKS)*0.38;
                const gr=ctx.createRadialGradient(0,0,0,0,0,apple.size*pop*0.75);
                gr.addColorStop(0,'rgba(255,255,220,0.95)'); gr.addColorStop(1,'rgba(255,240,160,0)');
                ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(0,0,apple.size*pop*0.75,0,Math.PI*2); ctx.fill();
                ctx.font=`${Math.round(apple.size*pop)}px Arial`;
                ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('🍎',0,0);
            } else {
                ctx.globalAlpha=apple.opacity;
                if (isLightMode) {
                    const glow=ctx.createRadialGradient(0,0,apple.size*0.2,0,0,apple.size*0.65);
                    glow.addColorStop(0,'rgba(255,120,60,0.38)'); glow.addColorStop(1,'rgba(255,80,30,0)');
                    ctx.fillStyle=glow; ctx.beginPath(); ctx.arc(0,0,apple.size*0.65,0,Math.PI*2); ctx.fill();
                }
                ctx.font=`${apple.size}px Arial`;
                ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('🍎',0,0);
            }
            ctx.restore();
        });
    }

    function drawArrows() {
        BG.arrowCooldown--;
        if (BG.arrowCooldown<=0) {
            BG.arrows.push(mkArrow()); BG.arrows.push(mkArrow());
            if (Math.random()<0.35) BG.arrows.push(mkArrow());
            BG.arrowCooldown=80+Math.floor(Math.random()*80);
            // Single shoot SFX per spawn batch (not per arrow — would be too loud)
            if (shouldPlayBgSounds()) soundManager.arrowShoot();
        }
        const isDark=document.body.dataset.theme!=='light';
        const shaftColor=isDark?'rgba(210,175,90,0.9)':'rgba(130,80,30,0.9)';
        const headColor=isDark?'rgba(200,160,70,1)':'rgba(110,60,20,1)';
        const fletchColor=isDark?'rgba(190,90,90,0.85)':'rgba(160,55,55,0.85)';
        BG.arrows=BG.arrows.filter(a=>!a.done);
        BG.arrows.forEach(arrow => {
            arrow.x+=arrow.vx; arrow.y+=arrow.vy;
            if (arrow.x<-80||arrow.x>canvas.width+80||arrow.y<-80||arrow.y>canvas.height+80) { arrow.done=true; return; }
            BG.apples.forEach(apple => {
                if (apple.dying) return;
                const dx=arrow.x-apple.x, dy=arrow.y-apple.y;
                if (Math.sqrt(dx*dx+dy*dy)<apple.size*0.55) {
                    apple.dying=true; arrow.done=true; spawnBurst(apple.x,apple.y,apple.size);
                    if (shouldPlayBgSounds()) soundManager.arrowHit();
                }
            });
            const ang=Math.atan2(arrow.vy,arrow.vx), len=55;
            const tx=arrow.x-Math.cos(ang)*len, ty=arrow.y-Math.sin(ang)*len;
            ctx.save();
            ctx.strokeStyle=shaftColor; ctx.lineWidth=3; ctx.lineCap='round';
            ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(arrow.x,arrow.y); ctx.stroke();
            ctx.fillStyle=headColor; ctx.save();
            ctx.translate(arrow.x,arrow.y); ctx.rotate(ang);
            ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(-5,5); ctx.lineTo(-5,-5); ctx.closePath(); ctx.fill(); ctx.restore();
            ctx.strokeStyle=fletchColor; ctx.lineWidth=2;
            const px=-Math.sin(ang)*8, py=Math.cos(ang)*8;
            const tail2x=tx+Math.cos(ang)*12, tail2y=ty+Math.sin(ang)*12;
            [[tx+px,ty+py],[tx-px,ty-py]].forEach(([fx,fy]) => {
                ctx.beginPath(); ctx.moveTo(fx,fy); ctx.lineTo(tail2x,tail2y); ctx.stroke();
            });
            ctx.restore();
        });
    }

    function drawParticles() {
        const isDarkTheme=document.body.dataset.theme!=='light';
        BG.particles=BG.particles.filter(p=>p.life>0);
        BG.particles.forEach(p => {
            p.life--;
            const t=p.life/p.maxLife;
            if (p.type==='ring') {
                const r=p.radius+(1-t)*p.radius*3.5;
                ctx.save(); ctx.globalAlpha=t*0.85;
                ctx.strokeStyle=isDarkTheme?'rgba(255,220,50,1)':'rgba(200,120,0,1)';
                ctx.lineWidth=isDarkTheme?2.5:3;
                ctx.beginPath(); ctx.arc(p.x,p.y,r,0,Math.PI*2); ctx.stroke(); ctx.restore();
            } else if (p.type==='ray') {
                const progress=1-t, rayLen=p.maxLen*Math.sqrt(progress);
                ctx.save(); ctx.globalAlpha=t*0.9;
                ctx.strokeStyle=isDarkTheme?'rgba(255,220,50,1)':'rgba(200,110,0,1)';
                ctx.lineWidth=isDarkTheme?2.5:3; ctx.lineCap='round';
                ctx.beginPath(); ctx.moveTo(p.x,p.y);
                ctx.lineTo(p.x+Math.cos(p.angle)*rayLen,p.y+Math.sin(p.angle)*rayLen);
                ctx.stroke(); ctx.restore();
            } else if (p.type==='chunk') {
                p.vx*=0.91; p.vy*=0.91; p.x+=p.vx; p.y+=p.vy;
                ctx.save(); ctx.globalAlpha=t; ctx.fillStyle=p.color;
                ctx.beginPath(); ctx.arc(p.x,p.y,Math.max(1,p.size*t+1),0,Math.PI*2); ctx.fill(); ctx.restore();
            } else if (p.type==='leaf') {
                p.vx*=0.88; p.vy*=0.88; p.vy+=0.12; p.x+=p.vx; p.y+=p.vy; p.rotation+=p.rotSpeed;
                ctx.save(); ctx.globalAlpha=t*0.9; ctx.fillStyle='rgba(56,142,60,0.95)';
                ctx.translate(p.x,p.y); ctx.rotate(p.rotation);
                ctx.beginPath(); ctx.ellipse(0,0,p.size,p.size*0.45,0,0,Math.PI*2); ctx.fill(); ctx.restore();
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

    return () => {
        window.removeEventListener('resize', onResize);
        if (BG.animationId) cancelAnimationFrame(BG.animationId);
    };
}

export function triggerThemeTransition(from) {
    if (_state) _state.themeTransition = { start: Date.now(), from };
}
