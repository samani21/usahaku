import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ArrowRight, CircleCheckBig, CircleCheckIcon, Sparkles, Tag } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails, Promo } from './PromoType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;


}

const Three = ({ products, isDarkMode, handleCart }: Props) => {
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
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-2 h-full'>
            {products?.map((p, i) => {
                const { finalPrice, label } = getPromoDetails(p);

                return (
                    <div
                        onClick={() => setProduct(p)}
                        key={p.id}
                        className="group cursor-pointer flex flex-col items-center justify-center"
                    >
                        {/* Image Container Circle */}
                        <div className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full shadow-2xl transition-transform duration-500 group-hover:-translate-y-4 border-[10px] ${isDarkMode ? "border-slate-800" : "border-white"}`}>

                            {/* Badge Diskon - Permanen (Tidak perlu hover) */}
                            {label && (
                                <div className="absolute top-2 right-2 z-1 bg-[var(--product-primary-color)] text-white text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-full uppercase italic shadow-lg border-2 border-white animate-bounce-slow">
                                    {label}
                                </div>
                            )}

                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                    src={p?.image}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    alt={p.name}
                                />
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="mt-8 flex flex-col items-center text-center space-y-2">
                            <span className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em]">{p.category}</span>
                            <h3 className="font-black text-xl uppercase italic leading-tight group-hover:text-[var(--product-primary-color)] transition-colors">
                                {p.name}
                            </h3>

                            <div className="flex flex-col items-center gap-1">
                                {label && (
                                    <span className="text-[10px] line-through opacity-30 font-bold">
                                        {formatIDR(p.price)}
                                    </span>
                                )}
                                <div className="px-6 py-2 rounded-full font-black text-sm transition-all bg-[var(--product-primary-color)] text-white group-hover:px-8 group-hover:bg-black group-hover:shadow-lg">
                                    {formatIDR(finalPrice)}
                                </div>
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
                    <div className={`md:w-2/5 p-6 sm:p-12 ${isDarkMode ? "bg-slate-800" : "bg-slate-50"} flex flex-col gap-8`}>
                        <img src={selectedVariant?.image ?? product?.image} className="w-full aspect-square rounded-3xl object-cover shadow-xl" alt="" />
                        <div className="space-y-4">
                            {
                                product?.service && product?.service?.length > 0 && product?.service?.map((s, i) => (
                                    <div key={i} className={`flex items-center gap-3 text-sm font-bold opacity-60`}>
                                        <CircleCheckBig size={24} className={isDarkMode ? 'text-[var(--product-secondary-color)]' : 'text-[var(--product-primary-color)]'} />{s?.title}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="md:w-3/5 p-6 sm:p-12 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="grid ">
                                <div className='flex items-center justify-end w-full'>
                                    {
                                        product?.discount_price &&
                                        <div className="bg-emerald-500 flex items-center gap-2 text-[12px] text-white px-4 py-2 rounded-2xl font-black italic">
                                            <span className='mt-1'>
                                                <Tag size={16} />
                                            </span>
                                            -{Promo(product, selectedVariant)}
                                        </div>
                                    }
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black">{product?.name}</h2>
                                    {
                                        product?.is_service ?
                                            <p className={`text-[var(--product-primary-color)] font-bold mt-1`}>Layanan Jasa Tersedia</p> :
                                            <p className={`text-[var(--product-primary-color)] font-bold mt-1`}>{product?.category}</p>
                                    }
                                    <div className='sm:flex items-center'>
                                        {
                                            product?.discount_price &&
                                            <p className="text-1xl font-black mr-4 line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</p>
                                        }
                                        <p className="text-3xl font-black">{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</p>
                                    </div>
                                </div>

                            </div>
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className={`opacity-50 text-sm`}
                            // Bisa diganti line-clamp-5 dll
                            />
                            {/* <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase opacity-30 tracking-widest">Pilih Paket Layanan</span>
                            <VariantButtons items={product?.variants} />
                        </div> */}
                            {product?.variants && product?.variants?.length > 0 ?
                                <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} /> : ""
                            }
                            {
                                product && product.is_qty ?
                                    <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                            }
                        </div>
                        <div className="sm:flex items-center gap-6 pt-4 " >
                            <div className="flex flex-col mb-4 sm:mb-0">
                                <span className="text-[10px] font-bold opacity-40 uppercase">Total</span>
                                {
                                    selectedVariant ? <span className="text-3xl font-black">{formatIDR((selectedVariant?.final_price ?? 0) * quantity)}</span> :
                                        <span className="text-3xl font-black">{formatIDR((product?.final_price ?? 0) * quantity)}</span>
                                }
                            </div>
                            <button disabled={disableButton} onClick={() => addCart()} className={`py-5 w-full bg-[var(--product-primary-color)] disabled:bg-gray-400 text-white rounded-3xl font-black flex items-center justify-center gap-3`}>
                                Order <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="bottom-center">
                <div className={`backdrop-blur-xl bg-[var(--product-primary-color)] border border-emerald-500/20 p-4 rounded-full flex items-center justify-between gap-4 px-6 shadow-2xl`}>
                    <Sparkles className={'text-[var(--product-secondary-color)]'} size={20} />
                    <p className="text-sm font-bold">Produk masuk keranjang!</p>
                    <div className="w-px h-4 bg-emerald-500/20" />
                    <button onClick={() => setActiveAlert(false)} className={`text-[10px] text-end  uppercase text-[var(--product-secondary-color)]`}>Tutup</button>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Three