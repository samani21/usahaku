import { formatIDR } from '@/types/FormtRupiah';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    isBuild?: boolean;
    totalCart: number;
    summary: number;
}

const FourTeen = ({ isDarkMode, isBuild, summary }: Props) => {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <div className={`sticky bottom-0 ${isDarkMode ? "bg-slate-900" : "bg-white"} backdrop-blur-md p-6 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.03)] border-t border-white flex justify-between items-center`}>
                <p className={`font-black text-xl ${isDarkMode ? "text-white" : " text-slate-800"}`}>{formatIDR(summary)}</p>
                <button onClick={() => !isBuild && router.push('/checkout')} className={`${isDarkMode ? "bg-white text-slate-800" : "bg-slate-900 text-white"}  px-8 py-3 rounded-2xl font-bold flex items-center gap-2`}>
                    Beli <Send size={16} className="rotate-45" />
                </button>
            </div>
        </div>

    )
}

export default FourTeen