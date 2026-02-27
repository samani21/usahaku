import { formatIDR } from '@/types/FormtRupiah';
import { ArrowRight, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    totalCart: number;
    summary: number;
    isBuild?: boolean;
}

const Three = ({ isDarkMode, totalCart, summary, isBuild }: Props) => {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <div className="sticky bottom-10 flex justify-end px-4">
                <div className={`${isDarkMode ? "bg-gray-800 border-slate-600 " : "bg-gray-100 border-slate-100 "} p-3 rounded-3xl shadow-2xl border flex items-center gap-4`}>
                    <div className="text-right">
                        <p className={`text-[14px] font-bold ${isDarkMode ? "text-white" : "text-[var(--summary-primary-color)]"} uppercase`}>Total ({totalCart})</p>
                        <p className={`font-black ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{formatIDR(summary)}</p>
                    </div>
                    <button onClick={() => !isBuild && router.push('/checkout')} className={`bg-[var(--summary-primary-color)] text-white p-3 rounded-2xl`}>
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Three