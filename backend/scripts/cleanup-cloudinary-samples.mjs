import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

// =====================================================================
// Script: HAPUS gambar SAMPEL BAWAAN Cloudinary (samples/, cld-sample, dll.)
// TIDAK menyentuh folder "klinik-sehat-bagendit/".
//
// Cara pakai (dari folder backend):
//   node scripts/cleanup-cloudinary-samples.mjs          -> lihat apa yang akan dihapus (dry run)
//   node scripts/cleanup-cloudinary-samples.mjs --hapus   -> benar-benar menghapus
//
// Aman: ada penjagaan ganda agar aset klinik Anda tidak pernah terhapus.
// =====================================================================

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error('❌ Kredensial Cloudinary belum lengkap di backend/.env');
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const BENAR_HAPUS = process.argv.includes('--hapus');

// Folder/prefix yang DILINDUNGI — JANGAN pernah dihapus.
const DILINDUNGI = ['klinik-sehat-bagendit'];

// Penanda bahwa aset adalah sampel bawaan Cloudinary.
const polaSampel = (publicId) =>
  publicId.startsWith('samples/') ||
  publicId === 'cld-sample' ||
  publicId.startsWith('cld-sample-') ||
  publicId.startsWith('main-sample') ||
  publicId.startsWith('demo');

const ambilSemuaAset = async () => {
  const semua = [];
  let nextCursor = null;
  do {
    const res = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      max_results: 500,
      next_cursor: nextCursor,
    });
    semua.push(...res.resources);
    nextCursor = res.next_cursor;
  } while (nextCursor);
  return semua;
};

const main = async () => {
  console.log(`Cloud Name: ${CLOUDINARY_CLOUD_NAME}`);
  console.log('Mengambil daftar aset...\n');

  const aset = await ambilSemuaAset();
  console.log(`Total aset: ${aset.length}`);

  // Pisahkan: dilindungi vs sampel vs lainnya.
  const dilindungi = aset.filter((a) => DILINDUNGI.some((p) => a.public_id.startsWith(p)));
  const sampel = aset.filter(
    (a) => !DILINDUNGI.some((p) => a.public_id.startsWith(p)) && polaSampel(a.public_id)
  );

  console.log(`  • Dilindungi (aset klinik) : ${dilindungi.length}`);
  console.log(`  • Akan dihapus (sampel)    : ${sampel.length}\n`);

  if (sampel.length === 0) {
    console.log('Tidak ada sampel untuk dihapus. Selesai.');
    process.exit(0);
  }

  sampel.forEach((a, i) => console.log(`  ${String(i + 1).padStart(2)}. ${a.public_id}`));

  if (!BENAR_HAPUS) {
    console.log('\n⚠️  MODE DRY RUN — belum menghapus apa pun.');
    console.log('   Jalankan ulang dengan flag --hapus untuk benar-benar menghapus.');
    process.exit(0);
  }

  console.log('\n🗑️  Menghapus...');
  const ids = sampel.map((a) => a.public_id);

  // Cloudinary menghapus maksimal 100 per panggilan.
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100);
    const hasil = await cloudinary.api.delete_resources(batch);
    const sukses = Object.values(hasil.deleted || {}).filter((s) => s === 'deleted').length;
    console.log(`   Batch ${i / 100 + 1}: ${sukses}/${batch.length} terhapus`);
  }

  console.log('\nSelesai menghapus sampel.');
  process.exit(0);
};

main().catch((e) => {
  console.error('Gagal:', e.message || e);
  process.exit(1);
});
