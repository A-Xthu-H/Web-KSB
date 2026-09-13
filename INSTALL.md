# 📖 PANDUAN INSTALASI — Web Klinik Sehat Bagendit

Panduan ini untuk **teman kerja / developer baru** yang ingin menjalankan & menguji proyek ini
di komputer sendiri. Ikuti urutannya — dari instalasi alat sampai bisa login & testing.

> ⏱️ Estimasi waktu: **15–25 menit** (tergantung kecepatan internet untuk unduh dependency).

---

## 📋 Daftar Isi

1. [Prasyarat (alat yang harus diinstal)](#1-prasyarat-alat-yang-harus-diinstal)
2. [Unduh / Clone Proyek](#2-unduh--clone-proyek)
3. [Setup Database (MySQL)](#3-setup-database-mysql)
4. [Setup Backend](#4-setup-backend)
5. [Setup Frontend](#5-setup-frontend)
6. [Menjalankan Aplikasi](#6-menjalankan-aplikasi)
7. [Testing (Akun & Skenario)](#7-testing-akun--skenario)
8. [Masalah Umum (Troubleshooting)](#8-masalah-um-troubleshooting)
9. [Ringkasan Perintah](#9-ringkasan-perintah)

---

## 1. Prasyarat (alat yang harus diinstal)

Instal semuanya dulu sebelum lanjut:

| Alat | Versi disarankan | Unduh | Catatan |
|---|---|
| **Node.js** | v18 / v20 (LTS) | https://nodejs.org | Termasuk `npm` |
| **MySQL** | 8.x | Lihat pilihan di bawah | Database utama |
| **Git** | terbaru | https://git-scm.com | Untuk clone |
| **Editor kode** | — | VS Code (disarankan) | Opsional |
| **Cloudinary** | — | https://cloudinary.com | **Opsional** (gratis) |

### Pilihan MySQL — pilih SALAH SATU:

- **🅰 Laragon** (disarankan untuk Windows) — https://laragon.org/download
  Ringan, banyak alat, port default `3306`, user `root` **tanpa password**.
- **🅱 XAMPP** — https://www.apachefriends.org
  Jalankan hanya **MySQL** (Apache tidak diperlukan).
- **🅲 MySQL Server resmi** — perlu konfigurasi password sendiri.

> ⚠️ **Jangan jalankan 2 MySQL sekaligus** di satu komputer — port `3306` akan bentrok.
> Gunakan satu saja.

### Cek instalasi
Buka terminal (PowerShell / CMD), jalankan:
```powershell
node -v      # contoh: v20.11.0
npm -v       # contoh: 10.2.4
```

---

## 2. Unduh / Clone Proyek

```powershell
git clone https://github.com/A-Xthu-H/Web-KSB.git
cd Web-KSB
```

> Struktur folder: `backend/` (API Express), `frontend/` (React + Vite), `PRD`, `DEPLOYMENT.md`, dll.

---

## 3. Setup Database (MySQL)

### 3.1 Nyalakan MySQL
- **Laragon** → klik **Start All** (pastikan MySQL hijau).
- **XAMPP** → buka XAMPP Control Panel → **Start** pada **MySQL**.

### 3.2 Buat database
Buka **HeidiSQL** (Laragon), **phpMyAdmin** (XAMPP: http://localhost/phpmyadmin), atau MySQL CLI — lalu jalankan:

```sql
CREATE DATABASE klinik_sehat_bagendit
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

> 💡 **Tidak perlu membuat tabel manual.** Sequelize akan membuat tabel otomatis saat backend dijalankan.

### 3.3 OPSI CEPAT — Import data contoh (disarankan)
Agar langsung punya isi (dokter, layanan, artikel, hero banner, akun admin), import file `database/seed-data.sql`:

**Via HeidiSQL (Laragon):** klik kanan database → *Import* → pilih `database/seed-data.sql` → *Run*.
**Via phpMyAdmin (XAMPP):** pilih database → tab *Import* → pilih file → *Go*.
**Via MySQL CLI:**
```powershell
mysql -u root -p klinik_sehat_bagendit < database/seed-data.sql
```

> File ini sudah berisi **skema + data contoh** lengkap. Bila memakai cara ini, Anda **boleh melewati**
> `npm run seed` dan `npm run seed:content` (langkah 4.2) karena data sudah terisi.
> **Akun admin dari file ini tetap:** `admin@kliniksehatbagendit.com` / `admin12345`.

### 3.3 (Bila pakai password MySQL)
Catat **user** dan **password** MySQL Anda (mis. `root` / `passwordku`) — akan dipakai di langkah Backend.

---

## 4. Setup Backend

```powershell
cd backend

# 1) Install dependency
npm install

# 2) Salin file environment
Copy-Item .env.example .env
```

### 4.1 Edit `backend/.env`
Buka `backend/.env` dengan editor. Sesuaikan bagian ini:

```dotenv
PORT=3000
NODE_ENV=development

# Database (SESUAIKAN dengan MySQL Anda)
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=klinik_sehat_bagendit
DB_USER=root
DB_PASSWORD=            # ← isi bila MySQL Anda berpassword, biarkan kosong jika tidak
DB_DIALECT=mysql
DB_LOGGING=false

# JWT (bebas untuk dev)
JWT_SECRET=ubah_secret_ini_di_produksi
JWT_EXPIRES_IN=1d

# CORS
CORS_ORIGIN=http://localhost:5173
SERVE_FRONTEND=false

# Cloudinary — OPSIONAL. Biarkan placeholder bila belum punya akun.
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Akun admin awal (dibuat oleh `npm run seed`)
SEED_ADMIN_EMAIL=admin@kliniksehatbagendit.com
SEED_ADMIN_PASSWORD=admin12345
```

> 🔎 **Cloudinary opsional.** Jika dibiarkan placeholder, upload gambar otomatis tersimpan
> **lokal** (`backend/public/uploads`) — aplikasi tetap berjalan normal.

### 4.2 Buat akun admin + konten awal
```powershell
npm run seed          # membuat akun admin
npm run seed:content  # mengisi konten halaman + hero banner awal
# (Lewati dua perintah di atas bila Anda sudah import database/seed-data.sql di langkah 3.3)
```

### 4.3 Uji backend
```powershell
npm run dev
```
Kalau muncul seperti ini, **berhasil**:
```
Berhasil terhubung ke database MySQL.
Sinkronisasi model database selesai.
Server berjalan di http://localhost:3000 (development)
```

Buka `http://localhost:3000/api/doctors` di browser → harus muncul JSON data.
> Biarkan terminal ini tetap jalan. Buka terminal **baru** untuk langkah berikutnya.

---

## 5. Setup Frontend

Buka **terminal baru** (terminal backend tetap jalan):

```powershell
cd frontend

# 1) Install dependency
npm install

# 2) Salin file environment
Copy-Item .env.example .env
```

### 5.1 Pastikan `frontend/.env`
```dotenv
VITE_API_URL=http://localhost:3000
```
> `VITE_API_URL` harus menunjuk ke alamat backend (port `3000`).

---

## 6. Menjalankan Aplikasi

Butuh **2 terminal** yang jalan bersamaan:

| Terminal | Perintah | Alamat |
|---|---|---|
| **Terminal 1** (backend) | `cd backend` → `npm run dev` | http://localhost:3000 |
| **Terminal 2** (frontend) | `cd frontend` → `npm run dev` | http://localhost:5173 |

Buka **http://localhost:5173** di browser 🎉

| Halaman | URL |
|---|---|
| Website publik | http://localhost:5173/#top |
| Panel Admin (CMS) | http://localhost:5173/#admin |

---

## 7. Testing (Akun & Skenario)

### 🔑 Akun admin default
```
Email    : admin@kliniksehatbagendit.com
Password : admin12345
```
> (Atau sesuai yang Anda set di `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`.)

### ✅ Skenario Uji — Sisi Publik
1. Buka `http://localhost:5173/#top` — Beranda tampil (hero banner).
2. Menu **Dokter** (`#dokter`) — daftar dokter muncul dari database.
3. Menu **Layanan**, **Fasilitas Umum**, **Mitra Klinik** — data dari API.
4. Menu **Artikel** (`#blog`) — daftar artikel.
5. Menu **Karir** (`#karir`) — lowongan berstatus **buka**.
6. Menu **Kontak** (`#kontak`) — alamat, WhatsApp, peta.

### ✅ Skenario Uji — Sisi Admin (CMS)
1. Buka `http://localhost:5173/#admin` → **masuk** dengan akun di atas.
2. **Tambah dokter**: menu *Dokter* → **+ Tambah** → isi → *Simpan*.
3. Buka **website publik** `#dokter` → dokter baru **langsung muncul** (real-time).
4. **Tambah artikel**: menu *Artikel* → **+ Tambah** → tulis di **editor WYSIWYG** (B, I, U, H2…) → *Simpan*.
5. **Ubah hero banner**: menu *Pengaturan* → edit `hero_title` / `hero_subtitle` / `hero_banner` → cek Beranda berubah.
6. **Ubah konten halaman**: menu *Konten Halaman* → edit *sejarah* / *visi-misi* → cek halaman berubah.
7. **Unggah gambar**: di form (mis. Artikel → Thumbnail) → **Unggah gambar**.
   - Tanpa Cloudinary → tersimpan lokal (`provider: lokal`).
   - Dengan Cloudinary → URL CDN (`provider: cloudinary`).
8. **Pesan masuk**: isi formulir kontak di publik → cek menu *Pesan Masuk* di CMS.
9. **Logout**: klik *Keluar* di sidebar → kembali ke halaman login.

### 🔐 Uji keamanan
- Buka `http://localhost:5173/#admin` di jendela **incognito** → harus minta login (tidak bisa akses CMS tanpa token).
- Coba `http://localhost:3000/api/messages` tanpa login (browser) → harus **401 ditolak**.

### 🧪 Uji API langsung (opsional, PowerShell)
```powershell
# GET publik
Invoke-RestMethod http://localhost:3000/api/doctors

# Login
$body = '{"email":"admin@kliniksehatbagendit.com","password":"admin12345"}'
$login = Invoke-RestMethod -Uri http://localhost:3000/api/auth/login -Method Post -ContentType "application/json" -Body $body
$login.data.token   # → token JWT
```

---

## 8. Masalah Umum (Troubleshooting)

| Gejala | Penyebab | Solusi |
|---|---|---|
| `Gagal terhubung ke database: ECONNREFUSED` | MySQL belum jalan | Nyalakan MySQL (Laragon *Start All* / XAMPP *Start MySQL*) |
| `Unknown database 'klinik_sehat_bagendit'` | Database belum dibuat | Jalankan `CREATE DATABASE ...` (langkah 3.2) |
| `Access denied for user 'root'` | Password MySQL salah | Sesuaikan `DB_USER`/`DB_PASSWORD` di `backend/.env` |
| `'node' is not recognized` | Node tak ada di PATH | Restart terminal; pastikan Node terinstal (`node -v`) |
| Halaman `localhost:5173` bisa dibuka tapi data kosong | Backend belum jalan / URL API salah | Pastikan `npm run dev` backend jalan & `VITE_API_URL=http://localhost:3000` |
| **CORS error** di browser | `CORS_ORIGIN` tidak cocok | Set `CORS_ORIGIN=http://localhost:5173` di `backend/.env`, restart backend |
| Port 3000 / 5173 dipakai proses lain | Ada proses lama | Tutup proses lain, atau restart komputer |
| MySQL Laragon vs XAMPP bentrok | Keduanya jalan di port 3306 | Jalankan **satu** saja |
| Upload gambar error Cloudinary `401` | Kredensial Cloudinary salah | Kosongkan 3 variabel Cloudinary → upload pakai lokal |
| `npm install` gagal | Node terlalu tua / cache | Update Node ke v18+, lalu `npm cache clean --force` |

### Mereset ulang database (mulai dari nol)
```sql
DROP DATABASE klinik_sehat_bagendit;
CREATE DATABASE klinik_sehat_bagendit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Lalu jalankan ulang: `npm run seed` dan `npm run seed:content` —
**atau** import ulang `database/seed-data.sql` (berisi skema + data contoh).

---

## 9. Ringkasan Perintah

```powershell
# ---- PERTAMA KALI ----
git clone https://github.com/A-Xthu-H/Web-KSB.git
cd Web-KSB

# Backend
cd backend
npm install
Copy-Item .env.example .env      # lalu EDIT .env (DB_USER / DB_PASSWORD)
npm run seed                     # buat admin
npm run seed:content             # isi konten + banner awal
npm run dev                      # → http://localhost:3000

# Frontend (terminal BARU)
cd frontend
npm install
Copy-Item .env.example .env      # pastikan VITE_API_URL=http://localhost:3000
npm run dev                      # → http://localhost:5173

# ---- MENJALANKAN (setelah pertama kali) ----
# Terminal 1:  cd backend  && npm run dev
# Terminal 2:  cd frontend && npm run dev
```

| Layanan | URL |
|---|---|
| Website Publik | http://localhost:5173/#top |
| Panel Admin | http://localhost:5173/#admin |
| API Backend | http://localhost:3000/api |

**Akun admin:** `admin@kliniksehatbagendit.com` / `admin12345` 🔑

---

## 🤝 Tips Kolaborasi

- **Jangan commit file `.env`** — setiap komputer punya konfigurasi sendiri (sudah ada di `.gitignore`).
- **Teman Anda cukup mengulang**: salin `.env.example` → `.env`, buat database, `npm run seed` + `npm run seed:content`.
- **Data database tidak ikut Git.** Tiap orang mengisi datanya sendiri (atau minta bantuan ekspor-impor `.sql`).
- Untuk deployment produksi, lihat **`DEPLOYMENT.md`**.

---

Selamat mencoba! Bila macet, cek bagian **Troubleshooting** di atas atau tanyakan ke rekan tim. 🚀
