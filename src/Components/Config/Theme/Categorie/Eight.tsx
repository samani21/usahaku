import { CategoriesType } from "@/types/Admin/CategoriesType";
import { Icon } from "@iconify/react";

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Eight = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {categories.map((cat, i) => (
                    <div key={i} className={`relative aspect-square rounded-[2.5rem] flex flex-col items-center justify-center p-6 text-center ${isDarkMode ? `bg-slate-900` : " shadow-[0px_0px_10px_#bebebe,-20px_-20px_60px_#ffffff]"}`}>
                        {/* <div className={`mb-4 p-4 rounded-full ${isDarkMode ? color?.bg800 : color?.bg50} ${color?.text600}`} >{cat.icon}</div> */}
                        {
                            cat?.icon ? (
                                cat.icon.startsWith("http") ? (
                                    <img src={cat?.icon} className={`absolute inset-0 w-full h-full rounded-[2.5rem] object-cover grayscale-50 ${isDarkMode && "bg-white"}`} />
                                ) : (
                                    <div className={`absolute inset-0 w-full h-full rounded-[2.5rem] object-cover grayscale-50 ${isDarkMode && "bg-white"}`} >
                                        <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                    </div>
                                )
                            ) : (
                                <div className={`text-[var(--category-primary-color)] absolute inset-0 w-full h-full rounded-[2.5rem] object-cover grayscale-50 ${isDarkMode && "bg-white"} `} >
                                    <Icon icon={'arcticons:defaultdarktheme'} className='w-full h-full' />
                                </div>
                            )
                        }
                        <div className='w-full bg-black/30 absolute z-10 p-3'>
                            <h3 className="font-bold text-white">{cat.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Eight