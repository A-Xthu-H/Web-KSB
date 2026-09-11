import React, { useEffect, useState } from 'react';
import {
    AboutPage, BlogDetailPage, BlogPage, CareersPage, ContactPage, DentalClinicPage,
    DoctorsPage, DoctorProfilePage, FacilitiesPage, InformationPage, navItems,
    PartnersPage, ReferenceHome, ServicesPage, SiteFooter,
} from './pages';

function App() {
    const [activeRoom, setActiveRoom] = useState(0);
    const [roomStart, setRoomStart] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [page, setPage] = useState(() => window.location.hash.slice(1) || 'home');

    useEffect(() => {
        const handleHashChange = () => setPage(window.location.hash.slice(1) || 'home');
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const isHome = page === 'home' || page === 'top';
    const isDoctorProfile = page.startsWith('dokter-profile-');
    const doctorProfileId = page.split('-').pop();

    const renderPage = () => {
        if (isHome) {
            return <ReferenceHome 
                activeRoom={activeRoom} setActiveRoom={setActiveRoom} 
                roomStart={roomStart} setRoomStart={setRoomStart} 
                activeTestimonial={activeTestimonial} setActiveTestimonial={setActiveTestimonial} 
            />;
        }
        if (isDoctorProfile) return <DoctorProfilePage doctorId={doctorProfileId} />;

        switch (page) {
			case 'sejarah':
            case 'visi-misi':
			case 'struktur':
            case 'penghargaan': return <AboutPage page={page} />;
            case 'rekanan-mitra': return <PartnersPage />;
			case 'dokter':
			case 'karyawan': return <DoctorsPage />;
            case 'jenis-pelayanan':
            case 'rawat-jalan': return <ServicesPage />;
            case 'poli-gigi': return <DentalClinicPage />;
            case 'fasilitas-umum': return <FacilitiesPage />;
            case 'karir': return <CareersPage />;
            case 'kontak': return <ContactPage />;
            case 'blog': return <BlogPage />;
            case 'blog-tonsil': return <BlogDetailPage />;
            default: return <InformationPage page={page} />;
        }
    };

    return (
        <div className="site-shell min-h-screen flex flex-col">
            
            {/* --- UTILITY BAR (Info Kontak) --- */}
            {/* Saya cabut warna Tailwind di sini, biarkan class "utility-bar" Anda yang bekerja */}
            <div className="utility-bar w-full">
                <div className="utility-inner container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                    <span>Klinik Sehat Bagendit</span>
                    <div className="utility-links flex gap-4 items-center mt-2 sm:mt-0">
                        <span>Senin - Minggu, 24 Jam</span>
						<span>Rawat Jalan: 07.00–14.00 &amp; 15.00–20.00 WIB</span>
                    </div>
                </div>
            </div>

            {/* --- HEADER --- */}
            {/* Saya cabut bg-white dan shadow, biarkan "site-header" CSS Anda yang memberi warna hijau */}
            <header className="site-header container mx-auto px-4 py-3 flex justify-between items-center">
				<a className="brand flex-shrink-0" href="#top" aria-label="Klinik Sehat Bagendit home">
					<img src="/logo-ksb.png" alt="Klinik Sehat Bagendit" className="h-10 lg:h-12 w-auto" />
                </a>
                
                {/* --- NAVIGASI --- */}
                <nav className="main-nav flex gap-4 items-center" aria-label="Main navigation">
                    {navItems.map((item) => {
                        const isActive = item.page === page || (item.page === 'home' && isHome);
                        return (
                            <div className={`nav-item relative group flex items-center ${item.children ? 'has-dropdown' : ''}`} key={item.label}>
                                
                                {/* Tombol Menu: HANYA pakai class CSS "active" milik Anda */}
                                <a 
                                    className={`flex items-center gap-1 transition-all duration-300 ${isActive ? 'active' : ''}`} 
                                    href={item.href}
                                >
                                    {item.label}
                                    {item.children && (
                                        <span className="nav-chevron flex items-center transition-transform duration-300 group-hover:-rotate-180">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </span>
                                    )}
                                </a>
                                
{/* --- DROPDOWN MENU --- */}
{item.children && (
    <div className="absolute top-full left-0 pt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div className="flex flex-col bg-white shadow-xl rounded-xl overflow-hidden min-w-[220px] !p-0 !m-0">
            {item.children.map((child) => (
                <a 
                    href={child.href} 
                    key={child.label} 
                    className="!block !w-full text-left !m-0 !px-6 !py-3 text-sm font-medium !text-green-800 hover:!text-white hover:!bg-green-700 transition-colors"
                >
                    {child.label}
                </a>
            ))}
        </div>
    </div>
)}
                            </div>
                        );
                    })}
                </nav>
            </header>

            {/* --- KONTEN HALAMAN --- */}
            <main id="top" className="flex-grow flex flex-col w-full">
                {renderPage()}
            </main>

            <SiteFooter />
            
        </div>
    );
}

export default App;
