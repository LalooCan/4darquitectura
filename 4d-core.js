(() => {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navScrollLinks = document.querySelectorAll('.nav-links a[data-scroll-target]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let scrollAnimationId = 0;

  function easeInOutExpo(progress) {
    if (progress === 0 || progress === 1) return progress;

    return progress < 0.5
      ? Math.pow(2, 20 * progress - 10) / 2
      : (2 - Math.pow(2, -20 * progress + 10)) / 2;
  }

  function animateScroll(targetTop) {
    if (prefersReducedMotion) {
      window.scrollTo(0, targetTop);
      return;
    }

    if (scrollAnimationId) {
      cancelAnimationFrame(scrollAnimationId);
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const startTime = performance.now();
    const duration = Math.min(3200, Math.max(2200, Math.abs(distance) * 1.15));

    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startTop + distance * easeInOutExpo(progress));

      if (progress < 1) {
        scrollAnimationId = requestAnimationFrame(step);
      } else {
        scrollAnimationId = 0;
      }
    }

    scrollAnimationId = requestAnimationFrame(step);
  }

  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const navHeight = navbar ? navbar.offsetHeight : 0;
    const targetTop = Math.max(
      target.getBoundingClientRect().top + window.scrollY - navHeight - 12,
      0
    );

    animateScroll(targetTop);
  }

  function initMenu() {
    if (menuToggle && navLinks) {
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
    }

    navScrollLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        if (navLinks) navLinks.classList.remove('active');
        scrollToSection(link.dataset.scrollTarget);
      });
    });
  }

  function initNavbarShadow() {
    if (!navbar) return;

    const updateNavbar = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 24);
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
  }

  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((element) => element.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    reveals.forEach((element) => observer.observe(element));
  }

  function loadDeferredFeatures() {
    if (window.__fourDDeferredLoaded) return;
    window.__fourDDeferredLoaded = true;
    cleanupDeferredListeners();

    const script = document.createElement('script');
    script.src = './4d-enhancements.js';
    script.async = true;
    document.body.appendChild(script);
  }

  const eagerEvents = ['pointerdown', 'touchstart', 'focusin'];
  const listenerOptions = { passive: true, once: true };
  const eagerLoad = () => {
    loadDeferredFeatures();
  };

  function cleanupDeferredListeners() {
    eagerEvents.forEach((eventName) => {
      window.removeEventListener(eventName, eagerLoad, listenerOptions);
    });
  }

  function scheduleDeferredFeatures() {
    eagerEvents.forEach((eventName) => {
      window.addEventListener(eventName, eagerLoad, listenerOptions);
    });

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadDeferredFeatures, { timeout: 1500 });
    } else {
      window.addEventListener('load', () => {
        window.setTimeout(loadDeferredFeatures, 250);
      }, { once: true });
    }
  }

  initMenu();
  initNavbarShadow();
  initRevealAnimations();
  scheduleDeferredFeatures();
})();
