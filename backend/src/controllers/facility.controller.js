import Facility from '../models/facility.model.js';
import { sendResponse } from '../utils/responseHandler.js';

// GET /api/facilities  (publik)
export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.findAll({ order: [['id', 'ASC']] });
    sendResponse(res, 200, 'Data fasilitas berhasil diambil', facilities);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// GET /api/facilities/:id  (publik)
export const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) return sendResponse(res, 404, 'Fasilitas tidak ditemukan');
    sendResponse(res, 200, 'Detail fasilitas berhasil diambil', facility);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// POST /api/facilities  (admin)
export const createFacility = async (req, res) => {
  try {
    const { nama, deskripsi, foto_url } = req.body;
    if (!nama) return sendResponse(res, 400, 'Nama fasilitas wajib diisi');
    const facility = await Facility.create({ nama, deskripsi, foto_url });
    sendResponse(res, 201, 'Fasilitas berhasil ditambahkan', facility);
  } catch (error) {
    sendResponse(res, 400, 'Gagal menambahkan fasilitas', error.message);
  }
};

// PUT /api/facilities/:id  (admin)
export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) return sendResponse(res, 404, 'Fasilitas tidak ditemukan');
    const { nama, deskripsi, foto_url } = req.body;
    await facility.update({ nama, deskripsi, foto_url });
    sendResponse(res, 200, 'Fasilitas berhasil diperbarui', facility);
  } catch (error) {
    sendResponse(res, 400, 'Gagal memperbarui fasilitas', error.message);
  }
};

// DELETE /api/facilities/:id  (admin)
export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByPk(req.params.id);
    if (!facility) return sendResponse(res, 404, 'Fasilitas tidak ditemukan');
    await facility.destroy();
    sendResponse(res, 200, 'Fasilitas berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};
