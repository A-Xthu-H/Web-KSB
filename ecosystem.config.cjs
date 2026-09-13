// Konfigurasi PM2 untuk backend (VPS).
// Jalankan: pm2 start ecosystem.config.cjs
// Simpan agar auto-start: pm2 save && pm2 startup
module.exports = {
  apps: [
    {
      name: 'ksb-backend',
      script: 'src/server.js',
      cwd: './backend',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Restart otomatis bila memori berlebih.
      max_memory_restart: '400M',
      // Log
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      time: true,
    },
  ],
};
