import express from 'express';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Publik
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);

// Admin (dilindungi JWT)
router.post('/', verifyToken, createDoctor);
router.put('/:id', verifyToken, updateDoctor);
router.delete('/:id', verifyToken, deleteDoctor);

export default router;