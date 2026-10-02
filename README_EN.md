# 💍 Online Wedding Invitation - Luxury Interactive E-Card ✨👰🤵

<p align="center">
  <a href="README.md"><b>🇻🇳 Tiếng Việt</b></a> &nbsp;|&nbsp; 
  <a href="README_EN.md"><b>🇺🇸 English</b></a>
</p>

<p align="center">
  <a href="https://dungautomation-dev.github.io/thiepcuoionline/"><img src="https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-00e5ff?style=for-the-badge&logo=githubpages&logoColor=black" alt="Live Demo"></a>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Responsive-Mobile%20%26%20Desktop-success?style=for-the-badge" alt="Responsive">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
</p>

<p align="center">
  🌐 <strong>Experience the live interactive wedding invitation at:</strong><br>
  👉 <a href="https://dungautomation-dev.github.io/thiepcuoionline/"><strong>https://dungautomation-dev.github.io/thiepcuoionline/</strong></a>
</p>

<p align="center">
  👑 <strong>Admin Dashboard (Batch Guest Link Generator & RSVP Analytics):</strong><br>
  👉 <a href="https://dungautomation-dev.github.io/thiepcuoionline/admin.html"><strong>https://dungautomation-dev.github.io/thiepcuoionline/admin.html</strong></a>
</p>

<p align="center">
  <strong>A modern, luxury interactive digital wedding invitation website — 3D wax seal envelope unboxing, compact clean slug links <code>?to=tenkhachhang</code>, 10 luxury wedding themes, photo customizer, 60fps floating hearts canvas physics, Google Maps directions, RSVP attendance confirmation, and an Admin dashboard for automated batch link generation! 💖🥂</strong>
</p>

---

## 🌟 Overview

**Online Wedding Invitation** is a high-end, responsive web application engineered purely using **HTML5 Canvas, CSS3 Glassmorphism, and Vanilla JavaScript** (100% Native, zero external heavy dependencies, ultra-lightweight and lightning fast even on mobile networks).

Crafted with a **Mobile-First** design approach, it delivers an emotional and captivating experience when guests open the invitation on their smartphones via Zalo, WhatsApp, iMessage, Messenger, or QR code scans.

---

## ✨ Key Features

### 1. 💌 3D Wax Seal Envelope Unboxing Experience
* Opens with an ivory luxury envelope featuring an embossed golden wax seal stamp.
* Displays personalized guest honorifics: *"Cordially invites: [Guest Name]"*.
* Tapping **"Open Invitation"**:
  * Triggers an interactive burst of glittering floating heart particles.
  * Plays romantic background wedding melodies seamlessly bypassing browser autoplay restrictions.
  * Unfolds envelope flaps and smoothly reveals the wedding ceremony details.

### 2. ⚡ Clean Compact Guest Links (`?to=tenkhachhang`)
* Generates aesthetic, unaccented compact URLs:
  * Example: `https://dungautomation-dev.github.io/thiepcuoionline/?to=anhnam` or `?to=tenkhachhang`
  * Automatically maps slugs to full formatted names with Vietnamese accents: **"Kính mời: Anh Nam & Gia Đình"**!
  * Supports 3 slug formats: Compact unaccented (`?to=tenkhachhang`), Hyphenated (`?to=ten-khach-hang`), and Standard encoded (`?to=Full%20Name`).

### 3. 🎨 10 Luxury Wedding Template Presets
Built-in 10 themes with live preview color chips:
1. 👑 **Champagne Gold & Ruby**: Aristocratic gold & ruby wine (Default).
2. 🌸 **Rose Gold & Blush Pink**: Soft romantic blush & rose gold.
3. 🌿 **Emerald & Botanical Green**: Forest emerald & eucalyptus rustic garden.
4. 🕊️ **Classic Minimalist Black & White**: Monochrome elegance & silver borders.
5. 🌊 **Ocean & Santorini Blue**: Aegean navy blue & golden shores.
6. 🍷 **Burgundy & Dark Plum**: Deep Bordeaux wine & warm candle glow.
7. 💜 **Lavender & Lilac Dream**: Dreamy lilac & everlasting lavender.
8. 🍂 **Warm Terracotta & Sunset**: Bohemian terracotta & pampas grass.
9. 🪷 **Royal Lotus Traditional**: Traditional scarlet red, pink lotus & gold double happiness.
10. ✨ **Celestial Starry Night**: Midnight starry sky & golden galaxy sparkles.

### 4. 🖼️ Personal Wedding Photo Customizer
* Replace wedding photos directly inside the Admin Dashboard:
  * Hero Arch Photo / Top Banner
  * Groom Portrait
  * Bride Portrait
  * Wedding Rings & Bouquet
  * Rose Garden Walk
* Upload directly from device (auto-persisted) or paste any online photo URL with live thumbnail previews!

### 4. 💖 Floating Hearts Canvas Physics & Tap Bursts
* 60fps HTML5 Canvas physics engine generating floating hearts in champagne gold, ruby wine, and blush rose.
* Interactive tap/click particle burst effect anywhere on screen.

### 5. 🗺️ Venue Locations & Integrated Google Maps
* Dedicated sections for Groom's Reception (Lễ Thành Hôn) and Bride's Ceremony (Lễ Vu Quy).
* Embedded Google Maps for instant venue viewing.
* Direct **"Google Maps Directions"** button opening native navigation apps on mobile.
* **"Add to Google Calendar"** button for 1-click event reminders.

### 6. 📝 RSVP Attendance Confirmation & Live Guestbook
* Guests submit their attendance status (Attending / Unable to attend), companion count, and heartfelt wishes.
* **Live Guestbook**: Appends greetings and wishes dynamically to the guestbook stream.

### 7. 🎁 Digital Gift Box & QR Code Transfer
* Integrated VietQR bank transfer codes for guests wishing to send congratulatory gifts from afar.

### 8. 👑 Admin Dashboard & Batch Link Generator
Access via [admin.html](admin.html) or the **Admin** button on the top toolbar:
* **Batch Link Generation**: Paste a list of 50 to 500 guest names $\rightarrow$ automatically generates individual personalized links with pre-written messaging for WhatsApp/Zalo/SMS.
* **RSVP Headcount Analytics**: Calculates total confirmed guests and exact headcounts for catering reservations.
* **Export to CSV/Excel**: Export guest lists and RSVP responses in 1-click.
* **Live Wedding Config Editor**: Edit couple names, ceremony dates, venues, and banking details directly.

---

## 📂 Project Architecture

```
thiepcuoionline/
├── assets/
│   ├── css/
│   │   └── style.css            # Luxury wedding styles, animations, responsive design
│   ├── js/
│   │   ├── hearts.js            # Floating hearts canvas physics & burst particles
│   │   ├── audio.js             # Vinyl dock controller & playlist
│   │   ├── gallery.js           # Fullscreen photo lightbox viewer
│   │   ├── rsvp.js              # RSVP submissions & guestbook wishes
│   │   ├── admin.js             # Batch link generator & RSVP analytics
│   │   └── app.js               # Application coordinator, envelope opener, countdown
│   ├── images/
│   │   ├── wedding-hero.jpg     # Wedding arch ceremony photo
│   │   ├── groom.jpg            # Groom portrait
│   │   ├── bride.jpg            # Bride portrait
│   │   ├── wedding-rings.jpg    # Gold diamond rings
│   │   └── wedding-walk.jpg     # Couple rose garden walk
│   └── audio/
│       ├── wedding-melody-1.mp3 # Until I Found You (Piano)
│       ├── wedding-melody-2.mp3 # A Thousand Years (Strings)
│       └── wedding-melody-3.mp3 # Canon in D (Orchestral)
├── index.html                   # Main Wedding Invitation web app
├── admin.html                   # Admin Dashboard & Batch Generator
├── LICENSE                      # MIT Open Source License
├── README.md                    # Vietnamese Documentation
└── README_EN.md                 # English Documentation
```

---

## 📄 License

Released under the **[MIT License](LICENSE)**. Free to use, adapt, and customize for personal or commercial wedding celebrations.

Crafted with ❤️ by **[Dung Automation](https://github.com/Dungautomation-dev)**.
