import Article from '../models/article.model.js';
import User from '../models/admin.model.js';
import { sendResponse } from '../utils/responseHandler.js';

// Membuat slug dari judul: huruf kecil, spasi -> tanda hubung, buang karakter non-aman.
const buatSlug = (teks = '') =>
  teks
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// GET /api/articles  (publik) — ?status=published untuk filter
export const getAllArticles = async (req, res) => {
  try {
    const where = {};
    if (req.query.status) where.status = req.query.status;

    const articles = await Article.findAll({
      where,
      include: [{ model: User, as: 'penulis', attributes: ['id', 'nama_lengkap'] }],
      order: [['created_at', 'DESC']],
    });
    sendResponse(res, 200, 'Data artikel berhasil diambil', articles);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// GET /api/articles/:slug  (publik) — detail berdasarkan slug
export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({
      where: { slug: req.params.slug },
      include: [{ model: User, as: 'penulis', attributes: ['id', 'nama_lengkap'] }],
    });
    if (!article) return sendResponse(res, 404, 'Artikel tidak ditemukan');
    sendResponse(res, 200, 'Detail artikel berhasil diambil', article);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// POST /api/articles  (admin)
export const createArticle = async (req, res) => {
  try {
    const { judul, konten, thumbnail_url, status } = req.body;
    if (!judul || !konten) {
      return sendResponse(res, 400, 'Judul dan konten wajib diisi');
    }

    let slug = buatSlug(judul);
    // Pastikan slug unik.
    const existing = await Article.findOne({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const article = await Article.create({
      judul,
      slug,
      konten, // HTML dari Rich Text Editor (dibuat di FASE 3)
      thumbnail_url,
      penulis_id: req.user?.id || null,
      status: status || 'draft',
    });
    sendResponse(res, 201, 'Artikel berhasil ditambahkan', article);
  } catch (error) {
    sendResponse(res, 400, 'Gagal menambahkan artikel', error.message);
  }
};

// PUT /api/articles/:id  (admin)
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return sendResponse(res, 404, 'Artikel tidak ditemukan');

    const { judul, konten, thumbnail_url, status } = req.body;
    const data = { konten, thumbnail_url, status };

    // Perbarui judul + slug bila judul berubah.
    if (judul && judul !== article.judul) {
      let slug = buatSlug(judul);
      const existing = await Article.findOne({ where: { slug } });
      if (existing && existing.id !== article.id) slug = `${slug}-${Date.now()}`;
      data.judul = judul;
      data.slug = slug;
    }

    await article.update(data);
    sendResponse(res, 200, 'Artikel berhasil diperbarui', article);
  } catch (error) {
    sendResponse(res, 400, 'Gagal memperbarui artikel', error.message);
  }
};

// DELETE /api/articles/:id  (admin)
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return sendResponse(res, 404, 'Artikel tidak ditemukan');
    await article.destroy();
    sendResponse(res, 200, 'Artikel berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};
