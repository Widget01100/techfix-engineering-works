// ============================
// TECHFIX ENGINEERING WORKS
// JavaScript Interactivity
// ============================

document.addEventListener('DOMContentLoaded', function() {
  // ===== Navigation Menu Toggle =====
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('mainNav');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // ===== Navbar Scroll Effect =====
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== Image Carousel in Hero =====
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  let currentSlide = 0;

  function showSlide(n) {
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    if (carouselSlides[n]) {
      carouselSlides[n].classList.add('active');
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
  }

  if (carouselSlides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

  // ===== Smooth Scrolling for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ===== Form Submission =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Validate form
      if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
        showAlert('Please fill in all required fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
      }

      // Here you would normally send the data to a server/email service
      console.log('Form submitted:', data);

      // Show success message
      showAlert('Thank you! We have received your quote request. We will contact you shortly.', 'success');
      this.reset();
    });
  }

  // ===== Alert Function =====
  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 2000;
      animation: slideIn 0.3s ease-out;
      max-width: 400px;
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => alertDiv.remove(), 300);
    }, 4000);
  }

  // ===== Intersection Observer for Animations =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.service-card, .portfolio-item, .info-item, .capability-item').forEach(el => {
    el.style.opacity = '0.8';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ===== Add CSS Animations =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(400px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideOut {
      to {
        opacity: 0;
        transform: translateX(400px);
      }
    }
  `;
  document.head.appendChild(style);

  // ===== Mobile Menu Hamburger Animation =====
  if (hamburger) {
    // The hamburger closing/opening is already handled by the toggle above
  }

  // ===== Service Card Hover Effects =====
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) rotateY(2deg)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateY(0)';
    });
  });

  // ===== Add Loading State to Forms =====
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      form.addEventListener('submit', function(e) {
        if (!this.dataset.submitted) {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.6';
          submitBtn.style.cursor = 'not-allowed';
          this.dataset.submitted = 'true';

          // Re-enable after 2 seconds
          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
            this.dataset.submitted = 'false';
          }, 2000);
        }
      });
    }
  });

  // ===== Lazy Loading Images =====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===== Keyboard Navigation for Menu =====
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });

  // ===== Active Link Highlighting =====
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current && current) {
        link.classList.add('active');
      }
    });
  });

  // ===== Typing Effect for Hero Title (Optional) =====
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let index = 0;

    function type() {
      if (index < text.length) {
        heroTitle.textContent += text.charAt(index);
        index++;
        setTimeout(type, 50);
      }
    }

    // Uncomment to enable typing effect
    // setTimeout(type, 500);
  }

  // ===== Scroll-to-Top Button (Optional) =====
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  `;

  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = 'flex';
      scrollTopBtn.style.opacity = '1';
    } else {
      scrollTopBtn.style.opacity = '0';
      setTimeout(() => {
        scrollTopBtn.style.display = 'none';
      }, 300);
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== Print Logo for Verification =====
  console.log('%cTechFix Engineering Works', 'font-size: 20px; color: #e74c3c; font-weight: bold;');
  console.log('Professional Website - Premium Design');
  console.log('Built for precision and excellence');
});
