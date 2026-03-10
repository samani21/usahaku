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

const Sevent = ({ products, isDarkMode }: Props) => {
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
            setProduct(null)
            setSelectedVariant(null)
            setQuantity(1)
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
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full'>
            {products?.map((p, i) => (
                <div onClick={() => setProduct(p)} key={i} className={`${isDarkMode ? "bg-slate-900" : "bg-slate-100"} border-2 border-cyan-500/30 group cursor-pointer relative  overflow-hidden`}>
                    {
                        p?.percent_discount &&
                        <div className={`absolute top-0 z-1 right-0 p-2 flex items-center justify-center bg-cyan-500 text-slate-50 font-mono text-[14px]`}>{p?.percent_discount} %</div>
                    }
                    <img src={p?.image} className="w-full aspect-video object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                    <div className={`p-2 font-mono text-cyan-400 space-y-1`}>
                        {
                            p?.category &&
                            <p className="text-md underline">{p?.category}</p>

                        }
                        <h3 className={`${isDarkMode ? `text-slate-200` : `text-slate-800`} italic tracking-widest`}>{p?.name}</h3>
                        <p className="text-sm font-bold mt-2">{formatIDR(p?.final_price ?? 0)}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 group-hover:h-2 transition-all" />
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
                <div className={`w-full ${isDarkMode ? "bg-black text-cyan-400" : "bg-slate-100 text-gray-900"} font-mono p-8 border-4 border-cyan-500 relative`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="relative border border-cyan-500/50 p-2">
                            <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover opacity-80 transition-all" alt="" />
                        </div>
                        <div className="space-y-6">
                            <div>
                                {
                                    product?.category &&
                                    <span className="text-[14px] font-semibold opacity-50 underline">{product?.category}</span>
                                }
                                <h2 className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-black"} italic`}>{product?.name.toUpperCase()}</h2>
                            </div>
                            <div className="bg-cyan-500/10 p-4 border-l-4 border-cyan-500">
                                {
                                    product?.discount_price &&
                                    <div className="text-1xl font-black line-through opacity-60">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div>
                                }
                                <div className="text-2xl sm:text-4xl font-black">{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</div>
                            </div>
                            <div className="space-y-2">
                                <ExpandableHTML
                                    htmlContent={product?.description}
                                    className={`text-xs leading-loose opacity-70`}
                                    maxLines="line-clamp-[2]" // Bisa diganti line-clamp-5 dll
                                    maxHeight='max-h-[200px]'
                                />
                                {product?.variants && product?.variants?.length > 0 ?
                                    <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} /> : ""
                                }
                                <div className='flex items-end justify-between gap-2'>
                                    {
                                        product && product?.is_qty ?
                                            <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                                    }
                                    <div>
                                        <p className='font-semibold text-gray-700'>Total</p>
                                        <p className='text-1xl sm:text-2xl font-bold'>{formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-8 flex gap-4">
                                <button disabled={disableButton} onClick={() => setActiveAlert(true)} className={`flex-1 disabled:bg-gray-600 py-4 bg-cyan-500 text-black font-black uppercase italic text-sm ${isDarkMode ? "hover:bg-white" : "hover:bg-black hover:text-white"} transition-colors`}>Pesan Sekarang</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`${isDarkMode ? "bg-black" : "bg-slate-100"} border border-cyan-500 p-4 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-mono`}>
                    <div className={`text-[12px] ${isDarkMode ? "text-cyan-400" : "text-gray-800"} mb-1`}>&gt; Item masuk ke keranjang</div>
                    <div className={`${isDarkMode ? 'text-white' : 'text-black'} text-xs font-bold italic uppercase tracking-widest`}>Item: {mockItem.name}</div>
                    <div className="mt-3 h-1 bg-cyan-950 w-full overflow-hidden">
                        <div className="h-full bg-cyan-400 animate-in slide-in-from-left duration-1000 fill-mode-forwards" style={{ width: '100%' }} />
                    </div>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Sevent