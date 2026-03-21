import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import AlertWrapper from './AlertWrapper';
import { Check, X } from 'lucide-react';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const One = ({ products, isDarkMode }: Props) => {
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
    // Tambahkan di bawah useEffect yang sudah ada
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
    const mockItem = useMemo(() => {
        return {
            name: product?.name,
            price: product?.final_price,
            image: product?.image,
            category: product?.category
        }
    }, [activeAlert])
    useEffect(() => {
        if (activeAlert) {
            const timer = setTimeout(() => setActiveAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [activeAlert]);

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-full'>
            {products?.map((p, i) => (
                <div key={i} onClick={() => setProduct(p)} className={` group cursor-pointer rounded-3xl overflow-hidden border-2 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 shadow-xl text-slate-900'}`}>
                    <img src={p?.image} className="w-full aspect-square object-cover" alt="" />
                    <div className="py-2 px-6">
                        <h3 className="font-bold text-lg mt-1">{p?.name}</h3>
                        <p className={`font-black text-xl mt-2 text-[var(--product-primary-color)]`} >{formatIDR(p?.final_price || 0)}</p>
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
                <div className="md:w-1/2 md:h-64 md:h-auto md:overflow-hidden">
                    <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt={product?.name} />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 space-y-6 flex flex-col justify-center">
                    {
                        product?.category ?
                            <span className={`px-3 py-1 ${isDarkMode ? "bg-[var(--product-primary-color)] text-[var(--product-secondary-color)]" : "text-[var(--product-primary-color)] bg-[var(--product-primary-color)]/5"} text-[10px] font-black rounded-full w-fit uppercase tracking-widest`}>{product?.category}</span> : ""
                    }
                    <h2 className="text-4xl font-black tracking-tight">{product?.name}</h2>
                    <div className="md:flex items-baseline gap-3">
                        <p className={`text-3xl font-black text-[var(--product-primary-color)]`}>{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</p>
                        {
                            product?.discount_price &&
                            <p className="text-lg opacity-30 line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</p>
                        }
                    </div>
                    {product?.variants && product?.variants?.length > 0 &&
                        <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} />
                    }
                    <ExpandableHTML
                        htmlContent={product?.description}
                        className={`${isDarkMode ? "text-slate-400" : "text-slate-500"} text-sm leading-relaxed`}
                    // Bisa diganti line-clamp-5 dll
                    />
                    <div className={`space-y-4 pt-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-400'}`}>
                        <div className='md:flex justify-between'>
                            {
                                product && product.is_qty ?
                                    <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                            }

                        </div>
                        <div className='flex items-center justify-between w-full'>
                            <p className='font-semibold'>Total</p>
                            {
                                selectedVariant && product && product.is_qty ?
                                    <p className={`text-lg font-black text-right text-[var(--product-primary-color)]`}>{formatIDR((selectedVariant?.final_price ?? 0) * quantity)}</p> :
                                    product && product.is_qty ?
                                        <p className={`text-lg font-black text-right text-[var(--product-primary-color)]`}>{formatIDR((product?.final_price ?? 0) * quantity)}</p> : <p className={`text-lg font-black text-right text-[var(--product-primary-color)]`}>{formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0))}</p>
                            }
                        </div>
                        <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`w-full disabled:bg-gray-600 py-4 bg-[var(--product-primary-color)] text-white rounded-2xl font-black shadow-lg shadow-[var(--product-primary-color)]`}>BELI SEKARANG</button>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`${isDarkMode ? "bg-slate-900" : "bg-white"} p-4 rounded-2xl shadow-2xl border border-emerald-500/20 flex items-center gap-4`}>
                    <div className={`w-10 h-10 bg-[var(--product-primary-color)] text-white rounded-xl flex items-center justify-center shrink-0`}>
                        <Check size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold">Berhasil ditambahkan!</p>
                        <p className="text-[10px] opacity-50 truncate w-40">{mockItem?.name}</p>
                    </div>
                    <button onClick={() => setActiveAlert(false)}><X size={16} className="opacity-20" /></button>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default One