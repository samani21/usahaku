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

type Props = {
    tenant: string;
}

export default function Store({ tenant }: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [catalogData, setCatalogData] = useState<Catalog | null>(null);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [selectCategorie, setSeletctCategorie] = useState<string | null>(null);
    const [cartItem, setCartItem] = useState<{
        item: number,
        amount: number
    }>({
        item: 0,
        amount: 0
    })
    const updateCssVariables = useCallback((type: 'header' | 'hero' | 'category' | 'product' | 'summary', color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);

    const fetchCatalog = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: Catalog }>(`/catalog/${tenant}`);
            if (res?.success && res.data) {
                setCatalogData(res.data);
                setIsDarkTheme(res.data.header?.mode === 'dark');

                // Update CSS variables if colors exist
                if (res.data.header?.color) updateCssVariables('header', res.data.header.color);
                if (res.data.hero?.color) updateCssVariables('hero', res.data.hero.color);
                if (res.data.category?.color) updateCssVariables('category', res.data.category.color);
                if (res.data.product?.color) updateCssVariables('product', res.data.product.color);
                if (res.data.summary?.color) updateCssVariables('summary', res.data.summary.color);
            }
        } catch (error) {
            console.error("Failed to fetch catalog:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCatalog();
    }, [updateCssVariables]);


    const header = catalogData?.header;
    const hero = catalogData?.hero;
    const category = catalogData?.category;
    const categories = catalogData?.categories;
    const product = catalogData?.product
    const products = useMemo(() => {
        if (!catalogData?.products) return []

        if (selectCategorie) {
            return catalogData.products.filter(
                (p) => p?.category === selectCategorie
            )
        }

        return catalogData.products
    }, [catalogData, selectCategorie])
    const summary = catalogData?.summary;

    if (loading) return <Loading title='Sedang memuat halaman' />;
    const handleCart = (p: ProductsType | null, v: Variants | null, qty: number) => {
        console.log(p, v)
        const amount = v ? v?.final_price : p?.final_price;
        setCartItem({
            item: cartItem?.item + qty,
            amount: cartItem?.amount + (qty * (amount ?? 0))
        })
    }
    return (
        <div className={`flex flex-col  items-center justify-center ${isDarkTheme ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
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
                <div className={`mt-12 space-y-6 ${header?.layout_header === 3 ? "pt-26" : 'pt-16'} pb-18 px-2 `}>
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
                    {
                        product && products &&
                        <ProductConfig
                            theme={product?.layout_products}
                            products={products}
                            isDarkMode={category?.mode === 'light' ? false : isDarkTheme || category?.mode == 'dark'}
                            handleCart={handleCart} />
                    }
                    <div className='fixed bottom-0 w-full flex z-3 items-center justify-center left-0'>
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
            {/* Tambahkan Section Hero di sini menggunakan catalogData?.hero */}
        </div>
    );
}