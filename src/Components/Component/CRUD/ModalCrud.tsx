import { X } from 'lucide-react';
import React from 'react'

type Props = {
    children: React.ReactNode
    isOpen: boolean;
    title: string;
    onClose: () => void
}

const ModalCrud = ({ children, isOpen, title, onClose }: Props) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-70 overflow-y-auto bg-gray-900/70 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity duration-300">
            <div
                className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-xl max-h-[95vh] overflow-y-auto transform transition-transform duration-300 scale-100 opacity-100 modal-no-scrollbar">
                <div className='border-b-2 border-zinc-300 p-4 flex items-center justify-between'>
                    <h3 className="text-xl font-bold text-zinc-700  pb-2 flex items-center">
                        {title}
                    </h3>
                    <div
                        className="cursor-pointer inline-flex items-center justify-center transition-transform duration-300 hover:rotate-180"
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </div>
                </div>
                <div className='px-6 py-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalCrud