import Schedule from '../models/schedule.model.js';
import Doctor from '../models/doctor.model.js';
import { sendResponse } from '../utils/responseHandler.js';

// GET /api/schedules  (publik) — daftar semua jadwal, bisa difilter ?doctor_id=
export const getAllSchedules = async (req, res) => {
  try {
    const where = {};
    if (req.query.doctor_id) where.doctor_id = req.query.doctor_id;

    const schedules = await Schedule.findAll({
      where,
      include: [{ model: Doctor, as: 'doctor', attributes: ['id', 'nama_dokter', 'spesialisasi'] }],
      order: [['doctor_id', 'ASC'], ['id', 'ASC']],
    });
    sendResponse(res, 200, 'Data jadwal berhasil diambil', schedules);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// GET /api/schedules/:id  (publik)
export const getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id, {
      include: [{ model: Doctor, as: 'doctor', attributes: ['id', 'nama_dokter', 'spesialisasi'] }],
    });
    if (!schedule) return sendResponse(res, 404, 'Jadwal tidak ditemukan');
    sendResponse(res, 200, 'Detail jadwal berhasil diambil', schedule);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// POST /api/schedules  (admin)
export const createSchedule = async (req, res) => {
  try {
    const { doctor_id, hari, jam_mulai, jam_selesai, status_aktif } = req.body;
    if (!doctor_id || !hari || !jam_mulai || !jam_selesai) {
      return sendResponse(res, 400, 'doctor_id, hari, jam_mulai, dan jam_selesai wajib diisi');
    }

    const doctor = await Doctor.findByPk(doctor_id);
    if (!doctor) return sendResponse(res, 404, 'Dokter tidak ditemukan');

    const schedule = await Schedule.create({
      doctor_id, hari, jam_mulai, jam_selesai,
      status_aktif: status_aktif ?? true,
    });
    sendResponse(res, 201, 'Jadwal berhasil ditambahkan', schedule);
  } catch (error) {
    sendResponse(res, 400, 'Gagal menambahkan jadwal', error.message);
  }
};

// PUT /api/schedules/:id  (admin)
export const updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) return sendResponse(res, 404, 'Jadwal tidak ditemukan');
    const { doctor_id, hari, jam_mulai, jam_selesai, status_aktif } = req.body;
    await schedule.update({ doctor_id, hari, jam_mulai, jam_selesai, status_aktif });
    sendResponse(res, 200, 'Jadwal berhasil diperbarui', schedule);
  } catch (error) {
    sendResponse(res, 400, 'Gagal memperbarui jadwal', error.message);
  }
};

// DELETE /api/schedules/:id  (admin)
export const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) return sendResponse(res, 404, 'Jadwal tidak ditemukan');
    await schedule.destroy();
    sendResponse(res, 200, 'Jadwal berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};
