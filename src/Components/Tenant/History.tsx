"use client"
import { Calendar, ChevronLeft, Receipt, RefreshCw, Search, Sparkles, Store } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import GlassCard from '../Layout/GlassCard';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Loading from '../Component/Loading';
import { Get } from '@/utils/Get';
import { OrderType } from '@/types/Admin/Catalog/Order';

type Props = {}

const TRANSACTION_DATA = [
    {
        id: "TX-90218-024",
        outletName: "Kopi Senja - Menteng",
        date: "18 Mei 2026",
        time: "14:32",
        status: "Selesai",
        paymentMethod: "Senja Wallet / QRIS",
        items: [
            { name: "Senja Creamy Latte (Large)", qty: 2, price: 38000 },
            { name: "Butter Croissant Premium", qty: 1, price: 28000 }
        ],
        subtotal: 104000,
        tax: 10400,
        service: 5000,
        total: 119400,
        type: "Dine-in"
    },
    {
        id: "TX-88310-109",
        outletName: "Kopi Senja - Dago",
        date: "16 Mei 2026",
        time: "19:05",
        status: "Selesai",
        paymentMethod: "Kartu Debit",
        items: [
            { name: "Americano Ice (Regular)", qty: 1, price: 25000 },
            { name: "Almond Croissant", qty: 2, price: 32000 },
            { name: "Caramel Macchiato", qty: 1, price: 40000 }
        ],
        subtotal: 129000,
        tax: 12900,
        service: 5000,
        total: 146900,
        type: "Take-away"
    },
    {
        id: "TX-77402-990",
        outletName: "Kopi Senja - Kuta",
        date: "14 Mei 2026",
        time: "10:15",
        status: "Diproses",
        paymentMethod: "Senja Wallet / QRIS",
        items: [
            { name: "Tropical Cold Brew", qty: 2, price: 35000 },
            { name: "Fries & Dip Platter", qty: 1, price: 30000 }
        ],
        subtotal: 100000,
        tax: 10000,
        service: 5000,
        total: 115000,
        type: "Dine-in"
    },
    {
        id: "TX-55110-384",
        outletName: "Kopi Senja - Gubeng",
        date: "10 Mei 2026",
        time: "16:45",
        status: "Dibatalkan",
        paymentMethod: "Tunai",
        items: [
            { name: "Matcha Oat Latte", qty: 1, price: 42000 },
            { name: "Cinnamon Roll", qty: 1, price: 26000 }
        ],
        subtotal: 68000,
        tax: 6800,
        service: 5000,
        total: 79800,
        type: "Take-away"
    }
];

interface DataType {
    expenditure: number;
    order: OrderType[];
}

