// Initialize AOS if available
if (window.AOS) AOS.init({ once: true, duration: 700 });

// Mobile menu toggle
const btnMobile = document.getElementById('btn-mobile');
const mobileMenu = document.getElementById('mobile-menu');
if (btnMobile && mobileMenu) btnMobile.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// Smooth behavior for anchor links - close mobile menu on navigation
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => { if (mobileMenu && !mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden'); });
});

// Contact form demo
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');
if (form) form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (result) { result.classList.remove('hidden'); form.reset(); setTimeout(() => result.classList.add('hidden'), 4000); }
});

// Year
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// THEME TOGGLE (persist in localStorage)
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const iconSun = document.getElementById('icon-sun');
const iconMoon = document.getElementById('icon-moon');

function applyTheme(dark) {
  const html = document.documentElement;
  if (dark) { html.classList.add('dark'); if(iconSun) iconSun.classList.add('hidden'); if(iconMoon) iconMoon.classList.remove('hidden'); }
  else { html.classList.remove('dark'); if(iconSun) iconSun.classList.remove('hidden'); if(iconMoon) iconMoon.classList.add('hidden'); }
}

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function toggleTheme() { const isDark = document.documentElement.classList.contains('dark'); applyTheme(!isDark); localStorage.setItem('theme', !isDark ? 'dark' : 'light'); }
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
applyTheme(getPreferredTheme());

// Animated name: init and replay
function initAnimatedName(selector = '#animated-name') {
  const el = document.querySelector(selector); if(!el) return null;
  if (el.querySelector('.char')) return el;
  const text = el.textContent.trim(); el.textContent = '';
  const frag = document.createDocumentFragment(); [...text].forEach(ch => { const s = document.createElement('span'); s.className = 'char'; s.textContent = ch === ' ' ? '\u00A0' : ch; frag.appendChild(s); }); el.appendChild(frag); return el;
}
function playNameAnimation(selector = '#animated-name', delay = 60) { const el = document.querySelector(selector); if(!el) return; const chars = el.querySelectorAll('.char'); chars.forEach(c => c.classList.remove('show')); void el.getBoundingClientRect(); chars.forEach((c,i) => setTimeout(() => c.classList.add('show'), i*delay + 100)); }
document.addEventListener('DOMContentLoaded', () => { const el = initAnimatedName(); if (el) { playNameAnimation(); if ('IntersectionObserver' in window) { const obs = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) playNameAnimation(); else el.querySelectorAll('.char').forEach(c => c.classList.remove('show')); }); }, { threshold: 0.2 }); obs.observe(el); } } });

// Stagger reveal for projects grid
document.addEventListener('DOMContentLoaded', () => {
  const grids = Array.from(document.querySelectorAll('.stagger-grid'));
  if (!grids.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('show');
        // set inline delays for children
        const children = Array.from(target.children);
        children.forEach((c, i) => { c.style.transitionDelay = `${(i+1) * 90}ms`; });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  grids.forEach(g => io.observe(g));
});




