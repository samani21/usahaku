import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ShoppingBag, Tag, X, ArrowUpRight, CheckCircle2, Info } from 'lucide-react';
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

const Eight = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null);
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [activeAlert, setActiveAlert] = useState<boolean>(false);

    const disableButton = useMemo(() => {
        if (!product) return true;
        return product?.variants?.length > 0 && !selectedVariant;
    }, [product, selectedVariant]);

    const mockItem = useMemo(() => {
        return {
            name: productAlert?.name,
            price: productAlert?.final_price,
            image: productAlert?.image,
        }
    }, [productAlert]);

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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);

                return (
                    <div
                        key={i}
                        onClick={() => { setProduct(p); setProductAlert(p); }}
                        className={`group relative flex flex-col rounded-[2rem] overflow-hidden transition-all duration-500 cursor-pointer border ${isDarkMode
                            ? 'bg-zinc-900 border-white/5 hover:border-[var(--product-primary-color)]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]'
                            : 'bg-white border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]'
                            }`}
                    >
                        {/* Image Canvas */}
                        <div className={`relative aspect-[4/5] overflow-hidden ${isDarkMode ? "bg-zinc-800" : "bg-zinc-100"}`}>
                            <img
                                src={p?.image}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt={p?.name}
                            />

                            {/* Floating Action Header */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                                {label ? (
                                    <div className="bg-[var(--product-primary-color)] text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest italic">
                                        {label}
                                    </div>
                                ) : <div />}
                                <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight size={18} className="text-white" />
                                </div>
                            </div>

                            {/* Gradient Overlay for Text Visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        </div>

                        {/* Content Area */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex-1 space-y-2">
                                <span className="text-[10px] font-bold text-[var(--product-primary-color)] uppercase tracking-[0.2em]">{p.category}</span>
                                <h3 className={`text-xl font-bold leading-tight line-clamp-2 tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    {p.name}
                                </h3>
                            </div>

                            <div className="mt-6 flex items-end justify-between border-t border-dashed border-slate-500/20 pt-4">
                                <div className="flex flex-col">
                                    {label && <span className="text-xs line-through opacity-30 font-medium">{formatIDR(p.price)}</span>}
                                    <span className="text-2xl font-black tracking-tighter text-[var(--product-primary-color)]">{formatIDR(finalPrice)}</span>
                                </div>
                                <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-white text-black' : 'bg-slate-900 text-white'} group-hover:rotate-12 transition-transform`}>
                                    <ShoppingBag size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Modal - Modern Wide Layout */}
            <ModalWrapper
                activeModal={!!product}
                closeModal={() => { setProduct(null); setSelectedVariant(null); setQuantity(1); }}
                isDarkMode={isDarkMode}
            >
                <div className={`w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden rounded-[2.5rem] shadow-2xl ${isDarkMode ? 'bg-zinc-950 border border-white/10' : 'bg-white'
                    }`}>

                    {/* Media Section */}
                    <div className={`lg:w-[55%] relative p-4 lg:p-8 ${isDarkMode ? "bg-zinc-900" : " bg-slate-50"} flex items-center justify-center`}>
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                        <img
                            src={selectedVariant?.image || product?.image}
                            className="w-full h-full max-h-[500px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative z-10"
                            alt=""
                        />
                    </div>

                    {/* Logic Section */}
                    <div className="lg:w-[45%] p-8 lg:p-14 flex flex-col justify-between">
                        <div className="space-y-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="h-1 w-8 bg-[var(--product-primary-color)] rounded-full"></span>
                                    <span className="text-[10px] font-black text-[var(--product-primary-color)] uppercase tracking-widest">{product?.category}</span>
                                </div>
                                <h2 className="text-4xl font-black italic tracking-tighter leading-none uppercase">{product?.name}</h2>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-black text-[var(--product-primary-color)]">{formatIDR(selectedVariant?.final_price || product?.final_price || 0)}</span>
                                    {product?.discount_price && <span className="text-lg line-through opacity-20 font-bold italic">{formatIDR(selectedVariant?.price || product?.price || 0)}</span>}
                                </div>
                                {product?.discount_price && (
                                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
                                        <Tag size={14} fill="currentColor" /> HEMAT {formatIDR(product?.discount_price)} {product?.percent_discount && `(${Promo(product, selectedVariant)})`}
                                    </div>
                                )}
                            </div>

                            <div className="text-sm leading-relaxed opacity-60 max-h-40 overflow-y-auto pr-4 custom-scrollbar">
                                <ExpandableHTML htmlContent={product?.description} />
                            </div>

                            {product?.variants && product?.variants?.length > 0 && (
                                <div className="pt-4 border-t border-slate-500/10">
                                    <p className="text-[10px] font-black uppercase opacity-40 mb-4 tracking-widest">Spesifikasi Pilihan</p>
                                    <VariantPicker
                                        variants={product.variants}
                                        selectedVariant={selectedVariant}
                                        setSelectedVariant={setSelectedVariant}
                                        isDarkMode={isDarkMode}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Order Actions */}
                        <div className="mt-12 space-y-6">
                            <div className="flex items-center justify-between p-5 bg-[var(--product-primary-color)]/5 rounded-3xl border border-[var(--product-primary-color)]/10">
                                <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} />
                                <div className="text-right">
                                    <p className="text-[9px] font-black opacity-30 uppercase">Total Estimasi</p>
                                    <p className="text-2xl font-black tracking-tighter">
                                        {formatIDR((selectedVariant?.final_price || product?.final_price || 0) * quantity)}
                                    </p>
                                </div>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={addCart}
                                className="w-full py-6 bg-[var(--product-primary-color)] text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] italic flex items-center justify-center gap-3 hover:bg-[var(--product-primary-color)] hover:shadow-[0_10px_30px_rgba(99,102,241,0.3)] transition-all active:scale-95 disabled:grayscale"
                            >
                                <ShoppingBag size={18} /> Amankan Pesanan
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>

            {/* Alert - Minimalist Dynamic Notification */}
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`p-1 pr-6 flex items-center gap-4 rounded-full ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-slate-200'} border shadow-2xl animate-in slide-in-from-right-10`}>
                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <CheckCircle2 size={18} />
                    </div>
                    <div className="flex flex-col py-2">
                        <p className="text-[10px] font-black text-emerald-500 uppercase leading-none">Berhasil</p>
                        <p className="text-xs font-bold truncate max-w-[150px]">{mockItem.name}</p>
                    </div>
                    <X size={16} onClick={() => setActiveAlert(false)} className="ml-4 cursor-pointer opacity-30 hover:opacity-100" />
                </div>
            </AlertWrapper>
        </div>
    );
};

export default Eight;