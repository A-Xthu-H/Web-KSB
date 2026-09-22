import 'dotenv/config';
import { connectDB } from '../src/config/db.config.js';
import db from '../src/models/index.js';

// =====================================================================
// Script: menghubungkan aset Cloudinary (foto resmi klinik) ke database,
// agar tampil otomatis di website publik.
//
// Yang diisi:
//   - doctors.foto_url            (3 dokter)
//   - settings struktur_*         (13 anggota struktur organisasi)
//   - settings hero_banner        (foto eksterior klinik)
//   - settings jadwal_*           (2 gambar jadwal)
//   - contents.image_url          (sejarah + poli-gigi)
//
// Cara pakai (dari folder backend):
//   node scripts/implement-cloudinary.mjs          -> jalankan (isi database)
//   node scripts/implement-cloudinary.mjs --dry    -> hanya tampilkan rencana
//
// Aman dijalankan berulang (idempotent — memperbarui, bukan menduplikasi).
// =====================================================================

const BASE = 'https://res.cloudinary.com/aiz5ufvh/image/upload/klinik-sehat-bagendit/official';

// ── Pemetaan aset Cloudinary ────────────────────────
const FOTO = {
  eksterior: `${BASE}/clinic-exterior.jpg`,
  jadwalDokter: `${BASE}/doctor-schedule-september-2026.jpg`,
  jadwalGigi: `${BASE}/dental-schedule-september-2026.jpg`,
};

// Dokter: nama di DB -> gambar cloudinary
const DOKTER_FOTO = [
  { cocok: 'Asep Ichsannurdin', nama: 'dr. Asep Ichsannurdin', spesialisasi: 'Dokter Umum', url: `${BASE}/doctor-asep-ichsannurdin.jpg` },
  { cocok: 'Aprina Handayani', nama: 'dr. Aprina Handayani', spesialisasi: 'Dokter Umum', url: `${BASE}/doctor-aprina-handayani.jpg` },
  { cocok: 'Syahrial', nama: 'dr. Syahrial', spesialisasi: 'Dokter Umum', url: `${BASE}/doctor-syahrial.jpg` },
];

// Struktur: kunci setting -> gambar
const STRUKTUR = {
  asep: `${BASE}/doctor-asep-ichsannurdin.jpg`,
  aprina: `${BASE}/doctor-aprina-handayani.jpg`,
  syahrial: `${BASE}/doctor-syahrial.jpg`,
  handri: `${BASE}/structure-handri-priyatna.jpg`,
  ade: `${BASE}/structure-ade-yusuf.jpg`,
  jumyati: `${BASE}/structure-jumyati.jpg`,
  yudha: `${BASE}/structure-yudha-anfal.jpg`,
  meita: `${BASE}/structure-meita-rahayu.jpg`,
  uswatun: `${BASE}/structure-uswatun-hasanah.jpg`,
  hegar: `${BASE}/structure-hegar-feby-apriani.jpg`,
  nita: `${BASE}/structure-nita-septiani.jpg`,
  ilmar: `${BASE}/structure-ilmar-munawaroh.jpg`,
  rahman: `${BASE}/structure-rahman-surahman.jpg`,
  susi: `${BASE}/structure-susi-nurwinti.jpg`,
  fauziah: `${BASE}/structure-fauziah-elsa-nafisah.jpg`,
  tammy: `${BASE}/structure-tammy-ajeng-rahayu.jpg`,
};

// Pengaturan lain
const PENGATURAN = {
  hero_banner: FOTO.eksterior,
  jadwal_dokter_gambar: FOTO.jadwalDokter,
  jadwal_gigi_gambar: FOTO.jadwalGigi,
  ...Object.fromEntries(Object.entries(STRUKTUR).map(([k, v]) => [`struktur_${k}`, v])),
};

// Konten halaman -> gambar
const KONTEN_FOTO = {
  sejarah: FOTO.eksterior,
  'poli-gigi': FOTO.jadwalGigi,
};

const DRY = process.argv.includes('--dry');

const main = async () => {
  await connectDB();
  await db.sequelize.sync();
  console.log(DRY ? '=== MODE DRY RUN (tidak menulis) ===\n' : '=== MENGISI DATABASE ===\n');

  // 1) Dokter
  const semuaDokter = await db.Doctor.findAll();
  let nDokter = 0;
  for (const { cocok, nama, spesialisasi, url } of DOKTER_FOTO) {
    let d = semuaDokter.find((x) => x.nama_dokter?.toLowerCase().includes(cocok.toLowerCase()));
    if (!d) {
      // Dokter belum ada -> buat baru.
      console.log(`Dokter   : (baru) ${nama}  ->  dibuat`);
      if (!DRY) d = await db.Doctor.create({ nama_dokter: nama, spesialisasi, foto_url: url });
    } else {
      console.log(`Dokter   : ${d.nama_dokter}  ->  foto diisi`);
      if (!DRY) await d.update({ foto_url: url });
    }
    nDokter++;
  }

  // 2) Settings (upsert)
  let nSet = 0;
  for (const [kunci, nilai] of Object.entries(PENGATURAN)) {
    const [row, created] = await db.Setting.findOrCreate({
      where: { kunci_pengaturan: kunci },
      defaults: { kunci_pengaturan: kunci, nilai },
    });
    if (!created && row.nilai !== nilai && !DRY) await row.update({ nilai });
    console.log(`Setting  : ${kunci}  ${created ? '(baru)' : '(update)'}`);
    nSet++;
  }

  // 3) Konten
  let nKonten = 0;
  for (const [section, url] of Object.entries(KONTEN_FOTO)) {
    const c = await db.Content.findOne({ where: { section } });
    if (c) {
      console.log(`Konten   : ${section}  ->  gambar`);
      if (!DRY) await c.update({ imageUrl: url });
      nKonten++;
    }
  }

  console.log(`\nRingkasan: ${nDokter} dokter, ${nSet} pengaturan, ${nKonten} konten.`);
  console.log(DRY ? 'Dry run selesai.' : 'Selesai — foto kini tampil di website.');
  process.exit(0);
};

main().catch((e) => {
  console.error('Gagal:', e.message || e);
  process.exit(1);
});
