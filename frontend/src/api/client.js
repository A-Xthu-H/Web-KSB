// Klien API terpusat untuk seluruh halaman admin.
// VITE_API_URL diambil dari frontend/.env (default http://localhost:5000).

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api';

const TOKEN_KEY = 'ksb_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

// Fungsi inti untuk memanggil API.
// Mengembalikan { ok, status, data, message } agar pemanggil bisa menangani error.
async function request(method, path, body = null, isForm = false) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload = body;
  if (body && !isForm) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: payload,
    });

    const json = await res.json().catch(() => ({}));
    return {
      ok: res.ok,
      status: res.status,
      data: json.data ?? null,
      message: json.message || (res.ok ? 'Berhasil' : 'Terjadi kesalahan'),
    };
  } catch (error) {
    return { ok: false, status: 0, data: null, message: error.message };
  }
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  del: (path) => request('DELETE', path),
  upload: (path, formData) => request('POST', path, formData, true),
};

// --- Auth ---
export const login = (email, password) => request('POST', '/auth/login', { email, password });
export const logout = () => request('POST', '/auth/logout');
export const me = () => request('GET', '/auth/me');
