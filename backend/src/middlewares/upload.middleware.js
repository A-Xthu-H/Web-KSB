import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { sendResponse } from '../utils/responseHandler.js';
import { cloudinaryAKtif, uploadKeCloudinary } from '../config/cloudinary.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder penyimpanan lokal — dipakai sebagai fallback bila Cloudinary belum dikonfigurasi.
const uploadDir = path.resolve(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileFilter = (req, file, cb) => {
  const diizinkan = /jpeg|jpg|png|webp|gif/;
  const validExt = diizinkan.test(path.extname(file.originalname).toLowerCase());
  const validMime = diizinkan.test(file.mimetype);
  if (validExt && validMime) return cb(null, true);
  cb(new Error('Hanya file gambar (jpg, jpeg, png, webp, gif) yang diizinkan'));
};

// Simpan di memori agar buffer bisa diunggah ke Cloudinary; fallback ditulis ke disk.
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // maks 5MB
});

// Menyimpan buffer gambar: ke Cloudinary bila aktif, jika tidak ke folder lokal.
// Mengembalikan objek { url, provider, filename }.
export const simpanGambar = async (file) => {
  if (cloudinaryAKtif) {
    const hasil = await uploadKeCloudinary(file.buffer);
    return { url: hasil.secure_url, provider: 'cloudinary', filename: hasil.public_id };
  }

  // Fallback: tulis buffer ke folder public/uploads.
  const unik = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const filename = `img-${unik}${path.extname(file.originalname)}`;
  fs.writeFileSync(path.resolve(uploadDir, filename), file.buffer);
  return { url: `/uploads/${filename}`, provider: 'lokal', filename };
};

// Middleware untuk menangani error multer dengan format respons yang konsisten.
export const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return sendResponse(res, 400, err.message || 'Gagal mengunggah file');
  }
  next();
};
