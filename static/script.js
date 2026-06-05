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
        input.closest('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
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
      input.closest('form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
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
      el.innerHTML = t[key];
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

// =====================
// SEARCH HISTORY
// Stores up to 10 recently searched verbs in localStorage.
// Renders as a dropdown next to the lang picker.
// =====================
const HISTORY_KEY = "search_history";
const HISTORY_MAX = 10;

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
}

function pushHistory(verb) {
  if (!verb) return;
  let history = loadHistory().filter(v => v !== verb); // move to top if exists
  history.unshift(verb);
  history = history.slice(0, HISTORY_MAX);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function initHistoryPicker() {
  const picker    = document.getElementById("history-picker");
  const toggleBtn = document.getElementById("history-toggle");
  if (!picker || !toggleBtn) return;

  // Build dropdown
  const dropdown = document.createElement("ul");
  dropdown.className = "history-dropdown";
  dropdown.id = "history-dropdown";
  picker.appendChild(dropdown);

  function renderDropdown() {
    dropdown.innerHTML = "";
    const history = loadHistory();

    if (history.length === 0) {
      const empty = document.createElement("li");
      empty.className = "history-empty";
      empty.textContent = "No recent searches";
      dropdown.appendChild(empty);
      return;
    }

    history.forEach(verb => {
      const li = document.createElement("li");
      li.className = "history-dropdown-item";
      li.textContent = verb;
      li.addEventListener("mousedown", (e) => {
        e.preventDefault();
        // Fill both inputs and submit the form
        const desktopInput = document.getElementById("desktop-verb-input");
        const mobileInput  = document.getElementById("mobile-verb-input");
        if (desktopInput) desktopInput.value = verb;
        if (mobileInput)  mobileInput.value  = verb;
        dropdown.classList.remove("active");
        desktopInput?.closest("form")?.submit();
      });
      dropdown.appendChild(li);
    });
  }

  // Toggle open/close
  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    renderDropdown();
    dropdown.classList.toggle("active");
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!picker.contains(e.target)) dropdown.classList.remove("active");
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") dropdown.classList.remove("active");
  });

  // Show the picker only if there's history
  function syncVisibility() {
    picker.style.display = loadHistory().length > 0 ? "" : "none";
  }

  syncVisibility();

  // Record a successful search (verb is present in the page means the last
  // POST returned results — read from the populated input value)
  const desktopInput = document.getElementById("desktop-verb-input");
  if (desktopInput?.value) {
    pushHistory(desktopInput.value);
    syncVisibility();
  }
}

