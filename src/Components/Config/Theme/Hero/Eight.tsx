import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Eight = ({ isDarkMode, headline, subHeadline, ctaText }: Props) => {
    return (
        <section>
            <div className={`relative p-8 md:p-16 border-8 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : `bg-[var(--hero-primary-color)]/5 border-double border-slate-900 shadow-2xl`}`}>
                <div className="flex flex-col items-center text-center">
                    {/* <div className="w-20 h-20 border-4 border-current mb-8 flex items-center justify-center rounded-full" style={{ color: colors.find(c => c.name === accentColor)?.hex }}>
                        <Scissors className="w-10 h-10" />
                    </div> */}
                    <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tighter mb-6">{headline}</h2>
                    <p className="text-lg max-w-xl opacity-60 mb-10 font-serif italic tracking-wide">{subHeadline}</p>
                    <div className="flex items-center gap-6">
                        <div className="h-px w-20 bg-slate-400" />
                        <button className="px-12 py-4 bg-slate-900 text-white font-bold tracking-[0.2em] uppercase hover:scale-110 transition-transform">{ctaText}</button>
                        <div className="h-px w-20 bg-slate-400" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Eight