import express from 'express';
import {
  getAllSettings,
  upsertSetting,
  deleteSetting,
} from '../controllers/setting.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Publik
router.get('/', getAllSettings);

// Admin (dilindungi JWT)
router.put('/:key', verifyToken, upsertSetting);
router.delete('/:key', verifyToken, deleteSetting);

export default router;
