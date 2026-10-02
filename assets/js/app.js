/**
 * Main Wedding Invitation Controller
 * Author: Dung Automation
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initURLParams();
  initCountdown();
  initWeddingData();
  initEnvelopeOpener();
  initGiftModal();
});

/* --------------------------------------------------------------------------
   0. Theme Initialization
   -------------------------------------------------------------------------- */
function initTheme() {
  if (!window.WeddingAdmin) return;
  const cfg = window.WeddingAdmin.getConfig();
  if (cfg.theme) {
    document.body.setAttribute('data-theme', cfg.theme);
  }
}

/* --------------------------------------------------------------------------
   1. Guest Name & URL Parameter Personalization (Rút Gọn Slug)
   -------------------------------------------------------------------------- */
function initURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get('to') || urlParams.get('guest');
  const sideParam = urlParams.get('side');

  let guestName = 'Quý Khách & Gia Đình';

  if (guestParam) {
    const rawTo = guestParam.trim();
    const cfg = window.WeddingAdmin ? window.WeddingAdmin.getConfig() : null;

    // 1. Check if slug exists in Admin guest mapping dictionary
    if (cfg && cfg.guestMap && cfg.guestMap[rawTo]) {
      guestName = cfg.guestMap[rawTo];
    } 
    // 2. If it's a hyphenated slug (e.g., ?to=anh-nam-va-gia-dinh)
    else if (rawTo.includes('-')) {
      const words = rawTo.split('-').filter(w => w.length > 0);
      const titleCased = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      guestName = 'Kính mời: ' + titleCased;
    }
    // 3. If it's a compact slug (e.g., ?to=tenkhachhang)
    else if (/^[a-z0-9]+$/i.test(rawTo) && rawTo.length > 1) {
      guestName = 'Kính mời: ' + rawTo.charAt(0).toUpperCase() + rawTo.slice(1);
    }
    // 4. Default decoded string
    else {
      guestName = decodeURIComponent(rawTo);
    }
  }

  // Update Envelope Guest Name
  const envelopeGuestEl = document.getElementById('envelope-guest-name');
  if (envelopeGuestEl) {
    envelopeGuestEl.textContent = guestName;
  }

  // Update Hero Guest Callout
  const heroGuestEl = document.getElementById('hero-guest-name');
  if (heroGuestEl) {
    heroGuestEl.textContent = guestName;
  }

  // Pre-fill RSVP Name Input
  const rsvpNameInput = document.getElementById('rsvp-name');
  if (rsvpNameInput && guestParam) {
    const cleanName = guestName.replace(/^(Trân trọng kính mời|Kính mời|Thân mời|Mời bạn):?\s*/i, '');
    rsvpNameInput.value = cleanName;
  }

  // Pre-select Side in RSVP if specified
  if (sideParam) {
    const radioGroom = document.getElementById('side-groom');
    const radioBride = document.getElementById('side-bride');
    if (sideParam.toLowerCase() === 'bride' && radioBride) {
      radioBride.checked = true;
    } else if (sideParam.toLowerCase() === 'groom' && radioGroom) {
      radioGroom.checked = true;
    }
  }
}

/* --------------------------------------------------------------------------
   2. Envelope Opening Experience
   -------------------------------------------------------------------------- */
