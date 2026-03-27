import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import { ArrowUpRight } from 'lucide-react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Nine = ({ categories, isDarkMode, onClick }: Props) => {
    const totalItems = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div onClick={() => {
                    onClick && onClick(null)
                    handleScroll()
                }} className={`relative overflow-hidden rounded-3xl flex h-24 sm:h-48 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-lg'}`}>
                    <div className="w-1/3 h-full">
                        <div className={`text-[var(--category-primary-color)] w-full h-full object-cover ${isDarkMode && "bg-white"} `} >
                            <Icon icon={'material-symbols:local-mall'} className='w-full h-full' />
                        </div>
                    </div>
                    <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                        {/* <span className="text-[10px] font-bold py-1 px-2 rounded bg-red-100 text-red-600 self-start mb-2 uppercase italic">Diskon 50%</span> */}
                        <h3 className="text-lg sm:text-2xl font-black">Semua</h3>
                        <p className="text-sm opacity-50 mb-4">{totalItems} Item</p>
                        <button className={`text-sm font-bold flex items-center gap-1 text-[var(--category-primary-color)]`}>Buka Katalog <ArrowUpRight className="w-4 h-4" /></button>
                    </div>
                </div>
                {categories.map((cat, i) => (
                    <div key={i} onClick={() => {
                        onClick && onClick(cat?.name)
                        handleScroll()
                    }} className={`relative overflow-hidden rounded-3xl flex h-24 sm:h-48 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 shadow-lg'}`}>
                        <div className="w-1/3 h-full">
                            {
                                cat?.icon ? (
                                    cat.icon.startsWith("http") ? (
                                        <img src={cat.icon} className={`w-full h-full object-cover ${isDarkMode && "bg-white"}`} alt="" />
                                    ) : (
                                        <div className={`w-full h-full object-cover ${isDarkMode && "bg-white"}`} >
                                            <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                        </div>
                                    )
                                ) : (
                                    <div className={`text-[var(--category-primary-color)] w-full h-full object-cover ${isDarkMode && "bg-white"} `} >
                                        <Icon icon={'material-symbols:local-mall'} className='w-full h-full' />
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex-1 p-4 sm:p-8 flex flex-col justify-center">
                            {/* <span className="text-[10px] font-bold py-1 px-2 rounded bg-red-100 text-red-600 self-start mb-2 uppercase italic">Diskon 50%</span> */}
                            <h3 className="text-lg sm:text-2xl font-black">{cat.name}</h3>
                            <p className="text-sm opacity-50 mb-4">{cat.count} Item</p>
                            <button className={`text-sm font-bold flex items-center gap-1 text-[var(--category-primary-color)]`}>Buka Katalog <ArrowUpRight className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Nine