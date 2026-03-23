import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import { ChevronRight } from 'lucide-react';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    categories: CategoriesType[];
    onClick?: (v: string | null) => void;
}

const One = ({ categories, isDarkMode, onClick }: Props) => {
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
        <section className="py-12 px-6 max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                <div onClick={() => {
                    onClick && onClick(null)
                    handleScroll()
                }} className={`relative group overflow-hidden rounded-[2rem] h-64 cursor-pointer shadow-xl ${isDarkMode ? "shadow-black/20" : "shadow-slate-200/50 "}`}>
                    <div className={`absolute flex items-center justify-center inset-0 w-full h-full ${isDarkMode ? "bg-slate-800 " : "bg-slate-100"} group-hover:scale-110 transition-transform duration-700`}>
                        <p className="text-6xl font-black italic opacity-10 uppercase tracking-tighter select-none">
                            Semua
                        </p>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:via-black/20 transition-colors p-8 flex flex-col justify-end">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight italic">
                                Semua
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-white/70 text-sm font-medium tracking-wide">
                                    {totalItems || 0} Items
                                </p>
                                <div className="h-px w-0 group-hover:w-12 bg-white/50 transition-all duration-500" />
                            </div>
                        </div>
                    </div>

                    {/* Corner Decorative Icon */}
                    <div className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/20">
                        <ChevronRight className="text-white w-4 h-4" />
                    </div>
                </div>
                {categories.map((cat, i) => (
                    <div onClick={() => {
                        onClick && onClick(cat?.name)
                        handleScroll()
                    }} key={i} className={`relative group overflow-hidden rounded-[2rem] h-64 cursor-pointer shadow-xl ${isDarkMode ? "shadow-black/20" : "shadow-slate-200/50 "}`}>
                        {/* Background Content Layer */}
                        {
                            cat?.icon ? (
                                cat.icon.startsWith("http") ? (
                                    <img
                                        src={cat.icon}
                                        className="absolute inset-0 w-full bg-white h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-white"
                                        alt={cat.name}
                                    />
                                ) : (
                                    <div className={`absolute flex items-center bg-white justify-center inset-0 w-full h-full ${isDarkMode ? "bg-slate-800" : "bg-slate-100"} group-hover:scale-110 transition-transform duration-700`}>
                                        <div className="w-24 h-24 opacity-20">
                                            <Icon icon={cat?.icon} className='w-full h-full' color={cat?.color} />
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className={`absolute flex items-center justify-center inset-0 w-full h-full ${isDarkMode ? "bg-slate-800 " : "bg-slate-100"} group-hover:scale-110 transition-transform duration-700`}>
                                    <p className="text-6xl font-black italic opacity-10 uppercase tracking-tighter select-none">
                                        {cat?.name}
                                    </p>
                                </div>
                            )
                        }

                        {/* Overlay & Text Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:via-black/20 transition-colors p-8 flex flex-col justify-end">
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight italic">
                                    {cat.name}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="text-white/70 text-sm font-medium tracking-wide">
                                        {cat?.count || 0} Items
                                    </p>
                                    <div className="h-px w-0 group-hover:w-12 bg-white/50 transition-all duration-500" />
                                </div>
                            </div>
                        </div>

                        {/* Corner Decorative Icon */}
                        <div className="absolute top-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/20">
                            <ChevronRight className="text-white w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default One