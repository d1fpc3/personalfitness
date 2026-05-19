// Calendly integration, popup + inline embed

(function () {
  'use strict';

  const CALENDLY_URL = 'https://calendly.com/ruiza1112/fitness-strategy-session';
  const CALENDLY_THEME = {
    backgroundColor: '15171c',
    textColor: 'f4f1ec',
    primaryColor: 'c8a24b'
  };

  function openPopup() {
    if (typeof window.Calendly === 'undefined') {
      // Calendly script hasn't loaded yet, open in new tab as fallback
      window.open(CALENDLY_URL, '_blank', 'noopener');
      return;
    }
    window.Calendly.initPopupWidget({
      url: `${CALENDLY_URL}?hide_event_type_details=1&background_color=${CALENDLY_THEME.backgroundColor}&text_color=${CALENDLY_THEME.textColor}&primary_color=${CALENDLY_THEME.primaryColor}`
    });
  }

  // Bind every CTA marked with data-calendly-popup
  document.querySelectorAll('[data-calendly-popup]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPopup();
    });
  });

  // Inline widget initialization happens automatically via Calendly's widget.js
  // because the .calendly-inline-widget element has data-url attribute set.
})();
