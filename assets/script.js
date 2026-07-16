// ── Meta Pixel bootstrap ──
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2507344896361151');
fbq('track', 'PageView');

// ── Google Analytics bootstrap ──
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-5KDWVJ421E');

// ── Scroll progress bar ──
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight * 100) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

// ── Hero parallax ──
const heroBg = document.querySelector('.hero-bg');
function updateParallax() {
  if (!heroBg) return;
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroBg.style.transform = `scale(1.04) translateY(${scrollY * 0.25}px)`;
  }
}
window.addEventListener('scroll', updateParallax, { passive: true });

// ── Service card tilt 3D ──
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinksMob = document.getElementById('navLinks');
const navScrollLinks = document.querySelectorAll('.nav-links a[data-scroll-target]');

function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => { navLinksMob.classList.toggle('active'); });
}
navScrollLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    navLinksMob.classList.remove('active');
    scrollToSection(link.dataset.scrollTarget);
  });
});

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => revealObserver.observe(el));

// ── Modal de proyectos ──
const modal = document.getElementById('projectsModal');
const closeBtn = document.querySelector('.close-btn');
const openProjectsBtn = document.getElementById('openProjectsBtn');
const modalGrid = document.getElementById('modalGrid');

const projectsData = [
  { id: 1, title: 'Residencia Contemporánea', category: 'residencial', year: '2024',
    description: 'Residencia unifamiliar con fachada en piedra natural, pérgola de madera y cochera con arco. Diseño que integra materiales locales con arquitectura contemporánea para una presencia única.',
    images: [
      'assets/ext-fachada-noche.jpg',
      'assets/ext-fachada-dia.jpg',
      'assets/int-recamara-calida.jpg',
    ]
  },
  { id: 2, title: 'Sala · Comedor Contemporáneo', category: 'interiores', year: '2024',
    description: 'Diseño de sala-comedor en concepto abierto con mesa de mármol negro, iluminación arquitectónica lineal y vista panorámica. Integración perfecta entre espacios sociales.',
    images: [
      'assets/int-sala-comedor.jpg.jpeg',
      'assets/int-comedor-1.jpg.jpeg',
      'assets/int-comedor-2.jpg.jpeg',
    ]
  },
  { id: 3, title: 'Sala de Entretenimiento', category: 'interiores', year: '2024',
    description: 'Sala de entretenimiento privada con mesa de billar, bar integrado, lounge y sistema de iluminación escénica con araña circular. Diseño para el confort y el estilo de vida premium.',
    images: [
      'assets/int-entretenimiento.jpg.jpeg',
      'assets/int-vestidor.jpg.jpeg',
      'assets/int-comedor-2.jpg.jpeg',
    ]
  },
  { id: 4, title: 'Suite · Recámaras', category: 'interiores', year: '2024',
    description: 'Diseño integral de recámaras con paneles de listones en madera, iluminación indirecta LED, TV integrada y acabados de alta gama en distintos estilos: cálido, oscuro y minimalista.',
    images: [
      'assets/int-recamara-calida.jpg',
      'assets/int-recamara-clara.jpg',
      'assets/int-recamara-oscura.jpg',
      'assets/int-recamara-suite.jpg',
    ]
  },
  { id: 5, title: 'Baños · Diseño de Interiores', category: 'interiores', year: '2024',
    description: 'Baños de lujo con dos estilos contrastantes: mármol negro con tina independiente y ambiente dark, y baño spa en tonos neutros con mueble de madera y regadera de lluvia.',
    images: [
      'assets/int-bano-negro.jpg',
      'assets/int-bano-claro.jpg',
      'assets/int-recamara-suite.jpg',
    ]
  },
  { id: 6, title: 'Sistema Solar · Residencial A', category: 'solar', year: '2024',
    description: 'Instalación fotovoltaica residencial llave en mano. Paneles de alta eficiencia orientados para maximizar captación solar en el clima de Mérida.',
    images: [
      'assets/solar-1.jpg',
      'assets/solar-3.jpg',
    ]
  },
  { id: 7, title: 'Sistema Solar · Residencial B', category: 'solar', year: '2024',
    description: 'Sistema fotovoltaico con instalación en azotea plana. Proceso de montaje supervisado por técnicos certificados con entrega llave en mano.',
    images: [
      'assets/solar-2.jpg',
    ]
  },
  { id: 8, title: 'Sistema Solar · Residencial C', category: 'solar', year: '2024',
    description: 'Instalación fotovoltaica en vivienda de dos niveles. Configuración optimizada para el consumo del hogar con retorno de inversión desde el primer mes.',
    images: [
      'assets/solar-4.jpg',
      'assets/solar-5.jpg',
      'assets/solar-6.jpg',
    ]
  },
];

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function buildDetailNode(p) {
  const frag = document.createDocumentFragment();
  const meta = document.createElement('div');
  meta.className = 'modal-detail-meta';
  const tag = document.createElement('span');
  tag.className = 'modal-detail-meta-tag';
  tag.textContent = `${p.category} · ${p.year}`;
  meta.appendChild(tag);
  const desc = document.createElement('p');
  desc.textContent = p.description;
  meta.appendChild(desc);
  frag.appendChild(meta);

  p.images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.loading = 'lazy';
    frag.appendChild(img);
  });

  const cta = document.createElement('div');
  cta.className = 'modal-detail-cta';
  const link = document.createElement('a');
  link.href = '#contacto';
  link.textContent = 'Cotizar proyecto similar →';
  link.addEventListener('click', closeModal);
  cta.appendChild(link);
  frag.appendChild(cta);
  return frag;
}

