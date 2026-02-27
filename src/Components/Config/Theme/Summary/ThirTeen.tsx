import { formatIDR } from '@/types/FormtRupiah';
import { CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    isBuild?: boolean;
    totalCart: number;
    summary: number;
}

const ThirTeen = ({ isDarkMode, isBuild, summary }: Props) => {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <div className="sticky bottom-10 flex justify-center">
                <div onClick={() => !isBuild && router.push('/checkout')} className={`cursor-pointer ${isDarkMode ? "bg-slate-800  border-slate-600" : "bg-white  border-slate-100"} p-2 rounded-full shadow-2xl border flex items-center gap-3 pr-6`}>
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white relative">
                        <CreditCard size={20} />
                        <span className="absolute -top-1 -right-1 bg-[var(--summary-primary-color)] text-[var(--summary-secondary-color)] w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">3</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-slate-800 leading-none">{formatIDR(summary)}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Checkout Sekarang</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ThirTeen