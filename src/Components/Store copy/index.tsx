"use client"
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Map as MapIcon,
    Package,
    ShoppingBag,
    Home,
    Coffee,
    Utensils,
    Shirt,
    Wrench,
    Zap
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import MobileDrawer from './MobileDrawer';
import Header from './Header';
import HomePage from './HomePage';
import MapPage from './MapPage';
import DailyUpdatePage from './DailyUpdatePage';
import { Get } from '@/utils/Get';
import { StoresType } from '@/types/StoresType';
import { UserLocationType } from './StoresType';

// --- DATA MOCKUP ---

const PRIMARY_COLOR = "#10B981";

const STORES = [
    {
        id: 1,
        name: "Toko Sembako Barokah",
        category: "Sembako",
        distance: "0.5 km",
        address: "Jl. Merdeka No. 10, Jakarta",
        lat: -6.220,
        lng: 106.820,
        status: "Buka",
        products: [
            { name: "Beras Cianjur 5kg", price: 65000, discount: 10, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300" },
            { name: "Minyak Goreng 2L", price: 34000, discount: 0, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=300" },
            { name: "Gula Pasir 1kg", price: 14500, discount: 5, image: "https://images.unsplash.com/photo-1581448670542-6e2182bb193a?auto=format&fit=crop&q=80&w=300" }
        ],
        image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        name: "Warung Kopi Senja",
        category: "Kuliner",
        distance: "1.2 km",
        address: "Jl. Sudirman Blok B3, Jakarta",
        lat: -6.215,
        lng: 106.830,
        status: "Buka",
        products: [
            { name: "Kopi Susu Gula Aren", price: 18000, discount: 15, image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=300" },
            { name: "Roti Bakar Cokelat", price: 15000, discount: 0, image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=300" }
        ],
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 3,
        name: "Bengkel Jaya Motor",
        category: "Jasa",
        distance: "2.0 km",
        address: "Kawasan Industri Pulo Gadung",
        lat: -6.225,
        lng: 106.810,
        status: "Tutup",
        products: [
            { name: "Oli Shell Helix 1L", price: 55000, discount: 20, image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300" },
            { name: "Ban Luar IRC", price: 185000, discount: 0, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=300" }
        ],
        image: "https://images.unsplash.com/photo-1762604462421-fff920b0c418?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];
export default function StorePageComponent() {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [activeNav, setActiveNav] = useState('Beranda');
    const [isDark, setIsDark] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [stores, setStores] = useState<StoresType[]>([])
    const [userLocation, setUserLocation] = useState<UserLocationType | null>(null);
    useEffect(() => {

        if (!navigator.geolocation) {
            console.log("Geolocation tidak didukung");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                setUserLocation({ lat, lng });

                console.log("Lokasi user:", lat, lng);
            },
            (error) => {
                setUserLocation({
                    lat: 0,
                    lng: 0,
                });
                console.log("Gagal ambil lokasi:", error.message);
            },
            {
                enableHighAccuracy: true
            }
        );

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(false);
        const handler = (e: any) => setIsDark(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (userLocation != null) {
            fetchStore()
        }
    }, [userLocation])

    const mainNav = [
        { icon: Home, label: 'Beranda' },
        { icon: MapIcon, label: 'Maps' },
        { icon: Zap, label: 'Update' },
        { icon: Package, label: 'Pesanan' },
    ];

    const categories = [
        { icon: Utensils, label: 'Kuliner' },
        { icon: Shirt, label: 'Fashion' },
        { icon: Coffee, label: 'Coffee Shop' },
        { icon: Wrench, label: 'Jasa' },
        { icon: ShoppingBag, label: 'Sembako' },
    ];

    const { filteredStores, filteredProducts } = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        const resultStores = STORES.filter(s => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query));
        const resultProducts: any = [];
        STORES.forEach(s => {
            s.products.forEach(p => {
                if (p.name.toLowerCase().includes(query)) resultProducts.push({ ...p, storeName: s.name });
            });
        });
        return { filteredStores: resultStores, filteredProducts: resultProducts };
    }, [searchQuery]);

    const fetchStore = async () => {
        setLoading(true)
        try {
            const res = await Get<{ success: boolean, data: StoresType[] }>(`/stores?lat=${userLocation?.lat != 0 ? userLocation?.lat : ''}&lng=${userLocation?.lng != 0 ? userLocation?.lng : ""}`);
            if (res?.success) {
                setStores(res?.data)
            }
        } catch (e: any) {
            setLoading(true)
        }
    }

    return (
        <div className={`${isDark ? 'bg-zinc-950' : 'bg-gray-50'}`}>
            <div className={`flex h-screen mx-auto overflow-hidden font-sans transition-colors duration-500 `}>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
                <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

                {/* Desktop Sidebar (Tampilan Desktop Saja) */}
                <aside className={`hidden lg:flex w-72 flex-col transition-colors duration-300 ${isDark ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-gray-100'} border-r overflow-y-auto no-scrollbar pb-10`}>
                    <div className="p-8 flex items-center gap-2">
                        <img src={'/logo_usahaku.png'} className='w-12 h-12 rounded-xl' />
                        <h1 className="text-2xl font-bold italic" style={{ color: PRIMARY_COLOR }}>UsahaKu.</h1>
                    </div>
                    <div className="px-4 space-y-8">
                        <div>
                            <h5 className={`px-4 text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-zinc-600' : 'text-gray-400'}`}>Menu Utama</h5>
                            <div className="space-y-1">
                                {mainNav.map(item => (
                                    <SidebarItem key={item.label} {...item} isActive={activeNav === item.label} onClick={() => setActiveNav(item.label)} isDark={isDark} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h5 className={`px-4 text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-zinc-600' : 'text-gray-400'}`}>Kategori Populer</h5>
                            <div className="space-y-1">
                                {categories.map(item => (
                                    <SidebarItem key={item.label} {...item} isDark={isDark} onClick={() => { }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Mobile Drawer (Muncul dari Samping) */}
                <MobileDrawer
                    isOpen={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    isDark={isDark}
                    categories={categories}
                    activeNav={activeNav}
                    setActiveNav={setActiveNav}
                    PRIMARY_COLOR={PRIMARY_COLOR}
                />

                <div className="flex-1 flex flex-col relative overflow-hidden">
                    <Header
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        isDark={isDark}
                        toggleTheme={() => setIsDark(!isDark)}
                        onOpenMenu={() => setIsMenuOpen(true)}
                    />

                    <main className={`flex-1 overflow-y-auto no-scrollbar transition-colors duration-500 ${isDark ? 'bg-zinc-950' : 'bg-white'}`}>
                        {
                            activeNav === 'Beranda' ? <HomePage stores={stores} isDark={isDark} filteredProducts={filteredProducts} /> :
                                activeNav === 'Maps' ? <MapPage stores={stores} isDark={false} PRIMARY_COLOR={PRIMARY_COLOR} userLocation={userLocation} /> :
                                    activeNav === 'Update' ? <DailyUpdatePage isDark={isDark} /> : ''
                        }
                    </main>

                    {/* Mobile Bottom Navigation (Kunci Utama Kemudahan) */}
                    <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-[50] border-t px-6 py-3 flex items-center justify-between transition-colors duration-300 ${isDark ? 'bg-zinc-950/90 border-zinc-900' : 'bg-white/90 border-gray-100'} backdrop-blur-xl`}>
                        {mainNav.map(item => {
                            const isActive = activeNav === item.label;
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => setActiveNav(item.label)}
                                    className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-emerald-500' : 'text-zinc-500'}`}
                                >
                                    <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-emerald-500/10' : ''}`}>
                                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                        {item.label}
                                    </span>
                                </button>
                            )
                        })}
                    </nav>

                    {/* Floating View Switcher (Desktop Saja / Ataupun Mobile Jika Perlu) */}

                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}} />
            </div>
        </div>
    );
}