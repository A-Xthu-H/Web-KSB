import React, { useRef } from 'react';
import { api } from '../api/client.js';
import RichTextEditor from './RichTextEditor.jsx';

// Menyusun payload dari data form (menyesuaikan boolean/number).
export function normalizeValue(field, raw) {
  if (field.type === 'select') {
    if (field.options?.[0]?.value === true || field.options?.[0]?.value === false) {
      return raw === true || raw === 'true';
    }
    return raw;
  }
  return raw;
}

// Komponen input generik untuk satu field.
export default function FieldInput({ field, value, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = React.useState(false);
  const [err, setErr] = React.useState('');

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr('');

    const fd = new FormData();
    fd.append('gambar', file);
    const res = await api.upload('/uploads', fd);

    if (res.ok && res.data?.url) {
      onChange(res.data.url);
    } else {
      setErr(res.message || 'Gagal upload');
    }
    setUploading(false);
  };

  const base =
    'w-full border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm';

  if (field.type === 'textarea') {
    return (
      <textarea
        className={base}
        rows={4}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (field.type === 'richtext') {
    return <RichTextEditor value={value} onChange={onChange} />;
  }

  if (field.type === 'select') {
    return (
      <select
        className={base}
        value={String(value ?? field.options?.[0]?.value ?? '')}
        onChange={(e) => onChange(normalizeValue(field, e.target.value))}
      >
        {field.options?.map((opt) => (
          <option key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === 'image') {
    return (
      <div className="space-y-2">
        <input
          type="text"
          className={base}
          placeholder="URL gambar (bisa diisi manual)"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="text-xs bg-slate-200 hover:bg-slate-300 rounded px-3 py-1.5 disabled:opacity-60"
          >
            {uploading ? 'Mengunggah…' : 'Unggah gambar'}
          </button>
          {value && <img src={value} alt="preview" className="h-10 w-10 object-cover rounded border" />}
        </div>
        {err && <p className="text-xs text-red-600">{err}</p>}
      </div>
    );
  }

  // text, number, time
  const inputType = field.type === 'number' ? 'number' : field.type === 'time' ? 'time' : 'text';
  return (
    <input
      type={inputType}
      className={base}
      value={value ?? ''}
      onChange={(e) => onChange(field.type === 'number' ? e.target.value : e.target.value)}
    />
  );
}
