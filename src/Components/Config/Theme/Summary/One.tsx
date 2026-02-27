import { formatIDR } from '@/types/FormtRupiah';
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    totalCart: number;
    summary: number;
    isBuild?: boolean;
}

const One = ({ isDarkMode, totalCart, summary, isBuild }: Props) => {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <div className={`sticky bottom-6 ${isDarkMode ? "bg-black/90 border-slate-700" : "bg-white/90 border-slate-200"} backdrop-blur-md p-2 pl-6 rounded-full shadow-xl border  flex items-center justify-between`}>
                <div className="flex flex-col">
                    <span className={`text-[10px] ${isDarkMode ? "text-slate-100" : "text-slate-400"} font-bold uppercase`}>{totalCart} Item</span>
                    <span className={`font-black ${isDarkMode ? "text-slate-200" : "text-slate-800"} leading-none`}>{formatIDR(summary)}</span>
                </div>
                <button onClick={() => !isBuild && router.push('/checkout')} className={`bg-[var(--summary-primary-color)]/80 text-white p-4 rounded-full hover:bg-[var(--summary-primary-color)] transition-all shadow-lg`}>
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    )
}

export default One