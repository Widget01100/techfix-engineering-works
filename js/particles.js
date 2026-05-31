// Particle system following cursor
(function () {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9998";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  let particles = [];
  let mouseX = 0,
    mouseY = 0;
  let frame = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    for (let i = 0; i < 3; i++) {
      particles.push({
        x: mouseX + (Math.random() - 0.5) * 10,
        y: mouseY + (Math.random() - 0.5) * 10,
        size: Math.random() * 4 + 2,
        alpha: 0.8,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        life: 1,
      });
    }
    if (particles.length > 200) particles = particles.slice(-150);
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      p.alpha = p.life * 0.8;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
      gradient.addColorStop(0, `rgba(250, 204, 21, ${p.alpha})`);
      gradient.addColorStop(1, `rgba(239, 68, 68, 0)`);
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
