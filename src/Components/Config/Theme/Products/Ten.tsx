import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Plus, ShoppingCart, Zap } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const Ten = ({ products, isDarkMode }: Props) => {
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
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full'>
            {products?.map((p, i) => (
                <div onClick={() => setProduct(p)} key={i} className={`border-[6px] ${isDarkMode ? "border-white bg-slate-900" : "border-black bg-white"} p-6 flex flex-col items-center cursor-pointer group hover:bg-black hover:text-white transition-all`}>
                    <h3 className={`font-black italic text-xl uppercase tracking-tighter mb-4 text-center line-through decoration-[var(--product-primary-color)] group-hover:no-underline `}>{p?.name}</h3>
                    <img src={p?.image} className="w-full aspect-[16/6] object-cover grayscale mb-6" alt="" />
                    <div className="w-full flex justify-between items-center font-mono font-black text-sm">
                        {
                            p?.category &&
                            <span>{p?.category}</span>
                        }
                        <span>&gt;&gt; {formatIDR(p?.final_price ?? 0)}</span>
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
                <div className="md:w-3/5 p-6 sm:p-12 space-y-8 flex flex-col justify-center">
                    <img src={selectedVariant?.image ?? product?.image} className="md:hidden w-full h-full object-cover rounded-[24px]" alt="" />
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <span className={`px-4 py-1 rounded-full ${isDarkMode ? "bg-slate-800" : "bg-slate-100"} text-[10px] font-black uppercase tracking-widest`}>{product?.category}</span>
                            {
                                product?.percent_discount &&
                                <span className="px-4 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest">- {product?.percent_discount}%</span>
                            }
                        </div>
                        <h2 className="text-5xl font-black tracking-tight leading-none">{product?.name}</h2>
                    </div>
                    <p className="text-sm opacity-60 font-medium">{product?.description}</p>
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
                        <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`flex-1 disabled:bg-gray-600 py-5 ${isDarkMode ? "bg-white text-black" : "bg-slate-900 text-white"} rounded-3xl font-black uppercase tracking-widest shadow-2xl`}>Confirm Order</button>
                    </div>
                </div>
                <div className="hidden md:grid md:w-2/5 h-80 md:h-auto">
                    <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt="" />
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-center">
                <div className={`${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"} px-4 py-2 rounded-full shadow-lg flex items-center gap-3 border`}>
                    <div className={`w-2 h-2 rounded-full bg-[var(--product-primary-color)] animate-ping`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{mockItem?.name} berhasil diorder</span>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Ten