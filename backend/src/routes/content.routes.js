import express from 'express';
import Content from '../models/content.model.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { sendResponse } from '../utils/responseHandler.js';

const router = express.Router();

// GET /api/contents (publik) — ambil semua konten statis untuk web utama.
router.get('/', async (req, res) => {
  try {
    const contents = await Content.findAll({ order: [['section', 'ASC']] });
    sendResponse(res, 200, 'Data konten berhasil diambil', contents);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
});

// POST /api/contents (admin) — tambah konten baru.
router.post('/', verifyToken, async (req, res) => {
  const { section, title, body, imageUrl } = req.body;
  if (!section || !title || !body) {
    return sendResponse(res, 400, 'section, title, dan body wajib diisi');
  }
  try {
    const newContent = await Content.create({ section, title, body, imageUrl });
    sendResponse(res, 201, 'Konten berhasil ditambahkan', newContent);
  } catch (error) {
    sendResponse(res, 400, 'Gagal menambahkan konten', error.message);
  }
});

// PUT /api/contents/:id (admin) — perbarui konten.
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) return sendResponse(res, 404, 'Konten tidak ditemukan');
    const { section, title, body, imageUrl } = req.body;
    await content.update({ section, title, body, imageUrl });
    sendResponse(res, 200, 'Konten berhasil diperbarui', content);
  } catch (error) {
    sendResponse(res, 400, 'Gagal memperbarui konten', error.message);
  }
});

// DELETE /api/contents/:id (admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id);
    if (!content) return sendResponse(res, 404, 'Konten tidak ditemukan');
    await content.destroy();
    sendResponse(res, 200, 'Konten berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
});

export default router;