function buildGridNode() {
  const frag = document.createDocumentFragment();
  projectsData.forEach(p => {
    const card = document.createElement('div');
    card.className = 'modal-thumb';
    card.addEventListener('click', () => openModal(p.id));
    const img = document.createElement('img');
    img.src = p.images[0]; img.loading = 'lazy';
    card.appendChild(img);
    const ov = document.createElement('div');
    ov.className = 'modal-thumb-overlay';
    const tag = document.createElement('span');
    tag.className = 'modal-thumb-tag';
    tag.textContent = `${p.category} · ${p.year}`;
    ov.appendChild(tag);
    const title = document.createElement('span');
    title.className = 'modal-thumb-title';
    title.textContent = p.title;
    ov.appendChild(title);
    card.appendChild(ov);
    frag.appendChild(card);
  });
  return frag;
}

function renderModal(projectId) {
  const modalContent = document.querySelector('.modal-content');
  const heading = modalContent.querySelector('h2');
  modalGrid.innerHTML = '';
  if (projectId) {
    const p = projectsData.find(x => x.id === projectId);
    if (!p) return;
    heading.textContent = p.title;
    modalGrid.appendChild(buildDetailNode(p));
  } else {
    heading.textContent = 'Todos nuestros proyectos';
    modalGrid.appendChild(buildGridNode());
  }
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

window.openModal = (id) => {
  renderModal(id || null);
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

if (openProjectsBtn) {
  openProjectsBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(null); });
}
if (closeBtn) {
  closeBtn.addEventListener('click', closeModal);
}
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

document.querySelectorAll('.project-card[data-category]').forEach(card => {
  const id = parseInt(card.dataset.projectId, 10);
  if (id) card.addEventListener('click', () => openModal(id));
});

// ── Animated counters ──
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = '1';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => counterObserver.observe(el));

// ── Gallery filters ──
const isProjectsPage = document.body.classList.contains('projects-page');
const MAX_GRID = isProjectsPage ? Infinity : 6;

function showCard(card) {
  card.classList.remove('hidden');
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px)';
  requestAnimationFrame(() => {
    card.style.transition = 'opacity .35s ease, transform .35s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
}

function applyFilter(filter) {
  const cards = [...document.querySelectorAll('.project-card')];
  let shown = 0;
  cards.forEach(card => {
    const match = filter === 'todos' || card.dataset.category === filter;
    if (!match) { card.classList.add('hidden'); return; }
    if (filter === 'todos' && shown >= MAX_GRID) { card.classList.add('hidden'); return; }
    showCard(card);
    shown++;
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(btn.dataset.filter);
  });
});

applyFilter('todos');

