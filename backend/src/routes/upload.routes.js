import express from 'express';
import { upload } from '../middlewares/upload.middleware.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { sendResponse } from '../utils/responseHandler.js';

const router = express.Router();

// POST /api/uploads  (admin) — unggah satu file gambar, kembalikan URL-nya.
router.post('/', verifyToken, upload.single('gambar'), (req, res) => {
  if (!req.file) {
    return sendResponse(res, 400, 'Tidak ada file yang diunggah');
  }
  const url = `/uploads/${req.file.filename}`;
  sendResponse(res, 201, 'File berhasil diunggah', {
    filename: req.file.filename,
    url,
    size: req.file.size,
  });
});

export default router;
