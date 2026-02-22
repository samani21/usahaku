import React from 'react'
import LogoContainer from './LogoContainer'
import { FrameTheme, FrameType } from './FrameType';
import NavIcons from './NavIcons';

type Props = {
    themeMode: string;
    isBuild?: boolean;
    logoImage: string | null;
    frameType: FrameType;
    frameTheme: FrameTheme;
    setSidebarOpen: (val: boolean) => void;
    toggleTheme: () => void;
    spanOne?: string;
    spanTwo?: string;
}

const One = ({ isBuild, themeMode, logoImage, frameType, frameTheme, setSidebarOpen, toggleTheme, spanOne, spanTwo }: Props) => {
    return (
        <header className={`${!isBuild && 'absolute'} z-100 w-full`}>
            <div className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center gap-3 min-w-0">
                    {
                        logoImage &&
                        <LogoContainer logoImage={logoImage ?? ''} frameType={frameType} frameTheme={frameTheme} />
                    }
                    <h2 className="text-xl font-bold tracking-tighter truncate">
                        <span className={`text-[var(--header-primary-color)]`}>{spanOne}</span>
                        <span className={themeMode === 'dark' ? 'text-white' : 'text-slate-900'}>{spanTwo}</span>
                    </h2>
                </div>
                <div className='hidden sm:grid'>
                    <NavIcons colorClass={`text-[var(--header-primary-color)]`} setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} themeMode={themeMode} />
                </div>
            </div>
        </header>
    )
}

export default One