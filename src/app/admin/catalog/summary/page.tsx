'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Palette, Home, Utensils, Cpu, Sparkles, Pipette, HeartPulse, Shirt, Coffee, GraduationCap, Upload, CircleCheckBigIcon, Circle, Sun, Moon, Check, CheckCircleIcon } from 'lucide-react';
import HeaderConfig from '@/Components/Config/Theme/Header';
import NavIcons from '@/Components/Config/Theme/Header/NavIcons';
import MainLayout from '@/Components/Layout/MainLayout';
import HeroConfig from '@/Components/Config/Theme/Hero';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Get } from '@/utils/Get';
import { Catalog } from '@/types/Admin/Catalog';
import CategorieConfig from '@/Components/Config/Theme/Categories';
import { ProductsType } from '@/types/Admin/ProductsType';
import ProductConfig from '@/Components/Config/Theme/Products';
import SummaryConfig from '@/Components/Config/Theme/Summary';

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

const ListSummary = [
    { id: 1, name: "Floating Pill" },
    { id: 2, name: "Compact Bar" },
    { id: 3, name: "Dynamic Bubble" },
    { id: 4, name: "Gradient Strip" },
    { id: 5, name: "Dark Tab" },
    { id: 6, name: "Glass Panel" },
    { id: 7, name: "Simple Border" },
    { id: 8, name: "Elevated Card" },
    { id: 9, name: "Ghost Minimal" },
    { id: 10, name: "Neon Accent" },
    { id: 11, name: "Full Pill Button" },
    { id: 12, name: "Retro Mini" },
    { id: 13, name: "Circle Hub" },
    { id: 14, name: "Soft Float" },
    { id: 15, name: "Split Action" },
]


export default function SummaryPage() {
    const [selectedColor, setSelectedColor] = useState(BUSINESS_THEMES[0].hex);
    const [activeTab, setActiveTab] = useState(BUSINESS_THEMES[0].id);
    const [summaryLayout, setSummaryLayout] = useState<number | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getCalog()
    }, []);
    const getCalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>('/catalog');

            if (res?.success) {

                // setCategorieLayout(res?.data?.categorie?.theme);
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
        document.documentElement.style.setProperty('--summary-primary-color', selectedColor);

        // 2. Set Secondary Color (Warna Teks/Kontras)
        document.documentElement.style.setProperty('--summary-secondary-color', currentTextColor);

        // 3. Set RGB values untuk kebutuhan transparansi (misal: rgba(var(--summary-primary-rgb), 0.5))
        const r = parseInt(selectedColor.slice(1, 3), 16);
        const g = parseInt(selectedColor.slice(3, 5), 16);
        const b = parseInt(selectedColor.slice(5, 7), 16);
        document.documentElement.style.setProperty('--summary-primary-rgb', `${r}, ${g}, ${b}`);

        const tr = parseInt(currentTextColor.slice(1, 3), 16);
        const tg = parseInt(currentTextColor.slice(3, 5), 16);
        const tb = parseInt(currentTextColor.slice(5, 7), 16);
        document.documentElement.style.setProperty('--summary-secondary-rgb', `${tr}, ${tg}, ${tb}`);
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
                            <div className={`flex p-4 overflow-auto w-full gap-4 thin-scroll ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                                {
                                    ListSummary?.map((ls, i) => (
                                        <div key={i} className='whitespace-nowrap bg-gray-200 text-gray-600 p-2 rounded-lg cursor-pointer flex items-center gap-2' onClick={() => setSummaryLayout(ls?.id)}>
                                            {ls?.id === summaryLayout ? <CheckCircleIcon /> : <Circle />}
                                            <span>{ls?.id}. {ls?.name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={`py-4 px-2 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                                <div className={`${isDarkMode ? "bg-slate-900" : "bg-slate-100"} rounded-lg`}>

                                    <div className='w-full flex items-center justify-center'>
                                        <div className='w-full max-w-6xl pb-4 pt-1 relative '>
                                            <div className='w-full space-y-2'>
                                                <div className={`${isDarkMode ? "bg-slate-600" : "bg-slate-200"} rounded-full  h-[42px] flex items-center px-4`}>
                                                    <p className={`${isDarkMode ? "text-slate-100" : "text-gray-600"} font-semibold opacity-40`}>Logo</p>
                                                </div>
                                                <div className={`h-[160px] ${isDarkMode ? "bg-gray-700" : "bg-gray-300"} rounded-lg`} />
                                                <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                                                    <div className={`h-[160px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`} />
                                                    <div className={`h-[160px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`} />
                                                    <div className={`h-[160px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`} />
                                                    <div className={`h-[160px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`} />
                                                    <div className={`h-[160px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`} />
                                                    <div className={`h-[160px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`} />
                                                    <div className={`h-[160px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`} />
                                                    <div className={`h-[160px] ${isDarkMode ? "bg-gray-700" : "bg-gray-200"} rounded-lg`} />
                                                </div>
                                            </div>
                                            <div className='absolute bottom-0 w-full'>
                                                <SummaryConfig theme={summaryLayout} isDarkMode={isDarkMode} totalCart={3} summary={100000} isBuild={true} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}