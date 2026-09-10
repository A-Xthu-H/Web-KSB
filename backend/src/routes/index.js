import express from 'express';
import doctorRoutes from './doctor.routes.js';

const router = express.Router();

// Hubungkan rute dengan menyertakan ekstensi .js
router.use('/doctors', doctorRoutes);

export default router;