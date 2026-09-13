# ---- Stage 1: Build React/Vite ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# URL API dipakai saat build (bisa dioverride via build-arg).
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---- Stage 2: Serve dengan Nginx ----
FROM nginx:alpine

# Konfigurasi Nginx (SPA fallback + proxy opsional).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
