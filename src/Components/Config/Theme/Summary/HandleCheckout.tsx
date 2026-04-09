"use client"
import Loading from '@/Components/Component/Loading';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
    isBuild?: boolean;
    className: string;
    children: React.ReactNode;
}

const HandleCheckout = ({ isBuild, className, children }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    if (loading) {
        return <Loading title='Sedang muat halaman' />
    }
    return (
        <button onClick={() => {
            setLoading(true)
            !isBuild && router.push(`${pathname != '/' ? pathname : ''}/checkout`);
        }} className={className}>
            {children}
        </button>
    )
}

export default HandleCheckout