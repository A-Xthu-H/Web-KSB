import Doctor from '../models/doctor.model.js';
import Schedule from '../models/schedule.model.js';
import { sendResponse } from '../utils/responseHandler.js';

// GET /api/doctors  (publik)
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      where: { status_aktif: true },
      include: [{ model: Schedule, as: 'schedules' }],
      order: [['id', 'ASC']],
    });
    sendResponse(res, 200, 'Data dokter berhasil diambil', doctors);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// GET /api/doctors/:id  (publik)
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id, {
      include: [{ model: Schedule, as: 'schedules' }],
    });
    if (!doctor) return sendResponse(res, 404, 'Dokter tidak ditemukan');
    sendResponse(res, 200, 'Detail dokter berhasil diambil', doctor);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// POST /api/doctors  (admin)
export const createDoctor = async (req, res) => {
  try {
    const { nama_dokter, spesialisasi, foto_url, deskripsi, status_aktif } = req.body;
    if (!nama_dokter) return sendResponse(res, 400, 'Nama dokter wajib diisi');
    const doctor = await Doctor.create({
      nama_dokter,
      spesialisasi,
      foto_url,
      deskripsi,
      status_aktif: status_aktif ?? true,
    });
    sendResponse(res, 201, 'Dokter berhasil ditambahkan', doctor);
  } catch (error) {
    sendResponse(res, 400, 'Gagal menambahkan dokter', error.message);
  }
};

// PUT /api/doctors/:id  (admin)
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return sendResponse(res, 404, 'Dokter tidak ditemukan');
    const { nama_dokter, spesialisasi, foto_url, deskripsi, status_aktif } = req.body;
    await doctor.update({ nama_dokter, spesialisasi, foto_url, deskripsi, status_aktif });
    sendResponse(res, 200, 'Dokter berhasil diperbarui', doctor);
  } catch (error) {
    sendResponse(res, 400, 'Gagal memperbarui dokter', error.message);
  }
};

// DELETE /api/doctors/:id  (admin)
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) return sendResponse(res, 404, 'Dokter tidak ditemukan');
    await doctor.destroy(); // schedules ikut terhapus (onDelete CASCADE via asosiasi)
    sendResponse(res, 200, 'Dokter berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};