// ── FAQ accordion ──
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ══════════════════════════════════════════
//  SEGURIDAD — config
// ══════════════════════════════════════════
const EMAILJS_PUBLIC_KEY  = 'FVkLw7D9M8HGFmId6';
const EMAILJS_SERVICE_ID  = 'service_w2jj4q9';
const EMAILJS_TEMPLATE_ID = 'template_9s263kq';
const TURNSTILE_SITE_KEY  = 'YOUR_TURNSTILE_SITE_KEY';
const COOLDOWN_MS         = 60000;
const DEBOUNCE_MS         = 1000;

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ── Sanitización XSS ──
function sanitize(str) {
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// ── Cloudflare Turnstile ──
let cfToken = null;
window.onTurnstileSuccess = (t) => { cfToken = t; };
window.onTurnstileExpired = ()  => { cfToken = null; };
window.onTurnstileError   = ()  => { cfToken = null; };

// ── Rate limiting ──
function getRemainingCooldown() {
  const last = sessionStorage.getItem('4d_last_send');
  if (!last) return 0;
  const elapsed = Date.now() - parseInt(last, 10);
  return elapsed < COOLDOWN_MS ? COOLDOWN_MS - elapsed : 0;
}

function startCooldownTimer(remainingMs, statusEl, btn) {
  btn.disabled = true;
  const interval = setInterval(() => {
    remainingMs -= 1000;
    if (remainingMs <= 0) {
      clearInterval(interval);
      statusEl.textContent = '';
      statusEl.className = 'form-status';
      btn.disabled = false;
      btn.textContent = 'Enviar mensaje →';
    } else {
      const s = Math.ceil(remainingMs / 1000);
      statusEl.textContent = `Espera ${s} segundo${s !== 1 ? 's' : ''} antes de enviar otro mensaje.`;
      statusEl.className = 'form-status error';
    }
  }, 1000);
}

// ── Verificar Turnstile via Netlify Function ──
async function verifyTurnstile(token) {
  if (TURNSTILE_SITE_KEY === 'YOUR_TURNSTILE_SITE_KEY') return true;
  try {
    const res = await fetch('/.netlify/functions/verify-turnstile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    return data.success === true;
  } catch { return false; }
}

// ── Honeypot log ──
function logHoneypot(value) {
  const payload = { ts: new Date().toISOString(), userAgent: navigator.userAgent, value };
  console.warn('[Honeypot activado]', payload);
  fetch('/.netlify/functions/csp-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'honeypot', ...payload }),
  }).catch(() => {});
}

// ── Click-to-activate map ──
const mapActivateBtn = document.getElementById('mapActivateBtn');
if (mapActivateBtn) {
  mapActivateBtn.addEventListener('click', () => {
    const placeholder = document.getElementById('mapPlaceholder');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59943.54489585451!2d-89.65351!3d20.96666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5671f411db70b5%3A0xf64f97ef985a2f1a!2sM%C3%A9rida%2C%20Yucat%C3%A1n!5e0!3m2!1ses!2smx!4v1715700000000';
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    iframe.setAttribute('title', 'Ubicación 4D Arquitectura en Mérida, Yucatán');
    iframe.className = 'map-iframe-active';
    placeholder.replaceWith(iframe);
  });
}

// ── Form submit ──
window.handleSubmit = async (event) => {
  event.preventDefault();
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const btn    = document.getElementById('submitBtn');

  // 1. Honeypot
  const hpValue = document.getElementById('honeypot').value;
  if (hpValue) { logHoneypot(hpValue); return; }

  // 2. Cooldown
  const remaining = getRemainingCooldown();
  if (remaining > 0) { startCooldownTimer(remaining, status, btn); return; }

  // 3. Debounce
  btn.disabled = true;
  setTimeout(() => { if (!btn.dataset.sending) btn.disabled = false; }, DEBOUNCE_MS);

  // 4. Sanitizar y validar
  const name    = sanitize(document.getElementById('name').value.trim());
  const email   = sanitize(document.getElementById('email').value.trim());
  const phone   = sanitize(document.getElementById('phone').value.trim());
  const message = sanitize(document.getElementById('message').value.trim());

  if (!name || !email || !message) {
    status.textContent = 'Completa nombre, correo y mensaje para continuar.';
    status.className = 'form-status error'; btn.disabled = false; return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = 'Ingresa un correo electrónico válido.';
    status.className = 'form-status error'; btn.disabled = false; return;
  }
  if (name.length > 100 || message.length > 2000 || phone.length > 20) {
    status.textContent = 'Uno o más campos exceden el límite permitido.';
    status.className = 'form-status error'; btn.disabled = false; return;
  }

  // 5. Turnstile
  btn.dataset.sending = '1';
  btn.textContent = 'Verificando seguridad...';
  const turnstileOk = await verifyTurnstile(cfToken);
  if (!turnstileOk) {
    status.textContent = 'Verificación de seguridad fallida. Recarga la página e intenta de nuevo.';
    status.className = 'form-status error';
    btn.disabled = false; btn.textContent = 'Enviar mensaje →';
    delete btn.dataset.sending; return;
  }

  // 6. EmailJS
  btn.textContent = 'Enviando...';
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      name, email, message, phone: phone || 'No proporcionado',
    });
    sessionStorage.setItem('4d_last_send', Date.now().toString());
    status.textContent = '¡Mensaje enviado! Te contactamos en menos de 24 horas.';
    status.className = 'form-status success';
    form.reset(); cfToken = null;
    startCooldownTimer(COOLDOWN_MS, status, btn);
  } catch {
    status.textContent = 'Error al enviar. Escríbenos directo por WhatsApp.';
    status.className = 'form-status error';
    btn.disabled = false; btn.textContent = 'Enviar mensaje →';
  } finally {
    delete btn.dataset.sending;
  }

  // contact form: remove inline onsubmit fallback once external script controls it
  void escapeHtml;
};

// Wire form to handleSubmit without inline attribute
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.removeAttribute('onsubmit');
  contactForm.addEventListener('submit', window.handleSubmit);
}
