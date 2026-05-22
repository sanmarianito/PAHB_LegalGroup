/* ============================================
   PAHB — Main JavaScript
   ============================================
   Animations are handled 100% via CSS
   (animation-timeline: view()).
   JS only handles: nav, menu, accordion, form.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Nav Auto-Hide on Scroll ---
  const nav = document.getElementById('navbar');
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 100) {
          if (window.scrollY > lastScrollY) {
            nav.classList.add('nav--hidden');
          } else {
            nav.classList.remove('nav--hidden');
          }
        } else {
          nav.classList.remove('nav--hidden');
        }
        lastScrollY = window.scrollY;
        ticking = false;
      });
      ticking = true;
    }
  });

  // --- Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isActive = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // --- Accordion (Servicios) ---
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const accordion = header.parentElement;
      const isOpen = accordion.classList.contains('open');

      // Close all others
      document.querySelectorAll('.accordion.open').forEach(a => {
        if (a !== accordion) {
          a.classList.remove('open');
          a.querySelector('.accordion__header').setAttribute('aria-expanded', 'false');
        }
      });

      accordion.classList.toggle('open');
      header.setAttribute('aria-expanded', !isOpen);
    });
  });

  // --- Textarea Auto-Expand ---
  const textarea = document.getElementById('mensaje');
  if (textarea) {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav__links a:not(.btn)');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // --- Form Submit Handler ---
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form__submit');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          statusEl.className = 'form__status form__status--success';
          statusEl.textContent = '✓ Mensaje enviado correctamente. Nos pondremos en contacto pronto.';
          form.reset();
        } else {
          throw new Error('Error en el envío');
        }
      } catch (err) {
        statusEl.className = 'form__status form__status--error';
        statusEl.textContent = 'Hubo un error al enviar el mensaje. Por favor intente nuevamente o contáctenos por WhatsApp.';
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }

  // --- Video Source Switching ---
  const video = document.querySelector('.hero__video');
  if (video) {
    const desktopSource = video.querySelector('source[media]');
    const mobileSource = video.querySelector('source:not([media])');

    function updateVideoSource() {
      const isDesktop = window.matchMedia('(min-width: 971px)').matches;
      if (isDesktop && desktopSource) {
        video.src = desktopSource.src;
      } else if (mobileSource) {
        video.src = mobileSource.src;
      }
    }

    updateVideoSource();
    window.matchMedia('(min-width: 971px)').addEventListener('change', updateVideoSource);
  }

  // --- Separador: Scroll-driven frame sequence ---
  const sepWrap   = document.getElementById('separador-scroll');
  const sepCanvas = document.getElementById('separador-canvas');

  if (sepWrap && sepCanvas) {
    const TOTAL_FRAMES   = 100;
    const BASE_PATH      = 'img/separador/separador_';
    const PX_PER_FRAME   = 6;   // px de scroll por cada frame
    const ctx            = sepCanvas.getContext('2d');
    const frames         = [];
    let currentFrame     = 0;
    let isVisible        = false;
    let entryScrollY     = 0;

    function resizeSepCanvas() {
      sepCanvas.width  = window.innerWidth;
      sepCanvas.height = 240;
      drawSepFrame(currentFrame);
    }

    function drawSepFrame(idx) {
      const img = frames[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, sepCanvas.width, sepCanvas.height);
      const VERT_OFFSET = 60; // px hacia abajo — ajustar si es necesario
      const scale = Math.max(
        sepCanvas.width  / img.naturalWidth,
        sepCanvas.height / img.naturalHeight
      );
      const w = img.naturalWidth  * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (sepCanvas.width - w) / 2, (sepCanvas.height - h) / 2 + VERT_OFFSET, w, h);
    }

    function onSepScroll() {
      if (!isVisible) return;
      const delta = window.scrollY - entryScrollY;
      const idx   = Math.min(Math.max(Math.floor(delta / PX_PER_FRAME), 0), TOTAL_FRAMES - 1);
      if (idx !== currentFrame) {
        currentFrame = idx;
        drawSepFrame(idx);
      }
    }

    // Observa visibilidad; guarda el scrollY de entrada como referencia
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isVisible    = true;
        entryScrollY = window.scrollY;
      } else {
        isVisible = false;
      }
    }, { threshold: 0.1 });
    observer.observe(sepWrap);

    // Precarga frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = BASE_PATH + String(i).padStart(3, '0') + '.jpg';
      img.onload = () => { if (i === 0) resizeSepCanvas(); };
      frames.push(img);
    }

    window.addEventListener('scroll', onSepScroll, { passive: true });
    window.addEventListener('resize', resizeSepCanvas);
    resizeSepCanvas();
  }

});
