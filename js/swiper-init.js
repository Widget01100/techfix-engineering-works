// Main entry point after DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize services grid
  if (typeof renderServices !== "undefined") {
    renderServices("all");
    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderServices(btn.dataset.category);
      });
    });
  }

  // Theme toggle with localStorage
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme)
    document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.innerHTML =
      newTheme === "dark"
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  menuToggle?.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("active"));
  });

  // Lottie gear animation
  if (typeof lottie !== "undefined") {
    const gearContainer = document.getElementById("lottie-gear");
    if (gearContainer) {
      lottie.loadAnimation({
        container: gearContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://assets10.lottiefiles.com/packages/lf20_puciaact.json",
      });
    }
  }

  // Confetti on form submit (if contact page)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof triggerConfetti === "function") triggerConfetti();
      setTimeout(() => {
        contactForm.submit();
      }, 500);
    });
  }
});

// Custom cursor magnetic effect
document.querySelectorAll(".magnetic").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});
