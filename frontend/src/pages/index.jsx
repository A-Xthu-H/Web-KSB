import React, { useState } from 'react'

const rooms = [
	{ name: 'Rawat Inap', price: 'Tarif: hubungi klinik', detail: 'Total kapasitas 12 bed', tone: 'mint', image: '/room-suite.svg' },
]

const services = [
	['✦', 'Pengobatan Umum', 'Pemeriksaan dan pengobatan medis dasar.'],
	['⌁', 'Perawatan Luka', 'Perawatan luka sesuai kebutuhan pasien.'],
	['◒', 'Kulit & Kelamin', 'Layanan konsultasi dan pemeriksaan kulit serta kelamin.'],
	['＋', 'Khitanan', 'Layanan khitanan.'],
	['✦', 'Nebulizer, USG & EKG', 'Pemeriksaan dan tindakan penunjang sesuai layanan klinik.'],
	['⌁', 'Laboratorium & Layanan Obat', 'Pemeriksaan laboratorium dan layanan farmasi.'],
	['◒', 'Konsultasi & Akupuntur', 'Layanan konsultasi kesehatan dan akupuntur.'],
	['＋', 'Persalinan, KIA & KB', 'Pelayanan persalinan serta kesehatan ibu, anak, dan keluarga berencana.'],
	['✦', 'Pelayanan Gigi', 'Pemeriksaan dan tindakan kesehatan gigi.'],
]

const testimonials = [
	['Motto Klinik', 'Sahabat Sehat Keluarga Anda.', 'Klinik Sehat Bagendit'],
]

const partners = ['BPJS Kesehatan', 'Pasien Umum']

const doctors = [
	{ id: 1, name: 'Tim Dokter Umum', specialty: 'Tersedia 5 dokter umum', image: '/hospital-hero.svg' },
	{ id: 2, name: 'Tim Dokter Gigi', specialty: 'Tersedia 2 dokter gigi', image: '/hospital-hero.svg' },
]

const clinicServices = services.map(([icon, name, detail], index) => ({ id: index + 1, name, short: name.toUpperCase(), icon, detail }))

export const navItems = [
	{ label: 'Beranda', href: '#top', page: 'home' },
	{ label: 'Tentang Kami', href: '#tentang-kami', page: 'tentang-kami', children: [{ label: 'Sejarah Klinik', href: '#sejarah' }, { label: 'Visi dan Misi', href: '#visi-misi' }, { label: 'Struktur Organisasi', href: '#struktur' }, { label: 'Akreditasi', href: '#penghargaan' }] },
	{ label: 'Layanan', href: '#jenis-pelayanan', page: 'jenis-pelayanan', children: [{ label: 'Layanan Kesehatan', href: '#jenis-pelayanan' }, { label: 'Rawat Inap', href: '#rawat-inap' }] },
	{ label: 'Fasilitas Umum', href: '#fasilitas-umum', page: 'fasilitas-umum' },
	{ label: 'Karyawan', href: '#karyawan', page: 'karyawan' },
	{ label: 'Mitra Klinik', href: '#rekanan-mitra', page: 'rekanan-mitra' },
	{ label: 'Artikel', href: '#blog', page: 'blog' },
	{ label: 'Karir', href: '#karir', page: 'karir' },
	{ label: 'Kontak', href: '#kontak', page: 'kontak' },
]

