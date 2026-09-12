import Message from '../models/message.model.js';
import { sendResponse } from '../utils/responseHandler.js';

// POST /api/messages  (publik) — kirim pesan dari formulir kontak
export const createMessage = async (req, res) => {
  try {
    const { nama, email, telepon, isi } = req.body;
    if (!nama || !isi) return sendResponse(res, 400, 'Nama dan isi pesan wajib diisi');
    const message = await Message.create({ nama, email, telepon, isi });
    sendResponse(res, 201, 'Pesan berhasil dikirim', message);
  } catch (error) {
    sendResponse(res, 400, 'Gagal mengirim pesan', error.message);
  }
};

// GET /api/messages  (admin) — daftar pesan masuk
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [['created_at', 'DESC']] });
    sendResponse(res, 200, 'Data pesan berhasil diambil', messages);
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// PUT /api/messages/:id/read  (admin) — tandai pesan sudah dibaca
export const markMessageRead = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return sendResponse(res, 404, 'Pesan tidak ditemukan');
    await message.update({ dibaca: true });
    sendResponse(res, 200, 'Pesan ditandai sudah dibaca', message);
  } catch (error) {
    sendResponse(res, 400, 'Gagal memperbarui pesan', error.message);
  }
};

// DELETE /api/messages/:id  (admin)
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return sendResponse(res, 404, 'Pesan tidak ditemukan');
    await message.destroy();
    sendResponse(res, 200, 'Pesan berhasil dihapus');
  } catch (error) {
    sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};
