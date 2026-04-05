import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const FourTen = ({ categories, isDarkMode, onClick }: Props) => {
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
        <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="relative group cursor-pointer">
                    <div className={`absolute inset-0 rounded-2xl translate-x-3 translate-y-3 opacity-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform bg-[var(--category-primary-color)]`} />
                    <div className={`relative p-8 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-900 shadow-sm group-hover:shadow-none'}`}>
                        <div className={`text-[var(--category-primary-color)] absolute inset-0 w-full h-full object-cover rounded-2xl  top-0 ${isDarkMode && 'bg-white'} `} >
                            <Icon icon={'cbi:bulb-general-group'} className='w-full h-full' />
                        </div>
                        <div onClick={() => {
                            onClick && onClick(null)
                            handleScroll()
                        }} className={`w-full bg-black/50 absolute z-1 text-left text-gray-100 px-2`}>
                            <h3 className="font-black uppercase italic tracking-tighter text-md sm:text-xl">Semua</h3>
                        </div>
                    </div>
                </div>
                {categories.map((cat, i) => (
                    <div key={i} className="relative group cursor-pointer">
                        <div className={`absolute inset-0 rounded-2xl translate-x-3 translate-y-3 opacity-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform bg-[var(--category-primary-color)]`} />
                        <div className={`relative p-8 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-900 shadow-sm group-hover:shadow-none'}`}>
                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img src={cat?.icon} className={`absolute inset-0 w-full h-full object-cover rounded-2xl top-0 ${isDarkMode && 'bg-white'}`} />

                                    ) : (
                                        <div className={`absolute inset-0 w-full h-full object-cover rounded-2xl  top-0 ${isDarkMode && 'bg-white'}`} >
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`text-[var(--category-primary-color)] absolute inset-0 w-full h-full object-cover rounded-2xl  top-0 ${isDarkMode && 'bg-white'} `} >
                                        <Icon icon={'cbi:bulb-general-group'} className='w-full h-full' />
                                    </div>
                                )
                            }
                            <div onClick={() => {
                                onClick && onClick(cat?.name)
                                handleScroll()
                            }} className={`w-full bg-black/50 absolute z-1 text-left text-gray-100 px-2`}>
                                <h3 className="font-black uppercase italic tracking-tighter text-md sm:text-xl line-clamp-1">{cat.name}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FourTen