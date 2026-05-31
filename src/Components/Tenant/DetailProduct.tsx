"use client"
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { Get } from '@/utils/Get';
import { ArrowLeftIcon, MapPin, ScanBarcode, Tag } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import QtySelector from '../Config/Theme/Products/QtySelector';
import ExpandableHTML from '../Config/Theme/Products/ExpandableHTML';
import VariantPicker from '../Config/Theme/Products/VariantPicker';
import { Promo } from '../Config/Theme/Products/PromoType';
import Loading from '../Component/Loading';
import { Post } from '@/utils/Post';
import { OutletsType } from '@/types/Admin/OutletType';
import ModalScanProduct from './ModalScanProduct';

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


export default function DetailProduct() {
    const params = useParams();
    const [retryEffect, setRetreyEffect] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [outlet, setOutlet] = useState<OutletsType | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null)
    const [toast, setToast] = useState<string | null>(null);
    const [isOpenScan, setIsOpenScan] = useState<boolean>(false);
    const updateCssVariables = useCallback((type: 'header' | 'hero' | 'category' | 'product' | 'summary', color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);
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
    const fetDetailProduct = async () => {
        try {
            setLoading(true);
            const res = await Get<{ success: boolean; data: any }>(`/customer/detail-product/${params?.token}`);
            if (res?.success && res.data) {
                setProduct(res?.data?.products)
                setOutlet(res?.data?.outlet)
                if (res.data.product?.color) updateCssVariables('product', res.data.product?.color);
            }
        } catch (error) {
            // console.error("Failed to fetch catalog:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const device_id = localStorage.getItem('device_id');
        const token = localStorage.getItem('token');
        if (device_id && token) {
            fetDetailProduct()
        } else {
            getInitToken();
        }
    }, [updateCssVariables, retryEffect]);

    const handleCart = async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('product_id', String(product?.id));
            if (selectedVariant) {
                formData.append('variant_id', String(selectedVariant?.id));
            }
            formData.append('qty', String(quantity));
            const res = await Post<any, FormData>('/customer/add-cart', formData)
            if (res?.success) {
                setProduct((prev: any) => ({
                    ...prev,
                    product_stock: prev.product_stock - (Number(quantity) || 0),
                    variants: prev.variants?.map((v: any) => {
                        if (v.id === selectedVariant?.id) {
                            return {
                                ...v,
                                product_variant_stock:
                                    v.product_variant_stock - (Number(quantity) || 0),
                            };
                        }

                        return v;
                    }),
                }));
                setToast(`✓ Berhasil ditambah ke keranjang (${quantity}x ${product?.name} ${selectedVariant ? `(${selectedVariant?.name})` : ''}`)
            }
        } catch (e: any) {
            // console.error(e);
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        if (selectedVariant?.product_variant_stock && selectedVariant?.product_variant_stock < quantity) {
            setQuantity(selectedVariant?.product_variant_stock);
        }
    }, [selectedVariant])
    return (
        <div className="min-h-screen bg-[#FAFAFA] pb-16 text-slate-900 font-sans antialiased">
            <nav className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 shadow-xs">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => window.location.href = `/${params?.tenant}/${params?.outlet}`}
                        className="w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center transition-colors border border-slate-100"
                    >
                        <ArrowLeftIcon />
                    </button>

                    <span className="text-sm font-bold text-slate-800">Detail Produk</span>
                    <div className="relative">
                        <button
                            onClick={() => setIsOpenScan(true)}
                            className="w-9 h-9 rounded-xl hover:bg-slate-50 flex items-center justify-center transition-colors border border-slate-100"
                        >
                            <ScanBarcode />
                        </button>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <section className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-2xl  shadow-2xs  flex items-center justify-center aspect-square relative overflow-hidden group">
                            <img
                                src={selectedVariant?.image ?? product?.image}
                                alt={product?.name}
                                className="w-full h-full object-contain max-h-[350px] group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        {
                            product?.description || product?.description != '' ?
                                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-2xs p-6 md:p-8 space-y-4">
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Deskripsi Produk</h3>
                                    <ExpandableHTML
                                        htmlContent={product?.description}
                                        className="text-sm opacity-50 font-medium leading-relaxed max-w-md"
                                    />
                                    <div className="pt-4 border-t border-slate-100">
                                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Spesifikasi Detail</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        </div>
                                    </div>
                                </div> : ''
                        }
                    </section>
                    <section className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xs p-6 md:p-8 space-y-6">
                            <div className='flex items-center justify-left gap-4'>
                                {product?.category ?
                                    <span className="px-3 py-1 rounded-md bg-slate-900/10 text-slate-900 text-[10px] font-black uppercase tracking-widest border border-slate-900/20">
                                        {product?.category}
                                    </span> : ''
                                }
                                {product?.discount_price ? (
                                    <div className='text-rose-500 flex items-center font-bold text-sm gap-1'>
                                        <Tag size={14} />
                                        <span>Hemat {Promo(product, selectedVariant)}</span>
                                    </div>
                                ) : ''}
                            </div>
                            <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Harga Retail Terbaik</span>
                                <div className="flex items-baseline gap-2.5">
                                    <span className="text-2xl font-black text-slate-900">
                                        Rp {(selectedVariant?.final_price ?? product?.final_price)?.toLocaleString('id-ID')}
                                    </span>
                                    {
                                        product?.discount_price ? (
                                            <span className="text-xs font-bold text-slate-400 line-through">
                                                Rp {(selectedVariant?.price ?? product?.price)?.toLocaleString('id-ID')}
                                            </span>
                                        ) : ''
                                    }
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/40 p-4 rounded-xl space-y-3">
                                <div className="flex items-start gap-2.5">
                                    <span className="mt-0.5"><MapPin /></span>
                                    <div>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Lokasi Outlet</span>
                                        <h4 className="text-xs font-bold text-slate-800 mt-0.5">{outlet?.name}</h4>
                                        <p className="text-[11px] text-slate-500 font-medium leading-normal mt-0.5">{outlet?.address}</p>
                                    </div>
                                </div>
                                <div className='text-[11px] text-slate-500 font-medium leading-normal mt-0.5 flex items-center justify-between'>
                                    <p>{outlet?.day_open} - {outlet?.day_close}</p>
                                    <p>{outlet?.time_open} - {outlet?.time_close}</p>
                                </div>
                            </div>
                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    {product?.variants && product?.variants?.length > 0 && (
                                        <div className="space-y-4">
                                            <VariantPicker
                                                variants={product?.variants}
                                                selectedVariant={selectedVariant}
                                                setSelectedVariant={setSelectedVariant}
                                                isDarkMode={false}
                                            />
                                        </div>
                                    )}
                                </div>
                                {
                                    product && product.is_qty ?
                                        <QtySelector quantity={quantity} product={product} selectedVariant={selectedVariant} setQuantity={setQuantity} isDarkMode={false} /> : ""
                                }
                            </div>

                            {/* RINGKASAN PEMBELIAN & SUB-TOTAL */}
                            <div className="pt-4 border-t border-slate-200/60 space-y-3.5">
                                <div className="flex items-center justify-between text-xs">
                                    <div>
                                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Jumlah Pembelian</span>
                                        <span className="font-bold text-slate-800 mt-0.5 block">{quantity} X {product?.name} {selectedVariant ? `(${selectedVariant?.name})` : ''}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block">Subtotal</span>
                                        <span className="text-lg font-black text-slate-900 mt-0.5 block">
                                            Rp {((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                {/* Tombol Aksi Pembelian */}
                                <div className="space-y-2 pt-2">
                                    <button
                                        disabled={!outlet?.is_currently_open}
                                        onClick={handleCart}
                                        className="w-full py-3.5 disabled:bg-gray-600 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-2xs uppercase tracking-wider"
                                    >
                                        {outlet?.is_currently_open ? 'Beli Sekarang' : 'tutup'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-xs w-full">
                        {toast && (
                            <div
                                className="p-4 rounded-xl bg-slate-900 text-white shadow-xl text-xs font-bold flex items-center justify-between animate-in slide-in-from-bottom duration-200 border border-slate-800"
                            >
                                <span>{toast}</span>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            {isOpenScan && <ModalScanProduct onClose={() => setIsOpenScan(false)} />}
            {loading && <Loading />}
        </div>
    );
}