import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import { ArrowUpRight } from 'lucide-react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Twelve = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, i) => (
                    <div key={i} className="relative aspect-square rounded-[2rem] overflow-hidden group">
                        {
                            cat?.icon ? (
                                cat.icon.startsWith("http") ? (
                                    <img src={cat.icon} className={`absolute inset-0 w-full  ${isDarkMode && "bg-white"} object-cover opacity-50`} alt="" />
                                ) : (
                                    <div className={`absolute inset-0 w-full  ${isDarkMode && "bg-white"} object-cover opacity-50"}`} >
                                        <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                    </div>
                                )
                            ) : (
                                <div className={`text-[var(--category-primary-color)] absolute inset-0 w-full  ${isDarkMode && "bg-white"} object-cover opacity-50"} `} >
                                    <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                </div>
                            )
                        }
                        <div className="absolute  bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl w-full h-full p-4 flex flex-col items-center justify-start gap-4 text-center">
                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img src={cat?.icon} className='h-[80%] rounded-xl w-full w-full object-cover' />
                                    ) : (
                                        <div className={`h-[80%] w-full w-full rounded-xl object-cover`} >
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`text-[var(--category-primary-color)] rounded-xl h-[80%] w-full w-full object-cover `} >
                                        <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                    </div>
                                )
                            }

                            <div className='bg-black/50 w-full p-2'>
                                <h3 className="text-white font-bold text-sm leading-tight">{cat.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Twelve