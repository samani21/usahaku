import { Database, Gift, Globe, LayoutDashboard, Store } from "lucide-react";
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
        Icon: Database,
        label: "Manage",
        href: '/manage',
        child: [
            {
                label: 'Info Toko',
                href: '/store'
            },
            {
                label: 'Kategori',
                href: '/categories'
            },
            {
                label: 'Produk',
                href: '/products'
            },
            {
                label: 'Stok',
                href: '/product-stock'
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
