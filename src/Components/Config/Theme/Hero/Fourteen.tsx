import { Heart, Zap } from 'lucide-react';
import React from 'react'

type Props = {
    isBuild?: boolean;
    isDarkMode: boolean;
    headline: string;
    subHeadline: string;
    ctaText: string;
    imageHero: string | null
}


const Fourteen = ({ headline, subHeadline, ctaText, isDarkMode }: Props) => {
    return (
        <section>
            <div className="py-20 text-center space-y-8 max-w-4xl mx-auto">
                <h2 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter">
                    {headline.split(' ').map((w, i) => (
                        <span key={i} className={i % 2 !== 0 ? `text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? "from-[var(--hero-primary-color)] to-[var(--hero-secondary-color)]" : "from-[var(--hero-primary-color)] to-[var(--hero-primary-color)]"}` : ''}>{w} </span>
                    ))}
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">{subHeadline}</p>
                <div className="pt-4">
                    <button className={`px-12 py-5 rounded-full text-white font-bold text-lg hover:shadow-2xl transition-all bg-[var(--hero-primary-color)]`} >
                        {ctaText}
                    </button>
                </div>
            </div>
        </section>


    )
}

export default Fourteen