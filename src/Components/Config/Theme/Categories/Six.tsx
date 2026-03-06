import React from 'react'
import { ChevronRight } from 'lucide-react';
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Six = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat, i) => (
                    <div key={i} className="relative h-64 rounded-2xl overflow-hidden group">
                        {
                            cat?.icon ? (
                                cat.icon.startsWith("http") ? (
                                    <img src={cat.icon} className={`absolute inset-0 w-full h-full object-cover grayscale ${isDarkMode && "bg-white"} group-hover:grayscale-50 `} alt="" />
                                ) : (
                                    <div className={`absolute inset-0 w-full h-full object-cover grayscale ${isDarkMode && "bg-white"} group-hover:grayscale-50 `} >
                                        <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                    </div>
                                )
                            ) : (
                                <div className={`text-[var(--category-primary-color)] absolute inset-0 w-full h-full object-cover grayscale ${isDarkMode && "bg-white"} group-hover:grayscale-50  `} >
                                    <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                </div>
                            )
                        }

                        <div className={`absolute inset-0 mix-blend-multiply opacity-60 transition-opacity group-hover:opacity-0 bg-black`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white hover:bg-black/50">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter">{cat.name}</h3>
                            <div className="w-8 h-1 bg-white mt-2 scale-x-0 group-hover:scale-x-100 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Six