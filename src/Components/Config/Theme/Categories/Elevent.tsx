import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import { ArrowUpRight } from 'lucide-react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Elevent = ({ categories }: Props) => {
    return (
        <section>
            <div className="flex overflow-auto overflow-y-hidden no-scrollbar py-6 gap-12">
                {categories.map((cat, i) => (
                    <div key={i} className="bg-white p-4 pb-10 shadow-xl rotate-[-2deg] odd:rotate-[3deg] hover:rotate-0 transition-transform cursor-pointer">
                        <div className="w-32 sm:w-56 h-32 sm:h-56 overflow-hidden mb-6">
                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img src={cat.icon} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        <div className={`w-full h-full object-cover`} >
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`text-[var(--category-primary-color)] w-full h-full object-cover `} >
                                        <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                    </div>
                                )
                            }

                        </div>
                        <h3 className={`text-slate-800 font-serif text-xl font-bold italic text-center underline decoration-[var(--category-primary-color)] decoration-4`}>{cat.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Elevent