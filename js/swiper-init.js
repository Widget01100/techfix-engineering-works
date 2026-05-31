const portfolioSwiper = new Swiper('.portfolio-swiper', {
  slidesPerView: 1, spaceBetween: 30, loop: true, parallax: true, speed: 800,
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
});
new Swiper('.testimonial-swiper', {
  slidesPerView: 1, spaceBetween: 30, loop: true, autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true }
});
const portfolioImages = [
  { img: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500", title: "Precision Lathe Work", desc: "Custom shafts" },
  { img: "https://images.unsplash.com/photo-1581093448799-764b32c94f5c?w=500", title: "Structural Welding", desc: "Heavy fabrication" },
  { img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=500", title: "CNC Machining", desc: "High precision parts" },
  { img: "https://images.unsplash.com/photo-1562184557-4f7309ce8f95?w=500", title: "Crane Repair", desc: "Industrial crane overhaul" }
];
const wrapper = document.getElementById('portfolioSwiperWrapper');
if (wrapper) {
  wrapper.innerHTML = portfolioImages.map(p => `<div class="swiper-slide"><img src="${p.img}" alt="${p.title}"><div style="padding:1rem"><h3>${p.title}</h3><p>${p.desc}</p></div></div>`).join('');
  portfolioSwiper.update();
}
const testimonials = [
  { text: "TechFix delivered precision parts faster than expected. Their engineering team is world class.", name: "James Ndungu", role: "Operations Manager" },
  { text: "The frame straightening and welding repair saved our fleet downtime. Exceptional attention to detail.", name: "Grace Wambui", role: "Fleet Supervisor" },
  { text: "From consulting to delivery, TechFix was professional, on-time, and above industry standard.", name: "Owen Kariuki", role: "Engineering Lead" }
];
const testWrapper = document.getElementById('testimonialWrapper');
if (testWrapper) {
  testWrapper.innerHTML = testimonials.map(t => `<div class="swiper-slide"><div class="glass" style="padding:2rem;text-align:center"><i class="fas fa-quote-left fa-3x" style="color:var(--yellow);opacity:0.5"></i><p>${t.text}</p><h4>${t.name}</h4><p>${t.role}</p></div></div>`).join('');
}
