import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Zap } from 'lucide-react';
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

const Fiveteen = ({ products, isDarkMode, handleCart }: Props) => {
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

    const addCart = () => {
        setActiveAlert(true);
        setProduct(null);
        if (handleCart) {
            handleCart(product, selectedVariant, quantity)
        }
    }

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);
                return (
                    <div onClick={() => setProduct(p)} key={i} className="relative group cursor-pointer hover:bg-[var(--product-primary-color)]/5 rounded-md flex flex-col items-center justify-center p-4">
                        {label && (
                            <div className="absolute top-4 right-4 z-10 bg-[var(--product-primary-color)] text-[var(--product-secondary-color)] text-[9px] font-black px-3 py-1 rounded-full shadow-lg">
                                {label}
                            </div>
                        )}

                        <div className={`w-full mt-4 aspect-square rounded-full border-4 border-dashed ${isDarkMode ? "border-slate-700" : "border-slate-300"} p-3 group-hover:rotate-90 transition-transform duration-1000 ease-in-out`}>
                            <div className={`md:w-full md:h-full rounded-full overflow-hidden border-8 ${isDarkMode ? "border-slate-800" : 'border-white'} shadow-2xl`}>
                                <img src={p?.image} className="md:w-full md:h-full object-cover group-hover:scale-125 transition-transform duration-1000" alt="" />
                            </div>
                        </div>
                        <div className="text-center">
                            {
                                p?.category &&
                                <span className="text-[14px] font-black opacity-80 tracking-tighter">{p?.category}</span>
                            }
                            <h3 className="text-sm md:text-md font-black uppercase italic">{p?.name}</h3>
                            <div className="flex justify-between items-end mt-2">
                                <div className="mt-3 flex flex-col items-center">
                                    {/* Harga Coret (Jika ada promo) */}
                                    {label && (
                                        <p className="text-xs line-through opacity-40 font-bold mb-0.5">
                                            {formatIDR(p.price)}
                                        </p>
                                    )}
                                    {/* Harga Final */}
                                    <p className="text-lh md:text-2xl font-black">
                                        {formatIDR(finalPrice)}
                                    </p>
                                </div>
                            </div>
                        </div>
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
                <div className="absolute inset-0 pointer-events-none">
                    <img src={product?.image} className="w-full h-full object-cover blur-3xl opacity-30" alt="" />
                </div>
                <div className="relative w-full p-0 md:p-12 flex flex-col items-center">
                    <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 aspect-[4/5] rounded-[2.4rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white/50 relative">
                            <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-black/40 text-white rounded-bottom-[2rem]">
                                {
                                    product?.category &&
                                    <span className="text-[14px] font-bold  uppercase rounded-full">{product?.category}</span>
                                }
                            </div>
                        </div>
                        <div className="px-6 pb-4 md:p-0 md:w-1/2 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter leading-none">{product?.name}</h2>
                                <div className={`h-2 w-20 bg-[var(--product-primary-color)] rounded-full`} />
                            </div>
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className={`text-sm opacity-70 leading-relaxed font-light`}
                            />
                            <div className="flex flex-col gap-4">
                                {
                                    product?.discount_price ?
                                        <div className='flex '>
                                            <div className="text-2xl font-black line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div>
                                            <div className='mt-[-12px] text-[12px]'>
                                                <span className='text-rose-500 px-2 font-bold bg-red-50 p-1 rounded-full'>
                                                    - {Promo(product, selectedVariant)}
                                                </span>
                                            </div>
                                        </div> :
                                        <div className="text-2xl font-black">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div>
                                }
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
                                            <p className='text-1xl md:text-2xl font-bold'>{formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                                <button disabled={disableButton} onClick={() => addCart()} className={`w-full disabled:bg-gray-600  py-4 bg-[var(--product-primary-color)] text-white rounded-[3rem] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4`}>
                                    <Zap size={24} /> Checkout Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-center">
                <div className={`${isDarkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"} px-4 py-2 rounded-full shadow-lg flex items-center gap-3 border`}>
                    <div className={`w-2 h-2 rounded-full bg-[var(--product-primary-color)] animate-ping`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{mockItem?.name} berhasil diorder</span>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Fiveteen