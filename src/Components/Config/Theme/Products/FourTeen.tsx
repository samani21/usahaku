import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Package, Plus, ShoppingCart, Zap } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const Fourteen = ({ products, isDarkMode }: Props) => {
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
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full'>
            {products?.map((p, i) => (
                <div onClick={() => setProduct(p)} key={i} className={`relative flex flex-col h-80 rounded-[2rem] overflow-hidden cursor-pointer ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
                    <img src={p?.image} className="w-full h-1/2 object-cover" alt="" />
                    <div className="flex-1 p-6 relative flex flex-col justify-between">
                        <div className={`absolute -top-4 left-0 w-8 h-8 rounded-full ${isDarkMode ? "bg-slate-950 " : "bg-slate-50"} -ml-4`} />
                        <div className={`absolute -top-4 right-0 w-8 h-8 rounded-full ${isDarkMode ? " bg-slate-950" : "bg-slate-50"} -mr-4`} />
                        <div className="border-t-4 border-dotted border-white/20 absolute top-0 left-6 right-6" />
                        <div>
                            {
                                p?.category &&
                                <span className="text-[14px] font-black opacity-70">{p?.category}</span>
                            }
                            <h3 className="font-black sm:text-xl mt-2 leading-none uppercase italic">{p?.name}</h3>
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-2xl font-black">{formatIDR(p?.final_price ?? 0)}</p>
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
                <div className="md:w-2/3  text-white flex flex-col justify-between relative sm:border-r-4 border-dashed border-white/20" >
                    <img src={selectedVariant?.image ?? product?.image} className='h-full w-full object-cover' />
                </div>
                <div className="md:w-2/3 p-6 sm:p-12 flex flex-col justify-center gap-4 relative">
                    <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-slate-900 -translate-y-1/2" />
                    <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-slate-900 -translate-y-1/2" />
                    <div>
                        {
                            product?.category &&
                            <span className="text-[14px] font-black uppercase opacity-60">{product?.category}</span>
                        }
                        <h2 className="text-3xl sm:text-4xl font-black mt-2">{product?.name}</h2>
                    </div>
                    <div className="grid sm:flex items-center gap-4">
                        {product?.discount_price ?
                            <span className={`text-2xl sm:text-5xl font-black text-[var(--product-primary-color)] line-through`}>{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</span> :
                            <span className={`text-2xl sm:text-5xl font-black text-[var(--product-primary-color)]`}>{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</span>
                        }
                        {
                            product?.discount_price &&
                            <div className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-bold text-sm italic">Hemat {formatIDR((product?.price ?? 0) - (product?.final_price ?? 0))}</div>
                        }
                    </div>
                    <p className="text-sm max-w-md">{product?.description}</p>
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
                    <div className="flex gap-4 pt-6">
                        <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`px-10 disabled:bg-gray-600  py-5 bg-[var(--product-primary-color)] text-white rounded-[2rem] font-black uppercase italic shadow-xl`}>Klaim Sekarang</button>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`bg-[var(--product-primary-color)] text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center`}>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-2 rounded-lg"><Package size={18} /></div>
                        <p className="text-sm font-bold">{mockItem?.name} berhasil diamankan di keranjang!</p>
                    </div>
                    <button onClick={() => setActiveAlert(false)} className="text-xs font-black uppercase underline decoration-2 underline-offset-4">Tutup</button>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Fourteen