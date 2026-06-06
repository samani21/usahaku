import { AnimatePresence, motion } from 'framer-motion';
import React, { Dispatch, SetStateAction } from 'react'
import SidebarItem from './SidebarItem';
import { Settings, X } from 'lucide-react';

type Props = {
    isOpen: boolean,
    onClose: () => void;
    isDark: boolean;
    categories: any;
    activeNav: string;
    setActiveNav: Dispatch<SetStateAction<string>>;
    PRIMARY_COLOR: string
}

const MobileDrawer = ({ isOpen, onClose, isDark, categories, activeNav, setActiveNav, PRIMARY_COLOR }: Props) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                    />
                    <motion.div
                        initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={`fixed top-0 left-0 bottom-0 w-80 z-[70] lg:hidden p-6 flex flex-col ${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'}`}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-black italic" style={{ color: PRIMARY_COLOR }}>Usahaku.</h1>
                            <button onClick={onClose} className={`p-2 rounded-xl ${isDark ? 'bg-zinc-900' : 'bg-gray-100'}`}><X size={20} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
                            <div>
                                <h5 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${isDark ? 'text-zinc-600' : 'text-gray-400'}`}>Kategori UMKM</h5>
                                <div className="space-y-1">
                                    {categories.map((item: any) => (
                                        <SidebarItem key={item.label} {...item} isDark={isDark} onClick={() => { setActiveNav(item.label); onClose(); }} isActive={activeNav === item.label} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-zinc-800">
                            <div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-red-500/10 text-zinc-500 hover:text-red-500 transition-all cursor-pointer">
                                <Settings size={20} />
                                <span className="text-sm font-bold">Pengaturan</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default MobileDrawer