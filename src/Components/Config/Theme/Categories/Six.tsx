import React from 'react'
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Six = ({ categories, isDarkMode, onClick }: Props) => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                    onClick={() => {
                        onClick && onClick(null)
                        handleScroll()
                    }}
                    className="relative h-40 sm:h-64 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <div className={`absolute bg-white inset-0 w-full h-full flex items-center justify-center ${isDarkMode ? "bg-slate-800" : "bg-slate-200"} transition-colors duration-500`}>
                            <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                        </div>
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-700 group-hover:opacity-40 bg-black opacity-60 mix-blend-multiply`} />
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none bg-[var(--category-primary-color)]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-1">
                        <div className="relative overflow-hidden px-4 ">
                            <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                Semua
                            </h3>
                            <div className="w-full h-1 bg-white mt-1 scale-x-0 scale-x-100 transition-transform duration-500 origin-center" />
                        </div>
                        <div className=" flex items-start gap-2  translate-y-4 opacity-100 translate-y-0 transition-all duration-500 delay-100">
                            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white">{totalItems} Item</span>
                            <ArrowUpRight size={14} className="text-white" />
                        </div>
                    </div>
                    <div className="absolute inset-0 border border-white/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
                </div>
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            onClick && onClick(cat?.name)
                            handleScroll()
                        }}
                        className="relative h-40 sm:h-64 rounded-2xl overflow-hidden group cursor-pointer transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img
                                            src={cat.icon}
                                            className="absolute bg-white inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                                            alt={cat.name}
                                        />
                                    ) : (
                                        <div className={`absolute bg-white inset-0 w-full h-full flex items-center justify-center ${isDarkMode ? "bg-slate-800" : "bg-slate-200"} transition-colors duration-500`}>
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`absolute bg-white inset-0 w-full h-full flex items-center justify-center ${isDarkMode ? "bg-slate-800" : "bg-slate-200"} transition-colors duration-500`}>
                                        <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                    </div>
                                )
                            }
                        </div>
                        <div className={`absolute inset-0 transition-opacity duration-700 group-hover:opacity-40 bg-black opacity-60 mix-blend-multiply`} />
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none bg-[var(--category-primary-color)]" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-1">
                            <div className="relative overflow-hidden px-4 ">
                                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    {cat.name}
                                </h3>
                                <div className="w-full h-1 bg-white mt-1 scale-x-0 scale-x-100 transition-transform duration-500 origin-center" />
                            </div>
                            <div className=" flex items-start gap-2  translate-y-4 opacity-100 translate-y-0 transition-all duration-500 delay-100">
                                <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-white">{cat?.count} Item</span>
                                <ArrowUpRight size={14} className="text-white" />
                            </div>
                        </div>
                        <div className="absolute inset-0 border border-white/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Six