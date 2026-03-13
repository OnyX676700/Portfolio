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

// ── Barre lingue animate all'entrata ────────
const languageBars = Array.from(document.querySelectorAll('.language-bar'));

if (languageBars.length && 'IntersectionObserver' in window) {
  const barObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // forza il reflow così la transizione parte da 0
        entry.target.style.width = '0%';
        requestAnimationFrame(() => {
          entry.target.style.width = entry.target.style.getPropertyValue('--bar-width') ||
            getComputedStyle(entry.target).getPropertyValue('--bar-width');
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  // azzera subito la width, la CSS var resta come target
  languageBars.forEach(bar => {
    bar.style.width = '0%';
    barObserver.observe(bar);
  });
}