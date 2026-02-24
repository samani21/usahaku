import React from 'react'
import { ChevronRight } from 'lucide-react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Three = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className={`p-6 rounded-3xl border transition-all hover:-translate-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg ${isDarkMode && "bg-white"}`} >
                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img src={cat?.icon} className='w-12 h-12 rounded-2xl object-cover' />
                                    ) : (
                                        <div className={`w-12 h-12 rounded-2xl`} >
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`text-[var(--category-primary-color)] w-12 h-12 rounded-2xl `} >
                                        <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                    </div>
                                )
                            }
                        </div>
                        <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                        <p className="text-xs text-slate-400 font-medium mb-4">{cat.count} Item</p>
                        <div className={`flex items-center gap-2 text-xs font-bold text-[var(--category-primary-color)]`}>
                            LIHAT <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </section>

    )
}

export default Three