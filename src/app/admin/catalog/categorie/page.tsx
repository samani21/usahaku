'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Palette, Home, Utensils, Cpu, Sparkles, Pipette, HeartPulse, Shirt, Coffee, GraduationCap, Upload, CircleCheckBigIcon, Circle, Sun, Moon, Check } from 'lucide-react';
import HeaderConfig from '@/Components/Config/Theme/Header';
import NavIcons from '@/Components/Config/Theme/Header/NavIcons';
import MainLayout from '@/Components/Layout/MainLayout';
import HeroConfig from '@/Components/Config/Theme/Hero';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Get } from '@/utils/Get';
import { Catalog } from '@/types/Admin/Catalog';
import CategorieConfig from '@/Components/Config/Theme/Categorie';

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

const listCategorie = [
    { id: 1, name: "Modern Bento Grid" },
    { id: 2, name: "Minimalist Circles" },
    { id: 3, name: "Floating Glass Cards" },
    { id: 4, name: "Horizontal Stripes" },
    { id: 5, name: "Interactive Pills" },
    { id: 6, name: "Duotone Image Grid" },
    { id: 7, name: "Numbered Sophistication" },
    { id: 8, name: "Soft Neumorphism" },
    { id: 9, name: "Badge Cards" },
    { id: 10, name: "Typographic Focus" },
    { id: 11, name: "Vintage Polaroids" },
    { id: 12, name: "Glassmorphism Icons" },
    { id: 13, name: "Minimal Bordered" },
    { id: 14, name: "Accent Shadow Boxes" },
    { id: 15, name: "Modern Split Slides" },
]

export default function HeroPage() {
    const [selectedColor, setSelectedColor] = useState(BUSINESS_THEMES[0].hex);
    const [activeTab, setActiveTab] = useState(BUSINESS_THEMES[0].id);
    const [categorieLayout, setCategorieLayout] = useState<number>();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [categorie, setCategorie] = useState<CategoriesType[]>();

    useEffect(() => {
        getCalog()
    }, []);
    const getCalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');

            if (res?.success) {

                // setCategorieLayout(res?.data?.categorie?.theme);
                setCategorie(res?.data?.categories);
            }
        } finally {
            setLoading(false);
        }
    };
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
        document.documentElement.style.setProperty('--category-primary-color', selectedColor);

        // 2. Set Secondary Color (Warna Teks/Kontras)
        document.documentElement.style.setProperty('--category-secondary-color', currentTextColor);

        // 3. Set RGB values untuk kebutuhan transparansi (misal: rgba(var(--category-primary-rgb), 0.5))
        const r = parseInt(selectedColor.slice(1, 3), 16);
        const g = parseInt(selectedColor.slice(3, 5), 16);
        const b = parseInt(selectedColor.slice(5, 7), 16);
        document.documentElement.style.setProperty('--category-primary-rgb', `${r}, ${g}, ${b}`);

        const tr = parseInt(currentTextColor.slice(1, 3), 16);
        const tg = parseInt(currentTextColor.slice(3, 5), 16);
        const tb = parseInt(currentTextColor.slice(5, 7), 16);
        document.documentElement.style.setProperty('--category-secondary-rgb', `${tr}, ${tg}, ${tb}`);
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
                                        <div>
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase text-gray-500">Gambar</label>
                                                <div className='flex items-center gap-4'>

                                                    <button
                                                        onClick={() => setIsDarkMode(!isDarkMode)}
                                                        className={`p-2 ${isDarkMode ? "bg-slate-800" : "bg-slate-200"} rounded-lg transition-colors`}
                                                    >
                                                        {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
                                                    </button>
                                                    <button
                                                        // onClick={handleSubmit}
                                                        className="flex mb-1 items-center gap-2 p-2 text-sm bg-blue-600 text-white font-semibold hover:bg-blue-800 rounded-md transition-colors"
                                                    >
                                                        <Check className="w-4 h-4" /> Simpan Perubahan
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='relative pb-8 space-y-4 px-4'>
                                {
                                    categorieLayout &&
                                    <>
                                        <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">Yang anda pilih No.{categorieLayout}</label>
                                        {
                                            categorie &&
                                            <CategorieConfig
                                                theme={categorieLayout}
                                                categories={categorie}
                                                isDarkMode={isDarkMode} />
                                        }
                                    </>
                                }
                                {
                                    listCategorie?.map((lh, i) => (
                                        <div className='relative space-y-4' key={i}>
                                            {
                                                categorieLayout === lh?.id ?
                                                    <div className='flex items-center gap-2 cursor-pointer'>
                                                        <CircleCheckBigIcon />
                                                        <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                                    </div> :
                                                    <div className='flex items-center gap-2 cursor-pointer' onClick={() => setCategorieLayout(lh?.id)}>
                                                        <Circle />
                                                        <label className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-500 block">{lh?.id}. {lh?.name}</label>
                                                    </div>
                                            }
                                            {
                                                categorie &&
                                                <CategorieConfig
                                                    theme={lh?.id}
                                                    categories={categorie}
                                                    isDarkMode={isDarkMode} />
                                            }
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