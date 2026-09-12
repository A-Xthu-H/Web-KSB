import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { sendResponse } from '../utils/responseHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder penyimpanan sementara untuk upload lokal.
// Di FASE 5 middleware ini akan diganti/diarahkan ke Cloudinary.
const uploadDir = path.resolve(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unik = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `img-${unik}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const diizinkan = /jpeg|jpg|png|webp|gif/;
  const validExt = diizinkan.test(path.extname(file.originalname).toLowerCase());
  const validMime = diizinkan.test(file.mimetype);
  if (validExt && validMime) return cb(null, true);
  cb(new Error('Hanya file gambar (jpg, jpeg, png, webp, gif) yang diizinkan'));
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // maks 5MB
});

// Middleware untuk menangani error multer dengan format respons yang konsisten.
export const uploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return sendResponse(res, 400, err.message || 'Gagal mengunggah file');
  }
  next();
};
