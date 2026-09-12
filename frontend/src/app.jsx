import React, { useEffect, useState } from 'react';
import {
    AboutPage, BlogDetailPage, BlogPage, CareersPage, ContactPage, DentalClinicPage,
    DoctorsPage, DoctorProfilePage, FacilitiesPage, InformationPage, navItems,
    PartnersPage, ReferenceHome, ServicesPage, SiteFooter, KaryawanPage, KaryawanProfilePage
} from './pages/index.jsx';
import AdminApp from './admin/AdminApp.jsx';

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

    // Halaman admin (CMS) tidak memakai layout publik.
    if (page === 'admin' || page === 'admin-login') {
        return <AdminApp />;
    }

    const isHome = page === 'home' || page === 'top';
    const isDoctorProfile = page.startsWith('dokter-profile-');
    const doctorProfileId = page.split('-').pop();
    const isKaryawanProfile = page.startsWith('karyawan-profile-');
    const karyawanProfileId = page.split('-').pop();

    const renderPage = () => {
        if (isHome) {
            return <ReferenceHome 
                activeRoom={activeRoom} setActiveRoom={setActiveRoom} 
                roomStart={roomStart} setRoomStart={setRoomStart} 
                activeTestimonial={activeTestimonial} setActiveTestimonial={setActiveTestimonial} 
            />;
        }
        if (isDoctorProfile) return <DoctorProfilePage doctorId={doctorProfileId} />;
        if (isKaryawanProfile) return <KaryawanProfilePage karyawanId={karyawanProfileId} />;

        switch (page) {
            case 'sejarah':
            case 'visi-misi':
            case 'struktur':
            case 'penghargaan': return <AboutPage page={page} />;
            case 'rekanan-mitra': return <PartnersPage />;
            case 'dokter': return <DoctorsPage />;
            case 'karyawan': return <KaryawanPage />;   
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
            
            {/* --- UTILITY BAR --- */}
            <div className="utility-bar w-full">
                <div className="utility-inner container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                    <span>Klinik Sehat Bagendit</span>
                    <div className="utility-links flex gap-4 items-center mt-2 sm:mt-0">
                        <span>Senin - Minggu, 24 Jam</span>
                        {/* Perhatikan penulisan &amp; di bawah ini, ini wajib agar React tidak error */}
                        <span>Rawat Jalan: 07.00–14.00 &amp; 15.00–20.00 WIB</span>
                    </div>
                </div>
            </div>

            {/* --- HEADER --- */}
            <header className="site-header container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* LOGO DIBERI BACKGROUND PUTIH AGAR MENONJOL (TIDAK MEMBAUR DENGAN WARNA ORANYE) */}
                <a className="brand flex-shrink-0 bg-white px-3 py-1.5 rounded-lg shadow-sm" href="#top" aria-label="Klinik Sehat Bagendit home">
                    <img src="/logo-ksb.png" alt="Klinik Sehat Bagendit" className="h-10 lg:h-12 w-auto" />
                </a>
                
                {/* --- NAVIGASI --- */}
                <nav className="main-nav flex gap-4 items-center" aria-label="Main navigation">
                    {navItems.map((item) => {
                        const isActive = item.page === page || 
                                (item.page === 'home' && isHome) || 
                                (item.children && item.children.some(child => child.href === `#${page}`));
                                            
                            return (
                                <div className={`nav-item relative group flex items-center ${item.children ? 'has-dropdown' : ''}`} key={item.label}>
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

            {/* --- FOOTER --- */}
            <SiteFooter />

            {/* --- FLOATING WHATSAPP BUTTON (Berdiri Sendiri) --- */}
            <a 
                href="https://wa.me/6282120232032" 
                target="_blank" 
                rel="noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
                aria-label="Chat WhatsApp Salima"
            >
                {/* INI KODE SVG WHATSAPP YANG BENAR */}
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                </svg>
            </a>

        </div>
    );
}

export default App;