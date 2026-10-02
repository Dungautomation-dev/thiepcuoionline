/**
 * Wedding Photo Gallery & Automated Slideshow Engine
 * 20-Photo Romantic Slideshow with Ken-Burns Transition, Thumbnails & Fullscreen Lightbox
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
  const slideDuration = 3800; // 3.8 seconds per slide

  // DOM Elements
  let mainSlideImg = null;
  let mainSlideTitle = null;
  let mainSlideCaption = null;
  let slideCounter = null;
  let progressBar = null;
  let playPauseBtn = null;
  let thumbnailsContainer = null;
  let mosaicContainer = null;
  let lightboxEl = null;
  let lightboxImg = null;
  let lightboxTitle = null;
  let lightboxCounter = null;

  function init() {
    loadPhotosData();
    cacheDOMElements();
    renderSlideshow();
    renderThumbnails();
    renderMosaicGrid();
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
    mainSlideImg = document.getElementById('slideshow-current-img');
    mainSlideTitle = document.getElementById('slideshow-slide-title');
    mainSlideCaption = document.getElementById('slideshow-slide-caption');
    slideCounter = document.getElementById('slideshow-slide-counter');
    progressBar = document.getElementById('slideshow-progress-bar');
    playPauseBtn = document.getElementById('btn-slideshow-playpause');
    thumbnailsContainer = document.getElementById('slideshow-thumbnails');
    mosaicContainer = document.getElementById('gallery-mosaic-grid');

    lightboxEl = document.getElementById('lightbox-modal');
    lightboxImg = document.getElementById('lightbox-image');
    lightboxTitle = document.getElementById('lightbox-title');
    lightboxCounter = document.getElementById('lightbox-counter');
  }

  function renderSlideshow() {
    if (!albumPhotos || albumPhotos.length === 0) return;
    const item = albumPhotos[currentIndex];
    if (!item) return;

    if (mainSlideImg) {
      // Trigger Ken-Burns fade-in animation
      mainSlideImg.classList.remove('slide-active');
      void mainSlideImg.offsetWidth; // Force reflow
      mainSlideImg.src = item.src;
      mainSlideImg.alt = item.title || 'Ảnh cưới';
      mainSlideImg.classList.add('slide-active');
    }

    if (mainSlideTitle) {
      mainSlideTitle.textContent = item.title || `Khoảnh Khắc Kỷ Niệm #${currentIndex + 1}`;
    }

    if (mainSlideCaption) {
      mainSlideCaption.textContent = item.caption || 'Hành trình tình yêu đong đầy hạnh phúc.';
    }

    if (slideCounter) {
      const pad = (n) => String(n).padStart(2, '0');
      slideCounter.textContent = `${pad(currentIndex + 1)} / ${pad(albumPhotos.length)}`;
    }

    updateActiveThumbnail();
    resetProgressBar();
  }

  function renderThumbnails() {
    if (!thumbnailsContainer) return;
    thumbnailsContainer.innerHTML = albumPhotos.map((photo, idx) => `
      <div class="slideshow-thumb-item ${idx === currentIndex ? 'active' : ''}" data-index="${idx}" title="${photo.title || 'Ảnh ' + (idx + 1)}">
        <img src="${photo.src}" alt="${photo.title || 'Ảnh ' + (idx + 1)}" loading="lazy">
        <span class="thumb-index-badge">${idx + 1}</span>
      </div>
    `).join('');

    const thumbs = thumbnailsContainer.querySelectorAll('.slideshow-thumb-item');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const idx = parseInt(thumb.getAttribute('data-index'), 10);
        goToSlide(idx);
      });
    });
  }

  function updateActiveThumbnail() {
    if (!thumbnailsContainer) return;
    const thumbs = thumbnailsContainer.querySelectorAll('.slideshow-thumb-item');
    thumbs.forEach((t, i) => {
      if (i === currentIndex) {
        t.classList.add('active');
        t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        t.classList.remove('active');
      }
    });
  }

  function renderMosaicGrid() {
    if (!mosaicContainer) return;
    mosaicContainer.innerHTML = albumPhotos.map((photo, idx) => `
      <div class="mosaic-photo-card" data-index="${idx}">
        <div class="mosaic-img-box">
          <img src="${photo.src}" alt="${photo.title || 'Khoảnh khắc'}" loading="lazy">
          <div class="mosaic-overlay">
            <span class="mosaic-index-badge"><i class="fa-solid fa-heart"></i> #${idx + 1}</span>
            <div class="mosaic-info">
              <h4 class="mosaic-title">${photo.title || 'Kỷ Niệm Ngày Chung Đôi'}</h4>
              <p class="mosaic-desc">${photo.caption || 'Chạm để chiêm ngưỡng ảnh full'}</p>
            </div>
            <div class="mosaic-zoom-icon">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    const cards = mosaicContainer.querySelectorAll('.mosaic-photo-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        openLightbox(idx);
      });
    });
  }

  function setupEventListeners() {
    // Prev / Next Buttons
    const prevBtn = document.getElementById('btn-slideshow-prev');
    const nextBtn = document.getElementById('btn-slideshow-next');

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Play/Pause Button
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', toggleAutoPlay);
    }

    // Fullscreen Button
    const fsBtn = document.getElementById('btn-slideshow-fullscreen');
    if (fsBtn) {
      fsBtn.addEventListener('click', toggleFullscreen);
    }

    // Pause on Hover
    const stage = document.getElementById('slideshow-stage');
    if (stage) {
      stage.addEventListener('mouseenter', () => {
        pauseAutoPlay(false);
      });
      stage.addEventListener('mouseleave', () => {
        if (isPlaying) startAutoPlay();
      });
      stage.addEventListener('click', (e) => {
        if (!e.target.closest('.slideshow-ctrl-btn')) {
          openLightbox(currentIndex);
        }
      });
    }

    // Touch Swipe for Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    if (stage) {
      stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      stage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const threshold = 40;
      if (touchEndX < touchStartX - threshold) {
        nextSlide();
      } else if (touchEndX > touchStartX + threshold) {
        prevSlide();
      }
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
      }
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
      playPauseBtn.title = 'Tạm dừng tự động chuyển ảnh';
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
        playPauseBtn.title = 'Tiếp tục tự động chuyển ảnh';
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
    renderSlideshow();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + albumPhotos.length) % albumPhotos.length;
    renderSlideshow();
  }

  function goToSlide(index) {
    if (index < 0 || index >= albumPhotos.length) return;
    currentIndex = index;
    renderSlideshow();
    if (isPlaying) {
      startAutoPlay();
    }
  }

  function toggleFullscreen() {
    const container = document.getElementById('wedding-slideshow-container');
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
      lightboxCounter.textContent = `${pad(lightboxIndex + 1)} / ${pad(albumPhotos.length)}`;
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
