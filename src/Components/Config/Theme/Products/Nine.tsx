import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Plus, ShoppingCart, Zap } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const Nine = ({ products, isDarkMode }: Props) => {
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
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full'>
            {products?.map((p, i) => (
                <div onClick={() => setProduct(p)} key={i} className={`col-span-1 md:col-span-2 flex h-30 sm:h-40 rounded-[2.5rem] overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] border-2 ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-2xl shadow-black/50 text-white' : 'bg-white border-slate-100 shadow-md shadow-slate-200 text-slate-900'}`}>
                    <div className="w-2/5 h-full">
                        <img src={p?.image} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 p-2 sm:p-8 flex flex-col justify-center">
                        {
                            p?.category &&
                            <span className="text-[12px] sm:text-[14px] font-black opacity-50 uppercase tracking-widest">{p?.category}</span>
                        }
                        <h3 className="font-black text-lg  sm:text-2xl uppercase italic leading-none my-2">{p?.name}</h3>
                        <div className="flex items-center justify-between">
                            <p className={`font-bold text-lg text-[var(--product-primary-color)]`}>{formatIDR(p?.final_price ?? 0)}</p>
                            <div className="p-3 bg-black text-white rounded-2xl"><Plus className="w-5 h-5" /></div>
                        </div>
                    </div>
                </div>
            ))}

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
                <div className="relative w-full p-6 sm:p-12 flex flex-col items-center">
                    <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white/50 relative">
                            <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt="" />

                        </div>
                        <div className="w-full md:w-1/2 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-2xl sm:text-4xl font-black italic tracking-tighter leading-none">{product?.name}</h2>
                                <div className={`h-2 w-20 bg-[var(--product-primary-color)] rounded-full`} />
                            </div>
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className={`text-sm opacity-70 leading-relaxed font-light`}
                                maxLines="line-clamp-[2]" // Bisa diganti line-clamp-5 dll
                                maxHeight='max-h-[200px]'
                            />
                            <div className="flex flex-col gap-4">
                                {
                                    product?.discount_price ?
                                        <div className="text-4xl font-black line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div> :
                                        <div className="text-4xl font-black ">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div>
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
                                            <p className='text-1xl sm:text-2xl font-bold'>{formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                                <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`w-full disabled:bg-gray-600 py-6 bg-[var(--product-primary-color)] text-white rounded-[3rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-4`}>
                                    <Zap size={24} /> Order Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="center">
                <div className={`${isDarkMode ? "bg-slate-900" : "bg-slate-200"} text-white p-10 rounded-[3.5rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10 text-center space-y-6`}>
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-[1.5rem] rotate-12 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                        <Check size={32} />
                    </div>
                    <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
                        <h3 className="text-2xl font-black italic tracking-tighter">BELANJAAN AMAN!</h3>
                        <p className="text-sm opacity-40 mt-1">Item favoritmu sudah kami simpan.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button onClick={() => setActiveAlert(false)} className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs">Tutup</button>
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Nine