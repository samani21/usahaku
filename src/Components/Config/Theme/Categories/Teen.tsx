import { CategoriesType } from '@/types/Admin/CategoriesType';
import { Icon } from '@iconify/react';
import { ArrowUpRight } from 'lucide-react';

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Teen = ({ categories, isDarkMode, onClick }: Props) => {
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
        <section className="py-12 px-6  mx-auto">
            <div className="flex flex-col">
                <div
                    onClick={() => {
                        onClick && onClick(null)
                        handleScroll()
                    }}
                    className={`group relative py-8 md:py-12 border-b flex items-center justify-between cursor-pointer transition-all duration-500  ${isDarkMode ? "border-slate-800 hover:border-white" : "border-slate-200 hover:border-black"}`}
                >
                    {/* Title Section */}
                    <div className="flex items-center gap-6 z-1">
                        <span className={`hidden sm:block font-mono text-sm opacity-40`}>
                            01
                        </span>
                        <h2 className={`text-4xl md:text-7xl font-bold uppercase tracking-tighter transition-all duration-500  ${isDarkMode ? " stroke-white stroke-1 group-hover:italic" : " border-black group-hover:italic"
                            }`}
                            style={{ WebkitTextStroke: isDarkMode ? '1px rgba(255,255,255,0.3)' : '1px rgba(0,0,0,0.2)' }}
                        >
                            Semua
                        </h2>
                    </div>

                    {/* Hover Reveal Image */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-0">
                        <div className="w-48 h-32 md:w-64 md:h-40 rounded-2xl overflow-hidden shadow-2xl rotate-[-5deg] group-hover:rotate-[5deg] transition-transform duration-700">
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center p-8">
                                <Icon icon={'arcticons:defaultdarktheme'}
                                    className="w-full h-full text-[var(--category-primary-color)]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Info Section */}
                    <div className="flex items-center gap-4 z-1">
                        <div className="hidden md:flex flex-col items-end">
                            <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40 `}>
                                Inventory
                            </span>
                            <span className={`font-mono text-lg font-bold `}>
                                {totalItems}
                            </span>
                        </div>
                        <div className={`p-3 rounded-full transition-all duration-500 ${isDarkMode ? "bg-white text-black group-hover:bg-[var(--category-primary-color)] group-hover:text-white" : "bg-black text-white group-hover:bg-[var(--category-primary-color)]"}`}>
                            <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                        </div>
                    </div>

                    {/* Line Fill Effect on Hover */}
                    <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 
              ${isDarkMode ? "bg-white" : "bg-black"}`}
                    />
                </div>
                {categories.map((cat, i) => (
                    <div
                        onClick={() => {
                            onClick && onClick(cat?.name)
                            handleScroll()
                        }}
                        key={i}
                        className={`group relative py-8 md:py-12 border-b flex items-center justify-between cursor-pointer transition-all duration-500 
              ${isDarkMode ? "border-slate-800 hover:border-white" : "border-slate-200 hover:border-black"}`}
                    >
                        {/* Title Section */}
                        <div className="flex items-center gap-6 z-1">
                            <span className={`hidden sm:block font-mono text-sm opacity-40`}>
                                0{i + 2}
                            </span>
                            <h2 className={`text-4xl md:text-7xl font-bold uppercase tracking-tighter transition-all duration-500 
                ${isDarkMode
                                    ? " stroke-white stroke-1 group-hover:italic"
                                    : " border-black group-hover:italic"
                                }`}
                                style={{ WebkitTextStroke: isDarkMode ? '1px rgba(255,255,255,0.3)' : '1px rgba(0,0,0,0.2)' }}
                            >
                                {cat.name}
                            </h2>
                        </div>

                        {/* Hover Reveal Image */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-0">
                            <div className="w-48 h-32 md:w-64 md:h-40 rounded-2xl overflow-hidden shadow-2xl rotate-[-5deg] group-hover:rotate-[5deg] transition-transform duration-700">
                                {
                                    cat?.icon ? (
                                        cat.icon.startsWith("http") ? (
                                            <img
                                                src={cat.icon}
                                                className="w-full bg-slate-100 h-full object-cover scale-125 group-hover:scale-100 transition-transform duration-1000"
                                                alt={cat.name}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center p-8">
                                                <Icon color={cat?.color} icon={cat?.icon}
                                                    className="w-full h-full "
                                                />
                                            </div>
                                        )
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center p-8">
                                            <Icon icon={'arcticons:defaultdarktheme'}
                                                className="w-full h-full text-[var(--category-primary-color)]"
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Right Info Section */}
                        <div className="flex items-center gap-4 z-1">
                            <div className="hidden md:flex flex-col items-end">
                                <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40 `}>
                                    Inventory
                                </span>
                                <span className={`font-mono text-lg font-bold `}>
                                    {cat.count}
                                </span>
                            </div>
                            <div className={`p-3 rounded-full transition-all duration-500 
                ${isDarkMode ? "bg-white text-black group-hover:bg-[var(--category-primary-color)] group-hover:text-white" : "bg-black text-white group-hover:bg-[var(--category-primary-color)]"}
              `}>
                                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                            </div>
                        </div>

                        {/* Line Fill Effect on Hover */}
                        <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 
              ${isDarkMode ? "bg-white" : "bg-black"}`}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Teen