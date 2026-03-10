import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Teen = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="flex flex-col gap-4">
                {categories.map((cat, i) => (
                    <div key={i} className={`group relative overflow-hidden py-6 border-b ${isDarkMode ? "border-slate-800" : " border-slate-200"}`}>
                        <div className="flex items-center justify-between relative z-0">
                            <h2 className={`text-2xl md:text-4xl font-bold uppercase tracking-tighter group-hover:italic transition-all`}>{cat.name}</h2>
                            <div className="hidden md:block w-32 h-20 rounded-xl overflow-hidden scale-0 group-hover:scale-100 transition-transform duration-500">
                                {
                                    cat?.icon ? (
                                        cat.icon.startsWith("http") ? (
                                            <img src={cat.icon} className={`w-full h-full object-cover ${isDarkMode && "bg-white"}`} alt="" />

                                        ) : (
                                            <div className={`w-full h-full object-cover ${isDarkMode && "bg-white"} `} >
                                                <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                            </div>
                                        )
                                    ) : (
                                        <div className={`text-[var(--category-primary-color)] w-full h-full object-cover ${isDarkMode && "bg-white"}  `} >
                                            <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                        </div>
                                    )
                                }
                            </div>
                            <span className="text-xl font-mono">{cat.count} Item</span>
                        </div>
                        <div className={`absolute inset-0 bg-current opacity-0 group-hover:opacity-5 transition-opacity text-[var(--category-primary-color)]`} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Teen