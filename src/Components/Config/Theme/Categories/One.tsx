import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import React from 'react'

type Props = {
    isDarkMode: boolean;
    categories: CategoriesType[];
}

const One = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl">
                    {
                        categories[0]?.icon ? (
                            categories[0].icon.startsWith("http") ? (
                                <img src={categories[0].icon} className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-white`} alt="" />
                            ) : (
                                <div className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-white `} >
                                    <Icon color={categories[0]?.color} icon={categories[0]?.icon} className='w-full h-full' />
                                </div>
                            )
                        ) : (
                            <div className={`absolute flex items-center justify-center w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-white text-[var(--category-primary-color)]`}>
                                <p className='text-5xl font-sans font-bold italic'>{categories[0]?.name}</p>
                            </div>
                        )
                    }

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                        <h3 className="text-3xl font-bold text-white">{categories[0].name}</h3>
                        <p className="text-white/60">{categories[0].count} Item</p>
                    </div>
                </div>
                {categories.slice(1).map((cat, i) => (
                    <div key={i} className="relative group overflow-hidden rounded-3xl">
                        {
                            cat?.icon ? (
                                cat.icon.startsWith("http") ? (
                                    <img src={cat.icon} className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-white`} alt="" />
                                ) : (
                                    <div className={`absolute flex items-center justify-center w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-white text-[var(--category-primary-color)]`}>
                                        <Icon icon={cat?.icon} className='w-full h-full' color={cat?.color} />
                                    </div>
                                )
                            ) : (
                                <div className={`absolute flex items-center justify-center w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 bg-white text-[var(--category-primary-color)]`}>
                                    <p className='text-5xl font-sans font-bold italic'>{cat?.name}</p>
                                </div>
                            )
                        }
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors p-6 flex flex-col justify-end">
                            <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                            <p className="text-white/60">{cat?.count} Item</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default One