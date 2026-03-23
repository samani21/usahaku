import React from 'react'
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Two = ({ categories, isDarkMode, onClick }: Props) => {
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
        <section className="text-center">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                <div onClick={() => {
                    onClick && onClick(null)
                    handleScroll()
                }} className="group flex flex-col items-center cursor-pointer max-w-[140px]">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
                        <div
                            className={`absolute inset-0 rounded-full border-2 border-transparent transition-all duration-500 scale-110 group-hover:scale-125 opacity-0 group-hover:opacity-40 border-[var(--category-primary-color)]`}
                        />
                        <div
                            className={`absolute inset-0 rounded-full border border-transparent transition-all duration-700 scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-10 border-[var(--category-primary-color)]`} />

                        <div className={`relative w-full h-full rounded-full overflow-hidden p-1 transition-all duration-500 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-xl shadow-slate-200'}`}>
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <div className="w-full h-full p-6 bg-white text-[var(--category-primary-color)] flex items-center justify-center">
                                    <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                </div>
                            </div>
                        </div>

                        {/* Floating Count Badge */}
                        <div className={`absolute -bottom-1 right-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg border-2 transition-transform duration-500 group-hover:-translate-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
                            {totalItems || 0}
                        </div>
                    </div>

                    {/* Label Section */}
                    <div className="text-center space-y-1">
                        <h3 className={`text-sm md:text-base font-black uppercase tracking-widest transition-all duration-300${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-black'}`}>
                            Semua
                        </h3>
                        <div
                            className="w-0 group-hover:w-full h-0.5 mx-auto transition-all duration-500 rounded-full bg-[var(--category-primary-color)]"
                        />
                    </div>
                </div>
                {categories.map((cat, i) => (
                    <div key={i} onClick={() => {
                        onClick && onClick(cat?.name)
                        handleScroll()
                    }} className="group flex flex-col items-center cursor-pointer max-w-[140px]">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
                            <div
                                className={`absolute inset-0 rounded-full border-2 border-transparent transition-all duration-500 scale-110 group-hover:scale-125 opacity-0 group-hover:opacity-40`}
                                style={{ borderColor: cat?.color }}
                            />
                            <div
                                className={`absolute inset-0 rounded-full border border-transparent transition-all duration-700 scale-100 group-hover:scale-150 opacity-0 group-hover:opacity-10`}
                                style={{ borderColor: cat?.color }} />

                            <div className={`relative w-full h-full rounded-full overflow-hidden p-1 transition-all duration-500 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-xl shadow-slate-200'}`}>
                                <div className="w-full h-full rounded-full overflow-hidden">
                                    {
                                        cat?.icon ? (
                                            cat.icon.startsWith("http") ? (
                                                <img
                                                    src={cat.icon}
                                                    className="w-full h-full object-cover bg-white transition-transform duration-700 group-hover:scale-110"
                                                    alt={cat.name}
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white p-6 flex items-center justify-center">
                                                    <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                                </div>
                                            )
                                        ) : (
                                            <div className="w-full h-full p-6 bg-white text-[var(--category-primary-color)] flex items-center justify-center">
                                                <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            {/* Floating Count Badge */}
                            <div className={`absolute -bottom-1 right-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg border-2 transition-transform duration-500 group-hover:-translate-y-2 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900'}`}>
                                {cat.count || 0}
                            </div>
                        </div>

                        {/* Label Section */}
                        <div className="text-center space-y-1">
                            <h3 className={`text-sm md:text-base font-black uppercase tracking-widest transition-all duration-300${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-black'}`}>
                                {cat.name}
                            </h3>
                            <div
                                className="w-0 group-hover:w-full h-0.5 mx-auto transition-all duration-500 rounded-full"
                                style={{ backgroundColor: cat?.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section >
    )
}

export default Two