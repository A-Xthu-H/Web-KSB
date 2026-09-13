import { useEffect, useState } from 'react';

// URL dasar API publik.
export const PUBLIC_API_URL =
  (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api';

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
