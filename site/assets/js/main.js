// Dr. Drew DPT, marketing site interactions

(function () {
  'use strict';

  // ============ NAV SCROLL ============
  const nav = document.getElementById('nav');
  const floatingCta = document.getElementById('floating-cta');

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 24);
    if (floatingCta) floatingCta.classList.toggle('visible', y > window.innerHeight * 0.6);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ============ MOBILE NAV TOGGLE ============
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // ============ REVEAL ON SCROLL ============
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }

  // ============ FAQ ACCORDION ============
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((o) => o.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ============ TRANSFORMATION MODAL ============
  const transformations = [
    {
      name: 'Marcus',
      meta: '12 Weeks · Down 28 lbs · Tech Exec',
      story: 'Marcus came in carrying 15 years of "I lift sometimes" and a quarterly travel schedule. We built a four-day split that survived three continents and a nutrition framework that worked at airport sushi counters. Down 28 pounds, up 40 on his bench, sleeping through the night for the first time in a decade.'
    },
    {
      name: 'Priya',
      meta: '14 Weeks · Down 19 lbs · ER Physician',
      story: 'Twelve-hour shifts, two kids, zero margin. We anchored training to her existing schedule instead of adding to it. Short, hard sessions four days a week, plus a nutrition system that worked on call. 19 pounds down, more energy at hour 11 than she had at hour 1.'
    },
    {
      name: 'Jordan',
      meta: '10 Weeks · +35 lb Bench · College Athlete',
      story: 'Plateaued at 225 for 18 months. We pulled back his volume, fixed his scapular control, and ran a true linear progression. 35 pounds added to his bench in 10 weeks, and his shoulder feels better than it has in two years.'
    },
    {
      name: 'Alyssa',
      meta: '16 Weeks · Down 24 lbs · Consultant',
      story: 'Four weddings, two conferences, one program. Down 24 pounds and held it through holiday season because we built around her real life, not a Pinterest version of it.'
    },
    {
      name: 'Devon',
      meta: '12 Weeks · Back to Court · Former D-I Hooper',
      story: 'Two knee surgeries and a 30-pound creep after he stopped playing. We rebuilt his unilateral strength, fixed his hip rotation, and got him back to pickup ball 12 weeks in. He still texts me when he hits a clean jumper.'
    },
    {
      name: 'Sara',
      meta: '13 Weeks · Down 17 lbs · Founder',
      story: '14-hour days, no time, all stress. We ran a 30-minute strength template and a stress-aware nutrition plan. Down 17 pounds, deadlifting 1.5x bodyweight, and she still hasn\'t missed a workout 13 weeks in.'
    }
  ];

  const modal = document.getElementById('trans-modal');
  const modalName = document.getElementById('trans-modal-name');
  const modalMeta = document.getElementById('trans-modal-meta');
  const modalStory = document.getElementById('trans-modal-story');
  const modalClose = modal ? modal.querySelector('.modal-close') : null;

  document.querySelectorAll('[data-trans]').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-trans'), 10);
      const t = transformations[idx];
      if (!t || !modal) return;
      modalName.textContent = t.name;
      modalMeta.textContent = t.meta;
      modalStory.textContent = t.story;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ============ CONTACT FORM (mailto fallback for Phase 1) ============
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (form._gotcha && form._gotcha.value) return;
      const name = encodeURIComponent(form.name.value.trim());
      const email = encodeURIComponent(form.email.value.trim());
      const message = encodeURIComponent(form.message.value.trim());
      if (!name || !email || !message) {
        if (status) status.textContent = 'Please fill out all fields.';
        return;
      }
      // TODO: Supabase, Phase 2
      // Replace mailto with POST to submit-form Edge Function:
      //   fetch('https://<project>.supabase.co/functions/v1/submit-form', { method: 'POST', body: ... })
      window.location.href = `mailto:hello@drewdpt.com?subject=Site%20message%20from%20${name}&body=From:%20${name}%20(${email})%0A%0A${message}`;
      if (status) status.textContent = 'Opening your email client...';
    });
  }

  // ============ SMOOTH ANCHOR SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
