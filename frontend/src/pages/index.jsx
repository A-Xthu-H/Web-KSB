import React, { useState, useEffect } from 'react'
import { usePublicApi, postPublic, formatTanggal, ambilSetting, ambilKonten, uraiKartu, urlMedia } from '../api/publicApi.js'

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

// --- NAVIGASI SUDAH DIPERBAIKI (HAPUS RAWAT INAP DI LAYANAN) ---
export const navItems = [
	{ label: 'Beranda', href: '#top', page: 'home' },
	{ label: 'Tentang Kami', href: '#tentang-kami', page: 'tentang-kami' },
	{ label: 'Layanan', href: '#jenis-pelayanan', page: 'jenis-pelayanan' },
	{ label: 'Fasilitas Umum', href: '#fasilitas-umum', page: 'fasilitas-umum' },
	{ label: 'Dokter', href: '#dokter', page: 'dokter' },
	{ label: 'Mitra Klinik', href: '#rekanan-mitra', page: 'rekanan-mitra' },
	{ label: 'Artikel', href: '#blog', page: 'blog' },
	{ label: 'Karir', href: '#karir', page: 'karir' },
	{ label: 'Kontak', href: '#kontak', page: 'kontak' },
]

const pageData = {
	'tentang-kami': { eyebrow: 'Tentang Kami', title: <>Mengenal <em>Klinik Sehat Bagendit</em>.</>, intro: 'Klinik Sehat Bagendit adalah klinik pratama swasta yang memberikan pelayanan kesehatan medik dasar dengan orientasi pada pelayanan pasien.', cards: [['Sejarah', 'Berawal dari dokter praktik pribadi pada 2006, kemudian menjadi balai pengobatan pada 17 Mei 2010.'], ['Visi dan Misi', 'Pusat layanan kesehatan primer yang berkualitas, nyaman, dan bersahabat di Banyuresmi dan sekitarnya.'], ['Motto', 'Sahabat Sehat Keluarga Anda.']] },
	'sejarah': { eyebrow: 'Tentang Kami / Sejarah', title: <>Cita-cita kami,<br /><em>sehat untuk Garut.</em></>, intro: 'Berawal dari cita-cita untuk menghadirkan pelayanan prima yang tidak hanya berorientasi pada bisnis.', cards: [['Awal Mula', 'Berawal dari dokter praktik pribadi pada 2006.'], ['Balai Pengobatan', 'Menjadi balai pengobatan pada 17 Mei 2010 di Jalan Hasan Arif.'], ['Klinik Sehat Bagendit', 'Pada tahun 2017 berdiri di bangunan saat ini di Jalan Terusan Cinunuk.']] },
	'visi-misi': { eyebrow: 'Tentang Kami / Visi dan Misi', title: <>Tumbuh untuk kesehatan<br /><em>masyarakat.</em></>, intro: 'Setiap keputusan kami berangkat dari satu tujuan: memberikan pengalaman layanan kesehatan yang aman dan manusiawi.', cards: [['Visi', 'Menjadi pusat layanan kesehatan primer yang Berkualitas, Nyaman, dan Bersahabat.'], ['Misi', 'Melandasi setiap aktivitas pelayanan sebagai ibadah kepada Allah SWT.'], ['Komitmen', 'Mendengarkan pasien dan terus memperbaiki kualitas layanan.']] },
	'penghargaan': { eyebrow: 'Tentang Kami / Penghargaan', title: <>Mutu yang terus<br /><em>kami jaga.</em></>, intro: 'Penghargaan dan akreditasi menjadi bagian dari komitmen kami untuk memberikan pelayanan yang aman dan berkualitas.', cards: [['Akreditasi', 'Klinik Sehat Bagendit telah terakreditasi resmi.'], ['Keselamatan Pasien', 'Standar pelayanan kami berorientasi pada keselamatan dan kenyamanan.'], ['Perbaikan Berkelanjutan', 'Kami mengevaluasi layanan secara berkala untuk terus menjadi lebih baik.']] },
	'rekanan-mitra': { eyebrow: 'Rekanan dan Mitra', title: <>Bersama membangun<br /><em>kesehatan.</em></>, intro: 'Kami bekerja sama dengan penyedia jaminan kesehatan untuk memperluas akses layanan.', cards: [['BPJS Kesehatan', 'Layanan kesehatan bagi peserta JKN sesuai ketentuan yang berlaku.'], ['Pasien Umum', 'Pelayanan prima untuk seluruh lapisan masyarakat.'], ['Mitra Kesehatan', 'Kolaborasi profesional untuk layanan yang semakin terintegrasi.']] },
	'dokter': { eyebrow: 'Karyawan', title: <>Temui dokter<br /><em>pilihan Anda.</em></>, intro: 'Tim dokter kami hadir dengan kompetensi dan kepedulian untuk mendampingi setiap kebutuhan kesehatan Anda.', cards: [['Poli Umum', 'Konsultasi kesehatan keluarga dan pemeriksaan awal.'], ['Poli Spesialis', 'Jadwal dokter spesialis untuk kebutuhan medis yang lebih terarah.'], ['Konsultasi', 'Buat janji dan dapatkan informasi jadwal melalui WhatsApp kami.']] },
	'dokter-profile': { eyebrow: 'Profile Dokter', title: <>dr. Budi Santoso<br /><em>Dokter Umum.</em></>, intro: 'Profile dr. Budi Santoso, dokter umum di Klinik Sehat Bagendit.', cards: [['Pendidikan', 'Kedokteran Umum, Universitas Terkemuka.'], ['Pelatihan', 'Informasi seminar dan pelatihan dokter tersedia di profile resmi.'], ['Jadwal Praktik', 'Lihat jadwal praktik dan buat janji melalui kontak.']] },
	'rawat-jalan': { eyebrow: 'Dokter / Rawat Jalan', title: <>Layanan rawat jalan<br /><em>Klinik.</em></>, intro: 'Temukan poliklinik dan jadwal dokter untuk kebutuhan pemeriksaan tanpa rawat inap.', cards: [['Poliklinik', 'Pilih layanan dan dokter sesuai kebutuhan kesehatan Anda.'], ['Jadwal Dokter', 'Jadwal praktik tersedia untuk membantu merencanakan kunjungan.'], ['Pendaftaran', 'Hubungi petugas kami untuk informasi pendaftaran dan jadwal.']] },
	'poli-gigi': { eyebrow: 'Poliklinik', title: <>Poliklinik<br /><em>Gigi.</em></>, intro: 'Pemeriksaan dan tindakan kesehatan gigi serta mulut untuk anak dan dewasa.', cards: [['Kondisi Ditangani', 'Gigi berlubang, karang gigi, penyakit gusi, sariawan, gigi sensitif.'], ['Dokter Gigi', 'Didukung dokter gigi umum yang ramah dan profesional.'], ['Jadwal Praktik', 'Lihat jadwal dokter dan jadwalkan kunjungan ke Poli Gigi.']] },
	'jenis-pelayanan': { eyebrow: 'Jenis Pelayanan', title: <>Layanan yang<br /><em>Anda butuhkan.</em></>, intro: 'Berbagai layanan kesehatan profesional tersedia untuk membantu Anda dan keluarga.', cards: services.map(([, title, text]) => [title, text]) },
	'fasilitas-umum': { eyebrow: 'Fasilitas Umum', title: <>Fasilitas untuk<br /><em>kenyamanan pasien.</em></>, intro: 'Fasilitas Klinik Sehat Bagendit meliputi ruang pendaftaran dan tunggu, pemeriksaan, tindakan, farmasi, laboratorium, observasi, rawat inap, serta ruang RB-KIA dan pojok ASI.', cards: [['Ruang Pelayanan', 'Ruang pemeriksaan, tindakan, periksa gigi, rawat inap, observasi, dan RB-KIA & pojok ASI.'], ['Penunjang', 'Ruang pendaftaran/tunggu, administrasi, farmasi, laboratorium, serta kamar mandi/WC.'], ['Akses & Kenyamanan', 'Penerangan listrik, air bersih, jaringan internet, dan lahan/area parkir.']] },
	'blog': { eyebrow: 'Blog Kesehatan', title: <>Bekal sehat untuk<br /><em>setiap hari.</em></>, intro: 'Baca informasi kesehatan, kabar terbaru, dan tips sederhana dari kami.', cards: [['Mengenal tanda kegawatdaruratan', 'Kenali kapan Anda perlu segera mendapatkan pertolongan medis.'], ['Menjaga kesehatan keluarga', 'Kebiasaan kecil yang membantu keluarga tetap sehat.'], ['Persiapan medical check up', 'Hal yang perlu disiapkan sebelum pemeriksaan kesehatan.']] },
	'blog-tonsil': { eyebrow: 'Blog / Info Kesehatan', title: <>Kenali tonsil hipertrofi,<br /><em>ketika amandel membesar.</em></>, intro: 'Tonsil hipertrofi dapat mengganggu napas, makan, dan tidur. Kenali gejala, pemeriksaan, dan pilihan penanganannya.', cards: [['Gejala Klinis', 'Mendengkur, tidur gelisah, napas melalui mulut, dan sakit tenggorokan berulang.'], ['Pemeriksaan', 'Dokter menilai riwayat keluhan, ukuran tonsil, dan pemeriksaan tambahan bila diperlukan.'], ['Penatalaksanaan', 'Penanganan dapat berupa observasi hingga tindakan operasi sesuai kondisi pasien.']] },
	'karir': { eyebrow: 'Karir', title: <>Bertumbuh bersama<br /><em>Klinik.</em></>, intro: 'Bergabunglah dengan tim yang menjadikan kepedulian dan profesionalisme sebagai bagian dari pekerjaan setiap hari.', cards: [['Tenaga Medis', 'Kesempatan berkontribusi untuk dokter, perawat, dan tenaga kesehatan.'], ['Tenaga Profesional', 'Bangun pengalaman di lingkungan yang dinamis.'], ['Kirim Lamaran', 'Hubungi kami untuk informasi posisi yang sedang tersedia.']] },
	'kontak': { eyebrow: 'Kontak Kami', title: <>Kami siap<br /><em>melayani Anda.</em></>, intro: 'Kunjungi Klinik Sehat Bagendit untuk layanan kesehatan dasar dan informasi pelayanan.', cards: [['Alamat', 'Jl. Terusan Cinunuk No. 9, Kp. Babakan Baru RT 002/RW 009, Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut'], ['Rawat Jalan', 'Senin–Minggu: 07.00–14.00 WIB dan 15.00–20.00 WIB'], ['Rawat Inap', 'Tersedia 24 jam.']] },
}

