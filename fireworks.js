const canvas = document.createElement('canvas');
canvas.id = 'fireworks';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const colors = [
  '#FFD700','#FFC200','#FFE066','#FFFACD',
  '#FFFFFF','#FFF8DC','#FFE9A0','#FFECB3'
];

class Particle {
  constructor(x, y, color) {
    this.x = x; this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 3.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = 0.012 + Math.random() * 0.01;
    this.radius = 1.5 + Math.random() * 2;
    this.gravity = 0.06;
    this.trail = [];
  }
  update() {
    this.trail.push({x: this.x, y: this.y, alpha: this.alpha});
    if (this.trail.length > 6) this.trail.shift();
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.98;
    this.alpha -= this.decay;
  }
  draw() {
    for (let t of this.trail) {
      ctx.beginPath();
      ctx.arc(t.x, t.y, this.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = t.alpha * 0.3;
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

class Rocket {
  constructor() {
    this.x = window.innerWidth * (0.2 + Math.random() * 0.6);
    this.y = window.innerHeight;
    this.targetY = window.innerHeight * (0.1 + Math.random() * 0.4);
    this.speed = 6 + Math.random() * 4;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.done = false;
    this.trail = [];
  }
  update() {
    this.trail.push({x: this.x, y: this.y});
    if (this.trail.length > 8) this.trail.shift();
    this.y -= this.speed;
    if (this.y <= this.targetY) this.done = true;
  }
  draw() {
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.beginPath();
      ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = (i / this.trail.length) * 0.6;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }
  explode() {
    const count = 80 + Math.floor(Math.random() * 40);
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(new Particle(this.x, this.y, Math.random() > 0.3 ? this.color : '#FFFFFF'));
    }
    return arr;
  }
}

let particles = [], rockets = [], lastLaunch = 0;
const INTERVAL = 2500;

function loop(ts) {
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (ts - lastLaunch > INTERVAL) {
    rockets.push(new Rocket());
    lastLaunch = ts;
  }

  rockets = rockets.filter(r => {
    r.update(); r.draw();
    if (r.done) { particles.push(...r.explode()); return false; }
    return true;
  });

  particles = particles.filter(p => {
    p.update(); p.draw();
    return p.alpha > 0;
  });

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);