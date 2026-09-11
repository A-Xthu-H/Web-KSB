# Frontend Web KSB / RSIH

Frontend ini adalah website Klinik Sehat Bagendit Garut yang dibuat dengan React dan Vite. Halaman mengikuti struktur dan konten referensi RSIH, dengan navigasi berbasis hash agar dapat berjalan tanpa router tambahan.

## Menjalankan Project

Dari folder `frontend`:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Buka `http://localhost:5173/` di browser.

Perintah lain:

```powershell
npm run build
npm run preview
```

## Struktur File

```text
frontend/
├── public/
│   ├── hospital-hero.svg
│   ├── room-suite.svg
│   ├── rsih-logo.svg
│   └── vite.svg
├── src/
│   ├── app.jsx
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── index.html
├── package.json
└── README.md
```

### File Utama

| File | Fungsi |
| --- | --- |
| `index.html` | Dokumen HTML utama Vite, root `#root`, metadata viewport, dan judul browser. |
| `src/main.jsx` | Entry point React. Memasang `App` ke `#root` dan memuat stylesheet global. |
| `src/app.jsx` | Komponen aplikasi, navigasi hash, data konten, state interaksi, serta seluruh komponen halaman. |
| `src/styles.css` | Semua styling global, layout desktop/mobile, header, footer, kartu, slider, halaman referensi, dan responsive breakpoint. |
| `package.json` | Dependency React/Vite dan script `dev`, `build`, serta `preview`. |
| `.env.example` | Template environment frontend. `VITE_API_URL` disiapkan untuk integrasi API backend. |

### Aset `public/`

| File | Fungsi |
| --- | --- |
| `public/rsih-logo.svg` | Logo RSIH yang digunakan di header dan footer. |
| `public/hospital-hero.svg` | Ilustrasi lokal untuk hero dan halaman internal agar tetap tampil tanpa asset eksternal. |
| `public/room-suite.svg` | Ilustrasi kamar yang dipakai pada slider rawat inap. |
| `public/vite.svg` | Asset bawaan Vite; tidak digunakan oleh halaman utama. |

## Navigasi dan Route Hash

Karena aplikasi belum memakai React Router, halaman dibedakan melalui hash pada URL. Perubahan hash dipantau oleh `useEffect` di `src/app.jsx`.

| URL | Halaman |
| --- | --- |
| `/#top` | Beranda: hero, UGD, slider kamar, poster layanan, testimoni, dan footer. |
| `/#sejarah` | Sejarah RSIH dan galeri perjalanan rumah sakit. |
| `/#visi-misi` | Visi, misi, dan tim manajemen. |
| `/#penghargaan` | Penghargaan dan sertifikat akreditasi. |
| `/#rekanan-mitra` | Grid rekanan dan mitra. |
| `/#dokter` | Daftar dokter dengan pencarian. |
| `/#dokter-profile-107` | Detail profil dokter dan jadwal praktik. ID dokter lain mengikuti data di `app.jsx`. |
| `/#jenis-pelayanan` | Katalog kotak layanan rawat jalan. |
| `/#rawat-jalan` | Alias menuju katalog layanan rawat jalan. |
| `/#poli-gigi` | Detail Poli Gigi, dokter, kondisi, dan jadwal praktik. |
| `/#fasilitas-umum` | Fasilitas Intan Mart, I-Food, ATM, parkir, dan mushola. |
| `/#karir` | Daftar lowongan kerja dan pengiriman CV melalui email. |
| `/#kontak` | Alamat, kontak, media sosial, peta, dan jam operasional. |
| `/#blog` | Daftar artikel dan kategori blog. |
| `/#blog-tonsil` | Detail artikel Tonsil Hipertrofi dan artikel terkait. |

## Pola Komponen

- `App` membaca `window.location.hash` dan menentukan halaman aktif.
- `SiteFooter` digunakan bersama oleh semua route agar footer konsisten.
- `PageHeading` menyamakan pola heading halaman internal.
- Halaman dengan kebutuhan khusus memakai komponen terpisah seperti `AboutPage`, `DoctorsPage`, `ServicesPage`, `DentalClinicPage`, `FacilitiesPage`, `CareersPage`, `ContactPage`, `BlogPage`, dan `BlogDetailPage`.
- State React dipakai untuk pencarian dokter/poliklinik, slider kamar, dan perpindahan testimoni.

## Catatan Asset Eksternal

Sebagian foto referensi masih dimuat dari `rsintanhusada.com`. Jika server sumber memblokir hotlink atau asset berubah, gambar tersebut dapat kosong. Asset penting untuk layout utama sudah tersedia secara lokal di `public/`.

## Verifikasi

Sebelum mengirim perubahan frontend, jalankan:

```powershell
npm run build
```

Build yang berhasil memastikan JSX, CSS, dan bundle produksi dapat dikompilasi oleh Vite.
