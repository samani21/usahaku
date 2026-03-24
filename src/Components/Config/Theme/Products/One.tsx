import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import AlertWrapper from './AlertWrapper';
import { Check, Tag, X } from 'lucide-react';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails, Promo } from './PromoType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;
}

const One = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null)
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null)
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
            name: productAlert?.name,
            price: productAlert?.final_price,
            image: productAlert?.image,
            category: productAlert?.category
        }
    }, [activeAlert])
    useEffect(() => {
        if (activeAlert) {
            const timer = setTimeout(() => setActiveAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [activeAlert]);
    const addCart = () => {
        setActiveAlert(true);
        setProduct(null);
        setSelectedVariant(null);
        setQuantity(1)
        if (handleCart) {
            handleCart(product, selectedVariant, quantity)
        }
    }
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);

                return (
                    <div
                        key={p.id}
                        onClick={() => {
                            setProduct(p)
                            setProductAlert(p)
                        }}
                        className={`group cursor-pointer rounded-3xl overflow-hidden border-2 transition-all ${isDarkMode
                            ? 'bg-zinc-900 border-zinc-800 text-white'
                            : 'bg-white border-slate-100 shadow-xl text-slate-900'
                            }`}
                    >
                        <div className="relative aspect-square overflow-hidden">
                            {/* Label Diskon Permanen */}
                            {label && (
                                <div className="absolute top-4 right-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase italic shadow-lg">
                                    {label}
                                </div>
                            )}
                            <img
                                src={p?.image}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                alt={p.name}
                            />
                        </div>

                        <div className="py-4 px-6">
                            <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">{p.category}</span>
                            <h3 className="font-bold text-lg mt-1 group-hover:text-[var(--product-primary-color)] transition-colors line-clamp-1">
                                {p?.name}
                            </h3>
                            <div className="mt-2 flex flex-col">
                                {label && (
                                    <span className="text-[10px] line-through opacity-30 font-bold -mb-1">
                                        {formatIDR(p.price)}
                                    </span>
                                )}
                                <p className="font-black text-xl text-[var(--product-primary-color)]">
                                    {formatIDR(finalPrice)}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}

            <ModalWrapper
                activeModal={product ? true : false}
                closeModal={() => {
                    setProduct(null)
                    setSelectedVariant(null)
                    setQuantity(1)
                }}
                isDarkMode={isDarkMode}>
                <div className='md:flex overflow-auto'>
                    <div className="md:w-1/2 md:h-64 md:h-auto md:overflow-hidden">
                        <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt={product?.name} />
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 space-y-6 flex flex-col justify-center overflow-y-hidden">
                        <div className='flex items-center justify-between'>
                            {
                                product?.category ?
                                    <span className={`px-3 py-1 ${isDarkMode ? "bg-[var(--product-primary-color)] text-[var(--product-secondary-color)]" : "text-[var(--product-primary-color)] bg-[var(--product-primary-color)]/5"} text-[10px] font-black rounded-full w-fit uppercase tracking-widest`}>{product?.category}</span> : ""
                            }
                            {
                                product?.discount_price &&
                                <div className='bg-rose-500 flex text-white items-center font-black px-2 py-1 rounded-full text-[12px] gap-2'>
                                    <Tag size={18} />
                                    <span>- {Promo(product, selectedVariant)}</span>
                                </div>
                            }
                        </div>
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
                            <div className='flex items-center gap-4'>
                                <button onClick={() => {
                                    setProduct(null)
                                    setSelectedVariant(null)
                                    setQuantity(1)
                                }} className={`w-full disabled:bg-gray-600 py-4 bg-[var(--product-primary-color)] text-white rounded-2xl font-black shadow-lg shadow-[var(--product-primary-color)]`}>BATAL</button>
                                <button disabled={disableButton} onClick={() => addCart()} className={`w-full disabled:bg-gray-600 py-4 bg-[var(--product-primary-color)] text-white rounded-2xl font-black shadow-lg shadow-[var(--product-primary-color)]`}>BELI SEKARANG</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className={`${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"} p-4 rounded-2xl shadow-2xl border border-emerald-500/20 flex items-center gap-4`}>
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