function initEnvelopeOpener() {
  const openBtn = document.getElementById('btn-open-envelope');
  const envelopeOverlay = document.getElementById('envelope-modal');

  if (!openBtn || !envelopeOverlay) return;

  openBtn.addEventListener('click', () => {
    if (window.triggerHeartBurst) {
      window.triggerHeartBurst(window.innerWidth / 2, window.innerHeight * 0.45, 40);
    }

    if (window.WeddingAudio && typeof window.WeddingAudio.play === 'function') {
      window.WeddingAudio.play();
    }

    envelopeOverlay.classList.add('opened');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   3. Real-time Countdown Timer
   -------------------------------------------------------------------------- */
function initCountdown() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');

  if (!daysEl) return;

  const cfg = window.WeddingAdmin ? window.WeddingAdmin.getConfig() : null;
  const targetDateStr = cfg && cfg.weddingDate ? cfg.weddingDate : '2026-11-20T11:00:00';
  const targetDate = new Date(targetDateStr).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   4. Sync Wedding Details & Customized Images
   -------------------------------------------------------------------------- */
function initWeddingData() {
  if (!window.WeddingAdmin) return;
  const cfg = window.WeddingAdmin.getConfig();

  // Populate Couple Names
  const coupleNamesEl = document.getElementById('hero-couple-names');
  if (coupleNamesEl) {
    coupleNamesEl.textContent = `${cfg.groom.name} & ${cfg.bride.name}`;
  }

  const envelopeCoupleEl = document.getElementById('envelope-couple-names');
  if (envelopeCoupleEl) {
    envelopeCoupleEl.textContent = `${cfg.groom.name} & ${cfg.bride.name}`;
  }

  // Populate Customized Photos if configured
  if (cfg.images) {
    setImgSrc('hero-photo-img', cfg.images.hero);
    setImgSrc('groom-avatar-img', cfg.images.groom);
    setImgSrc('bride-avatar-img', cfg.images.bride);
    setImgSrc('rings-photo-img', cfg.images.rings);
    setImgSrc('walk-photo-img', cfg.images.walk);
  }

  // Populate Groom Info
  setText('groom-fullname', cfg.groom.fullName);
  setText('groom-parents', `Trưởng nam của: Ông ${cfg.groom.father} & Bà ${cfg.groom.mother}`);
  setText('groom-bank-info', `${cfg.groom.bankName} - ${cfg.groom.bankNumber} (${cfg.groom.bankAccountName})`);

  // Populate Bride Info
  setText('bride-fullname', cfg.bride.fullName);
  setText('bride-parents', `Ái nữ của: Ông ${cfg.bride.father} & Bà ${cfg.bride.mother}`);
  setText('bride-bank-info', `${cfg.bride.bankName} - ${cfg.bride.bankNumber} (${cfg.bride.bankAccountName})`);

  // Populate Ceremonies
  setText('ceremony-groom-title', cfg.ceremonyGroom.title);
  setText('ceremony-groom-time', cfg.ceremonyGroom.time);
  setText('ceremony-groom-venue', cfg.ceremonyGroom.venue);
  setText('ceremony-groom-address', cfg.ceremonyGroom.address);
  setHref('ceremony-groom-map-link', cfg.ceremonyGroom.mapUrl);

  setText('ceremony-bride-title', cfg.ceremonyBride.title);
  setText('ceremony-bride-time', cfg.ceremonyBride.time);
  setText('ceremony-bride-venue', cfg.ceremonyBride.venue);
  setText('ceremony-bride-address', cfg.ceremonyBride.address);
  setHref('ceremony-bride-map-link', cfg.ceremonyBride.mapUrl);

  // Generate VietQR for Groom and Bride
  const qrGroom = document.getElementById('qr-img-groom');
  if (qrGroom && cfg.groom.bankNumber) {
    const cleanBank = cfg.groom.bankName.split(' ')[0].toLowerCase();
    qrGroom.src = `https://img.vietqr.io/image/${cleanBank}-${cfg.groom.bankNumber}-compact2.jpg?amount=0&addInfo=Mung%20Cuoi%20${encodeURIComponent(cfg.groom.name)}&accountName=${encodeURIComponent(cfg.groom.bankAccountName)}`;
  }

  const qrBride = document.getElementById('qr-img-bride');
  if (qrBride && cfg.bride.bankNumber) {
    const cleanBank = cfg.bride.bankName.split(' ')[0].toLowerCase();
    qrBride.src = `https://img.vietqr.io/image/${cleanBank}-${cfg.bride.bankNumber}-compact2.jpg?amount=0&addInfo=Mung%20Cuoi%20${encodeURIComponent(cfg.bride.name)}&accountName=${encodeURIComponent(cfg.bride.bankAccountName)}`;
  }
}

function setImgSrc(id, src) {
  if (!src) return;
  const el = document.getElementById(id);
  if (el) el.src = src;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el && href) el.href = href;
}

/* --------------------------------------------------------------------------
   5. Wedding Gift Modal Handlers
   -------------------------------------------------------------------------- */
function initGiftModal() {
  const modal = document.getElementById('gift-modal');
  const openBtn = document.getElementById('btn-show-gift');
  const closeBtn = document.getElementById('btn-close-gift');

  if (!modal || !openBtn) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
