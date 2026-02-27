import { formatIDR } from '@/types/FormtRupiah';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    isBuild?: boolean;
    totalCart: number;
    summary: number;
}

const Elevent = ({ isBuild, totalCart, summary }: Props) => {
    const router = useRouter();
    return (
        <div className="space-y-4">
            <div className="sticky bottom-6 px-6">
                <button onClick={() => !isBuild && router.push('/checkout')} className="w-full bg-[var(--summary-primary-color)] text-[var(--summary-secondary-color)] p-4 rounded-full shadow-xl shadow-[var(--summary-primary-color)] flex justify-between items-center px-8">
                    <span className="font-bold text-sm">Checkout {totalCart} Item</span>
                    <span className="font-black border-l border-white/20 pl-4">{formatIDR(summary)}</span>
                </button>
            </div>
        </div>
    )
}

export default Elevent