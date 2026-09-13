import express from 'express';
import { upload, simpanGambar } from '../middlewares/upload.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { sendResponse } from '../utils/responseHandler.js';

const router = express.Router();

// POST /api/uploads  (admin) — unggah satu file gambar.
// Otomatis ke Cloudinary bila dikonfigurasi, jika tidak disimpan lokal.
router.post('/', verifyToken, upload.single('gambar'), async (req, res) => {
  if (!req.file) {
    return sendResponse(res, 400, 'Tidak ada file yang diunggah');
  }
  try {
    const { url, provider, filename } = await simpanGambar(req.file);
    sendResponse(res, 201, 'File berhasil diunggah', {
      filename,
      url,
      provider,
      size: req.file.size,
    });
  } catch (error) {
    sendResponse(res, 500, 'Gagal mengunggah gambar', error.message);
  }
});

export default router;
