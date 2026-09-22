import jwt from 'jsonwebtoken';
import { sendResponse } from '../utils/responseHandler.js';

// Melindungi rute CMS: menolak akses tanpa token JWT valid.
export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return sendResponse(res, 401, 'Akses ditolak, token tidak ditemukan');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_dev');
    // Hanya peran pengelola CMS yang boleh memakai rute admin. Ini tetap
    // kompatibel dengan role yang didefinisikan model User (admin/superadmin).
    if (!['admin', 'superadmin'].includes(decoded.role)) {
      return sendResponse(res, 403, 'Anda tidak memiliki hak akses CMS');
    }
    req.user = decoded;
    next();
  } catch (error) {
    return sendResponse(res, 401, 'Token tidak valid atau sudah kedaluwarsa');
  }
};

// Endpoint artikel dipakai bersama oleh halaman publik dan panel admin.
// Token bersifat opsional di rute baca: tanpa token hanya konten published
// yang dikembalikan, sedangkan admin yang terautentikasi dapat melihat draft.
export const optionalToken = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_dev');
    if (!['admin', 'superadmin'].includes(decoded.role)) {
      return sendResponse(res, 403, 'Anda tidak memiliki hak akses CMS');
    }
    req.user = decoded;
    next();
  } catch (error) {
    return sendResponse(res, 401, 'Token tidak valid atau sudah kedaluwarsa');
  }
};

// Membatasi akses hanya untuk role tertentu.
export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return sendResponse(res, 403, 'Anda tidak memiliki hak akses');
  }
  next();
};
