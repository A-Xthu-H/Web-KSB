import express from 'express';
import {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobVacancy.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Publik
router.get('/', getAllJobs);

// Admin (dilindungi JWT)
router.post('/', verifyToken, createJob);
router.put('/:id', verifyToken, updateJob);
router.delete('/:id', verifyToken, deleteJob);

export default router;
