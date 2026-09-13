import React from 'react';
import { Helmet } from 'react-helmet-async';

const NAMA_SITUS = 'Klinik Sehat Bagendit';
const DESKRIPSI_DEFAULT =
  'Website resmi Klinik Sehat Bagendit, pusat informasi layanan, fasilitas, jadwal dokter, artikel kesehatan, dan kontak klinik di Garut.';
const URL_DEFAULT = 'https://kliniksehatbagendit.com';

// Komponen meta tag dinamis per halaman (SEO — bab 6 PRD).
export default function Seo({ title, description, image, type = 'website', url }) {
  const fullTitle = title ? `${title} | ${NAMA_SITUS}` : `${NAMA_SITUS} | Sahabat Sehat Keluarga Anda`;
  const desc = description || DESKRIPSI_DEFAULT;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content="klinik, kesehatan, Garut, Banyuresmi, dokter, layanan medis, klinik sehat bagendit" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={NAMA_SITUS} />
      <meta property="og:url" content={url || URL_DEFAULT} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      {image && <meta name="twitter:image" content={image} />}

      <link rel="canonical" href={url || URL_DEFAULT} />
    </Helmet>
  );
}
