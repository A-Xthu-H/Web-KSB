import React, { useState } from 'react';
import { login, setToken } from '../api/client.js';

// Halaman login admin (PRD bab 8.2: /admin-login).
export default function LoginPage({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email.trim(), password);

    if (res.ok && res.data?.token) {
      setToken(res.data.token);
      onSuccess(res.data.user);
    } else {
      setError(res.message || 'Login gagal');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <img src="/logo-ksb.png" alt="Klinik Sehat Bagendit" className="h-14 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-green-800">Panel Admin</h1>
          <p className="text-sm text-slate-500">Klinik Sehat Bagendit</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border-red-200 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="admin@kliniksehatbagendit.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Memproses…' : 'Masuk'}
          </button>
        </form>

        <a href="#top" className="block text-center text-sm text-green-700 hover:underline mt-6">
          ← Kembali ke Website
        </a>
      </div>
    </div>
  );
}
