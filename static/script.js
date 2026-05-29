// =====================
// Character counter
// =====================
const textarea = document.getElementById('contact-msg');
const charCount = document.getElementById('char-count');

if (textarea && charCount) {
  textarea.addEventListener('input', () => {
    const remaining = 400 - textarea.value.length;
    const lang = localStorage.getItem(LANG_KEY) || 'ja';
    charCount.textContent = lang === 'ja'
      ? `残り${remaining}文字`
      : `${remaining} characters remaining`;
  });
}

// =====================
// Contact form send
// =====================
const sendBtn = document.getElementById('contact-send');
const backdrop = document.getElementById('popup-backdrop');
const closeBtn = document.getElementById('popup-close');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const message = textarea.value.trim();

    if (!message) return;

    sendBtn.disabled = true;
    sendBtn.textContent = '送信中...';

    emailjs.send("service_l9kxnvm", "template_nskztz7", {
      message: message,
      from_name: "訪問者"
    })
    .then(() => {
      textarea.value = '';
      charCount.textContent = '残り400文字';
      backdrop.classList.add('active');
      sendBtn.disabled = false;
      sendBtn.textContent = '送信';
    })
    .catch(() => {
      alert('送信に失敗しました。もう一度お試しください。');
      sendBtn.disabled = false;
      sendBtn.textContent = '送信';
    });
  });
}

// =====================
// Close confirmation popup
// =====================
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    backdrop.classList.remove('active');
  });
}

if (backdrop) {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      backdrop.classList.remove('active');
    }
  });
}

// =====================
// Close error alert
// =====================
const alertClose = document.getElementById('alert-close');
const searchAlert = document.getElementById('search-alert');

if (alertClose && searchAlert) {
  alertClose.addEventListener('click', () => {
    searchAlert.classList.remove('active');
  });
}

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
// Verb suggestion dropdown
// =====================

const VALID_VERB_ENDINGS = ['う','く','ぐ','す','つ','ぬ','ぶ','む','る'];

function isAllHiragana(str) {
  return [...str].every(ch => {
    const cp = ch.codePointAt(0);
    return (cp >= 0x3040 && cp <= 0x309F) || ch === 'ー';
  });
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function setupSuggestDropdown(input) {
  if (!input) return;

  const dropdown = document.createElement('ul');
  dropdown.className = 'suggest-dropdown';
  document.body.appendChild(dropdown);

  let activeIndex = -1;
  let isComposing = false;

  function positionDropdown() {
    const isMobile = window.matchMedia('(max-width: 600px)').matches;

    const anchor = isMobile
      ? input.closest('.search-pill-row')
      : input.closest('.search-input-wrapper') || input;

    const rect = anchor.getBoundingClientRect();

    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.left + window.scrollX}px`;
    dropdown.style.width = `${rect.width}px`;
  }

  function showDropdown(items) {
    dropdown.innerHTML = '';
    activeIndex = -1;

    if (items.length === 0) {
      dropdown.classList.remove('active');
      return;
    }

    items.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'suggest-item';
      li.textContent = item.kanji;
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        input.value = item.kanji;
        hideDropdown();
        input.closest('form').submit();
      });
      dropdown.appendChild(li);
    });

    positionDropdown();
    dropdown.classList.add('active');
  }

  function hideDropdown() {
    dropdown.classList.remove('active');
    activeIndex = -1;
  }

  function setActive(index) {
    const items = dropdown.querySelectorAll('.suggest-item');
    items.forEach(el => el.classList.remove('active'));
    if (index >= 0 && index < items.length) {
      items[index].classList.add('active');
      activeIndex = index;
    }
  }

  window.addEventListener('scroll', () => {
    if (dropdown.classList.contains('active')) positionDropdown();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (dropdown.classList.contains('active')) positionDropdown();
  });

  input.addEventListener('compositionstart', () => {
    isComposing = true;
  });

  input.addEventListener('compositionend', () => {
    isComposing = false;
    fetchSuggestions(input.value.trim());
  });

  input.addEventListener('keydown', (e) => {
    if (isComposing) return;

    const items = dropdown.querySelectorAll('.suggest-item');
    if (!dropdown.classList.contains('active') || items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIndex + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIndex - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      input.value = items[activeIndex].textContent;
      hideDropdown();
      input.closest('form').submit();
    } else if (e.key === 'Escape') {
      hideDropdown();
    }
  });

  input.addEventListener('blur', () => {
    setTimeout(hideDropdown, 150);
  });

  const fetchSuggestions = debounce(async (query) => {
    if (!query || !isAllHiragana(query) || isComposing) {
      hideDropdown();
      return;
    }

    try {
      const res = await fetch(`/suggest?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      const filtered = data.filter(item =>
        VALID_VERB_ENDINGS.some(ending => item.reading.endsWith(ending)) &&
        VALID_VERB_ENDINGS.some(ending => item.kanji.endsWith(ending))
      );

      showDropdown(filtered);
    } catch (err) {
      hideDropdown();
    }
  }, 200);

  input.addEventListener('input', () => {
    if (isComposing) return;
    fetchSuggestions(input.value.trim());
  });
}

setupSuggestDropdown(document.getElementById('desktop-verb-input'));
setupSuggestDropdown(document.getElementById('mobile-verb-input'));

// =====================
// Update toast
// =====================
const TOAST_VERSION = "1.1.0";
const TOAST_KEY = "toast_dismissed_version";

const toast = document.getElementById("update-toast");
const toastClose = document.getElementById("toast-close");
const toastDesc = document.getElementById("toast-desc");

if (toast) {
  if (localStorage.getItem(TOAST_KEY) === TOAST_VERSION) {
    toast.classList.add("hidden");
  }

  if (toastDesc && window.matchMedia("(max-width: 600px)").matches) {
    toastDesc.textContent = "世界中の日本語学習者に向けて、多言語サポート機能を追加しました。";
  }

  const footer = document.querySelector(".footer");

  function repositionToast() {
    if (toast.classList.contains("hidden")) return;
    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const footerVisible = footerRect.top < viewportHeight;

    if (footerVisible) {
      const overlap = viewportHeight - footerRect.top;
      toast.style.bottom = (overlap + 24) + "px";
    } else {
      toast.style.bottom = "24px";
    }
  }

  window.addEventListener("scroll", repositionToast, { passive: true });
  window.addEventListener("resize", repositionToast);
  repositionToast();

  if (toastClose) {
    toastClose.addEventListener("click", () => {
      toast.classList.add("hidden");
      localStorage.setItem(TOAST_KEY, TOAST_VERSION);
    });
  }
}

// =====================
// i18n — homepage
// applyLanguage swaps all data-i18n text using translations.js
// initLangPicker (from lang_picker.js) wires up the dropdown
// =====================
function applyLanguage(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      const icons = el.querySelectorAll('i');
      el.innerHTML = t[key];
      icons.forEach(icon => el.appendChild(icon));
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.setAttribute('placeholder', t[key]);
    }
  });
}

// Wire up the picker — lang_picker.js must be loaded before this file
initLangPicker(applyLanguage);