import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.config.js';
import db from './models/index.js';

const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

const startServer = async () => {
  // 1. Pastikan koneksi database aktif terlebih dahulu.
  await connectDB();

  // 2. Sinkronkan model ke skema database.
  //    - Development : alter true (menyesuaikan perubahan skema otomatis).
  //    - Produksi    : sync biasa (membuat tabel bila belum ada, tanpa mengubah data).
  await db.sequelize.sync(isDev ? { alter: true } : undefined);
  console.log('Sinkronisasi model database selesai.');

  // 3. Jalankan server HTTP.
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`);
  });
};

startServer();