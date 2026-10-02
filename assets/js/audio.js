/**
 * Wedding Background Music Controller & Vinyl Dock
 * Author: Dung Automation
 */

const WeddingAudio = (function () {
  const playlist = [
    { title: 'Until I Found You (Romantic Piano)', src: 'assets/audio/wedding-melody-1.mp3' },
    { title: 'A Thousand Years (Acoustic Strings)', src: 'assets/audio/wedding-melody-2.mp3' },
    { title: 'Canon in D (Orchestral Wedding)', src: 'assets/audio/wedding-melody-3.mp3' }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let audioEl = null;
  let vinylEl = null;
  let playBtnIcon = null;
  let titleEl = null;

  function init() {
    audioEl = document.getElementById('main-audio');
    vinylEl = document.getElementById('vinyl-disc');
    playBtnIcon = document.getElementById('dock-play-icon');
    titleEl = document.getElementById('dock-song-title');

    if (!audioEl) return;

    loadTrack(currentTrackIndex);

    audioEl.addEventListener('ended', next);
  }

  function loadTrack(index) {
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;
    currentTrackIndex = index;

    const track = playlist[currentTrackIndex];
    audioEl.src = track.src;
    if (titleEl) {
      titleEl.textContent = track.title;
    }
  }

  function play() {
    if (!audioEl) return;
    audioEl.play()
      .then(() => {
        isPlaying = true;
        updateUI();
      })
      .catch((err) => {
        console.warn('Audio play prevented by browser policy:', err);
      });
  }

  function pause() {
    if (!audioEl) return;
    audioEl.pause();
    isPlaying = false;
    updateUI();
  }

  function toggle() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function next() {
    loadTrack(currentTrackIndex + 1);
    if (isPlaying) play();
  }

  function prev() {
    loadTrack(currentTrackIndex - 1);
    if (isPlaying) play();
  }

  function updateUI() {
    if (vinylEl) {
      if (isPlaying) {
        vinylEl.classList.add('spinning');
      } else {
        vinylEl.classList.remove('spinning');
      }
    }
    if (playBtnIcon) {
      if (isPlaying) {
        playBtnIcon.className = 'fa-solid fa-pause';
      } else {
        playBtnIcon.className = 'fa-solid fa-play';
      }
    }
  }

  return {
    init,
    play,
    pause,
    toggle,
    next,
    prev,
    isPlaying: () => isPlaying
  };
})();

document.addEventListener('DOMContentLoaded', WeddingAudio.init);
