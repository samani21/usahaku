import { OutletsType } from '@/types/Admin/OutletType';
import { Get } from '@/utils/Get';
import { Search, X, MapPin, ChevronDown, Loader2 } from 'lucide-react' // Tambah import
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Props = {
    onClose: () => void;
    onSelect: (outlet: OutletsType) => void;
    tenant: string;
}

const ModalOutlet = ({ onClose, onSelect, tenant }: Props) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [outlets, setOutlets] = useState<OutletsType[]>([]);
    const [search, setSearch] = useState<string>('');
    const pathname = usePathname();
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Jika user kasih izin, ambil data dengan koordinat
                    getOutlet(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    // Jika user tolak/error, ambil data tanpa koordinat (default)
                    console.error("Gagal ambil lokasi:", error);
                    getOutlet();
                }
            );
        } else {
            getOutlet();
        }
    }, [])
    useEffect(() => {
        // disable scroll saat modal terbuka
        document.body.style.overflow = 'hidden';

        return () => {
            // balikin lagi saat modal ditutup / unmount
            document.body.style.overflow = 'auto';
        };
    }, []);
    const getOutlet = async (lat?: number, lng?: number) => {
        setLoading(true);
        try {
            // Bangun URL dengan query params jika ada lokasi
            let url = '/customer/list-outlet';
            if (lat && lng) {
                url += `?latitude=${lat}&longitude=${lng}`;
            }

            const res = await Get<{ success: boolean, data: OutletsType[] }>(url);
            if (res.success) {
                setOutlets(res.data);
            }
        } catch (e: any) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    // Filter berdasarkan search bar (client-side search)
    const filteredOutlets = outlets.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 transition-all animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">

                {/* Modal Header */}
                <div className="p-8 pb-6 border-b border-slate-50 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Cari Outlet Terdekat</h2>
                        <p className="text-sm text-slate-500 mt-1">Pilih lokasi toko untuk mendapatkan stok yang akurat</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400 hover:text-red-500"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-8">
                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari berdasarkan kota atau mall..."
                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-[#149184] focus:bg-white transition-all outline-none text-slate-700"
                        />
                    </div>
                    {/* List */}
                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                <Loader2 className="animate-spin mb-2" size={32} />
                                <p>Mencari outlet terdekat...</p>
                            </div>
                        ) : filteredOutlets.length > 0 ? (
                            filteredOutlets.map((outlet, index) => {
                                const url = pathname === `/${tenant}` ? outlet?.name : `/${tenant}/${outlet?.name}`
                                return (
                                    <Link
                                        key={index}
                                        // onClick={() => onSelect(outlet)}
                                        href={url}
                                        className={`w-full text-left p-6 rounded-3xl border transition-all flex justify-between items-center group ${outlet.is_currently_open
                                            ? 'hover:bg-teal-50 border-slate-100 hover:border-[#149184]/30'
                                            : 'bg-slate-50/50 border-slate-100 opacity-80'
                                            }`}
                                    >
                                        <div className="flex items-center gap-5">
                                            {/* Icon Map Pin dengan indikator warna status */}
                                            <div className={`p-3 shadow-sm rounded-xl transition-colors ${outlet.is_currently_open
                                                ? 'bg-white text-slate-400 group-hover:text-[#149184]'
                                                : 'bg-slate-200 text-slate-500'
                                                }`}>
                                                <MapPin size={22} />
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className={`font-bold text-lg transition-colors ${outlet.is_currently_open ? 'text-slate-900 group-hover:text-[#149184]' : 'text-slate-500'
                                                        }`}>
                                                        {outlet.name}
                                                    </p>

                                                    {/* Badge Status Buka/Tutup */}
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${outlet.is_currently_open
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-red-100 text-red-600'
                                                        }`}>
                                                        {outlet.is_currently_open ? 'BUKA' : 'TUTUP'}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-slate-500">{outlet.address}</p>

                                                <div className="flex gap-2 mt-2">
                                                    {/* Jarak */}
                                                    {(outlet as any).distance && (
                                                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full inline-block">
                                                            {parseFloat((outlet as any).distance).toFixed(1)} km dari lokasimu
                                                        </span>
                                                    )}

                                                    {/* Jam Operasional (Opsional) */}
                                                    <span className="text-[10px] text-slate-400 italic">
                                                        {outlet.time_open.substring(0, 5)} - {outlet.time_close.substring(0, 5)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 group-hover:text-[#149184] transition-all">
                                            <ChevronDown className="-rotate-90" size={20} />
                                        </div>
                                    </Link>
                                )
                            })
                        ) : (
                            <div className="text-center py-10 text-slate-500">
                                Outlet tidak ditemukan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalOutlet