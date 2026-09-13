# ---- Backend (Express + Node.js) ----
FROM node:20-alpine

# Working directory
WORKDIR /app

# Install dependensi (production)
COPY package*.json ./
RUN npm install --omit=dev

# Copy source
COPY . .

# Buat folder upload (fallback Cloudinary)
RUN mkdir -p public/uploads

# Port aplikasi
EXPOSE 3000

# Jalankan server
CMD ["node", "src/server.js"]
