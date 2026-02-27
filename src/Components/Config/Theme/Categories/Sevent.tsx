import { CategoriesType } from "@/types/Admin/CategoriesType";

type Props = {
    categories: CategoriesType[];
    isDarkMode: boolean;
}

const Sevent = ({ categories, isDarkMode }: Props) => {
    return (
        <section>
            <div className="grid md:grid-cols-2 gap-x-20 gap-y-12">
                {categories.map((cat, i) => (
                    <div key={i} className={`flex gap-8 group border-b ${isDarkMode ? "border-slate-800" : " border-slate-200"} pb-8 cursor-pointer`}>
                        <span className="text-4xl font-light opacity-20 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                        <div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">{cat.name}</h3>
                            <p className="text-slate-500 mb-4">{cat.count} tersedia.</p>
                            <span className={`text-xs font-bold tracking-widest uppercase text-[var(--category-primary-color)]`} >Jelajahi Sekarang</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Sevent