"use client"
import { getToken } from '@/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SidebarComponent from './SidebarComponent';
import Header from './Header';
import Loading from '../Component/Loading';

type Props = {
    children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
    const token = getToken();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [isMobileActionMenuOpen, setIsMobileActionMenuOpen] = useState<boolean>(false);
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState<string>('');
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    const segments = pathname.split("/").filter(Boolean);
    const lastOne = segments.slice(-1);

    const breadcrumb = segments.map((seg, index) => {
        if (index === 0) return "Home";
        return seg.charAt(0).toUpperCase() + seg.slice(1);
    });
    const closeMobileActionMenu = () => setIsMobileActionMenuOpen(false);

    const handleNotificationClick = () => {
        console.log("Aksi Notifikasi: Memuat halaman notifikasi...");
        closeMobileActionMenu();
    };

    const handleProfileClick = () => {
        console.log("Aksi Profil: Memuat halaman profil pengguna...");
        closeMobileActionMenu();
    };

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (isMobileActionMenuOpen) {
                const mobileActionBtn = document.getElementById('mobile-action-btn');
                const menu = document.getElementById('mobile-action-menu');

                if (mobileActionBtn && menu) {
                    const isClickInsideButton = mobileActionBtn.contains(event.target);
                    const isClickInsideMenu = menu.contains(event.target);

                    if (!isClickInsideButton && !isClickInsideMenu) {
                        setIsMobileActionMenuOpen(false);
                    }
                }
            }
        };

        if (isMobileActionMenuOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isMobileActionMenuOpen]);

    useEffect(() => {
        if (!token) {
            router?.push('/auth/login')
            return
        }
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileActionMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        setLoading(true)
        localStorage?.removeItem('token');
        localStorage?.removeItem('user');
        router?.push('/auth/login')
    }
    return (
        <div className="flex h-screen overflow-hidden bg-[#f7f9fc]">
            <div className="fixed bottom-0 right-0 p-4 sm:p-6 z-99999 flex flex-col items-end pointer-events-none">
                {/* {currentAlert && (
                    <div className="pointer-events-auto">
                        {currentAlert.type === 'loading' ? (
                            <LoadingAlert
                                title={currentAlert.title}
                                message={currentAlert.message}
                            />
                        ) : currentAlert.type === 'success' ? (
                            <SuccessAlert
                                title={currentAlert.title}
                                message={currentAlert.message}
                                onClose={closeAlert}
                            />
                        ) : (
                            <ErrorAlert
                                title={currentAlert.title}
                                message={currentAlert.message}
                                onClose={closeAlert}
                            />
                        )}
                    </div>
                )} */}
            </div>
            <SidebarComponent
                isActivityDropdownOpen={isActivityDropdownOpen}
                setIsActivityDropdownOpen={setIsActivityDropdownOpen}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden bg-[#f7f9fc]">
                <Header
                    setIsSidebarOpen={setIsSidebarOpen}
                    isSidebarOpen={isSidebarOpen}
                    setIsMobileActionMenuOpen={setIsMobileActionMenuOpen}
                    isMobileActionMenuOpen={isMobileActionMenuOpen}
                    closeMobileActionMenu={closeMobileActionMenu}
                    handleNotificationClick={handleNotificationClick}
                    handleProfileClick={handleProfileClick}
                    title={lastOne}
                    handleLogout={handleLogout}
                />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 md:pt-0">
                    <nav className="text-sm pb-4">
                        <ol className="flex items-center text-gray-600">
                            {breadcrumb.map((p, i) => (
                                <li key={i} className="flex items-center">
                                    <a href="#" className={`${i === breadcrumb.length - 1 ? 'font-medium text-gray-900' : 'hover:text-gray-900'}`}>{p}</a>
                                    {i < breadcrumb.length - 1 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                    {children}
                </main>
            </div>
            {
                loading && <Loading />
            }
        </div>
    )
}

export default MainLayout