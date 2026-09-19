import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { Op } from 'sequelize';
import { connectDB } from './config/db.config.js';
import db from './models/index.js';
import cloudinary, { cloudinaryAKtif } from './config/cloudinary.config.js';

const defaultMediaDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../outputs/manual-20260919-232000-ksb/presentations/ksb-media-source/unpacked/ppt/media',
);
const mediaDir = process.env.KSB_SOURCE_MEDIA_DIR || defaultMediaDir;
const doctorPoster = process.env.KSB_DOCTOR_POSTER || 'C:/Users/ALI/Pictures/ksb/WhatsApp Image 2026-09-19 at 5.08.38 PM.jpeg';
const dentalPoster = process.env.KSB_DENTAL_POSTER || 'C:/Users/ALI/Pictures/ksb/WhatsApp Image 2026-09-19 at 5.08.39 PM.jpeg';

const upload = async (key, file) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: 'klinik-sehat-bagendit/official',
    public_id: key,
    overwrite: true,
    resource_type: 'image',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  });
  return { url: result.secure_url, publicId: result.public_id };
};

const croppedUrl = (publicId, x, y, width, height) => cloudinary.url(publicId, {
  secure: true,
  transformation: [
    { crop: 'crop', x, y, width, height },
    { crop: 'fill', width: 640, height: 800, gravity: 'center' },
    { quality: 'auto', fetch_format: 'auto' },
  ],
});

const run = async () => {
  if (!cloudinaryAKtif) throw new Error('Cloudinary belum aktif. Lengkapi konfigurasi Cloudinary terlebih dahulu.');
  await connectDB();
  await db.sequelize.sync();

  const media = {};
  media.clinic = await upload('clinic-exterior', path.join(mediaDir, 'image1.jpeg'));
  media.asep = await upload('doctor-asep-ichsannurdin', path.join(mediaDir, 'image4.jpeg'));
  media.handri = await upload('structure-handri-priyatna', path.join(mediaDir, 'image5.jpeg'));
  media.aprina = await upload('doctor-aprina-handayani', path.join(mediaDir, 'image6.jpeg'));
  media.syahrial = await upload('doctor-syahrial', path.join(mediaDir, 'image7.jpeg'));
  media.ade = await upload('structure-ade-yusuf', path.join(mediaDir, 'image8.jpeg'));
  media.jumyati = await upload('structure-jumyati', path.join(mediaDir, 'image9.jpeg'));
  media.yudha = await upload('structure-yudha-anfal', path.join(mediaDir, 'image10.jpeg'));
  media.meita = await upload('structure-meita-rahayu', path.join(mediaDir, 'image11.jpeg'));
  media.uswatun = await upload('structure-uswatun-hasanah', path.join(mediaDir, 'image12.jpeg'));
  media.hegar = await upload('structure-hegar-feby-apriani', path.join(mediaDir, 'image13.jpeg'));
  media.nita = await upload('structure-nita-septiani', path.join(mediaDir, 'image15.jpeg'));
  media.ilmar = await upload('structure-ilmar-munawaroh', path.join(mediaDir, 'image16.jpeg'));
  media.rahman = await upload('structure-rahman-surahman', path.join(mediaDir, 'image19.jpeg'));
  media.susi = await upload('structure-susi-nurwinti', path.join(mediaDir, 'image18.jpeg'));
  media.fauziah = await upload('structure-fauziah-elsa-nafisah', path.join(mediaDir, 'image17.jpeg'));
  media.tammy = await upload('structure-tammy-ajeng-rahayu', path.join(mediaDir, 'image20.jpeg'));
  media.doctorSchedule = await upload('doctor-schedule-september-2026', doctorPoster);
  media.dentalSchedule = await upload('dental-schedule-september-2026', dentalPoster);

  const photoUrls = {
    'dr. Asep Ichsannurdin': media.asep.url,
    'dr. Syahrial': media.syahrial.url,
    'dr. Aprina Handayani': media.aprina.url,
    // Crop langsung dari poster resmi, bukan gambar wajah hasil generatif.
    'dr. Novri': croppedUrl(media.doctorSchedule.publicId, 670, 300, 230, 230),
    'dr. Arie Galih M': croppedUrl(media.doctorSchedule.publicId, 390, 700, 250, 250),
    'drg. Fikri S Mahmud, AIFO': croppedUrl(media.dentalSchedule.publicId, 65, 410, 410, 410),
  };
  for (const [nama_dokter, foto_url] of Object.entries(photoUrls)) {
    await db.Doctor.update({ foto_url }, { where: { nama_dokter } });
  }

  await db.Facility.update({ foto_url: media.clinic.url }, { where: {} });
  await db.Service.update({ foto_url: media.clinic.url }, { where: { nama: { [Op.ne]: 'Pelayanan Gigi' } } });
  await db.Service.update({ foto_url: media.dentalSchedule.url }, { where: { nama: 'Pelayanan Gigi' } });

  await db.Content.update({ imageUrl: media.clinic.url }, { where: { section: ['tentang-kami', 'sejarah', 'fasilitas-um'] } });
  await db.Content.update({ imageUrl: media.dentalSchedule.url }, { where: { section: 'poli-gigi' } });

  const settings = {
    hero_banner: media.clinic.url,
    poli_gigi_banner: media.dentalSchedule.url,
    struktur_asep: media.asep.url,
    struktur_handri: media.handri.url,
    struktur_aprina: media.aprina.url,
    struktur_syahrial: media.syahrial.url,
    struktur_ade: media.ade.url,
    struktur_jumyati: media.jumyati.url,
    struktur_yudha: media.yudha.url,
    struktur_meita: media.meita.url,
    struktur_uswatun: media.uswatun.url,
    struktur_hegar: media.hegar.url,
    struktur_nita: media.nita.url,
    struktur_ilmar: media.ilmar.url,
    struktur_rahman: media.rahman.url,
    struktur_susi: media.susi.url,
    struktur_fauziah: media.fauziah.url,
    struktur_tammy: media.tammy.url,
  };
  for (const [kunci_pengaturan, nilai] of Object.entries(settings)) {
    await db.Setting.upsert({ kunci_pengaturan, nilai });
  }

  console.log(`Media resmi berhasil diunggah dan diterapkan (${Object.keys(media).length} aset).`);
};

run()
  .catch((error) => { console.error('Gagal mengimpor media resmi:', error.message); process.exitCode = 1; })
  .finally(async () => { await db.sequelize.close(); });
