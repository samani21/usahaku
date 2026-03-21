import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Zap } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const Four = ({ products, isDarkMode }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<Variants | null>(null)
    const [quantity, setQuantity] = useState<number>(1)
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
                <div onClick={() => setProduct(p)} key={i} className="relative h-80 rounded-[2.5rem] overflow-hidden group cursor-pointer">
                    <img src={p?.image} className="absolute inset-0 w-full h-full object-cover grayscale-70" alt="" />
                    <div className={`absolute inset-4 ${isDarkMode ? "bg-black/20" : "bg-black/20"} backdrop-blur-xl border border-white/30 rounded-[2rem] flex flex-col justify-end text-white mt-4`}>
                        <img src={p?.image} className='rounded-t-[2rem] w-full h-46.5 object-cover ' />
                        <div className='px-6 py-4'>
                            <h3 className="text-xl font-bold">{p?.name}</h3>
                            <p className="font-black">{formatIDR(p?.final_price ?? 0)}</p>
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
                <div className="w-full sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="rounded-[2rem] overflow-hidden">
                            <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt="" />
                        </div>

                    </div>
                    <div className={`${isDarkMode ? "bg-slate-800" : "bg-slate-100"} rounded-[2.5rem]   flex flex-col justify-between`}>
                        <div className="space-y-4 p-4">
                            <div className={` ${isDarkMode ? "bg-slate-800" : "bg-slate-50"} rounded-2xl p-2`}>
                                {
                                    product?.category &&
                                    <div>
                                        <span className="text-[10px] font-black opacity-60 tracking-widest uppercase">{product?.category}</span>
                                        <div className={`h-1 w-10 bg-[var(--product-primary-color)] mt-2`} />
                                    </div>
                                }
                                <h3 className="text-xl font-black mb-2">{product?.name}</h3>
                                <ExpandableHTML
                                    htmlContent={product?.description}
                                    className={`text-xs opacity-50`}
                                // Bisa diganti line-clamp-5 dll
                                />
                            </div>
                            {product?.percent_discount &&
                                <div className="p-4 bg-blue-500 text-white rounded-[2rem] flex flex-row justify-start gap-2">
                                    <Zap size={32} />
                                    <div className="text-2xl font-black italic">{product?.percent_discount}% OFF</div>
                                </div>
                            }
                            {product?.variants && product?.variants?.length > 0 ?
                                <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} /> : ""
                            }
                            {
                                product && product.is_qty ?
                                    <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                            }
                        </div>
                        <div className="space-y-4 mt-2 p-4">
                            <div className="text-left">
                                {
                                    product?.discount_price &&
                                    <div className="text-lg opacity-80 line-through">{formatIDR((selectedVariant?.price ?? product?.price ?? 0) * quantity)}</div>
                                }
                                <div className="text-4xl font-black">{formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}</div>
                            </div>
                            <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`disabled:bg-gray-600 w-full py-5 ${isDarkMode ? "bg-white text-black" : "bg-black text-white"} rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-2xl`}>
                                Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="bottom-right">
                <div className="flex flex-col items-end gap-3">
                    <div className={`${isDarkMode ? "bg-slate-800" : "bg-white"} p-3 rounded-2xl shadow-xl border-2 border-[var(--product-primary-color)] animate-bounce`}>
                        <Check className={'text-[var(--product-primary-color)]'} size={16} />
                    </div>
                    <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl max-w-[200px] text-center">
                        <p className="text-xs font-bold">{mockItem?.name}!</p>
                    </div>
                </div>
            </AlertWrapper>

        </div>
    )
}

export default Four