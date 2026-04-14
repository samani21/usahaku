import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Minus, Plus, Tag, Zap, ArrowUpRight, ShoppingBag } from 'lucide-react';
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

const Four = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null)
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null)
    const [quantity, setQuantity] = useState<number>(1)
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product) return true;
        if (product?.variants?.length > 0 && !selectedVariant) return true;
        return false;
    }, [product, selectedVariant])

    const mockItem = useMemo(() => {
        return {
            name: productAlert?.name,
            price: productAlert?.final_price,
            image: productAlert?.image,
        }
    }, [productAlert])

    useEffect(() => {
        if (activeAlert) {
            const timer = setTimeout(() => setActiveAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [activeAlert]);

    useEffect(() => {
        document.body.style.overflow = product ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [product]);

    const addCart = () => {
        setActiveAlert(true);
        if (handleCart) handleCart(product, selectedVariant, quantity)
        setProduct(null);
        setSelectedVariant(null);
        setQuantity(1);
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);

                return (
                    <div
                        onClick={() => {
                            setProduct(p)
                            setProductAlert(p)
                        }}
                        key={i}
                        className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer bg-zinc-900 shadow-2xl transition-all duration-500 hover:shadow-[var(--product-primary-color)]/20 shadow-xl"
                    >
                        {/* Background Image with Parallax Effect */}
                        <img
                            src={p?.image}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                            alt={p.name}
                        />

                        {/* Top Info: Tag & Arrow */}
                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                            {label ? (
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-white italic">
                                    {label}
                                </div>
                            ) : <div />}
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[var(--product-primary-color)] group-hover:border-transparent transition-all duration-300">
                                <ArrowUpRight size={20} />
                            </div>
                        </div>

                        {/* Bottom Glass Panel */}
                        <div className="absolute bottom-4 left-4 right-4 p-6 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[2.5rem] flex flex-col gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <div>
                                <span className="text-[10px] font-bold text-[var(--product-primary-color)] uppercase tracking-[0.3em] mb-1 block">
                                    {p.category}
                                </span>
                                <h3 className="text-xl font-black italic text-white leading-none uppercase tracking-tighter line-clamp-1">
                                    {p?.name}
                                </h3>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                <div className="flex flex-col">
                                    {label && (
                                        <span className="text-[11px] line-through text-white/40 font-bold leading-none mb-1">
                                            {formatIDR(p.price)}
                                        </span>
                                    )}
                                    <span className="text-xl font-black text-white leading-none tracking-tight">
                                        {formatIDR(finalPrice)}
                                    </span>
                                </div>
                                <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                                    View Detail
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            <ModalWrapper
                activeModal={!!product}
                closeModal={() => {
                    setProduct(null);
                    setSelectedVariant(null);
                    setQuantity(1);
                }}
                isDarkMode={isDarkMode}
            >
                <div className="flex flex-col md:flex-row gap-0 max-h-[90vh]">
                    {/* Visual Section */}
                    <div className="md:w-1/2 relative bg-zinc-100 dark:bg-zinc-900">
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className="w-full h-full object-cover"
                            alt={product?.name}
                        />
                        <div className="absolute bottom-8 left-8">
                            <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] text-white">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Unit Price</p>
                                <p className="text-3xl font-black italic">{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className={`md:w-1/2 p-8 sm:p-12 ${isDarkMode ? "bg-zinc-950" : "bg-white"}`}>
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap size={16} className="text-[var(--product-primary-color)] fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{product?.category}</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter mb-6 leading-[0.9]">
                                {product?.name}
                            </h2>
                            <div className="h-1.5 w-20 bg-[var(--product-primary-color)] mb-6" />
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className="text-sm opacity-50 font-medium leading-relaxed max-w-md"
                            />
                        </div>

                        <div className="space-y-10">
                            {product?.variants && product?.variants?.length > 0 && (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Select Edition</p>
                                    <VariantPicker
                                        variants={product?.variants}
                                        selectedVariant={selectedVariant}
                                        setSelectedVariant={setSelectedVariant}
                                        isDarkMode={isDarkMode}
                                    />
                                </div>
                            )}

                            {product?.is_qty && (
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Quantity</p>
                                    <div className={`flex items-center gap-6 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"} p-2 rounded-2xl w-fit`}>
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-[var(--product-primary-color)] hover:text-white rounded-xl transition-all">
                                            <Minus size={18} strokeWidth={3} />
                                        </button>
                                        <span className="text-xl font-black min-w-[20px] text-center">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-[var(--product-primary-color)] hover:text-white rounded-xl transition-all">
                                            <Plus size={18} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-12 pt-10 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-1">Grand Total</p>
                                    <p className="text-4xl font-black italic tracking-tighter text-[var(--product-primary-color)]">
                                        {formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}
                                    </p>
                                </div>
                                {product?.discount_price && (
                                    <div className="text-right pb-1">
                                        <p className="text-xs font-bold text-rose-500 uppercase tracking-tighter italic">Save {Promo(product, selectedVariant)}</p>
                                        <p className="text-sm opacity-30 line-through font-bold">{formatIDR((selectedVariant?.price ?? product?.price ?? 0) * quantity)}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className={`group relative w-full py-6 overflow-hidden rounded-2xl font-black uppercase text-sm tracking-[0.3em] transition-all active:scale-95 disabled:opacity-50
                                    ${isDarkMode ? "bg-white text-black" : "bg-zinc-900 text-white"}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Confirm Order <Check size={20} strokeWidth={4} />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            {/* Futuristic Bottom Right Alert */}
            <AlertWrapper activeAlert={activeAlert} position="bottom-right">
                <div className="relative group overflow-hidden bg-zinc-900 text-white p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex items-center gap-5">
                    <div className="absolute top-0 right-0 p-2 bg-[var(--product-primary-color)] rounded-bl-xl">
                        <ShoppingBag size={12} className="text-white" />
                    </div>
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20">
                        <img src={mockItem?.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase text-[var(--product-primary-color)] tracking-widest">Added to Cart</p>
                        <p className="text-sm font-bold italic line-clamp-1">{mockItem?.name}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <Check size={18} strokeWidth={3} />
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Four;