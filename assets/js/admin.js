/**
 * Wedding Admin Panel & Batch Link Generator
 * Author: Dung Automation
 */

const WeddingAdmin = (function () {
  const CONFIG_KEY = 'thiepcuoi_wedding_config';

  // Default Wedding Details Configuration
  const DEFAULT_CONFIG = {
    groom: {
      name: 'Mạnh Dũng',
      fullName: 'Nguyễn Mạnh Dũng',
      father: 'Nguyễn Văn Tuấn',
      mother: 'Trần Thị Thu',
      phone: '0988 123 456',
      facebook: 'https://facebook.com',
      bankName: 'MB Bank (Quân Đội)',
      bankNumber: '0988123456',
      bankAccountName: 'NGUYEN MANH DUNG'
    },
    bride: {
      name: 'Mai Chi',
      fullName: 'Lê Mai Chi',
      father: 'Lê Quang Huy',
      mother: 'Phạm Thị Lan',
      phone: '0977 654 321',
      facebook: 'https://facebook.com',
      bankName: 'Techcombank',
      bankNumber: '1903678910',
      bankAccountName: 'LE MAI CHI'
    },
    weddingDate: '2026-11-20T11:00:00', // Default date for countdown
    ceremonyGroom: {
      title: 'Lễ Thành Hôn (Tiệc Nhà Trai)',
      time: '11:00 - Thứ Bảy, Ngày 20/11/2026',
      venue: 'Trung Tâm Tiệc Cưới Trống Đồng Palace',
      address: 'Số 489 Hoàng Quốc Việt, Cầu Giấy, Hà Nội',
      mapUrl: 'https://maps.google.com/?q=Trong+Dong+Palace+Hoang+Quoc+Viet'
    },
    ceremonyBride: {
      title: 'Lễ Vu Quy (Tiệc Nhà Gái)',
      time: '09:00 - Thứ Sáu, Ngày 19/11/2026',
      venue: 'Tư Gia Nhà Gái',
      address: 'Số 68 Phố Huế, Hai Bà Trưng, Hà Nội',
      mapUrl: 'https://maps.google.com/?q=68+Pho+Hue+Hai+Ba+Trung+Ha+Noi'
    }
  };

  function getConfig() {
    try {
      const data = localStorage.getItem(CONFIG_KEY);
      if (!data) return DEFAULT_CONFIG;
      return Object.assign({}, DEFAULT_CONFIG, JSON.parse(data));
    } catch (e) {
      return DEFAULT_CONFIG;
    }
  }

  function saveConfig(cfg) {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
    } catch (e) {
      console.error('Cannot save config to localStorage', e);
    }
  }

  function init() {
    // If admin elements exist on current page (admin.html or admin modal)
    initBatchGenerator();
    initRSVPDashboard();
    initInfoEditor();
  }

  /* --------------------------------------------------------------------------
     1. Batch Guest Link Generator
     -------------------------------------------------------------------------- */
  function initBatchGenerator() {
    const btnGen = document.getElementById('btn-generate-batch');
    if (!btnGen) return;

    btnGen.addEventListener('click', generateBatchLinks);

    const btnExportCSV = document.getElementById('btn-export-links-csv');
    if (btnExportCSV) {
      btnExportCSV.addEventListener('click', exportGeneratedLinksCSV);
    }
  }

  let generatedLinksList = [];

  function generateBatchLinks() {
    const textarea = document.getElementById('admin-guest-input');
    const sideSelect = document.getElementById('admin-default-side');
    const prefixSelect = document.getElementById('admin-prefix');
    const outputContainer = document.getElementById('admin-batch-output');
    const resultsCountEl = document.getElementById('admin-batch-count');

    if (!textarea || !outputContainer) return;

    const rawText = textarea.value.trim();
    if (!rawText) {
      alert('Vui lòng nhập ít nhất một khách mời vào danh sách.');
      textarea.focus();
      return;
    }

    const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const side = sideSelect ? sideSelect.value : 'groom';
    const prefix = prefixSelect ? prefixSelect.value : 'Kính mời: ';

    // Get current base URL without queries
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/admin(\.html)?$/, '/index.html').replace(/\/admin(\.html)?$/, '/');

    generatedLinksList = lines.map((name, index) => {
      const formattedName = (prefix ? prefix : '') + name;
      const query = new URLSearchParams();
      query.set('to', formattedName);
      if (side !== 'all') {
        query.set('side', side);
      }
      const fullUrl = `${baseUrl}?${query.toString()}`;

      // Compose gentle personalized invitation message for Zalo/SMS
      const cfg = getConfig();
      const message = `Trân trọng gửi thiệp cưới đến ${formattedName}! 💌\n` +
        `Mạnh Dũng & Mai Chi rất mong được đón tiếp bạn trong ngày vui trọng đại của chúng mình vào ngày ${cfg.ceremonyGroom.time}.\n\n` +
        `Xem thông tin chi tiết và thiệp cưới tại: ${fullUrl}\n\n` +
        `Sự hiện diện của bạn là niềm hạnh phúc lớn nhất của chúng mình! 💐✨`;

      return {
        id: index + 1,
        guestName: name,
        fullGreeting: formattedName,
        side: side === 'groom' ? 'Nhà Trai' : (side === 'bride' ? 'Nhà Gái' : 'Chung'),
        url: fullUrl,
        message: message
      };
    });

    if (resultsCountEl) {
      resultsCountEl.textContent = `Đã tạo thành công ${generatedLinksList.length} đường link thiệp cưới cá nhân hóa`;
    }

    renderBatchLinksTable(generatedLinksList);
  }

  function renderBatchLinksTable(list) {
    const tableBody = document.getElementById('admin-links-tbody');
    if (!tableBody) return;

    if (list.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px;">Chưa có link nào được tạo.</td></tr>';
      return;
    }

    tableBody.innerHTML = list.map(item => `
      <tr>
        <td style="font-weight:600; color:var(--ruby-primary);">${item.id}. ${escapeHTML(item.guestName)}</td>
        <td><span class="wish-badge">${item.side}</span></td>
        <td>
          <input type="text" class="form-control" value="${item.url}" readonly style="font-size:0.8rem; padding:6px 10px;" id="link-inp-${item.id}">
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="tool-btn" style="width:34px; height:34px; font-size:0.85rem;" onclick="WeddingAdmin.copyText('${escapeAttr(item.url)}', 'Đã chép link thiệp!')" title="Sao chép Link">
              <i class="fa-solid fa-copy"></i>
            </button>
            <button class="tool-btn" style="width:34px; height:34px; font-size:0.85rem;" onclick="WeddingAdmin.copyText('${escapeAttr(item.message)}', 'Đã chép tin nhắn Zalo kèm link!')" title="Sao chép tin nhắn Zalo kèm link">
              <i class="fa-solid fa-comment-sms"></i>
            </button>
            <a href="${item.url}" target="_blank" class="tool-btn" style="width:34px; height:34px; font-size:0.85rem; text-decoration:none;" title="Xem trước thiệp">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </div>
        </td>
      </tr>
    `).join('');
  }

  function exportGeneratedLinksCSV() {
    if (generatedLinksList.length === 0) {
      alert('Chưa có danh sách link để xuất.');
      return;
    }

    let csvContent = '\uFEFF"STT","Khách Mời","Xưng Hô","Phía","Đường Link Thiệp Mời"\n';
    generatedLinksList.forEach(item => {
      csvContent += `"${item.id}","${item.guestName}","${item.fullGreeting}","${item.side}","${item.url}"\n`;
    });

    downloadCSV(csvContent, 'danh_sach_link_thiep_cuoi.csv');
  }

  /* --------------------------------------------------------------------------
     2. RSVP Attendance Dashboard
     -------------------------------------------------------------------------- */
  function initRSVPDashboard() {
    renderRSVPTable();

    const btnExport = document.getElementById('btn-export-rsvp-csv');
    if (btnExport) {
      btnExport.addEventListener('click', exportRSVPCSV);
    }
  }

  function renderRSVPTable() {
    const list = WeddingRSVP.getRSVPList ? WeddingRSVP.getRSVPList() : [];
    
    // Stats calculation
    let totalConfirmed = 0;
    let totalDeclined = 0;
    let totalHeadcount = 0;

    list.forEach(r => {
      if (r.attending === 'yes') {
        totalConfirmed++;
        totalHeadcount += (parseInt(r.guestsCount, 10) || 1);
      } else {
        totalDeclined++;
      }
    });

    const statTotalEl = document.getElementById('stat-total-rsvp');
    const statAttendEl = document.getElementById('stat-attend-rsvp');
    const statDeclineEl = document.getElementById('stat-decline-rsvp');
    const statHeadcountEl = document.getElementById('stat-headcount-rsvp');

    if (statTotalEl) statTotalEl.textContent = list.length;
    if (statAttendEl) statAttendEl.textContent = totalConfirmed;
    if (statDeclineEl) statDeclineEl.textContent = totalDeclined;
    if (statHeadcountEl) statHeadcountEl.textContent = totalHeadcount;

    const tbody = document.getElementById('admin-rsvp-tbody');
    if (!tbody) return;

    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px;">Chưa có phản hồi nào.</td></tr>';
      return;
    }

    tbody.innerHTML = list.map((item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td style="font-weight:700; color:var(--ruby-primary);">${escapeHTML(item.name)}</td>
        <td><span class="wish-badge">${escapeHTML(item.side || 'Nhà Trai')}</span></td>
        <td>
          ${item.attending === 'yes' 
            ? `<span style="color:#2e7d32; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Tham dự (${item.guestsCount || 1} người)</span>` 
            : `<span style="color:#c62828;"><i class="fa-solid fa-circle-xmark"></i> Bận không đến</span>`}
        </td>
        <td style="font-size:0.85rem; max-width:240px;">${escapeHTML(item.message)}</td>
        <td>
          <button class="tool-btn" style="width:32px; height:32px; font-size:0.75rem; color:#c62828;" onclick="WeddingAdmin.deleteRSVPItem(${item.id})" title="Xóa phản hồi này">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  function deleteRSVPItem(id) {
    if (!confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) return;
    let list = WeddingRSVP.getRSVPList();
    list = list.filter(item => item.id !== id);
    WeddingRSVP.saveRSVPList(list);
    renderRSVPTable();
    if (WeddingRSVP.renderWishes) WeddingRSVP.renderWishes();
  }

  function exportRSVPCSV() {
    const list = WeddingRSVP.getRSVPList();
    if (list.length === 0) {
      alert('Chưa có dữ liệu phản hồi để xuất.');
      return;
    }

    let csvContent = '\uFEFF"STT","Họ Và Tên","Phía","Trạng Thái","Số Người","Lời Chúc","Thời Gian"\n';
    list.forEach((item, idx) => {
      const statusText = item.attending === 'yes' ? 'Tham dự' : 'Không tham dự';
      csvContent += `"${idx + 1}","${item.name}","${item.side}","${statusText}","${item.guestsCount || 0}","${item.message}","${item.createdAt || ''}"\n`;
    });

    downloadCSV(csvContent, 'danh_sach_xac_nhan_tham_du_rsvp.csv');
  }

  /* --------------------------------------------------------------------------
     3. Wedding Info Editor
     -------------------------------------------------------------------------- */
  function initInfoEditor() {
    const form = document.getElementById('admin-config-form');
    if (!form) return;

    const cfg = getConfig();
    populateForm(cfg);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newCfg = {
        groom: {
          name: document.getElementById('cfg-groom-name').value.trim() || cfg.groom.name,
          fullName: document.getElementById('cfg-groom-fullname').value.trim() || cfg.groom.fullName,
          father: document.getElementById('cfg-groom-father').value.trim(),
          mother: document.getElementById('cfg-groom-mother').value.trim(),
          phone: document.getElementById('cfg-groom-phone').value.trim(),
          bankName: document.getElementById('cfg-groom-bank').value.trim(),
          bankNumber: document.getElementById('cfg-groom-banknum').value.trim(),
          bankAccountName: document.getElementById('cfg-groom-bankacc').value.trim()
        },
        bride: {
          name: document.getElementById('cfg-bride-name').value.trim() || cfg.bride.name,
          fullName: document.getElementById('cfg-bride-fullname').value.trim() || cfg.bride.fullName,
          father: document.getElementById('cfg-bride-father').value.trim(),
          mother: document.getElementById('cfg-bride-mother').value.trim(),
          phone: document.getElementById('cfg-bride-phone').value.trim(),
          bankName: document.getElementById('cfg-bride-bank').value.trim(),
          bankNumber: document.getElementById('cfg-bride-banknum').value.trim(),
          bankAccountName: document.getElementById('cfg-bride-bankacc').value.trim()
        },
        weddingDate: document.getElementById('cfg-wedding-date').value || cfg.weddingDate,
        ceremonyGroom: {
          title: document.getElementById('cfg-ceremony-groom-title').value.trim(),
          time: document.getElementById('cfg-ceremony-groom-time').value.trim(),
          venue: document.getElementById('cfg-ceremony-groom-venue').value.trim(),
          address: document.getElementById('cfg-ceremony-groom-address').value.trim(),
          mapUrl: document.getElementById('cfg-ceremony-groom-map').value.trim()
        },
        ceremonyBride: {
          title: document.getElementById('cfg-ceremony-bride-title').value.trim(),
          time: document.getElementById('cfg-ceremony-bride-time').value.trim(),
          venue: document.getElementById('cfg-ceremony-bride-venue').value.trim(),
          address: document.getElementById('cfg-ceremony-bride-address').value.trim(),
          mapUrl: document.getElementById('cfg-ceremony-bride-map').value.trim()
        }
      };

      saveConfig(newCfg);
      alert('Đã lưu thông tin đám cưới thành công! Các trang sẽ cập nhật thông tin mới nhất.');
      window.location.reload();
    });
  }

  function populateForm(cfg) {
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('cfg-groom-name', cfg.groom.name);
    setVal('cfg-groom-fullname', cfg.groom.fullName);
    setVal('cfg-groom-father', cfg.groom.father);
    setVal('cfg-groom-mother', cfg.groom.mother);
    setVal('cfg-groom-phone', cfg.groom.phone);
    setVal('cfg-groom-bank', cfg.groom.bankName);
    setVal('cfg-groom-banknum', cfg.groom.bankNumber);
    setVal('cfg-groom-bankacc', cfg.groom.bankAccountName);

    setVal('cfg-bride-name', cfg.bride.name);
    setVal('cfg-bride-fullname', cfg.bride.fullName);
    setVal('cfg-bride-father', cfg.bride.father);
    setVal('cfg-bride-mother', cfg.bride.mother);
    setVal('cfg-bride-phone', cfg.bride.phone);
    setVal('cfg-bride-bank', cfg.bride.bankName);
    setVal('cfg-bride-banknum', cfg.bride.bankNumber);
    setVal('cfg-bride-bankacc', cfg.bride.bankAccountName);

    setVal('cfg-wedding-date', cfg.weddingDate);

    setVal('cfg-ceremony-groom-title', cfg.ceremonyGroom.title);
    setVal('cfg-ceremony-groom-time', cfg.ceremonyGroom.time);
    setVal('cfg-ceremony-groom-venue', cfg.ceremonyGroom.venue);
    setVal('cfg-ceremony-groom-address', cfg.ceremonyGroom.address);
    setVal('cfg-ceremony-groom-map', cfg.ceremonyGroom.mapUrl);

    setVal('cfg-ceremony-bride-title', cfg.ceremonyBride.title);
    setVal('cfg-ceremony-bride-time', cfg.ceremonyBride.time);
    setVal('cfg-ceremony-bride-venue', cfg.ceremonyBride.venue);
    setVal('cfg-ceremony-bride-address', cfg.ceremonyBride.address);
    setVal('cfg-ceremony-bride-map', cfg.ceremonyBride.mapUrl);
  }

  /* --------------------------------------------------------------------------
     Utilities
     -------------------------------------------------------------------------- */
  function copyText(text, successMsg = 'Đã sao chép vào bộ nhớ tạm!') {
    navigator.clipboard.writeText(text)
      .then(() => {
        if (WeddingRSVP.showToast) {
          WeddingRSVP.showToast('📋 ' + successMsg);
        } else {
          alert(successMsg);
        }
      })
      .catch(() => {
        const inp = document.createElement('textarea');
        inp.value = text;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand('copy');
        document.body.removeChild(inp);
        alert(successMsg);
      });
  }

  function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function escapeHTML(str) {
    return String(str || '').replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function escapeAttr(str) {
    return String(str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  return {
    init,
    getConfig,
    saveConfig,
    copyText,
    deleteRSVPItem,
    renderRSVPTable
  };
})();

document.addEventListener('DOMContentLoaded', WeddingAdmin.init);
