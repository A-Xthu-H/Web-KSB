import express from 'express';
import {
  getAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from '../controllers/partner.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Publik
router.get('/', getAllPartners);

// Admin (dilindungi JWT)
router.post('/', verifyToken, createPartner);
router.put('/:id', verifyToken, updatePartner);
router.delete('/:id', verifyToken, deletePartner);

export default router;
