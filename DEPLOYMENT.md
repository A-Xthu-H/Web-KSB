# 🚀 Panduan Deployment — Web Klinik Sehat Bagendit

Dokumen ini menyiapkan **semua konfigurasi produksi** agar proyek siap di-deploy kapan saja.
Sesuai PRD §9 (Definition of Done): *Frontend, Backend, dan Database berhasil deploy ke server publik, stabil via domain resmi.*

> Status saat ini: **belum di-deploy**. Semua file konfigurasi di repo ini **siap dipakai** — cukup ikuti langkah yang sesuai.

---

## 📦 Isi Konfigurasi yang Tersedia

| File | Fungsi | Platform |
|---|---|---|
| `docker-compose.yml` | Orkestrasi MySQL + Backend + Frontend | Docker (VPS/PC) |
| `backend/Dockerfile` | Image backend Express | Docker |
| `frontend/Dockerfile` + `frontend/nginx.conf` | Build React + serve Nginx | Docker |
| `ecosystem.config.cjs` | Manajer proses PM2 | VPS (tanpa Docker) |
| `deploy/nginx-web-ksb.conf` | Reverse proxy + serve statis | VPS (Nginx) |
| `backend/.env.production.example` | Template env produksi | Semua |
| `.env.docker.example` | Template env docker-compose | Docker |

---

## 🔀 Pilih Metode Deployment

### 🅰️ Metode 1 — Docker Compose (paling mudah)

Cocok untuk VPS (DigitalOcean/Contabo) atau PC server. Satu perintah untuk semua.

**Langkah:**

```bash
# 1. Di server, clone repo
git clone https://github.com/A-Xthu-H/Web-KSB.git
cd Web-KSB

# 2. Salin template env docker lalu isi nilainya
cp .env.docker.example .env
#   → edit .env: ganti MYSQL_ROOT_PASSWORD, JWT_SECRET, CORS_ORIGIN, dll.

# 3. Build & jalankan semua service
docker compose up -d --build

# 4. Buat akun admin awal + konten/jumbotron awal (sekali saja)
docker compose exec backend node src/seed.js
docker compose exec backend node src/seedContent.js

# 5. Cek berjalan
docker compose ps
```

**Akses:** Frontend di `http://IP-SERVER:8080`, API di `http://IP-SERVER:3000`.

---

### 🅱️ Metode 2 — VPS Manual (PM2 + Nginx)

Cocok bila ingin kontrol penuh tanpa Docker.

**Prasyarat di VPS (Ubuntu):**
```bash
sudo apt update
sudo apt install -y nginx mysql-server nodejs npm git
sudo npm install -g pm2
```

**Langkah:**

```bash
# 1. Clone repo
cd /var/www && sudo git clone https://github.com/A-Xthu-H/Web-KSB.git web-ksb
cd web-ksb

# 2. === BACKEND ===
cd backend
npm install --omit=dev
cp .env.production.example .env      # lalu edit nilainya
mysql -u root -p -e "CREATE DATABASE klinik_sehat_bagendit CHARACTER SET utf8mb4;"
npm run seed                         # buat admin awal
npm run seed:content                 # konten halaman + hero banner awal
cd ..

# 3. === FRONTEND ===
cd frontend
npm install
echo "VITE_API_URL=https://domain-anda.com" > .env
npm run build                        # hasil di frontend/dist
cd ..

# 4. === JALANKAN BACKEND via PM2 ===
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup                          # ikuti perintah yang muncul

# 5. === NGINX ===
sudo cp deploy/nginx-web-ksb.conf /etc/nginx/sites-available/web-ksb
#   → edit file itu, ganti "domain-anda.com" dengan domain asli
sudo ln -s /etc/nginx/sites-available/web-ksb /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 6. === HTTPS (opsional, disarankan) ===
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d domain-anda.com -d www.domain-anda.com
```

---

