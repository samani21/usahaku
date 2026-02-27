import ModalWrapper from './ModalWrapper';
import { useEffect, useMemo, useState } from 'react';
import QtySelector from './QtySelector';
import VariantPicker from './VariantPicker';
import { ShoppingCart } from 'lucide-react';
import AlertWrapper from './AlertWrapper';
import { ProductsType, Variants } from '@/types/Admin/ProductsType';
import { formatIDR } from '@/types/FormtRupiah';

type Props = {
    products: ProductsType[];
    isDarkMode: boolean;
}

const Six = ({ products, isDarkMode }: Props) => {
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
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full'>
            {products?.map((p, i) => (
                <div onClick={() => setProduct(p)} key={i} className="relative group cursor-pointer h-80">
                    <div className="absolute inset-0 bg-black translate-x-3 translate-y-3" />
                    <div className="relative h-full bg-white border-4 border-black p-4 text-black flex flex-col">
                        <img src={p?.image} className="w-full h-24 flex-1 object-cover border-4 border-black mb-4 grayscale group-hover:grayscale-0 transition-all" alt="" />
                        <div className="flex justify-between items-center font-black uppercase text-xs">
                            <span>{p?.name}</span>
                            <span className={`bg-[var(--product-primary-color)] text-[var(--product-secondary-color)] px-2 py-1`}>{formatIDR(p?.price)}</span>
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
                <div className={`w-full p-4 md:p-8 flex flex-col md:flex-row gap-8 bg-[var(--product-primary-color)] text-black`}>
                    <div className="md:w-1/2 border-[8px] border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] bg-white overflow-hidden">
                        <img src={selectedVariant?.image ?? product?.image} className="w-full h-full aspect-square object-cover" alt="" />
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-center space-y-8">
                        <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{product?.name}</h2>
                        <div className={`bg-black text-[var(--product-primary-color)] p-4 text-4xl font-black w-fit italic transform -rotate-2`}>
                            {
                                product?.discount_price &&
                                <p className='text-[14px] line-through'>{formatIDR(selectedVariant?.price ?? product?.price ?? 0)}</p>
                            }
                            <p>{formatIDR(selectedVariant?.final_price ?? product?.final_price ?? 0)}</p>
                        </div>
                        <p className="font-bold text-lg leading-tight border-l-8 border-black pl-6">{product?.description}</p>
                        {product?.variants && product?.variants?.length > 0 ?
                            <div className='bg-black  px-4 py-2 rounded-xl'>
                                <VariantPicker variants={product?.variants} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} isDarkMode={true} />
                            </div> : ""
                        }
                        <div className='flex items-end justify-between gap-2'>
                            {
                                product && product?.is_qty ?
                                    <QtySelector quantity={quantity} setQuantity={setQuantity} isDarkMode={isDarkMode} /> : ""
                            }
                            <div>
                                <p className='font-semibold text-gray-700'>Total</p>
                                <p className='text-2xl font-bold'>{formatIDR((selectedVariant?.final_price || (product?.final_price ?? 0)) * quantity)}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button disabled={disableButton} onClick={() => setActiveAlert(true)} className="flex-1 disabled:bg-gray-600 py-6 bg-white border-4 border-black font-black text-xl shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                                Order Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </ModalWrapper>
            <AlertWrapper activeAlert={activeAlert} position="top-right">
                <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_rgba(0,0,0,1)] ml-12">
                    <div className="bg-black text-white px-2 py-1 text-[10px] font-black uppercase w-fit mb-2">UPDATE</div>
                    <h4 className="font-black text-xl text-black italic uppercase leading-none">KERANJANG DIISI!</h4>
                    <p className="text-xs font-bold text-black mt-2">{mockItem?.name}, segera checkout.</p>
                </div>
            </AlertWrapper>
        </div>
    )
}

export default Six