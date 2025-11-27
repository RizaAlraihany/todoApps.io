# ✨ Modern Todo Apps ✨

Aplikasi web sederhana untuk mengelola produktivitas harian — memungkinkan pengguna mencatat, memantau, dan menyelesaikan tugas sehari-hari. Didesain dengan tampilan modern yang bersih, responsif, dan ramah pengguna.

---

## 🌐 Live Demo

**🔗 Klik di sini untuk mencoba aplikasi**

> https://rizaalraihany.github.io/todoApps.io/

---

## 🚀 Fitur Utama

* ✅ **Manajemen Tugas (CRUD)**

  * Tambah tugas baru dengan target tanggal.
  * Edit tugas.
  * Tandai tugas sebagai selesai atau batalkan (undo).
  * Hapus tugas yang tidak diperlukan (dengan konfirmasi).

* ✅ **Penyimpanan Lokal (Persistent)**

  * Data tersimpan otomatis di `localStorage` sehingga tidak hilang saat refresh.

* ✅ **Notifikasi Cerdas**

  * Menggunakan toast notifications untuk feedback yang halus.
  * Modal konfirmasi saat penghapusan agar tidak terjadi kesalahan.

* ✅ **Desain Modern & Responsif**

  * Tipografi Poppins, skema warna soft-violet.
  * Kompatibel dengan Desktop, Tablet, dan Mobile.

---

## 🛠️ Teknologi yang Digunakan

| Teknologi            | Deskripsi                                                    |
| -------------------- | ------------------------------------------------------------ |
| HTML5                | Struktur semantik halaman aplikasi                           |
| CSS3                 | Styling modern dengan Flexbox, CSS Variables, dan Animations |
| JavaScript (Vanilla) | Logika interaksi DOM, Event Handling, dan State Management   |
| FontAwesome / SVG    | Ikon vektor untuk elemen antarmuka                           |
| LocalStorage         | Menyimpan data tugas (JSON) secara lokal di browser          |
| Google Fonts         | Tipografi menggunakan font Poppins                           |

---

## 📦 Struktur Folder

```
TODOAPPS/
├── .idea/                      # Konfigurasi IDE/Editor (opsional)
├── assets/                     # Aset gambar preview aplikasi
│   ├── Galaxy-Tab-S7-127.0.0.1.png
│   ├── iPhone-14-Plus-127.0.0.1.png
│   └── Macbook-Air-127.0.0.1.png
├── src/
│   ├── css/
│   │   └── style.css           # Styling tampilan (CSS)
│   └── js/
│       └── script.js           # Logika aplikasi (JavaScript)
├── index.html                  # File utama halaman web
└── README.md                   # Dokumentasi proyek
```

---

## ⚙️ Cara Menjalankan

1. Clone repository:

```bash
git clone https://github.com/RizaAlraihany/modern-todo-apps.git
```

2. Masuk ke folder proyek:

```bash
cd modern-todo-apps
```

3. Buka `index.html` di browser — klik dua kali atau gunakan `Live Server` di VSCode.

---

## 📸 Tampilan Aplikasi

**Tampilan Desktop / Tablet / Mobile**


| Desktop                             | Tablet                         | Mobile                        |
| ------------------------------------- | --------------------------------------- | ------------------------------------- |
| ![Desktop](./assets/desktop.png) | ![Tablet](./assets/Tablet.png) | ![Mobile](./assets/Mobile.png) |


---

## 👨‍💻 Developer

Dibuat oleh:

* 💙 **Riza Alraihany**
  🔗 GitHub: [https://github.com/RizaAlraihany](https://github.com/RizaAlraihany)
  🔗 LinkedIn: [https://www.linkedin.com/in/riza-alraihany](https://www.linkedin.com/in/riza-alraihany)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — bebas digunakan dan dimodifikasi untuk keperluan pribadi maupun komersial.

---

> *"Produktivitas bukan tentang melakukan banyak hal, tapi melakukan hal yang benar."* 🚀

---

### Tips Tambahan

* Untuk menambahkan domain kustom di GitHub Pages: buat file `CNAME` berisi domain Anda, lalu atur repository -> Pages -> Custom domain.
* Jika ingin memisahkan CSS/JS ke file terpisah, gunakan struktur `src/css/style.css` dan `src/js/script.js` lalu link dari `index.html`.
