// =====================
// Hamburger menu
// =====================
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('nav-mobile-menu');
const mobileOverlay = document.getElementById('nav-mobile-overlay');

function openMenu() {
  mobileMenu.classList.add('active');
  mobileOverlay.classList.add('active');
}

function closeMenu() {
  mobileMenu.classList.remove('active');
  mobileOverlay.classList.remove('active');
}

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMenu);
}

// =====================
// i18n — devlog page
// applyLanguageDevlog swaps all data-i18n text using translations_devlog.js
// initLangPicker (from lang_picker.js) wires up the dropdown
// =====================
function applyLanguageDevlog(lang) {
  const t = translations_devlog[lang];
  const tBase = (typeof translations !== 'undefined') && translations[lang];
  if (!t) return;

  // Use innerHTML so <br> tags inside card body text render correctly
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    } else if (tBase && tBase[key] !== undefined) {
      el.innerHTML = tBase[key];
    }
  });
}
