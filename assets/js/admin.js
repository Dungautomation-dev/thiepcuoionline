/**
 * Wedding Admin Panel & Batch Link Generator
 * Author: Dung Automation
 */

const WeddingAdmin = (function () {
  const CONFIG_KEY = 'thiepcuoi_wedding_config';

  // 10 Distinct Wedding Theme & Layout Presentation Archetypes
  const THEMES_CATALOG = [
    {
      id: 'vogue-editorial',
      alias: ['classic-bw'],
      name: 'Tạp Chí Thời Trang (Editorial Magazine)',
      badge: 'High Fashion',
      desc: 'Bìa tạp chí VOGUE, chữ Serif khổ lớn, barcode ấn phẩm, layout bất đối xứng sắc sảo',
      icon: 'fa-solid fa-newspaper',
      colors: ['#111111', '#c5a059', '#faf9f6']
    },
    {
      id: 'traditional-hy',
      alias: ['lotus-traditional'],
      name: 'Cổ Điển Á Đông (Song Hỷ Hoàng Cung)',
      badge: 'Truyền Thống',
      desc: 'Chữ Song Hỷ 囍 mạ vàng, họa tiết gấm hoa sen & mây cát tường đỏ son truyền thống',
      icon: 'fa-solid fa-scroll',
      colors: ['#b81d24', '#f1c40f', '#fff5f5']
    },
    {
      id: 'romantic-arch',
      alias: ['rose-gold'],
      name: 'Vườn Địa Đàng (Romantic Floral Arch)',
      badge: 'Lãng Mạn',
      desc: 'Khung vòm Roman uốn cong duyên dáng, hoa hồng pastel, chữ viết tay bay bổng',
      icon: 'fa-solid fa-archway',
      colors: ['#d88a95', '#ff9ebb', '#fdf5f7']
    },
    {
      id: 'vintage-newspaper',
      alias: [],
      name: 'Nhật Báo Tình Yêu (The Wedding Times)',
      badge: 'Vintage 1920s',
      desc: 'Phong cách báo chí cổ điển 3 cột, font chữ máy đánh chữ, tem bưu điện & dấu mộc đỏ',
      icon: 'fa-solid fa-stamp',
      colors: ['#2c241d', '#8b5a2b', '#f5ede0']
    },
    {
      id: 'cinematic-noir',
      alias: ['starry-night'],
      name: 'Thước Phim Điện Ảnh (Cinema Spotlight)',
      badge: 'Điện Ảnh 35mm',
      desc: 'Khung dải phim 35mm Hollywood, nền tối nhung sang trọng, vé xem phim VIP Gold',
      icon: 'fa-solid fa-film',
      colors: ['#0b0d13', '#ffd700', '#1c2230']
    },
    {
      id: 'santorini-breeze',
      alias: ['ocean-blue'],
      name: 'Địa Trung Hải (Santorini Azure Coast)',
      badge: 'Biển Xanh',
      desc: 'Mái vòm xanh Coban, tường trắng tinh khôi Hy Lạp, giàn hoa giấy Bougainvillea',
      icon: 'fa-solid fa-water',
      colors: ['#0f3b5f', '#0077b6', '#f2f8fc']
    },
    {
      id: 'boho-rustic',
      alias: ['terracotta'],
      name: 'Đồi Cỏ Cháy (Boho Pampas Grass)',
      badge: 'Bohemian',
      desc: 'Cam đất nung terracotta, lá cọ lau khô pampas, góc bo organic mộc mạc',
      icon: 'fa-solid fa-feather',
      colors: ['#a04000', '#d97d4a', '#faf3ed']
    },
    {
      id: 'royal-baroque',
      alias: ['champagne-gold', 'burgundy'],
      name: 'Hoàng Gia Châu Âu (Versailles Baroque)',
      badge: 'Quý Tộc',
      desc: 'Họa tiết mạ vàng Rococo 24K, viền gương soi hoàng gia, dải lụa & con dấu sáp 3D',
      icon: 'fa-solid fa-crown',
      colors: ['#d4af37', '#85142b', '#faf7f2']
    },
    {
      id: 'polaroid-scrapbook',
      alias: ['lavender'],
      name: 'Nhật Ký Kỷ Niệm (Polaroid Keepsake)',
      badge: 'Dễ Thương',
      desc: 'Ảnh Polaroid góc nghiêng kẹp ghim, băng dính washi tape & lời ghi chú viết tay',
      icon: 'fa-solid fa-paperclip',
      colors: ['#4a3f55', '#bb8fce', '#faf6fc']
    },
    {
      id: 'minimal-glass',
      alias: ['emerald-green'],
      name: 'Kính Mờ Tối Giản (Modern Glassmorphism)',
      badge: 'Đương Đại',
      desc: 'Kính mờ phủ sương frosted glass, ánh cực quang Aurora, Swiss minimalism siêu sạch',
      icon: 'fa-solid fa-cubes',
      colors: ['#1f4e38', '#528c68', '#f4faf6']
    }
  ];

  // 20 Romantic Pre-Loaded Wedding Album Photos with Captions
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

  // Default Wedding Details Configuration
  const DEFAULT_CONFIG = {
    theme: 'royal-baroque',
    images: {
      hero: 'assets/images/wedding-hero.jpg',
      groom: 'assets/images/groom.jpg',
      bride: 'assets/images/bride.jpg',
      rings: 'assets/images/wedding-rings.jpg',
      walk: 'assets/images/wedding-walk.jpg'
    },
    albumPhotos: DEFAULT_ALBUM_PHOTOS.slice(),
    guestMap: {},
    groom: {
      name: 'Tên Chú Rể',
      fullName: 'Họ và Tên Chú Rể',
      father: 'Thân Phụ Chú Rể',
      mother: 'Thân Mẫu Chú Rể',
      phone: '0988 123 456',
      facebook: 'https://facebook.com',
      bankName: 'MB Bank (Quân Đội)',
      bankNumber: '0988123456',
      bankAccountName: 'TEN CHU RE'
    },
    bride: {
      name: 'Tên Cô Dâu',
      fullName: 'Họ và Tên Cô Dâu',
      father: 'Thân Phụ Cô Dâu',
      mother: 'Thân Mẫu Cô Dâu',
      phone: '0977 654 321',
      facebook: 'https://facebook.com',
      bankName: 'Techcombank',
      bankNumber: '1903678910',
      bankAccountName: 'TEN CO DAU'
    },
    weddingDate: '2026-11-20T11:00:00',
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
      const parsed = JSON.parse(data);
      return Object.assign({}, DEFAULT_CONFIG, parsed, {
        images: Object.assign({}, DEFAULT_CONFIG.images, parsed.images || {}),
        albumPhotos: (Array.isArray(parsed.albumPhotos) && parsed.albumPhotos.length > 0) ? parsed.albumPhotos : DEFAULT_ALBUM_PHOTOS.slice(),
        guestMap: Object.assign({}, DEFAULT_CONFIG.guestMap, parsed.guestMap || {})
      });
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

  /* --------------------------------------------------------------------------
     Vietnamese Accent Removal & Slug Generation
     -------------------------------------------------------------------------- */
  function removeVietnameseTones(str) {
    str = String(str || '');
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }

  function slugify(text, mode = 'compact') {
    let clean = removeVietnameseTones(text).toLowerCase();
    clean = clean.replace(/&/g, 'va');
    clean = clean.replace(/[^a-z0-9\s-]/g, '');
    clean = clean.trim();

    if (mode === 'compact') {
      // ví dụ: ?to=tenkhachhang
      return clean.replace(/\s+/g, '');
    } else if (mode === 'hyphen') {
      // ví dụ: ?to=ten-khach-hang
      return clean.replace(/\s+/g, '-').replace(/-+/g, '-');
    } else {
      return encodeURIComponent(text);
    }
  }

  function init() {
    initTheme();
    initBatchGenerator();
    initThemeSelector();
    initImageCustomizer();
    initAlbum20Manager();
    initRSVPDashboard();
    initInfoEditor();
  }

  // Apply theme to body
  function initTheme() {
    const cfg = getConfig();
    if (cfg.theme) {
      document.body.setAttribute('data-theme', cfg.theme);
    }
  }

  /* --------------------------------------------------------------------------
     1. Batch Guest Link Generator (Rút Gọn Link ?to=tenkhachhang)
     -------------------------------------------------------------------------- */
  let generatedLinksList = [];

  function initBatchGenerator() {
    const btnGen = document.getElementById('btn-generate-batch');
    if (!btnGen) return;

    btnGen.addEventListener('click', generateBatchLinks);

    const btnExportCSV = document.getElementById('btn-export-links-csv');
    if (btnExportCSV) {
      btnExportCSV.addEventListener('click', exportGeneratedLinksCSV);
    }
  }

  function generateBatchLinks() {
    const textarea = document.getElementById('admin-guest-input');
    const sideSelect = document.getElementById('admin-default-side');
    const prefixSelect = document.getElementById('admin-prefix');
    const slugModeSelect = document.getElementById('admin-slug-mode');
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
    const slugMode = slugModeSelect ? slugModeSelect.value : 'compact';

    const baseUrl = window.location.origin + window.location.pathname.replace(/\/admin(\.html)?$/, '/index.html').replace(/\/admin(\.html)?$/, '/');
    const cfg = getConfig();

    generatedLinksList = lines.map((name, index) => {
      const fullGreeting = (prefix ? prefix : '') + name;
      const slug = slugify(name, slugMode);

      // Save mapping in config so the invitation page knows the full beautiful name with accents!
      cfg.guestMap[slug] = fullGreeting;

      const query = new URLSearchParams();
      query.set('to', slug);
      if (side !== 'all') {
        query.set('side', side);
      }
      const fullUrl = `${baseUrl}?${query.toString()}`;

      // Compose gentle invitation message for Zalo/SMS
      const message = `Trân trọng gửi thiệp cưới đến ${fullGreeting}! 💌\n` +
        `${cfg.groom.name} & ${cfg.bride.name} rất mong được đón tiếp bạn trong ngày vui trọng đại của chúng mình vào ngày ${cfg.ceremonyGroom.time}.\n\n` +
        `Xem thông tin chi tiết và thiệp cưới tại: ${fullUrl}\n\n` +
        `Sự hiện diện của bạn là niềm hạnh phúc lớn nhất của chúng mình! 💐✨`;

      return {
        id: index + 1,
        guestName: name,
        fullGreeting: fullGreeting,
        slug: slug,
        side: side === 'groom' ? 'Nhà Trai' : (side === 'bride' ? 'Nhà Gái' : 'Chung'),
        url: fullUrl,
        message: message
      };
    });

    // Save updated guestMap to persistent config
    saveConfig(cfg);

    if (resultsCountEl) {
      resultsCountEl.textContent = `Đã tạo thành công ${generatedLinksList.length} đường link thiệp cưới cá nhân hóa rút gọn`;
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

    let csvContent = '\uFEFF"STT","Khách Mời","Xưng Hô","Mã Rút Gọn","Phía","Đường Link Thiệp Mời"\n';
    generatedLinksList.forEach(item => {
      csvContent += `"${item.id}","${item.guestName}","${item.fullGreeting}","${item.slug}","${item.side}","${item.url}"\n`;
    });

    downloadCSV(csvContent, 'danh_sach_link_thiep_cuoi_rut_gon.csv');
  }

  /* --------------------------------------------------------------------------
     2. 10 Template Switcher (Chọn Mẫu Thiệp Cưới)
     -------------------------------------------------------------------------- */
  function initThemeSelector() {
    const container = document.getElementById('admin-theme-selector');
    if (!container) return;

    const cfg = getConfig();
    const activeTheme = cfg.theme || 'royal-baroque';

    container.innerHTML = THEMES_CATALOG.map(t => {
      const isSelected = (t.id === activeTheme) || (t.alias && t.alias.includes(activeTheme));
      return `
        <div class="theme-card-preview ${isSelected ? 'active' : ''}" onclick="WeddingAdmin.applyTheme('${t.id}')">
          <div class="theme-active-tag"><i class="fa-solid fa-check"></i> Đang Chọn</div>
          <div class="theme-badge-style"><i class="${t.icon || 'fa-solid fa-gem'}"></i> ${t.badge}</div>
          <div class="theme-chips-row">
            ${t.colors.map(c => `<span class="theme-color-chip" style="background:${c};"></span>`).join('')}
          </div>
          <div class="theme-preview-name">${t.name}</div>
          <div class="theme-preview-desc">${t.desc}</div>
        </div>
      `;
    }).join('');
  }

  function applyTheme(themeId) {
    const cfg = getConfig();
    cfg.theme = themeId;
    saveConfig(cfg);

    document.body.setAttribute('data-theme', themeId);
    initThemeSelector();

    if (WeddingRSVP.showToast) {
      WeddingRSVP.showToast('🎨 Đã áp dụng mẫu giao diện mới!');
    }
  }

  /* --------------------------------------------------------------------------
     3. Image Customizer (Tùy Chỉnh Hình Ảnh Cưới & Album 20 Ảnh Tự Động)
     -------------------------------------------------------------------------- */
  const IMAGE_SLOTS = [
    { key: 'hero', title: 'Ảnh Cổng Hoa / Banner Đầu Trang', defaultSrc: 'assets/images/wedding-hero.jpg' },
    { key: 'groom', title: 'Ảnh Chân Dung Chú Rể', defaultSrc: 'assets/images/groom.jpg' },
    { key: 'bride', title: 'Ảnh Chân Dung Cô Dâu', defaultSrc: 'assets/images/bride.jpg' },
    { key: 'rings', title: 'Ảnh Nhẫn Cưới & Hoa Hồng', defaultSrc: 'assets/images/wedding-rings.jpg' },
    { key: 'walk', title: 'Ảnh Dạo Bước Vườn Hồng', defaultSrc: 'assets/images/wedding-walk.jpg' }
  ];

  function initImageCustomizer() {
    const container = document.getElementById('admin-images-grid');
    if (!container) return;

    const cfg = getConfig();

    container.innerHTML = IMAGE_SLOTS.map(slot => {
      const currentSrc = (cfg.images && cfg.images[slot.key]) ? cfg.images[slot.key] : slot.defaultSrc;
      return `
        <div class="image-custom-card">
          <div class="image-custom-title">
            <i class="fa-solid fa-image"></i> ${slot.title}
          </div>
          <div class="image-preview-thumbnail" id="preview-box-${slot.key}">
            <img src="${currentSrc}" alt="${slot.title}" id="img-preview-${slot.key}">
          </div>
          <div class="image-custom-actions">
            <label class="btn-upload-label">
              <i class="fa-solid fa-upload"></i> Tải ảnh từ máy tính/điện thoại
              <input type="file" accept="image/*" onchange="WeddingAdmin.handleImageUpload('${slot.key}', this)">
            </label>
            <input type="url" class="form-control" placeholder="Hoặc dán URL ảnh online..." value="${currentSrc.startsWith('data:') ? '' : currentSrc}" onchange="WeddingAdmin.handleImageUrl('${slot.key}', this.value)" style="font-size:0.8rem; padding:6px 10px;">
            <button type="button" class="tool-btn" style="width:100%; height:32px; font-size:0.75rem; border-radius:8px;" onclick="WeddingAdmin.resetImage('${slot.key}')">
              <i class="fa-solid fa-rotate-left"></i> Đặt lại ảnh mặc định
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function handleImageUpload(key, inputEl) {
    if (!inputEl.files || !inputEl.files[0]) return;
    const file = inputEl.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64 = e.target.result;
      const cfg = getConfig();
      cfg.images[key] = base64;
      saveConfig(cfg);

      const imgEl = document.getElementById(`img-preview-${key}`);
      if (imgEl) imgEl.src = base64;

      if (WeddingRSVP.showToast) {
        WeddingRSVP.showToast('🖼️ Đã cập nhật ảnh thành công!');
      }
    };
    reader.readAsDataURL(file);
  }

  function handleImageUrl(key, url) {
    url = url.trim();
    if (!url) return;
    const cfg = getConfig();
    cfg.images[key] = url;
    saveConfig(cfg);

    const imgEl = document.getElementById(`img-preview-${key}`);
    if (imgEl) imgEl.src = url;

    if (WeddingRSVP.showToast) {
      WeddingRSVP.showToast('🖼️ Đã lưu URL ảnh mới!');
    }
  }

  function resetImage(key) {
    const slot = IMAGE_SLOTS.find(s => s.key === key);
    if (!slot) return;
    const cfg = getConfig();
    cfg.images[key] = slot.defaultSrc;
    saveConfig(cfg);

    const imgEl = document.getElementById(`img-preview-${key}`);
    if (imgEl) imgEl.src = slot.defaultSrc;

    if (WeddingRSVP.showToast) {
      WeddingRSVP.showToast('🔄 Đã đặt lại ảnh mẫu ban đầu!');
    }
  }

  /* --------------------------------------------------------------------------
     Album 20 Ảnh Cưới Trình Diễn Tự Động (Auto-Slideshow 20 Photos)
     -------------------------------------------------------------------------- */
  function initAlbum20Manager() {
    const container = document.getElementById('admin-album-20-grid');
    if (!container) return;

    const cfg = getConfig();
    const photos = (Array.isArray(cfg.albumPhotos) && cfg.albumPhotos.length > 0)
      ? cfg.albumPhotos
      : DEFAULT_ALBUM_PHOTOS;

    container.innerHTML = photos.map((p, idx) => {
      return `
        <div class="album-slot-card" id="slot-card-${idx}">
          <div class="album-slot-header">
            <span class="album-slot-num"><i class="fa-solid fa-heart" style="color:var(--ruby-primary);"></i> Khoảnh Khắc #${idx + 1}</span>
            <button type="button" class="btn-slot-reset" onclick="WeddingAdmin.resetAlbumPhoto(${idx})" title="Đặt lại ảnh mặc định slot này">
              <i class="fa-solid fa-rotate-left"></i> Đặt lại
            </button>
          </div>

          <div class="album-slot-preview" id="album-slot-box-${idx}">
            <img src="${p.src}" alt="${escapeHTML(p.title || 'Ảnh ' + (idx + 1))}" id="album-slot-img-${idx}">
          </div>

          <div class="album-slot-body">
            <div class="form-group" style="margin-bottom:8px;">
              <label class="btn-upload-label" style="font-size:0.75rem; padding:6px 10px; margin-bottom:6px;">
                <i class="fa-solid fa-upload"></i> Tải ảnh từ máy / điện thoại
                <input type="file" accept="image/*" onchange="WeddingAdmin.handleAlbumPhotoUpload(${idx}, this)">
              </label>
              <input type="url" class="form-control" placeholder="Hoặc dán URL ảnh online..." value="${p.src.startsWith('data:') ? '' : escapeAttr(p.src)}" onchange="WeddingAdmin.handleAlbumPhotoUrl(${idx}, this.value)" style="font-size:0.75rem; padding:5px 8px;">
            </div>

            <div class="form-group" style="margin-bottom:6px;">
              <input type="text" class="form-control" placeholder="Tiêu đề khoảnh khắc..." value="${escapeAttr(p.title || '')}" onchange="WeddingAdmin.handleAlbumPhotoText(${idx}, 'title', this.value)" style="font-size:0.75rem; padding:5px 8px; font-weight:600;">
            </div>

            <div class="form-group" style="margin-bottom:0;">
              <textarea class="form-control" rows="2" placeholder="Chú thích lãng mạn..." onchange="WeddingAdmin.handleAlbumPhotoText(${idx}, 'caption', this.value)" style="font-size:0.72rem; padding:4px 6px;">${escapeHTML(p.caption || '')}</textarea>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  function handleAlbumPhotoUpload(idx, inputEl) {
    if (!inputEl.files || !inputEl.files[0]) return;
    const file = inputEl.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64 = e.target.result;
      const cfg = getConfig();
      if (!Array.isArray(cfg.albumPhotos)) {
        cfg.albumPhotos = DEFAULT_ALBUM_PHOTOS.slice();
      }
      if (!cfg.albumPhotos[idx]) {
        cfg.albumPhotos[idx] = { src: '', title: `Khoảnh Khắc #${idx + 1}`, caption: '' };
      }
      cfg.albumPhotos[idx].src = base64;
      saveConfig(cfg);

      const imgEl = document.getElementById(`album-slot-img-${idx}`);
      if (imgEl) imgEl.src = base64;

      if (WeddingRSVP.showToast) {
        WeddingRSVP.showToast(`🖼️ Đã cập nhật ảnh #${idx + 1} vào album!`);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleAlbumPhotoUrl(idx, url) {
    url = url.trim();
    if (!url) return;
    const cfg = getConfig();
    if (!Array.isArray(cfg.albumPhotos)) {
      cfg.albumPhotos = DEFAULT_ALBUM_PHOTOS.slice();
    }
    if (!cfg.albumPhotos[idx]) {
      cfg.albumPhotos[idx] = { src: '', title: `Khoảnh Khắc #${idx + 1}`, caption: '' };
    }
    cfg.albumPhotos[idx].src = url;
    saveConfig(cfg);

    const imgEl = document.getElementById(`album-slot-img-${idx}`);
    if (imgEl) imgEl.src = url;

    if (WeddingRSVP.showToast) {
      WeddingRSVP.showToast(`🖼️ Đã lưu URL ảnh #${idx + 1}!`);
    }
  }

  function handleAlbumPhotoText(idx, field, value) {
    const cfg = getConfig();
    if (!Array.isArray(cfg.albumPhotos)) {
      cfg.albumPhotos = DEFAULT_ALBUM_PHOTOS.slice();
    }
    if (!cfg.albumPhotos[idx]) {
      cfg.albumPhotos[idx] = { src: '', title: '', caption: '' };
    }
    cfg.albumPhotos[idx][field] = value.trim();
    saveConfig(cfg);
  }

  function resetAlbumPhoto(idx) {
    const defaultP = DEFAULT_ALBUM_PHOTOS[idx];
    if (!defaultP) return;

    const cfg = getConfig();
    if (!Array.isArray(cfg.albumPhotos)) {
      cfg.albumPhotos = DEFAULT_ALBUM_PHOTOS.slice();
    }
    cfg.albumPhotos[idx] = Object.assign({}, defaultP);
    saveConfig(cfg);

    initAlbum20Manager();

    if (WeddingRSVP.showToast) {
      WeddingRSVP.showToast(`🔄 Đã đặt lại ảnh #${idx + 1} về mặc định!`);
    }
  }

  function restoreDefault20Photos() {
    if (!confirm('Bạn có chắc muốn khôi phục toàn bộ 20 ảnh cưới về bộ ảnh mẫu siêu xinh ban đầu?')) {
      return;
    }
    const cfg = getConfig();
    cfg.albumPhotos = DEFAULT_ALBUM_PHOTOS.slice();
    saveConfig(cfg);

    initAlbum20Manager();

    if (WeddingRSVP.showToast) {
      WeddingRSVP.showToast('✨ Đã khôi phục thành công 20 ảnh cưới mẫu!');
    }
  }

  /* --------------------------------------------------------------------------
     4. RSVP Attendance Dashboard
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
     5. Wedding Info Editor (Chỉnh Sửa Thông Tin Hôn Lễ)
     -------------------------------------------------------------------------- */
  function initInfoEditor() {
    const form = document.getElementById('admin-config-form');
    if (!form) return;

    const cfg = getConfig();
    populateForm(cfg);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = getConfig();
      const newCfg = Object.assign({}, current, {
        groom: {
          name: document.getElementById('cfg-groom-name').value.trim() || current.groom.name,
          fullName: document.getElementById('cfg-groom-fullname').value.trim() || current.groom.fullName,
          father: document.getElementById('cfg-groom-father').value.trim(),
          mother: document.getElementById('cfg-groom-mother').value.trim(),
          phone: document.getElementById('cfg-groom-phone').value.trim(),
          bankName: document.getElementById('cfg-groom-bank').value.trim(),
          bankNumber: document.getElementById('cfg-groom-banknum').value.trim(),
          bankAccountName: document.getElementById('cfg-groom-bankacc').value.trim()
        },
        bride: {
          name: document.getElementById('cfg-bride-name').value.trim() || current.bride.name,
          fullName: document.getElementById('cfg-bride-fullname').value.trim() || current.bride.fullName,
          father: document.getElementById('cfg-bride-father').value.trim(),
          mother: document.getElementById('cfg-bride-mother').value.trim(),
          phone: document.getElementById('cfg-bride-phone').value.trim(),
          bankName: document.getElementById('cfg-bride-bank').value.trim(),
          bankNumber: document.getElementById('cfg-bride-banknum').value.trim(),
          bankAccountName: document.getElementById('cfg-bride-bankacc').value.trim()
        },
        weddingDate: document.getElementById('cfg-wedding-date').value || current.weddingDate,
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
      });

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
    applyTheme,
    handleImageUpload,
    handleImageUrl,
    resetImage,
    handleAlbumPhotoUpload,
    handleAlbumPhotoUrl,
    handleAlbumPhotoText,
    resetAlbumPhoto,
    restoreDefault20Photos,
    deleteRSVPItem,
    renderRSVPTable,
    THEMES_CATALOG,
    DEFAULT_ALBUM_PHOTOS
  };
})();

document.addEventListener('DOMContentLoaded', WeddingAdmin.init);
