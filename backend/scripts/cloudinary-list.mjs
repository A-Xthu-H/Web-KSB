import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

// =====================================================================
// Script: lihat & catat daftar foto yang tersimpan di Cloudinary.
//
// Cara pakai (dari folder backend):
//   node scripts/cloudinary-list.mjs            -> tampilkan daftar di terminal
//   node scripts/cloudinary-list.mjs --save     -> simpan ke cloudinary-assets.json
//   node scripts/cloudinary-list.mjs --download -> unduh semua gambar ke ./cloudinary-download
//
// Membaca kredensial dari backend/.env (CLOUDINARY_*).
// =====================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const args = process.argv.slice(2);
const opsiSimpan = args.includes('--save');
const opsiUnduh = args.includes('--download');

// Ambil SEMUA resource (mendukung paginasi otomatis).
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
  console.log(`Total gambar: ${aset.length}\n`);

  aset.forEach((a, i) => {
    console.log(`${String(i + 1).padStart(3)}. ${a.public_id}`);
    console.log(`     URL   : ${a.secure_url}`);
    console.log(`     Format: ${a.format} | ${a.width}x${a.height} | ${(a.bytes / 1024).toFixed(0)} KB`);
  });

  if (opsiSimpan) {
    const ringkas = aset.map((a) => ({
      public_id: a.public_id,
      url: a.secure_url,
      format: a.format,
      width: a.width,
      height: a.height,
      bytes: a.bytes,
      created_at: a.created_at,
    }));
    const outPath = path.resolve(__dirname, '../cloudinary-assets.json');
    fs.writeFileSync(outPath, JSON.stringify(ringkas, null, 2));
    console.log(`\n💾 Daftar disimpan ke: ${outPath}`);
  }

  if (opsiUnduh) {
    const dir = path.resolve(__dirname, '../cloudinary-download');
    fs.mkdirSync(dir, { recursive: true });

    console.log(`\n⬇️  Mengunduh ${aset.length} gambar ke: ${dir}`);
    for (const a of aset) {
      const namaFile = a.public_id.replace(/\//g, '__') + '.' + a.format;
      const res = await fetch(a.secure_url);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(path.join(dir, namaFile), buf);
      console.log(`   ✔ ${namaFile}`);
    }
    console.log('Selesai mengunduh.');
  }
};

main().catch((e) => {
  console.error('Gagal:', e.message || e);
});
