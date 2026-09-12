import Service from '../models/service.model.js';
import { sendResponse } from '../utils/responseHandler.js';

// GET /api/services  (publik)
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({ order: [['id', 'ASC']] });
    sendResponse(res, 200, 'Data layanan berhasil diambil', services);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// GET /api/services/:id  (publik)
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return sendResponse(res, 404, 'Layanan tidak ditemukan');
    sendResponse(res, 200, 'Detail layanan berhasil diambil', service);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// POST /api/services  (admin)
export const createService = async (req, res) => {
  try {
    const { kategori, nama, deskripsi, foto_url } = req.body;
    if (!kategori || !nama) {
      return sendResponse(res, 400, 'Kategori dan nama wajib diisi');
    }
    const service = await Service.create({ kategori, nama, deskripsi, foto_url });
    sendResponse(res, 201, 'Layanan berhasil ditambahkan', service);
  } catch (error) {
    sendResponse(res, 400, 'Gagal menambahkan layanan', error.message);
  }
};

// PUT /api/services/:id  (admin)
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return sendResponse(res, 404, 'Layanan tidak ditemukan');
    const { kategori, nama, deskripsi, foto_url } = req.body;
    await service.update({ kategori, nama, deskripsi, foto_url });
    sendResponse(res, 200, 'Layanan berhasil diperbarui', service);
  } catch (error) {
    sendResponse(res, 400, 'Gagal memperbarui layanan', error.message);
  }
};

// DELETE /api/services/:id  (admin)
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return sendResponse(res, 404, 'Layanan tidak ditemukan');
    await service.destroy();
    sendResponse(res, 200, 'Layanan berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};
