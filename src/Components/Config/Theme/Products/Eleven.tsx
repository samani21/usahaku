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

const Eleven = ({ products, isDarkMode }: Props) => {
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
                <div onClick={() => setProduct(p)} key={i} className="p-1 rounded-[3rem] bg-gradient-to-br from-indigo-400 via-pink-400 to-amber-300 cursor-pointer group h-80">
                    <div className={`h-full w-full rounded-[2.9rem] p-8 flex flex-col items-center text-center justify-center space-y-4 ${isDarkMode ? 'bg-slate-900/90' : 'bg-white/90'}`}>
                        <div className="w-24 h-24 rounded-full bg-slate-100 overflow-hidden ring-4 ring-white shadow-xl"><img src={p?.image} className="w-full h-full object-cover" alt="" /></div>
                        <div>
                            {
                                p?.category &&
                                <span className="text-[14px] font-black opacity-70 tracking-widest uppercase">{p?.category}</span>
                            }
                            <h3 className="font-bold text-lg">{p?.name}</h3>
                            <p className="text-lg opacity-80 font-medium italic mt-2">{formatIDR(p?.final_price ?? 0)}</p>
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
                <div className="md:w-3/5 h-[400px] md:h-auto">
                    <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="md:w-2/5 p-8 flex flex-col">
                    {/* <div className="flex items-center gap-2 mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                        <span className="text-xs font-bold opacity-40">(128 Ulasan)</span>
                    </div> */}
                    <h2 className="text-2xl font-black mb-2">{product?.name}</h2>
                    {
                        product?.discount_price ?
                            <div className={`text-xl font-bold text-[var(--product-primary-color)] mb-6 line-through`}>{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div> :
                            <div className={`text-xl font-bold text-[var(--product-primary-color)] mb-6 `}>{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div>
                    }
                    <div className="flex-1 overflow-y-auto pr-2 mb-6 space-y-4">
                        <p className="text-sm opacity-60 leading-relaxed">{product?.description}</p>
                        {/* <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs italic opacity-80">
                            "Kopi terenak yang pernah saya beli di aplikasi ini! Roastingnya pas." - Andi S.
                        </div> */}
                    </div>
                    <div className={`pt-6 border-t ${isDarkMode ? "border-slate-800" : "border-slate-200"} space-y-4`}>
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
                        <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`w-full disabled:bg-gray-600 py-4 ${isDarkMode ? "bg-white text-black" : "bg-black text-white"} rounded-2xl font-black uppercase text-xs`}>Checkout</button>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`${isDarkMode ? "bg-slate-900" : "bg-white"} p-5 rounded-2xl shadow-2xl border-l-4 border-[var(--product-primary-color)]`}>
                    <h4 className="text-sm font-bold">Lanjutkan Belanja?</h4>
                    <p className="text-[10px] opacity-50 mt-1">{mockItem?.name} masuk keranjang belanja Anda.</p>
                    <div className="flex gap-2 mt-4">
                        <button onClick={() => setActiveAlert(false)} className={`flex-1 py-2 ${isDarkMode ? " bg-slate-800 text-white" : "bg-slate-800 text-white"} text-[10px] rounded-lg`}>BELANJA LAGI</button>
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Eleven