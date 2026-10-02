/**
 * Wedding Photo Lookbook Engine (Cuốn Sách Ảnh Cưới 20 Trang Nghệ Thuật)
 * Lướt trái/phải mượt mà như lật sách, tự động nhảy ảnh, ẩn thumbnail, không lộ lưới thô
 * Author: Dung Automation
 */

const WeddingGallery = (function () {
  const DEFAULT_ALBUM_PHOTOS = [
    { src: 'assets/images/gallery-1.jpg', title: 'Khoảnh Khắc Về Chung Một Nhà', caption: 'Ngày hạnh phúc nhất đời chúng mình bắt đầu từ nụ cười của em.' },
    { src: 'assets/images/gallery-2.jpg', title: 'Ánh Mắt Yêu Thương', caption: 'Chỉ cần một ánh nhìn, ta hiểu rằng đối phương chính là cả thế giới.' },
    { src: 'assets/images/gallery-3.jpg', title: 'Vòng Hoa Ước Nguyện', caption: 'Dưới vòm hoa trắng tinh khôi, hai trái tim chung một nhịp đập.' },
    { src: 'assets/images/gallery-4.jpg', title: 'Nụ Cười Rạng Rỡ', caption: 'Từng nụ cười, từng ánh mắt đều gói trọn trọn vẹn sự ngọt ngào.' },
    { src: 'assets/images/gallery-5.jpg', title: 'Cùng Nhau Dạo Bước', caption: 'Tay nắm chặt bàn tay, vững bước đi qua muôn vàn giông bão cuộc đời.' },
    { src: 'assets/images/gallery-6.jpg', title: 'Khiêu Vũ Dưới Ánh Đèn', caption: 'Bản hòa ca của tình yêu ngân vang dưới ngàn ánh đèn lung linh.' },
    { src: 'assets/images/gallery-7.jpg', title: 'Lời Thề Nguyện Trăm Năm', caption: 'Anh hứa sẽ luôn yêu thương, trân trọng và chở che em suốt đời.' },
    { src: 'assets/images/gallery-8.jpg', title: 'Nâng Ly Chúc Mừng', caption: 'Cùng người thân và bạn bè nâng ly chúc phúc cho ngày hạnh phúc.' },
    { src: 'assets/images/gallery-9.jpg', title: 'Chiếc Xe Hoa Hạnh Phúc', caption: 'Chuyến xe đưa chúng ta về chung một tổ ấm yêu thương.' },
    { src: 'assets/images/gallery-10.jpg', title: 'Bàn Tiệc Nến Thơm', caption: 'Không gian ấm cúng, sang trọng đón chào quý khách quý.' },
    { src: 'assets/images/gallery-11.jpg', title: 'Khoảnh Khắc Cô Dâu', caption: 'Vẻ đẹp dịu dàng, e ấp trong tà áo cưới trắng tinh khôi.' },
    { src: 'assets/images/gallery-12.jpg', title: 'Phong Thái Chú Rể', caption: 'Người đàn ông trưởng thành, sẵn sàng gánh vác tương lai.' },
    { src: 'assets/images/gallery-13.jpg', title: 'Cắt Bánh Hạnh Phúc', caption: 'Vị ngọt của bánh cưới cũng như tình yêu đôi lứa đượm nồng.' },
    { src: 'assets/images/gallery-14.jpg', title: 'Hoàng Hôn Nắng Vàng', caption: 'Chiều hoàng hôn buông xuống, nhuộm hồng những lời hẹn ước.' },
    { src: 'assets/images/gallery-15.jpg', title: 'Ngập Tràn Tiếng Cười', caption: 'Hạnh phúc giản đơn là những giây phút bên nhau tràn ngập niềm vui.' },
    { src: 'assets/images/gallery-16.jpg', title: 'Pháo Hoa Rực Rỡ', caption: 'Ngàn tia sáng lấp lánh thắp sáng đêm tiệc hôn lễ ngọt ngào.' },
    { src: 'assets/images/gallery-17.jpg', title: 'Chiếc Nhẫn Đính Ước', caption: 'Kỷ vật thiêng liêng gắn kết trọn đời hai tâm hồn.' },
    { src: 'assets/images/gallery-18.jpg', title: 'Cái Chạm Nhẹ Yêu Thương', caption: 'Ấm áp tựa như những tia nắng mai chiếu rọi góc giáo đường.' },
    { src: 'assets/images/gallery-19.jpg', title: 'Bình Yên Bên Nhau', caption: 'Giữa biển người bao la, thật may mắn khi ta đã tìm thấy nhau.' },
    { src: 'assets/images/gallery-20.jpg', title: 'Mãi Mãi Một Tình Yêu', caption: 'Khởi đầu cho một chương mới đong đầy yêu thương và hy vọng.' }
  ];

  let albumPhotos = [];
  let currentIndex = 0;
  let autoPlayTimer = null;
  let isPlaying = true;
  const slideDuration = 3800; // 3.8 seconds per page

  // DOM Elements
  let lookbookImg = null;
  let lookbookTitle = null;
  let lookbookCaption = null;
  let pageCounter = null;
  let progressBar = null;
  let playPauseBtn = null;
  let dotsContainer = null;
  let stageEl = null;

  let lightboxEl = null;
  let lightboxImg = null;
  let lightboxTitle = null;
  let lightboxCounter = null;

  function init() {
    loadPhotosData();
    cacheDOMElements();
    renderCurrentPage('next');
    renderMinimalDots();
    setupEventListeners();
    startAutoPlay();
  }

  function loadPhotosData() {
    if (window.WeddingAdmin && typeof window.WeddingAdmin.getConfig === 'function') {
      const cfg = window.WeddingAdmin.getConfig();
      if (Array.isArray(cfg.albumPhotos) && cfg.albumPhotos.length > 0) {
        albumPhotos = cfg.albumPhotos;
        return;
      }
    }
    albumPhotos = DEFAULT_ALBUM_PHOTOS.slice();
  }

  function cacheDOMElements() {
    lookbookImg = document.getElementById('lookbook-current-img');
    lookbookTitle = document.getElementById('lookbook-slide-title');
    lookbookCaption = document.getElementById('lookbook-slide-caption');
    pageCounter = document.getElementById('lookbook-page-counter');
    progressBar = document.getElementById('lookbook-progress-bar');
    playPauseBtn = document.getElementById('btn-lookbook-playpause');
    dotsContainer = document.getElementById('lookbook-dots');
    stageEl = document.getElementById('lookbook-stage');

    lightboxEl = document.getElementById('lightbox-modal');
    lightboxImg = document.getElementById('lightbox-image');
    lightboxTitle = document.getElementById('lightbox-title');
    lightboxCounter = document.getElementById('lightbox-counter');
  }

  function renderCurrentPage(direction = 'next') {
    if (!albumPhotos || albumPhotos.length === 0) return;
    const item = albumPhotos[currentIndex];
    if (!item) return;

    if (lookbookImg) {
      // Smooth Page Flip / Slide animation class
      const animClass = direction === 'next' ? 'page-flip-next' : 'page-flip-prev';
      lookbookImg.classList.remove('page-active', 'page-flip-next', 'page-flip-prev');
      void lookbookImg.offsetWidth; // Force DOM reflow

      lookbookImg.src = item.src;
      lookbookImg.alt = item.title || `Trang ảnh ${currentIndex + 1}`;
      lookbookImg.classList.add('page-active', animClass);
    }

    if (lookbookTitle) {
      lookbookTitle.textContent = item.title || `Khoảnh Khắc Kỷ Niệm #${currentIndex + 1}`;
    }

    if (lookbookCaption) {
      lookbookCaption.textContent = item.caption || 'Hành trình tình yêu đong đầy hạnh phúc.';
    }

    if (pageCounter) {
      const pad = (n) => String(n).padStart(2, '0');
      pageCounter.innerHTML = `<i class="fa-solid fa-book-bookmark" style="margin-right:6px; color:var(--gold-primary);"></i> Trang <strong>${pad(currentIndex + 1)}</strong> / ${pad(albumPhotos.length)}`;
    }

    updateActiveDot();
    resetProgressBar();
  }

  function renderMinimalDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = albumPhotos.map((_, idx) => `
      <button type="button" class="lookbook-dot ${idx === currentIndex ? 'active' : ''}" data-index="${idx}" title="Trang ${idx + 1}" aria-label="Chuyển đến trang ${idx + 1}"></button>
    `).join('');

    const dots = dotsContainer.querySelectorAll('.lookbook-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        goToSlide(idx);
      });
    });
  }

  function updateActiveDot() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.lookbook-dot');
    dots.forEach((d, i) => {
      if (i === currentIndex) {
        d.classList.add('active');
      } else {
        d.classList.remove('active');
      }
    });
  }

  function setupEventListeners() {
    // Navigation Buttons
    const prevBtn = document.getElementById('btn-lookbook-prev');
    const nextBtn = document.getElementById('btn-lookbook-next');

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });

    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });

    // Play/Pause Button
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAutoPlay();
      });
    }

    // Fullscreen Button
    const fsBtn = document.getElementById('btn-lookbook-fullscreen');
    if (fsBtn) {
      fsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFullscreen();
      });
    }

    // Stage Interaction: Click opens Lightbox, Hover pauses
    if (stageEl) {
      stageEl.addEventListener('mouseenter', () => {
        pauseAutoPlay(false);
      });
      stageEl.addEventListener('mouseleave', () => {
        if (isPlaying) startAutoPlay();
      });
      stageEl.addEventListener('click', (e) => {
        if (!e.target.closest('.lookbook-ctrl-btn') && !e.target.closest('.lookbook-dot')) {
          openLightbox(currentIndex);
        }
      });

      // Mobile Touch Swipe Handling
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      let touchEndY = 0;

      stageEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        pauseAutoPlay(false);
      }, { passive: true });

      stageEl.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
        if (isPlaying) startAutoPlay();
      }, { passive: true });

      function handleSwipeGesture() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        // Ensure horizontal swipe is dominant over vertical scroll
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
          if (deltaX < 0) {
            nextSlide(); // Swipe left -> Next Page
          } else {
            prevSlide(); // Swipe right -> Previous Page
          }
        }
      }

      // Desktop Mouse Drag Handling
      let mouseStartX = 0;
      let isMouseDown = false;

      stageEl.addEventListener('mousedown', (e) => {
        if (e.target.closest('.lookbook-ctrl-btn')) return;
        isMouseDown = true;
        mouseStartX = e.clientX;
      });

      stageEl.addEventListener('mouseup', (e) => {
        if (!isMouseDown) return;
        isMouseDown = false;
        const deltaX = e.clientX - mouseStartX;
        if (Math.abs(deltaX) > 50) {
          if (deltaX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      });
    }

    // Lightbox Controls
    if (lightboxEl) {
      lightboxEl.addEventListener('click', (e) => {
        if (e.target === lightboxEl || e.target.classList.contains('lightbox-backdrop')) {
          closeLightbox();
        }
      });

      const lbClose = document.getElementById('btn-lightbox-close');
      const lbPrev = document.getElementById('btn-lightbox-prev');
      const lbNext = document.getElementById('btn-lightbox-next');

      if (lbClose) lbClose.addEventListener('click', closeLightbox);
      if (lbPrev) lbPrev.addEventListener('click', prevLightbox);
      if (lbNext) lbNext.addEventListener('click', nextLightbox);
    }

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      if (lightboxEl && lightboxEl.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
        return;
      }
      // If gallery is in viewport, allow arrow key navigation
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });
  }

  function startAutoPlay() {
    stopAutoPlayTimer();
    resetProgressBar();
    autoPlayTimer = setInterval(() => {
      nextSlide();
    }, slideDuration);
    if (playPauseBtn) {
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      playPauseBtn.title = 'Tạm dừng tự động lật trang';
    }
  }

  function stopAutoPlayTimer() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function pauseAutoPlay(updateState = true) {
    stopAutoPlayTimer();
    if (progressBar) {
      progressBar.style.animationPlayState = 'paused';
    }
    if (updateState) {
      isPlaying = false;
      if (playPauseBtn) {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playPauseBtn.title = 'Tiếp tục tự động lật trang';
      }
    }
  }

  function toggleAutoPlay() {
    if (isPlaying) {
      pauseAutoPlay(true);
    } else {
      isPlaying = true;
      startAutoPlay();
    }
  }

  function resetProgressBar() {
    if (!progressBar) return;
    progressBar.classList.remove('running');
    void progressBar.offsetWidth;
    if (isPlaying) {
      progressBar.classList.add('running');
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % albumPhotos.length;
    renderCurrentPage('next');
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + albumPhotos.length) % albumPhotos.length;
    renderCurrentPage('prev');
  }

  function goToSlide(index) {
    if (index < 0 || index >= albumPhotos.length) return;
    const direction = index >= currentIndex ? 'next' : 'prev';
    currentIndex = index;
    renderCurrentPage(direction);
    if (isPlaying) {
      startAutoPlay();
    }
  }

  function toggleFullscreen() {
    const container = document.getElementById('wedding-lookbook-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  /* --------------------------------------------------------------------------
     Lightbox Fullscreen Viewer
     -------------------------------------------------------------------------- */
  let lightboxIndex = 0;

  function openLightbox(index) {
    if (!lightboxEl || !albumPhotos[index]) return;
    lightboxIndex = index;
    updateLightboxContent();
    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextLightbox() {
    lightboxIndex = (lightboxIndex + 1) % albumPhotos.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    lightboxIndex = (lightboxIndex - 1 + albumPhotos.length) % albumPhotos.length;
    updateLightboxContent();
  }

  function updateLightboxContent() {
    const photo = albumPhotos[lightboxIndex];
    if (!photo) return;

    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = photo.src;
        lightboxImg.alt = photo.title || 'Ảnh cưới';
        lightboxImg.style.opacity = '1';
      }, 150);
    }

    if (lightboxTitle) {
      lightboxTitle.innerHTML = `<strong>${photo.title || 'Kỷ Niệm Cưới'}</strong> - <span>${photo.caption || ''}</span>`;
    }

    if (lightboxCounter) {
      const pad = (n) => String(n).padStart(2, '0');
      lightboxCounter.innerHTML = `<i class="fa-solid fa-images" style="margin-right:6px; color:var(--gold-primary);"></i> Trang ${pad(lightboxIndex + 1)} / ${pad(albumPhotos.length)}`;
    }
  }

  return {
    init,
    open: openLightbox,
    close: closeLightbox,
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide,
    getPhotos: () => albumPhotos,
    DEFAULT_ALBUM_PHOTOS
  };
})();

document.addEventListener('DOMContentLoaded', WeddingGallery.init);
