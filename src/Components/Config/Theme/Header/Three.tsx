import React, { useMemo } from 'react'
import LogoContainer from './LogoContainer';
import NavIcons from './NavIcons';

type Props = {
    themeMode: string;
    spanOne?: string;
    spanTwo?: string;
    toggleTheme: () => void;
    frameType: string;
    frameTheme: string;
    logoImage: string | null;
    isBuild?: boolean;
    displayMode: string;
}

const Three = ({ themeMode, spanOne, spanTwo, toggleTheme, frameType, frameTheme, logoImage, isBuild, displayMode }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex flex-col items-center p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                {
                    logoImage &&
                    <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                }
                <h2 className="text-2xl font-serif tracking-[0.3em] text-center mb-4">
                    <span className={`text-[var(--header-primary-color)] font-bold`}>{spanOne}</span>
                    <span className="text-slate-400 ml-2 font-light">{spanTwo}</span>
                </h2>
                <div className={`w-full h-[1px]  ${isDarkMode ? 'bg[var(--primary-header-color)]' : 'bg[var(--secondary-header-color)]'} mb-4`} />
                <NavIcons isBuild={isBuild} displayMode={displayMode} colorClass={`text-[var(--header-primary-color)]`} toggleTheme={toggleTheme} themeMode={themeMode} />
            </div>
        </header>
    )
}

export default Three