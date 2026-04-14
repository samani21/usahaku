import ModalWrapper from './ModalWrapper';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Minus, Plus, ShoppingBag, X, ArrowUpRight, Maximize2 } from 'lucide-react';
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

const Six = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant]);

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
        if (handleCart) handleCart(product, selectedVariant, quantity);
        setProduct(null);
        setSelectedVariant(null);
        setQuantity(1);
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-4'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);

                return (
                    <div
                        key={i}
                        className={`group relative flex flex-col transition-all duration-500 ${isDarkMode ? 'text-white' : 'text-zinc-900'
                            }`}
                    >
                        {/* Image Container with Custom Frame */}
                        <div className={`relative overflow-hidden ${isDarkMode ? "bg-zinc-800 border-zinc-700" : "bg-zinc-100 border-zinc-200"} border-[1px]`}>
                            {/* Promo Label Overlay */}
                            {label && (
                                <div className={`absolute top-0 right-0 ${isDarkMode ? "bg-white text-black" : " bg-zinc-900 text-white"} px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] z-10`}>
                                    {label}
                                </div>
                            )}

                            <img
                                src={p.image}
                                className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                                alt={p.name}
                            />

                            {/* Hover Quick Action */}
                            <div
                                onClick={() => { setProduct(p); setProductAlert(p); }}
                                className="absolute inset-0 bg-zinc-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                            >
                                <div className="bg-white text-black px-6 py-3 flex items-center gap-3 font-bold text-xs tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    VIEW PRODUCT <Maximize2 size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Text Info - Offset Position */}
                        <div className="mt-6 flex flex-col gap-2 relative">
                            <div className="flex justify-between items-start gap-4">
                                <h3 className="font-bold text-xl uppercase tracking-tighter leading-none max-w-[70%]">
                                    {p.name}
                                </h3>
                                <p className="text-lg font-light tracking-tighter opacity-70 italic">
                                    {formatIDR(finalPrice)}
                                </p>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                                <span>{p.category}</span>
                                <span className="h-[1px] flex-1 bg-current mx-4 opacity-20"></span>
                                {/* <span>ID: {i + 102}</span> */}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Modal - Full Screen Aesthetics */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => { setProduct(null); setSelectedVariant(null); setQuantity(1); }}
                isDarkMode={isDarkMode}
            >
                <div className={`w-full max-w-5xl flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto no-scrollbar ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}>

                    {/* Left: Image (Split Screen) */}
                    <div className={`md:w-[55%] sticky top-0 ${isDarkMode ? "bg-zinc-900" : "bg-zinc-100"} overflow-hidden`}>
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                    </div>

                    {/* Right: Info */}
                    <div className="md:w-[45%] p-8 md:p-14 flex flex-col gap-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] opacity-50 uppercase">
                                <span>Category</span> / <span>{product?.category}</span>
                            </div>
                            <h2 className="text-5xl font-bold uppercase tracking-tighter leading-[0.9]">
                                {product?.name}
                            </h2>
                            <div className="h-1 w-20 bg-[var(--product-primary-color)]"></div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm opacity-40 uppercase tracking-widest">Pricing</span>
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-light tracking-tighter">
                                    {formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}
                                </span>
                                {product?.discount_price && (
                                    <span className="text-sm line-through opacity-30">
                                        {formatIDR(selectedVariant?.price ?? product?.price ?? 0)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={`prose ${isDarkMode ? "prose-invert" : "prose-sm "}`}>
                            <ExpandableHTML htmlContent={product?.description} />
                        </div>

                        {/* Interactive UI */}
                        <div className="space-y-8">
                            {product?.variants && product?.variants?.length > 0 && (
                                <div className="space-y-4">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Select Variant</span>
                                    <div className="grid grid-cols-2 gap-2">
                                        {product.variants.map((v) => (
                                            <button
                                                key={v.id}
                                                onClick={() => setSelectedVariant(v)}
                                                className={`py-3 px-4 text-[10px] font-bold uppercase border tracking-widest transition-all ${selectedVariant?.id === v.id
                                                    ? isDarkMode ? "bbg-white text-black border-white" : "bg-zinc-900 text-white border-zinc-900"
                                                    : isDarkMode ? "border-zinc-800 hover:border-zinc-400" : "border-zinc-200 hover:border-zinc-400"
                                                    }`}
                                            >
                                                {v.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className={`flex items-center gap-10 pt-6 border-t ${isDarkMode ? "border-zinc-900" : "border-zinc-100"}`}>
                                {product?.is_qty && (
                                    <div className="flex items-center gap-6">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                                        <span className="font-bold text-lg w-4 text-center">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <span className="text-[10px] font-black opacity-30 uppercase block">Total</span>
                                    <span className="text-2xl font-bold tracking-tighter italic">
                                        {formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}
                                    </span>
                                </div>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className={`w-full py-6 flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.3em] transition-all
                                    ${isDarkMode ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-white hover:bg-black'}`}
                            >
                                ADD TO BAG <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            {/* Alert Minimalist */}
            <AlertWrapper activeAlert={activeAlert} position="bottom-center">
                <div className={`flex items-center justify-between gap-6 px-8 py-4 shadow-2xl ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Bag Updated</span>
                        <span className="text-sm font-black italic">{productAlert?.name} Secured</span>
                    </div>
                    <div className="h-8 w-[1px] bg-current opacity-20"></div>
                    <button onClick={() => setActiveAlert(false)} className="hover:rotate-90 transition-transform">
                        <X size={20} />
                    </button>
                </div>
            </AlertWrapper>
        </div>
    );
}

export default Six;