const pageData = {
	'tentang-kami': { eyebrow: 'Tentang Kami', title: <>Mengenal <em>Klinik Sehat Bagendit</em>.</>, intro: 'Klinik Sehat Bagendit adalah klinik pratama swasta yang memberikan pelayanan kesehatan medik dasar dengan orientasi pada pelayanan pasien.', cards: [['Sejarah', 'Berawal dari dokter praktik pribadi pada 2006, kemudian menjadi balai pengobatan pada 17 Mei 2010.'], ['Visi dan Misi', 'Pusat layanan kesehatan primer yang berkualitas, nyaman, dan bersahabat di Banyuresmi dan sekitarnya.'], ['Motto', 'Sahabat Sehat Keluarga Anda.']] },
	'sejarah': { eyebrow: 'Tentang Kami / Sejarah RSIH', title: <>Cita-cita dokter,<br /><em>rumah sakit untuk Garut.</em></>, intro: 'RS Intan Husada berawal dari cita-cita pengurus IDI Cabang Garut untuk menghadirkan pelayanan prima yang tidak hanya berorientasi pada bisnis.', cards: [['Cita-cita IDI Garut', 'Para dokter ingin membangun rumah sakit dengan pelayanan yang profesional, hangat, dan berfokus pada pasien.'], ['Peresmian 2014', 'RS Intan Husada diresmikan pada 9 September 2014 dengan semangat Kami Berikan Yang Terbaik.'], ['Galeri Sejarah', 'Dokumentasi pendirian, perkembangan, dan momen peresmian Klinik Sehat Bagendit.']] },
	'visi-misi': { eyebrow: 'Tentang Kami / Visi dan Misi', title: <>Tumbuh untuk kesehatan<br /><em>masyarakat.</em></>, intro: 'Setiap keputusan kami berangkat dari satu tujuan: memberikan pengalaman layanan kesehatan yang aman dan manusiawi.', cards: [['Visi', 'Menjadi rumah sakit pilihan masyarakat Garut dan sekitarnya.'], ['Misi', 'Memberikan pelayanan kesehatan bermutu dengan sumber daya profesional.'], ['Komitmen', 'Mendengarkan pasien dan terus memperbaiki kualitas layanan.']] },
	'penghargaan': { eyebrow: 'Tentang Kami / Penghargaan', title: <>Mutu yang terus<br /><em>kami jaga.</em></>, intro: 'Penghargaan dan akreditasi menjadi bagian dari komitmen RSIH untuk memberikan pelayanan yang aman dan berkualitas.', cards: [['Akreditasi RSIH', 'Dokumentasi penghargaan dan akreditasi Klinik Sehat Bagendit.'], ['Keselamatan Pasien', 'Standar pelayanan kami berorientasi pada keselamatan dan kenyamanan pasien.'], ['Perbaikan Berkelanjutan', 'Kami mengevaluasi layanan secara berkala untuk terus menjadi lebih baik.']] },
	'rekanan-mitra': { eyebrow: 'Rekanan dan Mitra', title: <>Bersama membangun<br /><em>kesehatan.</em></>, intro: 'Kami bekerja sama dengan berbagai perusahaan, komunitas, dan penyedia jaminan kesehatan untuk memperluas akses layanan.', cards: [['BPJS Kesehatan', 'Layanan kesehatan bagi peserta JKN sesuai ketentuan yang berlaku.'], ['Perusahaan', 'Pemeriksaan dan layanan kesehatan untuk kebutuhan korporasi.'], ['Mitra Kesehatan', 'Kolaborasi profesional untuk layanan yang semakin terintegrasi.']] },
	'dokter': { eyebrow: 'Dokter RSIH', title: <>Temui dokter<br /><em>pilihan Anda.</em></>, intro: 'Tim dokter kami hadir dengan kompetensi dan kepedulian untuk mendampingi setiap kebutuhan kesehatan Anda.', cards: [['Poli Umum', 'Konsultasi kesehatan keluarga dan pemeriksaan awal.'], ['Poli Spesialis', 'Jadwal dokter spesialis untuk kebutuhan medis yang lebih terarah.'], ['Konsultasi', 'Buat janji dan dapatkan informasi jadwal melalui WhatsApp kami.']] },
	'dokter-profile': { eyebrow: 'Profile Dokter', title: <>dr. Yusuf G.<br /><em>Spesialis Akupunktur Medis.</em></>, intro: 'Profile dr. Yusuf G., M.Kes(Gizi)., MMKes., SpAk., dokter spesialis akupunktur medis di Klinik Sehat Bagendit.', cards: [['Pendidikan', 'Akupuntur Medik, Universitas Indonesia.'], ['Seminar dan Pelatihan', 'Informasi seminar dan pelatihan dokter tersedia di profile resmi.'], ['Jadwal Praktik', 'Lihat jadwal praktik dan buat janji melalui daftar dokter RSIH.']] },
	'rawat-jalan': { eyebrow: 'Dokter / Rawat Jalan', title: <>Layanan rawat jalan<br /><em>RSIH.</em></>, intro: 'Temukan poliklinik dan jadwal dokter untuk kebutuhan pemeriksaan tanpa rawat inap.', cards: [['Poliklinik', 'Pilih layanan dan dokter sesuai kebutuhan kesehatan Anda.'], ['Jadwal Dokter', 'Jadwal praktik tersedia untuk membantu merencanakan kunjungan.'], ['Pendaftaran', 'Hubungi petugas RSIH untuk informasi pendaftaran dan jadwal.']] },
	'poli-gigi': { eyebrow: 'Poliklinik', title: <>Poliklinik<br /><em>Gigi.</em></>, intro: 'Pemeriksaan dan tindakan kesehatan gigi serta mulut untuk anak dan dewasa.', cards: [['Kondisi Ditangani', 'Gigi berlubang, karang gigi, penyakit gusi, sariawan, gigi sensitif, dan perawatan saluran akar.'], ['Dokter Gigi', 'Didukung dokter gigi umum dan spesialis periodonti.'], ['Jadwal Praktik', 'Lihat jadwal dokter dan jadwalkan kunjungan ke Poli Gigi.']] },
	'jenis-pelayanan': { eyebrow: 'Jenis Pelayanan', title: <>Layanan yang<br /><em>Anda butuhkan.</em></>, intro: 'Berbagai layanan kesehatan profesional tersedia dalam satu rumah sakit untuk membantu Anda dan keluarga.', cards: services.map(([, title, text]) => [title, text]) },
	'rawat-inap': { eyebrow: 'Jenis Pelayanan / Rawat Inap', title: <>Rawat inap untuk<br /><em>observasi dan pemulihan.</em></>, intro: 'Klinik menyediakan pelayanan rawat inap dengan kapasitas total 12 bed dan layanan selama 24 jam.', cards: rooms.map((room) => [room.name, `${room.detail} · ${room.price}`]) },
	'fasilitas-umum': { eyebrow: 'Fasilitas Umum', title: <>Fasilitas untuk<br /><em>kenyamanan pasien.</em></>, intro: 'Fasilitas Klinik Sehat Bagendit meliputi ruang pendaftaran dan tunggu, pemeriksaan, tindakan, farmasi, laboratorium, observasi, rawat inap, serta ruang RB-KIA dan pojok ASI.', cards: [['Ruang Pelayanan', 'Ruang pemeriksaan, tindakan, periksa gigi, rawat inap, observasi, dan RB-KIA & pojok ASI.'], ['Penunjang', 'Ruang pendaftaran/tunggu, administrasi, farmasi, laboratorium, serta kamar mandi/WC.'], ['Akses & Kenyamanan', 'Penerangan listrik, air bersih, jaringan internet, dan lahan/area parkir.']] },
	'blog': { eyebrow: 'Blog Kesehatan', title: <>Bekal sehat untuk<br /><em>setiap hari.</em></>, intro: 'Baca informasi kesehatan, kabar terbaru, dan tips sederhana dari RSIH.', cards: [['Mengenal tanda kegawatdaruratan', 'Kenali kapan Anda perlu segera mendapatkan pertolongan medis.'], ['Menjaga kesehatan keluarga', 'Kebiasaan kecil yang membantu keluarga tetap sehat.'], ['Persiapan medical check up', 'Hal yang perlu disiapkan sebelum pemeriksaan kesehatan.']] },
	'blog-tonsil': { eyebrow: 'Blog / Info Kesehatan', title: <>Kenali tonsil hipertrofi,<br /><em>ketika amandel membesar.</em></>, intro: 'Tonsil hipertrofi dapat mengganggu napas, makan, dan tidur. Kenali gejala, pemeriksaan, dan pilihan penanganannya.', cards: [['Gejala Klinis', 'Mendengkur, tidur gelisah, napas melalui mulut, dan sakit tenggorokan berulang.'], ['Pemeriksaan', 'Dokter menilai riwayat keluhan, ukuran tonsil, dan pemeriksaan tambahan bila diperlukan.'], ['Penatalaksanaan', 'Penanganan dapat berupa observasi hingga tindakan operasi sesuai kondisi pasien.']] },
	'karir': { eyebrow: 'Karir', title: <>Bertumbuh bersama<br /><em>RSIH.</em></>, intro: 'Bergabunglah dengan tim yang menjadikan kepedulian dan profesionalisme sebagai bagian dari pekerjaan setiap hari.', cards: [['Tenaga Medis', 'Kesempatan berkontribusi untuk dokter, perawat, dan tenaga kesehatan.'], ['Tenaga Profesional', 'Bangun pengalaman di lingkungan rumah sakit yang dinamis.'], ['Kirim Lamaran', 'Hubungi kami untuk informasi posisi yang sedang tersedia.']] },
	'kontak': { eyebrow: 'Kontak Kami', title: <>Kami siap<br /><em>melayani Anda.</em></>, intro: 'Kunjungi Klinik Sehat Bagendit untuk layanan kesehatan dasar dan informasi pelayanan.', cards: [['Alamat', 'Jl. Terusan Cinunuk No. 9, Kp. Babakan Baru RT 002/RW 009, Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut'], ['Rawat Jalan', 'Senin–Minggu: 07.00–14.00 WIB dan 15.00–20.00 WIB'], ['Rawat Inap', 'Tersedia 24 jam.']] },
}