// =====================
// AJAX SEARCH
// Intercepts form submit, calls /api/search, rebuilds the cards section
// in-place without a full page reload.
//
// Bugs addressed upfront:
//  1. Translations  — applyLanguage() called after every card inject
//  2. Share button  — re-wired via event delegation on a stable parent
//  3. History       — pushHistory() called on success
//  4. Back button   — popstate listener re-fetches on browser back/forward
//  5. Toggle state  — read from DOM and sent with every request
//  6. Error alert   — shown/hidden in JS, no longer reliant on Jinja class
//  7. Double-submit — button disabled while request is in flight
//  8. Animation     — fadeInUp replays by removing/re-adding the section
// =====================
(function initAjaxSearch() {

  const form           = document.querySelector('form[action="/"]');
  const desktopInput   = document.getElementById('desktop-verb-input');
  const mobileInput    = document.getElementById('mobile-verb-input');
  const togglePolite   = document.getElementById('toggle-polite');
  const toggleNegative = document.getElementById('toggle-negative');
  const searchAlert    = document.getElementById('search-alert');
  const alertText      = searchAlert?.querySelector('.alert-text');
  const main           = document.querySelector('main.main');

  if (!form || !desktopInput) return;

  // ---- CARD HTML BUILDER ------------------------------------------------
  // Mirrors the Jinja card_data loop in index.html.
  // Produces identical HTML so existing CSS applies unchanged.

  const CARD_DATA = [
    { badge:"基本形",   badge_key:"badge_basic",       title:"辞書形",    title_key:"card_dictionary",       pos:"dictionary",        neg:"negative",                   pos_p:"polite_dictionary",        neg_p:"polite_negative_dictionary" },
    { badge:"基本形",   badge_key:"badge_basic",       title:"て形",      title_key:"card_te",               pos:"te",                neg:"negative_te",                pos_p:null,                       neg_p:null },
    { badge:"基本形",   badge_key:"badge_basic",       title:"た形",      title_key:"card_past",             pos:"past",              neg:"negative_past",              pos_p:"polite_past",              neg_p:"polite_negative_past" },
    { badge:"応用活用", badge_key:"badge_applied",     title:"可能形",    title_key:"card_potential",        pos:"potential",         neg:"negative_potential",         pos_p:"polite_potential",         neg_p:"polite_negative_potential" },
    { badge:"応用活用", badge_key:"badge_applied",     title:"受身形",    title_key:"card_passive",          pos:"passive",           neg:"negative_passive",           pos_p:"polite_passive",           neg_p:"polite_negative_passive" },
    { badge:"応用活用", badge_key:"badge_applied",     title:"使役形",    title_key:"card_causative",        pos:"causative",         neg:"negative_causative",         pos_p:"polite_causative",         neg_p:"polite_negative_causative" },
    { badge:"応用活用", badge_key:"badge_applied",     title:"使役受身形", title_key:"card_causative_passive", pos:"causative_passive", neg:"negative_causative_passive", pos_p:"polite_causative_passive", neg_p:"polite_negative_causative_passive" },
    { badge:"意思・命令",badge_key:"badge_volitional",  title:"命令形",    title_key:"card_imperative",       pos:"imperative",        neg:null,                         pos_p:"polite_imperative",        neg_p:null },
    { badge:"意思・命令",badge_key:"badge_volitional",  title:"意向形",    title_key:"card_volitional",       pos:"volitional",        neg:null,                         pos_p:"polite_volitional",        neg_p:null },
    { badge:"条件・仮定",badge_key:"badge_conditional", title:"条件形",    title_key:"card_conditional",      pos:"conditional_ba",    neg:"negative_conditional_ba",    pos_p:null,                       neg_p:null },
    { badge:"条件・仮定",badge_key:"badge_conditional", title:"たら形",    title_key:"card_tara",             pos:"tara",              neg:"negative_tara",              pos_p:null,                       neg_p:null },
  ];

  function cardRow(labelKey, value) {
    if (!value) return '';
    return `
      <div class="card-row">
        <span class="card-row-label" data-i18n="${labelKey}">${labelKey === 'label_positive' ? '肯定' : '否定'}</span>
        <span class="card-row-dash">-</span>
        <span class="card-row-value">${value}</span>
      </div>`;
  }

  function buildCardsHTML(cards, verb, showPolite, showNegative) {
    let gridHTML = '';

    CARD_DATA.forEach(cd => {
      const posPlain  = cards[cd.pos]  || null;
      const negPlain  = cd.neg         ? (cards[cd.neg]  || null) : null;
      const posPolite = cd.pos_p       ? (cards[cd.pos_p] || null) : null;
      const negPolite = cd.neg_p       ? (cards[cd.neg_p] || null) : null;

      let cardInner = '';

      // Plain section
      cardInner += `<div class="card-section">
        <div class="card-section-label" data-i18n="label_plain">普通形：</div>
        <div class="card-rows">
          ${cardRow('label_positive', posPlain || '—')}
          ${showNegative && negPlain ? cardRow('label_negative', negPlain) : ''}
        </div>
      </div>`;

      // Polite section
      if (showPolite && (posPolite || negPolite)) {
        cardInner += `<div class="card-divider"></div>
        <div class="card-section">
          <div class="card-section-label" data-i18n="label_polite">丁寧形：</div>
          <div class="card-rows">
            ${posPolite ? cardRow('label_positive', posPolite) : ''}
            ${showNegative && negPolite ? cardRow('label_negative', negPolite) : ''}
          </div>
        </div>`;
      }

      gridHTML += `
        <div class="card">
          <div class="card-badge" data-i18n="${cd.badge_key}">${cd.badge}</div>
          <div class="card-content">
            <div class="card-title" data-i18n="${cd.title_key}">${cd.title}</div>
            ${cardInner}
          </div>
        </div>`;
    });

    const shareUrl = `/verb/${encodeURIComponent(verb)}`;

    return `
      <div class="cards-share-row">
        <a class="share-btn" href="${shareUrl}" id="share-btn">
          <i class="fa-solid fa-link"></i>
          <span data-i18n="share_btn">共有</span>
        </a>
      </div>
      <div class="cards-grid">${gridHTML}</div>`;
  }

  // ---- INJECT CARDS INTO THE PAGE ---------------------------------------

  function injectCards(cards, verb, showPolite, showNegative) {
    let section = document.querySelector('.cards-section');

    if (!section) {
      section = document.createElement('section');
      section.className = 'cards-section';
      const aboutSection = document.querySelector('.about-section');
      main.insertBefore(section, aboutSection);
    }

    // Bug 8: replay animation by forcing a reflow
    section.style.animation = 'none';
    section.offsetHeight; // reflow
    section.style.animation = '';

    section.innerHTML = buildCardsHTML(cards, verb, showPolite, showNegative);

    // Bug 1: re-apply current language to new data-i18n elements
    const lang = localStorage.getItem(LANG_KEY) || 'ja';
    applyLanguage(lang);

    // Bug 2: re-wire share button (old listener is gone with old DOM)
    initShareBtn();

    // Re-evaluate furigana: disable show-furigana for hiragana-only results.
    window._applyFuriganaState?.();
  }

  function removeCards() {
    document.querySelector('.cards-section')?.remove();
  }

  // ---- ERROR ALERT ------------------------------------------------------

  function showError() {
    searchAlert?.classList.add('active');
  }

  function hideError() {
    searchAlert?.classList.remove('active');
  }

  // ---- CORE SEARCH ------------------------------------------------------

  let currentController = null; // Bug 7: track in-flight request

  async function doSearch(verb, showPolite, showNegative, pushState = true) {
    verb = verb.trim();
    if (!verb) return;

    // Bug 7: cancel any in-flight request
    if (currentController) currentController.abort();
    const controller = new AbortController();
    currentController = controller;

    // Disable submit buttons while loading
    const btns = form.querySelectorAll('[type=submit]');
    btns.forEach(b => { b.disabled = true; });

    hideError();

    try {
      const res = await fetch('/api/search', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ verb, polite: showPolite, negative: showNegative }),
        signal:  controller.signal,
      });

      // Guard against non-JSON responses (e.g. Flask 500 HTML page)
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error(`Unexpected response: ${res.status}`);
      }

      const data = await res.json();

      if (!data.ok) {
        removeCards();
        showError();
      } else {
        injectCards(data.cards, data.verb, showPolite, showNegative);
        hideError();

        // Sync both inputs to the resolved verb
        desktopInput.value = data.verb;
        if (mobileInput) mobileInput.value = data.verb;

        // Bug 3: update search history
        pushHistory(data.verb);
        const historyPickerEl = document.getElementById('history-picker');
        if (historyPickerEl) historyPickerEl.style.display = '';

        // Bug 4: update URL without reload
        if (pushState) {
          history.pushState(
            { verb: data.verb, polite: showPolite, negative: showNegative },
            '',
            `/verb/${encodeURIComponent(data.verb)}`
          );
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        removeCards();
        showError();
      }
    } finally {
      // Bug A: only clear the controller reference if it's still ours.
      // If a newer request has already replaced it, leave it alone.
      if (currentController === controller) currentController = null;
      btns.forEach(b => { b.disabled = false; });
    }
  }

  // ---- FORM INTERCEPT ---------------------------------------------------

  function getToggles() {
    return {
      polite:   togglePolite?.checked  ?? true,
      negative: toggleNegative?.checked ?? true,
    };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Prefer whichever input has a value (desktop vs mobile)
    const verb = desktopInput.value.trim() || mobileInput?.value.trim() || '';
    const { polite, negative } = getToggles();
    doSearch(verb, polite, negative);
  });

  // Also re-search when toggles change (if cards are visible)
  [togglePolite, toggleNegative].forEach(toggle => {
    toggle?.addEventListener('change', () => {
      const verb = desktopInput.value.trim();
      if (verb && document.querySelector('.cards-section')) {
        const { polite, negative } = getToggles();
        doSearch(verb, polite, negative, false); // don't push a new history state
      }
    });
  });

  // Also trigger from suggestion dropdown (it calls form.submit())
  // We already intercept submit above, so this is handled automatically.

  // Bug 4: handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state?.verb) {
      const { verb, polite, negative } = e.state;
      desktopInput.value = verb;
      if (mobileInput) mobileInput.value = verb;
      togglePolite && (togglePolite.checked = polite);
      toggleNegative && (toggleNegative.checked = negative);
      doSearch(verb, polite, negative, false);
    } else {
      // Back to the empty home state
      removeCards();
      desktopInput.value = '';
      if (mobileInput) mobileInput.value = '';
      hideError();
    }
  });

  // If the page loaded with cards already (shared URL / POST result),
  // push an initial history state so back works correctly from here too.
  const preloadedVerb = desktopInput.value.trim();
  if (preloadedVerb) {
    history.replaceState(
      { verb: preloadedVerb, polite: togglePolite?.checked ?? true, negative: toggleNegative?.checked ?? true },
      '',
      location.href
    );
  }

})();

