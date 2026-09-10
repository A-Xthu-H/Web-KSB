import express from 'express';
// Perhatikan: Pastikan nama file model Anda benar (biasanya berakhiran .model.js, bukan .module.js)
import Content from '../models/content.model.js'; 

const router = express.Router();

// GET: Ambil semua konten untuk web utama
router.get('/', async (req, res) => {
  try {
    const contents = await Content.findAll();
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Tambah konten baru
router.post('/', async (req, res) => {
  const { section, title, body, imageUrl } = req.body;
  try {
    const newContent = await Content.create({ section, title, body, imageUrl });
    res.status(201).json(newContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;