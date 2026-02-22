import React, { useMemo } from 'react'
import LogoContainer from './LogoContainer';
import NavIcons from './NavIcons';

type Props = {
    themeMode: string;
    spanOne?: string;
    spanTwo?: string;
    setSidebarOpen: (val: boolean) => void;
    toggleTheme: () => void;
    frameType: "circle" | "square" | "none";
    frameTheme: "dark" | "light";
    logoImage: string | null;
    isBuild?: boolean
}

const Five = ({ themeMode, spanOne, spanTwo, setSidebarOpen, toggleTheme, frameType, frameTheme, logoImage, isBuild }: Props) => {
    const isDarkMode = useMemo(() => {
        return themeMode === 'dark' ? true : false;
    }, [themeMode])
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-4 rounded-lg border-2 border-dashed transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700' : `bg-[var(--header-primary-color)]/5 border-slate-200`}`}>
                <div className="flex items-center gap-3">
                    {
                        logoImage &&
                        <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    }
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest">{spanOne}</span>
                        <span className={`text-xl font-serif font-bold uppercase text-[var(--header-primary-color)]`}>{spanTwo}</span>
                    </div>
                </div>
                <div className='hidden sm:grid'>
                    <NavIcons colorClass={`text-[var(--header-primary-color)]`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
                </div>
            </div>
        </header>
    )
}

export default Five