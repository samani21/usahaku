import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Three = ({ isDarkMode, headline, subHeadline, ctaText, imageHero }: Props) => {
    return (
        <section>
            <div className={`relative p-6 md:p-20 rounded-[3rem] overflow-hidden ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 shadow-inner'}`}>
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                    <div className="flex-1 space-y-6">
                        <div className={`w-12 h-1 mb-4 bg-[var(--hero-primary-color)]`} />
                        <h2 className="text-4xl md:text-5xl font-extrabold leading-none">{headline}</h2>
                        {/* <div className="flex items-center gap-4 py-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => <div key={i} className={`w-10 h-10 rounded-full border-4 ${isDarkMode ? "border-slate-900" : "border-white"} bg-slate-300`} />)}
                            </div>
                            <span className="text-sm font-medium opacity-60">Digunakan oleh 1000+ pelanggan</span>
                        </div> */}
                        <p className="text-lg opacity-70">{subHeadline}</p>
                        <div className="flex flex-wrap gap-4">
                            <button className={`px-8 py-3 rounded-full text-[var(--hero-secondary-color)] font-bold bg-[var(--hero-primary-color)]`}>{ctaText}</button>
                            {/* <button className={`px-8 py-3 rounded-full border border-current font-bold flex items-center gap-2 ${color?.text600}`}><Play className="w-4 h-4" /> Lihat Video</button> */}
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute -inset-4 bg-white/20 blur-3xl rounded-full" />
                        {
                            imageHero &&
                            <img src={imageHero} alt="Hero" className="relative z-10 w-full h-80 sm:h-[350px] object-cover rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500" />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Three