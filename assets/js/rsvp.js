/**
 * RSVP (Xác Nhận Tham Dự) & Guestbook Wishes System
 * Author: Dung Automation
 */

const WeddingRSVP = (function () {
  const STORAGE_KEY = 'thiepcuoi_rsvp_list';

  // Default seed wishes so guestbook looks warm and inviting
  const DEFAULT_WISHES = [
    {
      id: 1,
      name: 'Vợ chồng anh Tuấn & chị Mai',
      side: 'Nhà Trai',
      attending: 'yes',
      guestsCount: 2,
      message: 'Chúc hai em trăm năm hạnh phúc, đầu bạc răng long, sớm đón thiên thần nhỏ nhé! 🎉🥂',
      createdAt: '2026-10-01T08:30:00.000Z'
    },
    {
      id: 2,
      name: 'Bạn thân Thanh Trúc',
      side: 'Nhà Gái',
      attending: 'yes',
      guestsCount: 1,
      message: 'Mừng cho cô dâu xinh đẹp nhất quả đất! Chúc hai bạn luôn ngọt ngào như ngày đầu yêu nhau! 💖🌸',
      createdAt: '2026-10-01T09:15:00.000Z'
    },
    {
      id: 3,
      name: 'Gia đình Bác Hùng',
      side: 'Nhà Trai',
      attending: 'yes',
      guestsCount: 3,
      message: 'Chúc mừng hạnh phúc hai cháu! Chúc gia đình nhỏ luôn tràn ngập tiếng cười và tài lộc dồi dào! 💐✨',
      createdAt: '2026-10-01T11:00:00.000Z'
    }
  ];

  function getRSVPList() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_WISHES));
        return DEFAULT_WISHES;
      }
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_WISHES;
    }
  }

  function saveRSVPList(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Cannot save RSVP to localStorage', e);
    }
  }

  function init() {
    renderWishes();

    const form = document.getElementById('rsvp-form');
    if (form) {
      form.addEventListener('submit', handleSubmit);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('rsvp-name');
    const sideInput = document.querySelector('input[name="rsvp-side"]:checked');
    const attendInput = document.querySelector('input[name="rsvp-attending"]:checked');
    const countInput = document.getElementById('rsvp-count');
    const messageInput = document.getElementById('rsvp-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const side = sideInput ? sideInput.value : 'Nhà Trai';
    const attending = attendInput ? attendInput.value : 'yes';
    const guestsCount = countInput ? parseInt(countInput.value, 10) : 1;
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name) {
      showToast('⚠️ Vui lòng nhập họ và tên của bạn.');
      if (nameInput) nameInput.focus();
      return;
    }

    const newEntry = {
      id: Date.now(),
      name,
      side,
      attending,
      guestsCount: attending === 'yes' ? guestsCount : 0,
      message: message || (attending === 'yes' ? 'Chúc hai bạn trăm năm hạnh phúc!' : 'Rất tiếc không thể đến chung vui, chúc hai bạn trăm năm hạnh phúc!'),
      createdAt: new Date().toISOString()
    };

    const list = getRSVPList();
    list.unshift(newEntry);
    saveRSVPList(list);

    // Heart burst celebration
    if (window.triggerHeartBurst) {
      window.triggerHeartBurst(window.innerWidth / 2, window.innerHeight * 0.4, 35);
    }

    if (attending === 'yes') {
      showToast('💌 Cảm ơn bạn! Thông tin xác nhận đã được gửi đến dâu rể 🎉');
    } else {
      showToast('💐 Cảm ơn lời chúc ngọt ngào của bạn gửi tới dâu rể!');
    }

    // Reset form inputs except name if from URL
    if (messageInput) messageInput.value = '';
    renderWishes();
  }

  function renderWishes() {
    const listEl = document.getElementById('wishes-list');
    if (!listEl) return;

    const list = getRSVPList();
    if (list.length === 0) {
      listEl.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:15px;">Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!</p>';
      return;
    }

    listEl.innerHTML = list.map(item => `
      <div class="wish-item">
        <div class="wish-author">
          <span class="wish-name"><i class="fa-solid fa-heart" style="color:var(--rose-blush); margin-right:6px;"></i>${escapeHTML(item.name)}</span>
          <span class="wish-badge">${item.side || 'Khách Quý'} • ${item.attending === 'yes' ? 'Tham dự (' + (item.guestsCount || 1) + ' người)' : 'Gửi lời chúc'}</span>
        </div>
        <div class="wish-text">${escapeHTML(item.message)}</div>
      </div>
    `).join('');
  }

  function escapeHTML(str) {
    return String(str || '').replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function showToast(msg) {
    let toast = document.getElementById('toast-notification');
    if (!toast) return;
    const textEl = toast.querySelector('span') || toast;
    textEl.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  return {
    init,
    getRSVPList,
    saveRSVPList,
    renderWishes,
    showToast
  };
})();

document.addEventListener('DOMContentLoaded', WeddingRSVP.init);