const pageCardLinks = {
	'tentang-kami': ['#visi-misi', '#rekanan-mitra', '#dokter'],
	'sejarah': ['#visi-misi', '#penghargaan', '#tentang-kami'],
	'visi-misi': ['#tentang-kami', '#rekanan-mitra', '#karir'],
	'penghargaan': ['#tentang-kami', '#visi-misi', '#kontak'],
	'rekanan-mitra': ['#dokter', '#jenis-pelayanan', '#kontak'],
	'dokter': ['#jenis-pelayanan', '#rawat-jalan', '#dokter-profile'],
	'dokter-profile': ['#dokter', '#dokter', 'https://wa.me/6281214867272'],
	'rawat-jalan': ['#jenis-pelayanan', '#dokter', 'tel:02622247769'],
	'poli-gigi': ['#dokter', '#rawat-jalan', 'tel:02622800900'],
	'jenis-pelayanan': ['#dokter', '#rawat-inap', '#fasilitas-umum'],
	'rawat-inap': ['#jenis-pelayanan', '#fasilitas-umum', '#kontak'],
	'fasilitas-umum': ['#jenis-pelayanan', '#rawat-inap', '#kontak'],
	'blog': ['#jenis-pelayanan', '#fasilitas-umum', '#kontak'],
	'blog-tonsil': ['#dokter', '#jenis-pelayanan', '#blog'],
	'karir': ['#rekanan-mitra', '#kontak', 'mailto:rsintanhusada@gmail.com'],
	'kontak': ['tel:02622247769', 'tel:02622800900', 'https://wa.me/6281214867272'],
}

const pageActionLabels = {
	'sejarah': ['Lihat visi misi', 'Lihat penghargaan', 'Kembali tentang kami'],
	'penghargaan': ['Tentang RSIH', 'Lihat visi misi', 'Hubungi RSIH'],
	'dokter': ['Lihat layanan', 'Lihat jadwal', 'Buat janji'],
	'dokter-profile': ['Daftar dokter', 'Jadwal dokter', 'Buat janji'],
	'rawat-jalan': ['Lihat layanan', 'Daftar dokter', 'Telepon RSIH'],
	'poli-gigi': ['Daftar dokter', 'Lihat jadwal', 'Hubungi poli'],
	'jenis-pelayanan': ['Lihat dokter', 'Lihat kamar', 'Lihat fasilitas'],
	'rawat-inap': ['Lihat layanan', 'Lihat fasilitas', 'Tanya kamar'],
	'blog': ['Baca artikel', 'Lihat fasilitas', 'Baca artikel tonsil'],
	'blog-tonsil': ['Cari dokter THT', 'Lihat layanan', 'Kembali ke blog'],
	'karir': ['Lihat mitra', 'Hubungi HRD', 'Kirim lamaran'],
	'kontak': ['Telepon kami', 'Panggilan darurat', 'Chat WhatsApp'],
}

const pageBottomActions = {
	'kontak': ['tel:02622247769', 'Telepon RSIH'],
	'karir': ['mailto:rsintanhusada@gmail.com', 'Kirim lamaran'],
	'blog': ['#blog-tonsil', 'Baca artikel terbaru'],
	'blog-tonsil': ['#dokter', 'Cari dokter THT'],
	'dokter': ['#dokter-profile', 'Lihat profile dokter'],
	'rawat-jalan': ['#poli-gigi', 'Lihat poliklinik'],
	'poli-gigi': ['tel:02622800900', 'Hubungi poli'],
}

