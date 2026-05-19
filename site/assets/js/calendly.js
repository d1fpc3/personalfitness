// Calendly integration, popup + inline embed

(function () {
  'use strict';

  const CALENDLY_URL = 'https://calendly.com/ruiza1112/fitness-strategy-session';
  const THEME = 'background_color=15171c&text_color=f4f1ec&primary_color=c8a24b';
  const POPUP_URL = `${CALENDLY_URL}?hide_event_type_details=1&${THEME}`;
  const INLINE_URL = `${CALENDLY_URL}?${THEME}`;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function whenCalendlyReady(fn, tries) {
    tries = tries || 0;
    if (typeof window.Calendly !== 'undefined') return fn();
    if (tries > 50) return; // ~5 seconds, give up
    setTimeout(() => whenCalendlyReady(fn, tries + 1), 100);
  }

  function openPopup() {
    if (typeof window.Calendly === 'undefined') {
      whenCalendlyReady(() => window.Calendly.initPopupWidget({ url: POPUP_URL }));
      return;
    }
    window.Calendly.initPopupWidget({ url: POPUP_URL });
  }

  function bindPopupCtas() {
    document.querySelectorAll('[data-calendly-popup]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup();
      });
    });
  }

  function initInlineWidget() {
    const inline = document.querySelector('.calendly-inline-widget');
    if (!inline) return;
    whenCalendlyReady(() => {
      window.Calendly.initInlineWidget({
        url: INLINE_URL,
        parentElement: inline,
        prefill: {},
        utm: {}
      });
    });
  }

  ready(() => {
    bindPopupCtas();
    initInlineWidget();
  });
})();
