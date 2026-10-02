/**
 * Wedding Photo Gallery Lightbox Viewer
 * Author: Dung Automation
 */

const WeddingGallery = (function () {
  let lightboxEl = null;
  let lightboxImg = null;
  let currentIndex = 0;
  let galleryItems = [];

  function init() {
    lightboxEl = document.getElementById('lightbox-modal');
    lightboxImg = document.getElementById('lightbox-image');

    const domItems = document.querySelectorAll('.gallery-item');
    galleryItems = Array.from(domItems).map((el, idx) => {
      const img = el.querySelector('img');
      const src = img ? img.getAttribute('src') : '';
      const alt = img ? img.getAttribute('alt') : 'Ảnh cưới';
      
      el.addEventListener('click', () => open(idx));
      return { src, alt };
    });

    // Close on overlay click
    if (lightboxEl) {
      lightboxEl.addEventListener('click', (e) => {
        if (e.target === lightboxEl) close();
      });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (!lightboxEl || !lightboxEl.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }

  function open(index) {
    if (!lightboxEl || !lightboxImg || galleryItems.length === 0) return;
    currentIndex = index;
    updateImage();
    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  function next() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateImage();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateImage();
  }

  function updateImage() {
    if (!lightboxImg || !galleryItems[currentIndex]) return;
    lightboxImg.src = galleryItems[currentIndex].src;
    lightboxImg.alt = galleryItems[currentIndex].alt;
  }

  return {
    init,
    open,
    close,
    next,
    prev
  };
})();

document.addEventListener('DOMContentLoaded', WeddingGallery.init);