initHistoryPicker();

// =====================
// SHARE BUTTON
// Copies the /verb/<verb> URL to clipboard instead of navigating.
// Exposed as a named function so the AJAX system can re-wire it
// after each card inject (the old DOM node is replaced each time).
// =====================
function initShareBtn() {
  const btn = document.getElementById("share-btn");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const url = new URL(btn.href, location.origin).href;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        const span = btn.querySelector("span");
        const orig = span.textContent;
        span.textContent = "コピー済み ✓";
        btn.classList.add("copied");
        setTimeout(() => {
          span.textContent = orig;
          btn.classList.remove("copied");
        }, 2000);
      });
    } else {
      location.href = url;
    }
  });
}

initShareBtn();

// =====================
// FURIGANA TOGGLE
// Adds/removes .show-furigana on <body>. CSS handles the rest.
// Preference persisted in localStorage.
// =====================
(function initFuriganaToggle() {
  const btn = document.getElementById("furigana-toggle");
  if (!btn) return;

  const FURI_KEY = "furigana_on";

  function currentPref() {
    return localStorage.getItem(FURI_KEY) === "1";
  }

  function hasKanji() {
    return !!document.querySelector(".cards-section .kw");
  }

  function applyFuriganaState() {
    const on = currentPref();
    // Button active always mirrors saved preference.
    // show-furigana is only applied if pref is on AND cards have kanji —
    // hiragana-only verbs have no .kw spans so toggling would just add gaps.
    btn.classList.toggle("active", on);
    document.body.classList.toggle("show-furigana", on && hasKanji());
  }

  // Exposed so injectCards can re-evaluate after each search.
  window._applyFuriganaState = applyFuriganaState;

  // Restore on page load (handles server-rendered cards too).
  applyFuriganaState();

  btn.addEventListener("click", () => {
    localStorage.setItem(FURI_KEY, currentPref() ? "0" : "1");
    applyFuriganaState();
  });
})();