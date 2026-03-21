import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { X } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const Thirteen = ({ products, isDarkMode }: Props) => {
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
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full'>
            {products?.map((p, i) => (
                <div onClick={() => setProduct(p)} key={i} className="text-center cursor-pointer group">
                    <div className={`aspect-[4/5] ${isDarkMode ? "bg-slate-900" : "bg-slate-100 "} mb-6 overflow-hidden relative`}>
                        <img src={p?.image} className={`w-full h-full object-cover ${isDarkMode ? "mix-blend-normal" : "mix-blend-multiply"} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700`} alt="" />
                        <div className="absolute inset-0 border border-current m-6 opacity-0 group-hover:opacity-30 transition-opacity" />
                    </div>
                    {
                        p?.category &&
                        <p className="text-[10px] sm:text-[12px] tracking-[0.8em] uppercase opacity-70 mb-3">{p?.category}</p>
                    }
                    <h3 className="text-md sm:text-lg font-light tracking-widest uppercase">{p?.name}</h3>
                    <div className="w-10 h-px bg-current mx-auto my-4 opacity-20" />
                    <span className="font-bold text-sm tracking-widest">{formatIDR(p?.final_price ?? 0)}</span>
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
                <div className="w-full flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-6 md:p-12 space-y-12 overflow-auto no-scrollbar">
                        <img src={selectedVariant?.image ?? product?.image} className="sm:hidden rounded-[24px] w-full h-full object-cover" alt="" />
                        <div className="space-y-4">
                            {
                                product?.category &&
                                <span className={`sm:hidden text-md font-black italic opacity-40 tracking-[0.2em] border-b ${isDarkMode ? "border-white/10 " : "border-black/10"} pb-2`}>{product?.category}</span>
                            }
                            <h2 className="text-3xl sm:text-5xl font-black italic tracking-tighter leading-none">{product?.name}</h2>
                        </div>
                        <div className="space-y-2">
                            {/* <p className="text-2xl font-serif italic leading-relaxed opacity-80">"Kualitas bukan sekadar janji, tapi sebuah warisan yang kami tuangkan dalam setiap produk."</p> */}
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className={`text-sm opacity-50 leading-relaxed max-w-sm`}
                                // Bisa diganti line-clamp-5 dll
                                maxHeight='max-h-[200px]'
                            />
                        </div>
                        <div className="space-y-8">
                            <div className="grid sm:flex items-baseline gap-4">
                                <span className="text-5xl font-black tracking-tighter">{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</span>
                                {
                                    product?.discount_price &&
                                    <span className="text-xl opacity-30 line-through italic">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</span>
                                }
                            </div>
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
                            <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`px-12 disabled:bg-gray-600  py-6 ${isDarkMode ? "bg-white text-black" : "bg-black text-white"} rounded-full font-black uppercase italic tracking-widest text-sm hover:scale-105 transition-transform active:scale-95`}>Mulai Pesan</button>
                        </div>
                    </div>
                    <div className="hidden sm:grid md:w-1/2 relative min-h-[400px]">
                        <img src={selectedVariant?.image ?? product?.image} className="absolute inset-0 w-full h-full object-cover" alt="" />
                        {product?.category &&
                            <div className={`absolute top-12 left-0 -ml-8 px-8 py-4 ${isDarkMode ? "bg-slate-900" : 'bg-white'} shadow-2xl rounded-2xl font-black italic text-xl transform -rotate-6`}>{product?.category}</div>
                        }
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-center">
                <div className={`bg-[var(--product-primary-color)] text-white rounded-full p-1 pl-4 flex items-center gap-4 shadow-2xl`}>
                    <span className="text-xs font-black uppercase tracking-tighter italic w-full">{mockItem?.name} Ok!</span>
                    <div onClick={() => setActiveAlert(false)} className="p-2 bg-white text-indigo-600 rounded-full cursor-pointer">
                        <X size={14} />
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Thirteen