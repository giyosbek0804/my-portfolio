/* ===== CURSOR GLOW ===== */
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* ===== HEADER SCROLL ===== */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

/* ===== MOBILE MENU ===== */
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

/* ===== TYPEWRITER ===== */
const roles = ['Frontend Developer', 'React Developer', 'Next.js Developer', 'UI Enthusiast'];
let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');
function typewriter() {
  const word = roles[rIdx];
  typedEl.textContent = deleting ? word.slice(0, cIdx--) : word.slice(0, cIdx++);
  let delay = deleting ? 60 : 100;
  if (!deleting && cIdx > word.length) { delay = 1800; deleting = true; }
  else if (deleting && cIdx < 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; cIdx = 0; delay = 400; }
  setTimeout(typewriter, delay);
}
typewriter();

/* ===== PARTICLES ===== */
const particleContainer = document.getElementById('heroParticles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  const size = Math.random() * 3 + 1;
  Object.assign(p.style, {
    position: 'absolute',
    width: size + 'px', height: size + 'px',
    borderRadius: '50%',
    background: Math.random() > .5 ? 'rgba(108,99,255,.5)' : 'rgba(167,139,250,.3)',
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    animation: `floatParticle ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite`,
  });
  particleContainer.appendChild(p);
}
const style = document.createElement('style');
style.textContent = `
@keyframes floatParticle {
  0%,100%{transform:translateY(0) scale(1);opacity:.4;}
  50%{transform:translateY(-30px) scale(1.2);opacity:.8;}
}`;
document.head.appendChild(style);

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll(
  '.about-grid, .skill-category, .project-card, .small-project-card, .contact-card, .timeline-item, .section-title, .section-label, .case-study-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

/* ===== SKILL BAR ANIMATION (triggers when in view) ===== */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.getAttribute('data-width') + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(f => skillObserver.observe(f));

/* ===== SMOOTH ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.header-nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--white)' : '';
  });
});
