import express from 'express';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller.js';
import { optionalToken, verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Publik
router.get('/', optionalToken, getAllDoctors);
router.get('/:id', optionalToken, getDoctorById);

// Admin (dilindungi JWT)
router.post('/', verifyToken, createDoctor);
router.put('/:id', verifyToken, updateDoctor);
router.delete('/:id', verifyToken, deleteDoctor);

export default router;
