import React from 'react'
import { ChevronRight } from 'lucide-react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Three = ({ categories, isDarkMode, onClick }: Props) => {
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div

                    onClick={() => {
                        onClick && onClick(null)
                        handleScroll()
                    }}
                    className={` group relative p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col items-start space-y-4  transition-all duration-500 cursor-pointer border hover:-translate-y-3 hover:shadow-2xl ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-[var(--product-primary-color)]/50' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 text-slate-900 hover:border-[var(--product-primary-color)]'}`}>
                    <div
                        className="absolute top-0 right-0 w-24 h-24 blur-[60px] bg-[var(--product-primary-color)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none rounded-full"
                    />
                    <div
                        className={` relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-6 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                        <div className="w-10 h-10 rounded-xl overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center">
                                <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                            </div>
                        </div>

                        {/* Floating Dot Decoration */}
                        <div
                            className={`absolute -top-1 -right-1 w-3 h-3 bg-[var(--product-primary-color)] rounded-full border-2 ${isDarkMode ? "border-slate-900" : "border-white"}`}
                        />
                    </div>

                    {/* Content Section */}
                    <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-extrabold tracking-tight group-hover:text-[var(--product-primary-color)] transition-colors">
                            Semua
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                                {totalItems || 0} Products
                            </span>
                        </div>
                    </div>

                    {/* Footer Interaction */}
                    <div
                        className="pt-2 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--product-primary-color)] transition-all duration-300 group-hover:gap-3"
                    >
                        <span>Lihat Detail</span>
                        <div className="p-1 rounded-full bg-current bg-opacity-10">
                            <ChevronRight className="w-3 h-3" strokeWidth={3} />
                        </div>
                    </div>


                </div>
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            onClick && onClick(cat?.name)
                            handleScroll()
                        }}
                        className={` group relative p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col items-start space-y-4  transition-all duration-500 cursor-pointer border hover:-translate-y-3 hover:shadow-2xl ${isDarkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-[var(--product-primary-color)]/50' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50 text-slate-900 hover:border-[var(--product-primary-color)]'}`}>
                        <div
                            className="absolute top-0 right-0 w-24 h-24 blur-[60px] bg-[var(--product-primary-color)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none rounded-full"
                        />
                        <div
                            className={` relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-6 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                            <div className="w-10 h-10 rounded-xl overflow-hidden">
                                {
                                    cat?.icon ? (
                                        cat.icon.startsWith("http") ? (
                                            <img
                                                src={cat?.icon}
                                                className="w-full h-full object-cover"
                                                alt={cat.name}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                            </div>
                                        )
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                        </div>
                                    )
                                }
                            </div>

                            {/* Floating Dot Decoration */}
                            <div
                                className={`absolute -top-1 -right-1 w-3 h-3 bg-[var(--product-primary-color)] rounded-full border-2 ${isDarkMode ? "border-slate-900" : "border-white"}`}
                            />
                        </div>

                        {/* Content Section */}
                        <div className="space-y-1">
                            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight group-hover:text-[var(--product-primary-color)] transition-colors">
                                {cat.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                                    {cat.count || 0} Products
                                </span>
                            </div>
                        </div>

                        {/* Footer Interaction */}
                        <div
                            className="pt-2 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--product-primary-color)] transition-all duration-300 group-hover:gap-3"
                        >
                            <span>Lihat Detail</span>
                            <div className="p-1 rounded-full bg-current bg-opacity-10">
                                <ChevronRight className="w-3 h-3" strokeWidth={3} />
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </section>

    )
}

export default Three