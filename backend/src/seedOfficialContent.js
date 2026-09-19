import 'dotenv/config';
import { connectDB } from './config/db.config.js';
import db from './models/index.js';

const services = [
  ['Rawat Inap', 'Rawat Inap', 'Pelayanan rawat inap dan observasi tersedia 24 jam untuk mendukung kebutuhan perawatan pasien.'],
  ['Promotif', 'Penyuluhan Kesehatan', 'Penyuluhan kesehatan individu, kelompok, dan masyarakat sesuai petunjuk pelaksanaan puskesmas setempat.'],
  ['Preventif', 'Imunisasi & Pencegahan', 'Pelaksanaan imunisasi dasar dan ulang bekerja sama dengan puskesmas, serta dukungan penanganan wabah atau kejadian luar biasa.'],
  ['Kuratif', 'Kegawatdaruratan & Rujukan', 'Pertolongan pada kecelakaan dan kondisi kegawatdaruratan, pelayanan observasi, serta penyelenggaraan rujukan sesuai kebutuhan pasien.'],
];

const facilities = [
  ['Ruang Pendaftaran & Tunggu', 'Area pendaftaran dan ruang tunggu untuk pasien serta pengunjung.'],
  ['Ruang Pemeriksaan', 'Ruang pemeriksaan untuk pelayanan medik dasar.'],
  ['Ruang Rawat Inap', 'Ruang rawat inap untuk kebutuhan perawatan pasien.'],
  ['Ruang Gigi', 'Ruang pelayanan pemeriksaan dan tindakan kesehatan gigi serta mulut.'],
  ['Ruang Tindakan', 'Ruang tindakan sesuai kebutuhan pelayanan pasien.'],
  ['Ruang Observasi', 'Ruang observasi untuk pemantauan kondisi pasien.'],
  ['RB-KIA & Pojok ASI', 'Ruang pelayanan rumah bersalin, kesehatan ibu dan anak, serta pojok ASI.'],
  ['Area Parkir', 'Area parkir untuk mendukung akses pasien dan pengunjung.'],
];

const contents = {
  'tentang-kami': {
    title: 'Mengenal Klinik Sehat Bagendit',
    body: 'Profil::Klinik Sehat Bagendit adalah klinik pratama swasta yang memberikan pelayanan kesehatan medik dasar dengan orientasi pada pelayanan pasien.||Sejarah::Berawal dari Dokter Praktik Pribadi pada 2006, kemudian Balai Pengobatan pada 17 Mei 2010, dan menempati bangunan Klinik Sehat Bagendit di Jalan Terusan Cinunuk No. 9 sejak 2017.||Motto::Sahabat Sehat Keluarga Anda.',
  },
  sejarah: {
    title: 'Sejarah Klinik',
    body: 'Dokter Praktik Pribadi::Klinik Sehat Bagendit berawal dari dibukanya Dokter Praktik Pribadi pada tahun 2006.||Balai Pengobatan::Pada 17 Mei 2010 didirikan Balai Pengobatan di Jalan Hasan Arief No. 222, Kampung Parigi, Desa Banyuresmi, Kecamatan Banyuresmi, Kabupaten Garut.||Klinik Sehat Bagendit::Pada tahun 2017 Klinik Sehat Bagendit berdiri di Jalan Terusan Cinunuk No. 9, Kampung Babakan Baru RT 002/RW 009, Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut.',
  },
  'visi-misi': {
    title: 'Visi dan Misi',
    body: 'Visi::Menjadi pusat layanan kesehatan primer yang Berkualitas, Nyaman, dan Bersahabat di Wilayah Kecamatan Banyuresmi dan sekitarnya.||Misi::Melandasi setiap aktivitas pelayanan sebagai ibadah kepada Allah SWT.; Menyediakan layanan medik dasar bagi pasien umum dan BPJS Kesehatan.; Melayani dengan Senyum, Salam, Sapa, Sabar, Cepat, Tepat, dan penuh Simpati.; Meningkatkan pengetahuan dan keterampilan agar profesional dalam bekerja.; Menyediakan fasilitas yang lengkap dan berkualitas bagi pasien.; Menciptakan lingkungan klinik yang bersih, aman, nyaman, dan bersahabat.||Nilai SIMPATI::Senyum, Ikhlas, Memudahkan, Profesional, Amanah, Terampil, dan Inovatif.',
  },
  'fasilitas-um': {
    title: 'Fasilitas Klinik',
    body: 'Ruang Pelayanan::Ruang pendaftaran dan tunggu, pemeriksaan, rawat inap, gigi, tindakan, observasi, serta RB-KIA dan pojok ASI.||Ruang Penunjang::Ruang administrasi, farmasi, laboratorium, dan kamar mandi/WC.||Akses & Kenyamanan::Penerangan listrik, air bersih, jaringan internet, dan area parkir.',
  },
  'poli-gigi': {
    title: 'Poliklinik Gigi',
    body: 'Layanan::Pemeriksaan kesehatan gigi dan mulut, pengobatan, serta tindakan medis dasar sesuai kebutuhan pasien.||Pendaftaran::Pendaftaran H-1 melalui JKN Mobile untuk pasien BPJS antrean 1–4; pendaftaran langsung di klinik untuk pasien umum dan BPJS non-JKN.||Kuota::Kuota pendaftaran 8 pasien BPJS dan 7 pasien umum. Jadwal diperbarui per September 2026.',
  },
};

const run = async () => {
  try {
    await connectDB();
    await db.sequelize.sync();
    for (const [kategori, nama, deskripsi] of services) {
      const [service] = await db.Service.findOrCreate({ where: { nama }, defaults: { kategori, nama, deskripsi } });
      await service.update({ kategori, deskripsi });
    }
    for (const [nama, deskripsi] of facilities) {
      const [facility] = await db.Facility.findOrCreate({ where: { nama }, defaults: { nama, deskripsi } });
      await facility.update({ deskripsi });
    }
    const clinicImage = (await db.Setting.findOne({ where: { kunci_pengaturan: 'hero_banner' } }))?.nilai || null;
    const dentalImage = (await db.Setting.findOne({ where: { kunci_pengaturan: 'poli_gigi_banner' } }))?.nilai || clinicImage;
    if (clinicImage) {
      await db.Facility.update({ foto_url: clinicImage }, { where: { foto_url: null } });
      await db.Service.update({ foto_url: clinicImage }, { where: { foto_url: null } });
      await db.Service.update({ foto_url: dentalImage }, { where: { nama: 'Pelayanan Gigi' } });
    }
    for (const [section, content] of Object.entries(contents)) {
      await db.Content.update(content, { where: { section } });
    }
    for (const [kunci_pengaturan, nilai] of Object.entries({
      jam_rawat_jalan: 'Senin–Minggu, 07.00–14.00 WIB dan 15.00–20.00 WIB',
      jam_rawat_inap_persalinan: '24 Jam',
      nilai_klinik: 'SIMPATI: Senyum, Ikhlas, Memudahkan, Profesional, Amanah, Terampil, Inovatif',
    })) {
      await db.Setting.upsert({ kunci_pengaturan, nilai });
    }
    console.log('Konten resmi dari PPT berhasil diperbarui.');
  } catch (error) {
    console.error('Gagal memperbarui konten resmi:', error.message);
    process.exitCode = 1;
  } finally {
    await db.sequelize.close();
  }
};

run();
