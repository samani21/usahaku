import { formatIDR } from '@/types/FormtRupiah';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    isBuild?: boolean;
    totalCart: number;
    summary: number;
}

const Ten = ({ isDarkMode, isBuild, totalCart, summary }: Props) => {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <div className={`sticky bottom-0  p-4 border-t-2 ${isDarkMode ? "bg-gray-700" : "bg-white"} border-[var(--summary-primary-color)] flex justify-between items-center`}>
                <div>
                    <p className={`text-[14px] font-bold ${isDarkMode ? "text-slate-300" : "text-slate-400"} uppercase tracking-wider`}>Keranjang ({totalCart})</p>
                    <p className={`text-lg font-black ${isDarkMode ? "text-slate-100" : "text-slate-900"} leading-none`}>{formatIDR(summary)}</p>
                </div>
                <button onClick={() => !isBuild && router.push('/checkout')} className={`bg-[var(--summary-primary-color)]/80 text-slate-900 px-6 py-2 rounded-md font-black uppercase text-xs italic`}>Checkout</button>
            </div>
        </div>
    )
}

export default Ten