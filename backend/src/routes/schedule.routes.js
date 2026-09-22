import express from 'express';
import {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../controllers/schedule.controller.js';
import { optionalToken, verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Publik
router.get('/', optionalToken, getAllSchedules);
router.get('/:id', optionalToken, getScheduleById);

// Admin (dilindungi JWT)
router.post('/', verifyToken, createSchedule);
router.put('/:id', verifyToken, updateSchedule);
router.delete('/:id', verifyToken, deleteSchedule);

export default router;
