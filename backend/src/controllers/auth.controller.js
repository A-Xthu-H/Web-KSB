import jwt from 'jsonwebtoken';
import User from '../models/admin.model.js';
import { sendResponse } from '../utils/responseHandler.js';

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'secret_dev',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, 'Email dan password wajib diisi');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendResponse(res, 401, 'Email atau password salah');
    }

    const cocok = await user.comparePassword(password);
    if (!cocok) {
      return sendResponse(res, 401, 'Email atau password salah');
    }

    const token = signToken(user);

    return sendResponse(res, 200, 'Login berhasil', {
      token,
      user: {
        id: user.id,
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// GET /api/auth/me (butuh token)
export const me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'nama_lengkap', 'email', 'role'],
    });
    if (!user) {
      return sendResponse(res, 404, 'Pengguna tidak ditemukan');
    }
    return sendResponse(res, 200, 'Data pengguna berhasil diambil', user);
  } catch (error) {
    return sendResponse(res, 500, 'Terjadi kesalahan pada server', error.message);
  }
};

// POST /api/auth/logout
export const logout = async (req, res) => {
  // JWT bersifat stateless; logout di sisi klien dengan menghapus token.
  return sendResponse(res, 200, 'Logout berhasil');
};
