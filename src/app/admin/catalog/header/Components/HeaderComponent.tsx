'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Palette, Home, Utensils, Cpu, Sparkles, Pipette, HeartPulse, Shirt, Coffee, GraduationCap, Upload, CircleCheckBigIcon, Circle } from 'lucide-react';
import HeaderConfig from '@/Components/Config/Theme/Header';
import NavIcons from '@/Components/Config/Theme/Header/NavIcons';

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
const listHeader = [
    { id: 1, name: "Header Satu" },
    { id: 2, name: "Header Dua" },
    { id: 3, name: "Header Tiga" },
    { id: 4, name: "Header Empat" },
    { id: 5, name: "Header Lima" },
    { id: 6, name: "Header Enam" },
    { id: 7, name: "Header Tujuh" },
    { id: 8, name: "Header Delapan" },
    { id: 9, name: "Header Sembilan" },
    { id: 10, name: "Header Sepuluh" },
    { id: 11, name: "Header Sebelas" },
    { id: 12, name: "Header Dua belas" },
    { id: 13, name: "Header Tiga Belas" },
    { id: 14, name: "Header Empat Belas" },
    { id: 15, name: "Header Lima Belas" },
]

export default function App() {
    const [selectedColor, setSelectedColor] = useState(BUSINESS_THEMES[0].hex);
    const [activeTab, setActiveTab] = useState(BUSINESS_THEMES[0].id);
    const [headerLayout, setHeaderLayout] = useState<number>();

    const [themeDark, setThemeDark] = useState<boolean>(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [frameType, setFrameType] = useState<"circle" | "square" | "none">("none"); // circle, square, none
    const [frameTheme, setFrameTheme] = useState<"dark" | "light">("dark"); // dark, light
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [spanOne, setSpanOne] = useState<string>("NAMA");
    const [spanTwo, setSpanTwo] = useState<string>("USAHA");
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
        document.documentElement.style.setProperty('--header-primary-color', selectedColor);

        // 2. Set Secondary Color (Warna Teks/Kontras)
        document.documentElement.style.setProperty('--header-secondary-color', currentTextColor);

        // 3. Set RGB values untuk kebutuhan transparansi (misal: rgba(var(--header-primary-rgb), 0.5))
        const r = parseInt(selectedColor.slice(1, 3), 16);
        const g = parseInt(selectedColor.slice(3, 5), 16);
        const b = parseInt(selectedColor.slice(5, 7), 16);
        document.documentElement.style.setProperty('--header-primary-rgb', `${r}, ${g}, ${b}`);

        const tr = parseInt(currentTextColor.slice(1, 3), 16);
        const tg = parseInt(currentTextColor.slice(3, 5), 16);
        const tb = parseInt(currentTextColor.slice(5, 7), 16);
        document.documentElement.style.setProperty('--header-secondary-rgb', `${tr}, ${tg}, ${tb}`);
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

    const handleLogoUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoFile(file);
        const b64 = await handleFileToBase64(file);
        setLogo(b64);
    };
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-900">
            <div className="max-w-5xl mx-auto space-y-8">

                <div className="space-y-6">

                    {/* Sidebar: Selection Controls */}
                    <div className="space-y-2">

                        {/* Business Presets */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold uppercase tracking-wider text-gray-400">Pilih Kategori Warna</label>
                            <div className="flex gap-2 max-h-[500px] overflow-x-auto pr-2  no-scrollbar ">
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
                                            <div className="font-bold text-sm">{theme.name}</div>
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
                                    className="h-12 w-12 rounded-lg cursor-pointer border-none bg-transparent"
                                />
                                <div className="flex-1 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200 font-mono text-sm">
                                    {selectedColor.toUpperCase()}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-gray-500">Nama Usaha (2 Span)</label>
                                <div className="flex gap-2">
                                    <input
                                        value={spanOne}
                                        onChange={(e) => setSpanOne(e.target.value)}
                                        placeholder="Span 1"
                                        className="w-1/2 p-2 text-sm rounded-lg border border-gray-300"
                                    />
                                    <input
                                        value={spanTwo}
                                        onChange={(e) => setSpanTwo(e.target.value)}
                                        placeholder="Span 2"
                                        className="w-1/2 p-2 text-sm rounded-lg border border-gray-300"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1" onClick={() => fileInputRef.current?.click()}>
                                <label className="text-[10px] font-bold uppercase text-gray-500">Logo</label>
                                <button

                                    className="flex items-center gap-2 p-2 text-sm bg-gray-300 hover:bg-gray-500 rounded-md transition-colors"
                                >
                                    <Upload className="w-4 h-4" /> {logo ? "Ganti" : "Upload"}
                                </button>
                                <input type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleLogoUpload} />
                            </div>
                            <div className="flex flex-wrap gap-6 border-t border-gray-300 py-3  ">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold uppercase text-gray-500">Tipe Frame:</span>
                                    {['circle', 'square', 'none'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setFrameType(t as "circle" | "square" | "none")}
                                            className={`text-xs px-3 py-1 rounded-full border transition-all ${frameType === t ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-300  border-transparent'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold uppercase text-gray-500">Tema Frame:</span>
                                    {['dark', 'light'].map(th => (
                                        <button
                                            key={th}
                                            onClick={() => setFrameTheme(th as "dark" | "light")}
                                            className={`text-xs px-3 py-1 rounded-full border transition-all ${frameTheme === th ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-300  border-transparent'}`}
                                        >
                                            {th}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='bg-slate-100 rounded-xl'>
                        <div className='bg-gray-200 w-full  rounded-t-xl flex items-center gap-2 py-2 px-6'>
                            <div className='bg-red-500 rounded-full h-4 w-4' />
                            <div className='bg-yellow-500 rounded-full h-4 w-4' />
                            <div className='bg-green-500 rounded-full h-4 w-4' />
                        </div>
                        <div className=''>
                            <HeaderConfig
                                layout={1}
                                themeMode={themeDark ? "dark" : "light"}
                                isBuild={true}
                                logoImage={logo}
                                frameType={frameType}
                                frameTheme={frameTheme}
                                setSidebarOpen={setSidebarOpen}
                                toggleTheme={() => setThemeDark(!themeDark)} />
                        </div>
                    </div> */}
                    <div className='relative pb-8 space-y-4'>
                        {
                            listHeader?.map((lh, i) => (
                                <div className='relative space-y-4' key={i}>
                                    {
                                        headerLayout === lh?.id ?
                                            <div className='flex items-center gap-2 cursor-pointer'>
                                                <CircleCheckBigIcon />
                                                <p className='font-semibold text-gray-600'>{lh?.name}</p>
                                            </div> :
                                            <div className='flex items-center gap-2 cursor-pointer' onClick={() => setHeaderLayout(lh?.id)}>
                                                <Circle />
                                                <p className='font-semibold text-gray-600'>{lh?.name}</p>
                                            </div>
                                    }
                                    <HeaderConfig
                                        layout={lh?.id}
                                        themeMode={themeDark ? "dark" : "light"}
                                        isBuild={true}
                                        logoImage={logo}
                                        frameType={frameType}
                                        frameTheme={frameTheme}
                                        setSidebarOpen={setSidebarOpen}
                                        toggleTheme={() => setThemeDark(!themeDark)}
                                        spanOne={spanOne}
                                        spanTwo={spanTwo} />
                                </div>
                            ))
                        }

                    </div>

                    <div className={`sm:hidden fixed left-0 p-2 z-10 ${themeDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} bottom-0 w-full`}>
                        <NavIcons colorClass={`text-[var(--header-primary-color)]`} setSidebarOpen={setSidebarOpen} toggleTheme={() => setThemeDark(!themeDark)} themeMode={themeDark ? "dark" : "light"} />
                    </div>
                </div>
            </div>
        </div>
    );
}