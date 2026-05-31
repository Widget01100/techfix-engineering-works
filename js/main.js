document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderServices !== 'undefined') renderServices('all');
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderServices(btn.dataset.category);
    });
  });
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  themeToggle?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const nu = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nu);
    localStorage.setItem('theme', nu);
    themeToggle.innerHTML = nu === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  });
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle?.addEventListener('click', () => mobileMenu.classList.toggle('active'));
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('active')));
  window.addEventListener('scroll', () => {
    const st = document.getElementById('scrollTop');
    if (st) st.classList.toggle('visible', window.scrollY > 300);
  });
  document.getElementById('scrollTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
  const lottieContainer = document.getElementById('lottie-gear');
  if (lottieContainer && typeof lottie !== 'undefined') {
    lottie.loadAnimation({ container: lottieContainer, renderer: 'svg', loop: true, autoplay: true, path: 'https://assets10.lottiefiles.com/packages/lf20_puciaact.json' });
  }
  const contactForm = document.getElementById('contactForm');
  if (contactForm && typeof triggerConfetti !== 'undefined') {
    contactForm.addEventListener('submit', (e) => { e.preventDefault(); triggerConfetti(); setTimeout(() => contactForm.submit(), 500); });
  }
});
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) * 0.3;
    const y = (e.clientY - rect.top - rect.height/2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
  });
  el.addEventListener('mouseleave', () => el.style.transform = '');
});
