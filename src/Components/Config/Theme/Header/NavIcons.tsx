import { History, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {
    colorClass: string;
    toggleTheme: () => void;
    themeMode: string;
    darkOnly?: boolean;
    displayMode: string;
    isBuild?: boolean;
}

const NavIcons = ({ colorClass, toggleTheme, themeMode, darkOnly, displayMode, isBuild }: Props) => (
    <div className="flex items-center gap-1 sm:gap-2">
        {
            !darkOnly && displayMode == 'auto' &&
            <button onClick={toggleTheme} className={`w-full flex items-center justify-center p-2 rounded-full ${themeMode === 'dark' ? "hover:bg-slate-800" : "hover:bg-slate-200"} transition-colors`}>
                {themeMode === "dark" ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
        }
        <Link href={isBuild ? "#" : 'history'} className={`w-full flex items-center justify-center p-2 rounded-full ${themeMode === 'dark' ? "hover:bg-slate-800" : "hover:bg-slate-200"}`}>
            <History className={`w-4 h-4 ${colorClass}`} />
        </Link>
    </div >
);

export default NavIcons