export function InformationPage({ page }) {
	const content = pageData[page] || pageData['tentang-kami']
	const links = pageCardLinks[page] || pageCardLinks['tentang-kami']
	const labels = pageActionLabels[page] || ['Selengkapnya', 'Selengkapnya', 'Selengkapnya']
	const bottomAction = pageBottomActions[page] || ['#kontak', 'Hubungi RSIH']

	return <section className={`inner-page inner-page-${page} container`}>
		<div className="inner-page-hero"><div><p className="eyebrow"><span className="pulse-dot" /> {content.eyebrow}</p><h1>{content.title}</h1><p className="inner-page-intro">{content.intro}</p></div><div className="inner-page-art"><img src="/hospital-hero.svg" alt="Ilustrasi Klinik Sehat Bagendit" /><span>KLINIK / BANYURESMI</span></div></div>
		<div className="page-card-grid">{content.cards.map(([title, text], index) => <article className="page-card" key={title}><span className="page-card-number">0{index + 1}</span><span className="page-card-icon">{page === 'blog' ? '◌' : page === 'dokter' ? '♧' : '✚'}</span><h2>{title}</h2><p>{text}</p><a href={links[index]}>{labels[index]} <span>↗</span></a></article>)}</div>
		<div className="page-contact-strip"><div><span className="section-kicker">{page === 'blog' || page === 'blog-tonsil' ? 'Informasi kesehatan' : page === 'karir' ? 'Bergabung dengan kami' : 'RSIH untuk Anda'}</span><h2>{page === 'dokter' ? 'Temukan dokter yang tepat.' : page === 'blog' || page === 'blog-tonsil' ? 'Sehat dimulai dari informasi.' : page === 'karir' ? 'Mari tumbuh bersama.' : 'Ada yang bisa kami bantu?'}</h2></div><a className="button button-primary" href={bottomAction[0]}>{bottomAction[1]} <span>↗</span></a></div>
	</section>
}

export function AboutPage({ page }) {
	if (page === 'sejarah') {
		return <section className="reference-page about-history container">
			<PageHeading eyebrow="Klinik Sehat Bagendit" title="SEJARAH KLINIK" />
			<div className="history-intro"><img src="/logo-ksb.png" alt="Logo Klinik Sehat Bagendit" /><div className="history-copy"><article><h2>Berawal pada 2006</h2><p>Klinik Sehat Bagendit berawal dari dibukanya dokter praktik pribadi pada tahun 2006.</p></article><article><h2>Balai Pengobatan pada 2010</h2><p>Pada 17 Mei 2010, didirikan balai pengobatan di Jalan Hasan Arif No. 222, Kampung Parigi, Desa Banyuresmi, Kecamatan Banyuresmi, Kabupaten Garut.</p></article><article><h2>Lokasi Klinik Sejak 2017</h2><p>Pada tahun 2017, bangunan Klinik Sehat Bagendit berdiri di Jalan Terusan Cinunuk No. 9, Kampung Babakan Baru, Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut.</p></article></div></div>
		</section>
	}

	if (page === 'visi-misi') {
		return <section className="reference-page about-vision container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="VISI DAN MISI" /><h2 className="commitment-title">KOMITMEN KAMI DALAM MEMBERIKAN PELAYANAN KESEHATAN PRIMER</h2><div className="vision-panels"><article><h2>VISI</h2><p>&quot;Menjadi pusat layanan kesehatan primer yang Berkualitas, Nyaman, dan Bersahabat di Wilayah Kecamatan Banyuresmi dan sekitarnya.&quot;</p></article><article><h2>MISI</h2><ul><li>Melandasi setiap aktivitas pelayanan sebagai ibadah kepada Allah SWT.</li><li>Menyediakan layanan medik dasar bagi pasien umum dan BPJS Kesehatan.</li><li>Melayani dengan Senyum, Salam, Sapa, Sabar, Cepat, Tepat, dan penuh Simpati.</li><li>Meningkatkan pengetahuan serta keterampilan agar profesional dalam bekerja.</li><li>Menyediakan fasilitas yang lengkap dan berkualitas, serta lingkungan yang bersih, aman, nyaman, dan bersahabat.</li></ul></article></div><section className="management-section"><PageHeading eyebrow="Motto Klinik" title="SAHABAT SEHAT KELUARGA ANDA" /></section></section>
	}

	if (page === 'struktur') {
		const structureRoles = [['Pimpinan Klinik', 'Nama dan profil akan diperbarui oleh admin.'], ['Koordinator Pelayanan Medis', 'Informasi jabatan dan petugas akan segera tersedia.'], ['Koordinator Keperawatan', 'Informasi jabatan dan petugas akan segera tersedia.'], ['Administrasi & Keuangan', 'Informasi jabatan dan petugas akan segera tersedia.'], ['Farmasi', 'Informasi jabatan dan petugas akan segera tersedia.'], ['Layanan Penunjang', 'Informasi jabatan dan petugas akan segera tersedia.']]
		return <section className="reference-page doctors-page container"><div className="doctors-heading"><PageHeading eyebrow="Tentang Kami" title="STRUKTUR ORGANISASI" /><p>Struktur organisasi Klinik Sehat Bagendit. Data personel dapat diperbarui melalui pengelolaan konten.</p></div><div className="doctor-grid">{structureRoles.map(([role, detail]) => <article className="doctor-card" key={role}><img src="/logo-ksb.png" alt="Klinik Sehat Bagendit" /><div className="doctor-card-body"><h2>{role}</h2><p>{detail}</p><a href="#kontak">Informasi Selengkapnya</a></div></article>)}</div></section>
	}

	return <section className="reference-page about-awards container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="AKREDITASI" /><div className="certificate-frame"><object data="/sertifikat-akreditasi-2023.pdf#view=FitH" type="application/pdf" aria-label="Sertifikat akreditasi Klinik Sehat Bagendit"><p>Sertifikat tidak dapat ditampilkan. <a href="/sertifikat-akreditasi-2023.pdf" target="_blank" rel="noreferrer">Buka sertifikat akreditasi</a>.</p></object></div></section>
}

