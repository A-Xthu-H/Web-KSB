import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Keamanan header HTTP (bab 6 PRD).
// crossOriginResourcePolicy dilonggarkan agar gambar dapat dimuat lintas origin (frontend).
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Batasi jumlah permintaan untuk mencegah penyalahgunaan (rate limiting).
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Terlalu banyak permintaan, coba lagi nanti.' },
});
app.use('/api', limiter);

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sajikan file gambar hasil upload secara statis.
app.use('/uploads', express.static(path.resolve(__dirname, '../public/uploads')));

app.use('/api', apiRoutes);

// Opsi deployment satu server: sajikan hasil build frontend bila ada.
// (Berguna bila frontend & backend disatukan di satu VPS tanpa Nginx terpisah.)
const frontendDist = path.resolve(__dirname, '../../frontend/dist');
if (process.env.SERVE_FRONTEND === 'true' && fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // SPA fallback: rute non-API diarahkan ke index.html.
  // Catatan: Express 5 tidak lagi menerima pola '*'; gunakan middleware catch-all.
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  app.use((req, res) => {
    res.status(404).json({ status: 'error', message: 'Endpoint tidak ditemukan' });
  });
}

export default app;