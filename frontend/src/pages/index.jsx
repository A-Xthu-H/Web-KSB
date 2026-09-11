import React, { useState, useEffect } from 'react'

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
	{ label: 'Tentang Kami', href: '#sejarah', page: 'tentang-kami', children: [{ label: 'Sejarah Klinik', href: '#sejarah' }, { label: 'Visi dan Misi', href: '#visi-misi' }, { label: 'Struktur Organisasi', href: '#struktur' }, { label: 'Akreditasi', href: '#penghargaan' }] },
	{ label: 'Layanan', href: '#jenis-pelayanan', page: 'jenis-pelayanan' },
	{ label: 'Fasilitas Umum', href: '#fasilitas-umum', page: 'fasilitas-umum' },
	{ label: 'Karyawan', href: '#karyawan', page: 'karyawan' },
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
	'dokter': ['#karyawan', 'Lihat direktori karyawan'],
	'rawat-jalan': ['#poli-gigi', 'Lihat poliklinik'],
	'poli-gigi': ['https://wa.me/6282120232032', 'Hubungi poli'],
}

export function InformationPage({ page }) {
	const content = pageData[page] || pageData['tentang-kami']
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
        // --- STRUKTUR ORGANISASI FLEXBOX (ANTI-PUTUS) ---
		const orgData = {
			pimpinan: { title: 'Pimpinan Klinik', name: 'dr. Asep Ichsannurdin', image: '/logo-ksb.png' },
			pjKlinik: { title: 'Penanggung Jawab Klinik', name: 'dr. Asep Ichsannurdin', image: '/logo-ksb.png' },
			branches: [
				{
					title: 'Penanggung Jawab Adman', name: 'Handri Priyatna', image: '/logo-ksb.png',
					children: [
						{ title: 'Koor. Keuangan', name: 'Ade Yusuf, S.E', image: '/logo-ksb.png' },
						{ title: 'Koor. Manajemen Fasilitas & Keselamatan', name: 'Jumyati', image: '/logo-ksb.png' },
						{ title: 'Koor. Humas & Marketing', name: 'Yudha Anfal G', image: '/logo-ksb.png' }
					]
				},
				{
					title: 'Penanggung Jawab Mutu/PPI', name: 'dr. Aprina Handayani', image: '/logo-ksb.png',
					children: [
						{ title: 'Koor. Mutu/Koor. PPI', name: 'Meita Rahayu, S.Kep,Ners', image: '/logo-ksb.png' },
						{ title: 'Koor. Keselamatan Pasien/ Koor Manajemen Risiko', name: 'Uswatuh Hasanah, S.Kep', image: '/logo-ksb.png' },
						{ title: 'Koor. K3', name: 'Jumyati', image: '/logo-ksb.png' }
					]
				},
				{
					title: 'Penanggung Jawab UKP', name: 'dr. Syahrial', image: '/logo-ksb.png',
					children: [
						{ title: 'Koor. Rawat Jalan', name: 'Hegar Feby Apriana, S.Kep', image: '/logo-ksb.png' },
						{ title: 'Koor. Rawat Inap', name: 'Uswatuh Hasanah, S.Kep', image: '/logo-ksb.png' },
						{ title: 'Koor. Poli Gigi & Mulut', name: 'drg. Nita Septiani', image: '/logo-ksb.png' },
						{ title: 'Koor. Rumah Bersalin & KIA', name: 'Ilmar Munawaroh, A.Md.Keb', image: '/logo-ksb.png' },
						{ title: 'Koor. Farmasi', name: 'apt. Rahman Surahman, S.Si', image: '/logo-ksb.png' },
						{ title: 'Koor. Laboratorium', name: 'Susi Nurwinti, A.Md.AK', image: '/logo-ksb.png' },
						{ title: 'Koor. Rekam Medik', name: 'Fauziah Elsa Nafisah, A.Md.RMIK', image: '/logo-ksb.png' },
						{ title: 'Koor. Gizi', name: 'Tammy Ajeng Rahayu, AMG', image: '/logo-ksb.png' }
					]
				}
			]
		};

		const OrgCard = ({ title, name, image }) => (
			<article className="doctor-card w-[250px] flex-shrink-0 mx-auto relative z-10 flex flex-col text-center shadow-lg bg-white border border-gray-100">
				<img src={image} alt={name} className="!object-contain !p-4" />
				<div className="doctor-card-body flex flex-col flex-grow">
					<h2 className="!text-[#fc8a15] !min-h-0 !mb-1">{title}</h2>
					<p className="!text-[#16594c] !font-bold !text-[13px] !mb-4">{name}</p>
					<a href="#kontak" className="mt-auto">Informasi Selengkapnya</a>
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

	return <section className="reference-page doctors-page container"><div className="doctors-heading"><PageHeading eyebrow="Klinik Sehat Bagendit" title="DOKTER" /><p>Direktori tenaga kesehatan Klinik Sehat Bagendit.</p></div><form className="doctor-search" onSubmit={(event) => event.preventDefault()}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau bidang..." aria-label="Cari karyawan" /><button type="submit">Cari</button></form><div className="doctor-grid">{filteredDoctors.map((doctor) => <article className="doctor-card" key={doctor.id}><img src={doctor.image} alt={doctor.name} /><div className="doctor-card-body"><h2>{doctor.name}</h2><p>{doctor.specialty}</p><a href={`#dokter-profile-${doctor.id}`}>Lihat Profil</a></div></article>)}</div>{filteredDoctors.length === 0 && <p className="empty-search">Karyawan tidak ditemukan. Coba kata kunci lain.</p>}</section>
}

export function DoctorProfilePage({ doctorId }) {
	const doctor = doctors.find((item) => item.id === Number(doctorId)) || doctors[1]

	return <section className="reference-page doctor-profile-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="PROFIL DOKTER" /><div className="doctor-profile-card"><div className="profile-photo"><img src={doctor.image} alt={doctor.name} /><a href="#dokter">Kembali ke Daftar Dokter</a></div><div className="profile-copy"><h1>{doctor.name}</h1><span className="specialty-pill">{doctor.specialty}</span><section><h2>Profil</h2><p>Informasi profil dan kompetensi akan diperbarui oleh admin klinik.</p></section><section><h2>Jadwal</h2><p>Jadwal layanan dapat diperbarui saat data tersedia.</p></section></div></div></section>
}

export function ServicesPage() {
	const [query, setQuery] = useState('')
	const filteredServices = clinicServices.filter((service) => `${service.name} ${service.short}`.toLowerCase().includes(query.toLowerCase()))

	return <section className="reference-page services-directory container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="RAWAT JALAN" /><form className="service-search" onSubmit={(event) => event.preventDefault()}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari Layanan" aria-label="Cari poliklinik" /><button type="submit">Cari</button></form><div className="clinic-grid">{filteredServices.map((service, index) => <article className={`clinic-card clinic-tone-${index % 6}`} key={service.id}><div className="clinic-card-art"><span className="clinic-logo">✚</span><span className="clinic-medal">✦</span><div className="clinic-icon">{service.icon}</div><small>Klik Di Sini</small></div><div className="clinic-card-body"><p>Klinik</p><h2>{service.short}</h2><span>{service.detail}</span><a href={service.id === 2 ? '#poli-gigi' : '#dokter'}>Lihat Detail <b>↗</b></a></div></article>)}</div>{filteredServices.length === 0 && <p className="empty-search">Poliklinik tidak ditemukan.</p>}</section>
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

export function FacilitiesPage() {
	return <section className="reference-page facilities-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="FASILITAS UMUM" /><p className="facilities-lead">BERBAGAI FASILITAS PENUNJANG UNTUK KENYAMANAN PASIEN DAN PENGUNJUNG</p><div className="facility-grid">{facilities.map(([name, text, hours, action, image]) => <article className="facility-card" key={name}><img src={image} alt={name} /><div><h2>{name}</h2><p>{text}</p><small>◷ {hours}</small><a href="#kontak">{action} <b>→</b></a></div></article>)}</div></section>
}

export function CareersPage() {
	return <section className="reference-page careers-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="KARIR & LOWONGAN KERJA" /><div className="career-intro"><span>▱</span><h2>Bergabung bersama Kami</h2><p>Bangun karier dan berikan kontribusi terbaik untuk pelayanan kesehatan masyarakat Garut.</p></div><div className="job-grid">{jobOpenings.map(([title, category, type, text]) => <article className="job-card" key={title}><div><span>{category}</span><h2>{title}</h2><p>{text}</p></div><div className="job-meta"><small>◷ {type}</small><a href="mailto:admin@kliniksehatbagendit.com?subject=Lamaran%20Kerja">Lihat Detail ↗</a></div></article>)}</div><div className="career-note"><strong>Belum menemukan posisi yang sesuai?</strong><span>Kirim CV Anda dan kami akan menghubungi saat ada kesempatan yang relevan.</span><a href="mailto:admin@kliniksehatbagendit.com?subject=CV%20Kandidat">Kirim CV ↗</a></div></section>
}

export function ContactPage() {
	return <section className="contact-reference"><header className="contact-banner"><h1>Hubungi Kami</h1><p>Klinik Sehat Bagendit siap melayani kebutuhan kesehatan dasar Anda.</p></header><div className="contact-reference-content container"><div className="contact-column"><article className="contact-panel"><h2>⌖ &nbsp;Alamat</h2><div><strong>⌂ Lokasi Klinik</strong><p>Jl. Terusan Cinunuk No. 9<br />Kp. Babakan Baru RT 002/RW 009<br />Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut</p><a href="https://maps.app.goo.gl/kXFHvWo4fhn8qXC78" target="_blank" rel="noreferrer">Buka di Google Maps</a></div><div><strong>◷ Rawat Jalan</strong><p>Senin–Minggu<br />07.00–14.00 WIB dan 15.00–20.00 WIB</p></div></article></div><article className="map-panel"><h2>⌖ &nbsp;Lokasi Kami di Peta</h2><a className="map-direct-link" href="https://maps.app.goo.gl/kXFHvWo4fhn8qXC78" target="_blank" rel="noreferrer">Buka lokasi Klinik Sehat Bagendit di Google Maps ↗</a></article></div><section className="hours-section"><h2>◷ Jam Operasional</h2><div><article><strong>Rawat Jalan</strong><span>Setiap hari, 07.00–14.00 & 15.00–20.00 WIB</span></article><article className="emergency-hours"><strong>Rawat Inap</strong><span>Buka 24 Jam Setiap Hari</span></article></div></section></section>
}

export function BlogPage() {
	return <section className="reference-page blog-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="BLOG & ARTIKEL KESEHATAN" /><div className="blog-layout"><div className="blog-list">{blogPosts.map(([title, author, date, category, image, excerpt], index) => <article className="blog-card" key={title}><img src={image} alt={title} /><div><h2>{title}</h2><small>♙ {author} &nbsp; ◷ {date} &nbsp; ▫ {category}</small><p>{excerpt}</p><a href={index === 2 ? '#blog-tonsil' : '#kontak'}>Selengkapnya <b>↗</b></a></div></article>)}</div><aside className="blog-sidebar"><input placeholder="Search..." aria-label="Cari artikel" /><h3>Kategori</h3><a href="#blog">Pelayanan Medis (1)</a><a href="#blog">Penelitian &amp; Inovasi (0)</a><a href="#blog">Info Kesehatan (2)</a><a href="#blog">Promosi Kesehatan (1)</a><a href="#blog">Informasi Klinik (0)</a></aside></div></section>
}

export function BlogDetailPage() {
	return <section className="reference-page blog-detail-page container"><PageHeading eyebrow="Klinik Sehat Bagendit" title="BLOG DETAIL" /><article className="blog-detail-card"><img className="blog-detail-cover" src={blogPosts[2][4]} alt={blogPosts[2][0]} /><h1>{blogPosts[2][0]}</h1><small>♙ marketing &nbsp; ◷ Nov 11, 2025 &nbsp; ▫ Info Kesehatan</small><div className="article-body"><h2>Tonsil Hipertrofi</h2><h3>Pendahuluan</h3><p>Tonsil hipertrofi sebenarnya cuma istilah medis dari amandel yang membesar. Kondisi ini bisa bikin beberapa aktivitas yang biasanya ringan seperti napas, makan, atau tidur menjadi terganggu. Pada banyak anak, amandel memang cenderung aktif dan ukurannya dapat berubah-ubah.</p><h3>Epidemiologi</h3><p>Kondisi ini paling sering terlihat pada anak-anak usia sekolah atau bahkan sebelumnya. Banyak yang akhirnya mengecil sendiri saat remaja, sehingga angkanya menurun seiring bertambahnya usia.</p><h3>Anatomi &amp; Patofisiologi</h3><p>Tonsil adalah bagian dari sistem pertahanan tubuh di belakang mulut. Jika terlalu besar, saluran napas dapat menyempit dan menyebabkan tidur tidak nyenyak, napas berbunyi, atau kebiasaan bernapas lewat mulut.</p><h3>Penyebab &amp; Faktor Risiko</h3><p>Infeksi berulang, alergi, lingkungan yang memicu peradangan, dan faktor bawaan keluarga dapat membuat amandel lebih mudah membesar.</p><h3>Gejala Klinis</h3><p>Keluhan yang sering muncul adalah mendengkur, tidur gelisah, napas melalui mulut, sakit tenggorokan berulang, serta kesulitan makan.</p><h3>Pemeriksaan</h3><p>Dokter biasanya memulai dengan menanyakan riwayat keluhan lalu memeriksa ukuran tonsil. Bila diperlukan, pemeriksaan tambahan seperti endoskopi atau pemeriksaan tidur dapat dilakukan.</p><h3>Diagnosis Banding</h3><p>Kondisi lain seperti abses di sekitar tonsil, radang tonsil kronis, atau pertumbuhan jaringan yang tidak normal perlu dibedakan melalui pemeriksaan menyeluruh.</p><h3>Penatalaksanaan</h3><p>Kasus ringan dapat dipantau dan ditangani dengan obat sesuai penyebab. Jika keluhan mengganggu aktivitas atau infeksi sering terjadi, operasi pengangkatan amandel dapat menjadi pilihan.</p><h3>Indikasi Tonsilektomi</h3><p>Operasi dipertimbangkan bila infeksi terlalu sering atau pembesaran tonsil mengganggu napas saat tidur, makan, atau menyebabkan komplikasi berulang.</p><h3>Komplikasi Operasi</h3><p>Seperti tindakan bedah lainnya, operasi amandel memiliki risiko seperti perdarahan, nyeri menelan, infeksi, atau perubahan suara sementara.</p><h3>Hasil &amp; Prognosis</h3><p>Banyak anak mengalami perbaikan kualitas tidur, energi, dan aktivitas setelah penanganan yang sesuai. Tetap diperlukan pemantauan jangka panjang.</p><p className="article-author">Penulis: <strong>Tim Medis KSB</strong></p></div><section className="related-article"><h2>Artikel Terkait</h2><img src={blogPosts[3][4]} alt={blogPosts[3][0]} /><h3>{blogPosts[3][0]}</h3><a href="#blog">Baca Selengkapnya</a></section></article></section>
}

export function SiteFooter() {
	return <footer className="site-footer shared-footer container"><div className="footer-brand"><img src="/logo-ksb.png" alt="Logo Klinik Sehat Bagendit" /><p>Klinik Sehat Bagendit</p><small>Jl. Terusan Cinunuk No. 9, Kp. Babakan Baru<br />Desa Cipicung, Kecamatan Banyuresmi, Kabupaten Garut</small></div><div><h3>Menu</h3><a href="#top">Beranda</a><a href="#sejarah">Sejarah</a><a href="#visi-misi">Visi & Misi</a><a href="#jenis-pelayanan">Layanan</a><a href="#fasilitas-umum">Fasilitas</a><a href="#kontak">Kontak</a></div><div><h3>Jam Pelayanan</h3><p>Rawat jalan: setiap hari<br />07.00–14.00 & 15.00–20.00 WIB</p><p>Rawat inap: 24 jam</p></div><small className="footer-copy">© 2026 Klinik Sehat Bagendit. All rights reserved.</small></footer>
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
		
        {/* --- TESTIMONI GOOGLE MAPS --- */}
        <section className="reference-testimonials">
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-7a47517c-645a-4eb6-94ba-7ee1315f29e9" data-elfsight-app-lazy></div>
		</section>
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
						<img src={person.image} alt={person.nama} className="!bg-[#eaf4ef] !object-contain !p-4" />
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