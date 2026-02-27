import { Minus, Plus } from 'lucide-react'
import React from 'react'

type Props = {
    setQuantity: (val: number) => void;
    quantity: number;
    isDarkMode: boolean;
}

const QtySelector = ({ setQuantity, quantity, isDarkMode }: Props) => {
    return (
        <div className={`flex items-center gap-4 ${isDarkMode ? "bg-slate-800" : "bg-slate-100"} p-1 rounded-2xl w-fit`}>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={`p-2 ${isDarkMode ? 'hover:bg-slate-700 text-white' : "hover:bg-white text-slate-900"} rounded-xl transition-all shadow-sm `}>
                <Minus size={16} />
            </button>
            <span className={`w-8 text-center font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className={`p-2 ${isDarkMode ? 'hover:bg-slate-700 text-white' : "hover:bg-white text-slate-900"} rounded-xl transition-all shadow-sm`}>
                <Plus size={16} />
            </button>
        </div>
    )
}

export default QtySelector