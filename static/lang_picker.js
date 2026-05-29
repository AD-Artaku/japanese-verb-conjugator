// =====================
// Language Picker
// Shared by index.html and devlog.html.
// Depends on: translations object (translations.js or translations_devlog.js)
//             being loaded before this script.
// =====================

const LANG_KEY = 'preferred_lang';
const globeSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`;

// Maps browser locale codes to our language keys
const BROWSER_LANG_MAP = {
  'ja':    'ja',
  'en':    'en',
  'zh':    'zh',
  'zh-CN': 'zh',
  'zh-SG': 'zh',
  'ko':    'ko',
  'es':    'es',
  'pt':    'pt',
  'pt-BR': 'pt',
  'pt-PT': 'pt',
  'fr':    'fr',
  'id':    'id',
  'vi':    'vi',
  'hi':    'hi',
  'ne':    'ne',
  'my':    'my',
  'th':    'th',
  'tl':    'tl',
  'ar':    'ar',
};

// Display names shown in the dropdown (native script)
const LANG_OPTIONS = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文（简体）' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ne', label: 'नेपाली' },
  { code: 'my', label: 'မြန်မာဘာသာ' },
  { code: 'th', label: 'ไทย' },
  { code: 'tl', label: 'Tagalog' },
  { code: 'ar', label: 'العربية' },
];

// =====================
// Resolve starting language
// Priority: 1) saved preference  2) browser locale  3) Japanese
// =====================
function resolveStartingLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && LANG_OPTIONS.some(o => o.code === saved)) return saved;

  const browserLang = navigator.language || navigator.userLanguage || '';
  if (BROWSER_LANG_MAP[browserLang]) return BROWSER_LANG_MAP[browserLang];
  const prefix = browserLang.split('-')[0];
  if (BROWSER_LANG_MAP[prefix]) return BROWSER_LANG_MAP[prefix];

  return 'ja';
}

// =====================
// Build and wire up the picker
// applyFn — the page-specific function that actually swaps text
// =====================
function initLangPicker(applyFn) {
  const toggleBtn = document.getElementById('lang-toggle');
  if (!toggleBtn) return;

  const picker = toggleBtn.closest('.lang-picker');
  if (!picker) return;

  // Guard against double-init — if a dropdown already exists, bail out
  if (picker.querySelector('.lang-dropdown')) return;

  const dropdown = document.createElement('ul');
  dropdown.className = 'lang-dropdown';
  dropdown.id = 'lang-dropdown';

  LANG_OPTIONS.forEach(opt => {
    const li = document.createElement('li');
    li.className = 'lang-dropdown-item';
    li.textContent = opt.label;
    li.dataset.lang = opt.code;

    li.addEventListener('mousedown', (e) => {
      e.preventDefault();
      // Save and apply
      localStorage.setItem(LANG_KEY, opt.code);
      applyFn(opt.code);
      // Update button label
      toggleBtn.innerHTML = `${globeSVG}${opt.label}`;
      // Update active state
      dropdown.querySelectorAll('.lang-dropdown-item').forEach(el => {
        el.classList.toggle('active', el.dataset.lang === opt.code);
      });
      // Close dropdown
      dropdown.classList.remove('active');
    });

    dropdown.appendChild(li);
  });

  picker.appendChild(dropdown);

  // =====================
  // Open / close toggle button
  // =====================
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!picker.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdown.classList.remove('active');
    }
  });

  // =====================
  // Init — apply resolved language on page load
  // =====================
  const startLang = resolveStartingLang();
  const startOpt = LANG_OPTIONS.find(o => o.code === startLang);

  applyFn(startLang);

  if (startOpt) {
    toggleBtn.innerHTML = `${globeSVG}${startOpt.label}`;
    dropdown.querySelectorAll('.lang-dropdown-item').forEach(el => {
      el.classList.toggle('active', el.dataset.lang === startLang);
    });
  }
}