// Eidetic Labs — small site-level scripts.
// Theme toggle persists to localStorage. Install snippet copy-to-clipboard.

(() => {
  const root = document.documentElement;
  const STORAGE_KEY = 'eidetic-theme';

  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem(STORAGE_KEY, next); } catch (_) { /* ignore */ }
    });
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy') || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (_) { /* ignore */ }
        document.body.removeChild(ta);
      }
      btn.classList.add('is-copied');
      setTimeout(() => btn.classList.remove('is-copied'), 1400);
    });
  });
})();
