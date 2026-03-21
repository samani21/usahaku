import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import AlertWrapper from './AlertWrapper';
import { ArrowRight, X } from 'lucide-react';
import { col } from 'framer-motion/client';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const Two = ({ products, isDarkMode }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null)
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
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 h-full'>
            {products?.map((p, i) => (
                <div key={i} onClick={() => setProduct(p)} className="group cursor-pointer text-center flex flex-col items-center">
                    <div className="w-full aspect-[6/4] sm:aspect-[3/4] rounded-[3rem] overflow-hidden mb-2">
                        <img src={p?.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                    </div>
                    <h3 className="font-black italic uppercase text-sm ">{p?.name}</h3>
                    <p className="opacity-50 text-xs">{formatIDR(p?.final_price ?? 0)}</p>
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
                <div className="absolute inset-0 grayscale opacity-20 pointer-events-none">
                    <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="relative w-full p-6 sm:p-12 flex flex-col items-center text-center max-w-2xl mx-auto space-y-8 overflow-auto no-scrollbar">
                    <div className={`sm:w-40 sm:h-40 rounded-[3rem] shadow-2xl border-8 ${isDarkMode ? "border-slate-800" : "border-white"}`}>
                        <img src={selectedVariant?.image ?? product?.image} className="w-full rounded-[3rem] h-full object-cover" alt="" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-5xl font-black tracking-tighter italic uppercase">{product?.name}</h2>
                        <p className={`text-[var(--product-primary-color)] font-bold uppercase tracking-[0.3em] text-xs`}>{product?.category}</p>
                    </div>
                    <ExpandableHTML
                        htmlContent={product?.description}
                        className={`opacity-80 text-sm text-left`}
                    // Bisa diganti line-clamp-5 dll
                    />
                    {product?.variants && product?.variants?.length > 0 &&
                        <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                    }
                    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
                        <div className='sm:flex items-end jusitfy-center gap-4'>
                            {
                                product?.discount_price &&
                                <div className="text-1xl font-black line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div>

                            }
                            <div className="text-3xl md:text-4xl font-black">{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</div>
                        </div>
                        {
                            product && product.is_qty ?
                                <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                        }
                        {
                            selectedVariant && product && product.is_qty ?
                                <div className="text-4xl font-black">{formatIDR((selectedVariant?.final_price ?? 0) * quantity)}</div> :
                                product && product.is_qty ?
                                    <div className="text-4xl font-black">{formatIDR((product?.final_price ?? 0) * quantity)}</div> : ""
                        }
                        <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`w-full py-5 disabled:bg-gray-600  ${isDarkMode ? "bg-white text-black" : "bg-black text-white"} rounded-full font-black uppercase tracking-widest text-sm`}>Masukkan Keranjang</button>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`rounded-3xl shadow-2xl border-2 ${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} overflow-hidden`}>
                    <div className={`p-5 ${isDarkMode ? "bg-slate-800/50" : "bg-slate-50"} flex justify-between items-center`}>
                        <span className="text-xs font-black uppercase italic">Isi Keranjang (1)</span>
                        <X size={16} className="cursor-pointer opacity-30" onClick={() => setActiveAlert(false)} />
                    </div>
                    <div className="p-5 flex gap-4">
                        <img src={mockItem.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                        <div className="flex-1 space-y-1">
                            <h4 className="text-xs font-bold leading-tight">{mockItem.name}</h4>
                            <p className={`text-sm font-black text-[var(--product-primary-color)]`}>{formatIDR((mockItem.price ?? 0) * mockItem?.quantity)}</p>
                        </div>
                    </div>
                    <div className={`p-4 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}>
                        <button className={`w-full py-3 ${isDarkMode ? 'bg-[var(--product-primary-color)]' : "bg-slate-900"} text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2`}>
                            Lihat Keranjang <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Two