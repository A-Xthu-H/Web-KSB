# Backend — Web Klinik Sehat Bagendit
API Express.js + Sequelize (MySQL) untuk website Klinik Sehat Bagendit.

## Menjalankan
```powershell
npm install
Copy-Item .env.example .env      # lalu edit: DB_USER / DB_PASSWORD
npm run seed                     # buat akun admin
npm run seed:content             # isi konten halaman + hero banner
npm run dev                      # nodemon, http://localhost:3000
```

**Login admin default:** `admin@kliniksehatbagendit.com` / `admin12345`

> 📖 Panduan lengkap ada di **[../INSTALL.md](../INSTALL.md)**.

## Scripts
| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan dengan auto-reload (nodemon) |
| `npm start` | Jalankan produksi |
| `npm run seed` | Buat akun admin awal |
| `npm run seed:content` | Isi konten halaman & pengaturan (hero banner) |

## Endpoint API (ringkas)

| Rute | Akses |
|---|---|
| `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` | Publik / admin |
| `GET /api/doctors`, `/doctors/:id` | Publik |
| `POST/PUT/DELETE /api/doctors` | Admin (JWT) |
| `GET /api/schedules`, `/services`, `/facilities`, `/partners`, `/articles`, `/jobs`, `/settings`, `/contents` | Publik |
| `POST/PUT/DELETE` (semua entitas di atas) | Admin (JWT) |
| `POST /api/messages` | Publik |
| `POST /api/uploads` | Admin (JWT) — Cloudinary / lokal |

## Struktur
```
src/
├── config/       db.config.js, cloudinary.config.js
├── models/       skema data (PRD §7) + index.js (asosiasi)
├── controllers/  logika tiap entitas
├── routes/       rute /api + index.js
├── middlewares/  auth.middleware.js (JWT), upload.middleware.js
├── utils/        responseHandler.js
├── seed.js       akun admin awal
└── seedContent.js konten + pengaturan awal
```

---

## Catatan Riwayat (laporan cross-check & roadmap lama)

> Blok di bawah adalah catatan historis dari proses pengembangan awal. Untuk status terkini,
> lihat [../INSTALL.md](../INSTALL.md) dan [../DEPLOYMENT.md](../DEPLOYMENT.md).

⚠️ Catatan penting: aplikasi sudah benar, tetapi belum ada server MySQL yang berjalan di mesin ini. Untuk menjalankannya, Anda perlu:

Install & jalankan MySQL (XAMPP/Laragon/MySQL Server), lalu buat database klinik_sehat_bagendit.
Sesuaikan DB_USER/DB_PASSWORD di backend/.env.
Jalankan: npm run seed (buat admin) lalu npm run dev.
Login default → email: admin@kliniksehatbagendit.com, password: admin12345

Catatan kecil
Rich Text Editor: saat ini artikel pakai textarea HTML polos (back-end sudah simpan HTML). Editor WYSIWYG sesungguhnya bisa ditambah di FASE 5 (polishing) bila Anda mau.
Dev server: proses sementara sudah saya hentikan lagi. Untuk menjalankan: cd frontend && npm run dev dan cd backend && npm run dev di terminal Laragon Anda.

🔍 Hasil Cross-Check Proyek vs PRD
Semua diuji ulang secara nyata (bukan hanya membaca kode). Berikut hasilnya.

✅ Yang Sudah Beres & Terverifikasi
Struktur & Kode:

✅ Backend  : 44 file, semua LOLOS syntax check
✅ Frontend : build sukses (290KB JS, 73KB CSS, 36 modul)
✅ Tidak ada file kosong (0 byte) lagi
✅ 12 grup route terdaftar di routes/index.js
Runtime (MySQL Laragon + backend + login diuji ulang):

✅ MySQL Laragon nyala (port 3306)
✅ Database klinik_sehat_bagendit — 11 tabel utuh
✅ Server: "Berhasil terhubung ke database MySQL" + "Sinkronisasi selesai"
✅ Login admin → status success
✅ GET publik: doctors=1, services=2, articles=1
✅ /auth/me → admin@kliniksehatbagendit.com
📋 Peta Kesesuaian PRD (per requirement)
ID	Kebutuhan PRD	Status	Bukti
FR-1.1–1.6	Halaman publik (beranda, profil, layanan, dokter, artikel, kontak+Maps+WA)	🟢 Ada	pages/index.jsx (semua halaman)
↳ Tapi datanya masih statis (hardcode)	🟡	belum baca API → FASE 4
FR-2.1	Login bcrypt	🟢	admin.model.js hook bcrypt, hash $2b$10$
FR-2.2	Proteksi JWT	🟢	auth.middleware.js + uji 401 tanpa token
FR-2.3	Logout	🟢	auth.controller.js + tombol di AdminApp
FR-3.1	Kelola config umum (banner, maps, kontak)	🟢	modul settings (upsert by key)
FR-3.2	CRUD Layanan, Fasilitas, Mitra	🟢	service/facility/partner module
FR-3.3	Dokter & Jadwal	🟢	doctor + schedule module
FR-3.4	Artikel + Rich Text Editor	🟡	artikel CRUD ada, tapi editor masih textarea HTML polos (bukan WYSIWYG)
FR-3.5	Lowongan buka/tutup	🟢	modul jobs (enum buka/tutup)
§7 Skema Data	9 entitas	🟢	11 tabel (termasuk facilities, messages)
§8.2	Alur admin (/admin-login → CRUD → real-time)	🟡	login+CRUD ada, "real-time publik" belum (FASE 4)
§6 Cloudinary	Manajemen media	🔴	upload lokal saja → FASE 5
§6 SEO	meta tags, semantic HTML	🟡	meta dasar ada, react-helmet belum
§9 Deployment	Deploy ke VPS/cloud	🔴	belum → FASE 6
⚠️ Temuan / Catatan Penting
1. Inkonsistensi kecil:

