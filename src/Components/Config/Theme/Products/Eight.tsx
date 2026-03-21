import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ShoppingCart } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const Eight = ({ products, isDarkMode }: Props) => {
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
                <div onClick={() => setProduct(p)} key={i} className='relative cursor-pointer'>

                    <div className='h-82 rounded-[24px] flex items-center overflow-hidden' style={{
                        backgroundImage: `url(${p?.image})`,
                        backgroundSize: "cover"
                    }}>
                        <div className='w-full h-full rounded-[24px] flex flex-col justify-end'>
                            <div className={`w-full h-2 ${isDarkMode ? "bg-slate-900" : "bg-white"}`} />
                            <div className={`w-full bg-black/60 h-1/2 flex flex-col justify-end p-4 text-white`}>
                                {p?.category &&
                                    <span className="text-md font-black uppercase opacity-60">{p?.category}</span>
                                }
                                <h3 className="text-lg font-bold leading-none mt-1 italic">{p?.name}</h3>
                                <p className="text-xl font-bold mt-2">{formatIDR(p?.final_price ?? 0)}</p>
                            </div>
                        </div>
                        <div className={`${isDarkMode ? "bg-slate-900" : "bg-white"} w-4 h-full`} />

                        <div className='w-full h-full bg-blue-500 rounded-[24px] opacity-10'>

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
                <div className={`w-full p-6 sm:p-12 flex flex-col md:flex-row gap-12 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                    <div className={`md:w-1/2 aspect-square rounded-[3rem] p-4 ${isDarkMode ? 'shadow-[10px_10px_20px_#0b111e,-10px_-10px_20px_#1e293b]' : 'shadow-[10px_10px_20px_#d1d5db,-10px_-10px_20px_#ffffff]'}`}>
                        <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover rounded-[2.5rem]" alt="" />
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center space-y-8">
                        <h2 className="text-4xl font-black opacity-80">{product?.name}</h2>
                        <div className={`p-6 rounded-3xl w-fit ${isDarkMode ? 'shadow-inner bg-slate-950' : 'shadow-inner bg-slate-100'}`}>
                            {
                                product?.discount_price ?
                                    <span className="text-3xl font-black opacity-60 italic line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</span> :
                                    <span className="text-3xl font-black opacity-60 italic">{formatIDR(selectedVariant?.final_price ?? product?.price ?? 0)}</span>
                            }
                        </div>
                        <ExpandableHTML
                            htmlContent={product?.description}
                            className={`text-sm leading-relaxed`}
                            // Bisa diganti line-clamp-5 dll
                            maxHeight='max-h-[200px]'
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
                            <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`flex-1 disabled:bg-gray-600 py-5 rounded-[2rem] font-black uppercase tracking-widest text-blue-500 transition-all active:scale-95 ${isDarkMode ? 'shadow-[6px_6px_12px_#0b111e,-6px_-6px_12px_#1e293b]' : 'shadow-[6px_6px_12px_#d1d5db,-6px_-6px_12px_#ffffff]'}`}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="bottom-right">
                <div className={`${isDarkMode ? "bg-slate-900 border border-slate-800" : "bg-white "} p-2 rounded-3xl shadow-2xl flex justify-between gap-4 pr-6 `}>
                    <div className='flex items-center gap-4'>
                        <img src={mockItem.image} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] font-black text-emerald-500 uppercase">Sukses Tambah</span>
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