import React from 'react'
import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Two = ({ categories, isDarkMode }: Props) => {
    return (
        <section className="text-center">
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                {categories.map((cat, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 p-1 border-2 border-transparent group-hover:border-[var(--category-primary-color)] transition-all`}>
                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img src={cat.icon} className={`w-full h-full object-cover rounded-full shadow-lg bg-white `} alt="" />
                                    ) : (
                                        <div className={`w-full  h-full p-4  object-cover rounded-full shadow-lg text-[var(--category-primary-color)] bg-white `} >
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`w-full h-full p-4 object-cover rounded-full shadow-lg text-[var(--category-primary-color)] bg-white`} >
                                        <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                    </div>
                                )
                            }
                        </div>
                        <h3 className="font-bold text-sm uppercase tracking-widest">{cat.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Two