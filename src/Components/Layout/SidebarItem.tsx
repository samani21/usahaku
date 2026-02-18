"use client"
import { useRouter } from 'next/navigation';
import React, { ReactElement } from 'react'

type Props = {
    Icon: any;
    label: string;
    count?: number;
    isActive?: boolean;
    onClick?: () => void;
    children?: ReactElement<Element>;
    href?: string;
    child?: boolean;
}

const SidebarItem = ({ Icon, label, isActive = false, onClick, count, children, href, child }: Props) => {
    const route = useRouter();
    const activeClass = isActive ? 'sidebar-active' : 'text-gray-600 hover:text-gray-900 font-medium';
    const iconColor = isActive ? 'text-white' : 'text-gray-400';
    return (
        <div className="relative">
            <button
                className={`sidebar-item flex items-center p-3 w-full rounded-xl font-semibold transition duration-150 ${activeClass}`}
                onClick={child ? onClick : () => { route?.push(`/admin${href}`) }}
            >
                <Icon className={`w-5 h-5 mr-3 ${iconColor}`} />
                {label}
                {count && (
                    <span className="ml-auto bg-green-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                        {count}
                    </span>
                )}
                {children}
            </button>
        </div>
    );
}

export default SidebarItem