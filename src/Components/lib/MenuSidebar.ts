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
                label: 'Outlet',
                href: '/outlets'
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
        Icon: Globe,
        label: "katalog",
        href: '/catalog',
    },
]
