import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Minus, Package, Plus } from 'lucide-react';
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

const Fourteen = ({ products, isDarkMode, handleCart }: Props) => {
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

    const currentPrice = selectedVariant?.price ?? product?.price ?? 0;
    const currentFinalPrice = selectedVariant?.final_price ?? product?.final_price ?? 0;
    const currentDiscount = currentPrice - currentFinalPrice;

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
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                const bgColor = isDarkMode ? 'bg-slate-800' : 'bg-white';
                return (
                    <div
                        key={p.id}
                        onClick={() => setProduct(p)}
                        className={`relative flex flex-col h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl group hover:-translate-y-2 transition-all duration-300 ${bgColor}`}
                    >
                        {/* Bagian Gambar */}
                        <div className="relative h-1/2 overflow-hidden">
                            <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                            {label && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-md skew-x-[-10deg]">
                                    {label}
                                </div>
                            )}
                        </div>

                        {/* Konten Tiket */}
                        <div className="flex-1 p-6 relative flex flex-col justify-between">
                            {/* Efek Lubang Tiket (Samping) */}
                            <div className={`absolute -top-4 left-0 w-8 h-8 rounded-full bg-[var(--mode-primary)] -ml-4 shadow-inner`} />
                            <div className={`absolute -top-4 right-0 w-8 h-8 rounded-full bg-[var(--mode-primary)] -mr-4 shadow-inner`} />

                            {/* Garis Putus-putus Pemisah */}
                            <div className="border-t-2 border-dashed border-slate-400/30 absolute top-0 left-6 right-6" />

                            <div className="mt-2">
                                {p.category && (
                                    <span className="text-[12px] font-black opacity-40 uppercase tracking-widest">{p.category}</span>
                                )}
                                <h3 className="font-black text-lg mt-1 leading-tight uppercase italic line-clamp-2 group-hover:text-red-500 transition-colors">
                                    {p.name}
                                </h3>
                            </div>

                            <div className="flex flex-col items-start gap-1">
                                {label && (
                                    <span className="text-xs line-through opacity-40 font-bold">
                                        {formatIDR(p.price)}
                                    </span>
                                )}
                                <div className="w-full flex justify-between items-center">
                                    <p className="text-2xl font-black tracking-tighter">{formatIDR(finalPrice)}</p>
                                    <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-black">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            <ModalWrapper
                activeModal={product ? true : false}
                closeModal={() => {
                    setProduct(null);
                    setSelectedVariant(null);
                    setQuantity(1);
                }}
                isDarkMode={isDarkMode}
            >
                {/* Bagian Gambar: Di Mobile tingginya terbatas agar tidak menutupi seluruh layar */}
                <div className="w-full h-[30vh] md:h-[40vh] relative bg-black/20 shrink-0">
                    <img
                        src={selectedVariant?.image ?? product?.image}
                        className='h-full w-full object-cover transition-all duration-500'
                        alt={product?.name}
                    />
                    {product?.discount_price && (
                        <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1.5 rounded-xl font-black text-lg shadow-lg">
                            - {Promo(product, selectedVariant)}
                        </div>
                    )}
                </div>

                {/* Bagian Detail: Scrollable di mobile */}
                <div className="w-full p-6 md:p-10 flex flex-col gap-4 relative overflow-y-auto no-scrollbar">
                    {/* Ornamen Lingkaran Tiket (Hanya Desktop) */}
                    <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-slate-950 -translate-y-1/2 shadow-inner" />
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-slate-950 -translate-y-1/2 shadow-inner" />

                    <div className="space-y-1">
                        {product?.category && (
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                                {product?.category}
                            </span>
                        )}
                        <h2 className="text-2xl md:text-4xl font-black leading-tight italic uppercase break-words">{product?.name}</h2>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-2xl md:text-4xl font-black text-[var(--product-primary-color)] italic">
                                {formatIDR(currentFinalPrice)}
                            </span>
                            {currentDiscount > 0 && (
                                <span className="text-sm md:text-lg font-bold opacity-30 line-through decoration-rose-500">
                                    {formatIDR(currentPrice)}
                                </span>
                            )}
                        </div>

                        {currentDiscount > 0 && (
                            <div className="inline-flex self-start px-2 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg font-bold text-[10px] uppercase italic">
                                Hemat {formatIDR(currentDiscount)}
                            </div>
                        )}
                    </div>

                    <ExpandableHTML
                        htmlContent={product?.description}
                    />

                    <div className="space-y-5 pt-2">
                        {/* Varian Selector - Horizontal Scroll di Mobile jika banyak */}
                        {product?.variants && product?.variants?.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold uppercase opacity-40">Pilih Varian</p>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants.map((v) => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariant(v)}
                                            className={`px-4 py-2 rounded-xl border-2 transition-all font-bold text-xs ${selectedVariant?.id === v.id ? 'border-[var(--product-primary-color)] bg-[var(--product-primary-color)] text-white shadow-md' : 'border-white/10 hover:border-white/30'}`}
                                        >
                                            {v.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Qty & Subtotal Box */}
                        <div className='flex flex-row items-center justify-between gap-4 p-4 bg-white/5 rounded-3xl border border-white/5'>
                            {product?.is_qty ? (
                                <div className="flex items-center gap-2 bg-black/20 p-1 rounded-xl">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-1.5 hover:bg-white/10 rounded-lg"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-6 text-center font-black text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-1.5 hover:bg-white/10 rounded-lg"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            ) : <div></div>}

                            <div className='text-right'>
                                <p className="text-[9px] font-bold uppercase opacity-40">Total</p>
                                <p className='text-xl md:text-2xl font-black italic'>
                                    {formatIDR(currentFinalPrice * quantity)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="pt-2 sticky bottom-0 bg-inherit md:relative">
                        <button disabled={disableButton} onClick={() => addCart()}
                            className="w-full py-4 md:py-5 bg-[var(--product-primary-color)] text-white rounded-[1.5rem] font-black uppercase italic shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-3 group"
                        >
                            Klaim Sekarang
                            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                        </button>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`bg-[var(--product-primary-color)] text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center`}>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2 rounded-lg"><Package size={18} /></div>
                        <p className="text-sm font-bold">{mockItem?.name} berhasil diamankan di keranjang!</p>
                    </div>
                    <button onClick={() => setActiveAlert(false)} className="text-xs font-black uppercase underline decoration-2 underline-offset-4">Tutup</button>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Fourteen