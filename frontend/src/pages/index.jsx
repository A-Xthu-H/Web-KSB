import React, { useState } from 'react'

const rooms = [
	{ name: 'Kamar Utama', price: 'Rp 850.000', detail: '1 bed / kamar', tone: 'amber', image: '/room-suite.svg' },
	{ name: 'Kelas 1', price: 'Rp 650.000', detail: '1 bed / kamar', tone: 'blue', image: '/room-suite.svg' },
	{ name: 'Kelas 2', price: 'Rp 520.000', detail: '2 bed / kamar', tone: 'mint', image: '/room-suite.svg' },
	{ name: 'Kelas 3', price: 'Rp 250.000', detail: '6-8 bed / kamar', tone: 'coral', image: '/room-suite.svg' },
	{ name: 'KRIS', price: 'Rp 750.000', detail: '4 bed / kamar', tone: 'blue', image: '/room-suite.svg' },
	{ name: 'Isolasi', price: 'Rp 650.000', detail: '2 bed / kamar', tone: 'mint', image: '/room-suite.svg' },
]

const services = [
	['✦', 'Poli Umum', 'Pemeriksaan kesehatan harian dengan dokter berpengalaman.'],
	['⌁', 'Laboratorium', 'Hasil akurat untuk membantu keputusan medis lebih cepat.'],
	['◒', 'Poli Gigi', 'Perawatan gigi nyaman untuk keluarga dan anak-anak.'],
	['＋', 'Medical Check Up', 'Kenali kondisi tubuh dengan pemeriksaan menyeluruh.'],
]

const testimonials = [
	['Irvan Syaidussalam', 'Sangat baik dan pelayanannya sangat sopan, sigap, dan selalu siap menangani keluhan apa pun.', '2025'],
	['Agus Bargo', 'Dokter dan perawat ramah, fasilitas bagus. Rumah sakit terus memberikan perbaikan menjadi lebih baik.', '2023'],
	['MI Alkindi', 'Pelayanannya sangat baik, ramah, sopan, dan lingkungan ruangan pasien sangat dijaga kebersihannya.', '2023'],
]

const partners = ['AA International Indonesia', 'Asuransi ABDA', 'ACA Asuransi', 'AdMedika', 'Asuransi AIP', 'Allianz', 'Asuransi MAG', 'Avrist', 'AXA', 'bank bjb syariah', 'BCA Life', 'BNI Life', 'BPJS Kesehatan', 'BRI Life', 'CAR', 'Fullerton Health']

const doctors = [
	{ id: 107, name: 'dr. Yusuf G., M.Kes(Gizi)., MMKes., SpAk.', specialty: 'Dokter Spesialis Akupunktur Medis', image: 'https://rsintanhusada.com/img/foto%20dokter/1762910878_Yusuf%20Gunawan_web.jpg' },
	{ id: 18, name: 'DR. Siti Nur Fatimah, dr.Sp GK (K), MS', specialty: 'Dokter Spesialis Gizi Klinik', image: 'https://rsintanhusada.com/img/foto%20dokter/Siti%20Nur%20Fatimah_web.jpg' },
	{ id: 39, name: 'dr. Gusti Made Odi Sidharta, Sp. JP', specialty: 'Dokter Spesialis Jantung', image: 'https://rsintanhusada.com/img/foto%20dokter/G.%20M.%20Odi%20Sidharta_web.jpg' },
	{ id: 36, name: 'dr. Riki Vita Wisudiana, Sp. THTKL', specialty: 'Dokter Spesialis THT', image: 'https://rsintanhusada.com/img/foto%20dokter/Riki%20Vita_web.jpg' },
	{ id: 1000, name: 'dr. Fitri Septiani, Sp.THT-KL', specialty: 'Dokter Spesialis THT', image: 'https://rsintanhusada.com/img/foto%20dokter/1762910966_Fitri%20Septiani_web.jpg' },
	{ id: 24, name: 'dr. Widjajanti Utojo, Sp. M', specialty: 'Dokter Spesialis Mata', image: 'https://rsintanhusada.com/img/foto%20dokter/Widjajanti%20Utojo_web.jpg' },
	{ id: 29, name: 'dr. Fikri Faisal, Sp. P', specialty: 'Dokter Spesialis Paru', image: 'https://rsintanhusada.com/img/foto%20dokter/Fikri%20Faisal_web.jpg' },
	{ id: 14, name: 'drg. Novi Dewandari', specialty: 'Dokter Gigi Umum', image: 'https://rsintanhusada.com/img/foto%20dokter/Novi%20Dewandari_web.jpg' },
]

const clinicServices = [
	{ id: 1, name: 'Klinik Umum', short: 'UMUM', icon: '♧', detail: 'Pemeriksaan kesehatan umum untuk kebutuhan keluarga.' },
	{ id: 2, name: 'Klinik Gigi', short: 'GIGI', icon: '✦', detail: 'Pemeriksaan dan tindakan kesehatan gigi dan mulut.' },
	{ id: 3, name: 'Klinik Spesialis Anak', short: 'ANAK', icon: '♡', detail: 'Pelayanan kesehatan anak dengan dokter spesialis.' },
	{ id: 4, name: 'Klinik Spesialis Bedah Umum', short: 'BEDAH UMUM', icon: '◈', detail: 'Konsultasi dan penanganan bedah umum.' },
	{ id: 5, name: 'Klinik Spesialis Orthopaedi', short: 'ORTHOPAEDI', icon: '⌁', detail: 'Layanan tulang, sendi, dan gerak tubuh.' },
	{ id: 6, name: 'Klinik Spesialis Kebidanan & Kandungan', short: 'KEBIDANAN & KANDUNGAN', icon: '♧', detail: 'Pendampingan kesehatan ibu dan kandungan.' },
	{ id: 7, name: 'Klinik Spesialis Fetomaternal', short: 'FETOMATERNAL', icon: '♡', detail: 'Pemantauan kehamilan dengan kebutuhan khusus.' },
	{ id: 8, name: 'Klinik Spesialis Bedah Digestif', short: 'BEDAH DIGESTIF', icon: '◉', detail: 'Penanganan penyakit saluran cerna dan pencernaan.' },
	{ id: 9, name: 'Klinik Spesialis Jantung', short: 'JANTUNG', icon: '♥', detail: 'Pemeriksaan dan konsultasi kesehatan jantung.' },
	{ id: 10, name: 'Klinik Spesialis Mata', short: 'MATA', icon: '◉', detail: 'Pemeriksaan mata dan kesehatan penglihatan.' },
	{ id: 11, name: 'Klinik Spesialis THT', short: 'THT', icon: '◌', detail: 'Layanan telinga, hidung, tenggorokan.' },
	{ id: 12, name: 'Medical Check Up', short: 'MCU', icon: '+', detail: 'Pemeriksaan kesehatan menyeluruh dan berkala.' },
]

