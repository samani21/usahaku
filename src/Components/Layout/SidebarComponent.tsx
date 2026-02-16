"use client"
import { ChevronDown, HelpCircle, Settings, Wallet } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { menuSidebar } from '../lib/MenuSidebar';
import SidebarItem from './SidebarItem';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
    isActivityDropdownOpen: string;
    setIsActivityDropdownOpen: Dispatch<SetStateAction<string>>;
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}


const SidebarComponent = ({ isActivityDropdownOpen, setIsActivityDropdownOpen, isSidebarOpen, setIsSidebarOpen }: Props) => {
    const route = useRouter();
    const pathname = usePathname();
    const [pathNameParent, setPathNameParent] = useState<string>('');
    useEffect(() => {
        if (pathname) {
            const parts = pathname.split("/");
            const basePath = parts.slice(0, 3).join("/");
            setPathNameParent(basePath)
            setIsActivityDropdownOpen(basePath)
        }
    }, [pathname]);
    return (
        <div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
            <div
                className={`fixed md:relative flex-col w-64 bg-white border-r border-gray-100 p-6 z-60 transition-transform duration-300 ease-in-out h-full ${isSidebarOpen
                    ? 'translate-x-0 flex'
                    : '-translate-x-full hidden md:flex md:translate-x-0'
                    }`}
            >
                <div className="text-xl font-bold text-gray-800 mb-10 flex items-center">
                    <img src={'/logo.png'} className='w-[50px] mr-4' />
                    Admin Panel
                </div>
                <nav className="flex-grow space-y-2 overflow-y-auto no-scrollbar">
                    {
                        menuSidebar?.map((ms, i) => {
                            const isOpen = pathNameParent === `/admin${ms?.href}`
                            return (
                                ms?.child ? <div key={i}>
                                    <SidebarItem
                                        onClick={() => {
                                            setIsActivityDropdownOpen(`/admin/${ms?.label}`)
                                            setPathNameParent(`/admin${ms?.href}`)
                                        }}
                                        Icon={ms?.Icon} label={ms?.label} href={ms?.href} child={true} isActive={String(pathname) === `/admin${ms?.href}` ? true : false}
                                    >
                                        <ChevronDown className={`w-4 h-4 ml-auto text-gray-400 transition transform ${!isOpen ? 'rotate-180' : ''}`} />
                                    </SidebarItem>
                                    <div className={`${isOpen ? 'block' : 'hidden'} pl-8 pt-1 pb-1 space-y-1`}>
                                        {
                                            ms?.child?.map((c, i) => (
                                                <button key={i} onClick={() => route?.push(`/admin${ms?.href}${c?.href}`)} className={`block p-2 w-full text-left rounded-lg text-sm ${pathname === `/admin${ms?.href}${c?.href}` ? 'text-blue-800 font-bold bg-blue-200' : 'text-gray-600'} hover:bg-gray-100 transition duration-150`}>{c?.label}</button>
                                            ))
                                        }
                                    </div >
                                </div> :
                                    <SidebarItem key={i} Icon={ms?.Icon} label={ms?.label} href={ms?.href} isActive={String(pathname) === `/admin${ms?.href}` ? true : false} />
                            )
                        })
                    }
                </nav>
                <div className="mt-8 space-y-1 border-t pt-4 border-gray-300">
                    <SidebarItem Icon={HelpCircle} label="Bantuan" />
                    <SidebarItem Icon={Settings} label="Pengaturan" />
                </div>
            </div>
        </div >
    )
}

export default SidebarComponent