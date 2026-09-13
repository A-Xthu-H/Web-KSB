import React, { useEffect, useRef } from 'react';

// Editor teks kaya (WYSIWYG) ringan berbasis contentEditable + execCommand.
// Tidak memerlukan dependensi tambahan dan menghasilkan HTML (sesuai FR-3.4).
export default function RichTextEditor({ value, onChange }) {
  const ref = useRef(null);

  // Sinkronkan nilai awal ke editor, tanpa mengganggu saat pengguna mengetik.
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value ?? '')) {
      ref.current.innerHTML = value ?? '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exec = (command, arg = null) => {
    document.execCommand(command, false, arg);
    ref.current?.focus();
    onChange(ref.current?.innerHTML ?? '');
  };

  const tools = [
    { label: 'B', cmd: 'bold', title: 'Tebal', style: { fontWeight: 'bold' } },
    { label: 'I', cmd: 'italic', title: 'Miring', style: { fontStyle: 'italic' } },
    { label: 'U', cmd: 'underline', title: 'Garis bawah', style: { textDecoration: 'underline' } },
    { label: 'H2', cmd: 'formatBlock', arg: 'H2', title: 'Judul 2' },
    { label: 'H3', cmd: 'formatBlock', arg: 'H3', title: 'Judul 3' },
    { label: '¶', cmd: 'formatBlock', arg: 'P', title: 'Paragraf' },
    { label: '• List', cmd: 'insertUnorderedList', title: 'Daftar butir' },
    { label: '1. List', cmd: 'insertOrderedList', title: 'Daftar nomor' },
    { label: '⟶', cmd: 'outdent', title: 'Kurangi indent' },
    { label: '⟵', cmd: 'indent', title: 'Tambah indent' },
    { label: '“”', cmd: 'formatBlock', arg: 'BLOCKQUOTE', title: 'Kutipan' },
  ];

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden">
      <div className="flex flex-wrap gap-1 bg-slate-100 border-b border-slate-200 p-1.5">
        {tools.map((t) => (
          <button
            key={t.label + t.cmd}
            type="button"
            title={t.title}
            onClick={() => exec(t.cmd, t.arg ?? null)}
            style={t.style}
            className="px-2 py-1 text-xs bg-white border-slate-200 rounded hover:bg-green-50 hover:border-green-300 min-w-[30px]"
          >
            {t.label}
          </button>
        ))}
        <button
          type="button"
          title="Hapus format"
          onClick={() => exec('removeFormat')}
          className="px-2 py-1 text-xs bg-white border-slate-200 rounded hover:bg-green-50 hover:border-green-300"
        >
          Tx
        </button>
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(ref.current?.innerHTML ?? '')}
        onBlur={() => onChange(ref.current?.innerHTML ?? '')}
        className="min-h-[220px] max-h-[420px] overflow-y-auto p-3 text-sm focus:outline-none prose-styled"
      />
    </div>
  );
}
