import 'dotenv/config';
import { connectDB } from './config/db.config.js';
import db from './models/index.js';

// Skrip seed: membuat akun admin default.
// Jalankan dengan: npm run seed
const seed = async () => {
  try {
    await connectDB();
    await db.sequelize.sync();

    const email = process.env.SEED_ADMIN_EMAIL || 'admin@kliniksehatbagendit.com';
    const password = process.env.SEED_ADMIN_PASSWORD || 'admin12345';

    const [admin, created] = await db.User.findOrCreate({
      where: { email },
      defaults: {
        nama_lengkap: 'Administrator Klinik',
        email,
        password_hash: password, // otomatis di-hash oleh hook model
        role: 'superadmin',
      },
    });

    if (created) {
      console.log(`Akun admin dibuat -> email: ${email} | password: ${password}`);
    } else {
      console.log(`Akun admin dengan email ${email} sudah ada (id: ${admin.id}).`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Gagal melakukan seeding:', error.message);
    process.exit(1);
  }
};

seed();
