import React, { useEffect, useState } from 'react';
import { me, logout, clearToken, getToken } from '../api/client.js';
import { entities } from './entities.js';
import CrudManager from './CrudManager.jsx';
import LoginPage from './LoginPage.jsx';

// Shell aplikasi CMS: menangani status login, sidebar, dan konten.
export default function AdminApp() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [activeKey, setActiveKey] = useState('doctors');

  // Verifikasi token saat pertama kali dibuka.
  useEffect(() => {
    const verify = async () => {
      if (!getToken()) {
        setChecking(false);
        return;
      }
      const res = await me();
      if (res.ok) setUser(res.data);
      else clearToken();
      setChecking(false);
    };
    verify();
  }, []);

  const handleLogout = async () => {
    await logout();
    clearToken();
    setUser(null);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500">Memeriksa sesi…</p>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onSuccess={setUser} />;
  }

  const entity = entities[activeKey];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-green-900 text-white flex-col">
        <div className="px-5 py-5 border-b border-green-800">
          <p className="font-bold leading-tight">Klinik Sehat Bagendit</p>
          <p className="text-xs text-green-300">Panel Admin (CMS)</p>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {Object.entries(entities).map(([key, ent]) => (
            <button
              key={key}
              onClick={() => setActiveKey(key)}
              className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${activeKey === key ? 'bg-green-700 font-semibold' : 'hover:bg-green-800'
                }`}
            >
              {ent.label}
            </button>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-green-800 text-xs">
          <p className="text-green-300 mb-2">{user.nama_lengkap}</p>
          <a href="#top" className="block text-green-200 hover:underline mb-2">Lihat Website ↗</a>
          <button onClick={handleLogout} className="text-red-300 hover:underline">Keluar</button>
        </div>
      </aside>

      {/* Konten */}
      <main className="flex-1 p-8 overflow-y-auto">
        <CrudManager key={activeKey} entity={{ ...entity, endpoint: entity.endpoint }} />
      </main>
    </div>
  );
}
