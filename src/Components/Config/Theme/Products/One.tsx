import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import AlertWrapper from './AlertWrapper';
import { Check, ShoppingBag, Tag, X, Eye } from 'lucide-react';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails, Promo } from './PromoType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;
}

const One = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null)
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null)
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product) return true;
        if (product.variants && product.variants.length > 0 && !selectedVariant) return true;
        return false;
    }, [product, selectedVariant])

    useEffect(() => {
        document.body.style.overflow = product ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [product]);

    const mockItem = useMemo(() => ({
        name: productAlert?.name,
        image: productAlert?.image,
    }), [productAlert]);

    useEffect(() => {
        if (activeAlert) {
            const timer = setTimeout(() => setActiveAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [activeAlert]);

    const addCart = () => {
        setActiveAlert(true);
        if (handleCart) handleCart(product, selectedVariant, quantity);
        setProduct(null);
        setSelectedVariant(null);
        setQuantity(1);
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);

                return (
                    <div
                        key={i}
                        className={`group relative flex flex-col cursor-pointer rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 ${isDarkMode
                            ? 'bg-zinc-900/50 border border-zinc-800 hover:border-[var(--product-primary-color)]/50'
                            : 'bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl'
                            }`}
                        onClick={() => {
                            setProduct(p);
                            setProductAlert(p);
                        }}
                    >
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] overflow-hidden">
                            {label && (
                                <div className="absolute top-3 left-3 z-0 bg-rose-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                    <Tag size={10} /> {label}
                                </div>
                            )}

                            {/* Hover Overlay Button */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 flex items-center justify-center">
                                <div className="bg-white/90 backdrop-blur-md p-3 rounded-full text-zinc-900 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <Eye size={20} />
                                </div>
                            </div>

                            <img
                                src={p?.image}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                alt={p.name}
                            />
                        </div>

                        {/* Content */}
                        <div className="p-2 sm:p-5 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-slate-100 text-slate-500'}`}>
                                    {p.category}
                                </span>
                            </div>

                            <h3 className={`font-bold text-sm md:text-base line-clamp-2 mb-3 leading-snug flex-grow transition-colors ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-[var(--product-primary-color)]'}`}>
                                {p?.name}
                            </h3>

                            <div className="p-2 sm:pb-0 sm:px-0 mt-auto pt-3 border-t border-dashed border-zinc-700/20">
                                {label ? (
                                    <span className="text-[11px] line-through opacity-40 block mb-0.5">
                                        {formatIDR(p.price)}
                                    </span>
                                ) : <div className='h-4' />}
                                <div className="flex items-center justify-between">
                                    <p className="font-black text-lg text-[var(--product-primary-color)]">
                                        {formatIDR(finalPrice)}
                                    </p>
                                    <div className={`p-2 rounded-xl transition-colors ${isDarkMode ? 'bg-zinc-800 group-hover:bg-[var(--product-primary-color)] text-white' : 'bg-slate-50 group-hover:bg-[var(--product-primary-color)] group-hover:text-white'}`}>
                                        <ShoppingBag size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Product Detail Modal */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => {
                    setProduct(null);
                    setSelectedVariant(null);
                    setQuantity(1);
                }}
                isDarkMode={isDarkMode}
            >
                <div className='flex flex-col md:flex-row max-h-[90vh] overflow-y-auto'>
                    {/* Gallery Section */}
                    <div className={`md:w-1/2 ${isDarkMode ? "bg-zinc-800" : "bg-zinc-100"}`}>
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className="w-full h-full object-cover max-h-[400px] md:max-h-full"
                            alt={product?.name}
                        />
                    </div>

                    {/* Info Section */}
                    <div className="md:w-1/2 p-6 md:p-10 flex flex-col ">
                        <div className='flex items-center gap-3 mb-4'>
                            <span className="px-3 py-1 bg-[var(--product-primary-color)] text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">
                                {product?.category}
                            </span>
                            {product?.discount_price && (
                                <div className='text-rose-500 flex items-center font-bold text-sm gap-1'>
                                    <Tag size={14} />
                                    <span>Hemat {Promo(product, selectedVariant)}</span>
                                </div>
                            )}
                        </div>

                        <h2 className="text-2xl md:text-4xl font-black mb-4 leading-tight">{product?.name}</h2>

                        <div className="flex items-end gap-3 mb-6">
                            <p className="text-3xl font-black text-[var(--product-primary-color)] leading-none">
                                {formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}
                            </p>
                            {(product?.discount_price || selectedVariant?.price) && (
                                <p className="text-lg opacity-30 line-through mb-0.5">
                                    {formatIDR(selectedVariant?.price ?? product?.price ?? 0)}
                                </p>
                            )}
                        </div>

                        <div className="space-y-6">
                            {product?.variants && product.variants.length > 0 && (
                                <div>
                                    <label className="text-[10px] font-bold uppercase opacity-50 mb-2 block">Pilih Varian</label>
                                    <VariantPicker variants={product.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                                </div>
                            )}

                            <div>
                                <label className="text-[10px] font-bold uppercase opacity-50 mb-2 block">Deskripsi Produk</label>
                                <ExpandableHTML
                                    htmlContent={product?.description}
                                    className={`${isDarkMode ? "text-slate-400" : "text-slate-500"} text-sm leading-relaxed`}
                                />
                            </div>

                            <div className={`pt-6 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
                                <div className='flex items-center justify-between mb-6'>
                                    {product?.is_qty ? (
                                        <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                    ) : <div />}

                                    <div className="text-right">
                                        <p className="text-[10px] font-bold uppercase opacity-50">Total Harga</p>
                                        <p className="text-2xl font-black text-[var(--product-primary-color)]">
                                            {formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    disabled={disableButton}
                                    onClick={addCart}
                                    className="w-full group/btn relative overflow-hidden py-4 bg-[var(--product-primary-color)] text-white rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-95 disabled:grayscale disabled:opacity-50"
                                >
                                    <span className="relative z-0 flex items-center justify-center gap-2">
                                        <ShoppingBag size={20} /> BELI SEKARANG
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            {/* Modern Toast Alert */}
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`${isDarkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-100"} p-3 pr-5 rounded-2xl shadow-2xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300`}>
                    <div className="w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                        <Check size={24} strokeWidth={3} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-black uppercase tracking-wider">Berhasil!</p>
                        <p className="text-[11px] opacity-60 truncate">{mockItem?.name}</p>
                    </div>
                    <button onClick={() => setActiveAlert(false)} className="hover:rotate-90 transition-transform">
                        <X size={18} className="opacity-40" />
                    </button>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default One;