### 🅲 Metode 3 — PaaS (Railway/Render + Vercel)

Paling cepat untuk demo. Backend + MySQL di **Railway**, frontend di **Vercel**.

- **Backend (Railway):** deploy folder `backend`, tambahkan plugin MySQL, isi env dari `.env.production.example`.
- **Frontend (Vercel):** deploy folder `frontend`, set `VITE_API_URL` = URL backend Railway.
- **Cloudinary** dipakai untuk media (agar tidak bergantung disk server).

---

## 🔐 Checklist Keamanan SEBELUM Deploy

- [ ] **Ganti `JWT_SECRET`** dengan string acak panjang.
  ```bash
  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  ```
- [ ] **Ganti password admin default** (`SEED_ADMIN_PASSWORD`).
- [ ] **Ganti password MySQL** (`DB_PASSWORD` / `MYSQL_ROOT_PASSWORD`).
- [ ] **Isi `CORS_ORIGIN`** dengan domain frontend asli (bukan `*`).
- [ ] **Aktifkan Cloudinary** agar media tersimpan di CDN (bukan disk server).
- [ ] Pastikan **`.env` TIDAK ter-commit** (sudah ada di `.gitignore`).
- [ ] Aktif **HTTPS** (Let's Encrypt/certbot).
- [ ] Di produksi, `NODE_ENV=production` (juga mematikan `sync alter`).

---

## ✅ Checklist Definition of Done (PRD §9)

| Kriteria PRD | Cara Verifikasi | Status |
|---|---|---|
| **Fungsionalitas Publik** — halaman tanpa error & responsif | Buka semua menu di domain asli | ⬜ |
| **CMS Berjalan Penuh** — CRUD semua entitas | Login admin → uji tambah/edit/hapus | ⬜ |
| **Keamanan Terjamin** — rute CMS terproteksi, media di cloud | Akses tanpa token ditolak; upload → Cloudinary | ⬜ |
| **Deployment Sukses** — FE+BE+DB di server publik, domain resmi | Buka `https://domain-anda.com` | ⬜ |

Tandai ⬜ menjadi ✅ setelah produksi terpasang.

---

## 🧪 Verifikasi Cepat Pasca-Deploy

```bash
# API sehat?
curl https://domain-anda.com/api/doctors

# Header keamanan aktif?
curl -I https://domain-anda.com/api/doctors   # cari X-Content-Type-Options, dll.

# Login uji
curl -X POST https://domain-anda.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kliniksehatbagendit.com","password":"PASSWORD_ANDA"}'
```

---

## 🛠️ Troubleshooting Umum

| Masalah | Penyebab | Solusi |
|---|---|---|
| `ECONNREFUSED 3306` | MySQL belum jalan / host salah | Pastikan service MySQL aktif; cek `DB_HOST` |
| CORS error di browser | `CORS_ORIGIN` tidak cocok | Samakan dengan domain frontend |
| Gambar tidak muncul | Upload lokal tidak persisten | Gunakan Cloudinary, atau volume Docker |
| `sync alter` mengubah data | `NODE_ENV` bukan production | Set `NODE_ENV=production` |
| Frontend blank di server | `VITE_API_URL` salah saat build | Set ulang, `npm run build` lagi |
| 404 saat refresh halaman | SPA fallback belum di-set | Pastikan `try_files ... /index.html` di Nginx |

---

## 📁 Struktur Deployment (Ringkasan)

```
Web KSB/
├── .env.docker.example          # template env docker compose
├── docker-compose.yml           # MySQL + Backend + Frontend
├── ecosystem.config.cjs         # PM2 (VPS)
├── deploy/
│   └── nginx-web-ksb.conf       # konfigurasi Nginx (VPS)
├── backend/
│   ├── Dockerfile
│   ├── .env.example             # dev
│   └── .env.production.example  # produksi
└── frontend/
    ├── Dockerfile
    └── nginx.conf
```
