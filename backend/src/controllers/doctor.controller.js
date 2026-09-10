import Doctor from '../models/doctor.model.js';
import { sendResponse } from '../utils/responseHandler.js';

export const getAllDoctors = (req, res) => {
  Doctor.findAll((err, doctors) => {
    if (err) {
      return sendResponse(res, 500, 'Terjadi kesalahan pada server', err.message);
    }
    sendResponse(res, 200, 'Data dokter berhasil diambil', doctors);
  });
};