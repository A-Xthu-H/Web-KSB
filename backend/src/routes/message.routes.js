import express from 'express';
import {
  createMessage,
  getAllMessages,
  markMessageRead,
  deleteMessage,
} from '../controllers/message.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Publik — formulir kontak
router.post('/', createMessage);

// Admin (dilindungi JWT)
router.get('/', verifyToken, getAllMessages);
router.put('/:id/read', verifyToken, markMessageRead);
router.delete('/:id', verifyToken, deleteMessage);

export default router;