backend/src/routes/content.routes.js pakai format respons berbeda (res.json langsung, bukan sendResponse). Berfungsi, tapi tidak konsisten dengan modul lain. Bisa dirapikan nanti.
2. Content model vs PRD: model contents adalah tambahan (bukan di §7), dipakai untuk konten generik. Tidak masalah, hanya ekstra.

3. categories (bertipe ENUM) di job_vacancies/schedules: PRD minta status sebagai enum — sudah cocok. ✅

4. Belum diuji:

Alur upload gambar lewat browser (baru diuji endpoint-nya di FASE 2).
Semua menu admin (baru diuji "Layanan" & "Dokter" lewat browser).
5. Definition of Done (§9) belum terpenuhi karena 2 poin: real-time publik (FASE 4) dan deployment (FASE 6) + Cloudinary (FASE 5).

🎯 Kesimpulan Cross-Check
Fondasi (FASE 0–3) solid, konsisten, dan terbukti jalan. Sekitar ~75% dari keseluruhan PRD sudah selesai di sisi fitur inti. Yang tersisa bersifat penyempurnaan & penyelesaian:

FASE 4 — website publik baca API (real-time) ← yang paling penting berikutnya
FASE 5 — Cloudinary, Rich Text Editor (WYSIWYG), SEO/helmet, keamanan
FASE 6 — Deployment


## ini li promt buat lanjutin, AI saya habis ##

suruh dia plajarain dulu prd sama projek sekarang trus liat hasilnya habis itu baru copy paste yg di bawah

Urutan Prioritas (Roadmap)
🟥 FASE 0 — Fondasi & Konsistensi Database (WAJIB DULUAN)
Kenapa pertama: Saat ini ada konflik serius — db.config.js memakai sqlite3 callback, tapi content.model.js mengimpor sebagai Sequelize. Kalau ini tidak dibereskan, semua model/controller baru akan gagal.

Yang dikerjakan:

Putuskan satu arah DB → sesuai PRD: MySQL/PostgreSQL, atau (untuk cepat) konsisten Sequelize + SQLite.ang mongoose dari package.json karena tidak relevan.
Perbaiki db.config.js agar benar-benar mengekspor instance Sequelize (atau hapus content.model.js yang tidak konsisten).
Siapkan migrasi/seeder skema dari bab 7 PRD (Users, Doctors, Schedules, Services, Facilities, Articles, Job_Vacancies, Partners, Settings).
⚠️ Ini fondasi. Tanpa ini, Fase 1–3 akan cepat rusak.

🟥 FASE 1 — Autentikasi Admin (Jantung Keamanan PRD)
Kenapa kedua: PRD FR-2.1–2.3 + US-07 wajib, dan semua rute CMS harus diproteksi JWT. Auth harus ada sebelum CRUD dibuka.

File yang diisi (semuanya masih 0 byte):

models/admin.model.js → user + password_hash, role
controllers/auth.controller.js → login (bcrypt) + logout
middlewares/auth.middleware.js → verifikasi JWT
routes/auth.routes.js → POST /api/auth/login, POST /api/auth/logout
Daftarkan di routes/index.js
Hasil: admin bisa login dan API terproteksi token.

🟧 FASE 2 — Endpoint CRUD CMS (Backend)
Kenapa setelah auth: biar setiap endpoint bisa dipasangi middleware JWT langsung, tidak perlu bongkar ulang.

Isi file kosong yang tersisa:

doctor.*, schedule.* → manajemen dokter & jadwal (US-08)
service.* → layanan & fasilitas (FR-1.3)
article.* → artikel (FR-3.4)
lengkapi mitra, lowongan, settings
middlewares/upload.middleware.js (uploade.middleware.js typo) → upload media
🟧 FASE 3 — Halaman Admin/CMS (Frontend)
Kenapa setelah backend siap: frontend CMS butuh API untuk dipanggil.

Halaman /admin-login (alur bab 8.2 PRD)
Dashboard + form CRUD per entitas
Rich Text Editor untuk artikel (FR-3.4)
Simpan token, kunci rute tanpa login
🟨 FASE 4 — Integrasi Frontend Publik ke API
Kenapa di sini (bukan awal): saat ini frontend app.jsx pakai data statis. Integrasi dilakukan setelah API stabil, agar data publik benar-benar dinamis & real-time (alur 8.2 terakhir).

Ganti array statis di index.jsx dengan fetch(${VITE_API_URL}/...)
Status lowongan Buka/Tutup, jadwal dokter, dll. ambil dari DB
🟨 FASE 5 — Non-Fungsional & Polishing
Cloudinary untuk upload gambar + kompresi (bab 3 & 6)
React Helmet untuk meta tags dinamis (PRD minta ini)
Semantic HTML, responsive QA, proteksi XSS/SQL injection
🟩 FASE 6 — Deployment (DoD)
Frontend + Backend + Database ke VPS/Cloud
Domain resmi, uptime, uji akses publik
📌 Ringkasan Alur
FASE 0  Database & konsistensi  ← mulai di sini
   ↓
FASE 1  Autentikasi admin (bcrypt + JWT)
   ↓
FASE 2  CRUD CMS (backend)
   ↓
FASE 3  Halaman admin (frontend)
   ↓
FASE 4  Integrasi web publik ke API
   ↓
FASE 5  Cloudinary, SEO, keamanan
   ↓
FASE 6  Deployment