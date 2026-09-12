import React, { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import FieldInput from './FieldInput.jsx';

// Manajer CRUD generik untuk satu entitas.
export default function CrudManager({ entity }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create, objek = edit
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    const res = await api.get(entity.endpoint);
    if (res.ok) {
      setItems(Array.isArray(res.data) ? res.data : []);
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity.endpoint]);

  const openCreate = () => {
    setEditing(null);
    const initial = {};
    entity.fields.forEach((f) => {
      if (f.type === 'select') initial[f.name] = f.options?.[0]?.value;
      else if (f.type === 'number') initial[f.name] = '';
      else initial[f.name] = '';
    });
    setFormData(initial);
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const data = {};
    entity.fields.forEach((f) => {
      data[f.name] = item[f.name];
    });
    setFormData(data);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setFormData({});
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    let res;
    if (entity.endpoint === '/settings') {
      // Setting memakai upsert berdasarkan kunci.
      const key = formData.kunci_pengaturan;
      res = await api.put(`/settings/${key}`, { nilai: formData.nilai });
    } else if (editing) {
      res = await api.put(`${entity.endpoint}/${editing[entity.idField]}`, formData);
    } else {
      res = await api.post(entity.endpoint, formData);
    }

    setSaving(false);

    if (res.ok) {
      setNotice(editing ? 'Data berhasil diperbarui.' : 'Data berhasil ditambahkan.');
      closeForm();
      load();
    } else {
      setError(res.message);
    }
  };

  const handleDelete = async (item) => {
    const id = item[entity.idField];
    if (!window.confirm(`Hapus data #${id}?`)) return;

    const path = entity.endpoint === '/settings' ? `/settings/${id}` : `${entity.endpoint}/${id}`;
    const res = await api.del(path);
    if (res.ok) {
      setNotice('Data berhasil dihapus.');
      load();
    } else {
      setError(res.message);
    }
  };

  const markRead = async (item) => {
    const res = await api.put(`/messages/${item.id}/read`);
    if (res.ok) load();
  };

  const renderCell = (item, key) => {
    const val = item[key];
    if (typeof val === 'boolean') return val ? 'Ya' : 'Tidak';
    if (val === null || val === undefined) return '—';
    return String(val).slice(0, 60);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">{entity.label}</h2>
        {!entity.readOnly && (
          <button
            onClick={openCreate}
            className="bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            + Tambah
          </button>
        )}
      </div>

      {notice && <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2 mb-3">{notice}</p>}
      {error && <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2 mb-3">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-500">Memuat…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-500">Belum ada data.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                {entity.listFields.map((f) => (
                  <th key={f} className="text-left px-4 py-2.5 font-medium whitespace-nowrap">{f}</th>
                ))}
                <th className="text-right px-4 py-2.5 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item[entity.idField]} className="border-t hover:bg-slate-50">
                  {entity.listFields.map((f) => (
                    <td key={f} className="px-4 py-2.5 text-slate-700">{renderCell(item, f)}</td>
                  ))}
                  <td className="px-4 py-2.5 text-right whitespace-nowrap">
                    {entity.endpoint === '/messages' ? (
                      <>
                        {!item.dibaca && (
                          <button onClick={() => markRead(item)} className="text-green-700 hover:underline mr-3">Tandai dibaca</button>
                        )}
                        <button onClick={() => handleDelete(item)} className="text-red-600 hover:underline">Hapus</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => openEdit(item)} className="text-green-700 hover:underline mr-3">Edit</button>
                        <button onClick={() => handleDelete(item)} className="text-red-600 hover:underline">Hapus</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 overflow-y-auto py-8 px-4">
          <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editing ? `Edit ${entity.label}` : `Tambah ${entity.label}`}
            </h3>

            <div className="space-y-4">
              {entity.fields.map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {f.label} {f.required && <span className="text-red-500">*</span>}
                  </label>
                  <FieldInput
                    field={f}
                    value={formData[f.name]}
                    onChange={(val) => setFormData((prev) => ({ ...prev, [f.name]: val }))}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={closeForm} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100">
                Batal
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-lg bg-green-700 hover:bg-green-800 text-white font-semibold disabled:opacity-60"
              >
                {saving ? 'Menyimpan…' : 'Simpan'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
