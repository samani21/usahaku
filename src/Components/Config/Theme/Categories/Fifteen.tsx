import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Fiften = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="flex flex-col md:flex-row gap-4 h-[400px]">
                {categories.map((cat, i) => (
                    <div key={i} className="flex-1 group relative overflow-hidden rounded-3xl transition-all duration-700 hover:flex-[3]">
                        {
                            cat?.icon ? (
                                cat.icon.startsWith("http") ? (
                                    <img src={cat?.icon} className={`absolute inset-0 w-full h-full object-cover ${isDarkMode && "bg-white"}`} />
                                ) : (
                                    <div className={`absolute inset-0 w-full h-full object-cover ${isDarkMode && "bg-white"}`} >
                                        <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                    </div>
                                )
                            ) : (
                                <div className={`text-[var(--category-primary-color)] absolute inset-0 w-full h-full object-cover ${isDarkMode && "bg-white"} `} >
                                    <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                </div>
                            )
                        }
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center group-hover:rotate-0 rotate-[-90deg] md:rotate-[-90deg] md:group-hover:rotate-0 transition-all duration-500">
                                <h3 className="text-white text-2xl md:text-4xl font-black uppercase whitespace-nowrap">{cat.name}</h3>
                                <p className="text-white/0 group-hover:text-white/60 transition-opacity mt-2">{cat.count} Item</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Fiften