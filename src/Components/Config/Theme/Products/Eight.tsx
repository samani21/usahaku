import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ShoppingCart, Tag } from 'lucide-react';
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);

                return (
                    <div
                        onClick={() => {
                            setProduct(p)
                            setProductAlert(p)
                        }}
                        key={p.id}
                        className='relative cursor-pointer group'
                    >
                        {/* Badge Diskon Float */}
                        {label && (
                            <div className="absolute top-4 left-4 z-1 bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                                {label}
                            </div>
                        )}

                        <div className='h-80 sm:h-96 rounded-[24px] flex items-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]' style={{
                            backgroundImage: `url(${p?.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}>
                            <div className='w-full h-full rounded-[24px] flex flex-col justify-end'>
                                {/* Garis Horizontal Dekoratif */}
                                <div className={`w-full h-2 transition-colors duration-500 ${isDarkMode ? "bg-slate-900" : "bg-white"}`} />

                                {/* Overlay Konten */}
                                <div className={`w-full bg-black/70 backdrop-blur-sm h-1/2 flex flex-col justify-end p-6 text-white`}>
                                    {p?.category &&
                                        <span className="text-[10px] font-black uppercase opacity-60 tracking-[0.2em]">{p?.category}</span>
                                    }
                                    <h3 className="text-xl font-bold leading-none mt-1 italic uppercase tracking-tighter line-clamp-1">{p?.name}</h3>

                                    <div className="mt-4">
                                        {label && (
                                            <span className="text-[10px] line-through opacity-40 block -mb-1">
                                                {formatIDR(p.price)}
                                            </span>
                                        )}
                                        <p className="text-2xl font-black text-[var(--product-primary-color)]">{formatIDR(finalPrice)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Garis Vertikal Dekoratif */}
                            <div className={`${isDarkMode ? "bg-slate-900" : "bg-white"} w-4 h-full transition-colors duration-500`} />

                            {/* Blue Tint Overlay */}
                            <div className='absolute inset-0 bg-blue-500 rounded-[24px] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none' />
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
                <div className={`w-full p-6 sm:p-12 flex md:overflow-auto md:overflow-x-hidden no-scrollbar flex-col md:flex-row gap-12 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                    <div className={`md:w-1/2 aspect-square rounded-[3rem] p-4 ${isDarkMode ? 'shadow-[10px_10px_20px_#0b111e,-10px_-10px_20px_#1e293b]' : 'shadow-[10px_10px_20px_#d1d5db,-10px_-10px_20px_#ffffff]'}`}>
                        <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover rounded-[2.5rem]" alt="" />
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 italic">{product?.category}</span>
                            <h2 className="text-4xl md:text-5xl font-black opacity-80 italic tracking-tighter leading-none uppercase">
                                {product?.name}
                            </h2>
                        </div>
                        <div className={`p-6 rounded-3xl space-x-2 w-fit ${isDarkMode ? 'shadow-inner bg-slate-950' : 'shadow-inner bg-slate-100'}`}>
                            <span className="text-xl md:text-3xl font-black tracking-tighter text-rose-500 italic">
                                {formatIDR(selectedVariant?.final_price || product?.final_price || 0)}
                            </span>
                            {
                                product?.discount_price &&
                                <>
                                    <span className="text-md font-black opacity-60 italic line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</span>
                                    <div className="flex items-center gap-2 text-emerald-500 font-black italic text-sm animate-pulse">
                                        <Tag size={16} />
                                        HEMAT {formatIDR(product?.discount_price)} {product?.percent_discount && `(${Promo(product, selectedVariant)})`}
                                    </div>
                                </>
                            }
                        </div>
                        <ExpandableHTML
                            htmlContent={product?.description}
                            className={`text-sm leading-relaxed`}
                        // Bisa diganti line-clamp-5 dll
                        />
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
                                    <p className='font-semibold text-gray-700'>Total</p>
                                    <p className='text-1xl sm:text-2xl font-bold'>{formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <button disabled={disableButton} onClick={() => addCart()} className={`flex-1 disabled:bg-gray-600 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[var(--product-primary-color)] transition-all active:scale-95 ${isDarkMode ? 'shadow-[6px_6px_12px_#0b111e,-6px_-6px_12px_#1e293b]' : 'shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]'}`}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-center">
                <div className={`${isDarkMode ? "bg-slate-900 border border-slate-800 text-white" : "bg-white text-slate-900"} p-2 rounded-3xl shadow-2xl flex justify-between gap-4 pr-6 `}>
                    <div className='flex items-center gap-4'>
                        {/* <img src={mockItem.image} className="w-16 h-16 rounded-2xl object-cover" alt="" /> */}
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] font-black text-emerald-500 uppercase">Item berhasil masuk keranjang</span>
                            <h4 className="text-xs font-bold truncate w-32">{mockItem.name}</h4>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className={`p-2 ${isDarkMode ? "g-slate-800" : "bg-slate-100"} rounded-xl`}><ShoppingCart size={16} /></div>
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Eight