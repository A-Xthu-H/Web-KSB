import Setting from '../models/setting.model.js';
import { sendResponse } from '../utils/responseHandler.js';

// GET /api/settings  (publik) — pengaturan umum website
export const getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll({ order: [['id', 'ASC']] });
    sendResponse(res, 200, 'Data pengaturan berhasil diambil', settings);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// PUT /api/settings/:key  (admin) — upsert berdasarkan kunci_pengaturan
export const upsertSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { nilai } = req.body;
    if (nilai === undefined) return sendResponse(res, 400, 'Nilai pengaturan wajib diisi');

    const [setting, created] = await Setting.findOrCreate({
      where: { kunci_pengaturan: key },
      defaults: { kunci_pengaturan: key, nilai },
    });

    if (!created) await setting.update({ nilai });

    sendResponse(res, created ? 201 : 200, 'Pengaturan berhasil disimpan', setting);
  } catch (error) {
    sendResponse(res, 400, 'Gagal menyimpan pengaturan', error.message);
  }
};

// DELETE /api/settings/:key  (admin)
export const deleteSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne({ where: { kunci_pengaturan: req.params.key } });
    if (!setting) return sendResponse(res, 404, 'Pengaturan tidak ditemukan');
    await setting.destroy();
    sendResponse(res, 200, 'Pengaturan berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};