export const navItems = [
	{ label: 'Beranda', href: '#top', page: 'home' },
	{ label: 'Tentang Kami', href: '#tentang-kami', page: 'tentang-kami', children: [{ label: 'Sejarah Rumah Sakit', href: '#sejarah' }, { label: 'Visi dan Misi', href: '#visi-misi' }, { label: 'Penghargaan dan Akreditasi', href: '#penghargaan' }] },
	{ label: 'Rekanan dan Mitra', href: '#rekanan-mitra', page: 'rekanan-mitra' },
	{ label: 'Dokter', href: '#dokter', page: 'dokter', children: [{ label: 'Daftar Dokter', href: '#dokter' }, { label: 'Rawat Jalan', href: '#rawat-jalan' }, { label: 'Poli Gigi', href: '#poli-gigi' }] },
	{ label: 'Jenis Pelayanan', href: '#jenis-pelayanan', page: 'jenis-pelayanan', children: [{ label: 'Layanan Kesehatan', href: '#jenis-pelayanan' }, { label: 'Rawat Inap', href: '#rawat-inap' }, { label: 'Poli Gigi', href: '#poli-gigi' }] },
	{ label: 'Fasilitas Umum', href: '#fasilitas-umum', page: 'fasilitas-umum' },
	{ label: 'Blog', href: '#blog', page: 'blog', children: [{ label: 'Artikel Kesehatan', href: '#blog' }, { label: 'Artikel Tonsil Hipertrofi', href: '#blog-tonsil' }] },
	{ label: 'Karir', href: '#karir', page: 'karir' },
	{ label: 'Kontak', href: '#kontak', page: 'kontak' },
]

