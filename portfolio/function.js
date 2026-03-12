// ── Anno nel footer ─────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Header: classe "scrolled" allo scroll ───
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Typing effect nell'hero ──────────────────
const typingTarget = document.getElementById('typing-target');
const phrases = [
  "Appassionato di web development e reti.",
  "Studio, costruisco, miglioro.",
  "Trasformo idee in codice funzionante.",
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingTarget.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTarget.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 70;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

if (typingTarget) setTimeout(type, 800);

// ── Reveal on scroll ────────────────────────
const reveals = Array.from(document.querySelectorAll('.reveal'));

if (!('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));
}

// ── ScrollSpy ───────────────────────────────
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks  = Array.from(document.querySelectorAll('nav a[data-nav]'));

if (sections.length && navLinks.length) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => spyObserver.observe(sec));
}

// ── Carousel Progetti ────────────────────────
const track   = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (track && prevBtn && nextBtn) {
  const cards = Array.from(track.children);
  let index = 0;

  function getCardWidth() {
    // larghezza card + gap (24px)
    return cards[0].getBoundingClientRect().width + 24;
  }

  function updateCarousel() {
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === cards.length - 1;
  }

  nextBtn.addEventListener('click', () => {
    if (index < cards.length - 1) { index++; updateCarousel(); }
  });

  prevBtn.addEventListener('click', () => {
    if (index > 0) { index--; updateCarousel(); }
  });

  window.addEventListener('resize', updateCarousel, { passive: true });

  // stato iniziale
  updateCarousel();
}