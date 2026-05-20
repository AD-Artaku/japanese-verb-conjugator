// =====================
// Character counter
// =====================
const textarea = document.getElementById('contact-msg');
const charCount = document.getElementById('char-count');

if (textarea && charCount) {
  textarea.addEventListener('input', () => {
    const remaining = 400 - textarea.value.length;
    charCount.textContent = `残り${remaining}文字`;
  });
}

// =====================
// Contact form send
// =====================
const sendBtn = document.getElementById('contact-send');
const backdrop = document.getElementById('popup-backdrop');
const closeBtn = document.getElementById('popup-close');

if (sendBtn) {
  sendBtn.addEventListener('click', async () => {
    const message = textarea.value.trim();

    if (!message) return;

    sendBtn.disabled = true;
    sendBtn.textContent = '送信中...';

    try {
      const response = await fetch('/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (data.success) {
        textarea.value = '';
        charCount.textContent = '残り400文字';
        backdrop.classList.add('active');
      } else {
        alert('送信に失敗しました。もう一度お試しください。');
      }

    } catch (err) {
      alert('送信に失敗しました。もう一度お試しください。');
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = '送信';
    }
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

// tapping the invisible overlay closes the menu
if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMenu);
}