const pageData = {
	'tentang-kami': { eyebrow: 'Tentang Kami', title: <>Mengenal <em>RSIH</em> lebih dekat.</>, intro: 'Rumah Sakit Intan Husada adalah rumah sakit pilihan masyarakat Garut dan sekitarnya dengan layanan medis berkualitas, proses yang mudah, dan pelayanan profesional.', cards: [['Sejarah', 'Berdiri sejak 2008, RSIH terus tumbuh bersama kebutuhan kesehatan masyarakat Garut.'], ['Visi dan Misi', 'Menjadi rumah sakit pilihan yang menghadirkan layanan aman, ramah, dan bermutu.'], ['Nilai Kami', 'Integritas, kepedulian, profesionalisme, dan perbaikan berkelanjutan.']] },
	'sejarah': { eyebrow: 'Tentang Kami / Sejarah RSIH', title: <>Cita-cita dokter,<br /><em>rumah sakit untuk Garut.</em></>, intro: 'RS Intan Husada berawal dari cita-cita pengurus IDI Cabang Garut untuk menghadirkan pelayanan prima yang tidak hanya berorientasi pada bisnis.', cards: [['Cita-cita IDI Garut', 'Para dokter ingin membangun rumah sakit dengan pelayanan yang profesional, hangat, dan berfokus pada pasien.'], ['Peresmian 2014', 'RS Intan Husada diresmikan pada 9 September 2014 dengan semangat Kami Berikan Yang Terbaik.'], ['Galeri Sejarah', 'Dokumentasi pendirian, perkembangan, dan momen peresmian Rumah Sakit Intan Husada.']] },
	'visi-misi': { eyebrow: 'Tentang Kami / Visi dan Misi', title: <>Tumbuh untuk kesehatan<br /><em>masyarakat.</em></>, intro: 'Setiap keputusan kami berangkat dari satu tujuan: memberikan pengalaman layanan kesehatan yang aman dan manusiawi.', cards: [['Visi', 'Menjadi rumah sakit pilihan masyarakat Garut dan sekitarnya.'], ['Misi', 'Memberikan pelayanan kesehatan bermutu dengan sumber daya profesional.'], ['Komitmen', 'Mendengarkan pasien dan terus memperbaiki kualitas layanan.']] },
	'penghargaan': { eyebrow: 'Tentang Kami / Penghargaan', title: <>Mutu yang terus<br /><em>kami jaga.</em></>, intro: 'Penghargaan dan akreditasi menjadi bagian dari komitmen RSIH untuk memberikan pelayanan yang aman dan berkualitas.', cards: [['Akreditasi RSIH', 'Dokumentasi penghargaan dan akreditasi Rumah Sakit Intan Husada.'], ['Keselamatan Pasien', 'Standar pelayanan kami berorientasi pada keselamatan dan kenyamanan pasien.'], ['Perbaikan Berkelanjutan', 'Kami mengevaluasi layanan secara berkala untuk terus menjadi lebih baik.']] },
	'rekanan-mitra': { eyebrow: 'Rekanan dan Mitra', title: <>Bersama membangun<br /><em>kesehatan.</em></>, intro: 'Kami bekerja sama dengan berbagai perusahaan, komunitas, dan penyedia jaminan kesehatan untuk memperluas akses layanan.', cards: [['BPJS Kesehatan', 'Layanan kesehatan bagi peserta JKN sesuai ketentuan yang berlaku.'], ['Perusahaan', 'Pemeriksaan dan layanan kesehatan untuk kebutuhan korporasi.'], ['Mitra Kesehatan', 'Kolaborasi profesional untuk layanan yang semakin terintegrasi.']] },
	'dokter': { eyebrow: 'Dokter RSIH', title: <>Temui dokter<br /><em>pilihan Anda.</em></>, intro: 'Tim dokter kami hadir dengan kompetensi dan kepedulian untuk mendampingi setiap kebutuhan kesehatan Anda.', cards: [['Poli Umum', 'Konsultasi kesehatan keluarga dan pemeriksaan awal.'], ['Poli Spesialis', 'Jadwal dokter spesialis untuk kebutuhan medis yang lebih terarah.'], ['Konsultasi', 'Buat janji dan dapatkan informasi jadwal melalui WhatsApp kami.']] },
	'dokter-profile': { eyebrow: 'Profile Dokter', title: <>dr. Yusuf G.<br /><em>Spesialis Akupunktur Medis.</em></>, intro: 'Profile dr. Yusuf G., M.Kes(Gizi)., MMKes., SpAk., dokter spesialis akupunktur medis di Rumah Sakit Intan Husada.', cards: [['Pendidikan', 'Akupuntur Medik, Universitas Indonesia.'], ['Seminar dan Pelatihan', 'Informasi seminar dan pelatihan dokter tersedia di profile resmi.'], ['Jadwal Praktik', 'Lihat jadwal praktik dan buat janji melalui daftar dokter RSIH.']] },
	'rawat-jalan': { eyebrow: 'Dokter / Rawat Jalan', title: <>Layanan rawat jalan<br /><em>RSIH.</em></>, intro: 'Temukan poliklinik dan jadwal dokter untuk kebutuhan pemeriksaan tanpa rawat inap.', cards: [['Poliklinik', 'Pilih layanan dan dokter sesuai kebutuhan kesehatan Anda.'], ['Jadwal Dokter', 'Jadwal praktik tersedia untuk membantu merencanakan kunjungan.'], ['Pendaftaran', 'Hubungi petugas RSIH untuk informasi pendaftaran dan jadwal.']] },
	'poli-gigi': { eyebrow: 'Poliklinik', title: <>Poliklinik<br /><em>Gigi.</em></>, intro: 'Pemeriksaan dan tindakan kesehatan gigi serta mulut untuk anak dan dewasa.', cards: [['Kondisi Ditangani', 'Gigi berlubang, karang gigi, penyakit gusi, sariawan, gigi sensitif, dan perawatan saluran akar.'], ['Dokter Gigi', 'Didukung dokter gigi umum dan spesialis periodonti.'], ['Jadwal Praktik', 'Lihat jadwal dokter dan jadwalkan kunjungan ke Poli Gigi.']] },
	'jenis-pelayanan': { eyebrow: 'Jenis Pelayanan', title: <>Layanan yang<br /><em>Anda butuhkan.</em></>, intro: 'Berbagai layanan kesehatan profesional tersedia dalam satu rumah sakit untuk membantu Anda dan keluarga.', cards: services.map(([, title, text]) => [title, text]) },
	'rawat-inap': { eyebrow: 'Jenis Pelayanan / Rawat Inap', title: <>Ruang nyaman untuk<br /><em>pemulihan.</em></>, intro: 'Pilih kamar rawat inap yang sesuai kebutuhan Anda dengan fasilitas yang mendukung proses penyembuhan.', cards: rooms.map((room) => [room.name, `${room.detail} · ${room.price} / malam`]) },
	'fasilitas-umum': { eyebrow: 'Fasilitas Umum', title: <>Fasilitas lengkap,<br /><em>lebih tenang.</em></>, intro: 'Kami menyiapkan fasilitas penunjang agar kunjungan dan perawatan Anda berlangsung nyaman.', cards: [['Instalasi Gawat Darurat', 'Siaga 24 jam dengan tim medis profesional.'], ['Ambulans', 'Layanan ambulans siap menjemput dan mengantar pasien.'], ['Laboratorium', 'Pemeriksaan laboratorium dengan hasil yang akurat.']] },
	'blog': { eyebrow: 'Blog Kesehatan', title: <>Bekal sehat untuk<br /><em>setiap hari.</em></>, intro: 'Baca informasi kesehatan, kabar terbaru, dan tips sederhana dari RSIH.', cards: [['Mengenal tanda kegawatdaruratan', 'Kenali kapan Anda perlu segera mendapatkan pertolongan medis.'], ['Menjaga kesehatan keluarga', 'Kebiasaan kecil yang membantu keluarga tetap sehat.'], ['Persiapan medical check up', 'Hal yang perlu disiapkan sebelum pemeriksaan kesehatan.']] },
	'blog-tonsil': { eyebrow: 'Blog / Info Kesehatan', title: <>Kenali tonsil hipertrofi,<br /><em>ketika amandel membesar.</em></>, intro: 'Tonsil hipertrofi dapat mengganggu napas, makan, dan tidur. Kenali gejala, pemeriksaan, dan pilihan penanganannya.', cards: [['Gejala Klinis', 'Mendengkur, tidur gelisah, napas melalui mulut, dan sakit tenggorokan berulang.'], ['Pemeriksaan', 'Dokter menilai riwayat keluhan, ukuran tonsil, dan pemeriksaan tambahan bila diperlukan.'], ['Penatalaksanaan', 'Penanganan dapat berupa observasi hingga tindakan operasi sesuai kondisi pasien.']] },
	'karir': { eyebrow: 'Karir', title: <>Bertumbuh bersama<br /><em>RSIH.</em></>, intro: 'Bergabunglah dengan tim yang menjadikan kepedulian dan profesionalisme sebagai bagian dari pekerjaan setiap hari.', cards: [['Tenaga Medis', 'Kesempatan berkontribusi untuk dokter, perawat, dan tenaga kesehatan.'], ['Tenaga Profesional', 'Bangun pengalaman di lingkungan rumah sakit yang dinamis.'], ['Kirim Lamaran', 'Hubungi kami untuk informasi posisi yang sedang tersedia.']] },
	'kontak': { eyebrow: 'Kontak Kami', title: <>Kami siap<br /><em>membantu Anda.</em></>, intro: 'Hubungi Rumah Sakit Intan Husada untuk informasi layanan, jadwal dokter, dan kebutuhan kesehatan Anda.', cards: [['Alamat', 'Jl. Mayor Suherman No. 72, Tarogong, Kabupaten Garut'], ['Telepon', '0262 2247769 · Darurat 0262 2800900'], ['WhatsApp', 'Chat langsung dengan tim RSIH melalui WhatsApp.']] },
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
		<div className="inner-page-hero"><div><p className="eyebrow"><span className="pulse-dot" /> {content.eyebrow}</p><h1>{content.title}</h1><p className="inner-page-intro">{content.intro}</p></div><div className="inner-page-art"><img src="/hospital-hero.svg" alt="Ilustrasi Rumah Sakit Intan Husada" /><span>RSIH / GARUT</span></div></div>
		<div className="page-card-grid">{content.cards.map(([title, text], index) => <article className="page-card" key={title}><span className="page-card-number">0{index + 1}</span><span className="page-card-icon">{page === 'blog' ? '◌' : page === 'dokter' ? '♧' : '✚'}</span><h2>{title}</h2><p>{text}</p><a href={links[index]}>{labels[index]} <span>↗</span></a></article>)}</div>
		<div className="page-contact-strip"><div><span className="section-kicker">{page === 'blog' || page === 'blog-tonsil' ? 'Informasi kesehatan' : page === 'karir' ? 'Bergabung dengan kami' : 'RSIH untuk Anda'}</span><h2>{page === 'dokter' ? 'Temukan dokter yang tepat.' : page === 'blog' || page === 'blog-tonsil' ? 'Sehat dimulai dari informasi.' : page === 'karir' ? 'Mari tumbuh bersama.' : 'Ada yang bisa kami bantu?'}</h2></div><a className="button button-primary" href={bottomAction[0]}>{bottomAction[1]} <span>↗</span></a></div>
	</section>
}

