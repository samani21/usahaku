import { formatIDR } from '@/types/FormtRupiah';
import { ShoppingBag, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    isBuild?: boolean;
    totalCart: number;
    summary: number;
}

const Five = ({ isBuild, totalCart, summary }: Props) => {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <div className="sticky bottom-0 bg-slate-900 text-white p-5 rounded-t-3xl flex items-center justify-between shadow-2xl">
                <div className="flex gap-4 items-center">
                    <div className="bg-white/10 p-2 rounded-full">
                        <ShoppingBag size={16} className={'text-text'} />
                    </div>
                    <div>
                        <p className="text-xs opacity-50 font-medium">{totalCart} Item terpilih</p>
                        <p className="font-bold">{formatIDR(summary)}</p>
                    </div>
                </div>
                <button onClick={() => !isBuild && router.push('/checkout')} className="bg-white text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm">Checkout</button>
            </div>
        </div>
    )
}

export default Five