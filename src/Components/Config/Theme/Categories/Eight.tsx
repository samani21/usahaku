import { CategoriesType } from "@/types/Admin/CategoriesType";
import { Icon } from "@iconify/react";
import { ArrowUpRight } from "lucide-react";

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
    onClick?: (v: string | null) => void;
}

const Eight = ({ categories, isDarkMode, onClick }: Props) => {
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
        <section className="py-12 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                <div
                    onClick={() => {
                        onClick && onClick(null)
                        handleScroll()
                    }}
                    className={`group relative aspect-square rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2
              ${isDarkMode
                            ? "bg-slate-900 shadow-[10px_10px_20px_#070a0f,-10px_-10px_20px_#111827]"
                            : "bg-slate-50 shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff]"
                        }`}
                >
                    {/* Image/Icon Container */}
                    <div className="absolute inset-0 w-full h-full p-2">
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                            <div className={`w-full h-full flex text-[var(--category-primary-color)] items-center bg-white justify-center bg-white/50 p-8`}>
                                <Icon icon={'material-symbols:local-mall'} className='w-full h-full' />
                            </div>
                            {/* Gradient Overlay agar teks terbaca */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        </div>
                    </div>

                    {/* Label Section - Glassmorphism Style */}
                    <div className="absolute bottom-6 left-4 right-4 z-1">
                        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-3 flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex flex-col overflow-hidden">
                                <h3 className="font-bold text-white text-sm md:text-base truncate drop-shadow-md">
                                    Semua
                                </h3>
                                <span className="text-[10px] text-white/60 uppercase tracking-widest font-medium">
                                    Explore
                                </span>
                            </div>
                            <div className="bg-white/20 p-1.5 rounded-lg text-white group-hover:bg-white group-hover:text-black transition-colors">
                                <ArrowUpRight size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Inner Glow on Hover */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2.5rem] pointer-events-none" />
                </div>
                {categories.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => {
                            onClick && onClick(cat?.name)
                            handleScroll()
                        }}
                        className={`group relative aspect-square rounded-[2.5rem] flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2
              ${isDarkMode
                                ? "bg-slate-900 shadow-[10px_10px_20px_#070a0f,-10px_-10px_20px_#111827]"
                                : "bg-slate-50 shadow-[15px_15px_30px_#bebebe,-15px_-15px_30px_#ffffff]"
                            }`}
                    >
                        {/* Image/Icon Container */}
                        <div className="absolute inset-0 w-full h-full p-2">
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                                {
                                    cat?.icon ? (
                                        cat.icon.startsWith("http") ? (
                                            <img
                                                src={cat.icon}
                                                className="w-full h-full bg-white/50 object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                                                alt={cat.name}
                                            />
                                        ) : (
                                            <div className={`w-full h-full flex items-center bg-white justify-center bg-white/50 p-8`}>
                                                <Icon color={cat?.color} icon={cat?.icon} className='w-full h-full' />
                                            </div>
                                        )
                                    ) : (
                                        <div className={`w-full h-full flex items-center bg-white justify-center bg-white/50 p-8`}>
                                            <Icon icon={'material-symbols:local-mall'} className='w-full h-full' />
                                        </div>
                                    )
                                }
                                {/* Gradient Overlay agar teks terbaca */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                            </div>
                        </div>

                        {/* Label Section - Glassmorphism Style */}
                        <div className="absolute bottom-6 left-4 right-4 z-1">
                            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-3 flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex flex-col overflow-hidden">
                                    <h3 className="font-bold text-white text-sm md:text-base truncate drop-shadow-md">
                                        {cat.name}
                                    </h3>
                                    <span className="text-[10px] text-white/60 uppercase tracking-widest font-medium">
                                        Explore
                                    </span>
                                </div>
                                <div className="bg-white/20 p-1.5 rounded-lg text-white group-hover:bg-white group-hover:text-black transition-colors">
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        </div>

                        {/* Inner Glow on Hover */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2.5rem] pointer-events-none" />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Eight