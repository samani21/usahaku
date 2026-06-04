import { Menu, Moon, Search, Sun } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    isDark: boolean;
    toggleTheme: () => void;
    onOpenMenu: () => void;
}

const Header = ({ searchQuery, setSearchQuery, isDark, toggleTheme, onOpenMenu }: Props) => {
    return (
        <header className={`p-4 lg:px-8 lg:py-4 sticky top-0 z-40 border-b flex items-center justify-between gap-4 transition-colors duration-300 ${isDark ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white/80 border-gray-100'} backdrop-blur-xl`}>
            <div className="flex items-center gap-3 lg:gap-4 flex-1">
                <button onClick={onOpenMenu} className={`lg:hidden p-2.5 rounded-xl transition-all ${isDark ? 'bg-zinc-900 text-zinc-400' : 'bg-gray-100 text-gray-500'}`}>
                    <Menu size={20} />
                </button>

                <div className="relative flex-1 max-w-xl group">
                    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchQuery ? 'text-emerald-500' : (isDark ? 'text-zinc-600' : 'text-gray-400')}`} size={16} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari UMKM lokal..."
                        className={`w-full border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm outline-none transition-all ${isDark ? 'bg-zinc-900 text-white focus:ring-2 focus:ring-emerald-500/50' : 'bg-gray-100 text-gray-800 focus:ring-2 focus:ring-emerald-500/30'}`}
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* <button onClick={toggleTheme} className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-zinc-900 text-yellow-400' : 'bg-gray-100 text-gray-500'}`}>
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button> */}
                <div className={`flex items-center gap-2 p-1 rounded-xl transition-all cursor-pointer ${isDark ? 'bg-zinc-900' : 'bg-gray-100'}`}>
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">A</div>
                </div>
            </div>
        </header>
    )
}

export default Header