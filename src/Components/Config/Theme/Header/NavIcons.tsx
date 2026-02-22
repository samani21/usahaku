import { Heart, History, Moon, ShoppingBag, Sun } from 'lucide-react';
import React from 'react'

type Props = {
    colorClass: string;
    setSidebarOpen: (val: boolean) => void;
    toggleTheme: () => void;
    themeMode: string;
    darkOnly?: boolean;
}

const NavIcons = ({ colorClass, setSidebarOpen, toggleTheme, themeMode, darkOnly }: Props) => (
    <div className="flex items-center gap-1 sm:gap-2">
        {
            !darkOnly &&
            <button onClick={toggleTheme} className={`w-full flex items-center justify-center p-2 rounded-full ${themeMode === 'dark' ? "hover:bg-slate-800" : "hover:bg-slate-200"} transition-colors`}>
                {themeMode === "dark" ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
        }
        <button onClick={() => setSidebarOpen(true)} className={`w-full flex items-center justify-center p-2 rounded-full ${themeMode === 'dark' ? "hover:bg-slate-800" : "hover:bg-slate-200"}`}>
            <Heart className={`w-4 h-4 ${colorClass}`} />
        </button>
        <button onClick={() => setSidebarOpen(true)} className={`w-full flex items-center justify-center p-2 rounded-full ${themeMode === 'dark' ? "hover:bg-slate-800" : "hover:bg-slate-200"}`}>
            <ShoppingBag className={`w-4 h-4 ${colorClass}`} />
        </button>
        <button onClick={() => setSidebarOpen(true)} className={`w-full flex items-center justify-center p-2 rounded-full ${themeMode === 'dark' ? "hover:bg-slate-800" : "hover:bg-slate-200"}`}>
            <History className={`w-4 h-4 ${colorClass}`} />
        </button>
    </div>
);

export default NavIcons