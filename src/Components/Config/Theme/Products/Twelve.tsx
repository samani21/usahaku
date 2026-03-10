import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { Check, Clock, Plus, ShoppingCart, Tag, Zap } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const Twelve = ({ products, isDarkMode }: Props) => {
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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  h-full'>
            {products?.map((p, i) => (
                <div onClick={() => setProduct(p)} key={i} className="relative h-80 group cursor-pointer flex items-center justify-center">
                    <div className="absolute inset-12 bg-rose-400 rounded-[2.5rem] rotate-12 transition-transform group-hover:rotate-0 opacity-20" />
                    <div className="absolute inset-12 bg-indigo-400 rounded-[2.5rem] -rotate-6 transition-transform group-hover:rotate-0 opacity-20" />
                    <div className={`relative w-[75%] sm:w-40 h-56 rounded-[2rem] overflow-hidden shadow-2xl transition-transform group-hover:-translate-y-6 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
                        <img src={p?.image} className="w-full h-2/3 object-cover" alt="" />
                        <div className="pt-0 p-4 text-center">
                            {
                                p?.category &&
                                <span className="text-[12px] font-black uppercase opacity-60">{p?.category}</span>
                            }
                            <h3 className="font-bold text-[18px] sm:text-sm truncate">{p?.name}</h3>
                            <p className={`font-black sm:text-sm  text-[var(--product-primary-color)]`}>{formatIDR(p?.final_price ?? 0)}</p>
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
                <div className="w-full p-5 sm:p-10 flex flex-col gap-10">
                    <div className={`sm:flex justify-between items-center pb-6 border-b ${isDarkMode ? "border-slate-800" : "border-slate-300"}`}>
                        <h2 className="text-3xl font-black tracking-tighter">{product?.name}</h2>
                        {product?.discount_price ?
                            <div className={`text-2xl font-black text-[var(--product-primary-color)] line-through`}>{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div> :
                            <div className={`text-2xl font-black text-[var(--product-primary-color)]`}>{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div>
                        }
                    </div>
                    <div className="grid grid-cols-1 md:flex gap-6 items-center justify-center">
                        <div className="md:col-span-1 rounded-3xl overflow-hidden w-full h-full min-h-[200px] shadow-xl">
                            <img src={selectedVariant?.image ?? product?.image} className="sm:w-full sm:h-72 object-cover" alt="" />
                        </div>
                        {
                            product?.description &&
                            <div className="grid grid-cols-1 sm:w-full gap-6">
                                <div className={`p-6 rounded-3xl ${isDarkMode ? "bg-slate-800" : "bg-slate-50"} space-y-3`}>
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><Tag size={20} /></div>
                                    <h4 className="font-black text-xs uppercase opacity-40">Deskripsi</h4>
                                    <ExpandableHTML
                                        htmlContent={product?.description}
                                        className={`text-xs leading-relaxed opacity-60`}
                                        maxLines="line-clamp-[2]" // Bisa diganti line-clamp-5 dll
                                        maxHeight='max-h-[200px]'
                                    />
                                </div>
                            </div>
                        }
                    </div>
                    <div className={`flex flex-col md:flex-row sm:items-end justify-between gap-6 pt-6 border-t ${isDarkMode ? "border-slate-800" : "border-slate-300"}`}>
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
                        <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`disabled:bg-gray-600 px-12 py-5 bg-[var(--product-primary-color)] text-white rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl`}>Pesan Sekarang</button>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`${isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"} rounded-2xl shadow-2xl border-2 p-5 space-y-4`}>
                    <div className="flex items-center gap-3">
                        <Clock size={16} className={'text-[var(--product-primary-color)]'} />
                        <p className="text-xs font-bold">Pesanan berhasil dibuat.</p>
                    </div>
                    <div className={`h-1.5 ${isDarkMode ? "bg-slate-800" : "bg-slate-100"} rounded-full overflow-hidden`}>
                        <div className={`h-full bg-[var(--product-primary-color)] animate-[timer_5s_linear_forwards]`} />
                    </div>
                    <button onClick={() => setActiveAlert(false)} className="w-full py-2 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase">Tutup</button>
                </div>
            </AlertWrapper>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes timer {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}} />

        </div>
    )
}

export default Twelve