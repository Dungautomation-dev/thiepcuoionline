/**
 * Floating Hearts Canvas Physics & Interactive Particle Burst
 * Author: Dung Automation
 */

(function () {
  const canvas = document.getElementById('hearts-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = [
    'rgba(212, 175, 55, 0.7)',   // Champagne Gold
    'rgba(255, 117, 143, 0.7)',  // Soft Rose
    'rgba(163, 29, 58, 0.65)',   // Ruby Wine
    'rgba(250, 232, 166, 0.75)', // Golden Glow
    'rgba(255, 182, 193, 0.6)'   // Light Pink
  ];

  // Helper function to draw a bezier heart shape
  function drawHeart(ctx, x, y, size, color, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    // Top left curve
    ctx.bezierCurveTo(
      -size / 2, -topCurveHeight,
      -size, size / 3,
      0, size
    );
    // Top right curve
    ctx.bezierCurveTo(
      size, size / 3,
      size / 2, -topCurveHeight,
      0, topCurveHeight
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Floating background hearts
  class FloatingHeart {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // Start at random height initially
    }

    reset() {
      this.size = Math.random() * 14 + 10;
      this.x = Math.random() * width;
      this.y = height + this.size + Math.random() * 50;
      this.speedY = Math.random() * 0.9 + 0.5;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = (Math.random() - 0.5) * 0.4;
      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
      this.swayDistance = Math.random() * 1.5 + 0.5;
    }

    update() {
      this.y -= this.speedY;
      this.swayAngle += this.swaySpeed;
      this.x += Math.sin(this.swayAngle) * this.swayDistance + this.speedX;

      if (this.y < -this.size * 2 || this.x < -this.size || this.x > width + this.size) {
        this.reset();
      }
    }

    draw() {
      drawHeart(ctx, this.x, this.y, this.size, this.color, this.rotation);
    }
  }

  // Burst particle for clicks/taps
  class HeartParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 18 + 8;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 2.5; // slight upward bias
      this.gravity = 0.12;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = 1;
      this.fade = Math.random() * 0.025 + 0.015;
      this.rotation = Math.random() * Math.PI;
      this.rotSpeed = (Math.random() - 0.5) * 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.alpha -= this.fade;
      this.rotation += this.rotSpeed;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      drawHeart(ctx, this.x, this.y, this.size, this.color, this.rotation);
      ctx.restore();
    }
  }

  // Initialize pool of floating hearts
  const heartCount = Math.min(30, Math.floor(width / 35));
  const floatingHearts = Array.from({ length: heartCount }, () => new FloatingHeart());
  let burstParticles = [];

  // Expose global trigger for celebration heart burst
  window.triggerHeartBurst = function (x, y, count = 25) {
    const targetX = x !== undefined ? x : width / 2;
    const targetY = y !== undefined ? y : height / 2;
    for (let i = 0; i < count; i++) {
      burstParticles.push(new HeartParticle(targetX, targetY));
    }
  };

  // Click & tap listener for romantic interactive bursts
  window.addEventListener('click', (e) => {
    // Avoid triggering burst if clicking form inputs or audio controls
    if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(e.target.tagName)) return;
    window.triggerHeartBurst(e.clientX, e.clientY, 12);
  });

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update & draw background floating hearts
    for (let i = 0; i < floatingHearts.length; i++) {
      floatingHearts[i].update();
      floatingHearts[i].draw();
    }

    // Update & draw burst particles
    for (let i = burstParticles.length - 1; i >= 0; i--) {
      const p = burstParticles[i];
      p.update();
      p.draw();
      if (p.alpha <= 0) {
        burstParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
})();
