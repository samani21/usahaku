import React from 'react'
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Four = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    const handleScroll = () => {
        const el = document.getElementById("product-section");
        if (el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    };
    return (
        <section>
            <div className="space-y-4 grid md:grid-cols-2 gap-2">
                <div onClick={() => {
                    onClick && onClick(null)
                    handleScroll()
                }} className={`group flex items-center p-4 rounded-2xl transition-all cursor-pointer hover:pl-8 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100 text-slate-900'}`}>
                    <div className="w-16 h-16 rounded-xl overflow-hidden mr-6">
                        <div className={`text-[var(--category-primary-color)] w-full h-full object-cover ${isDarkMode && "bg-white"} `} >
                            <Icon icon={'material-symbols:local-mall'} className='w-full h-full' />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold">Semua</h3>
                        <p className="text-sm opacity-50">{totalItems} Item</p>
                    </div>
                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-full ${isDarkMode ? " bg-slate-800" : " bg-slate-100"}`}>
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
                {categories.map((cat, i) => (
                    <div onClick={() => {
                        onClick && onClick(cat?.name)
                        handleScroll()
                    }} key={i} className={`group flex items-center p-4 rounded-2xl transition-all cursor-pointer hover:pl-8 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white border border-slate-100 text-slate-900'}`}>
                        <div className="w-16 h-16 rounded-xl overflow-hidden mr-6">
                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img src={cat.icon} className={`w-full h-full object-cover ${isDarkMode && "bg-white"}`} alt="" />
                                    ) : (
                                        <div className={`w-full h-full object-cover ${isDarkMode && "bg-white"}`} >
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`text-[var(--category-primary-color)] w-full h-full object-cover ${isDarkMode && "bg-white"} `} >
                                        <Icon icon={'material-symbols:local-mall'} className='w-full h-full' />
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold">{cat.name}</h3>
                            <p className="text-sm opacity-50">{cat.count} Item</p>
                        </div>
                        <div className={`opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-full ${isDarkMode ? " bg-slate-800" : " bg-slate-100"}`}>
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Four