export function AboutPage({ page }) {
	if (page === 'sejarah') {
		return <section className="reference-page about-history container">
			<PageHeading eyebrow="Rumah Sakit Intan Husada" title="SEJARAH RSIH" />
			<div className="history-intro"><img src="https://rsintanhusada.com/img/sejarah/owner.jpg" alt="Pendiri dan penggagas RS Intan Husada Garut" /><div className="history-copy"><article><h2>Cita-Cita IDI Cabang Garut</h2><p><strong>Pendirian RS Intan Husada (RSIH)</strong> sebenarnya merupakan cita-cita pengurus Ikatan Dokter Indonesia (IDI) Cabang Garut. Kumpulan para dokter ini ingin mendirikan sebuah rumah sakit agar dapat menerapkan konsep-konsep pelayanan yang mengarah ke pelayanan prima dan tidak hanya mengarah berdasarkan aspek bisnis semata.</p></article><article><h2>Peresmian Tahun 2014</h2><p><strong>Diresmikan pada tanggal 9 September 2014</strong>, dengan semangat &quot;Kami Berikan Yang Terbaik&quot; dalam melayani pasien. Nama Intan Husada sendiri diambil dari nama koperasi yang membidani lahirnya RSIH, yaitu Koperasi Insan Husada.</p></article><article><h2>Visi Pelayanan Kesehatan</h2><p><strong>Oleh sebab itu</strong> rumah sakit swasta klasifikasi C ini diharapkan bisa memberikan pelayanan kesehatan yang lebih profesional, hangat, ramah, berkualitas, dan tetap berfokus pada keselamatan pasien.</p></article></div></div>
			<section className="history-gallery"><PageHeading eyebrow="Galeri Sejarah RSIH" title="DOKUMENTASI PERJALANAN RUMAH SAKIT INTAN HUSADA" /> <div className="gallery-grid"><GalleryCard image="https://rsintanhusada.com/img/sejarah/sejarah1.jpg" title="Momen Bersejarah RSIH" /><GalleryCard image="https://rsintanhusada.com/img/sejarah/sejarah2.jpg" title="Perkembangan RSIH" /><GalleryCard image="https://rsintanhusada.com/img/sejarah/sejarah3.jpg" title="Peresmian 2014" /></div></section>
		</section>
	}

	if (page === 'visi-misi') {
		return <section className="reference-page about-vision container"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="VISI DAN MISI" /><h2 className="commitment-title">KOMITMEN KAMI DALAM MEMBERIKAN PELAYANAN KESEHATAN TERBAIK</h2><div className="vision-panels"><article><h2>VISI</h2><p>&quot;Menjadi rumah sakit pilihan untuk masyarakat Garut dan sekitarnya melalui layanan medis yang berkualitas, proses mudah dan profesional&quot;</p></article><article><h2>MISI</h2><ul><li>Memberikan pelayanan kesehatan dengan kualitas medis yang terpercaya</li><li>Memberikan pelayanan yang cepat dan praktis dengan sistem informasi dan teknologi yang terintegrasi</li><li>Memberikan pelayanan kesehatan yang secara keuangan efektif, efisien, dan transparan</li><li>Memberikan pelayanan JKN yang optimal sesuai dengan ketentuan yang berlaku</li></ul></article></div><section className="management-section"><PageHeading eyebrow="Tim Manajemen" title="DIREKTUR DAN MANAJER RS INTAN HUSADA" /><div className="management-grid"><ManagementCard image="https://rsintanhusada.com/img/manajemen/drg%20hasan.jpg" name="drg. Muhammad Hasan, MARS" role="Direktur" /><ManagementCard image="https://rsintanhusada.com/img/manajemen/depi.jpg" name="Ns. Depi Rismayanti, M.Kep" role="Manajer Keperawatan" /><ManagementCard image="https://rsintanhusada.com/img/manajemen/maya.jpg" name="Maya Anggraeni, S.Pd" role="Manajer SDM dan Umum" /></div></section></section>
	}

	return <section className="reference-page about-awards container"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="PENGHARGAAN DAN AKREDITASI" /><div className="certificate-frame"><img src="https://rsintanhusada.com/img/lain-lain/akreditasi.jpg" alt="Sertifikat akreditasi Rumah Sakit Intan Husada" /></div></section>
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
	return <section className="reference-page partners-page container"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="REKANAN DAN MITRA" /><p className="reference-lead">Rumah Sakit Intan Husada telah bekerja sama dengan:</p><div className="partner-grid">{partners.map((partner, index) => <article className={`partner-card partner-${index % 6}`} key={partner}><span>{partner.split(' ').map((word) => word[0]).join('').slice(0, 3)}</span><strong>{partner}</strong></article>)}</div></section>
}

