import express from 'express';
import {
  getAllArticles,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/article.controller.js';
import { optionalToken, verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Publik
router.get('/', optionalToken, getAllArticles);
router.get('/:slug', optionalToken, getArticleBySlug);

// Admin (dilindungi JWT)
router.post('/', verifyToken, createArticle);
router.put('/:id', verifyToken, updateArticle);
router.delete('/:id', verifyToken, deleteArticle);

export default router;
