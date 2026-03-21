import { X } from 'lucide-react';
import React from 'react'

type Props = {
    children: React.ReactNode;
    activeModal: boolean
    closeModal: () => void
    isDarkMode: boolean
}

const ModalWrapper = ({ children, activeModal, closeModal, isDarkMode }: Props) => {
    if (!activeModal) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-8">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={closeModal} />
            <div className={`relative w-full max-w-5xl h-[92vh] md:h-auto md:max-h-[90vh] overflow-y-auto md:overflow-hidden shadow-2xl rounded-t-[2.5rem] md:rounded-[2.5rem] flex flex-col md:flex-row transition-all duration-300 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
                <button onClick={closeModal} className="fixed top-4 right-4 z-50 p-3 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 transition-transform hover:rotate-90">
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper