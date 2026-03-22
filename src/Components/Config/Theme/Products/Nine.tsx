import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Plus, ShoppingCart, Zap } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails, Promo } from './PromoType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;
}

const Nine = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);
    const disableButton = useMemo(() => {
        if (product) {
            if (product?.variants?.length > 0 && !selectedVariant) {
                return true;
            } else {
                if (product?.variants?.length === 0) {
                    return false;
                } else {
                    return false;
                }
            }
        }
    }, [product, selectedVariant])
    const mockItem = useMemo(() => {
        return {
            name: product?.name,
            price: product?.final_price,
            image: product?.image,
            category: product?.category,
            quantity: quantity
        }
    }, [activeAlert])
    useEffect(() => {
        if (activeAlert) {
            const timer = setTimeout(() => setActiveAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [activeAlert]);
    useEffect(() => {
        if (product) {
            // Jika modal aktif (product tidak null), kunci scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Jika modal tutup, kembalikan scroll
            document.body.style.overflow = 'unset';
        }

        // Cleanup function untuk memastikan scroll kembali normal jika komponen unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [product]);
    const addCart = () => {
        setActiveAlert(true);
        setProduct(null);
        setSelectedVariant(null);
        setQuantity(1)
        if (handleCart) {
            handleCart(product, selectedVariant, quantity)
        }
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                return (
                    <div
                        onClick={() => setProduct(p)}
                        key={i}
                        className={`col-span-1 md:col-span-2 flex h-36 sm:h-48 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] border-2 group ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-2xl shadow-black/50 text-white' : 'bg-white border-slate-100 shadow-md shadow-slate-200 text-slate-900'}`}
                    >
                        <div className="w-2/5 h-full relative overflow-hidden">
                            <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                            {label && (
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] sm:text-[10px] font-black px-2 py-0.5 rounded-lg">
                                    {label}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                            {p.category && (
                                <span className="text-[10px] sm:text-[12px] font-black opacity-50 uppercase tracking-widest mb-1">
                                    {p.category}
                                </span>
                            )}
                            <h3 className="font-black text-base sm:text-2xl uppercase italic leading-none mb-2 line-clamp-1">
                                {p.name}
                            </h3>
                            <div className="flex items-center justify-between mt-auto sm:mt-2">
                                <div className="flex flex-col">
                                    {label && <span className="text-[10px] line-through opacity-30 font-bold -mb-1">{formatIDR(p.price)}</span>}
                                    <p className="font-black text-lg sm:text-2xl text-red-500 italic leading-none">{formatIDR(finalPrice)}</p>
                                </div>
                                <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-colors ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            <ModalWrapper
                activeModal={product ? true : false}
                closeModal={() => {
                    setProduct(null)
                    setSelectedVariant(null)
                    setQuantity(1)
                }}
                isDarkMode={isDarkMode}>
                <div className="relative w-full md:overflow-auto md:overflow-x-hidden no-scrollbar min-h-full">
                    {/* Background Blur Effect */}
                    <div className="absolute inset-0 pointer-events-none">
                        <img src={product?.image} className="w-full h-full object-cover blur-3xl opacity-20" alt="" />
                    </div>

                    <div className="relative w-full  p-4  md:p-20 md:pt-10 flex flex-col items-center">
                        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-12 md:gap-20">

                            {/* Bagian Gambar (Bingkai Tebal) */}
                            <div className="w-full md:w-1/2 aspect-[4/5] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white/10 dark:border-white/5 relative">
                                <img
                                    src={selectedVariant?.image ?? product?.image}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    alt=""
                                />
                                {product?.discount_price && (
                                    <div className="absolute top-6 left-6 bg-[var(--product-primary-color)] text-white px-6 py-2 rounded-2xl font-black italic shadow-xl">
                                        - {Promo(product, selectedVariant)}
                                    </div>
                                )}
                            </div>

                            {/* Bagian Detail */}
                            <div className="w-full md:w-1/2 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">{product?.category}</span>
                                        {product?.stock && (
                                            <span className="flex items-center gap-1 text-[10px] font-black uppercase text-emerald-500 italic">
                                                <Check size={12} strokeWidth={4} /> {product?.stock} Ready
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter leading-[0.9] uppercase">
                                            {product?.name}
                                        </h2>
                                        <div className={`h-2 w-24 bg-[var(--product-primary-color)] rounded-full shadow-lg shadow-blue-500/20`} />
                                    </div>
                                </div>

                                <ExpandableHTML
                                    htmlContent={product?.description}
                                    className={`text-sm md:text-base opacity-70 leading-relaxed font-light italic`}
                                />

                                <div className="flex flex-col gap-6">
                                    {/* Harga Section */}
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase opacity-30 tracking-widest italic">Harga Per Item</p>
                                        <div className="flex items-baseline gap-3">
                                            <div className="text-xl md:text-2xl font-black italic tracking-tighter text-[var(--product-primary-color)]">
                                                {formatIDR(selectedVariant?.final_price || product?.final_price || 0)}
                                            </div>
                                            {product?.discount_price && (
                                                <div className="text-md font-bold opacity-30 line-through italic">
                                                    {formatIDR(selectedVariant?.price || product?.price)}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Varian & Qty Area */}
                                    <div className="pt-6 border-t border-black/5 dark:border-white/5 space-y-8">
                                        {product?.variants && product?.variants?.length > 0 && (
                                            <VariantPicker
                                                variants={product?.variants}
                                                selectedVariant={selectedVariant}
                                                setSelectedVariant={setSelectedVariant}
                                                isDarkMode={isDarkMode}
                                            />
                                        )}

                                        <div className='flex items-end justify-between gap-4 bg-black/5 dark:bg-white/5 p-6 rounded-[2.5rem]'>
                                            {product?.is_qty ? (
                                                <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                            ) : <div></div>}
                                            <div className='text-right'>
                                                <p className={`text-[10px] font-black uppercase opacity-40 mb-1 italic ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>Estimasi Total</p>
                                                <p className='text-lg sm:text-2xl font-black italic tracking-tighter'>
                                                    {formatIDR((selectedVariant?.final_price || product?.final_price || 0) * quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tombol Utama */}
                                    <button
                                        disabled={disableButton}
                                        onClick={() => addCart()}
                                        className={`w-full py-6 md:py-8 bg-[var(--product-primary-color)] text-white rounded-[2.5rem] font-black uppercase italic tracking-[0.2em] text-sm md:text-base shadow-2xl shadow-blue-600/40 hover:scale-[1.02] transition-all active:scale-95 disabled:bg-gray-600 flex items-center justify-center gap-4`}
                                    >
                                        <Zap size={24} fill="white" />
                                        Order Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="center">
                <div className={`${isDarkMode ? "bg-slate-900" : "bg-slate-200"} text-white p-10 rounded-[3.5rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10 text-center space-y-6`}>
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-[1.5rem] rotate-12 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                        <Check size={32} />
                    </div>
                    <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
                        <h3 className="text-2xl font-black italic tracking-tighter">BELANJAAN AMAN!</h3>
                        <p className="text-sm opacity-40 mt-1">Item favoritmu sudah kami simpan.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => setActiveAlert(false)} className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs">Tutup</button>
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Nine