function HistoryComponent({ }: Props) {
    const [historySearch, setHistorySearch] = useState("");
    const [historyFilterStatus, setHistoryFilterStatus] = useState("Semua");
    const pathname = usePathname();
    const filteredTransactions = TRANSACTION_DATA.filter((tx) => {
        const matchesSearch = tx.outletName.toLowerCase().includes(historySearch.toLowerCase()) ||
            tx.id.toLowerCase().includes(historySearch.toLowerCase());
        const matchesStatus = historyFilterStatus === "Semua" || tx.status === historyFilterStatus;
        return matchesSearch && matchesStatus;
    });
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [history, setHistory] = useState<OrderType[]>([]);
    const [amount, setAmount] = useState<number>(0);
    useEffect(() => {
        const path = window.location.pathname;
        let tenant: string | null = null;
        const segments = path.split("/").filter(Boolean);
        if (segments.length > 0) {
            setUrl(pathname === '/history' ? '/' : `/${segments[0]}`);
        }
        getHistory()
    }, [pathname])

    const getHistory = async () => {
        setLoading(true);
        try {
            const res = await Get<{ success: boolean, data: DataType }>('customer/show-history');
            if (res?.success) {
                setAmount(res?.data?.expenditure)
                setHistory(res?.data?.order);
            }
        } catch (e: any) {

        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex items-center  justify-center ">
            <div className='relative w-full max-w-7xl'>
                <div className='fixed top-0  w-full max-w-7xl'>
                    <GlassCard className='py-2 px-4 flex items-center justify-between gap-4'>
                        <div className='flex items-center justify-between w-full'>
                            <Link href={url}>
                                <ChevronLeft />
                            </Link>
                            <p className='font-semibold text-zinc-900'>
                                History
                            </p>
                            <div>

                            </div>
                        </div>
                    </GlassCard>
                </div>
                <div className='px-4 lg:px-0 mt-12 py-4 space-y-6 animate-fade-in'>
                    {/* Dashboard Summary Riwayat */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm">
                            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block mb-1">Pengeluaran</span>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-zinc-400 font-semibold">Rp</span>
                                <span className="text-sm sm:text-lg font-black text-zinc-900">{Number(amount).toLocaleString("id-ID")}</span>
                            </div>
                        </div>
                        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm">
                            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block mb-1">Transaksi</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm sm:text-lg font-black text-zinc-900">{history.length}</span>
                                <span className="text-[9px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded-full font-bold">Total</span>
                            </div>
                        </div>
                        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm">
                            <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold block mb-1">Poin Loyal</span>
                            <div className="flex items-center gap-1.5 text-amber-600">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm sm:text-lg font-black">1.250</span>
                            </div>
                        </div>
                    </div>

                    {/* Filter & Search Riwayat */}
                    <div className="bg-white p-4 rounded-3xl border border-zinc-200/80 shadow-sm space-y-3">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Cari kode transaksi atau nama outlet..."
                                value={historySearch}
                                onChange={(e) => setHistorySearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-800 transition-all placeholder:text-zinc-400"
                            />
                            {historySearch && (
                                <button
                                    onClick={() => setHistorySearch("")}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 font-bold bg-zinc-100 px-2.5 py-1 rounded"
                                >
                                    Hapus
                                </button>
                            )}
                        </div>

                        {/* Filter Pills status */}
                        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                            {["Semua", "Selesai", "Diproses", "Dibatalkan"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setHistoryFilterStatus(status)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold whitespace-nowrap transition-all ${historyFilterStatus === status
                                        ? 'bg-zinc-900 text-white shadow-sm'
                                        : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* List Kartu Transaksi */}
                    <div className="space-y-3">
                        {history.length > 0 ? (
                            history.map((tx) => {
                                const date = new Date(tx.created_at);

                                const formattedDate = date.toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                });

                                const formattedTime = date.toLocaleTimeString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });
                                return (
                                    <div
                                        key={tx.id}
                                        className="bg-white border border-zinc-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
                                    >
                                        {/* Top: Info ID, Status & Tipe */}
                                        <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-3">
                                            <div className="space-y-0.5">
                                                <span className="text-[10px] text-zinc-400 font-mono tracking-wider">{tx.order_number}</span>
                                                <h4 className="text-xs sm:text-sm font-black text-zinc-900 leading-tight flex items-center gap-1">
                                                    <Store className="w-3.5 h-3.5 text-zinc-400" />
                                                    {tx.outlet?.name}
                                                </h4>
                                            </div>

                                            <div className="flex gap-1.5 items-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold ${tx.status === "Selesai" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                                                    tx.status === "Diproses" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                                                        "bg-rose-50 text-rose-700 border border-rose-100"
                                                    }`}>
                                                    {tx.status}
                                                </span>
                                                <span className="bg-zinc-100 text-zinc-600 border border-zinc-200/50 px-2 py-1 rounded-full text-[9px] font-bold">
                                                    {tx.payment_method}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Middle: Pratinjau Item Belanja */}
                                        <div className="space-y-1 px-1 mb-4">
                                            {tx.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center text-xs text-zinc-600">
                                                    <span>{item.product_name}</span>
                                                    <span className="font-mono text-zinc-400">x{item.qty}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Bottom: Tanggal, Total, dan Tombol Rincian */}
                                        <div className="flex flex-wrap items-center justify-between border-t border-zinc-50 pt-3 gap-3">
                                            <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{formattedDate} {formattedTime} </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <p className="text-[9px] text-right text-zinc-400 font-bold uppercase tracking-wider">Total Bayar</p>
                                                    <p className="text-xs sm:text-sm font-black text-zinc-950">
                                                        Rp. {Number(tx.grand_total).toLocaleString("id-ID")}
                                                    </p>
                                                </div>

                                                <div className="flex gap-1.5">
                                                    <button
                                                        // onClick={() => triggerToast(`Memesan ulang paket pesanan ${tx.id}`)}
                                                        className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                                                        title="Pesan Lagi"
                                                    >
                                                        <RefreshCw className="w-4 h-4" />
                                                    </button>
                                                    <Link
                                                        href={`detail/${tx.qr_token}`}
                                                        // onClick={() => setSelectedTransaction(tx)}
                                                        className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-950 text-white font-bold text-xs shadow-sm transition-colors"
                                                    >
                                                        Lihat Detail
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-center py-12 px-4 bg-white rounded-3xl border border-zinc-200/85">
                                <div className="bg-zinc-100 text-zinc-400 p-4 rounded-full inline-block mb-3">
                                    <Receipt className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-zinc-850">Transaksi Tidak Ditemukan</h4>
                                <p className="text-xs text-zinc-450 mt-1 max-w-xs mx-auto">
                                    Coba ketik kata kunci transaksi lain atau periksa filter status.
                                </p>
                                <button
                                    onClick={() => { setHistorySearch(""); setHistoryFilterStatus("Semua"); }}
                                    className="mt-4 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 font-bold text-xs py-2 px-4 rounded-xl transition-all"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {
                loading && <Loading />
            }
        </div>
    )
}

export default HistoryComponent