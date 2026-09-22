import { useEffect, useState } from 'react';

// URL dasar API publik.
const API_ORIGIN = (import.meta.env.VITE_API_URL ?? 'http://localhost:3000').replace(/\/$/, '');
export const PUBLIC_API_URL = `${API_ORIGIN}/api`;

// URL upload lokal disimpan backend sebagai path relatif (/uploads/...).
// Saat frontend dan API berbeda origin/port, gunakan URL backend utuh.
// CATATAN: aset statis frontend (mis. /hospital-hero.svg) dibiarkan relatif.
export function urlMedia(url, fallback = '') {
  if (!url) return fallback;
  if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  if (url.startsWith('/uploads/')) return `${API_ORIGIN}${url}`;
  return url;
}

// Melakukan GET ke endpoint publik backend dan mengembalikan { data, loading, error }.
// Bila API gagal, `data` bernilai null sehingga pemanggil dapat memakai data cadangan.
export function usePublicApi(path, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let aktif = true;

    const muat = async () => {
      try {
        const res = await fetch(`${PUBLIC_API_URL}${path}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (aktif) {
          setData(json.data ?? fallback);
          setError(null);
        }
      } catch (err) {
        // Gunakan data cadangan bila API tidak tersedia.
        if (aktif) setError(err.message);
      } finally {
        if (aktif) setLoading(false);
      }
    };

    muat();
    return () => {
      aktif = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { data, loading, error };
}

// Formulir publik tidak memakai token admin, tetapi tetap memakai format API yang sama.
export async function postPublic(path, body) {
  try {
    const res = await fetch(`${PUBLIC_API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, data: json.data ?? null, message: json.message || 'Terjadi kesalahan' };
  } catch (error) {
    return { ok: false, data: null, message: error.message };
  }
}

// Format tanggal ISO ke format Indonesia (contoh: 11 Nov 2025).
export function formatTanggal(iso) {
  if (!iso) return '';
  const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

// Ambil nilai dari daftar settings berdasarkan kunci, dengan nilai cadangan.
export function ambilSetting(settings, kunci, cadangan = '') {
  if (!Array.isArray(settings)) return cadangan;
  const item = settings.find((s) => s.kunci_pengaturan === kunci);
  return item?.nilai || cadangan;
}

// Ambil konten berdasarkan section dari daftar contents.
export function ambilKonten(contents, section) {
  if (!Array.isArray(contents)) return null;
  return contents.find((c) => c.section === section) || null;
}

// Urai body konten (format "Judul::Deskripsi" dipisah "||") menjadi array kartu.
// Mengembalikan array [judul, deskripsi], ... ] atau null bila kosong.
export function uraiKartu(body) {
  if (!body) return null;
  return body
    .split('||')
    .map((blok) => blok.split('::'))
    .map(([judul, ...sisa]) => [judul?.trim() || '', sisa.join('::').trim() || ''])
    .filter(([judul]) => judul);
}
