'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Palette, Home, Utensils, Cpu, Sparkles, Pipette, HeartPulse, Shirt, Coffee, GraduationCap, Upload, CircleCheckBigIcon, Circle, Sun, Moon, Check, SunMoon } from 'lucide-react';
import HeaderConfig from '@/Components/Config/Theme/Header';
import NavIcons from '@/Components/Config/Theme/Header/NavIcons';
import MainLayout from '@/Components/Layout/MainLayout';
import HeroConfig from '@/Components/Config/Theme/Hero';

const BUSINESS_THEMES = [
    {
        id: 'property',
        name: 'Properti (Minimalis)',
        description: 'Kesan bersih, luas, dan kokoh.',
        hex: '#94A3B8', // Slate Gray / Cement
        icon: <Home size={18} />,
        textColor: '#1E293B'
    },
    {
        id: 'fnb',
        name: 'F&B (Energi)',
        description: 'Menggugah selera dan hangat.',
        hex: '#F59E0B', // Amber / Warm Orange
        icon: <Utensils size={18} />,
        textColor: '#FFFFFF'
    },
    {
        id: 'tech',
        name: 'Tech (Modern)',
        description: 'Inovatif dan futuristik.',
        hex: '#3B82F6', // Blue
        icon: <Cpu size={18} />,
        textColor: '#FFFFFF'
    },
    {
        id: 'luxury',
        name: 'Luxury (Premium)',
        description: 'Eksklusif dan elegan.',
        hex: '#111827', // Rich Black
        icon: <Sparkles size={18} />,
        textColor: '#F3F4F6'
    },
    {
        id: 'medical',
        name: 'Kesehatan (Trust)',
        description: 'Steril, tenang, dan terpercaya.',
        hex: '#0D9488', // Teal / Medical Green
        icon: <HeartPulse size={18} />,
        textColor: '#FFFFFF'
    },
    {
        id: 'fashion',
        name: 'Fashion (Trendy)',
        description: 'Ekspresif dan penuh gaya.',
        hex: '#DB2777', // Pink / Magenta
        icon: <Shirt size={18} />,
        textColor: '#FFFFFF'
    },
    {
        id: 'coffee',
        name: 'Coffee (Cozy)',
        description: 'Nyaman, hangat, dan santai.',
        hex: '#78350F', // Brown / Coffee
        icon: <Coffee size={18} />,
        textColor: '#FFFFFF'
    },
    {
        id: 'education',
        name: 'Pendidikan (Edu)',
        description: 'Fokus, cerdas, dan profesional.',
        hex: '#4F46E5', // Indigo / Education
        icon: <GraduationCap size={18} />,
        textColor: '#FFFFFF'
    }
];
const listHero = [
    { id: 1, name: "Classic Split" },
    { id: 2, name: "Modern Floating Card" },
    { id: 3, name: "Modern Floating Card" },
    { id: 4, name: "Rustic Coffee" },
    { id: 5, name: "Cyber Tech" },
    { id: 6, name: "Vibrant Foodie" },
    { id: 7, name: "Elegant Property" },
    { id: 8, name: "Classic Barber" },
    { id: 9, name: "Industrial Service" },
    { id: 10, name: "Soft Laundry" },
    { id: 11, name: "Playful Pet" },
    { id: 12, name: "Music Dynamic" },
    { id: 13, name: "Fine Tailor" },
    { id: 14, name: "Typo Hero" },
    { id: 15, name: "Library Grid" },
]