function PageHeading({ eyebrow, title }) {
	return <header className="reference-heading"><p>{eyebrow}</p><h1>{title}</h1></header>
}

function GalleryCard({ image, title }) {
	return <article className="gallery-card"><img src={image} alt={title} /><h3>{title}</h3></article>
}

function ManagementCard({ image, name, role }) {
	return <article className="management-card"><img src={image} alt={name} /><div><h3>{name}</h3><p>{role}</p></div></article>
}

export function PartnersPage() {
	return <section className="reference-page partners-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="REKANAN DAN MITRA" /><p className="reference-lead">Klinik Sehat Bagendit telah bekerja sama dengan:</p><div className="partner-grid">{partners.map((partner, index) => <article className={`partner-card partner-${index % 6}`} key={partner}><span>{partner.split(' ').map((word) => word[0]).join('').slice(0, 3)}</span><strong>{partner}</strong></article>)}</div></section>
}

export function DoctorsPage() {
	const [query, setQuery] = useState('')
	const filteredDoctors = doctors.filter((doctor) => `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(query.toLowerCase()))

	return <section className="reference-page doctors-page container"><div className="doctors-heading"><PageHeading eyebrow="Klinik Sehat Bagendit" title="KARYAWAN" /><p>Direktori karyawan dan tenaga kesehatan Klinik Sehat Bagendit. Profil lengkap dapat diperbarui saat data tersedia.</p></div><form className="doctor-search" onSubmit={(event) => event.preventDefault()}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau bidang karyawan..." aria-label="Cari karyawan" /><button type="submit">Cari</button></form><div className="doctor-grid">{filteredDoctors.map((doctor) => <article className="doctor-card" key={doctor.id}><img src={doctor.image} alt={doctor.name} /><div className="doctor-card-body"><h2>{doctor.name}</h2><p>{doctor.specialty}</p><a href={`#dokter-profile-${doctor.id}`}>Lihat Profil</a></div></article>)}</div>{filteredDoctors.length === 0 && <p className="empty-search">Karyawan tidak ditemukan. Coba kata kunci lain.</p>}</section>
}

export function DoctorProfilePage({ doctorId }) {
	const doctor = doctors.find((item) => item.id === Number(doctorId)) || doctors[1]

	return <section className="reference-page doctor-profile-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="PROFIL KARYAWAN" /><div className="doctor-profile-card"><div className="profile-photo"><img src={doctor.image} alt={doctor.name} /><a href="#karyawan">Kembali ke Daftar Karyawan</a></div><div className="profile-copy"><h1>{doctor.name}</h1><span className="specialty-pill">{doctor.specialty}</span><section><h2>Profil</h2><p>Informasi profil dan kompetensi karyawan akan diperbarui oleh admin klinik.</p></section><section><h2>Jadwal</h2><p>Jadwal layanan dapat diperbarui saat data tersedia.</p></section></div></div></section>
}

export function ServicesPage() {
	const [query, setQuery] = useState('')
	const filteredServices = clinicServices.filter((service) => `${service.name} ${service.short}`.toLowerCase().includes(query.toLowerCase()))

	return <section className="reference-page services-directory container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="RAWAT JALAN" /><form className="service-search" onSubmit={(event) => event.preventDefault()}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari Poliklinik" aria-label="Cari poliklinik" /><button type="submit">Cari</button></form><div className="clinic-grid">{filteredServices.map((service, index) => <article className={`clinic-card clinic-tone-${index % 6}`} key={service.id}><div className="clinic-card-art"><span className="clinic-logo">✚</span><span className="clinic-medal">✦</span><div className="clinic-icon">{service.icon}</div><small>Klik Di Sini</small></div><div className="clinic-card-body"><p>Klinik</p><h2>{service.short}</h2><span>{service.detail}</span><a href={service.id === 2 ? '#poli-gigi' : '#dokter'}>Lihat Detail <b>↗</b></a></div></article>)}</div>{filteredServices.length === 0 && <p className="empty-search">Poliklinik tidak ditemukan.</p>}</section>
}

const dentalDoctors = [doctors[1]]
const dentalConditions = ['Pemeriksaan kesehatan gigi dan mulut', 'Tindakan kesehatan gigi dan mulut']

const facilities = [
	['Ruang Pelayanan', 'Ruang pendaftaran/tunggu, pemeriksaan, tindakan, periksa gigi, rawat inap, observasi, dan RB-KIA & pojok ASI.', 'Setiap hari', 'Lihat lokasi', '/hospital-hero.svg'],
	['Ruang Penunjang', 'Ruang administrasi, farmasi, laboratorium, serta kamar mandi/WC.', 'Setiap hari', 'Lihat lokasi', '/hospital-hero.svg'],
	['Sarana Klinik', 'Penerangan listrik, air bersih, jaringan internet, dan lahan/area parkir.', 'Setiap hari', 'Lihat lokasi', '/hospital-hero.svg'],
]

const jobOpenings = [
	['Dokter Umum', 'Dokter', 'Full time', 'Memberikan pelayanan medis umum dan konsultasi kesehatan pasien.'],
	['Perawat Rawat Inap', 'Keperawatan', 'Full time', 'Mendampingi perawatan pasien dengan standar keselamatan RSIH.'],
	['Petugas Administrasi', 'Administrasi', 'Full time', 'Melayani proses administrasi dan kebutuhan informasi pasien.'],
]

const blogPosts = [
	['Operasi Katarak Phaco Emulsifikasi', 'admin', 'Dec 23, 2025', 'Pelayanan Medis', 'https://rsintanhusada.com/img/blog/1766460314_694a0b9aac6e2.jpg', 'Informasi tentang layanan operasi katarak phaco emulsifikasi di Klinik Sehat Bagendit.'],
	['Layanan Bedah Paket KRIS', 'Admin RSIH', 'Dec 17, 2025', 'Promosi Kesehatan', 'https://rsintanhusada.com/img/blog/1765940664_69421db862607.jpg', 'Informasi layanan bedah dan paket kamar rawat inap standar RSIH.'],
	['Kenali Tonsil Hipertrofi: Ketika Amandel Membesar dan Mengganggu Pernapasan', 'marketing', 'Nov 11, 2025', 'Info Kesehatan', 'https://rsintanhusada.com/img/blog/1763434638_691be08e16750.webp', 'Tonsil hipertrofi adalah istilah medis dari amandel yang membesar dan dapat mengganggu napas, makan, atau tidur.'],
	['Efusi Pleura: Ketika Cairan Menumpuk di Sekitar Paru-paru', 'Admin RSIH', 'Oct 15, 2025', 'Info Kesehatan', 'https://rsintanhusada.com/img/blog/1763451897_691c23f92e85f.jpeg', 'Catatan ringkas tentang efusi pleura dan hal yang perlu diperhatikan.'],
]

export function DentalClinicPage() {
	return <section className="dental-page">
		<PageHeading eyebrow="Klinik Sehat Bagendit" title="POLIKLINIK" />
		<header className="dental-banner"><h1>Poliklinik Gigi</h1><p>Pelayanan Kesehatan Profesional dengan Tim Dokter Spesialis</p></header>
		<div className="dental-content container"><section className="dental-intro"><img src="https://rsintanhusada.com/img/foto-poli/Klinik%20Gigi.jpg" alt="Poliklinik Gigi RSIH" /><div><h2>Tentang Poliklinik Gigi</h2><p>Poli Gigi merupakan salah satu dari jenis layanan yang memberikan pelayanan kesehatan gigi dan mulut berupa pemeriksaan kesehatan gigi dan mulut, pengobatan dan pemberian tindakan medis dasar kesehatan gigi dan mulut seperti pencabutan gigi.</p><p>Poli gigi adalah layanan seputar kesehatan mulut dan gigi. Mulai dari pemeriksaan, pembersihan, pengobatan, hingga tindakan medis lebih lanjut.</p><h3>Kondisi yang Ditangani</h3><div className="condition-grid">{dentalConditions.map((condition) => <span key={condition}>● {condition}</span>)}</div></div></section><section className="dental-doctors"><h2>Dokter Poliklinik Gigi</h2><div className="dental-doctor-grid">{dentalDoctors.map((doctor) => <article key={doctor.id}><img src={doctor.image} alt={doctor.name} /><h3>{doctor.name}</h3><span>{doctor.specialty}</span><a href={`#dokter-profile-${doctor.id}`}>⌕ Profil</a></article>)}</div></section><section className="dental-schedule"><h2>Jadwal Praktik Dokter</h2><div className="dental-table-wrap"><table><thead><tr><th>NO</th><th>NAMA DOKTER</th><th>SENIN</th><th>SELASA</th><th>RABU</th><th>KAMIS</th><th>JUMAT</th><th>SABTU</th><th>MINGGU</th></tr></thead><tbody>{dentalDoctors.map((doctor, index) => <tr key={doctor.id}><td>{index + 1}</td><td>{doctor.name}</td><td>{index % 2 === 0 ? '08.00 - 12.00' : '-'}</td><td>{index % 3 === 0 ? '08.00 - 12.00' : '-'}</td><td>{index % 2 === 1 ? '13.00 - 16.00' : '-'}</td><td>{index % 3 === 1 ? '16.00 - 20.00' : '-'}</td><td>{index % 2 === 0 ? '13.00 - 16.00' : '-'}</td><td>{index === 2 ? '09.00 - 16.00' : '-'}</td><td>-</td></tr>)}</tbody></table></div></section><section className="dental-cta"><div><span>Butuh Konsultasi?</span><h2>Jadwalkan kunjungan Anda ke Poliklinik Gigi sekarang juga</h2></div><div><a href="tel:02622800900">☎ Hubungi Kami</a><a href="#kontak">⌖ Lihat Lokasi</a></div></section></div>
	</section>
}

export function FacilitiesPage() {
	return <section className="reference-page facilities-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="FASILITAS UMUM" /><p className="facilities-lead">BERBAGAI FASILITAS PENUNJANG UNTUK KENYAMANAN PASIEN DAN PENGUNJUNG</p><div className="facility-grid">{facilities.map(([name, text, hours, action, image]) => <article className="facility-card" key={name}><img src={image} alt={name} /><div><h2>{name}</h2><p>{text}</p><small>◷ {hours}</small><a href="#kontak">{action} <b>→</b></a></div></article>)}</div></section>
}

export function CareersPage() {
	return <section className="reference-page careers-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="KARIR & LOWONGAN KERJA" /><div className="career-intro"><span>▱</span><h2>Bergabung bersama RSIH</h2><p>Bangun karier dan berikan kontribusi terbaik untuk pelayanan kesehatan masyarakat Garut.</p></div><div className="job-grid">{jobOpenings.map(([title, category, type, text]) => <article className="job-card" key={title}><div><span>{category}</span><h2>{title}</h2><p>{text}</p></div><div className="job-meta"><small>◷ {type}</small><a href="mailto:rsintanhusada@gmail.com?subject=Lamaran%20Kerja%20RSIH">Lihat Detail ↗</a></div></article>)}</div><div className="career-note"><strong>Belum menemukan posisi yang sesuai?</strong><span>Kirim CV Anda dan kami akan menghubungi saat ada kesempatan yang relevan.</span><a href="mailto:rsintanhusada@gmail.com?subject=CV%20Kandidat%20RSIH">Kirim CV ↗</a></div></section>
}

export function ContactPage() {
	return <section className="contact-reference"><header className="contact-banner"><h1>Hubungi Kami</h1><p>Klinik Sehat Bagendit siap melayani kebutuhan kesehatan dasar Anda.</p></header><div className="contact-reference-content container"><div className="contact-column"><article className="contact-panel"><h2>⌖ &nbsp;Alamat</h2><div><strong>⌂ Lokasi Klinik</strong><p>Jl. Terusan Cinunuk No. 9<br />Kp. Babakan Baru RT 002/RW 009<br />Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut</p><a href="https://maps.app.goo.gl/VEdPkMePphxAanGp6" target="_blank" rel="noreferrer">Buka di Google Maps</a></div><div><strong>◷ Rawat Jalan</strong><p>Senin–Minggu<br />07.00–14.00 WIB dan 15.00–20.00 WIB</p></div></article></div><article className="map-panel"><h2>⌖ &nbsp;Lokasi Kami di Peta</h2><a className="map-direct-link" href="https://maps.app.goo.gl/VEdPkMePphxAanGp6" target="_blank" rel="noreferrer">Buka lokasi Klinik Sehat Bagendit di Google Maps ↗</a></article></div><section className="hours-section"><h2>◷ Jam Operasional</h2><div><article><strong>Rawat Jalan</strong><span>Setiap hari, 07.00–14.00 & 15.00–20.00 WIB</span></article><article className="emergency-hours"><strong>Rawat Inap</strong><span>Buka 24 Jam Setiap Hari</span></article></div></section></section>
}

export function BlogPage() {
	return <section className="reference-page blog-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="BLOG & ARTIKEL KESEHATAN" /><div className="blog-layout"><div className="blog-list">{blogPosts.map(([title, author, date, category, image, excerpt], index) => <article className="blog-card" key={title}><img src={image} alt={title} /><div><h2>{title}</h2><small>♙ {author} &nbsp; ◷ {date} &nbsp; ▫ {category}</small><p>{excerpt}</p><a href={index === 2 ? '#blog-tonsil' : '#kontak'}>Selengkapnya <b>↗</b></a></div></article>)}</div><aside className="blog-sidebar"><input placeholder="Search..." aria-label="Cari artikel" /><h3>Kategori</h3><a href="#blog">Pelayanan Medis (1)</a><a href="#blog">Penelitian &amp; Inovasi (0)</a><a href="#blog">Info Kesehatan (2)</a><a href="#blog">Promosi Kesehatan (1)</a><a href="#blog">Informasi RSIH (0)</a></aside></div></section>
}

export function BlogDetailPage() {
	return <section className="reference-page blog-detail-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="BLOG DETAIL" /><article className="blog-detail-card"><img className="blog-detail-cover" src={blogPosts[2][4]} alt={blogPosts[2][0]} /><h1>{blogPosts[2][0]}</h1><small>♙ marketing &nbsp; ◷ Nov 11, 2025 &nbsp; ▫ Info Kesehatan</small><div className="article-body"><h2>Tonsil Hipertrofi</h2><h3>Pendahuluan</h3><p>Tonsil hipertrofi sebenarnya cuma istilah medis dari amandel yang membesar. Kondisi ini bisa bikin beberapa aktivitas yang biasanya ringan seperti napas, makan, atau tidur menjadi terganggu. Pada banyak anak, amandel memang cenderung aktif dan ukurannya dapat berubah-ubah.</p><h3>Epidemiologi</h3><p>Kondisi ini paling sering terlihat pada anak-anak usia sekolah atau bahkan sebelumnya. Banyak yang akhirnya mengecil sendiri saat remaja, sehingga angkanya menurun seiring bertambahnya usia.</p><h3>Anatomi &amp; Patofisiologi</h3><p>Tonsil adalah bagian dari sistem pertahanan tubuh di belakang mulut. Jika terlalu besar, saluran napas dapat menyempit dan menyebabkan tidur tidak nyenyak, napas berbunyi, atau kebiasaan bernapas lewat mulut.</p><h3>Penyebab &amp; Faktor Risiko</h3><p>Infeksi berulang, alergi, lingkungan yang memicu peradangan, dan faktor bawaan keluarga dapat membuat amandel lebih mudah membesar.</p><h3>Gejala Klinis</h3><p>Keluhan yang sering muncul adalah mendengkur, tidur gelisah, napas melalui mulut, sakit tenggorokan berulang, serta kesulitan makan.</p><h3>Pemeriksaan</h3><p>Dokter biasanya memulai dengan menanyakan riwayat keluhan lalu memeriksa ukuran tonsil. Bila diperlukan, pemeriksaan tambahan seperti endoskopi atau pemeriksaan tidur dapat dilakukan.</p><h3>Diagnosis Banding</h3><p>Kondisi lain seperti abses di sekitar tonsil, radang tonsil kronis, atau pertumbuhan jaringan yang tidak normal perlu dibedakan melalui pemeriksaan menyeluruh.</p><h3>Penatalaksanaan</h3><p>Kasus ringan dapat dipantau dan ditangani dengan obat sesuai penyebab. Jika keluhan mengganggu aktivitas atau infeksi sering terjadi, operasi pengangkatan amandel dapat menjadi pilihan.</p><h3>Indikasi Tonsilektomi</h3><p>Operasi dipertimbangkan bila infeksi terlalu sering atau pembesaran tonsil mengganggu napas saat tidur, makan, atau menyebabkan komplikasi berulang.</p><h3>Komplikasi Operasi</h3><p>Seperti tindakan bedah lainnya, operasi amandel memiliki risiko seperti perdarahan, nyeri menelan, infeksi, atau perubahan suara sementara.</p><h3>Hasil &amp; Prognosis</h3><p>Banyak anak mengalami perbaikan kualitas tidur, energi, dan aktivitas setelah penanganan yang sesuai. Tetap diperlukan pemantauan jangka panjang.</p><h3>Kesimpulan</h3><p>Tonsil hipertrofi cukup umum pada anak-anak. Penanganannya tidak selalu harus operasi dan perlu disesuaikan dengan kondisi serta kebutuhan setiap pasien.</p><p className="article-author">Penulis: <strong>dr. Fitri Septiani, Sp.THT-KL</strong></p></div><section className="related-article"><h2>Artikel Terkait</h2><img src={blogPosts[3][4]} alt={blogPosts[3][0]} /><h3>{blogPosts[3][0]}</h3><a href="#blog">Baca Selengkapnya</a></section></article></section>
}

export function SiteFooter() {
	return <footer className="site-footer shared-footer container"><div className="footer-brand"><img src="/logo-ksb.png" alt="Logo Klinik Sehat Bagendit" /><p>Klinik Sehat Bagendit</p><small>Jl. Terusan Cinunuk No. 9, Kp. Babakan Baru<br />Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut</small></div><div><h3>Menu</h3><a href="#top">Beranda</a><a href="#sejarah">Sejarah</a><a href="#visi-misi">Visi & Misi</a><a href="#jenis-pelayanan">Layanan</a><a href="#fasilitas-umum">Fasilitas</a><a href="#kontak">Kontak</a></div><div><h3>Jam Pelayanan</h3><p>Rawat jalan: setiap hari<br />07.00–14.00 & 15.00–20.00 WIB</p><p>Rawat inap: 24 jam</p></div><small className="footer-copy">© Klinik Sehat Bagendit</small></footer>
}

const homePosters = services.map(([, title]) => [title, '/hospital-hero.svg'])

export function ReferenceHome({ activeRoom, setActiveRoom, roomStart, setRoomStart, activeTestimonial, setActiveTestimonial }) {
	const visibleRooms = rooms.slice(roomStart, roomStart + 2)
	const roomSlideCount = Math.max(1, rooms.length - 1)

	return <div className="reference-home">
		<section className="home-hero-reference"><div className="home-hero-image" /><div className="home-hero-overlay"><div className="home-hero-inner container"><p>Selamat Datang di</p><h1>Klinik Sehat Bagendit</h1><span>Pusat layanan kesehatan primer yang berkualitas, nyaman, dan bersahabat di wilayah Kecamatan Banyuresmi dan sekitarnya.</span><a href="#jenis-pelayanan">Lihat Layanan <b>↗</b></a></div><div className="hero-dots"><i className="active" /></div></div></section>
		<section className="emergency-feature container"><div className="emergency-photo"><img src="/hospital-hero.svg" alt="Klinik Sehat Bagendit" /><span>RAWAT INAP</span></div><div className="emergency-copy"><p className="section-kicker">Pelayanan Klinik</p><h2>Pelayanan Rawat Inap 24 Jam</h2><p>Klinik menyediakan rawat inap dengan kapasitas total 12 bed, termasuk pelayanan observasi dan pertolongan pertama pada kondisi kegawatdaruratan.</p><a className="emergency-button" href="#kontak">Lihat lokasi klinik ↗</a><div className="emergency-tags"><span>◷ Rawat inap 24 jam</span><span>♧ Layanan medis dasar</span></div><small>Rawat jalan setiap hari<br />07.00–14.00 &amp; 15.00–20.00 WIB</small></div></section>
		<section className="reference-rooms"><div className="container"><div className="reference-section-label">KAMAR RAWAT INAP</div><p className="reference-subtitle">Berbagai pilihan kamar rawat inap yang nyaman untuk proses pemulihan optimal</p><div className="reference-room-track"><button className="round-arrow" onClick={() => setRoomStart(Math.max(0, roomStart - 1))} disabled={roomStart === 0}>‹</button>{visibleRooms.map((room, index) => { const roomIndex = roomStart + index; return <article className={`reference-room-card ${activeRoom === roomIndex ? 'active' : ''}`} key={room.name} onClick={() => setActiveRoom(roomIndex)}><img src={room.image} alt={room.name} /><div><small>{roomIndex === 0 ? 'VIP' : room.name}</small><h3>{room.name}</h3><p>◉ Luas ruangan nyaman<br />◉ Kapasitas {room.detail}</p><strong>{room.price}<em> / malam</em></strong><a href="#kontak">Detail Kamar ↗</a></div></article> })}<button className="round-arrow" onClick={() => setRoomStart(Math.min(roomSlideCount - 1, roomStart + 1))} disabled={roomStart === roomSlideCount - 1}>›</button></div><div className="reference-room-dots">{Array.from({ length: roomSlideCount }, (_, index) => <button className={roomStart === index ? 'active' : ''} key={index} onClick={() => setRoomStart(index)} />)}</div></div></section>
		<section className="reference-services container"><div className="reference-section-label">LAYANAN KESEHATAN</div><p className="reference-subtitle">Berbagai layanan kesehatan profesional yang tersedia di Klinik Sehat Bagendit</p><div className="poster-grid">{homePosters.map(([title, image]) => <a href="#jenis-pelayanan" className="poster-card" key={title}><img src={image} alt={title} /><span>{title}</span></a>)}</div></section>
		<section className="reference-testimonials"><div className="container"><div className="reference-section-label">TESTIMONI</div><p className="reference-subtitle">Pengalaman nyata dari pasien yang telah merasakan pelayanan kami</p><div className="testimonial-grid">{testimonials.map((testimonial, index) => <article className={activeTestimonial === index ? 'active' : ''} key={testimonial[0]} onClick={() => setActiveTestimonial(index)}><span>“</span><p>{testimonial[1]}</p><small>{testimonial[0]} · {testimonial[2]}</small><b>★★★★★</b></article>)}</div><div className="testimonial-pages"><button className="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><button>...</button><button>13</button></div></div></section>
	</div>
}