export function DoctorsPage() {
	const [query, setQuery] = useState('')
	const filteredDoctors = doctors.filter((doctor) => `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(query.toLowerCase()))

	return <section className="reference-page doctors-page container"><div className="doctors-heading"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="TIM DOKTER" /><p>Dokter profesional yang siap melayani kesehatan Anda dengan penuh dedikasi dan keahlian.</p></div><form className="doctor-search" onSubmit={(event) => event.preventDefault()}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari dokter berdasarkan nama atau spesialisasi..." aria-label="Cari dokter" /><button type="submit">Cari</button></form><div className="doctor-grid">{filteredDoctors.map((doctor) => <article className="doctor-card" key={doctor.id}><img src={doctor.image} alt={doctor.name} /><div className="doctor-card-body"><h2>{doctor.name}</h2><p>{doctor.specialty}</p><a href={`#dokter-profile-${doctor.id}`}>Lihat Profil</a></div></article>)}</div>{filteredDoctors.length === 0 && <p className="empty-search">Dokter tidak ditemukan. Coba kata kunci lain.</p>}</section>
}

export function DoctorProfilePage({ doctorId }) {
	const doctor = doctors.find((item) => item.id === Number(doctorId)) || doctors[1]

	return <section className="reference-page doctor-profile-page container"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="PROFILE DOKTER" /><div className="doctor-profile-card"><div className="profile-photo"><img src={doctor.image} alt={doctor.name} /><a href="#dokter">Kembali ke Daftar Dokter</a></div><div className="profile-copy"><h1>{doctor.name}</h1><span className="specialty-pill">{doctor.specialty}</span><section><h2>Riwayat Pendidikan</h2><p>{doctor.id === 107 ? 'Akupuntur Medik Universitas Indonesia' : 'Pendidikan kedokteran dan spesialisasi sesuai bidang pelayanan.'}</p></section><section><h2>Seminar &amp; Pelatihan</h2><p>Informasi seminar dan pelatihan tersedia di profile dokter RSIH.</p></section></div></div><section className="schedule-panel"><h2>Jadwal Praktik Dokter</h2><div className="schedule-row"><strong>SENIN</strong><strong>SELASA</strong><strong>RABU</strong><strong>KAMIS</strong><strong>JUMAT</strong><strong>SABTU</strong><strong>MINGGU</strong><span>16.00 - 18.00</span><span>Libur</span><span>Libur</span><span>09.00 - 12.00</span><span>Libur</span><span>Libur</span><span>Libur</span></div></section></section>
}

export function ServicesPage() {
	const [query, setQuery] = useState('')
	const filteredServices = clinicServices.filter((service) => `${service.name} ${service.short}`.toLowerCase().includes(query.toLowerCase()))

	return <section className="reference-page services-directory container"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="RAWAT JALAN" /><form className="service-search" onSubmit={(event) => event.preventDefault()}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari Poliklinik" aria-label="Cari poliklinik" /><button type="submit">Cari</button></form><div className="clinic-grid">{filteredServices.map((service, index) => <article className={`clinic-card clinic-tone-${index % 6}`} key={service.id}><div className="clinic-card-art"><span className="clinic-logo">✚</span><span className="clinic-medal">✦</span><div className="clinic-icon">{service.icon}</div><small>Klik Di Sini</small></div><div className="clinic-card-body"><p>Klinik</p><h2>{service.short}</h2><span>{service.detail}</span><a href={service.id === 2 ? '#poli-gigi' : '#dokter'}>Lihat Detail <b>↗</b></a></div></article>)}</div>{filteredServices.length === 0 && <p className="empty-search">Poliklinik tidak ditemukan.</p>}</section>
}

const dentalDoctors = [
	...doctors.filter((doctor) => doctor.id === 14),
	{ id: 15, name: 'drg. Syifa Aghnia', specialty: 'Dokter Gigi Umum', image: 'https://rsintanhusada.com/img/foto%20dokter/Syifa%20Aghnia_web.jpg' },
	{ id: 16, name: 'drg. Tutun Rendrawulan', specialty: 'Dokter Gigi Umum', image: 'https://rsintanhusada.com/img/foto%20dokter/Tutun%20Rendrawulan_web.jpg' },
	{ id: 98, name: 'drg. Novita Putri Ranggaswuni', specialty: 'Dokter Gigi Umum', image: 'https://rsintanhusada.com/img/foto%20dokter/novita%20putri%20ranggaswuni%20ok%20copy%202.jpg' },
	{ id: 103, name: 'dr. Fikri S. Mahmud, AIFO', specialty: 'Dokter Gigi Umum', image: 'https://rsintanhusada.com/img/foto%20dokter/1762911651_Fikri%20S.%20Mahmud_web.jpg' },
	{ id: 1006, name: 'drg. Minessa Mahardika, Sp.Perio', specialty: 'Dokter Gigi Spesialis Periodonti', image: 'https://rsintanhusada.com/img/foto%20dokter/1763520924_av.jpeg' },
]
const dentalConditions = ['Pemeriksaan dan tindakan di Poli Gigi', 'Pencabutan gigi', 'Gigi berlubang', 'Bau mulut', 'Karang gigi', 'Penyakit gusi', 'Sariawan', 'Gigi sensitive', 'Gigi patah atau retak', 'Gigi palsu', 'Bleaching', 'Perawatan saluran akar']

const facilities = [
	['Intan Mart', 'Mini market yang menyediakan berbagai kebutuhan sehari-hari dan snack untuk kenyamanan pasien dan pengunjung.', 'Setiap Hari', 'Kunjungi', 'https://rsintanhusada.com/img/fasilitas%20umum/intan%20mart.jpg'],
	['I Food', 'Area makan dengan berbagai pilihan menu makanan dan minuman yang lezat dan terjangkau.', '06:00 - 19:00', 'Lihat Detail', 'https://rsintanhusada.com/img/fasilitas%20umum/ifood.jpg'],
	['ATM Center', 'Layanan perbankan dengan multiple ATM dari berbagai bank untuk kemudahan transaksi.', '24 Jam', 'Akses', 'https://rsintanhusada.com/img/fasilitas%20umum/atm_cntr.jpg'],
	['Area Parkir', 'Area parkir yang luas dan aman untuk kendaraan roda dua dan empat dengan sistem keamanan 24 jam.', 'Roda 2 & 4', 'Lihat Detail', 'https://rsintanhusada.com/img/fasilitas%20umum/parkir.jpg'],
	['Mushola', 'Tempat ibadah yang nyaman dan bersih untuk pasien dan pengunjung dengan fasilitas lengkap.', '24 Jam', 'Lihat Detail', 'https://rsintanhusada.com/img/fasilitas%20umum/mushola.jpg'],
]

const jobOpenings = [
	['Dokter Umum', 'Dokter', 'Full time', 'Memberikan pelayanan medis umum dan konsultasi kesehatan pasien.'],
	['Perawat Rawat Inap', 'Keperawatan', 'Full time', 'Mendampingi perawatan pasien dengan standar keselamatan RSIH.'],
	['Petugas Administrasi', 'Administrasi', 'Full time', 'Melayani proses administrasi dan kebutuhan informasi pasien.'],
]

const blogPosts = [
	['Operasi Katarak Phaco Emulsifikasi', 'admin', 'Dec 23, 2025', 'Pelayanan Medis', 'https://rsintanhusada.com/img/blog/1766460314_694a0b9aac6e2.jpg', 'Informasi tentang layanan operasi katarak phaco emulsifikasi di Rumah Sakit Intan Husada.'],
	['Layanan Bedah Paket KRIS', 'Admin RSIH', 'Dec 17, 2025', 'Promosi Kesehatan', 'https://rsintanhusada.com/img/blog/1765940664_69421db862607.jpg', 'Informasi layanan bedah dan paket kamar rawat inap standar RSIH.'],
	['Kenali Tonsil Hipertrofi: Ketika Amandel Membesar dan Mengganggu Pernapasan', 'marketing', 'Nov 11, 2025', 'Info Kesehatan', 'https://rsintanhusada.com/img/blog/1763434638_691be08e16750.webp', 'Tonsil hipertrofi adalah istilah medis dari amandel yang membesar dan dapat mengganggu napas, makan, atau tidur.'],
	['Efusi Pleura: Ketika Cairan Menumpuk di Sekitar Paru-paru', 'Admin RSIH', 'Oct 15, 2025', 'Info Kesehatan', 'https://rsintanhusada.com/img/blog/1763451897_691c23f92e85f.jpeg', 'Catatan ringkas tentang efusi pleura dan hal yang perlu diperhatikan.'],
]

export function DentalClinicPage() {
	return <section className="dental-page">
		<PageHeading eyebrow="Rumah Sakit Intan Husada" title="POLIKLINIK" />
		<header className="dental-banner"><h1>Poliklinik Gigi</h1><p>Pelayanan Kesehatan Profesional dengan Tim Dokter Spesialis</p></header>
		<div className="dental-content container"><section className="dental-intro"><img src="https://rsintanhusada.com/img/foto-poli/Klinik%20Gigi.jpg" alt="Poliklinik Gigi RSIH" /><div><h2>Tentang Poliklinik Gigi</h2><p>Poli Gigi merupakan salah satu dari jenis layanan yang memberikan pelayanan kesehatan gigi dan mulut berupa pemeriksaan kesehatan gigi dan mulut, pengobatan dan pemberian tindakan medis dasar kesehatan gigi dan mulut seperti pencabutan gigi.</p><p>Poli gigi adalah layanan seputar kesehatan mulut dan gigi. Mulai dari pemeriksaan, pembersihan, pengobatan, hingga tindakan medis lebih lanjut.</p><h3>Kondisi yang Ditangani</h3><div className="condition-grid">{dentalConditions.map((condition) => <span key={condition}>● {condition}</span>)}</div></div></section><section className="dental-doctors"><h2>Dokter Poliklinik Gigi</h2><div className="dental-doctor-grid">{dentalDoctors.map((doctor) => <article key={doctor.id}><img src={doctor.image} alt={doctor.name} /><h3>{doctor.name}</h3><span>{doctor.specialty}</span><a href={`#dokter-profile-${doctor.id}`}>⌕ Profil</a></article>)}</div></section><section className="dental-schedule"><h2>Jadwal Praktik Dokter</h2><div className="dental-table-wrap"><table><thead><tr><th>NO</th><th>NAMA DOKTER</th><th>SENIN</th><th>SELASA</th><th>RABU</th><th>KAMIS</th><th>JUMAT</th><th>SABTU</th><th>MINGGU</th></tr></thead><tbody>{dentalDoctors.map((doctor, index) => <tr key={doctor.id}><td>{index + 1}</td><td>{doctor.name}</td><td>{index % 2 === 0 ? '08.00 - 12.00' : '-'}</td><td>{index % 3 === 0 ? '08.00 - 12.00' : '-'}</td><td>{index % 2 === 1 ? '13.00 - 16.00' : '-'}</td><td>{index % 3 === 1 ? '16.00 - 20.00' : '-'}</td><td>{index % 2 === 0 ? '13.00 - 16.00' : '-'}</td><td>{index === 2 ? '09.00 - 16.00' : '-'}</td><td>-</td></tr>)}</tbody></table></div></section><section className="dental-cta"><div><span>Butuh Konsultasi?</span><h2>Jadwalkan kunjungan Anda ke Poliklinik Gigi sekarang juga</h2></div><div><a href="tel:02622800900">☎ Hubungi Kami</a><a href="#kontak">⌖ Lihat Lokasi</a></div></section></div>
	</section>
}

export function FacilitiesPage() {
	return <section className="reference-page facilities-page container"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="FASILITAS UMUM" /><p className="facilities-lead">BERBAGAI FASILITAS PENUNJANG UNTUK KENYAMANAN PASIEN DAN PENGUNJUNG</p><div className="facility-grid">{facilities.map(([name, text, hours, action, image]) => <article className="facility-card" key={name}><img src={image} alt={name} /><div><h2>{name}</h2><p>{text}</p><small>◷ {hours}</small><a href="#kontak">{action} <b>→</b></a></div></article>)}</div></section>
}

export function CareersPage() {
	return <section className="reference-page careers-page container"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="KARIR & LOWONGAN KERJA" /><div className="career-intro"><span>▱</span><h2>Bergabung bersama RSIH</h2><p>Bangun karier dan berikan kontribusi terbaik untuk pelayanan kesehatan masyarakat Garut.</p></div><div className="job-grid">{jobOpenings.map(([title, category, type, text]) => <article className="job-card" key={title}><div><span>{category}</span><h2>{title}</h2><p>{text}</p></div><div className="job-meta"><small>◷ {type}</small><a href="mailto:rsintanhusada@gmail.com?subject=Lamaran%20Kerja%20RSIH">Lihat Detail ↗</a></div></article>)}</div><div className="career-note"><strong>Belum menemukan posisi yang sesuai?</strong><span>Kirim CV Anda dan kami akan menghubungi saat ada kesempatan yang relevan.</span><a href="mailto:rsintanhusada@gmail.com?subject=CV%20Kandidat%20RSIH">Kirim CV ↗</a></div></section>
}

export function ContactPage() {
	return <section className="contact-reference"><header className="contact-banner"><h1>Hubungi Kami</h1><p>Kami siap melayani Anda dengan sepenuh hati. Silakan hubungi<br />kami melalui saluran berikut.</p></header><div className="contact-reference-content container"><div className="contact-column"><article className="contact-panel"><h2>⌖ &nbsp;Alamat &amp; Telepon</h2><div><strong>⌂ Alamat</strong><p>Jl. Mayor Suherman No.72<br />Tarogong Kidul, Garut</p><a href="https://maps.google.com/?q=Jl.%20Mayor%20Suherman%20No.72%20Tarogong%20Kidul%20Garut">Buka di Google Maps</a></div><div><strong>✉ Email</strong><p>rs@rsintanhusada.com</p><a href="mailto:rs@rsintanhusada.com">Kirim Email</a></div><div><strong>♧ Telepon</strong><p>+62 812-1486-7272</p><a href="tel:+6281214867272">Telepon Sekarang</a><a className="whatsapp-link" href="https://wa.me/6281214867272">Chat WhatsApp</a></div></article><article className="contact-panel social-panel"><h2>⌯ &nbsp;Media Sosial</h2><p>Ikuti kami di media sosial untuk informasi terbaru seputar layanan kesehatan dan promo.</p><div className="social-links"><a href="https://www.instagram.com/rs_intanhusada/">Instagram<small>@rs_intanhusada</small></a><a href="https://www.youtube.com/@RumahSakitIntanHusada">YouTube<small>Rumah Sakit Intan Husada</small></a><a href="https://www.facebook.com/RSIntanHusada">Facebook<small>RS Intan Husada</small></a></div></article></div><article className="map-panel"><h2>⌖ &nbsp;Lokasi Kami di Peta</h2><iframe title="Lokasi Rumah Sakit Intan Husada" src="https://www.google.com/maps?q=Jl.%20Mayor%20Suherman%20No.72%20Tarogong%20Kidul%20Garut&output=embed" loading="lazy" /></article></div><section className="hours-section"><h2>◷ Jam Operasional</h2><div><article><strong>Senin - Jumat</strong><span>07:00 - 20:00 WIB</span></article><article><strong>Sabtu - Minggu</strong><span>08:00 - 17:00 WIB</span></article><article className="emergency-hours"><strong>Unit Gawat Darurat (UGD)</strong><span>Buka 24 Jam Setiap Hari</span></article></div></section></section>
}

export function BlogPage() {
	return <section className="reference-page blog-page container"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="BLOG & ARTIKEL KESEHATAN" /><div className="blog-layout"><div className="blog-list">{blogPosts.map(([title, author, date, category, image, excerpt], index) => <article className="blog-card" key={title}><img src={image} alt={title} /><div><h2>{title}</h2><small>♙ {author} &nbsp; ◷ {date} &nbsp; ▫ {category}</small><p>{excerpt}</p><a href={index === 2 ? '#blog-tonsil' : '#kontak'}>Selengkapnya <b>↗</b></a></div></article>)}</div><aside className="blog-sidebar"><input placeholder="Search..." aria-label="Cari artikel" /><h3>Kategori</h3><a href="#blog">Pelayanan Medis (1)</a><a href="#blog">Penelitian &amp; Inovasi (0)</a><a href="#blog">Info Kesehatan (2)</a><a href="#blog">Promosi Kesehatan (1)</a><a href="#blog">Informasi RSIH (0)</a></aside></div></section>
}

export function BlogDetailPage() {
	return <section className="reference-page blog-detail-page container"><PageHeading eyebrow="Rumah Sakit Intan Husada" title="BLOG DETAIL" /><article className="blog-detail-card"><img className="blog-detail-cover" src={blogPosts[2][4]} alt={blogPosts[2][0]} /><h1>{blogPosts[2][0]}</h1><small>♙ marketing &nbsp; ◷ Nov 11, 2025 &nbsp; ▫ Info Kesehatan</small><div className="article-body"><h2>Tonsil Hipertrofi</h2><h3>Pendahuluan</h3><p>Tonsil hipertrofi sebenarnya cuma istilah medis dari amandel yang membesar. Kondisi ini bisa bikin beberapa aktivitas yang biasanya ringan seperti napas, makan, atau tidur menjadi terganggu. Pada banyak anak, amandel memang cenderung aktif dan ukurannya dapat berubah-ubah.</p><h3>Epidemiologi</h3><p>Kondisi ini paling sering terlihat pada anak-anak usia sekolah atau bahkan sebelumnya. Banyak yang akhirnya mengecil sendiri saat remaja, sehingga angkanya menurun seiring bertambahnya usia.</p><h3>Anatomi &amp; Patofisiologi</h3><p>Tonsil adalah bagian dari sistem pertahanan tubuh di belakang mulut. Jika terlalu besar, saluran napas dapat menyempit dan menyebabkan tidur tidak nyenyak, napas berbunyi, atau kebiasaan bernapas lewat mulut.</p><h3>Penyebab &amp; Faktor Risiko</h3><p>Infeksi berulang, alergi, lingkungan yang memicu peradangan, dan faktor bawaan keluarga dapat membuat amandel lebih mudah membesar.</p><h3>Gejala Klinis</h3><p>Keluhan yang sering muncul adalah mendengkur, tidur gelisah, napas melalui mulut, sakit tenggorokan berulang, serta kesulitan makan.</p><h3>Pemeriksaan</h3><p>Dokter biasanya memulai dengan menanyakan riwayat keluhan lalu memeriksa ukuran tonsil. Bila diperlukan, pemeriksaan tambahan seperti endoskopi atau pemeriksaan tidur dapat dilakukan.</p><h3>Diagnosis Banding</h3><p>Kondisi lain seperti abses di sekitar tonsil, radang tonsil kronis, atau pertumbuhan jaringan yang tidak normal perlu dibedakan melalui pemeriksaan menyeluruh.</p><h3>Penatalaksanaan</h3><p>Kasus ringan dapat dipantau dan ditangani dengan obat sesuai penyebab. Jika keluhan mengganggu aktivitas atau infeksi sering terjadi, operasi pengangkatan amandel dapat menjadi pilihan.</p><h3>Indikasi Tonsilektomi</h3><p>Operasi dipertimbangkan bila infeksi terlalu sering atau pembesaran tonsil mengganggu napas saat tidur, makan, atau menyebabkan komplikasi berulang.</p><h3>Komplikasi Operasi</h3><p>Seperti tindakan bedah lainnya, operasi amandel memiliki risiko seperti perdarahan, nyeri menelan, infeksi, atau perubahan suara sementara.</p><h3>Hasil &amp; Prognosis</h3><p>Banyak anak mengalami perbaikan kualitas tidur, energi, dan aktivitas setelah penanganan yang sesuai. Tetap diperlukan pemantauan jangka panjang.</p><h3>Kesimpulan</h3><p>Tonsil hipertrofi cukup umum pada anak-anak. Penanganannya tidak selalu harus operasi dan perlu disesuaikan dengan kondisi serta kebutuhan setiap pasien.</p><p className="article-author">Penulis: <strong>dr. Fitri Septiani, Sp.THT-KL</strong></p></div><section className="related-article"><h2>Artikel Terkait</h2><img src={blogPosts[3][4]} alt={blogPosts[3][0]} /><h3>{blogPosts[3][0]}</h3><a href="#blog">Baca Selengkapnya</a></section></article></section>
}

export function SiteFooter() {
	return <footer className="site-footer shared-footer container"><div className="footer-brand"><img src="/rsih-logo.svg" alt="RSIH Intan Husada" /><p>Rumah Sakit Intan Husada</p><small>Jl. Mayor Suherman No.72, Tarogong, Kabupaten Garut<br />0262 2247769<br />rsintanhusada@gmail.com</small></div><div><h3>Useful Links</h3><a href="#top">Home</a><a href="#sejarah">Sejarah</a><a href="#jenis-pelayanan">Services</a><a href="#dokter">Dokter</a><a href="#karir">Karir</a><a href="#kontak">Kontak</a></div><div><h3>Follow Us</h3><div className="footer-social"><a href="https://www.youtube.com/@RumahSakitIntanHusada">YouTube</a><a href="https://www.instagram.com/rs_intanhusada/">Instagram</a><a href="https://wa.me/6281214867272">WhatsApp</a></div><a className="footer-whatsapp" href="https://wa.me/6281214867272">Chat WhatsApp</a><a className="footer-emergency" href="tel:02622800900">Emergency Call</a></div><small className="footer-copy">© Copyright SIRS RSIH All Rights Reserved</small></footer>
}

const homePosters = [
	['Sunat Hore', 'https://rsintanhusada.com/layanan/1775631268_layanan.jpeg'],
	['Tindik Modern', 'https://rsintanhusada.com/layanan/1775631210_layanan.jpeg'],
	['Harga Vaksin', 'https://rsintanhusada.com/layanan/1775631140_layanan.jpeg'],
	['Audiometri', 'https://rsintanhusada.com/layanan/1765784191_layanan.jpeg'],
	['Tarif Vaksin', 'https://rsintanhusada.com/layanan/1765784139_layanan.jfif'],
	['Morning Joy by IFood', 'https://rsintanhusada.com/layanan/1763431118_layanan.webp'],
	['Prenatal Yoga', 'https://rsintanhusada.com/layanan/1763431078_layanan.webp'],
	['Weight Loss Program', 'https://rsintanhusada.com/layanan/1763431045_layanan.webp'],
	['Operasi Katarak Phaco', 'https://rsintanhusada.com/layanan/1763430834_layanan.webp'],
	['Home Visite Lab', 'https://rsintanhusada.com/layanan/1762921021_layanan.jpg'],
	['Informasi Nomor Resmi', 'https://rsintanhusada.com/layanan/1762928063_layanan.jpg'],
	['Paket Rawat Inap KRIS', 'https://rsintanhusada.com/layanan/1762928154_layanan.jpeg'],
]

export function ReferenceHome({ activeRoom, setActiveRoom, roomStart, setRoomStart, activeTestimonial, setActiveTestimonial }) {
	const visibleRooms = rooms.slice(roomStart, roomStart + 2)
	const roomSlideCount = rooms.length - 1

	return <div className="reference-home">
		<section className="home-hero-reference"><div className="home-hero-image" /><div className="home-hero-overlay"><div className="home-hero-inner container"><p>Selamat Datang di Website Official</p><h1>Rumah Sakit Intan Husada Garut</h1><span>Menjadi Rumah Sakit pilihan untuk masyarakat Garut dan sekitarnya melalui layanan medis yang berkualitas, proses mudah dan profesional.</span><a href="#jenis-pelayanan">Layanan Unggulan <b>↗</b></a></div><div className="hero-dots"><i /><i className="active" /><i /><i /><i /></div></div></section>
		<section className="emergency-feature container"><div className="emergency-photo"><img src="https://rsintanhusada.com/img/layanan/UGD.jpg" alt="Layanan Darurat 24 Jam" /><span>DARURAT</span></div><div className="emergency-copy"><p className="section-kicker">Layanan Unggulan</p><h2>Layanan Darurat 24 Jam</h2><p>Tim medis profesional kami siap memberikan pertolongan pertama kapan saja Anda membutuhkan.</p><a className="emergency-button" href="tel:02622800900">Hubungi Darurat <strong>(0262) 2800 - 900</strong> ↗</a><div className="emergency-tags"><span>◷ Layanan 24 Jam</span><span>♧ Ambulance Standby</span><span>♧ Dokter Profesional</span></div><small>UGD Lantai 1 - Gedung Utama<br />Buka 24 Jam / 7 Hari</small></div></section>
		<section className="reference-rooms"><div className="container"><div className="reference-section-label">KAMAR RAWAT INAP</div><p className="reference-subtitle">Berbagai pilihan kamar rawat inap yang nyaman untuk proses pemulihan optimal</p><div className="reference-room-track"><button className="round-arrow" onClick={() => setRoomStart(Math.max(0, roomStart - 1))} disabled={roomStart === 0}>‹</button>{visibleRooms.map((room, index) => { const roomIndex = roomStart + index; return <article className={`reference-room-card ${activeRoom === roomIndex ? 'active' : ''}`} key={room.name} onClick={() => setActiveRoom(roomIndex)}><img src={room.image} alt={room.name} /><div><small>{roomIndex === 0 ? 'VIP' : room.name}</small><h3>{room.name}</h3><p>◉ Luas ruangan nyaman<br />◉ Kapasitas {room.detail}</p><strong>{room.price}<em> / malam</em></strong><a href="#kontak">Detail Kamar ↗</a></div></article> })}<button className="round-arrow" onClick={() => setRoomStart(Math.min(roomSlideCount - 1, roomStart + 1))} disabled={roomStart === roomSlideCount - 1}>›</button></div><div className="reference-room-dots">{Array.from({ length: roomSlideCount }, (_, index) => <button className={roomStart === index ? 'active' : ''} key={index} onClick={() => setRoomStart(index)} />)}</div></div></section>
		<section className="reference-services container"><div className="reference-section-label">LAYANAN KESEHATAN</div><p className="reference-subtitle">Berbagai layanan kesehatan profesional yang tersedia di Rumah Sakit Intan Husada</p><div className="poster-grid">{homePosters.map(([title, image]) => <a href="#jenis-pelayanan" className="poster-card" key={title}><img src={image} alt={title} /><span>{title}</span></a>)}</div></section>
		<section className="reference-testimonials"><div className="container"><div className="reference-section-label">TESTIMONI</div><p className="reference-subtitle">Pengalaman nyata dari pasien yang telah merasakan pelayanan kami</p><div className="testimonial-grid">{testimonials.map((testimonial, index) => <article className={activeTestimonial === index ? 'active' : ''} key={testimonial[0]} onClick={() => setActiveTestimonial(index)}><span>“</span><p>{testimonial[1]}</p><small>{testimonial[0]} · {testimonial[2]}</small><b>★★★★★</b></article>)}</div><div className="testimonial-pages"><button className="active">1</button><button>2</button><button>3</button><button>4</button><button>5</button><button>...</button><button>13</button></div></div></section>
	</div>
}