const pageCardLinks = {
	'tentang-kami': ['#visi-misi', '#rekanan-mitra', '#dokter'],
	'sejarah': ['#visi-misi', '#penghargaan', '#tentang-kami'],
	'visi-misi': ['#tentang-kami', '#rekanan-mitra', '#karir'],
	'penghargaan': ['#tentang-kami', '#visi-misi', '#kontak'],
	'rekanan-mitra': ['#dokter', '#jenis-pelayanan', '#kontak'],
	'dokter': ['#jenis-pelayanan', '#rawat-jalan', '#dokter-profile'],
	'dokter-profile': ['#dokter', '#dokter', 'https://wa.me/6282120232032'],
	'rawat-jalan': ['#jenis-pelayanan', '#dokter', 'https://wa.me/6282120232032'],
	'poli-gigi': ['#dokter', '#rawat-jalan', 'https://wa.me/6282120232032'],
	'jenis-pelayanan': ['#dokter', '#fasilitas-umum', '#kontak'],
	'fasilitas-umum': ['#jenis-pelayanan', '#kontak', '#kontak'],
	'blog': ['#jenis-pelayanan', '#fasilitas-umum', '#kontak'],
	'blog-tonsil': ['#dokter', '#jenis-pelayanan', '#blog'],
	'karir': ['#rekanan-mitra', '#kontak', 'mailto:admin@kliniksehatbagendit.com'],
	'kontak': ['https://maps.app.goo.gl/kXFHvWo4fhn8qXC78', 'https://wa.me/6282120232032', 'https://wa.me/6282120232032'],
}

const pageActionLabels = {
	'sejarah': ['Lihat visi misi', 'Lihat penghargaan', 'Kembali tentang kami'],
	'penghargaan': ['Tentang Kami', 'Lihat visi misi', 'Hubungi Kami'],
	'dokter': ['Lihat layanan', 'Lihat jadwal', 'Buat janji'],
	'dokter-profile': ['Daftar dokter', 'Jadwal dokter', 'Buat janji'],
	'rawat-jalan': ['Lihat layanan', 'Daftar dokter', 'Hubungi Kami'],
	'poli-gigi': ['Daftar dokter', 'Lihat jadwal', 'Hubungi poli'],
	'jenis-pelayanan': ['Lihat dokter', 'Lihat fasilitas', 'Hubungi Kami'],
	'fasilitas-umum': ['Lihat layanan', 'Hubungi Kami', 'Hubungi Kami'],
	'blog': ['Baca artikel', 'Lihat fasilitas', 'Baca artikel tonsil'],
	'blog-tonsil': ['Cari dokter', 'Lihat layanan', 'Kembali ke blog'],
	'karir': ['Lihat mitra', 'Hubungi Kami', 'Kirim lamaran'],
	'kontak': ['Lihat Peta', 'Rawat Jalan', 'Chat WhatsApp'],
}

const pageBottomActions = {
	'kontak': ['https://maps.app.goo.gl/kXFHvWo4fhn8qXC78', 'Lihat Lokasi Kami'],
	'karir': ['mailto:admin@kliniksehatbagendit.com', 'Kirim lamaran'],
	'blog': ['#blog-tonsil', 'Baca artikel terbaru'],
	'blog-tonsil': ['#dokter', 'Cari dokter'],
	'dokter': ['#dokter', 'Lihat direktori dokter'],
	'rawat-jalan': ['#poli-gigi', 'Lihat poliklinik'],
	'poli-gigi': ['https://wa.me/6282120232032', 'Hubungi poli'],
}

export function InformationPage({ page }) {
	const { data } = usePublicApi('/contents')
	const konten = ambilKonten(data, page)

	const statis = pageData[page] || pageData['tentang-kami']
	// Gunakan konten dari API bila tersedia, jika tidak pakai data statis.
	const kartuDariApi = konten ? uraiKartu(konten.body) : null
	const content = konten
	? { eyebrow: statis.eyebrow, title: konten.title || statis.title, intro: statis.intro, cards: kartuDariApi || statis.cards }
	: statis
	const links = pageCardLinks[page] || pageCardLinks['tentang-kami']
	const labels = pageActionLabels[page] || ['Selengkapnya', 'Selengkapnya', 'Selengkapnya']
	const bottomAction = pageBottomActions[page] || ['#kontak', 'Hubungi Kami']

	return <section className={`inner-page inner-page-${page} container`}>
		<div className="inner-page-hero"><div><p className="eyebrow"><span className="pulse-dot" /> {content.eyebrow}</p><h1>{content.title}</h1><p className="inner-page-intro">{content.intro}</p></div><div className="inner-page-art"><img src="/hospital-hero.svg" alt="Ilustrasi Klinik Sehat Bagendit" /><span>KLINIK / BANYURESMI</span></div></div>
		<div className="page-card-grid">{content.cards.map(([title, text], index) => <article className="page-card" key={title}><span className="page-card-number">0{index + 1}</span><span className="page-card-icon">{page === 'blog' ? '◌' : page === 'dokter' ? '♧' : '✚'}</span><h2>{title}</h2><p>{text}</p><a href={links[index]}>{labels[index]} <span>↗</span></a></article>)}</div>
		<div className="page-contact-strip"><div><span className="section-kicker">{page === 'blog' || page === 'blog-tonsil' ? 'Informasi kesehatan' : page === 'karir' ? 'Bergabung dengan kami' : 'KSB untuk Anda'}</span><h2>{page === 'dokter' ? 'Temukan dokter yang tepat.' : page === 'blog' || page === 'blog-tonsil' ? 'Sehat dimulai dari informasi.' : page === 'karir' ? 'Mari tumbuh bersama.' : 'Ada yang bisa kami bantu?'}</h2></div><a className="button button-primary" href={bottomAction[0]}>{bottomAction[1]} <span>↗</span></a></div>
	</section>
}

