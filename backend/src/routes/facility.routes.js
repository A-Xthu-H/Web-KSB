import express from 'express';
import {
  getAllFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
} from '../controllers/facility.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Publik
router.get('/', getAllFacilities);
router.get('/:id', getFacilityById);

// Admin (dilindungi JWT)
router.post('/', verifyToken, createFacility);
router.put('/:id', verifyToken, updateFacility);
router.delete('/:id', verifyToken, deleteFacility);

export default router;
