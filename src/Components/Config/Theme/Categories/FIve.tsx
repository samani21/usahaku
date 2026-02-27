import { CategoriesType } from "@/types/Admin/CategoriesType";
import { Icon } from "@iconify/react";


type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Five = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="flex flex-wrap gap-4">
                {categories.map((cat, i) => (
                    <button key={i} className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all border-2 ${isDarkMode ? `border-slate-800 hover:border[var(--category-primary-color)]` : `border-slate-200 hover:border[var(--category-primary-color)]`}`}>
                        {
                            cat?.icon ? (
                                cat.icon.startsWith("http") ? (
                                    <img src={cat?.icon} className={`w-[32px] rounded-full h-[32px] object-cover ${isDarkMode && "bg-white"}`} />

                                ) : (
                                    <div className={`w-[32px] rounded-full h-[32px] object-cover ${isDarkMode && "bg-white"}`} >
                                        <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                    </div>
                                )
                            ) : (
                                <div className={`text-[var(--category-primary-color)] w-[32px] rounded-full h-[32px] object-cover ${isDarkMode && "bg-white"} `} >
                                    <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                </div>
                            )
                        }
                        {cat.name}
                    </button>
                ))}
                <button className="flex items-center gap-3 px-6 py-3 rounded-full font-bold bg-black text-white">Lihat Semua</button>
            </div>
        </section>
    )
}

export default Five