export default function HeroPage() {
    const [selectedColor, setSelectedColor] = useState(BUSINESS_THEMES[0].hex);
    const [activeTab, setActiveTab] = useState(BUSINESS_THEMES[0].id);
    const [heroLayout, setHeroLayout] = useState<number>();
    const [displayMode, setDisplayMode] = useState('auto');


    const [title, setTitle] = useState("Rekomendasi Hari Ini");
    const [headline, setHeadline] = useState("PRODUK TERBAIK KAMI");
    const [subHeadline, setSubHeadline] = useState("Kualitas premium dengan harga yang sangat terjangkau khusus untuk Anda.");
    const [ctaText, setCtaText] = useState("Pesan Sekarang");
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [heroFile, setHeroFile] = useState<File | null>(null);
    const [imageHero, setImageHero] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    // Fungsi untuk menghitung kontras teks secara otomatis
    const getContrastColor = (hex: string) => {
        if (!hex) return '#1e293b';
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#1e293b' : '#ffffff';
    };

    const currentTextColor = getContrastColor(selectedColor);

    // Efek samping untuk memperbarui CSS Variables di root secara dinamis
    useEffect(() => {
        // 1. Set Primary Color (Warna Background)
        document.documentElement.style.setProperty('--hero-primary-color', selectedColor);

        // 2. Set Secondary Color (Warna Teks/Kontras)
        document.documentElement.style.setProperty('--hero-secondary-color', currentTextColor);

        // 3. Set RGB values untuk kebutuhan transparansi (misal: rgba(var(--hero-primary-rgb), 0.5))
        const r = parseInt(selectedColor.slice(1, 3), 16);
        const g = parseInt(selectedColor.slice(3, 5), 16);
        const b = parseInt(selectedColor.slice(5, 7), 16);
        document.documentElement.style.setProperty('--hero-primary-rgb', `${r}, ${g}, ${b}`);

        const tr = parseInt(currentTextColor.slice(1, 3), 16);
        const tg = parseInt(currentTextColor.slice(3, 5), 16);
        const tb = parseInt(currentTextColor.slice(5, 7), 16);
        document.documentElement.style.setProperty('--hero-secondary-rgb', `${tr}, ${tg}, ${tb}`);
    }, [selectedColor, currentTextColor]);

    // Menentukan headline berdasarkan kategori aktif
    const getHeadline = () => {
        switch (activeTab) {
            case 'property': return 'Hunian Minimalis Masa Kini';
            case 'fnb': return 'Rasa Otentik Setiap Saat';
            case 'tech': return 'Solusi Digital Masa Depan';
            case 'luxury': return 'Kemewahan Tanpa Batas';
            case 'medical': return 'Layanan Kesehatan Terpadu';
            case 'fashion': return 'Gaya Hidup Tanpa Batas';
            case 'coffee': return 'Ruang Cerita & Inspirasi';
            case 'education': return 'Wujudkan Masa Depan Cerah';
            default: return 'Inovasi Tanpa Henti';
        }
    };
    const handleFileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setHeroFile(file);
        const b64 = await handleFileToBase64(file);
        setImageHero(b64);
    };
    return (
        <MainLayout>

            <div className='bg-slate-100 rounded-xl'>
                <div className='bg-gray-200 w-full  rounded-t-xl flex items-center gap-2 py-2 px-6'>
                    <div className='bg-red-500 rounded-full h-4 w-4' />
                    <div className='bg-yellow-500 rounded-full h-4 w-4' />
                    <div className='bg-green-500 rounded-full h-4 w-4' />
                </div>
                <div className={`${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} rounded-b-xl`}>
                    <div className="min-h-screen font-sans ">
                        <div className="space-y-6">
                            <div className="space-y-2 p-4">
                                <label className="text-sm font-semibold uppercase tracking-wider text-gray-400">Pilih Kategori Warna</label>
                                {/* Business Presets */}
                                <div className="space-y-3">
                                    <div className="flex gap-2 max-h-[500px] overflow-x-auto pr-2  no-scrollbar rounded-xl">
                                        {BUSINESS_THEMES.map((theme) => (
                                            <button
                                                key={theme.id}
                                                onClick={() => {
                                                    setSelectedColor(theme.hex);
                                                    setActiveTab(theme.id);
                                                }}
                                                className={`w-full flex whitespace-nowrap items-center gap-3 p-3 rounded-xl border-2 transition-all ${activeTab === theme.id
                                                    ? 'border-indigo-600 bg-white shadow-md'
                                                    : 'border-transparent bg-gray-100 hover:bg-gray-200'
                                                    }`}
                                            >
                                                <div
                                                    className="p-2 rounded-lg text-white shrink-0"
                                                    style={{ backgroundColor: theme.hex }}
                                                >
                                                    {theme.icon}
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-bold text-slate-900 text-sm">{theme.name}</div>
                                                    <div className="text-xs text-gray-500 leading-tight line-clamp-1">{theme.description}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Picker */}
                                <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-3">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                        <Pipette size={16} />
                                        <span>Custom Warna Sendiri</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={selectedColor}
                                            onChange={(e) => {
                                                setSelectedColor(e.target.value);
                                                setActiveTab('custom');
                                            }}
                                            className="h-12 w-12  rounded-lg cursor-pointer border-none bg-transparent"
                                        />
                                        <div className="flex-1 px-3 py-2 bg-gray-50 text-slate-900 rounded-lg border border-gray-200 font-mono text-sm">
                                            {selectedColor.toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="sm:flex items-start gap-4">
                                        <div className="sm:w-1/2 space-y-1">
                                            <label className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Teks Hero</label>
                                            <div className="w-full space-y-2">
                                                <input
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    className="w-full p-2 text-sm text-slate-900 rounded-lg border-gray-300 border focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Headline Utama"
                                                />
                                                <input
                                                    value={headline}
                                                    onChange={(e) => setHeadline(e.target.value.toUpperCase())}
                                                    className="w-full p-2 text-sm text-slate-900 rounded-lg border-gray-300 border focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="Headline Utama"
                                                />
                                                <textarea
                                                    value={subHeadline}
                                                    onChange={(e) => setSubHeadline(e.target.value)}
                                                    className="w-full p-2 text-sm text-slate-900 rounded-lg border-gray-300 border h-16 outline-none"
                                                    placeholder="Sub-headline deskripsi..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <div className='sm:pt-6'>
                                                <input
                                                    value={ctaText}
                                                    onChange={(e) => setCtaText(e.target.value)}
                                                    className="w-full p-2 text-sm text-slate-900 rounded-lg border border-gray-300 outline-none"
                                                    placeholder="Teks Tombol"
                                                />
                                            </div>
                                            <div className="space-y-1 mt-2">
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-bold uppercase text-gray-500 block">Mode Tampilan Aplikasi:</span>
                                                    <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-xl">
                                                        <button
                                                            onClick={() => {
                                                                setDisplayMode('light')
                                                                setIsDarkMode(false)
                                                            }}
                                                            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${displayMode === 'light' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500'
                                                                }`}
                                                        >
                                                            <Sun size={14} /> Light
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDisplayMode('dark')
                                                                setIsDarkMode(true)
                                                            }}
                                                            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${displayMode === 'dark' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'
                                                                }`}
                                                        >
                                                            <Moon size={14} /> Dark
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDisplayMode('auto')
                                                                setIsDarkMode(false)
                                                            }}
                                                            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${displayMode === 'auto' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'
                                                                }`}
                                                        >
                                                            <SunMoon size={14} /> Auto
                                                        </button>
                                                    </div>
                                                </div>
                                                <label className="text-[10px] font-bold uppercase text-gray-500">Gambar</label>
                                                <div className='flex items-center gap-4'>
                                                    <button
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className={`flex items-center gap-2 p-2 text-sm bg-gray-300 hover:bg-gray-500 rounded-md transition-colors text-gray-900`}
                                                    >
                                                        <Upload className="w-4 h-4" /> {imageHero ? "Ganti" : "Upload"}
                                                    </button>
                                                    <button
                                                        // onClick={handleSubmit}
                                                        className="flex mb-1 items-center gap-2 p-2 text-sm bg-blue-600 text-white font-semibold hover:bg-blue-800 rounded-md transition-colors"
                                                    >
                                                        <Check className="w-4 h-4" /> Simpan Perubahan
                                                    </button>
                                                </div>

                                                <p className="text-[10px] text-slate-400 italic text-center">Gunakan gambar landscape untuk hasil terbaik.</p>
                                                <input type="file"
                                                    ref={fileInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={handleImageUpload} />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='relative pb-8 space-y-4 px-4'>
                                {
                                    heroLayout &&
                                    <>
                                        <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">Yang anda pilih No.{heroLayout}</label>
                                        <HeroConfig
                                            theme={heroLayout}
                                            isDarkMode={isDarkMode}
                                            headline={headline}
                                            subHeadline={subHeadline}
                                            ctaText={ctaText}
                                            imageHero={imageHero}
                                            title={title} />
                                    </>
                                }
                                {
                                    listHero?.map((lh, i) => (
                                        <div className='relative space-y-4' key={i}>
                                            {
                                                heroLayout === lh?.id ?
                                                    <div className='flex items-center gap-2 cursor-pointer'>
                                                        <CircleCheckBigIcon />
                                                        <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                                    </div> :
                                                    <div className='flex items-center gap-2 cursor-pointer' onClick={() => setHeroLayout(lh?.id)}>
                                                        <Circle />
                                                        <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                                    </div>
                                            }
                                            <HeroConfig
                                                theme={lh?.id}
                                                isDarkMode={isDarkMode}
                                                headline={headline}
                                                subHeadline={subHeadline}
                                                ctaText={ctaText}
                                                imageHero={imageHero}
                                                title={title} />
                                        </div>
                                    ))
                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}