export function AboutPage({ page }) {
	const { data } = usePublicApi('/contents')
	const { data: settings } = usePublicApi('/settings')

	if (page === 'sejarah') {
	const konten = ambilKonten(data, 'sejarah')
	const kartuApi = konten ? uraiKartu(konten.body) : null
	const daftarSejarah = kartuApi || [
	['Berawal pada 2006', 'Klinik Sehat Bagendit berawal dari dibukanya dokter praktik pribadi pada tahun 2006.'],
	['Balai Pengobatan pada 2010', 'Pada 17 Mei 2010, didirikan balai pengobatan di Jalan Hasan Arif No. 222, Kampung Parigi, Desa Banyuresmi, Kecamatan Banyuresmi, Kabupaten Garut.'],
	['Lokasi Klinik Sejak 2017', 'Pada tahun 2017, bangunan Klinik Sehat Bagendit berdiri di Jalan Terusan Cinunuk No. 9, Kampung Babakan Baru, Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut.'],
	]
	return <section className="reference-page about-history container">
	<PageHeading eyebrow="Klinik Sehat Bagendit" title="SEJARAH KLINIK" />
	<div className="history-intro"><img src={urlMedia(konten?.imageUrl, '/logo-ksb.png')} alt="Gedung Klinik Sehat Bagendit" /><div className="history-copy">{daftarSejarah.map(([judul, teks]) => <article key={judul}><h2>{judul}</h2><p>{teks}</p></article>)}</div></div>
	</section>
	}

	if (page === 'visi-misi') {
	const konten = ambilKonten(data, 'visi-misi')
	const kartu = konten ? uraiKartu(konten.body) : null
	const cariKartu = (nama) => kartu?.find(([j]) => j.toLowerCase().includes(nama))?.[1]
	const visi = cariKartu('visi') || 'Menjadi pusat layanan kesehatan primer yang Berkualitas, Nyaman, dan Bersahabat di Wilayah Kecamatan Banyuresmi dan sekitarnya.'
	const misiRaw = cariKartu('misi') || 'Melandasi setiap aktivitas pelayanan sebagai ibadah kepada Allah SWT.; Menyediakan layanan medik dasar bagi pasien umum dan BPJS Kesehatan.; Melayani dengan Senyum, Salam, Sapa, Sabar, Cepat, Tepat, dan penuh Simpati.; Meningkatkan pengetahuan serta keterampilan agar profesional dalam bekerja.; Menyediakan fasilitas yang lengkap dan berkualitas.'
	const misi = misiRaw.split(';').map((m) => m.trim()).filter(Boolean)
	return <section className="reference-page about-vision container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="VISI DAN MISI" /><h2 className="commitment-title">KOMITMEN KAMI DALAM MEMBERIKAN PELAYANAN KESEHATAN PRIMER</h2><div className="vision-panels"><article><h2>VISI</h2><p>{visi}</p></article><article><h2>MISI</h2><ul>{misi.map((m) => <li key={m}>{m}</li>)}</ul></article></div><section className="management-section"><PageHeading eyebrow="Motto Klinik" title="SAHABAT SEHAT KELUARGA ANDA" /></section></section>
	}

	if (page === 'struktur') {
        // --- STRUKTUR ORGANISASI FLEXBOX (ANTI-PUTUS) ---
		const fotoStruktur = (key) => ambilSetting(settings, `struktur_${key}`, '/logo-ksb.png')
		const orgData = {
			pimpinan: { title: 'Pimpinan Klinik', name: 'dr. Asep Ichsannurdin', image: fotoStruktur('asep') },
			pjKlinik: { title: 'Penanggung Jawab Klinik', name: 'dr. Asep Ichsannurdin', image: fotoStruktur('asep') },
			branches: [
				{
					title: 'Penanggung Jawab Adman', name: 'Handri Priyatna', image: fotoStruktur('handri'),
					children: [
						{ title: 'Koor. Keuangan', name: 'Ade Yusuf, S.E', image: fotoStruktur('ade') },
						{ title: 'Koor. Manajemen Fasilitas & Keselamatan', name: 'Jumyati', image: fotoStruktur('jumyati') },
						{ title: 'Koor. Humas & Marketing', name: 'Yudha Anfal G', image: fotoStruktur('yudha') }
					]
				},
				{
					title: 'Penanggung Jawab Mutu/PPI', name: 'dr. Aprina Handayani', image: fotoStruktur('aprina'),
					children: [
						{ title: 'Koor. Mutu/Koor. PPI', name: 'Meita Rahayu, S.Kep,Ners', image: fotoStruktur('meita') },
						{ title: 'Koor. Keselamatan Pasien/ Koor Manajemen Risiko', name: 'Uswatuh Hasanah, S.Kep', image: fotoStruktur('uswatun') },
						{ title: 'Koor. K3', name: 'Jumyati', image: fotoStruktur('jumyati') }
					]
				},
				{
					title: 'Penanggung Jawab UKP', name: 'dr. Syahrial', image: fotoStruktur('syahrial'),
					children: [
						{ title: 'Koor. Rawat Jalan', name: 'Hegar Feby Apriana, S.Kep', image: fotoStruktur('hegar') },
						{ title: 'Koor. Rawat Inap', name: 'Uswatuh Hasanah, S.Kep', image: fotoStruktur('uswatun') },
						{ title: 'Koor. Poli Gigi & Mulut', name: 'drg. Nita Septiani', image: fotoStruktur('nita') },
						{ title: 'Koor. Rumah Bersalin & KIA', name: 'Ilmar Munawaroh, A.Md.Keb', image: fotoStruktur('ilmar') },
						{ title: 'Koor. Farmasi', name: 'apt. Rahman Surahman, S.Si', image: fotoStruktur('rahman') },
						{ title: 'Koor. Laboratorium', name: 'Susi Nurwinti, A.Md.AK', image: fotoStruktur('susi') },
						{ title: 'Koor. Rekam Medik', name: 'Fauziah Elsa Nafisah, A.Md.RMIK', image: fotoStruktur('fauziah') },
						{ title: 'Koor. Gizi', name: 'Tammy Ajeng Rahayu, AMG', image: fotoStruktur('tammy') }
					]
				}
			]
		};

		const OrgCard = ({ title, name, image }) => (
			<article className="doctor-card org-structure-card w-[250px] flex-shrink-0 mx-auto relative z-10 flex flex-col text-center shadow-lg bg-white border border-gray-100">
				<img src={image} alt={name} />
				<div className="doctor-card-body flex flex-col flex-grow">
					<h2 className="!text-[#fc8a15] !min-h-0 !mb-1">{title}</h2>
					<p className="!text-[#16594c] !font-bold !text-[13px] !mb-4">{name}</p>
				</div>
			</article>
		);

		return (
			<section className="reference-page doctors-page pb-20 w-full">
				<div className="container mx-auto doctors-heading px-4">
					<PageHeading eyebrow="Tentang Kami" title="STRUKTUR ORGANISASI" />
					<p>Struktur organisasi Klinik Sehat Bagendit. Data personel dapat diperbarui melalui pengelolaan konten.</p>
				</div>
				
				<div className="w-full overflow-x-auto mt-8 pb-10">
					<div className="flex flex-col items-center min-w-[960px] w-max mx-auto px-4 lg:px-8">
						<OrgCard title={orgData.pimpinan.title} name={orgData.pimpinan.name} image={orgData.pimpinan.image} />
						<div className="w-1 h-10 bg-[#fc8a15]"></div>
						
						<OrgCard title={orgData.pjKlinik.title} name={orgData.pjKlinik.name} image={orgData.pjKlinik.image} />
						<div className="w-1 h-12 bg-[#fc8a15]"></div>
						
						<div className="flex items-start justify-center w-full">
							{orgData.branches.map((branch, idx) => {
								const isFirst = idx === 0;
								const isLast = idx === orgData.branches.length - 1;

								return (
									<div key={idx} className="flex flex-col items-center relative flex-1 px-4 lg:px-6">
										<div className="absolute top-0 left-0 w-full h-1 flex">
											<div className={`w-1/2 h-full ${isFirst ? 'bg-transparent' : 'bg-[#fc8a15]'}`}></div>
											<div className={`w-1/2 h-full ${isLast ? 'bg-transparent' : 'bg-[#fc8a15]'}`}></div>
										</div>
										<div className="w-1 h-12 bg-[#fc8a15]"></div>
										<OrgCard title={branch.title} name={branch.name} image={branch.image} />
										<div className="w-1 h-10 bg-[#fc8a15]"></div>
										<div className="flex flex-col w-full items-center">
											{branch.children.map((child, cIdx) => (
												<div key={cIdx} className="w-full flex flex-col items-center">
													<OrgCard title={child.title} name={child.name} image={child.image} />
													{cIdx !== branch.children.length - 1 && <div className="w-1 h-10 bg-[#fc8a15]"></div>}
												</div>
											))}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		);
	}

	return <section className="reference-page about-awards container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="AKREDITASI" /><div className="certificate-frame"><object data="/sertifikat-akreditasi.jpg#view=FitH" type="image/jpeg" aria-label="Sertifikat akreditasi Klinik Sehat Bagendit"><p>Sertifikat tidak dapat ditampilkan. <a href="/sertifikat-akreditasi.jpg" target="_blank" rel="noreferrer">Buka sertifikat akreditasi</a>.</p></object></div></section>
}

// Halaman induk profil: pertahankan struktur setiap bagian yang sudah ada,
// tetapi sajikan sebagai satu alur halaman yang utuh.
export function AboutOverviewPage() {
	return (
		<div className="about-overview-page">
			<section id="sejarah"><AboutPage page="sejarah" /></section>
			<section id="visi-misi"><AboutPage page="visi-misi" /></section>
			<section id="struktur"><AboutPage page="struktur" /></section>
			<section id="penghargaan"><AboutPage page="penghargaan" /></section>
		</div>
	)
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
	const { data } = usePublicApi('/partners')

	const daftar = Array.isArray(data) && data.length > 0 ? data : partners.map((nama_mitra) => ({ nama_mitra }))
	return <section className="reference-page partners-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="REKANAN DAN MITRA" /><p className="reference-lead">Klinik Sehat Bagendit telah bekerja sama dengan:</p><div className="partner-grid">{daftar.map((partner, index) => <article className={`partner-card partner-${index % 6}`} key={partner.id || partner.nama_mitra}>{partner.logo_url ? <img src={urlMedia(partner.logo_url)} alt={`Logo ${partner.nama_mitra}`} className="partner-logo" /> : <span>{partner.nama_mitra.split(' ').map((word) => word[0]).join('').slice(0, 3)}</span>}<strong>{partner.nama_mitra}</strong></article>)}</div></section>
}

// Memetakan data dokter dari API ke bentuk yang dipakai komponen.
const mapDokter = (d) => ({
	id: d.id,
	name: d.nama_dokter,
	specialty: d.spesialisasi || 'Dokter',
	deskripsi: d.deskripsi || '',
	image: urlMedia(d.foto_url, '/hospital-hero.svg'),
	schedules: d.schedules || [],
})

export function DoctorsPage() {
	const [query, setQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 12
	const { data } = usePublicApi('/doctors')
	const { data: settings } = usePublicApi('/settings')

	// Gambar jadwal dokter (foto resmi dari CMS/Cloudinary).
	const jadwalDokter = ambilSetting(settings, 'jadwal_dokter_gambar', '')

	const sumber = Array.isArray(data) ? data.map(mapDokter) : []
	const filteredDoctors = sumber.filter((doctor) => `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(query.toLowerCase()))
	const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage)
	const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

	return <section className="reference-page doctors-page container pb-20"><div className="doctors-heading"><PageHeading eyebrow="Klinik Sehat Bagendit" title="DIREKTORI DOKTER" /><p>Dokter aktif Klinik Sehat Bagendit. Data dan jadwal diperbarui melalui CMS.</p></div><form className="doctor-search max-w-3xl mx-auto mb-12" onSubmit={(event) => event.preventDefault()}><input value={query} onChange={(event) => { setQuery(event.target.value); setCurrentPage(1) }} placeholder="Cari berdasarkan nama atau spesialisasi..." aria-label="Cari dokter" /><button type="submit">Cari</button></form><div className="doctor-grid">{paginatedDoctors.map((doctor) => <article className="doctor-card shadow-lg" key={doctor.id}><img src={doctor.image} alt={doctor.name} /><div className="doctor-card-body"><h2 className="!text-[#16594c] !font-bold !text-[16px] !mb-1">{doctor.name}</h2><p className="!text-[#fc8a15] !font-semibold">{doctor.specialty}</p><a href={`#dokter-profile-${doctor.id}`}>Lihat Profil</a></div></article>)}</div>{filteredDoctors.length === 0 && <p className="empty-search">Belum ada dokter aktif yang sesuai.</p>}{jadwalDokter && <div className="my-14"><PageHeading eyebrow="Jadwal Praktik" title="JADWAL DOKTER" /><div className="flex justify-center"><img src={jadwalDokter} alt="Jadwal Praktik Dokter Klinik Sehat Bagendit" className="max-w-full h-auto rounded-2xl shadow-lg border-gray-100" /></div></div>}{totalPages > 1 && <div className="flex justify-center items-center gap-4 mt-12"><button onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1} className="px-5 py-2 rounded-lg bg-white border border-[#fc8a15] text-[#fc8a15] font-bold disabled:opacity-40 hover:bg-[#fc8a15] hover:text-white transition-colors">&laquo; Sebelumnya</button><span className="font-bold text-[#16594c]">Halaman {currentPage} dari {totalPages}</span><button onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages} className="px-5 py-2 rounded-lg bg-white border border-[#fc8a15] text-[#fc8a15] font-bold disabled:opacity-40 hover:bg-[#fc8a15] hover:text-white transition-colors">Selanjutnya &raquo;</button></div>}</section>
}

export function DoctorProfilePage({ doctorId }) {
	const { data } = usePublicApi(`/doctors/${doctorId}`)
	const apiDoctor = Array.isArray(data) ? data[0] : data
	const doctor = apiDoctor ? mapDokter(apiDoctor) : null
	if (!doctor) return <section className="reference-page doctor-profile-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="PROFIL DOKTER" /><p className="empty-search">Data dokter tidak ditemukan atau sudah tidak aktif.</p><a href="#dokter">Kembali ke daftar dokter</a></section>

	const jadwal = doctor.schedules || []

	return <section className="bg-[#f4f7f9] min-h-screen py-10 w-full px-4 lg:px-8"><div className="container mx-auto max-w-5xl"><div className="mb-6 border-b border-gray-300 pb-2"><span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Klinik Sehat Bagendit</span><h2 className="text-2xl font-bold text-[#344353]">PROFIL DOKTER</h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-2xl shadow-xl overflow-hidden mb-8"><div className="bg-[#d8f2ef] p-8 flex flex-col items-center justify-center"><img src={doctor.image} alt={doctor.name} className="w-48 h-56 object-contain p-4 rounded-xl bg-white shadow-sm mb-6" /><a href="#dokter" className="bg-[#009378] hover:bg-teal-700 text-white text-xs font-bold py-3 px-6 rounded-full transition-colors shadow-md">Kembali ke Daftar Dokter</a></div><div className="md:col-span-2 p-8 lg:p-10"><h1 className="text-3xl font-bold text-[#344353] mb-4">{doctor.name}</h1><span className="inline-block bg-[#eaf4ef] text-[#009378] font-bold px-5 py-2 rounded-full text-sm mb-8 border border-[#c4e3d5]">{doctor.specialty}</span><div className="mb-8"><h3 className="text-lg font-bold text-[#344353] border-b-2 border-[#fc8a15] pb-2 mb-4 inline-block">Profil</h3><p className="text-gray-600 text-sm leading-relaxed">{doctor.deskripsi || 'Informasi profil dan kompetensi akan diperbarui oleh admin klinik.'}</p></div><div><h3 className="text-lg font-bold text-[#344353] border-b-2 border-[#fc8a15] pb-2 mb-4 inline-block">Jadwal Praktik</h3>{jadwal.filter((schedule) => schedule.status_aktif !== false).length > 0 ? <ul className="space-y-2">{jadwal.filter((schedule) => schedule.status_aktif !== false).map((schedule) => <li key={schedule.id} className="text-gray-600 text-sm"><strong>{schedule.hari}</strong>: {schedule.jam_mulai} - {schedule.jam_selesai}</li>)}</ul> : <p className="text-gray-600 text-sm">Jadwal praktik belum tersedia.</p>}</div></div></div></div></section>
}

// Memetakan data layanan dari API ke bentuk yang dipakai komponen.
const mapLayanan = (s, index) => ({
	id: s.id,
	name: s.nama,
	kategori: s.kategori,
	short: (s.nama || '').toUpperCase(),
	icon: ['✦', '⌁', '◒', '＋'][index % 4],
	detail: s.deskripsi || s.kategori || '',
	image: urlMedia(s.foto_url, '/hospital-hero.svg'),
})

export function ServicesPage() {
	const [query, setQuery] = useState('')
	const { data } = usePublicApi('/services')

	const sumber = Array.isArray(data) && data.length > 0 ? data.map(mapLayanan) : clinicServices
	const filteredServices = sumber.filter((service) => `${service.name} ${service.short}`.toLowerCase().includes(query.toLowerCase()))

	return <section className="reference-page services-directory container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="LAYANAN KESEHATAN" /><form className="service-search" onSubmit={(event) => event.preventDefault()}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari Layanan" aria-label="Cari layanan kesehatan" /><button type="submit">Cari</button></form><div className="clinic-grid">{filteredServices.map((service, index) => <article className={`clinic-card clinic-tone-${index % 6}`} key={service.id}><div className="clinic-card-art"><img src={service.image} alt="" /><span className="clinic-logo">✚</span><div className="clinic-icon">{service.icon}</div></div><div className="clinic-card-body"><p>{service.kategori || 'Klinik'}</p><h2>{service.short}</h2><span>{service.detail}</span><a href={`#layanan-${service.id}`}>Lihat Detail <b>↗</b></a></div></article>)}</div>{filteredServices.length === 0 && <p className="empty-search">Layanan kesehatan tidak ditemukan.</p>}</section>
}

export function ServiceDetailPage({ serviceId }) {
	const { data } = usePublicApi(`/services/${serviceId}`)
	const service = data && data.id ? data : null

	if (!service) return <section className="reference-page services-directory container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="LAYANAN" /><p className="empty-search">Layanan tidak ditemukan.</p><a href="#jenis-pelayanan">Kembali ke daftar layanan</a></section>

	const image = urlMedia(service.foto_url, '/hospital-hero.svg')
	return <section className="detail-page"><header className="detail-hero"><div><p>{service.kategori || 'Layanan Klinik'}</p><h1>{service.nama}</h1><span>Pelayanan kesehatan Klinik Sehat Bagendit</span></div><img src={image} alt={service.nama} /></header><div className="detail-content container"><article className="detail-main"><h2>Tentang {service.nama}</h2><p>{service.deskripsi || 'Informasi layanan akan diperbarui oleh admin klinik.'}</p><h3>Informasi Pelayanan</h3><div className="detail-feature-grid"><span>✓ Dilayani oleh tenaga kesehatan klinik</span><span>✓ Informasi pendaftaran tersedia di klinik</span><span>✓ Ketersediaan mengikuti layanan operasional</span><span>✓ Konsultasikan kebutuhan Anda terlebih dahulu</span></div></article><aside className="detail-info-card"><h2>Informasi Layanan</h2><p><strong>Jenis layanan</strong><br />{service.kategori || 'Pelayanan klinik'}</p><p><strong>Pendaftaran</strong><br />Hubungi klinik atau datang langsung</p><p><strong>Jam layanan</strong><br />Sesuai jam operasional klinik</p><a href="#kontak">Hubungi Kami</a></aside></div><section className="detail-cta"><h2>Butuh informasi sebelum berkunjung?</h2><p>Tim Klinik Sehat Bagendit siap membantu mengarahkan kebutuhan layanan Anda.</p><a href="#jenis-pelayanan">Kembali ke Layanan Kesehatan</a></section></section>
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
	['Operasi Katarak Phaco Emulsifikasi', 'admin', 'Dec 23, 2025', 'Pelayanan Medis', '/hospital-hero.svg', 'Informasi tentang layanan operasi katarak.'],
	['Layanan Bedah Paket KRIS', 'Admin RSIH', 'Dec 17, 2025', 'Promosi Kesehatan', '/hospital-hero.svg', 'Informasi layanan bedah dan paket kamar rawat inap.'],
	['Kenali Tonsil Hipertrofi: Ketika Amandel Membesar dan Mengganggu Pernapasan', 'marketing', 'Nov 11, 2025', 'Info Kesehatan', '/hospital-hero.svg', 'Tonsil hipertrofi adalah istilah medis dari amandel yang membesar dan dapat mengganggu napas, makan, atau tidur.'],
	['Efusi Pleura: Ketika Cairan Menumpuk di Sekitar Paru-paru', 'Admin RSIH', 'Oct 15, 2025', 'Info Kesehatan', '/hospital-hero.svg', 'Catatan ringkas tentang efusi pleura dan hal yang perlu diperhatikan.'],
]

export function DentalClinicPage() {
	return <section className="dental-page">
		<PageHeading eyebrow="Klinik Sehat Bagendit" title="POLIKLINIK" />
		<header className="dental-banner"><h1>Poliklinik Gigi</h1><p>Pelayanan Kesehatan Profesional dengan Tim Dokter Spesialis</p></header>
		<div className="dental-content container"><section className="dental-intro"><img src="/hospital-hero.svg" alt="Poliklinik Gigi RSIH" /><div><h2>Tentang Poliklinik Gigi</h2><p>Poli Gigi merupakan salah satu dari jenis layanan yang memberikan pelayanan kesehatan gigi dan mulut berupa pemeriksaan kesehatan gigi dan mulut, pengobatan dan pemberian tindakan medis dasar kesehatan gigi dan mulut seperti pencabutan gigi.</p><p>Poli gigi adalah layanan seputar kesehatan mulut dan gigi. Mulai dari pemeriksaan, pembersihan, pengobatan, hingga tindakan medis lebih lanjut.</p><h3>Kondisi yang Ditangani</h3><div className="condition-grid">{dentalConditions.map((condition) => <span key={condition}>● {condition}</span>)}</div></div></section><section className="dental-doctors"><h2>Dokter Poliklinik Gigi</h2><div className="dental-doctor-grid">{dentalDoctors.map((doctor) => <article key={doctor.id}><img src={doctor.image} alt={doctor.name} /><h3>{doctor.name}</h3><span>{doctor.specialty}</span><a href={`#dokter-profile-${doctor.id}`}>⌕ Profil</a></article>)}</div></section><section className="dental-schedule"><h2>Jadwal Praktik Dokter</h2><div className="dental-table-wrap"><table><thead><tr><th>NO</th><th>NAMA DOKTER</th><th>SENIN</th><th>SELASA</th><th>RABU</th><th>KAMIS</th><th>JUMAT</th><th>SABTU</th><th>MINGGU</th></tr></thead><tbody>{dentalDoctors.map((doctor, index) => <tr key={doctor.id}><td>{index + 1}</td><td>{doctor.name}</td><td>{index % 2 === 0 ? '08.00 - 12.00' : '-'}</td><td>{index % 3 === 0 ? '08.00 - 12.00' : '-'}</td><td>{index % 2 === 1 ? '13.00 - 16.00' : '-'}</td><td>{index % 3 === 1 ? '16.00 - 20.00' : '-'}</td><td>{index % 2 === 0 ? '13.00 - 16.00' : '-'}</td><td>{index === 2 ? '09.00 - 16.00' : '-'}</td><td>-</td></tr>)}</tbody></table></div></section><section className="dental-cta"><div><span>Butuh Konsultasi?</span><h2>Jadwalkan kunjungan Anda ke Poliklinik Gigi sekarang juga</h2></div><div><a href="https://wa.me/6282120232032">☎ Hubungi Kami</a><a href="#kontak">⌖ Lihat Lokasi</a></div></section></div>
	</section>
}

// Poli Gigi memakai data dokter dan jadwal yang sama dengan direktori publik.
export function DentalClinicDataPage() {
	const { data } = usePublicApi('/doctors')
	const { data: settings } = usePublicApi('/settings')
	const dentalDoctors = Array.isArray(data)
		? data.filter((doctor) => /gigi/i.test(doctor.spesialisasi || '')).map(mapDokter)
		: []
	const dentalBanner = ambilSetting(settings, 'poli_gigi_banner', '/hospital-hero.svg')
	// Gambar jadwal poli gigi (foto resmi dari CMS/Cloudinary).
	const jadwalGigi = ambilSetting(settings, 'jadwal_gigi_gambar', '')
	const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
	const jamPadaHari = (doctor, day) => doctor.schedules
		.filter((schedule) => schedule.status_aktif !== false && schedule.hari === day)
		.map((schedule) => `${schedule.jam_mulai.slice(0, 5)} - ${schedule.jam_selesai.slice(0, 5)}`)
		.join(', ') || '-'

	return <section className="dental-page"><PageHeading eyebrow="Klinik Sehat Bagendit" title="POLIKLINIK GIGI" /><header className="dental-banner"><h1>Poliklinik Gigi</h1><p>Pemeriksaan dan tindakan kesehatan gigi serta mulut.</p></header><div className="dental-content container"><section className="dental-intro"><img src={urlMedia(dentalBanner, '/hospital-hero.svg')} alt="Poliklinik Gigi Klinik Sehat Bagendit" /><div><h2>Tentang Poliklinik Gigi</h2><p>Poliklinik Gigi melayani pemeriksaan kesehatan gigi dan mulut, pengobatan, serta tindakan medis dasar sesuai kebutuhan pasien.</p><h3>Cara Pendaftaran</h3><div className="condition-grid"><span>● Pendaftaran H-1 melalui JKN Mobile untuk pasien BPJS antrean 1–4.</span><span>● Pendaftaran langsung di klinik untuk pasien umum dan BPJS non-JKN.</span><span>● Kuota: 8 pasien BPJS dan 7 pasien umum.</span></div></div></section><section className="dental-doctors"><h2>Dokter Poliklinik Gigi</h2><div className="dental-doctor-grid">{dentalDoctors.map((doctor) => <article key={doctor.id}><img src={doctor.image} alt={doctor.name} /><h3>{doctor.name}</h3><span>{doctor.specialty}</span><a href={`#dokter-profile-${doctor.id}`}>⌕ Profil</a></article>)}</div>{Array.isArray(data) && dentalDoctors.length === 0 && <p className="empty-search">Jadwal dokter gigi belum tersedia.</p>}</section><section className="dental-schedule"><h2>Jadwal Praktik Dokter</h2>{jadwalGigi && <div className="flex justify-center mb-8"><img src={jadwalGigi} alt="Jadwal Praktik Poli Gigi Klinik Sehat Bagendit" className="max-w-full h-auto rounded-2xl shadow-lg border-gray-100" /></div>}<div className="dental-table-wrap"><table><thead><tr><th>NO</th><th>NAMA DOKTER</th>{days.map((day) => <th key={day}>{day.toUpperCase()}</th>)}</tr></thead><tbody>{dentalDoctors.map((doctor, index) => <tr key={doctor.id}><td>{index + 1}</td><td>{doctor.name}</td>{days.map((day) => <td key={day}>{jamPadaHari(doctor, day)}</td>)}</tr>)}</tbody></table></div></section><section className="dental-cta"><div><span>Butuh Konsultasi?</span><h2>Jadwalkan kunjungan Anda ke Poliklinik Gigi.</h2></div><div><a href="https://wa.me/6282120232032">☎ Hubungi Kami</a><a href="#kontak">⌖ Lihat Lokasi</a></div></section></div></section>
}

export function FacilitiesPage() {
	const { data } = usePublicApi('/facilities')

	const daftar = Array.isArray(data)
	? data.map((f) => [f.nama, f.deskripsi || 'Informasi fasilitas akan diperbarui oleh admin klinik.', 'Tersedia di area klinik', 'Tanyakan ketersediaan', urlMedia(f.foto_url, '/hospital-hero.svg')])
	: []
	const cards = Array.isArray(data) ? data.map((facility) => ({
		id: facility.id,
		name: facility.nama,
		text: facility.deskripsi || 'Informasi fasilitas akan diperbarui oleh admin klinik.',
		image: urlMedia(facility.foto_url, '/hospital-hero.svg'),
	})) : []
	return <section className="reference-page facilities-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="FASILITAS KLINIK" /><p className="facilities-lead">FASILITAS PENUNJANG UNTUK KENYAMANAN PASIEN DAN PENGUNJUNG. HUBUNGI KLINIK UNTUK MEMASTIKAN KETERSEDIAANNYA.</p><div className="facility-grid">{cards.map((facility) => <article className="facility-card" key={facility.id}><img src={facility.image} alt={facility.name} /><div><h2>{facility.name}</h2><p>{facility.text}</p><small>• Tersedia di area klinik</small><a href={`#fasilitas-${facility.id}`}>Lihat Detail <b>→</b></a></div></article>)}</div>{Array.isArray(data) && cards.length === 0 && <p className="empty-search">Belum ada fasilitas yang dipublikasikan.</p>}</section>
	return <section className="reference-page facilities-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="FASILITAS KLINIK" /><p className="facilities-lead">FASILITAS PENUNJANG UNTUK KENYAMANAN PASIEN DAN PENGUNJUNG. HUBUNGI KLINIK UNTUK MEMASTIKAN KETERSEDIAANNYA.</p><div className="facility-grid">{daftar.map(([name, text, availability, action, image]) => <article className="facility-card" key={name}><img src={image} alt={name} /><div><h2>{name}</h2><p>{text}</p><small>◷ {availability}</small><a href="#kontak">{action} <b>→</b></a></div></article>)}</div>{Array.isArray(data) && daftar.length === 0 && <p className="empty-search">Belum ada fasilitas yang dipublikasikan.</p>}</section>
}

export function FacilityDetailPage({ facilityId }) {
	const { data } = usePublicApi(`/facilities/${facilityId}`)
	const facility = data && data.id ? data : null
	if (!facility) return <section className="reference-page facilities-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="FASILITAS KLINIK" /><p className="empty-search">Fasilitas tidak ditemukan.</p><a href="#fasilitas-umum">Kembali ke daftar fasilitas</a></section>
	const image = urlMedia(facility.foto_url, '/hospital-hero.svg')
	return <section className="detail-page facility-detail"><header className="detail-hero"><div><p>Fasilitas Klinik</p><h1>{facility.nama}</h1><span>Fasilitas penunjang untuk pasien dan pengunjung</span></div><img src={image} alt={facility.nama} /></header><div className="detail-content container"><article className="detail-main"><h2>Fasilitas {facility.nama}</h2><p>{facility.deskripsi || 'Informasi fasilitas akan diperbarui oleh admin klinik.'}</p><h3>Yang Perlu Diketahui</h3><div className="detail-feature-grid"><span>✓ Ditujukan untuk kenyamanan pasien dan pengunjung</span><span>✓ Ketersediaan dapat dikonfirmasi kepada petugas</span><span>✓ Ikuti arahan dan tata tertib klinik</span></div></article><aside className="detail-info-card"><h2>Informasi Fasilitas</h2><p><strong>Ketersediaan</strong><br />Di area Klinik Sehat Bagendit</p><p><strong>Jam akses</strong><br />Sesuai jam operasional klinik</p><p><strong>Informasi</strong><br />Tanyakan kepada petugas</p><a href="#kontak">Lihat Lokasi & Kontak</a></aside></div><section className="detail-cta"><h2>Perlu bantuan saat berkunjung?</h2><p>Silakan hubungi klinik untuk menanyakan ketersediaan fasilitas.</p><a href="#fasilitas-umum">Kembali ke Fasilitas Klinik</a></section></section>
}

export function CareersPage() {
	const { data } = usePublicApi('/jobs?status=buka')

	const daftar = Array.isArray(data) && data.length > 0
	? data.map((j) => [j.posisi, j.persyaratan || 'Umum', 'Full time', j.deskripsi_pekerjaan || ''])
	: jobOpenings
	return <section className="reference-page careers-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="KARIR & LOWONGAN KERJA" /><div className="career-intro"><span>▱</span><h2>Bergabung bersama Kami</h2><p>Bangun karier dan berikan kontribusi terbaik untuk pelayanan kesehatan masyarakat Garut.</p></div><div className="job-grid">{daftar.map(([title, category, type, text]) => <article className="job-card" key={title}><div><span>{category}</span><h2>{title}</h2><p>{text}</p></div><div className="job-meta"><small>◷ {type}</small><a href="mailto:admin@kliniksehatbagendit.com?subject=Lamaran%20Kerja">Lihat Detail ↗</a></div></article>)}</div><div className="career-note"><strong>Belum menemukan posisi yang sesuai?</strong><span>Kirim CV Anda dan kami akan menghubungi saat ada kesempatan yang relevan.</span><a href="mailto:admin@kliniksehatbagendit.com?subject=CV%20Kandidat">Kirim CV ↗</a></div></section>
}

function ContactPageContent() {
	const { data } = usePublicApi('/settings')
	const alamat = ambilSetting(data, 'alamat', 'Jl. Terusan Cinunuk No. 9, Kp. Babakan Baru RT 002/RW 009, Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut')
	const maps = ambilSetting(data, 'maps_url', 'https://maps.app.goo.gl/uZQDUBojFcpLwCu79')
	const mapEmbed = ambilSetting(data, 'maps_embed', 'https://www.google.com/maps?q=klinik sehat bagendit&output=embed')
	const jamRawatJalan = ambilSetting(data, 'jam_rawat_jalan', 'Setiap hari, 07.00–14.00 & 15.00–20.00 WIB')
	const jamRawatInap = ambilSetting(data, 'jam_rawat_inap', 'Buka 24 Jam Setiap Hari')
	const socials = [
		{ name: 'Facebook', detail: 'Klinik Sehat Bagendit', href: 'https://www.facebook.com/share/1HEDS5Eawa/', className: 'facebook', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" /></svg> },
		{ name: 'Instagram', detail: '@kliniksehatbagendit', href: 'https://www.instagram.com/kliniksehatbagendit?stkn=Ym9udWd2bmlodXM5', className: 'instagram', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="icon-fill" cx="17.7" cy="6.7" r="1" /></svg> },
		{ name: 'TikTok', detail: '@kliniksehatbagendit', href: 'https://www.tiktok.com/@kliniksehatbagendit?_r=1&_t=ZS-99rw05XJTqm', className: 'tiktok', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 3h3.1c.2 2 1.3 3.5 3.7 3.9v3.2a9.1 9.1 0 0 1-3.7-1.2v6.2a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.2.1v3.4a2.8 2.8 0 1 0 1.8 2.6V3Z" /></svg> },
		{ name: 'YouTube', detail: 'Klinik Sehat Bagendit', href: 'https://youtube.com/@kliniksehatbagendit3414?si=2IdlGqIEqoSf5IKX', className: 'youtube', icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12c0 1.7.2 3.3.5 4.9a3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2c.3-1.6.5-3.2.5-4.9s-.2-3.3-.5-4.9ZM9.7 15.5v-7l6 3.5-6 3.5Z" /></svg> },
	]
	const kontakKlinik = [
		{ nama: 'PIC', nomor: `+${ambilSetting(data, 'kontak_pic', '6282116074106')}`, tel: ambilSetting(data, 'kontak_pic', '6282116074106') },
		{ nama: 'Salima', nomor: `+${ambilSetting(data, 'kontak_salima', '6282120232032')}`, tel: ambilSetting(data, 'kontak_salima', '6282120232032') },
	]
	return <section className="contact-reference"><header className="contact-banner"><h1>Hubungi Kami</h1><p>Klinik Sehat Bagendit siap melayani kebutuhan kesehatan dasar Anda.</p></header><div className="contact-reference-content container"><div className="contact-column"><article className="contact-panel"><h2><span className="contact-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 10.71a16 16 0 0 0 4.29 4.29l1.25-1.25a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" /></svg></span> Alamat &amp; Telepon</h2><div><strong>Lokasi Klinik</strong><p>{alamat}</p><a href={maps} target="_blank" rel="noreferrer">Buka di Google Maps ↗</a></div><div className="clinic-whatsapp"><strong>Kontak Klinik</strong>{kontakKlinik.map((kontak) => <div className="clinic-contact" key={kontak.tel}><div className="clinic-contact-heading"><span>{kontak.nama}</span><b>{kontak.nomor}</b></div><a className="clinic-wa-button" href={`https://wa.me/${kontak.tel}`} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 2 17.7L.5 23.5l6-1.6A11.8 11.8 0 0 0 23.5 11.5a11.7 11.7 0 0 0-3-8ZM12 21a9.5 9.5 0 0 1-4.8-1.3l-.4-.2-3.5.9.9-3.4-.2-.4A9.5 9.5 0 1 1 12 21Zm5.2-7.1c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1a7.7 7.7 0 0 1-2.3-1.4 8.4 8.4 0 0 1-1.6-2c-.2-.3 0-.4.1-.5l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.8-1.3.2-.7.2-1.2.1-1.3-.1-.2-.3-.3-.6-.4Z" /></svg>Chat WhatsApp</a></div>)}</div></article><article className="social-panel"><h2><span className="contact-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.7 10.7 6.6-4.4m-6.6 7 6.6 4.4" /></svg></span>Media Sosial</h2><p>Ikuti informasi terbaru Klinik Sehat Bagendit melalui kanal resmi kami.</p><div className="social-links">{socials.map((social) => <a key={social.name} className={social.className} href={social.href} target="_blank" rel="noreferrer"><b>{social.icon}</b><span>{social.name}<small>{social.detail}</small></span></a>)}</div></article></div><article className="map-panel"><h2><span className="contact-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span> Lokasi Kami di Peta</h2><iframe className="mini-map" title="Peta Klinik Sehat Bagendit" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a className="map-direct-link" href={maps} target="_blank" rel="noreferrer">Buka lokasi Klinik Sehat Bagendit di Google Maps ↗</a></article><section className="hours-section hours-panel"><h2><span className="contact-heading-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg></span>Jam Operasional</h2><div><article><strong>Rawat Jalan</strong><span>Setiap hari, 07.00–14.00 &amp; 15.00–20.00 WIB</span></article><article className="emergency-hours"><strong>Rawat Inap</strong><span>Buka 24 Jam Setiap Hari</span></article></div></section></div></section>
}

function ContactForm() {
	const [form, setForm] = useState({ nama: '', email: '', telepon: '', isi: '' })
	const [status, setStatus] = useState({ loading: false, message: '', error: false })

	const submit = async (event) => {
		event.preventDefault()
		setStatus({ loading: true, message: '', error: false })
		const result = await postPublic('/messages', form)
		if (result.ok) {
			setForm({ nama: '', email: '', telepon: '', isi: '' })
			setStatus({ loading: false, message: 'Pesan berhasil dikirim. Tim kami akan segera menghubungi Anda.', error: false })
		} else {
			setStatus({ loading: false, message: result.message || 'Pesan belum dapat dikirim. Silakan coba lagi.', error: true })
		}
	}

	return <section className="contact-form-section container" aria-labelledby="contact-form-title"><div className="contact-form-card"><p className="section-kicker">Kirim Pesan</p><h2 id="contact-form-title">Ada yang ingin ditanyakan?</h2><p>Isi formulir berikut. Pesan Anda akan diteruskan langsung ke panel admin Klinik Sehat Bagendit.</p><form onSubmit={submit} className="contact-message-form"><label>Nama<input required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} /></label><label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Nomor WhatsApp<input type="tel" value={form.telepon} onChange={(e) => setForm({ ...form, telepon: e.target.value })} /></label><label>Pesan<textarea required rows="5" value={form.isi} onChange={(e) => setForm({ ...form, isi: e.target.value })} /></label><button type="submit" disabled={status.loading}>{status.loading ? 'Mengirim…' : 'Kirim Pesan'}</button>{status.message && <p className={status.error ? 'form-message error' : 'form-message success'} role="status">{status.message}</p>}</form></div></section>
}

export function ContactPage() {
	return <ContactPageContent />
}

export function FeedbackPage() {
	return <section className="feedback-page"><header className="feedback-banner"><p className="section-kicker">Klinik Sehat Bagendit</p><h1>Ada Masukan?</h1><p>Sampaikan pertanyaan, saran, atau pengalaman Anda. Pesan akan diteruskan ke admin klinik.</p></header><ContactForm /></section>
}

export function BlogPage() {
	const { data } = usePublicApi('/articles?status=published')

	const daftar = Array.isArray(data) && data.length > 0
	? data.map((a) => [a.judul, a.penulis?.nama_lengkap || 'Admin', formatTanggal(a.created_at), a.status === 'published' ? 'Info Kesehatan' : 'Draft', urlMedia(a.thumbnail_url, '/hospital-hero.svg'), (a.konten || '').replace(/<[^>]*>/g, '').slice(0, 140), a.slug])
	: blogPosts.map((p, i) => [...p, i === 2 ? 'tonsil' : null])
	return <section className="reference-page blog-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="BLOG & ARTIKEL KESEHATAN" /><div className="blog-layout"><div className="blog-list">{daftar.map(([title, author, date, category, image, excerpt, slug]) => <article className="blog-card" key={title}><img src={image} alt={title} /><div><h2>{title}</h2><small>♙ {author} &nbsp; ◷ {date} &nbsp; ▫ {category}</small><p>{excerpt}</p><a href={slug ? `#blog-${slug}` : '#kontak'}>Selengkapnya <b>↗</b></a></div></article>)}</div><aside className="blog-sidebar"><input placeholder="Search..." aria-label="Cari artikel" /><h3>Kategori</h3><a href="#blog">Info Kesehatan</a></aside></div></section>
}

export function BlogDetailPage({ slug }) {
	const { data } = usePublicApi(slug ? `/articles/${slug}` : '/articles/none', null)
	const artikel = data && data.judul ? data : null
	// Bila artikel tersedia dari API, tampilkan versi dinamis.
	if (artikel) {
	return <section className="reference-page blog-detail-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="BLOG DETAIL" /><article className="blog-detail-card"><img className="blog-detail-cover" src={urlMedia(artikel.thumbnail_url, '/hospital-hero.svg')} alt={artikel.judul} /><h1>{artikel.judul}</h1><small>♙ {artikel.penulis?.nama_lengkap || 'Admin'} &nbsp; ◷ {formatTanggal(artikel.created_at)} &nbsp; ▫ Info Kesehatan</small><div className="article-body" dangerouslySetInnerHTML={{ __html: artikel.konten || '' }} /></article></section>
	}

	return <section className="reference-page blog-detail-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="BLOG DETAIL" /><article className="blog-detail-card"><img className="blog-detail-cover" src={blogPosts[2][4]} alt={blogPosts[2][0]} /><h1>{blogPosts[2][0]}</h1><small>♙ marketing &nbsp; ◷ Nov 11, 2025 &nbsp; ▫ Info Kesehatan</small><div className="article-body"><h2>Tonsil Hipertrofi</h2><h3>Pendahuluan</h3><p>Tonsil hipertrofi sebenarnya cuma istilah medis dari amandel yang membesar. Kondisi ini bisa bikin beberapa aktivitas yang biasanya ringan seperti napas, makan, atau tidur menjadi terganggu. Pada banyak anak, amandel memang cenderung aktif dan ukurannya dapat berubah-ubah.</p><h3>Epidemiologi</h3><p>Kondisi ini paling sering terlihat pada anak-anak usia sekolah atau bahkan sebelumnya. Banyak yang akhirnya mengecil sendiri saat remaja, sehingga angkanya menurun seiring bertambahnya usia.</p><h3>Anatomi &amp; Patofisiologi</h3><p>Tonsil adalah bagian dari sistem pertahanan tubuh di belakang mulut. Jika terlalu besar, saluran napas dapat menyempit dan menyebabkan tidur tidak nyenyak, napas berbunyi, atau kebiasaan bernapas lewat mulut.</p><h3>Penyebab &amp; Faktor Risiko</h3><p>Infeksi berulang, alergi, lingkungan yang memicu peradangan, dan faktor bawaan keluarga dapat membuat amandel lebih mudah membesar.</p><h3>Gejala Klinis</h3><p>Keluhan yang sering muncul adalah mendengkur, tidur gelisah, napas melalui mulut, sakit tenggorokan berulang, serta kesulitan makan.</p><h3>Pemeriksaan</h3><p>Dokter biasanya memulai dengan menanyakan riwayat keluhan lalu memeriksa ukuran tonsil. Bila diperlukan, pemeriksaan tambahan seperti endoskopi atau pemeriksaan tidur dapat dilakukan.</p><h3>Diagnosis Banding</h3><p>Kondisi lain seperti abses di sekitar tonsil, radang tonsil kronis, atau pertumbuhan jaringan yang tidak normal perlu dibedakan melalui pemeriksaan menyeluruh.</p><h3>Penatalaksanaan</h3><p>Kasus ringan dapat dipantau dan ditangani dengan obat sesuai penyebab. Jika keluhan mengganggu aktivitas atau infeksi sering terjadi, operasi pengangkatan amandel dapat menjadi pilihan.</p><h3>Indikasi Tonsilektomi</h3><p>Operasi dipertimbangkan bila infeksi terlalu sering atau pembesaran tonsil mengganggu napas saat tidur, makan, atau menyebabkan komplikasi berulang.</p><h3>Komplikasi Operasi</h3><p>Seperti tindakan bedah lainnya, operasi amandel memiliki risiko seperti perdarahan, nyeri menelan, infeksi, atau perubahan suara sementara.</p><h3>Hasil &amp; Prognosis</h3><p>Banyak anak mengalami perbaikan kualitas tidur, energi, dan aktivitas setelah penanganan yang sesuai. Tetap diperlukan pemantauan jangka panjang.</p><p className="article-author">Penulis: <strong>Tim Medis KSB</strong></p></div><section className="related-article"><h2>Artikel Terkait</h2><img src={blogPosts[3][4]} alt={blogPosts[3][0]} /><h3>{blogPosts[3][0]}</h3><a href="#blog">Baca Selengkapnya</a></section></article></section>
}

export function SiteFooter() {
	return (
		<footer className="site-footer shared-footer container">
			<div className="footer-brand">
				<img src="/logo-ksb.png" alt="Logo Klinik Sehat Bagendit" />
				<p>Klinik Sehat Bagendit</p>
				<small>Jl. Terusan Cinunuk No. 9, Kp. Babakan Baru<br />Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut</small>
			</div>
			<div className="footer-social-column">
				<h3>Ikuti Kami</h3>
				<div className="footer-social">
					<a href="https://www.facebook.com/share/1HEDS5Eawa/" target="_blank" rel="noreferrer" aria-label="Facebook Klinik Sehat Bagendit"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.4 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.2v3.2H10V21h3.4Z" /></svg></a>
					<a href="https://www.instagram.com/kliniksehatbagendit?stkn=Ym9udWd2bmlodXM5" target="_blank" rel="noreferrer" aria-label="Instagram Klinik Sehat Bagendit"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.7" cy="6.7" r="1" /></svg></a>
					<a href="https://www.tiktok.com/@kliniksehatbagendit?_r=1&amp;_t=ZS-99rw05XJTqm" target="_blank" rel="noreferrer" aria-label="TikTok Klinik Sehat Bagendit"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 3h3.1c.2 2 1.3 3.5 3.7 3.9v3.2a9.1 9.1 0 0 1-3.7-1.2v6.2a6.1 6.1 0 1 1-6.1-6.1c.4 0 .8 0 1.2.1v3.4a2.8 2.8 0 1 0 1.8 2.6V3Z" /></svg></a>
					<a href="https://youtube.com/@kliniksehatbagendit3414?si=2IdlGqIEqoSf5IKX" target="_blank" rel="noreferrer" aria-label="YouTube Klinik Sehat Bagendit"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 7.1a3 3 0 0 0-2.1-2.2C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12c0 1.7.2 3.3.5 4.9a3 3 0 0 0 2.1 2.2c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.2c.3-1.6.5-3.2.5-4.9s-.2-3.3-.5-4.9ZM9.7 15.5v-7l6 3.5-6 3.5Z" /></svg></a>
				</div>
				<a className="footer-feedback-button" href="#feedback">Ada Masukan?</a>
			</div>
			<small className="footer-copy">© 2026 Klinik Sehat Bagendit. All rights reserved.</small>
		</footer>
	)
}

export function ReferenceHome({ activeRoom, setActiveRoom, roomStart, setRoomStart, activeTestimonial, setActiveTestimonial }) {
	const getFacilityPageSize = () => typeof window === 'undefined' ? 4 : window.innerWidth <= 470 ? 1 : window.innerWidth <= 800 ? 2 : 4
	const [facilityPageSize, setFacilityPageSize] = useState(getFacilityPageSize)
	const { data: settings } = usePublicApi('/settings')
	const { data: homeFacilities } = usePublicApi('/facilities')
	const { data: homeServices } = usePublicApi('/services')
	const heroBanner = ambilSetting(settings, 'hero_banner', '')
	const heroTitle = ambilSetting(settings, 'hero_title', 'Klinik Sehat Bagendit')
	const heroSubtitle = ambilSetting(settings, 'hero_subtitle', 'Pusat layanan kesehatan primer yang berkualitas, nyaman, dan bersahabat di wilayah Kecamatan Banyuresmi dan sekitarnya.')
	const heroSambutan = ambilSetting(settings, 'sambutan_teks', 'Selamat Datang di')
	const heroStyle = heroBanner ? { backgroundImage: `url(${heroBanner})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined
	const fasilitasKlinik = Array.isArray(homeFacilities) && homeFacilities.length > 0
		? homeFacilities.slice(0, 9).map((facility) => ({ id: facility.id, name: facility.nama, detail: facility.deskripsi || 'Informasi fasilitas dapat ditanyakan langsung kepada klinik.', image: urlMedia(facility.foto_url, '/hospital-hero.svg') }))
		: facilities.map(([name, detail, , , image], index) => ({ id: index + 1, name, detail, image }))
	const facilitySlideCount = Math.max(1, Math.ceil(fasilitasKlinik.length / facilityPageSize))
	const facilityPage = Math.min(roomStart, facilitySlideCount - 1)
	const visibleFacilities = fasilitasKlinik.slice(facilityPage * facilityPageSize, (facilityPage + 1) * facilityPageSize)
	const layananUnggulan = Array.isArray(homeServices) && homeServices.length > 0 ? homeServices.map(mapLayanan).slice(0, 9) : clinicServices.slice(0, 9)

	useEffect(() => {
		const updatePageSize = () => setFacilityPageSize(getFacilityPageSize())
		window.addEventListener('resize', updatePageSize)
		return () => window.removeEventListener('resize', updatePageSize)
	}, [])

	useEffect(() => {
		if (document.getElementById('elfsight-platform-script')) return
		const script = document.createElement('script')
		script.id = 'elfsight-platform-script'
		script.src = 'https://elfsightcdn.com/platform.js'
		script.async = true
		document.body.appendChild(script)
	}, [])

	return <div className="reference-home">
		<section className="home-hero-reference"><div className="home-hero-image" style={heroStyle} /><div className="home-hero-overlay"><div className="home-hero-inner container"><p>{heroSambutan}</p><h1>{heroTitle}</h1><span>{heroSubtitle}</span><a href="#jenis-pelayanan">Lihat Layanan <b>↗</b></a></div><div className="hero-dots"><i className="active" /></div></div></section>
		<section className="emergency-feature container"><div className="emergency-photo"><img src="/hospital-hero.svg" alt="Klinik Sehat Bagendit" /><span>RAWAT INAP</span></div><div className="emergency-copy"><p className="section-kicker">Pelayanan Klinik</p><h2>Pelayanan Rawat Inap 24 Jam</h2><p>Klinik menyediakan rawat inap dengan kapasitas total 12 bed, termasuk pelayanan observasi dan pertolongan pertama pada kondisi kegawatdaruratan.</p><a className="emergency-button" href="#kontak">Lihat lokasi klinik ↗</a><div className="emergency-tags"><span>◷ Rawat inap 24 jam</span><span>♧ Layanan medis dasar</span></div><small>Rawat jalan setiap hari<br />07.00–14.00 &amp; 15.00–20.00 WIB</small></div></section>
		<section className="reference-rooms"><div className="container"><div className="reference-section-label">FASILITAS KLINIK</div><p className="reference-subtitle">Fasilitas penunjang untuk kenyamanan pasien dan pengunjung klinik.</p><div className="reference-room-track"><button className="round-arrow" onClick={() => setRoomStart(Math.max(0, facilityPage - 1))} disabled={facilityPage === 0} aria-label="Fasilitas sebelumnya">‹</button>{visibleFacilities.map((facility, index) => { const facilityIndex = facilityPage * facilityPageSize + index; return <article className={`reference-room-card ${activeRoom === facilityIndex ? 'active' : ''}`} key={facility.id || facility.name} onClick={() => setActiveRoom(facilityIndex)}><img src={facility.image} alt={facility.name} /><div><small>Fasilitas Klinik</small><h3>{facility.name}</h3><p>{facility.detail}</p><a href={facility.id ? `#fasilitas-${facility.id}` : '#fasilitas-umum'}>Lihat Fasilitas ↗</a></div></article> })}<button className="round-arrow" onClick={() => setRoomStart(Math.min(facilitySlideCount - 1, facilityPage + 1))} disabled={facilityPage >= facilitySlideCount - 1} aria-label="Fasilitas berikutnya">›</button></div><div className="reference-room-dots">{Array.from({ length: facilitySlideCount }, (_, index) => <button className={facilityPage === index ? 'active' : ''} key={index} onClick={() => setRoomStart(index)} aria-label={`Lihat fasilitas ${index + 1}`} />)}</div><a className="home-view-all" href="#fasilitas-umum">Lihat semua fasilitas →</a></div></section>
		<section className="reference-services container"><div className="reference-section-label">LAYANAN KESEHATAN</div><p className="reference-subtitle">Berbagai layanan kesehatan profesional yang tersedia di Klinik Sehat Bagendit</p><div className="poster-grid">{layananUnggulan.map((service) => <a href={service.id ? `#layanan-${service.id}` : '#jenis-pelayanan'} className="poster-card" key={service.id || service.name}><img src={service.image || '/hospital-hero.svg'} alt={service.name} /><span>{service.name}</span></a>)}</div><a className="home-view-all" href="#jenis-pelayanan">Lihat seluruh layanan kesehatan →</a></section>
		<section className="reference-testimonials"><div className="container"><div className="elfsight-app-7a47517c-645a-4eb6-94ba-7ee1315f29e9" data-elfsight-app-lazy="true" /></div></section>
	</div>
}
// ==========================================
// 1. DATA & GENERATOR KARYAWAN DUMI (DIREKTORI 49 STAF)
// ==========================================
const karyawanTabel = [
	{ klasifikasi: 'Nakes', uraian: 'Dokter Umum', jumlah: 5 },
	{ klasifikasi: 'Nakes', uraian: 'Dokter Gigi', jumlah: 2 },
	{ klasifikasi: 'Nakes', uraian: 'Keperawatan', jumlah: 12 },
	{ klasifikasi: 'Nakes', uraian: 'Kebidanan', jumlah: 4 },
	{ klasifikasi: 'Nakes', uraian: 'Apoteker', jumlah: 1 },
	{ klasifikasi: 'Nakes', uraian: 'Petugas obat', jumlah: 4 },
	{ klasifikasi: 'Nakes', uraian: 'Gizi', jumlah: 1 },
	{ klasifikasi: 'Nakes', uraian: 'Analis', jumlah: 1 },
	{ klasifikasi: 'Nakes', uraian: 'Asisten Analis', jumlah: 2 },
	{ klasifikasi: 'Administrasi', uraian: 'Keuangan', jumlah: 4 },
	{ klasifikasi: 'Administrasi', uraian: 'Administrasi', jumlah: 7 },
	{ klasifikasi: 'Umum', uraian: 'Supir ambulance', jumlah: 1 },
	{ klasifikasi: 'Umum', uraian: 'Juru masak', jumlah: 1 },
	{ klasifikasi: 'Umum', uraian: 'Petugas keamanan', jumlah: 1 },
	{ klasifikasi: 'Umum', uraian: 'OB', jumlah: 1 },
	{ klasifikasi: 'Umum', uraian: 'Petugas Kebersihan', jumlah: 2 },
];

const namaDepan = ['Budi', 'Siti', 'Asep', 'Nita', 'Rahman', 'Fauziah', 'Tammy', 'Uswatuh', 'Hegar', 'Handri', 'Ade', 'Jumyati', 'Rina', 'Agus', 'Yanti', 'Deni', 'Eka'];
const namaBelakang = ['Santoso', 'Rahayu', 'Ichsannurdin', 'Septiani', 'Surahman', 'Nafisah', 'Apriana', 'Priyatna', 'Kusuma', 'Wijaya', 'Lestari', 'Setiawan'];

export const daftarKaryawan = [];
let idCounter = 1;

karyawanTabel.forEach(item => {
	for (let i = 0; i < item.jumlah; i++) {
        let nama = `${namaDepan[Math.floor(Math.random() * namaDepan.length)]} ${namaBelakang[Math.floor(Math.random() * namaBelakang.length)]}`;
        
        if (item.uraian.includes('Dokter')) nama = `dr. ${nama}`;
        else if (item.uraian.includes('Gigi')) nama = `drg. ${nama}`;
        else if (item.uraian === 'Keperawatan') nama = `${nama}, S.Kep`;
        else if (item.uraian === 'Kebidanan') nama = `${nama}, A.Md.Keb`;
        else if (item.uraian === 'Apoteker') nama = `apt. ${nama}, S.Farm`;

        const jadwal = {
            senin: i % 2 === 0 ? '08.00 - 14.00' : 'Libur',
            selasa: i % 3 === 0 ? 'Libur' : '15.00 - 20.00',
            rabu: '08.00 - 14.00',
            kamis: i % 2 !== 0 ? '15.00 - 20.00' : 'Libur',
            jumat: '08.00 - 11.30',
            sabtu: i % 4 === 0 ? '08.00 - 12.00' : 'Libur',
            minggu: 'Libur'
        };

		daftarKaryawan.push({
			id: idCounter++,
            nama: nama,
			uraian: item.uraian,
			klasifikasi: item.klasifikasi,
			image: '/hospital-hero.svg', 
            pendidikan: `Pendidikan profesional di bidang ${item.uraian} dari universitas terkemuka.`,
            pelatihan: `Telah mengikuti berbagai seminar dan pelatihan sertifikasi terkait ${item.klasifikasi} untuk menunjang pelayanan di Klinik Sehat Bagendit.`,
            jadwal: jadwal
		});
	}
});

// ==========================================
// 2. HALAMAN DAFTAR KARYAWAN (PAGINASI)
// ==========================================
export function KaryawanPage() {
	const [query, setQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 12; 

	const filteredData = daftarKaryawan.filter((person) => 
		person.nama.toLowerCase().includes(query.toLowerCase()) ||
		person.uraian.toLowerCase().includes(query.toLowerCase())
	);

	const totalPages = Math.ceil(filteredData.length / itemsPerPage);
	const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return (
		<section className="reference-page doctors-page container pb-20">
			<div className="doctors-heading">
				<PageHeading eyebrow="Klinik Sehat Bagendit" title="DIREKTORI KARYAWAN" />
				<p>Direktori tenaga kesehatan dan karyawan Klinik Sehat Bagendit (Total {daftarKaryawan.length} Staf).</p>
			</div>

			<form className="doctor-search max-w-3xl mx-auto mb-12" onSubmit={(e) => e.preventDefault()}>
				<input 
					value={query} 
					onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }} 
					placeholder="Cari berdasarkan nama atau bidang (cth: dr. Budi, Keperawatan)..." 
					aria-label="Cari karyawan" 
				/>
				<button type="button">Cari</button>
			</form>

			<div className="doctor-grid">
				{paginatedData.map((person) => (
					<article className="doctor-card shadow-lg" key={person.id}>
						<img src={person.image} alt={person.nama} />
						<div className="doctor-card-body">
							<h2 className="!text-[#16594c] !font-bold !text-[16px] !mb-1">{person.nama}</h2>
							<p className="!text-[#fc8a15] !font-semibold">{person.uraian} • {person.klasifikasi}</p>
							<a href={`#karyawan-profile-${person.id}`}>Lihat Profil</a>
						</div>
					</article>
				))}
			</div>

			{filteredData.length === 0 && (
				<p className="empty-search">Karyawan tidak ditemukan.</p>
			)}

			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-4 mt-12">
					<button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-5 py-2 rounded-lg bg-white border border-[#fc8a15] text-[#fc8a15] font-bold disabled:opacity-40 hover:bg-[#fc8a15] hover:text-white transition-colors">
						&laquo; Sebelumnya
					</button>
					<span className="font-bold text-[#16594c]">Halaman {currentPage} dari {totalPages}</span>
					<button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-5 py-2 rounded-lg bg-white border border-[#fc8a15] text-[#fc8a15] font-bold disabled:opacity-40 hover:bg-[#fc8a15] hover:text-white transition-colors">
						Selanjutnya &raquo;
					</button>
				</div>
			)}
		</section>
	);
}

// ==========================================
// 3. HALAMAN PROFIL KARYAWAN
// ==========================================
export function KaryawanProfilePage({ karyawanId }) {
	const person = daftarKaryawan.find((item) => item.id === Number(karyawanId)) || daftarKaryawan[0];

	return (
		<section className="bg-[#f4f7f9] min-h-screen py-10 w-full px-4 lg:px-8">
			<div className="container mx-auto max-w-5xl">
				<div className="mb-6 border-b border-gray-300 pb-2">
					<span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Klinik Sehat Bagendit</span>
					<h2 className="text-2xl font-bold text-[#344353]">PROFIL KARYAWAN</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
					<div className="bg-[#d8f2ef] p-8 flex flex-col items-center justify-center">
						<img src={person.image} alt={person.nama} className="w-48 h-56 object-contain p-4 rounded-xl bg-white shadow-sm mb-6" />
						<a href="#karyawan" className="bg-[#009378] hover:bg-teal-700 text-white text-xs font-bold py-3 px-6 rounded-full transition-colors shadow-md">
							Kembali ke Daftar Karyawan
						</a>
					</div>

					<div className="md:col-span-2 p-8 lg:p-10">
						<h1 className="text-3xl font-bold text-[#344353] mb-4">{person.nama}</h1>
						<span className="inline-block bg-[#eaf4ef] text-[#009378] font-bold px-5 py-2 rounded-full text-sm mb-8 border border-[#c4e3d5]">
							{person.uraian} - Bagian {person.klasifikasi}
						</span>

						<div className="mb-8">
							<h3 className="text-lg font-bold text-[#344353] border-b-2 border-[#fc8a15] pb-2 mb-4 inline-block">Riwayat Pendidikan / Pekerjaan</h3>
							<p className="text-gray-600 text-sm leading-relaxed">{person.pendidikan}</p>
						</div>

						<div>
							<h3 className="text-lg font-bold text-[#344353] border-b-2 border-[#fc8a15] pb-2 mb-4 inline-block">Seminar &amp; Pelatihan</h3>
							<p className="text-gray-600 text-sm leading-relaxed">{person.pelatihan}</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 text-center">
					<h2 className="text-2xl font-bold text-[#344353] mb-8">Jadwal <span className="text-[#009378]">Praktik / Kerja</span></h2>
					
					<div className="overflow-x-auto">
						<table className="w-full min-w-[700px] border-collapse">
							<thead>
								<tr className="bg-[#009378] text-white">
									<th className="py-4 px-2 font-bold text-xs rounded-tl-xl">SENIN</th>
									<th className="py-4 px-2 font-bold text-xs">SELASA</th>
									<th className="py-4 px-2 font-bold text-xs">RABU</th>
									<th className="py-4 px-2 font-bold text-xs">KAMIS</th>
									<th className="py-4 px-2 font-bold text-xs">JUMAT</th>
									<th className="py-4 px-2 font-bold text-xs">SABTU</th>
									<th className="py-4 px-2 font-bold text-xs rounded-tr-xl">MINGGU</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									{['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'].map((day) => (
										<td key={day} className="py-6 px-2 border-b border-gray-100">
											<span className={`inline-block px-3 py-1.5 rounded-md text-xs font-semibold ${person.jadwal[day] === 'Libur' ? 'text-gray-400 italic' : 'bg-[#eaf4ef] text-[#009378] border border-[#c4e3d5]'}`}>
												{person.jadwal[day]}
											</span>
										</td>
									))}
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
}
