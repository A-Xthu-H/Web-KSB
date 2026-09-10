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
            case 'penghargaan': return <AboutPage page={page} />;
            case 'rekanan-mitra': return <PartnersPage />;
            case 'dokter': return <DoctorsPage />;
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
        <div className="site-shell min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
            
            {/* Utility Bar */}
            <div className="utility-bar w-full bg-slate-800 text-slate-200 text-xs sm:text-sm py-2">
                <div className="utility-inner container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
                    <span className="font-medium tracking-wide">Rumah Sakit Intan Husada Garut</span>
                    <div className="utility-links flex gap-5 items-center mt-2 sm:mt-0">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Senin - Minggu, 24 Jam
                        </span>
                        <a href="tel:02622247769" className="flex items-center gap-1 hover:text-white font-semibold transition-colors duration-200">
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            0262 2247769
                        </a>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="site-header w-full bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
                <div className="container mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
                    <a className="brand flex-shrink-0 transition-transform duration-300 hover:scale-105" href="#top" aria-label="RSIH home">
                        <img src="/rsih-logo.svg" alt="RSIH Intan Husada" className="h-10 lg:h-12 w-auto" />
                    </a>
                    
                    {/* Navigation */}
					<nav className="main-nav flex gap-2 lg:gap-4 items-center" aria-label="Main navigation">
						{navItems.map((item) => {
							const isActive = item.page === page || (item.page === 'home' && isHome);
							return (
								<div className={`nav-item relative group flex items-center ${item.children ? 'has-dropdown' : ''}`} key={item.label}>
									<a 
										className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
											isActive 
											? 'bg-white text-green-800 shadow-sm' /* Saat aktif: Background putih, teks hijau gelap */
											: 'text-white hover:bg-white hover:text-green-800' /* Default: Teks putih. Saat di-hover: Background putih, teks hijau gelap */
										}`} 
										href={item.href}
									>
										{item.label}
										{item.children && (
											<span className="nav-chevron flex items-center transition-transform duration-300 group-hover:-rotate-180">
												<svg className="w-4 h-4 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
												</svg>
											</span>
										)}
									</a>
									
									{/* Dropdown Menu */}
									{item.children && (
										<div className="nav-dropdown absolute top-full left-0 pt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
											<div className="flex flex-col bg-white shadow-xl border border-slate-100 rounded-xl overflow-hidden min-w-[200px] py-2">
												{item.children.map((child) => (
													<a 
														href={child.href} 
														key={child.label} 
														className="whitespace-nowrap px-5 py-2.5 text-sm font-medium text-green-800 hover:text-white hover:bg-green-700 transition-colors"
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
					</div>
            </header>

            {/* Main Content Area */}
            <main id="top" className="flex-grow flex flex-col w-full">
                {renderPage()}
            </main>

            <SiteFooter />
        </div>
    );
}

export default App;