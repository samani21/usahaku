import React from 'react'

type Props = {
    icon?: any;
    label: string;
    isActive?: boolean,
    onClick: () => void;
    isDark: boolean
}

const SidebarItem = ({ icon: Icon, label, isActive, onClick, isDark }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${isActive
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : `hover:bg-emerald-500/10 ${isDark ? 'text-zinc-400 hover:text-emerald-400' : 'text-zinc-500 hover:text-emerald-600'}`
                }`}
        >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            {label}
        </button>
    )
}

export default SidebarItem