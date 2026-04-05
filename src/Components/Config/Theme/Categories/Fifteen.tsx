import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Fiften = ({ categories, isDarkMode, onClick }: Props) => {
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
            <div className="grid grid-cols-2 md:flex md:flex-row gap-4 h-[700px] md:h-[400px]">
                <div onClick={() => {
                    onClick && onClick(null)
                    handleScroll()
                }} className="flex-1 group relative overflow-hidden rounded-3xl transition-all duration-700 hover:flex-[3]">
                    <div className={`text-[var(--category-primary-color)] absolute inset-0 w-full h-full object-cover ${isDarkMode && "bg-white"} `} >
                        <Icon icon={'cbi:bulb-general-group'} className='w-full h-full' />
                    </div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center md:group-hover:rotate-0 rotate-[-90deg] rotate-[0deg] md:rotate-[-90deg] md:group-hover:rotate-0 transition-all duration-500">
                            <h3 className="text-white text-lg md:text-4xl font-black uppercase whitespace-nowrap">Semua</h3>
                            <p className="text-white group-hover:text-white/60 transition-opacity mt-2">{totalItems} Item</p>
                        </div>
                    </div>
                </div>
                {categories.map((cat, i) => (
                    <div key={i} onClick={() => {
                        onClick && onClick(cat?.name)
                        handleScroll()
                    }} className="flex-1 group relative overflow-hidden rounded-3xl transition-all duration-700 hover:flex-[3]">
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
                                    <Icon icon={'cbi:bulb-general-group'} className='w-full h-full' />
                                </div>
                            )
                        }
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center md:group-hover:rotate-0 rotate-[-90deg] rotate-[0deg] md:rotate-[-90deg] md:group-hover:rotate-0 transition-all duration-500">
                                <h3 className="text-white text-lg md:text-4xl font-black uppercase whitespace-nowrap">{cat.name}</h3>
                                <p className="text-white md:text-white/0 group-hover:text-white/60 transition-opacity mt-2">{cat.count} Item</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Fiften