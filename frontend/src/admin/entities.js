// Konfigurasi entitas CMS: endpoint, judul, dan field formulir.
// Dipakai bersama oleh CrudManager untuk render tabel & form.

// field.type: 'text' | 'textarea' | 'richtext' | 'select' | 'image' | 'number' | 'time'
export const entities = {
  doctors: {
    label: 'Dokter',
    endpoint: '/doctors',
    idField: 'id',
    listFields: ['id', 'nama_dokter', 'spesialisasi', 'status_aktif'],
    defaultSort: ['id', 'ASC'],
    fields: [
      { name: 'nama_dokter', label: 'Nama Dokter', type: 'text', required: true },
      { name: 'spesialisasi', label: 'Spesialisasi', type: 'text' },
      { name: 'foto_url', label: 'Foto', type: 'image' },
      { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { name: 'status_aktif', label: 'Status Aktif', type: 'select', options: [{ value: true, label: 'Aktif' }, { value: false, label: 'Nonaktif' }] },
    ],
  },
  schedules: {
    label: 'Jadwal Dokter',
    endpoint: '/schedules',
    idField: 'id',
    listFields: ['id', 'doctor_id', 'hari', 'jam_mulai', 'jam_selesai', 'status_aktif'],
    createPath: '/schedules',
    idPath: '/schedules',
    fields: [
      { name: 'doctor_id', label: 'ID Dokter', type: 'number', required: true },
      { name: 'hari', label: 'Hari', type: 'select', required: true, options: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((h) => ({ value: h, label: h })) },
      { name: 'jam_mulai', label: 'Jam Mulai', type: 'time', required: true },
      { name: 'jam_selesai', label: 'Jam Selesai', type: 'time', required: true },
      { name: 'status_aktif', label: 'Status Aktif', type: 'select', options: [{ value: true, label: 'Aktif' }, { value: false, label: 'Nonaktif' }] },
    ],
  },
  services: {
    label: 'Layanan',
    endpoint: '/services',
    idField: 'id',
    listFields: ['id', 'kategori', 'nama'],
    fields: [
      { name: 'kategori', label: 'Kategori', type: 'text', required: true },
      { name: 'nama', label: 'Nama Layanan', type: 'text', required: true },
      { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { name: 'foto_url', label: 'Foto', type: 'image' },
    ],
  },
  facilities: {
    label: 'Fasilitas',
    endpoint: '/facilities',
    idField: 'id',
    listFields: ['id', 'nama'],
    fields: [
      { name: 'nama', label: 'Nama Fasilitas', type: 'text', required: true },
      { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { name: 'foto_url', label: 'Foto', type: 'image' },
    ],
  },
  articles: {
    label: 'Artikel',
    endpoint: '/articles',
    idField: 'id',
    listFields: ['id', 'judul', 'status'],
    fields: [
      { name: 'judul', label: 'Judul', type: 'text', required: true },
      { name: 'konten', label: 'Konten', type: 'richtext', required: true },
      { name: 'thumbnail_url', label: 'Thumbnail', type: 'image' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'draft', label: 'Draft' }, { value: 'published', label: 'Published' }] },
    ],
  },
  partners: {
    label: 'Mitra',
    endpoint: '/partners',
    idField: 'id',
    listFields: ['id', 'nama_mitra', 'jenis'],
    fields: [
      { name: 'nama_mitra', label: 'Nama Mitra', type: 'text', required: true },
      { name: 'jenis', label: 'Jenis', type: 'text' },
      { name: 'logo_url', label: 'Logo', type: 'image' },
    ],
  },
  jobs: {
    label: 'Lowongan Kerja',
    endpoint: '/jobs',
    idField: 'id',
    listFields: ['id', 'posisi', 'status'],
    fields: [
      { name: 'posisi', label: 'Posisi', type: 'text', required: true },
      { name: 'deskripsi_pekerjaan', label: 'Deskripsi Pekerjaan', type: 'textarea' },
      { name: 'persyaratan', label: 'Persyaratan', type: 'textarea' },
      { name: 'status', label: 'Status', type: 'select', options: [{ value: 'buka', label: 'Buka' }, { value: 'tutup', label: 'Tutup' }] },
    ],
  },
  settings: {
    label: 'Pengaturan',
    endpoint: '/settings',
    idField: 'kunci_pengaturan',
    listFields: ['id', 'kunci_pengaturan', 'nilai'],
    fields: [
      { name: 'kunci_pengaturan', label: 'Kunci', type: 'text', required: true, isKey: true },
      { name: 'nilai', label: 'Nilai', type: 'textarea', required: true },
    ],
  },
  messages: {
    label: 'Pesan Masuk',
    endpoint: '/messages',
    idField: 'id',
    readOnly: true,
    listFields: ['id', 'nama', 'email', 'isi', 'dibaca'],
    fields: [],
  },
  contents: {
    label: 'Konten Halaman',
    endpoint: '/contents',
    idField: 'id',
    // Hanya bisa diedit (tidak menambah/menghapus) karena section sudah tetap.
    noCreate: true,
    noDelete: true,
    listFields: ['id', 'section', 'title'],
    fields: [
      { name: 'section', label: 'Section (kunci, jangan diubah)', type: 'text', required: true },
      { name: 'title', label: 'Judul', type: 'text', required: true },
      { name: 'body', label: 'Isi (format: Judul::Deskripsi dipisah ||)', type: 'textarea', required: true },
      { name: 'imageUrl', label: 'Gambar', type: 'image' },
    ],
  },
};
