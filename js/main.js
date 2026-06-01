/* =============================================
   STACKLY HOME — MAIN JAVASCRIPT
   Premium Animations + GSAP-Style Text Effects
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =============================================
     PAGE LOADER
     ============================================= */
  const loader = document.getElementById('page-loader');
  let heroTriggered = false;
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (!heroTriggered) { heroTriggered = true; loader.classList.add('loaded'); triggerHeroEntrance(); }
      }, 1100);
    });
    setTimeout(() => {
      if (!heroTriggered) { heroTriggered = true; loader?.classList.add('loaded'); triggerHeroEntrance(); }
    }, 2200);
  } else {
    heroTriggered = true;
    triggerHeroEntrance();
  }

  /* =============================================
     HERO ENTRANCE ANIMATION
     ============================================= */
  function triggerHeroEntrance() {
    const heroContent = document.querySelector('.ace-hero-content');
    const heroImg     = document.querySelector('.ace-hero-img-wrap');
    const heroStats   = document.querySelector('.ace-hero-stats');

    if (heroContent) heroContent.style.animation = 'heroSlideIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards';
    if (heroImg)     heroImg.style.animation     = 'heroImgIn 1.1s 0.3s cubic-bezier(0.16,1,0.3,1) both';
    if (heroStats)   heroStats.style.animation   = 'heroStatsIn 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) both';

    /* ---- GSAP-inspired text animation for hero headline ---- */
    /* ---- GSAP-inspired text animation for hero headline ---- */
    setTimeout(() => {
      const h1Line = document.querySelector('.ace-hero-h1 .ace-hero-h1-line');
      if (h1Line) runTextReveal(h1Line, 0);

      const h1Grad = document.querySelector('.ace-hero-h1 .ace-hero-h1-gradient');
      if (h1Grad) {
        h1Grad.style.opacity = '0';
        h1Grad.style.animation = 'heroFadeInUp 1s 0.6s cubic-bezier(0.16,1,0.3,1) forwards';
      }

      /* Scramble the hero badge text */
      const badge = document.querySelector('.ace-hero-badge');
      if (badge) {
        const originalHtml = badge.innerHTML;
        // Don't scramble the badge if it has an svg inside, or just skip scramble to avoid breaking it.
      }

      /* Typewriter on sub-paragraph */
      const sub = document.querySelector('.ace-hero-sub');
      if (sub) {
        const text = sub.textContent;
        sub.textContent = '';
        sub.style.opacity = '1';
        typewriterEffect(sub, text, 18);
      }
    }, 800);
  }

  const heroStyles = document.createElement('style');
  heroStyles.textContent = `
    @keyframes heroFadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes heroSlideIn { from { opacity:0; transform:translateY(36px); } to { opacity:1; transform:translateY(0); } }
    @keyframes heroImgIn   { from { opacity:0; transform:translateX(60px) scale(0.95); } to { opacity:1; transform:none; } }
    @keyframes heroStatsIn { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
    @keyframes fadeInCard { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:none; } }
    /* text char reveal */
    .sh-char { display:inline-block; opacity:0; transform:translateY(1.1em) rotateX(-90deg); transform-origin:top center;
               animation:charIn 0.55s cubic-bezier(0.16,1,0.3,1) forwards; will-change:transform,opacity; }
    @keyframes charIn { to { opacity:1; transform:translateY(0) rotateX(0deg); } }
    /* word wave */
    .sh-word { display:inline-block; opacity:0; transform:translateY(28px);
               animation:wordIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards; will-change:transform,opacity; }
    @keyframes wordIn { to { opacity:1; transform:none; } }
    /* scramble flash */
    .sh-scramble { display:inline-block; }
    /* section heading split */
    .sh-heading-wrap { overflow:hidden; }
    .sh-heading-inner { display:inline-block; transform:translateY(110%); opacity:0;
                        transition: transform 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.55s ease; }
    .sh-heading-inner.in-view { transform:translateY(0); opacity:1; }
    /* Typewriter cursor */
    .sh-cursor { display:inline-block; width:2px; height:1em; background:var(--primary); margin-left:2px;
                 vertical-align:text-bottom; animation:blinkCursor 0.75s step-end infinite; }
    @keyframes blinkCursor { 0%,100%{opacity:1} 50%{opacity:0} }
    /* btn ripple */
    .btn { position:relative; overflow:hidden; }
    .btn::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,0.2); border-radius:inherit; transform:scale(0); opacity:0; transition:transform 0.5s ease,opacity 0.5s ease; }
    .btn:active::after { transform:scale(2.5); opacity:0; transition:none; }
    .feature-item:hover .feature-icon { animation: iconBounce 0.5s cubic-bezier(0.36,0.07,0.19,0.97) both; }
    @keyframes iconBounce { 0%{transform:scale(1) rotate(0deg);} 40%{transform:scale(1.15) rotate(8deg);} 80%{transform:scale(1.07) rotate(-4deg);} 100%{transform:scale(1.1) rotate(5deg);} }
    /* form validation */
    .form-control.error { border-color:#ef4444 !important; box-shadow:0 0 0 3px rgba(239,68,68,0.12) !important; }
    .form-control.valid { border-color:#22c55e !important; }
    .field-error { font-size:0.78rem; color:#ef4444; margin-top:0.25rem; display:flex; align-items:center; gap:0.3rem; }
    .field-error::before { content:'⚠'; font-size:0.7rem; }
    /* char count */
    .char-count { font-size:0.72rem; color:var(--gray-500); text-align:right; margin-top:0.2rem; }
    .char-count.limit { color:#ef4444; }
  `;
  document.head.appendChild(heroStyles);

  /* =============================================
     TEXT ANIMATION ENGINE
     ============================================= */

  /** 1 — Character-split reveal (GSAP SplitText style) */
  function runTextReveal(el, delayMs = 0) {
    if (!el || el.dataset.shAnimated) return;
    el.dataset.shAnimated = '1';

    const text = el.textContent;
    el.innerHTML = '';
    el.style.perspective = '600px';

    [...text].forEach((char, i) => {
      if (char === ' ') {
        el.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.className = 'sh-char';
        span.textContent = char;
        span.style.animationDelay = `${delayMs + i * 28}ms`;
        el.appendChild(span);
      }
    });
  }

  /** 2 — Word-wave reveal */
  function runWordWave(el, delayMs = 0) {
    if (!el || el.dataset.shAnimated) return;
    el.dataset.shAnimated = '1';

    const words = el.textContent.split(' ').filter(w => w);
    el.innerHTML = '';

    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'sh-word';
      span.textContent = word;
      span.style.animationDelay = `${delayMs + i * 80}ms`;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  }

  /** 3 — Typewriter effect */
  function typewriterEffect(el, text, speedMs = 22, onDone) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'sh-cursor';
    el.appendChild(cursor);

    const interval = setInterval(() => {
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => cursor.remove(), 1200);
        if (onDone) onDone();
      }
    }, speedMs);
  }

  /** 4 — Text scramble (GSAP TextPlugin style) */
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  function textScramble(el, finalText, duration = 900) {
    if (!el) return;
    const totalFrames = Math.round(duration / 40);
    let frame = 0;

    const run = () => {
      frame++;
      const progress = frame / totalFrames;
      const resolved = Math.floor(progress * finalText.length);

      el.textContent = finalText
        .split('')
        .map((char, i) => {
          if (i < resolved) return char;
          if (char === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      if (frame < totalFrames) requestAnimationFrame(run);
      else el.textContent = finalText;
    };
    requestAnimationFrame(run);
  }

  /** 5 — Slide-up heading (used for section h2 elements) */
  function wrapHeadingSlide(el, delay = 0) {
    if (!el || el.dataset.shAnimated) return;
    el.dataset.shAnimated = '1';

    const text = el.innerHTML;
    el.innerHTML = `<div class="sh-heading-wrap"><span class="sh-heading-inner" style="transition-delay:${delay}ms">${text}</span></div>`;
  }

  /* =============================================
     SCROLL ANIMATION ENGINE (data-anim + text)
     ============================================= */
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('in-view');

        /* Trigger heading inner slides */
        el.querySelectorAll('.sh-heading-inner').forEach(inner => inner.classList.add('in-view'));

        /* Run word-wave on section h2 headings on scroll */
        if (el.matches('[data-text="wave"]')) runWordWave(el);
        if (el.matches('[data-text="scramble"]')) textScramble(el, el.textContent.trim());
        if (el.matches('[data-text="char"]')) runTextReveal(el);

        animObserver.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-anim]').forEach(el => animObserver.observe(el));

  /* Auto-wrap section headings for slide-up */
  const sectionHeadingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const inner = entry.target.querySelector('.sh-heading-inner');
        if (inner) inner.classList.add('in-view');
        sectionHeadingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section-title h2, .section-header h2, .facts-section h2, .cta-content h2, .offer-content h2, .about-text h2, .why-us-steps h2').forEach(h2 => {
    if (!h2.dataset.shAnimated) {
      wrapHeadingSlide(h2, 0);
      sectionHeadingObserver.observe(h2.closest('.section-title, .section-header, .facts-section, .cta-section, .offer-section, .about-text, .why-us-steps') || h2);
    }
  });

  /* Word-wave on section paragraphs on scroll */
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const p = entry.target;
        if (!p.dataset.shAnimated) runWordWave(p, 100);
        textObserver.unobserve(p);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.section-title > p, .facts-section > p, .cta-content > p').forEach(p => {
    textObserver.observe(p);
  });

  /* Legacy reveal */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* Scramble on fact numbers when visible */
  const factTitleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const labels = entry.target.querySelectorAll('.fact-label');
        labels.forEach((lbl, i) => setTimeout(() => textScramble(lbl, lbl.textContent.trim(), 700), i * 150));
        factTitleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  const factsSection = document.querySelector('.facts-section');
  if (factsSection) factTitleObserver.observe(factsSection);

  /* =============================================
     COUNTER ANIMATION
     ============================================= */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.fact-number[data-target]').forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800, frameRate = 16, totalFrames = duration / frameRate;
    let frame = 0;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const timer = setInterval(() => {
      frame++;
      const progress = easeOut(frame / totalFrames);
      const current = Math.round(progress * target);
      el.textContent = current + suffix;
      if (frame >= totalFrames) { el.textContent = target + suffix; clearInterval(timer); }
    }, frameRate);
  }

  /* =============================================
     NAVBAR SCROLL EFFECT
     ============================================= */
  const navbar = document.querySelector('.navbar');
  const heroEl = document.querySelector('.ace-hero');
  const getNavThreshold = () => heroEl ? heroEl.offsetHeight * 0.6 : window.innerHeight * 0.6;

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > getNavThreshold()) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* =============================================
     MOBILE MENU
     ============================================= */
  const navToggle     = document.querySelector('.nav-toggle');
  const mobileMenu    = document.querySelector('.mobile-menu');
  const mobileClose   = document.querySelector('.mobile-menu-close');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileMenu) mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMobileMenu(); });

  function closeMobileMenu() {
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.mobile-nav-links a').forEach(link => link.addEventListener('click', closeMobileMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });

  /* =============================================
     ACTIVE NAV LINK
     ============================================= */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .mobile-nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* =============================================
     FAQ ACCORDION
     ============================================= */
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item  = question.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* =============================================
     PRODUCT FILTER TABS
     ============================================= */
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      document.querySelectorAll('.car-card[data-type]').forEach(card => {
        const show = filter === 'all' || card.getAttribute('data-type') === filter;
        card.style.display = show ? '' : 'none';
        if (show) card.style.animation = 'fadeInCard 0.4s ease both';
      });
    });
  });

  /* =============================================
     PRODUCT CARD HOVER TILT EFFECT
     ============================================= */
  document.querySelectorAll('.car-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const rotX = ((y - rect.height / 2) / rect.height) * 4;
      const rotY = ((x - rect.width  / 2) / rect.width)  * 4;
      card.style.transform   = `translateY(-6px) rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
      card.style.boxShadow   = `${-rotY * 2}px ${rotX * 2 + 12}px 40px rgba(201,169,110,0.2)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform   = '';
      card.style.boxShadow   = '';
      card.style.transition  = 'transform 0.4s ease, box-shadow 0.4s ease';
    });
  });

  /* =============================================
     GALLERY THUMBNAIL SWITCHER (Details page)
     ============================================= */
  const thumbs  = document.querySelectorAll('.thumb');
  const mainImg = document.getElementById('main-img-el');
  if (thumbs.length && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const src = thumb.querySelector('img').src;
        mainImg.style.opacity = '0';
        mainImg.style.transform = 'scale(0.97)';
        mainImg.style.transition = 'all 0.3s ease';
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 200);
      });
      thumb.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); thumb.click(); } });
    });
  }

  /* =============================================
     PRODUCT DETAILS TABS
     ============================================= */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(panel)?.classList.add('active');
    });
  });

  /* =============================================
     QUANTITY CONTROLS
     ============================================= */
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isPlus = btn.classList.contains('qty-plus');
      const valEl  = btn.closest('.qty-ctrl')?.querySelector('.qty-val');
      if (!valEl) return;
      let val = parseInt(valEl.textContent) || 1;
      if (isPlus) val = Math.min(val + 1, 99);
      else val = Math.max(val - 1, 1);
      valEl.textContent = val;
    });
  });

  /* =============================================
     COLOR OPTIONS (Details page)
     ============================================= */
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      dot.closest('.color-dots')?.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    });
  });

  /* =============================================
     SORT FUNCTIONALITY (Products page)
     ============================================= */
  const sortSelect = document.getElementById('sort-cars');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      const grid = document.getElementById('vehicles-grid');
      if (!grid) return;
      const cards = Array.from(grid.querySelectorAll('.car-card:not([style*="display: none"])'));
      cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price || 0);
        const priceB = parseInt(b.dataset.price || 0);
        if (this.value === 'price-asc')  return priceA - priceB;
        if (this.value === 'price-desc') return priceB - priceA;
        return 0;
      });
      cards.forEach(card => grid.appendChild(card));
    });
  }

  /* =============================================
     WISHLIST BUTTON TOGGLE
     ============================================= */
  document.querySelectorAll('.card-wishlist').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const isActive = btn.classList.contains('active');
      btn.style.background   = isActive ? 'rgba(239,68,68,0.2)' : '';
      btn.style.borderColor  = isActive ? 'rgba(239,68,68,0.5)' : '';
      btn.style.color        = isActive ? '#ef4444' : '';
      showToast(isActive ? '❤️ Added to wishlist!' : 'Removed from wishlist', isActive ? 'success' : 'info');
    });
  });

  /* =============================================
     ADD TO CART
     ============================================= */
  document.querySelectorAll('#add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.textContent;
      btn.textContent = '✓ Added to Cart!';
      btn.style.background  = '#22c55e';
      btn.style.boxShadow   = '0 8px 30px rgba(34,197,94,0.35)';
      setTimeout(() => { btn.textContent = originalText; btn.style.background = ''; btn.style.boxShadow = ''; }, 2500);
      showToast('Item added to your cart! 🛒', 'success');
      const badge = document.querySelector('.cart-badge');
      if (badge) badge.textContent = parseInt(badge.textContent || 0) + 1;
    });
  });

  /* =============================================
     CONTACT FORM — Full Validation
     ============================================= */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {

    /* Helpers */
    const showFieldError = (input, msg) => {
      clearFieldError(input);
      input.classList.add('error');
      input.classList.remove('valid');
      const err = document.createElement('div');
      err.className = 'field-error';
      err.textContent = msg;
      input.parentElement.appendChild(err);
    };
    const clearFieldError = (input) => {
      const err = input.parentElement.querySelector('.field-error');
      if (err) err.remove();
      input.classList.remove('error');
    };
    const markValid = (input) => {
      clearFieldError(input);
      input.classList.add('valid');
      input.classList.remove('error');
    };

    const validators = {
      'contact-name'    : v => v.trim().length >= 2  ? '' : 'Name must be at least 2 characters.',
      'contact-email'   : v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
      'contact-phone'   : v => v.trim() === '' || /^[\d\s\+\-\(\)]{7,15}$/.test(v.trim()) ? '' : 'Enter a valid phone number.',
      'contact-subject' : v => v && v !== '' ? '' : 'Please select a subject.',
      'contact-message' : v => v.trim().length >= 15 ? '' : 'Message must be at least 15 characters.',
    };

    /* Live validation */
    Object.keys(validators).forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      const validate = () => {
        const error = validators[id](input.value);
        if (error) showFieldError(input, error);
        else markValid(input);
      };
      input.addEventListener('blur', validate);
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validate();
        else if (input.value.trim()) markValid(input);
      });
    });

    /* Character count on message */
    const msgArea = document.getElementById('contact-message');
    if (msgArea) {
      const counter = document.createElement('div');
      counter.className = 'char-count';
      counter.textContent = '0 / 500';
      msgArea.parentElement.appendChild(counter);
      msgArea.addEventListener('input', () => {
        const len = msgArea.value.length;
        counter.textContent = `${len} / 500`;
        counter.classList.toggle('limit', len > 450);
        if (len > 500) msgArea.value = msgArea.value.slice(0, 500);
      });
    }

    /* Submit */
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let allValid = true;

      Object.keys(validators).forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        const error = validators[id](input.value);
        if (error) { showFieldError(input, error); allValid = false; }
        else markValid(input);
      });

      if (!allValid) {
        showToast('Please fix the highlighted fields before submitting.', 'error');
        const firstError = contactForm.querySelector('.form-control.error');
        if (firstError) firstError.focus();
        return;
      }

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none" stroke-width="2.5" style="animation:spin 0.8s linear infinite"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Sending…';
      btn.disabled = true;

      const styleEl = document.createElement('style');
      styleEl.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
      document.head.appendChild(styleEl);

      setTimeout(() => {
        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = '#22c55e';
        setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; btn.disabled = false; styleEl.remove(); }, 3500);
        showToast("Your message has been sent! We'll get back to you within 24 hours.", 'success');
        contactForm.reset();
        contactForm.querySelectorAll('.form-control').forEach(f => { f.classList.remove('valid', 'error'); });
        contactForm.querySelectorAll('.field-error').forEach(e => e.remove());
        if (msgArea) { const counter = msgArea.parentElement.querySelector('.char-count'); if (counter) counter.textContent = '0 / 500'; }
      }, 1800);
    });
  }

  /* =============================================
     NEWSLETTER CTA
     ============================================= */
  document.querySelectorAll('.cta-search').forEach(form => {
    const btn   = form.querySelector('button');
    const input = form.querySelector('input');
    if (btn && input) {
      const validateEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
      btn.addEventListener('click', () => {
        if (!input.value.trim()) {
          input.style.borderColor = '#ef4444';
          input.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.12)';
          showToast('Please enter your email address.', 'warning');
          input.focus();
        } else if (!validateEmail(input.value)) {
          input.style.borderColor = '#ef4444';
          input.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.12)';
          showToast('Please enter a valid email address.', 'warning');
          input.focus();
        } else {
          input.style.borderColor = '';
          input.style.boxShadow   = '';
          showToast(`🏡 Subscribed! Design tips coming to ${input.value}`, 'success');
          input.value = '';
        }
      });
      input.addEventListener('input', () => { input.style.borderColor = ''; input.style.boxShadow = ''; });
      input.addEventListener('keydown', e => { if (e.key === 'Enter') btn.click(); });
    }
  });

  /* =============================================
     QUICK FINDER FORM
     ============================================= */
  const qbForm = document.getElementById('qb-form');
  if (qbForm) {
    qbForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Searching our catalog for matching items…', 'info');
      setTimeout(() => { window.location.href = 'products.html'; }, 1200);
    });
  }

  /* =============================================
     FOOTER CONTACT INTERACTIONS
     ============================================= */
  document.querySelectorAll('.footer-contact-item').forEach(el => {
    const text = el.textContent.toLowerCase();
    el.addEventListener('click', e => {
      if (e.target.tagName.toLowerCase() === 'a') return;
      if (text.includes('salem') || text.includes('address')) window.open('https://maps.google.com/?q=MMR+Complex,+Salem,+Tamil+Nadu+636008', '_blank');
      else if (text.includes('@')) window.location.href = 'mailto:info@stacklyhome.com';
      else if (text.includes('70107')) window.location.href = 'tel:+917010792745';
    });
  });
  document.querySelectorAll('.nav-phone, .mobile-phone').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', e => { if (e.target.tagName.toLowerCase() === 'a') return; window.location.href = 'tel:+917010792745'; });
  });

  /* =============================================
     TOAST NOTIFICATION
     ============================================= */
  function showToast(message, type = 'info') {
    const existing = document.querySelector('.sh-toast');
    if (existing) existing.remove();

    const palette = {
      success : 'linear-gradient(135deg,#22c55e,#16a34a)',
      error   : 'linear-gradient(135deg,#ef4444,#dc2626)',
      warning : 'linear-gradient(135deg,#f59e0b,#d97706)',
      info    : 'linear-gradient(135deg,#C9A96E,#A8843A)'
    };
    const toast = document.createElement('div');
    toast.className = 'sh-toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;

    Object.assign(toast.style, {
      position: 'fixed', bottom: '2rem', left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: palette[type] || palette.info,
      color: 'white', padding: '0.9rem 2rem',
      borderRadius: '50px',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '0.9rem', fontWeight: '700',
      boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
      zIndex: '99998', opacity: '0',
      transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
      maxWidth: '90vw', textAlign: 'center',
      whiteSpace: 'nowrap', backdropFilter: 'blur(12px)',
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(16px)';
      setTimeout(() => toast.remove(), 350);
    }, 4500);
  }
  window.showToast = showToast;

  /* =============================================
     PRICE RANGE SLIDER
     ============================================= */
  const priceRange   = document.getElementById('price-range');
  const priceDisplay = document.getElementById('price-display');
  if (priceRange && priceDisplay) {
    priceRange.addEventListener('input', () => {
      priceDisplay.textContent = `Up to $${parseInt(priceRange.value).toLocaleString()}`;
    });
  }

});
