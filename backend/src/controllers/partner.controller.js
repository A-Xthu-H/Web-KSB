import Partner from '../models/partner.model.js';
import { sendResponse } from '../utils/responseHandler.js';

// GET /api/partners  (publik)
export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.findAll({ order: [['id', 'ASC']] });
    sendResponse(res, 200, 'Data mitra berhasil diambil', partners);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// POST /api/partners  (admin)
export const createPartner = async (req, res) => {
  try {
    const { nama_mitra, logo_url, jenis } = req.body;
    if (!nama_mitra) return sendResponse(res, 400, 'Nama mitra wajib diisi');
    const partner = await Partner.create({ nama_mitra, logo_url, jenis });
    sendResponse(res, 201, 'Mitra berhasil ditambahkan', partner);
  } catch (error) {
    sendResponse(res, 400, 'Gagal menambahkan mitra', error.message);
  }
};

// PUT /api/partners/:id  (admin)
export const updatePartner = async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) return sendResponse(res, 404, 'Mitra tidak ditemukan');
    const { nama_mitra, logo_url, jenis } = req.body;
    await partner.update({ nama_mitra, logo_url, jenis });
    sendResponse(res, 200, 'Mitra berhasil diperbarui', partner);
  } catch (error) {
    sendResponse(res, 400, 'Gagal memperbarui mitra', error.message);
  }
};

// DELETE /api/partners/:id  (admin)
export const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByPk(req.params.id);
    if (!partner) return sendResponse(res, 404, 'Mitra tidak ditemukan');
    await partner.destroy();
    sendResponse(res, 200, 'Mitra berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};
