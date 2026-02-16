import { Gift, Globe, LayoutDashboard, Store } from "lucide-react";
import { ReactElement } from "react";

interface child {
    label: string;
    href: string
}

interface menuSide {
    Icon: any;
    label: string;
    count?: number;
    href: string;
    child?: child[];
    children?: ReactElement<Element>;
}


export const menuSidebar: menuSide[] = [
    {
        Icon: LayoutDashboard,
        label: "Dashboard",
        href: '/dashboard'
    },

    {
        Icon: Gift,
        label: "Produk",
        href: '/product',
        child: [
            {
                label: 'List',
                href: '/list'
            },

            {
                label: 'Kategori',
                href: '/categorie'
            },
        ]
    },
    {
        Icon: Store,
        label: "Outlite",
        href: '/outlite'
    },
    {
        Icon: Globe,
        label: "katalog",
        href: '/catalog',
        child: [
            {
                label: 'Header',
                href: '/header'
            },
            {
                label: 'Hero/Banner',
                href: '/hero'
            },
            {
                label: 'Kategori',
                href: '/categorie'
            },
            {
                label: 'Produk dan Modal',
                href: '/product'
            },
            {
                label: 'Ringkasan Pembayaran',
                href: '/summary'
            },
            {
                label: 'Preview',
                href: '/preview'
            },
        ]
    },
]
