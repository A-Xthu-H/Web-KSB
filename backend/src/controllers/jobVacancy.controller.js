import JobVacancy from '../models/jobVacancy.model.js';
import { sendResponse } from '../utils/responseHandler.js';

// GET /api/jobs  (publik) — ?status=buka untuk filter lowongan aktif
export const getAllJobs = async (req, res) => {
  try {
    const where = {};
    if (req.query.status) where.status = req.query.status;
    const jobs = await JobVacancy.findAll({ where, order: [['id', 'DESC']] });
    sendResponse(res, 200, 'Data lowongan berhasil diambil', jobs);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// POST /api/jobs  (admin)
export const createJob = async (req, res) => {
  try {
    const { posisi, deskripsi_pekerjaan, persyaratan, status } = req.body;
    if (!posisi) return sendResponse(res, 400, 'Posisi wajib diisi');
    const job = await JobVacancy.create({
      posisi,
      deskripsi_pekerjaan,
      persyaratan,
      status: status || 'buka',
    });
    sendResponse(res, 201, 'Lowongan berhasil ditambahkan', job);
  } catch (error) {
    sendResponse(res, 400, 'Gagal menambahkan lowongan', error.message);
  }
};

// PUT /api/jobs/:id  (admin) — termasuk ubah status buka/tutup
export const updateJob = async (req, res) => {
  try {
    const job = await JobVacancy.findByPk(req.params.id);
    if (!job) return sendResponse(res, 404, 'Lowongan tidak ditemukan');
    const { posisi, deskripsi_pekerjaan, persyaratan, status } = req.body;
    await job.update({ posisi, deskripsi_pekerjaan, persyaratan, status });
    sendResponse(res, 200, 'Lowongan berhasil diperbarui', job);
  } catch (error) {
    sendResponse(res, 400, 'Gagal memperbarui lowongan', error.message);
  }
};

// DELETE /api/jobs/:id  (admin)
export const deleteJob = async (req, res) => {
  try {
    const job = await JobVacancy.findByPk(req.params.id);
    if (!job) return sendResponse(res, 404, 'Lowongan tidak ditemukan');
    await job.destroy();
    sendResponse(res, 200, 'Lowongan berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};
