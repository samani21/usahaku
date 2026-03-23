import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ArrowRight, ShoppingCart, Tag } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails } from './PromoType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;
}

const Sevent = ({ products, isDarkMode, handleCart }: Props) => {
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
            setProduct(null)
            setSelectedVariant(null)
            setQuantity(1)
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
    const currentPrice = selectedVariant?.price ?? product?.price ?? 0;
    const currentFinalPrice = selectedVariant?.final_price ?? product?.final_price ?? 0;
    const currentDiscount = currentPrice - currentFinalPrice;
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                return (
                    <div
                        key={i}
                        onClick={() => setProduct(p)}
                        className={`group cursor-pointer relative overflow-hidden rounded-2xl border transition-all duration-500 ${isDarkMode
                            ? "bg-slate-900 border-white/10 text-white hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]"
                            : "bg-white/80 border-black/5 shadow-lg hover:shadow-xl hover:border-cyan-500/30"
                            } backdrop-blur-md`}
                    >
                        {label && (
                            <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 bg-cyan-500 text-black font-black text-[10px] rounded-md shadow-lg animate-pulse">
                                <Tag size={10} />
                                {label}
                            </div>
                        )}

                        <div className="relative aspect-video overflow-hidden">
                            <div className={`absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t ${isDarkMode ? "from-slate-950/80" : "from-white/60"} to-transparent`} />
                            <img
                                src={p?.image}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
                                alt={p?.name}
                            />

                            <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                                    Detail Product
                                </span>
                            </div>
                        </div>

                        <div className="p-5 space-y-3">
                            <div className="space-y-1">
                                {p?.category && (
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-500 opacity-80 italic">
                                        {p?.category}
                                    </p>
                                )}
                                <h3 className={`text-lg font-bold italic tracking-tight transition-colors ${isDarkMode ? "text-slate-100 group-hover:text-cyan-400" : "text-slate-800 group-hover:text-cyan-600"
                                    }`}>
                                    {p?.name}
                                </h3>
                            </div>

                            <div className="pt-2 border-t border-white/5">
                                <div className="flex flex-col mb-2">
                                    {label ? (
                                        <p className="text-[10px] font-medium line-through opacity-40 italic mb-0.5">
                                            {formatIDR(p.price)}
                                        </p>
                                    ) : <p className="text-[10px] h-4 font-medium line-through opacity-40 italic mb-0.5">
                                    </p>}
                                    <div className="flex items-center justify-between">
                                        <p className={`text-xl font-black font-mono tracking-tighter ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                                            {formatIDR(p?.final_price ?? 0)}
                                        </p>
                                        <div className="w-8 h-8 rounded-full border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                            <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Glowing Bar */}
                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-500 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_#06b6d4]" />
                    </div>
                )
            })}

            <ModalWrapper
                activeModal={product ? true : false}
                closeModal={() => {
                    setProduct(null)
                    setSelectedVariant(null)
                    setQuantity(1)
                }}
                isDarkMode={isDarkMode}>
                <div className={` w-full overflow-auto overflow-x-hidden no-scrollbar transition-all duration-500 rounded-3xl border ${isDarkMode
                    ? "bg-slate-950/40 border-white/10 text-white shadow-2xl"
                    : "bg-white/60 border-black/5 text-slate-900 shadow-xl"
                    } backdrop-blur-xl`}>
                    <div className="grid grid-cols-1 gap-0 relative z-10">
                        <div className=" bg-gradient-to-br from-white/5 to-transparent">
                            <img src={selectedVariant?.image || product?.image} className="w-full h-50 md:h-100 object-cover drop-shadow-2xl" alt="" />
                        </div>
                        <div className="p-4 md:p-8 space-y-6">
                            <div>
                                <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">{product?.category}</span>
                                <h2 className="text-4xl font-black italic">{product?.name.toUpperCase()}</h2>
                            </div>
                            <div className="flex flex-wrap items-baseline gap-3">
                                <span className="text-xl md:text-3xl font-black tracking-tighter text-rose-500 italic">
                                    {formatIDR(selectedVariant?.final_price || product?.final_price || 0)}
                                </span>
                                {currentDiscount > 0 && (
                                    <span className="text-lg md:text-xl opacity-20 line-through italic font-black">
                                        {formatIDR(currentPrice)}
                                    </span>
                                )}
                            </div>
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className="text-sm opacity-60 font-light"
                            />
                            {product?.variants && product?.variants?.length > 0 && (
                                <VariantPicker
                                    variants={product?.variants}
                                    selectedVariant={selectedVariant}
                                    setSelectedVariant={setSelectedVariant}
                                    isDarkMode={isDarkMode}
                                    color={'#06b6d4'}
                                />
                            )}

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                <div className="text-right">
                                    <p className="text-[10px] opacity-40 uppercase font-bold">Total</p>
                                    <p className="text-xl font-bold">{formatIDR((selectedVariant?.final_price || product?.final_price || 0) * quantity)}</p>
                                </div>
                            </div>
                            <button disabled={disableButton}
                                onClick={() => addCart()} className="w-full py-4 bg-cyan-500 text-black font-black uppercase italic disabled:bg-gray-600 tracking-widest rounded-xl hover:bg-white transition-all">
                                Pesan sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`${isDarkMode ? "bg-black" : "bg-slate-100"} border border-cyan-500 p-4 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-mono`}>
                    <div className={`text-[12px] ${isDarkMode ? "text-cyan-400" : "text-gray-800"} mb-1`}>&gt; Item masuk ke keranjang</div>
                    <div className={`${isDarkMode ? 'text-white' : 'text-black'} text-xs font-bold italic uppercase tracking-widest`}>Item: {mockItem.name}</div>
                    <div className="mt-3 h-1 bg-cyan-950 w-full overflow-hidden">
                        <div className="h-full bg-cyan-400 animate-in slide-in-from-left duration-1000 fill-mode-forwards" style={{ width: '100%' }} />
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Sevent