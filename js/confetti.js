function triggerConfetti() {
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#facc15','#ef4444','#ffffff'] });
  setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.5, x: 0.3 }, startVelocity: 15 }), 200);
  setTimeout(() => confetti({ particleCount: 100, spread: 100, origin: { y: 0.5, x: 0.7 }, startVelocity: 15 }), 400);
}
