import { formatIDR } from '@/types/FormtRupiah';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    isBuild?: boolean;
    totalCart: number;
    summary: number;
}

const Eight = ({ isDarkMode, isBuild, totalCart, summary }: Props) => {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <div className={`sticky bottom-8 mx-6 ${isDarkMode ? "bg-slate-600" : "bg-white"} p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-[var(--summary-primary-color)]/5 rounded-xl flex items-center justify-center text-[var(--summary-primary-color)] font-black`}>
                        {totalCart}
                    </div>
                    <span className={`text-lg font-black ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{formatIDR(summary)}</span>
                </div>
                <button onClick={() => !isBuild && router.push('/checkout')} className={`bg-[var(--summary-primary-color)] text-white px-6 py-3 rounded-xl font-bold text-sm`}>Bayar</button>
            </div>
        </div>

    )
}

export default Eight