import 'dotenv/config';
import { connectDB } from './config/db.config.js';
import db from './models/index.js';

// Data konten statis awal (dipindahkan dari halaman publik ke database agar
// dapat diedit dari CMS). Struktur: { section, title, body, imageUrl }.
// `body` berupa teks yang dipisah baris "||" untuk tiap poin kartu (judul::deskripsi).
const kontenAwal = [
  {
    section: 'tentang-kami',
    title: 'Mengenal Klinik Sehat Bagendit',
    body: 'Sejarah::Berawal dari dokter praktik pribadi pada 2006, kemudian menjadi balai pengobatan pada 17 Mei 2010.||Visi dan Misi::Pusat layanan kesehatan primer yang berkualitas, nyaman, dan bersahabat di Banyuresmi dan sekitarnya.||Motto::Sahabat Sehat Keluarga Anda.',
  },
  {
    section: 'sejarah',
    title: 'Sejarah Klinik',
    body: 'Awal Mula::Berawal dari dokter praktik pribadi pada 2006.||Balai Pengobatan::Menjadi balai pengobatan pada 17 Mei 2010 di Jalan Hasan Arif No. 222.||Klinik Sehat Bagendit::Pada tahun 2017 berdiri di bangunan saat ini di Jalan Terusan Cinunuk No. 9.',
  },
  {
    section: 'visi-misi',
    title: 'Visi dan Misi',
    body: 'Visi::Menjadi pusat layanan kesehatan primer yang Berkualitas, Nyaman, dan Bersahabat di Wilayah Kecamatan Banyuresmi dan sekitarnya.||Misi::Melandasi setiap aktivitas pelayanan sebagai ibadah kepada Allah SWT; Menyediakan layanan medik dasar bagi pasien umum dan BPJS; Melayani dengan Senyum, Salam, Sapa, Sabar, Cepat, Tepat, dan penuh Simpati; Meningkatkan pengetahuan serta keterampilan; Menyediakan fasilitas yang lengkap dan berkualitas.||Motto::Sahabat Sehat Keluarga Anda.',
  },
  {
    section: 'penghargaan',
    title: 'Akreditasi & Penghargaan',
    body: 'Akreditasi::Klinik Sehat Bagendit telah terakreditasi resmi.||Keselamatan Pasien::Standar pelayanan berorientasi pada keselamatan dan kenyamanan.||Perbaikan Berkelanjutan::Kami mengevaluasi layanan secara berkala.',
  },
  {
    section: 'rekanan-mitra',
    title: 'Rekanan dan Mitra',
    body: 'BPJS Kesehatan::Layanan kesehatan bagi peserta JKN sesuai ketentuan yang berlaku.||Pasien Umum::Pelayanan prima untuk seluruh lapisan masyarakat.||Mitra Kesehatan::Kolaborasi profesional untuk layanan yang semakin terintegrasi.',
  },
  {
    section: 'fasilitas-um',
    title: 'Fasilitas Umum',
    body: 'Ruang Pelayanan::Ruang pendaftaran/tunggu, pemeriksaan, tindakan, periksa gigi, rawat inap, observasi, dan RB-KIA & pojok ASI.||Penunjang::Ruang administrasi, farmasi, laboratorium, serta kamar mandi/WC.||Akses & Kenyamanan::Penerangan listrik, air bersih, jaringan internet, dan lahan/area parkir.',
  },
  {
    section: 'karir',
    title: 'Karir & Lowongan Kerja',
    body: 'Tenaga Medis::Kesempatan berkontribusi untuk dokter, perawat, dan tenaga kesehatan.||Tenaga Profesional::Bangun pengalaman di lingkungan yang dinamis.||Kirim Lamaran::Hubungi kami untuk informasi posisi yang sedang tersedia.',
  },
  {
    section: 'poli-gigi',
    title: 'Poliklinik Gigi',
    body: 'Kondisi Ditangani::Gigi berlubang, karang gigi, penyakit gusi, sariawan, gigi sensitif.||Dokter Gigi::Didukung dokter gigi umum yang ramah dan profesional.||Jadwal Praktik::Lihat jadwal dokter dan jadwalkan kunjungan ke Poli Gigi.',
  },
];

// Data pengaturan awal (termasuk hero banner untuk FR-3.1).
const pengaturanAwal = [
  { kunci_pengaturan: 'hero_title', nilai: 'Klinik Sehat Bagendit' },
  { kunci_pengaturan: 'hero_subtitle', nilai: 'Pusat layanan kesehatan primer yang berkualitas, nyaman, dan bersahabat di wilayah Kecamatan Banyuresmi dan sekitarnya.' },
  { kunci_pengaturan: 'hero_banner', nilai: '' },
  { kunci_pengaturan: 'sambutan_teks', nilai: 'Selamat Datang di' },
];

const seedContent = async () => {
  try {
    await connectDB();
    await db.sequelize.sync();

    let nKonten = 0;
    for (const item of kontenAwal) {
      const [, created] = await db.Content.findOrCreate({
        where: { section: item.section },
        defaults: item,
      });
      if (created) nKonten++;
    }
    console.log(`Konten: ${nKonten} baru dibuat, ${kontenAwal.length - nKonten} sudah ada.`);

    let nSet = 0;
    for (const item of pengaturanAwal) {
      const [, created] = await db.Setting.findOrCreate({
        where: { kunci_pengaturan: item.kunci_pengaturan },
        defaults: item,
      });
      if (created) nSet++;
    }
    console.log(`Pengaturan: ${nSet} baru dibuat, ${pengaturanAwal.length - nSet} sudah ada.`);

    process.exit(0);
  } catch (error) {
    console.error('Gagal seeding konten:', error.message);
    process.exit(1);
  }
};

seedContent();
