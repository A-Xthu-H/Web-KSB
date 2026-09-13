import { v2 as cloudinary } from 'cloudinary';

// Konfigurasi Cloudinary dari environment (bab 3 & 6 PRD).
// Bila kredensial kosong, helper ini melaporkan bahwa Cloudinary tidak aktif
// sehingga upload akan memakai penyimpanan lokal sebagai fallback.
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const cloudinaryAKtif = Boolean(cloudName && apiKey && apiSecret);

if (cloudinaryAKtif) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

// Unggah buffer gambar ke Cloudinary, kembalikan URL aman (https).
// Menggunakan folder "klinik-sehat-bagendit" dan transformasi kompresi otomatis
// (quality auto, format auto) sesuai kebutuhan performa PRD (bab 6).
export const uploadKeCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'klinik-sehat-bagendit',
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });

export default cloudinary;
