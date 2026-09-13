# 🏥 Web Klinik Sehat Bagendit

Website *company profile* + CMS untuk Klinik Sehat Bagendit (Garut).
Dibangun sesuai **PRD**: React + Vite + Tailwind (frontend) dan Express.js + MySQL + Sequelize (backend),
dengan dukungan **Cloudinary** untuk media, **JWT** untuk keamanan, dan siap deploy.

---

## 🚀 Mulai Cepat (Instalasi)

👉 **Panduan lengkap: [INSTALL.md](./INSTALL.md)**

Ringkasnya:

```powershell
# Backend
cd backend
npm install
Copy-Item .env.example .env      # lalu edit .env (DB_USER / DB_PASSWORD)
npm run seed                     # buat akun admin
npm run seed:content             # isi konten halaman + hero banner
npm run dev                      # → http://localhost:3000

# Frontend (terminal baru)
cd frontend
npm install
Copy-Item .env.example .env      # VITE_API_URL=http://localhost:3000
npm run dev                      # → http://localhost:5173
```

**Prasyarat:** Node.js v18+, MySQL (Laragon/XAMPP), Git.

> 💾 **Ingin data contoh langsung?** Import `database/seed-data.sql` (skema + data: dokter, layanan, artikel, hero banner, akun admin). Lihat [INSTALL.md](./INSTALL.md#3-setup-database-mysql).

---

## 🔗 Alamat Penting

| Layanan | URL |
|---|---|
| Website Publik | http://localhost:5173/#top |
| Panel Admin (CMS) | http://localhost:5173/#admin |
| API Backend | http://localhost:3000/api |

**Akun admin default:** `admin@kliniksehatbagendit.com` / `admin12345`

---

## ✨ Fitur Utama

**Sisi Publik**
- Beranda (hero banner dinamis), Profil (sejarah, visi-misi, struktur, akreditasi)
- Layanan, Fasilitas Umum, Mitra, Direktori Dokter + Jadwal
- Artikel/Blog, Lowongan Kerja, Kontak (Google Maps + WhatsApp)

**Panel Admin (CMS)**
- Login aman (bcrypt + JWT), proteksi rute
- CRUD: Dokter, Jadwal, Layanan, Fasilitas, Artikel (editor WYSIWYG), Mitra, Lowongan
- Pengaturan umum (hero banner, alamat, WhatsApp, Maps) & konten halaman
- Unggah gambar ke Cloudinary (fallback lokal), pesan masuk

---

## 📚 Dokumentasi

| File | Isi |
|---|---|
| **[INSTALL.md](./INSTALL.md)** | Panduan instalasi & testing untuk developer baru |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Konfigurasi & langkah deploy (Docker / VPS / PaaS) |
| `PRD Web Klinik Sehat Bagendit` | Dokumen kebutuhan produk |

---

## 🧱 Teknologi

| Bagian | Stack |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, react-helmet-async |
| Backend | Node.js, Express 5, Sequelize, MySQL |
| Keamanan | bcrypt, JWT, Helmet, express-rate-limit |
| Media | Cloudinary (fallback: penyimpanan lokal) |
| Deployment | Docker Compose / PM2 + Nginx |

---

## 📁 Struktur Singkat

```
Web KSB/
├── backend/          # API Express + Sequelize
│   └── src/
│       ├── config/       # DB, Cloudinary
│       ├── models/       # Skema data (PRD §7)
│       ├── controllers/  # Logika endpoint
│       ├── routes/       # Definisi rute /api
│       ├── middlewares/  # Auth (JWT), upload
│       └── seed.js, seedContent.js
├── frontend/         # React + Vite
│   └── src/
│       ├── pages/        # Halaman publik
│       ├── admin/        # Panel CMS
│       ├── api/          # Klien API
│       └── components/   # Seo, dll.
├── database/
│   └── seed-data.sql # skema + data contoh (opsional, untuk import cepat)
├── INSTALL.md
├── DEPLOYMENT.md
└── docker-compose.yml
```

---

Dibuat untuk Klinik Sehat Bagendit — *Sahabat Sehat Keluarga Anda.* 💚
