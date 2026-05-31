// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Split text animation for headings
document.querySelectorAll(".split-text").forEach((el) => {
  const text = el.innerText;
  const chars = text.split("");
  el.innerHTML = chars
    .map(
      (char) =>
        `<span class="split-char">${char === " " ? "&nbsp;" : char}</span>`,
    )
    .join("");
  gsap.fromTo(
    el.querySelectorAll(".split-char"),
    { opacity: 0, y: 50, rotateX: -90 },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      stagger: 0.02,
      duration: 0.8,
      ease: "back.out(0.6)",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );
});

// Process SVG line drawing
const processLine = document.querySelector(".process-line");
if (processLine) {
  ScrollTrigger.create({
    trigger: ".process-timeline",
    start: "top 80%",
    onEnter: () => {
      gsap.to(processLine, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    },
    once: true,
  });
}

// Animate process steps on scroll
gsap.from(".process-step", {
  scrollTrigger: {
    trigger: ".process",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 50,
  stagger: 0.1,
  duration: 0.8,
  ease: "back.out(0.5)",
});

// Animate service cards on load with stagger
gsap.from(".service-card", {
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 85%",
    toggleActions: "play none none reverse",
  },
  opacity: 0,
  y: 40,
  stagger: 0.08,
  duration: 0.6,
  ease: "power2.out",
});

// Navbar hide/show on scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }
  lastScroll = currentScroll;
});

// Counter animation with GSAP
const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  const target = parseInt(counter.getAttribute("data-target"));
  ScrollTrigger.create({
    trigger: counter,
    start: "top 90%",
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        onUpdate: function () {
          counter.innerHTML = Math.floor(counter.innerHTML);
        },
      });
    },
  });
});
