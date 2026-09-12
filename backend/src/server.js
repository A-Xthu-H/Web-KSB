import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.config.js';
import db from './models/index.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // 1. Pastikan koneksi database aktif terlebih dahulu.
  await connectDB();

  // 2. Sinkronkan model ke skema database.
  //    Gunakan { alter: true } saat pengembangan; untuk produksi pakai migrasi.
  await db.sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
  console.log('Sinkronisasi model database selesai.');

  // 3. Jalankan server HTTP.
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
};

startServer();