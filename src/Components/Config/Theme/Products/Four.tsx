import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Minus, Plus, Tag, Zap } from 'lucide-react';
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
            name: productAlert?.name,
            price: productAlert?.final_price,
            image: productAlert?.image,
            category: productAlert?.category,
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
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);

                return (
                    <div
                        onClick={() => {
                            setProduct(p)
                            setProductAlert(p)
                        }}
                        key={p.id}
                        className="relative h-80 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl"
                    >
                        {/* Background Image Grayscale */}
                        <img
                            src={p?.image}
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                            alt=""
                        />

                        {/* Floating Glass Container */}
                        <div className={`absolute inset-4 backdrop-blur-xl border border-white/30 rounded-[2rem] flex flex-col justify-start text-white overflow-hidden shadow-lg transition-transform group-hover:-translate-y-2 ${isDarkMode ? "bg-black/40" : "bg-black/20"}`}>

                            {/* Internal Image */}
                            <div className="w-full h-1/2 overflow-hidden">
                                <img
                                    src={p?.image}
                                    className='w-full h-full object-cover'
                                    alt={p?.name}
                                />
                            </div>

                            {/* Content Area */}
                            <div className='px-6 py-5 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-between'>
                                <div>
                                    {p.category && (
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1 block">
                                            {p.category}
                                        </span>
                                    )}
                                    <h3 className="text-xl font-bold italic leading-tight mb-2 line-clamp-1">{p?.name}</h3>

                                </div>
                                <div className="flex items-end justify-between">
                                    <div className="flex flex-col">
                                        {label && (
                                            <span className="text-[10px] line-through opacity-60 font-bold mb-0.5">
                                                {formatIDR(p.price)}
                                            </span>
                                        )}
                                        <p className="font-black text-lg tracking-tighter text-white">
                                            {formatIDR(finalPrice)}
                                        </p>
                                    </div>

                                    {label && (
                                        <div className="bg-[var(--product-primary-color)] text-white text-[9px] font-black px-2 py-1 rounded-lg animate-pulse">
                                            {label}
                                        </div>
                                    )}
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
                <div className="w-full p-4 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Kolom 1 & 2: Main Image Area */}
                    <div className="col-span-2 space-y-6">
                        <div className="rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-[4/3] md:aspect-auto md:h-full">
                            <img
                                src={selectedVariant?.image ?? product?.image}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                alt={product?.name}
                            />
                        </div>
                    </div>

                    {/* Kolom 3: Order Sidebar Panel */}
                    <div className={`${isDarkMode ? "bg-slate-800" : "bg-slate-100"} col-span-2 rounded-[2.5rem] overflow-x-hidden no-scrollbar shadow-xl`}>
                        <div className="space-y-4 p-6">
                            {/* Product Info Card */}
                            <div className={`${isDarkMode ? "bg-slate-800" : "bg-slate-50"} rounded-2xl`}>
                                {product?.category && (
                                    <div className="mb-4">
                                        <span className="text-[10px] font-black opacity-60 tracking-widest uppercase">
                                            {product?.category}
                                        </span>
                                        <div className="h-1 w-10 bg-[var(--product-primary-color)] mt-2" />
                                    </div>
                                )}

                                <h3 className="text-2xl font-black mb-2 leading-tight uppercase italic tracking-tighter">
                                    {product?.name}
                                </h3>

                                <ExpandableHTML
                                    htmlContent={product?.description}
                                    className="text-xs opacity-50 font-medium leading-relaxed"
                                />
                            </div>

                            {/* Discount Badge */}
                            {product?.discount_price && (
                                <div className={`p-2 rounded-lg flex items-end flex  gap-3 text-[var(--product-primary-color)] `}>
                                    <Tag size={24} />
                                    <div className="text-xl font-black italic tracking-tighter">
                                        - {Promo(product, selectedVariant)}
                                    </div>
                                </div>
                            )}

                            {/* Options (Variant & Qty) */}
                            <div className="space-y-2">
                                {product?.variants && product?.variants?.length > 0 && (
                                    <VariantPicker
                                        variants={product?.variants}
                                        selectedVariant={selectedVariant}
                                        setSelectedVariant={setSelectedVariant}
                                        isDarkMode={isDarkMode}
                                    />
                                )}

                                <div className=''>
                                    <div className={`flex w-full items-center gap-4 ${isDarkMode ? "bg-slate-600" : "bg-slate-200"} p-1 rounded-2xl w-fit`}>
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={` p-2 ${isDarkMode ? 'hover:bg-slate-700 text-white' : "hover:bg-white text-slate-900"} rounded-xl transition-all shadow-sm `}>
                                            <Minus size={16} />
                                        </button>
                                        <span className={` w-full text-center font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className={` p-2 ${isDarkMode ? 'hover:bg-slate-700 text-white' : "hover:bg-white text-slate-900"} rounded-xl transition-all shadow-sm`}>
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer: Price & CTA */}
                        <div className={`space-y-4 mt-2 p-6 border-t ${isDarkMode ? "border-slate-700 bg-slate-800/50" : "border-slate-200 bg-white/50"}`}>
                            <div className="text-left">
                                <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Total Payment</p>
                                {product?.discount_price && (
                                    <div className="text-sm opacity-40 line-through font-bold">
                                        {formatIDR((selectedVariant?.price ?? product?.price ?? 0) * quantity)}
                                    </div>
                                )}
                                <div className="text-4xl font-black italic tracking-tighter text-[var(--product-primary-color)]">
                                    {formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}
                                </div>
                            </div>

                            <button
                                disabled={disableButton}
                                onClick={() => addCart()}
                                className={`disabled:bg-gray-600 w-full py-5 ${isDarkMode ? "bg-white text-black hover:bg-slate-100" : "bg-black text-white hover:bg-slate-900"} rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all active:scale-95`}
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="bottom-right">
                <div className="flex flex-col items-end gap-3">
                    <div className={`${isDarkMode ? "bg-slate-800" : "bg-white"} p-3 rounded-2xl shadow-xl border-2 border-[var(--product-primary-color)] animate-bounce`}>
                        <Check className={'text-[var(--product-primary-color)]'} size={16} />
                    </div>
                    <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl max-w-[200px] text-center">
                        <p className="text-xs font-bold">{mockItem?.name}!</p>
                    </div>
                </div>
            </AlertWrapper>

        </div>
    )
}

export default Four