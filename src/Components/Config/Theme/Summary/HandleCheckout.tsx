"use client"
import Loading from '@/Components/Component/Loading';
import { OutletsType } from '@/types/Admin/OutletType';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {
    isBuild?: boolean;
    className: string;
    children: React.ReactNode;
    selectedOutlet: OutletsType | null
}

const HandleCheckout = ({ isBuild, className, children, selectedOutlet }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    const [tenant, setTenant] = useState<string>('');
    useEffect(() => {
        const path = window.location.pathname;
        let tenant: string | null = null;
        const segments = path.split("/").filter(Boolean);
        console.log('segments', segments)
        setTenant(segments?.length > 0 ? segments[0] : '');

    }, [])
    if (loading) {
        return <Loading title='Sedang muat halaman' />
    }
    return (
        <button onClick={() => {
            setLoading(true)
            !isBuild && router.push(`/${tenant}/${selectedOutlet?.name}/checkout`);
        }} className={className}>
            {children}
        </button>
    )
}

export default HandleCheckout