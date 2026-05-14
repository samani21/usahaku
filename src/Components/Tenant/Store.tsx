"use client"
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Loading from '@/Components/Component/Loading';
import HeaderConfig from '@/Components/Config/Theme/Header';
import { Catalog } from '@/types/Admin/Catalog/Catalog';
import { Get } from '@/utils/Get';
import HeroConfig from '@/Components/Config/Theme/Hero';
import CategorieConfig from '@/Components/Config/Theme/Categories';
import ProductConfig from '@/Components/Config/Theme/Products';
import SummaryConfig from '@/Components/Config/Theme/Summary';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { v4 as uuidv4 } from "uuid";
import { Post } from '@/utils/Post';
import { useParams, useRouter } from 'next/navigation';
import { ChevronDown, MapPin } from 'lucide-react';
import ModalOutlet from './ModalOutlet';
import { OutletsType } from '@/types/Admin/OutletType';


interface Cart {
    item: number,
    amount: number
}

interface CatalogType extends Catalog {
    cart: Cart;
    outlet: OutletsType;
}

const getContrastColor = (hex: string | undefined) => {
    if (!hex) return '#1e293b';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#ffffff';
};

const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};


export default function Store() {
    const { outlet } = useParams();
    const outletName = typeof outlet === 'string'
        ? decodeURIComponent(outlet)
        : '';
    const [loading, setLoading] = useState<boolean>(true);
    const [catalogData, setCatalogData] = useState<CatalogType | null>(null);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [selectCategorie, setSeletctCategorie] = useState<string | null>(null);
    const [cartItem, setCartItem] = useState<Cart>({
        item: 0,
        amount: 0
    })
    const [retryEffect, setRetreyEffect] = useState<boolean>(false);
    const updateCssVariables = useCallback((type: 'header' | 'hero' | 'category' | 'product' | 'summary', color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedOutlet, setSelectedOutlet] = useState<OutletsType | null>(null);
    const [dataProduct, setdataProducts] = useState<ProductsType[]>([]);
    const [tenant, setTenant] = useState<string>('');
    useEffect(() => {
        const path = window.location.pathname;
        let tenant: string | null = null;
        const segments = path.split("/").filter(Boolean);
        if (segments.length > 0) {
            setTenant(segments[0]);
        }

    }, [])

    useEffect(() => {
        const primary = isDarkTheme ? '#020617' : '#f8fafc';   // slate-950 / slate-50
        const secondary = isDarkTheme ? '#f8fafc' : '#020617'; // kebalikannya

        const root = document.documentElement;
        root.style.setProperty('--mode-primary', primary);
        root.style.setProperty('--mode-secondary', secondary);
    }, [isDarkTheme]);
    const fetchCatalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: CatalogType }>(`/customer/tenant`);
            if (res?.success && res.data) {
                setCatalogData(res.data);
                setIsDarkTheme(res.data.header?.mode === 'dark');
                setdataProducts(res?.data?.products)
                setCartItem({
                    item: res?.data?.cart?.item,
                    amount: res?.data?.cart?.amount
                })
                setSelectedOutlet(res?.data?.outlet)
                // Update CSS variables if colors exist
                if (res.data.header?.color) updateCssVariables('header', res.data.header.color);
                if (res.data.hero?.color) updateCssVariables('hero', res.data.hero.color);
                if (res.data.category?.color) updateCssVariables('category', res.data.category.color);
                if (res.data.product?.color) updateCssVariables('product', res.data.product.color);
                if (res.data.summary?.color) updateCssVariables('summary', res.data.summary.color);
            }
        } catch (error) {
            // console.error("Failed to fetch catalog:", error);
        } finally {
            setLoading(false);
        }
    };

    const getInitToken = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('/customer/init')
            if (res?.success) {
                localStorage.setItem("device_id", res?.data.device_id)
                localStorage.setItem("token", res?.data.token)
                setRetreyEffect(true);
            }
        } catch (e: any) {
            // console.error(e)
        }
    }

    useEffect(() => {
        const device_id = localStorage.getItem('device_id');
        const token = localStorage.getItem('token');
        if (device_id && token) {
            fetchCatalog()
        } else {
            getInitToken();
        }
    }, [updateCssVariables, retryEffect]);


    const header = catalogData?.header;
    const hero = catalogData?.hero;
    const category = catalogData?.category;
    const categories = catalogData?.categories;
    const product = catalogData?.product
    const products = useMemo(() => {
        if (!dataProduct) return []

        if (selectCategorie) {
            return dataProduct.filter(
                (p) => p?.category === selectCategorie
            )
        }

        return dataProduct
    }, [catalogData, selectCategorie, dataProduct])
    const summary = catalogData?.summary;


    const handleCart = async (p: ProductsType | null, v: Variants | null, qty: number) => {
        // setLoading(true)
        try {
            const formData = new FormData();
            formData.append('product_id', String(p?.id));
            if (v) {
                formData.append('variant_id', String(v?.id));
            }
            formData.append('qty', String(qty));
            const res = await Post<any, FormData>('/customer/add-cart', formData)
            if (res?.success) {
                console.log('res?.cartItem', res)
                setCartItem({
                    item: res?.data?.cartItem?.item,
                    amount: res?.data?.cartItem?.amount
                })

                const productNew: ProductsType[] = products?.map((p) => {
                    // hanya update product yang cocok
                    if (p.id === Number(res?.data?.item?.product_id)) {
                        let updatedProduct = {
                            ...p,
                            product_stock: (p.product_stock ?? 0) - (Number(res?.data?.qty) ?? 0),
                        };

                        // 👉 jika ada variant_id
                        if (res?.data?.item?.variant_id) {
                            updatedProduct = {
                                ...updatedProduct,
                                variants: p.variants?.map((v) => {
                                    if (v.id === Number(res?.data?.item?.variant_id)) {
                                        return {
                                            ...v,
                                            product_variant_stock:
                                                (v.product_variant_stock ?? 0) - (Number(res?.data?.qty) ?? 0),
                                        };
                                    }
                                    return v;
                                }) ?? [],
                            };
                        }

                        return updatedProduct;
                    }

                    return p;
                }) ?? [];

                setdataProducts(productNew);
            }
        } catch (e: any) {
            // console.error(e);
        } finally {
            // setLoading(false)
        }

    }

    if (loading) return <Loading title='Sedang memuat halaman' />;

    return (
        <div className={`flex flex-col overflow-hidden  items-center justify-center ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className='max-w-7xl  min-h-screen w-full space-y-6 relative'>
                <div className='fixed z-40  w-full max-w-7xl'>
                    {header && (
                        <HeaderConfig
                            layout={header.layout_header}
                            themeMode={isDarkTheme || header?.mode == 'dark' ? "dark" : "light"}
                            logoImage={header.logo}
                            frameType={header.type_frame}
                            frameTheme={header.color_frame}
                            toggleTheme={() => setIsDarkTheme(!isDarkTheme)}
                            spanOne={header.span_one}
                            spanTwo={header.span_two}
                            displayMode={header.mode}
                        />
                    )}
                </div>
                <div className={`mt-8 space-y-6 ${header?.layout_header === 3 ? "pt-26" : 'pt-16'} pb-18 px-2 `}>
                    <div className='flex items-center justify-center'>
                        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-5 md:p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-6 z-20">

                            {/* Lokasi Detail */}
                            <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-slate-100 pb-5 md:pb-0 md:pr-8">
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-3">
                                    {selectedOutlet ? 'Lokasi Terpilih' : 'Lokasi Belum Dipilih'}
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${selectedOutlet ? 'bg-teal-50 text-[#149184]' : 'bg-slate-100 text-slate-400'}`}>
                                        <MapPin size={24} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-xl font-bold leading-none ${selectedOutlet ? 'text-slate-800' : 'text-slate-400 italic'}`}>
                                            {selectedOutlet ? selectedOutlet.name : 'Pilih outlet terdekat...'}
                                        </span>
                                        <span className="text-sm text-slate-500 mt-1 uppercase tracking-wider">
                                            {selectedOutlet ? selectedOutlet.address : 'Klik tombol cari di samping'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Info */}
                            <div className="flex-1 w-full pb-5 md:pb-0 md:px-4">
                                <label className="block text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-3">Ketersediaan Stok</label>
                                <div className="flex items-center gap-3">
                                    {selectedOutlet ? (
                                        <>
                                            <div className="relative flex h-3 w-3">
                                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedOutlet.is_currently_open ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                                <span className={`relative inline-flex rounded-full h-3 w-3 ${selectedOutlet.is_currently_open ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700">
                                                {selectedOutlet.is_currently_open ? 'Produk Tersedia di Outlet Ini' : 'Outlet sedang Tutup'}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-sm font-medium text-slate-400">Silahkan pilih lokasi untuk cek stok</span>
                                    )}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                onClick={() => setIsOpenModal(true)}
                                className={`w-full md:w-auto px-10 py-4 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${selectedOutlet
                                    ? 'bg-[#149184] text-white hover:bg-[#0f6e65]'
                                    : 'bg-slate-900 text-white hover:bg-black animate-bounce md:animate-none'
                                    } hover:shadow-lg hover:shadow-teal-900/20`}
                            >
                                {selectedOutlet ? 'Ganti Outlet' : 'Cari Outlet'}
                                <ChevronDown size={18} className={selectedOutlet ? '' : '-rotate-90'} />
                            </button>
                        </div>
                    </div>
                    {hero && (
                        <HeroConfig
                            theme={hero?.layout_hero}
                            isDarkMode={hero?.mode === 'light' ? false : isDarkTheme || hero?.mode == 'dark'}
                            headline={hero?.headline}
                            subHeadline={hero?.sub_headline}
                            ctaText={hero?.cta}
                            imageHero={hero?.image ?? null}
                            title={hero?.title} />
                    )}
                    {
                        categories && category &&
                        <CategorieConfig
                            theme={category?.layout_categories}
                            categories={categories}
                            isDarkMode={category?.mode === 'light' ? false : isDarkTheme || category?.mode == 'dark'}
                            onClick={(e) => setSeletctCategorie(e)} />
                    }
                    <section id="product-section">
                        {
                            product && products &&
                            <ProductConfig
                                theme={product?.layout_products}
                                products={products}
                                isDarkMode={product?.mode === 'light' ? false : isDarkTheme || product?.mode == 'dark'}
                                handleCart={handleCart} />
                        }
                    </section>
                    <div className='fixed bottom-0 w-full flex z-20 items-center justify-center left-0'>
                        <div className='max-w-7xl w-full'>
                            {
                                summary && cartItem?.item > 0 &&
                                <SummaryConfig
                                    theme={summary?.layout_summary}
                                    isDarkMode={summary?.mode === 'light' ? false : isDarkTheme || category?.mode == 'dark'}
                                    totalCart={cartItem?.item}
                                    summary={cartItem?.amount}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                isOpenModal && <ModalOutlet onClose={() => setIsOpenModal(false)} onSelect={(outlet: OutletsType) => { setSelectedOutlet(outlet); setIsOpenModal(false) }} tenant={tenant} />
            }
        </div>
    );
}