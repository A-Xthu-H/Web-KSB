import 'dotenv/config';
import { connectDB } from './config/db.config.js';
import db from './models/index.js';

// Data jadwal dari poster Klinik Sehat Bagendit per September 2026.
// Jalankan ulang dengan aman: jadwal dokter yang tercantum akan diperbarui,
// bukan ditambahkan berulang.
const doctorData = [
  {
    nama_dokter: 'dr. Asep Ichsannurdin',
    spesialisasi: 'Dokter Umum',
    deskripsi: 'Dokter umum. Pemeriksaan memerlukan janji terlebih dahulu melalui WhatsApp Klinik Sehat Bagendit.',
    schedules: [['Selasa', '09:00', '11:00'], ['Kamis', '09:00', '11:00'], ['Sabtu', '09:00', '11:00']],
  },
  {
    nama_dokter: 'dr. Syahrial',
    spesialisasi: 'Dokter Umum',
    deskripsi: 'Dokter umum. Jadwal hari Minggu bergiliran dengan dr. Novri; hubungi klinik untuk konfirmasi.',
    schedules: [['Senin', '07:00', '20:00'], ['Rabu', '07:00', '20:00'], ['Jumat', '07:00', '20:00']],
  },
  {
    nama_dokter: 'dr. Novri',
    spesialisasi: 'Dokter Umum',
    deskripsi: 'Dokter umum. Jadwal hari Minggu bergiliran dengan dr. Syahrial; hubungi klinik untuk konfirmasi.',
    schedules: [['Selasa', '07:00', '20:00'], ['Kamis', '07:00', '20:00'], ['Sabtu', '07:00', '20:00']],
  },
  {
    nama_dokter: 'dr. Aprina Handayani',
    spesialisasi: 'Dokter Umum',
    deskripsi: 'Dokter umum. Pemeriksaan memerlukan janji terlebih dahulu melalui WhatsApp Klinik Sehat Bagendit.',
    schedules: [['Rabu', '13:00', '15:00'], ['Sabtu', '10:00', '12:00']],
  },
  {
    nama_dokter: 'dr. Arie Galih M',
    spesialisasi: 'Dokter Umum',
    deskripsi: 'Dokter umum Klinik Sehat Bagendit.',
    schedules: [['Selasa', '08:00', '12:00'], ['Rabu', '08:00', '12:00'], ['Kamis', '08:00', '12:00'], ['Jumat', '08:00', '12:00']],
  },
  {
    nama_dokter: 'drg. Fikri S Mahmud, AIFO',
    spesialisasi: 'Dokter Gigi',
    deskripsi: 'Dokter gigi Klinik Sehat Bagendit. Pendaftaran H-1 melalui JKN Mobile untuk pasien BPJS, atau langsung di klinik untuk pasien umum dan BPJS non-JKN.',
    schedules: [['Senin', '13:00', '17:00'], ['Selasa', '15:30', '19:30'], ['Rabu', '15:30', '19:30'], ['Kamis', '15:30', '19:30'], ['Jumat', '15:30', '19:30'], ['Sabtu', '08:00', '12:00']],
  },
];

const run = async () => {
  try {
    await connectDB();
    await db.sequelize.sync();

    // Data contoh lama tetap dipertahankan sebagai arsip, tetapi tidak tampil publik.
    await db.Doctor.update({ status_aktif: false }, {
      where: { nama_dokter: ['dr. Budi Santoso', 'dr. Siti Aminah'] },
    });

    for (const item of doctorData) {
      const { schedules, ...doctorFields } = item;
      const [doctor] = await db.Doctor.findOrCreate({
        where: { nama_dokter: doctorFields.nama_dokter },
        defaults: { ...doctorFields, status_aktif: true },
      });

      await doctor.update({
        spesialisasi: item.spesialisasi,
        deskripsi: item.deskripsi,
        status_aktif: true,
      });

      await db.Schedule.destroy({ where: { doctor_id: doctor.id } });
      await db.Schedule.bulkCreate(schedules.map(([hari, jam_mulai, jam_selesai]) => ({
        doctor_id: doctor.id,
        hari,
        jam_mulai,
        jam_selesai,
        status_aktif: true,
      })));
    }

    console.log(`Data ${doctorData.length} dokter dan jadwal praktik berhasil diperbarui.`);
  } catch (error) {
    console.error('Gagal memperbarui dokter dan jadwal:', error.message);
    process.exitCode = 1;
  } finally {
    await db.sequelize.close();
  }
};

run();
