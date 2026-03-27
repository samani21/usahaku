
import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ArrowRight, ShoppingBag, ShoppingCart } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';
import ExpandableHTML from './ExpandableHTML';
import { getPromoDetails } from './PromoType';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
    handleCart?: (p: ProductsType | null, v: Variants | null, qty: number) => void;
}

const Five = ({ products, isDarkMode, handleCart }: Props) => {
    const [product, setProduct] = useState<ProductsType | null>(null);
    const [productAlert, setProductAlert] = useState<ProductsType | null>(null);
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
            name: productAlert?.name,
            price: productAlert?.final_price,
            image: productAlert?.image,
            category: productAlert?.category,
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
                        onClick={() => {
                            setProduct(p)
                            setProductAlert(p)
                        }}
                        key={i}
                        className={`group relative p-4 pb-4 transition-all duration-500 cursor-pointer shadow-2xl hover:shadow-black/20 ${i % 2 === 0 ? '-rotate-2 hover:rotate-0' : 'rotate-2 hover:rotate-0'
                            } ${isDarkMode ? 'bg-zinc-900 border border-white/10' : 'bg-white'}`}
                    >
                        {/* Polaroid Frame Image */}
                        <div className={`aspect-square mb-6 overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                            <img
                                src={p.image}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                alt={p.name}
                            />
                        </div>

                        {/* Info Text with Serif Style */}
                        <div className="px-2 space-y-1">
                            {label && (
                                <span className="md:hidden text-[10px] font-black bg-[var(--product-primary-color)] text-white px-2 py-0.5 rounded italic">
                                    {label}
                                </span>
                            )}
                            <p className={`font-serif text-xl font-black italic tracking-tighter transition-colors ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                {p.name}
                            </p>
                            <div className="flex items-center justify-between">
                                <p className={`font-serif text-lg font-black italic tracking-tighter ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>
                                    {formatIDR(finalPrice)}
                                </p>
                                {label && (
                                    <span className="hidden md:grid text-[10px] font-black bg-[var(--product-primary-color)] text-white px-2 py-0.5 rounded italic">
                                        {label}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/20 backdrop-blur-sm border border-white/10 rotate-1 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                <div className="flex flex-col w-full">
                    <div className="relative h-96">
                        <img src={selectedVariant?.image ?? product?.image} className="w-full h-full object-cover" alt="" />
                        <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-slate-900" : "from-white"} to-transparent`} />
                    </div>
                    <div className="px-8 overflow-x-hidden no-scrollbar pb-12 -mt-20 relative space-y-6 text-center">
                        <div className={`inline-flex p-4 rounded-3xl ${isDarkMode ? "bg-slate-800 border border-slate-700" : "bg-white"} shadow-xl  `}>
                            <h2 className="text-2xl font-black tracking-tight">{product?.name}</h2>
                        </div>
                        <div className="flex justify-center gap-4 text-sm font-bold opacity-60">
                            <span>{product?.category}</span>
                            <span>•</span>
                            <span>Tersedia: {product?.stock} Item</span>
                        </div>
                        <div className='sm:flex items-center justify-center gap-4'>
                            {
                                product?.discount_price &&
                                <div className="text-1xl font-black line-through">{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</div>
                            }
                            <div className={`text-3xl font-black ${isDarkMode ? "text-[var(--product-primary-color)]" : "text-[var(--product-primary-color)]"}`}>{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</div>
                        </div>
                        <div>
                            <ExpandableHTML
                                htmlContent={product?.description}
                                className="text-md text-left opacity-60 leading-relaxed  font-medium"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-6">
                            {product?.variants && product?.variants?.length > 0 ?
                                <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={isDarkMode} /> : ""
                            }
                            {
                                product && product.is_qty ?
                                    <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                            }
                            <div className="text-center">
                                {
                                    product?.discount_price &&
                                    <div className="text-xs opacity-40 line-through">{formatIDR((selectedVariant?.final_price ?? product?.price ?? 0) * quantity)}</div>
                                }
                                <div className="text-4xl font-black">{formatIDR((selectedVariant?.final_price ?? product?.final_price ?? 0) * quantity)}</div>
                            </div>
                            <button disabled={disableButton} onClick={() => addCart()} className={`w-full disabled:bg-gray-600 max-w-md py-4 rounded-2xl text-white ${isDarkMode ? 'bg-[var(--product-primary-color)]' : 'bg-[var(--product-primary-color)]'} font-bold uppercase tracking-widest flex items-center justify-center gap-3`}>
                                <ShoppingCart size={18} /> Tambah Ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper >
            <AlertWrapper activeAlert={activeAlert} position="top-center">
                <div className={`${isDarkMode ? "bg-slate-900 text-white" : "text-slate-900 bg-white"} px-6 py-4 rounded-full shadow-2xl flex items-center gap-4 border-b-4 border-[var(--product-primary-color)]`}>
                    <ShoppingBag size={18} className="text-emerald-500" />
                    <span className="text-sm font-medium">{mockItem?.name} dimasukkan ke keranjang</span>
                    <ArrowRight size={16} />
                </div>
            </AlertWrapper>
        </div >
    )
}

export default Five