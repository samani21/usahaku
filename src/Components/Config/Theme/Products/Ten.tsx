import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Plus, ShoppingBag, Zap, X, MoveUpRight, Sparkles } from 'lucide-react';
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

const Ten = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
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
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                // Membuat pola bento: kartu pertama dan kelima lebih besar
                const isLarge = i % 5 === 0;

                return (
                    <div
                        key={i}
                        onClick={() => setProduct(p)}
                        className={`group relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 ${isLarge ? "col-span-2 row-span-2 h-[400px] md:h-[500px]" : "col-span-2 h-[200px] md:h-[242px]"
                            } ${isDarkMode ? "bg-zinc-900 shadow-2xl shadow-black/20" : "bg-white shadow-xl shadow-slate-200"}`}
                    >
                        {/* Background Image */}
                        <img
                            src={p?.image}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            alt={p.name}
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-black via-black/20" : "from-black/80 via-transparent"} to-transparent opacity-80 group-hover:opacity-100 transition-opacity`} />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                            <div className="flex justify-between items-start">
                                {label ? (
                                    <span className="bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                        {label}
                                    </span>
                                ) : <div />}
                                <div className="p-2 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all group-hover:rotate-45">
                                    <MoveUpRight size={18} />
                                </div>
                            </div>

                            <div className={isLarge ? "space-y-3" : "space-y-1"}>
                                <p className="text-[10px] font-medium opacity-70 uppercase tracking-[0.3em]">{p.category}</p>
                                <h3 className={`font-black italic uppercase leading-none tracking-tighter ${isLarge ? "text-2xl md:text-4xl" : "text-lg md:text-xl"}`}>
                                    {p.name}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <p className="text-xl font-black text-[var(--product-primary-color)]">
                                        {formatIDR(finalPrice)}
                                    </p>
                                    {isLarge && label && (
                                        <span className="text-xs line-through opacity-40 font-bold">
                                            {formatIDR(p.price)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Modal Bento Update */}
            <ModalWrapper
                activeModal={product ? true : false}
                closeModal={() => {
                    setProduct(null)
                    setSelectedVariant(null)
                    setQuantity(1)
                }}
                isDarkMode={isDarkMode}>
                <div className='md:flex'>
                    <div className="md:w-3/5 p-6 sm:p-12 space-y-8 flex flex-col justify-start md:overflow-auto md:overflow-x-hidden no-scrollbar">
                        <img src={selectedVariant?.image ?? product?.image} className="md:hidden w-full h-full object-cover rounded-[24px]" alt="" />
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <span className={`px-5 py-1.5 rounded-full ${isDarkMode ? "bg-slate-800" : "bg-slate-100"} text-[10px] font-black uppercase tracking-widest italic`}>
                                    {product?.category}
                                </span>
                                {product?.discount_price && (
                                    <span className="px-5 py-1.5 rounded-full bg-[var(--product-primary-color)] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[var(--product-primary-color)]/20">
                                        - {Promo(product, selectedVariant)}
                                    </span>
                                )}
                            </div>
                            <h2 className="text-lg sm:text-3xl font-black tracking-tight leading-none">{product?.name}</h2>
                        </div>
                        <ExpandableHTML
                            htmlContent={product?.description}
                            className={`text-sm opacity-60 font-medium`}
                        />
                        <div className={`flex items-center justify-between gap-8 border-y ${isDarkMode ? "border-slate-800" : "border-slate-300"} py-8`}>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black opacity-70 uppercase tracking-widest">Harga Per Item</span>
                                {
                                    product?.discount_price ?
                                        <div className="text-2xl font-black line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div> :
                                        <div className="text-2xl font-black ">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div>
                                }
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black opacity-70 uppercase tracking-widest">Ketersediaan</span>
                                <div className="text-2xl font-black flex items-center gap-2"><Check size={20} className="text-emerald-500" /> {product?.stock} Unit</div>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                {product?.variants && product?.variants?.length > 0 ?
                                    <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} /> : ""
                                }
                                <div className='flex items-end justify-between gap-2'>
                                    {
                                        product && product?.is_qty ?
                                            <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                                    }
                                    <div className='mt-2'>
                                        <p className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-gray-700"}`}>Total</p>
                                        <p className='text-1xl sm:text-2xl font-bold'>{formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}</p>
                                    </div>
                                </div>
                            </div>
                            <button disabled={disableButton} onClick={() => addCart()} className={`flex-1 disabled:bg-gray-600 py-5 ${isDarkMode ? "bg-white text-black" : "bg-slate-900 text-white"} rounded-3xl font-black uppercase tracking-widest shadow-2xl`}>Confirm Order</button>
                        </div>
                    </div>
                    <div className="hidden md:grid md:w-2/5 h-80 md:h-auto">
                        <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt="" />
                    </div>
                </div>
            </ModalWrapper>

            {/* Alert floating modern */}
            <AlertWrapper activeAlert={activeAlert} position="bottom-right">
                <div className="bg-black text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/20 animate-in slide-in-from-right-10">
                    <div className="h-10 w-10 bg-[var(--product-primary-color)] rounded-full flex items-center justify-center">
                        <ShoppingBag size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase italic leading-none">Berhasil!</p>
                        <p className="text-[10px] opacity-60">Barang sudah masuk tas.</p>
                    </div>
                </div>
            </AlertWrapper>
        </div>
    );
}

export default Ten;