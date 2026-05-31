gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.split-text').forEach(el => {
  const chars = el.innerText.split('');
  el.innerHTML = chars.map(c => `<span class="split-char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
  gsap.fromTo(el.querySelectorAll('.split-char'),
    { opacity: 0, y: 50, rotateX: -90 },
    { opacity: 1, y: 0, rotateX: 0, stagger: 0.02, duration: 0.8, ease: "back.out(0.6)",
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
    }
  );
});
gsap.from(".service-card", {
  scrollTrigger: { trigger: ".services-grid", start: "top 85%", toggleActions: "play none none reverse" },
  opacity: 0, y: 40, stagger: 0.08, duration: 0.6, ease: "power2.out"
});
gsap.from(".step", {
  scrollTrigger: { trigger: ".process", start: "top 80%", toggleActions: "play none none reverse" },
  opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: "back.out(0.5)"
});
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const target = parseInt(counter.dataset.target);
  ScrollTrigger.create({
    trigger: counter, start: "top 90%", once: true,
    onEnter: () => {
      gsap.to(counter, {
        innerHTML: target, duration: 2, ease: "power2.out", snap: { innerHTML: 1 },
        onUpdate: function() { counter.innerHTML = Math.floor(counter.innerHTML); }
      });
    }
  });
});
