import ModalWrapper from './ModalWrapper';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Minus, Plus, ShoppingCart, Zap } from 'lucide-react';
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


// Sub-komponen Qty (Gaya Neo-Brutalism)
const QtySelector = ({ quantity, setQuantity }: { quantity: number, setQuantity: Dispatch<SetStateAction<number>> }) => (
    <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-tighter">Jumlah</p>
        <div className="flex items-center bg-white border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-black hover:text-white border-r-4 border-black transition-colors"
            >
                <Minus size={18} strokeWidth={3} />
            </button>
            <span className="w-12 text-center font-black text-xl">{quantity}</span>
            <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-black hover:text-white border-l-4 border-black transition-colors"
            >
                <Plus size={18} strokeWidth={3} />
            </button>
        </div>
    </div>
);

// Sub-komponen Variant (Gaya Neo-Brutalism)
const VariantPicker = ({ variants, selectedVariant, setSelectedVariant }: { variants: Variants[], selectedVariant: Variants | null, setSelectedVariant: (v: Variants) => void }) => (
    <div className="space-y-3">
        <p className="text-xs font-black uppercase tracking-tighter text-white">Varian Tersedia</p>
        <div className="flex flex-wrap gap-3">
            {variants.map((v) => (
                <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 border-4 border-black font-black text-sm uppercase transition-all ${selectedVariant?.id === v.id
                        ? 'bg-white text-black -translate-y-1 -translate-x-1 shadow-[4px_4px_0px_white]'
                        : 'bg-black text-white hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0px_rgba(255,255,255,0.3)]'
                        }`}
                >
                    {v.name}
                </button>
            ))}
        </div>
    </div>
);

const Six = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null);
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
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);

                return (
                    <div
                        onClick={() => {
                            setProduct(p)
                            setProductAlert(p)
                        }}
                        key={p.id}
                        className={`relative group cursor-pointer h-96 ${isDarkMode ? "text-white" : "text-slate-900"}`}
                    >
                        {/* Bayangan Solid (Offset) */}
                        <div className={`absolute inset-0 translate-x-3 translate-y-3 transition-transform group-hover:translate-x-5 group-hover:translate-y-5 ${isDarkMode ? 'bg-white/10' : 'bg-black'}`} />

                        {/* Kartu Utama */}
                        <div className={`relative h-full border-4 border-black p-4 flex flex-col transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 ${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>

                            {/* Badge Diskon Brutalist */}
                            {label && (
                                <div className="absolute -top-4 -left-4 z-1 bg-[var(--product-primary-color)] text-[var(--product-secondary-color)] text-xs font-black px-4 py-2 border-4 border-black rotate-[-5deg]">
                                    {label}
                                </div>
                            )}

                            <div className="flex-1 overflow-hidden border-4 border-black mb-4">
                                <img
                                    src={p.image}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                                    alt={p.name}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase opacity-60 mb-1">[{p.category}]</span>
                                    <h3 className="font-black text-lg uppercase leading-tight italic line-clamp-1">{p.name}</h3>
                                </div>

                                <div className="flex justify-between items-end pt-2 border-t-2 border-black/10">
                                    <div className="flex flex-col">
                                        {label && (
                                            <span className="text-[10px] line-through font-bold opacity-40">
                                                {formatIDR(p.price)}
                                            </span>
                                        )}
                                        <span className="text-xl font-black italic tracking-tighter text-[var(--product-primary-color)]" >
                                            {formatIDR(finalPrice)}
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 border-4 border-black flex items-center justify-center bg-black text-white group-hover:bg-[var(--product-primary-color)] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
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
                <div className={`w-full p-6 md:p-12 flex flex-col md:flex-row gap-10 bg-[var(--product-primary-color)] text-black`}>

                    {/* Bagian Gambar (Bingkai Tebal & Solid Shadow) */}
                    <div className="md:w-1/2 border-[8px] border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] bg-white overflow-hidden group">
                        <img
                            src={selectedVariant?.image ?? product?.image}
                            className="w-full h-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                            alt=""
                        />
                    </div>

                    {/* Bagian Detail */}
                    <div className="md:w-1/2 overflow-x-hidden no-scrollbar  space-y-8">
                        <div className="space-y-2">
                            <p className="font-black text-sm uppercase tracking-tighter border-b-4 border-black inline-block">
                                {product?.category}
                            </p>
                            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                                {product?.name}
                            </h2>
                        </div>

                        {/* Harga dengan gaya 'Rotate Box' */}
                        <div className="bg-black text-[var(--product-primary-color)] p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.2)] w-fit transform -rotate-2">
                            {product?.discount_price && (
                                <p className="text-md md:text-lg line-through opacity-70 font-black mb-1">
                                    {formatIDR(selectedVariant?.price ?? product?.price ?? 0)}
                                </p>
                            )}
                            <p className="text-2xl md:text-3xl font-black italic tracking-tighter">
                                {formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}
                            </p>
                        </div>

                        <ExpandableHTML
                            htmlContent={product?.description}
                            className="font-bold text-base text-[var(--product-secondary-color)] leading-tight border-l-8 border-black pl-6 italic"
                        />

                        <div className="space-y-8">
                            {/* Varian Section */}
                            {product?.variants && product?.variants?.length > 0 ? (
                                <div className="bg-black px-6 py-4 shadow-[8px_8px_0px_rgba(0,0,0,0.3)]">
                                    <VariantPicker
                                        variants={product?.variants}
                                        selectedVariant={selectedVariant}
                                        setSelectedVariant={setSelectedVariant}
                                    />
                                </div>
                            ) : ""}

                            {/* Total & Qty Area */}
                            <div className=" gap-4 border-t-8 border-black pt-6">
                                <div className='flex items-center'>
                                    {product?.is_qty ? (
                                        <QtySelector quantity={quantity} setQuantity={setQuantity} />
                                    ) : ''}
                                    <div>

                                    </div>
                                </div>
                                <div className="text-right pr-4">
                                    <p className="font-black text-xs uppercase tracking-tighter opacity-60">Total Bayar</p>
                                    <p className="text-4xl font-black italic tracking-tighter">
                                        {formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}
                                    </p>
                                </div>
                            </div>

                            {/* Tombol Aksi Neo-Brutalism */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    disabled={disableButton}
                                    onClick={() => addCart()}
                                    className="flex-1 py-6 bg-white border-4 border-black font-black text-2xl uppercase italic shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 active:bg-zinc-100"
                                >
                                    <Zap size={28} fill="black" /> Order Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] ml-12">
                    <div className="bg-black text-white px-2 py-1 text-[10px] font-black uppercase w-fit mb-2">UPDATE</div>
                    <h4 className="font-black text-xl text-black italic uppercase leading-none">KERANJANG DIISI!</h4>
                    <p className="text-xs font-bold text-black mt-2">{mockItem?.name}, segera checkout.</p>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Six