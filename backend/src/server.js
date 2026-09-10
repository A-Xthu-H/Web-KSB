import express from 'express';
import cors from 'cors';
import sequelize from './config/db.config.js';
import contentRoutes from './routes/content.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/content', contentRoutes);

const PORT = 5000;

// Sinkronisasi database lalu jalankan server
sequelize.sync().then(() => {
  console.log('Database SQLite siap dan terhubung!');
  app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
}).catch(err => {
  console.error('Gagal menghubungkan database:', err);
});