
import { Variants } from '@/types/Admin/ProductsType';
import { Layers } from 'lucide-react';
import React from 'react'

type Props = {
    variants: Variants[];
    selectedVariant: Variants | null;
    setSelectedVariant: (val: Variants) => void;
    isDarkMode: boolean;
}
const VariantPicker = ({ variants, selectedVariant, setSelectedVariant, isDarkMode }: Props) => (
    <div className="space-y-3">
        <span className={`text-xs font-bold uppercase tracking-wider opacity-100 flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            <Layers className="w-3 h-3" /> Pilih Varian:
        </span>
        <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => (
                <button
                    key={i}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 ${selectedVariant === v && 'border-current shadow-md scale-105'} ${isDarkMode ? `${selectedVariant === v ? 'border-[var(--product-primary-color)]' : 'border-[var(--product-primary-color)]/35'} text-[var(--product-primary-color)]` : `${selectedVariant === v ? 'border-[var(--product-primary-color)]' : 'border-[var(--product-primary-color)]/35'} text-[var(--product-primary-color)]`}`}
                >
                    {v?.name}
                </button>
            ))}
        </div>
    </div>
);


export default VariantPicker