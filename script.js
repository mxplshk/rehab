// ========== CURSOR ==========
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
});
function animCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (cursorRing) { cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px'; }
  requestAnimationFrame(animCursor);
}
animCursor();

document.querySelectorAll('a, button, .config-btn, .color-btn, .portfolio-item, .faq-question').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursorRing) { cursorRing.style.width = '60px'; cursorRing.style.height = '60px'; cursorRing.style.borderColor = 'rgba(255,59,0,0.8)'; }
    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1.8)';
  });
  el.addEventListener('mouseleave', () => {
    if (cursorRing) { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; cursorRing.style.borderColor = 'rgba(255,59,0,0.5)'; }
    if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ========== BURGER ==========
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    const spans = burger.querySelectorAll('span');
    if (burger.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}

// ========== POPUP ==========
function openPopup() {
  const overlay = document.querySelector('.popup-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closePopup() {
  const overlay = document.querySelector('.popup-overlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-popup]').forEach(el => el.addEventListener('click', openPopup));
const popupClose = document.querySelector('.popup-close');
if (popupClose) popupClose.addEventListener('click', closePopup);
const popupOverlay = document.querySelector('.popup-overlay');
if (popupOverlay) {
  popupOverlay.addEventListener('click', e => { if (e.target === popupOverlay) closePopup(); });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

// ========== ACTIVE NAV ==========
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ========== FADE IN ==========
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.classList.add('visible'); }, i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));

// ========== HERO CAR ==========
const heroCar = document.querySelector('.hero-car');
if (heroCar) setTimeout(() => heroCar.classList.add('visible'), 300);

// ========== PARALLAX ==========
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const bgText = document.querySelector('.hero-bg-text');
  if (bgText) bgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
  const heroCar2 = document.querySelector('.hero-car');
  if (heroCar2) heroCar2.style.transform = `translateX(${scrollY * -0.08}px) translateY(${scrollY * 0.05}px)`;
});

// ========== BEFORE/AFTER SLIDER ==========
const baSlider = document.querySelector('.ba-slider-wrap');
if (baSlider) {
  const after = baSlider.querySelector('.ba-after');
  const divider = baSlider.querySelector('.ba-divider');
  let dragging = false;

  function setSlider(x) {
    const rect = baSlider.getBoundingClientRect();
    const pct = Math.max(5, Math.min(95, (x - rect.left) / rect.width * 100));
    after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    divider.style.left = pct + '%';
  }

  divider.addEventListener('mousedown', () => dragging = true);
  document.addEventListener('mouseup', () => dragging = false);
  document.addEventListener('mousemove', e => { if (dragging) setSlider(e.clientX); });

  divider.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); });
  document.addEventListener('touchend', () => dragging = false);
  document.addEventListener('touchmove', e => { if (dragging) setSlider(e.touches[0].clientX); });
}

// ========== CONFIGURATOR ==========
const carData = {
  'Lamborghini': {
    colors: { '#1a1a1a': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80&auto=format', '#FFD700': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&auto=format', '#FFFFFF': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format', '#FF3B00': 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&auto=format' },
    desc: 'Полный детейлинг суперкара с нанокерамикой и защитной плёнкой'
  },
  'Porsche': {
    colors: { '#1a1a1a': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80&auto=format', '#FFD700': 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80&auto=format', '#FFFFFF': 'https://images.unsplash.com/photo-1503736334956-4c8f8e4a0fd6?w=800&q=80&auto=format', '#FF3B00': 'https://images.unsplash.com/photo-1541038709-e4b84a8e5c6b?w=800&q=80&auto=format' },
    desc: 'Профессиональная обработка и покраска Porsche любой модели'
  },
  'Ferrari': {
    colors: { '#1a1a1a': 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80&auto=format', '#FFD700': 'https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?w=800&q=80&auto=format', '#FFFFFF': 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&q=80&auto=format', '#FF3B00': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80&auto=format' },
    desc: 'Бережная работа с эксклюзивными лакокрасочными покрытиями Ferrari'
  },
  'Mercedes': {
    colors: { '#1a1a1a': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&auto=format', '#FFD700': 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&q=80&auto=format', '#FFFFFF': 'https://images.unsplash.com/photo-1611820006168-89c7ebb98df6?w=800&q=80&auto=format', '#FF3B00': 'https://images.unsplash.com/photo-1549399542-7d3b2b1f5d8a?w=800&q=80&auto=format' },
    desc: 'Детейлинг и защита кузова Mercedes-Benz любого класса'
  }
};

const configBtns = document.querySelectorAll('.config-btn[data-car]');
const colorBtns = document.querySelectorAll('.color-btn');
const configImg = document.querySelector('.config-car-img');
const configTitle = document.querySelector('.config-info h4');
const configDesc = document.querySelector('.config-info p');

let activeCar = 'Lamborghini';
let activeColor = '#1a1a1a';

function updateConfig() {
  if (!configImg) return;
  const car = carData[activeCar];
  if (!car) return;
  const imgUrl = car.colors[activeColor] || Object.values(car.colors)[0];
  configImg.classList.remove('loaded');
  const img = new Image();
  img.onload = () => {
    configImg.src = imgUrl;
    configImg.classList.add('loaded');
  };
  img.src = imgUrl;
  if (configTitle) configTitle.textContent = activeCar;
  if (configDesc) configDesc.textContent = car.desc;
}

configBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    configBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCar = btn.dataset.car;
    updateConfig();
  });
});

colorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    colorBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeColor = btn.dataset.color;
    updateConfig();
  });
});

if (configImg) {
  setTimeout(() => updateConfig(), 300);
}

// ========== FAQ ==========
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ========== PORTFOLIO MODAL ==========
const portfolioModal = document.querySelector('.portfolio-modal-overlay');
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', () => {
    if (!portfolioModal) return;
    const img = item.querySelector('img');
    const h3 = item.querySelector('h3');
    const span = item.querySelector('span');
    const modalImg = portfolioModal.querySelector('img');
    const modalH2 = portfolioModal.querySelector('h2');
    const modalP = portfolioModal.querySelector('p');
    if (modalImg && img) modalImg.src = img.src;
    if (modalH2 && h3) modalH2.textContent = h3.textContent;
    if (modalP && span) modalP.textContent = span.textContent;
    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});
const modalCloseBtn = document.querySelector('.modal-close-btn');
if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => {
  portfolioModal.classList.remove('active');
  document.body.style.overflow = '';
});
if (portfolioModal) portfolioModal.addEventListener('click', e => {
  if (e.target === portfolioModal) { portfolioModal.classList.remove('active'); document.body.style.overflow = ''; }
});

// ========== FORM ==========
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit], .btn-submit');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = 'ОТПРАВЛЕНО ✓';
      btn.style.background = '#1a1a1a';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
    }
  });
});
