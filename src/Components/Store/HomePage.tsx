import { AnimatePresence, motion } from 'framer-motion'
import { ListIcon, MapIcon } from 'lucide-react';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { ProductType, StoresType } from './StoresType';

type Props = {
    isDark: boolean;
    filteredProducts: ProductType[]
    filteredStores: StoresType[]
}



const formatIDR = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);


const ProductCard = ({ product, storeName, isDark }: any) => {
    const discountedPrice = product.price - (product.price * (product.discount / 100));
    return (
        <motion.div whileHover={{ y: -5 }} className={`rounded-[2rem] border overflow-hidden transition-all ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
            <div className="h-40 relative p-2">
                <img src={product.image} className="w-full h-full object-cover rounded-[1.5rem]" />
                {product.discount > 0 && <div className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded-full">-{product.discount}%</div>}
            </div>
            <div className="p-4 pt-2">
                <span className="text-[9px] font-bold text-emerald-500 uppercase">{storeName}</span>
                <h4 className={`font-bold text-sm leading-tight line-clamp-2 h-10 ${isDark ? 'text-zinc-100' : 'text-gray-800'}`}>{product.name}</h4>
                <p className="text-emerald-500 font-black text-sm mt-2">{formatIDR(discountedPrice)}</p>
            </div>
        </motion.div>
    );
};

const StoreCard = ({ store, isDark }: any) => (
    <div className={`p-4 rounded-[1.5rem] border flex gap-4 transition-all ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-100 shadow-sm'}`}>
        <img src={store.image} className="w-24 h-24 rounded-2xl object-cover" />
        <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex justify-between items-start">
                <span className="text-[9px] font-black text-emerald-500 uppercase">{store.category}</span>
                <span className={`text-[10px] font-bold ${isDark ? 'text-zinc-600' : 'text-gray-400'}`}>{store.distance}</span>
            </div>
            <h3 className={`font-bold text-base truncate ${isDark ? 'text-zinc-100' : 'text-gray-800'}`}>{store.name}</h3>
            <p className={`text-xs truncate ${isDark ? 'text-zinc-500' : 'text-gray-400'}`}>{store.address}</p>
            <div className="mt-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase">{store.status}</span>
            </div>
        </div>
    </div>
);

function HomePage({ isDark, filteredStores, filteredProducts }: Props) {
    const [activeTab, setActiveTab] = useState('stores');

    return (
        <div>
            <div className="px-4 lg:px-8 py-6 pb-24 lg:pb-8">
                <div className="mb-6">
                    <h2 className={`text-2xl font-black mb-1 ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        Mau Belanja Apa, <span className="text-emerald-500">Hari Ini?</span>
                    </h2>
                    <p className={`text-xs font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>Pilih kategori toko atau cari produk favoritmu.</p>
                </div>

                <div className={`flex p-1 rounded-2xl mb-8 w-full max-w-sm transition-colors ${isDark ? 'bg-zinc-900' : 'bg-gray-100'}`}>
                    <button onClick={() => setActiveTab('stores')} className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'stores' ? (isDark ? 'bg-zinc-800 text-emerald-400' : 'bg-white text-emerald-600 shadow-sm') : 'text-zinc-400'}`}>TOKO</button>
                    <button onClick={() => setActiveTab('products')} className={`flex-1 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeTab === 'products' ? (isDark ? 'bg-zinc-800 text-emerald-400' : 'bg-white text-emerald-600 shadow-sm') : 'text-zinc-400'}`}>PRODUK</button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                        {activeTab === 'products' ? (
                            filteredProducts.map((p: any, i: number) => <ProductCard key={i} product={p} storeName={p.storeName} isDark={isDark} />)
                        ) : (
                            filteredStores.map(s => <StoreCard key={s.id} store={s} isDark={isDark} />)
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    )
}

export default HomePage