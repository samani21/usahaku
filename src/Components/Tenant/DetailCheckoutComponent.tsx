"use client"
import React, { useCallback, useEffect, useState } from 'react';
import {
    ShoppingBag,
    CreditCard,
    Banknote,
    QrCode,
    Upload,
    ArrowLeft,
    CheckCircle2,
    Smartphone,
    Camera,
    Sun,
    Moon,
    Store,
    Plus,
    Minus,
    Trash2,
    Info,
    ChevronRight,
    Copy,
    AlertTriangle
} from 'lucide-react';
import { Get } from '@/utils/Get';
import Loading from '../Component/Loading';
import { useParams, useRouter } from 'next/navigation';
import { BanksType } from '@/types/Admin/Banks';
import { Post } from '@/utils/Post';
import { QRCodeCanvas } from 'qrcode.react';
import { CatalogHeaderType } from '@/types/Admin/Catalog/Header';

interface CartItemsType {
    id: number;
    device_id: number;
    business_id: number;
    product_id: number;
    variant_id: number;
    qty: number;
    price: number;
    subtotal: number;
    name_product: string;
    iamge_product: string;
    name_variant: string;
    iamge_variant: string;
}

interface CartsType {
    items: CartItemsType[];
    total: number;
    banks: BanksType[];
    payment_method: string;
    customer_name: string;
    outlet: string;
    phone_number: string;
    grand_total: number;
    total_price: number;
    unique_code: number;
    header: CatalogHeaderType;
}

const getContrastColor = (hex: string | undefined) => {
    if (!hex) return '#1e293b';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#ffffff';
};

const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

const DetailCheckoutComponent = () => {
    const { token } = useParams();
    const [darkMode, setDarkMode] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showMobileUpload, setShowMobileUpload] = useState(false);
    const [items, setItems] = useState<CartItemsType[]>([]);
    const [banks, setBanks] = useState<BanksType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);
    const [uniq, setUniq] = useState<number>(0);
    const [grantTotal, setGrantTotal] = useState<number>(0);
    const router = useRouter();
    const [customerName, setCustomerName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [outlet, setOutlet] = useState<string>('');
    const [header, setHeader] = useState<CatalogHeaderType | null>(null);
    const updateCssVariables = useCallback((type: 'header', color: string) => {
        const contrast = getContrastColor(color);
        const rgb = hexToRgb(color);
        const contrastRgb = hexToRgb(contrast);

        document.documentElement.style.setProperty(`--${type}-primary-color`, color);
        document.documentElement.style.setProperty(`--${type}-secondary-color`, contrast);
        document.documentElement.style.setProperty(`--${type}-primary-rgb`, rgb);
        document.documentElement.style.setProperty(`--${type}-secondary-rgb`, contrastRgb);
    }, []);
    const handlePhoneChange = (e: any) => {
        let input = e.target.value.replace(/\D/g, ''); // Hapus semua karakter non-angka
        if (input.startsWith('0')) {
            input = '62' + input.substring(1);
        } else if (input.startsWith('8')) {
            input = '62' + input;
        } else if (input.startsWith('+62')) {
            // Ini ditangani oleh replace non-angka di atas menjadi 62
        }
        setPhoneNumber(input);
    };
    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(String(reader.result));
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        getOrders()
    }, [])

    if (showMobileUpload) {
        return (
            <div className={`${darkMode ? 'dark bg-[#0a0f18]' : 'bg-gray-50'} min-h-screen transition-colors duration-300 p-6 flex flex-col items-center`}>
                <div className={`w-full max-w-md ${darkMode ? "bg-[#161d2a] border-gray-800" : " bg-white border-gray-200"} rounded-3xl p-8 border shadow-2xl`}>
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={() => setShowMobileUpload(false)} className={`p-2 ${darkMode ? 'bg-[#0f1520] text-white' : "bg-gray-100"} rounded-xl`}>
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className={`text-xl font-bold ${darkMode && "text-white"}`}>Upload Bukti</h2>
                        <div className="w-10"></div>
                    </div>
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-[var(--header-primary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Camera className="text-[var(--header-primary-color)]" size={32} />
                        </div>
                        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm`}>Ambil foto struk atau screenshot transfer Anda.</p>
                    </div>
                    <label className="block w-full border-2 border-dashed border-[var(--header-primary-color)]/50 bg-[var(--header-primary-color)]/5 rounded-2xl p-10 text-center cursor-pointer hover:bg-[var(--header-primary-color)]/10 transition-all">
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => { handleFileUpload(e); setShowMobileUpload(false); }} />
                        <Upload className="mx-auto mb-4 text-[var(--header-primary-color)]" size={40} />
                        <p className={`${darkMode && 'text-white'} font-bold `}>Pilih File / Kamera</p>
                    </label>
                </div>
            </div>
        );
    }

    if (isPaid) {
        return (
            <div className={`${darkMode ? 'dark bg-[#0a0f18]' : 'bg-gray-50'} min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300`}>
                <div className={`${darkMode ? "bg-[#161d2a] border-gray-800" : "bg-white border-gray-200"} p-10 rounded-3xl text-center max-w-md w-full shadow-2xl border `}>
                    <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className={`text-3xl font-bold mb-2 ${darkMode && "text-white"}`}>Pesanan Diterima!</h2>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-8`}>
                        {paymentMethod === 'cash'
                            ? 'Silakan datang ke kasir untuk menyelesaikan pembayaran.'
                            : 'Pembayaran Anda sedang kami verifikasi. Mohon tunggu sebentar.'}
                    </p>
                    <button
                        // onClick={() => { setIsPaid(false); setItems([{ id: 1, name_product: 'Nike Air Max Pro', price: 1500000, qty: 1, iamge_product: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80' }]); setPaymentMethod(''); setImagePreview(null); }}
                        className="w-full py-4 bg-[var(--header-primary-color)] hover:bg-[var(--header-primary-color)] text-white rounded-xl font-bold transition-all"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        );
    }
    const getOrders = async () => {
        setLoading(true)
        try {
            const res = await Get<{ success: boolean, data: CartsType }>(`customer/show-order?token=${token}`);
            if (res?.success) {
                setItems(res?.data?.items);
                setBanks(res?.data?.banks);
                setPaymentMethod(res?.data?.payment_method);
                setTotal(res?.data.total_price);
                setUniq(res?.data.unique_code);
                setGrantTotal(res?.data.grand_total);
                setCustomerName(res?.data.customer_name);
                setPhoneNumber(res?.data.phone_number);
                setOutlet(res?.data.outlet);
                setHeader(res?.data.header);
                if (res.data.header?.color) updateCssVariables('header', res.data.header.color);
            }
        } catch (e: any) {

        } finally {
            setLoading(false)

        }
    }
    const maxStock = 6; // dummy global

    const invalidItems = items.filter((item) => item.qty > maxStock);
    return (
        <div className={`${darkMode ? 'dark bg-[#0a0f18] text-white' : 'bg-gray-50 text-gray-900'} min-h-screen font-sans p-4 md:p-8 transition-colors duration-300`}>
            {/* Header */}
            <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
                <button onClick={() => router?.back()} className={`flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-500"} hover:text-[var(--header-primary-color)] transition-colors`}>
                    <ArrowLeft size={20} />
                    <span className="hidden sm:inline">Kembali</span>
                </button>

                <div className="flex items-center gap-2">
                    {
                        header?.logo && <img src={header?.logo} className='w-18 h-18 rounded-md' />
                    }
                    <span className="text-xl font-bold italic text-[var(--header-primary-color)]">{header?.span_one}<span className={darkMode ? "text-white" : "text-gray-900"}>{header?.span_two}</span></span>
                </div>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-3 rounded-xl ${darkMode ? "bg-[#161d2a] border-gray-800" : "bg-white border-gray-200"} border   shadow-sm flex items-center gap-2 transition-all hover:scale-105`}
                >
                    {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-600" />}
                    <span className="text-xs font-bold uppercase hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
                </button>
            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-6">
                    <section className={`${darkMode ? "bg-[#161d2a] border-gray-800" : "bg-white border-gray-200"} p-6 rounded-3xl border shadow-sm`}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <CreditCard className="text-[var(--header-primary-color)]" /> Metode Pembayaran
                            </h3>
                            {!paymentMethod && (
                                <span className={`text-[10px] ${darkMode ? 'bg-[var(--header-primary-color)]/30' : "bg-[var(--header-primary-color)]"} text-[var(--header-primary-color)] px-2 py-1 rounded-md animate-pulse`}>Wajib Pilih Satu</span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {['cash', 'transfer', 'qris'].map((method) => (
                                <button
                                    key={method}
                                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative overflow-hidden ${paymentMethod === method
                                        ? `border-emerald-500 ${darkMode ? "bg-emerald-500/10" : "bg-emerald-50"}`
                                        : `${darkMode ? "border-gray-800 bg-[#0f1520]" : "border-gray-100 bg-gray-50"} hover:border-emerald-200`
                                        }`}
                                >
                                    {paymentMethod === method && (
                                        <div className="absolute top-2 right-2">
                                            <CheckCircle2 size={16} className="text-emerald-500" />
                                        </div>
                                    )}

                                    {/* Icon Picker */}
                                    {method === 'cash' && <Banknote size={32} className={paymentMethod === 'cash' ? 'text-emerald-500' : 'text-gray-400'} />}
                                    {method === 'transfer' && <CreditCard size={32} className={paymentMethod === 'transfer' ? 'text-emerald-500' : 'text-gray-400'} />}
                                    {method === 'qris' && <QrCode size={32} className={paymentMethod === 'qris' ? 'text-emerald-500' : 'text-gray-400'} />}

                                    <span className={`font-semibold capitalize ${paymentMethod === method
                                        ? (darkMode ? "text-white" : "text-emerald-600")
                                        : "text-gray-500"
                                        }`}>
                                        {method === 'cash' ? 'Tunai' : method === 'transfer' ? 'Transfer Bank' : 'QRIS'}
                                    </span>
                                </button>
                            ))
                            }
                        </div>

                        {/* Area Instruksi Dinamis */}
                        {paymentMethod && (
                            <div className={`mt-8 p-6 ${darkMode ? "bg-[#0f1520] border-gray-800" : "bg-gray-50 border-gray-200"} rounded-2xl border animate-in fade-in zoom-in-95 duration-300`}>
                                <h4 className={`text-sm font-bold mb-4 flex items-center gap-2 ${darkMode ? "text-white" : "text-gray-800"}`}>
                                    <Info size={16} className="text-[var(--header-primary-color)]" /> Instruksi Pembayaran {paymentMethod === 'cash' ? 'Tunai' : paymentMethod === 'transfer' ? 'Transfer' : 'QRIS'}
                                </h4>

                                <div className='sm:flex gap-2 justify-between items-center'>
                                    {paymentMethod === 'cash' ? (
                                        <div className="space-y-4">
                                            <div className={`flex gap-4 items-start ${darkMode ? "bg-blue-900/20 border-blue-900/30" : "bg-blue-50 border-blue-100"} p-4 rounded-xl border `}>
                                                <Store className="text-blue-600 shrink-0" size={24} />
                                                <div className={`text-xs ${darkMode ? "text-blue-300" : " text-blue-800"} leading-relaxed`}>
                                                    <p className="font-bold mb-1">Langkah Pembayaran:</p>
                                                    <ul className="list-decimal list-inside space-y-1 opacity-90">
                                                        <li>Selesaikan pesanan Anda.</li>
                                                        <li>Kunjungi {outlet}.</li>
                                                        <li><b>Tunjukkan QR code di samping</b> kepada kasir untuk proses yang lebih cepat.</li>
                                                        <li>Lakukan pembayaran sesuai total belanja Anda.</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col md:flex-row gap-8">
                                            {/* Panel Kiri: Aksi QR/Visual */}
                                            <div className="flex-1 text-center">
                                                {paymentMethod === 'qris' ? (
                                                    <div className="space-y-4">
                                                        <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 inline-block">
                                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QRIS_DEMO" alt="QRIS" className="w-32 h-32" />
                                                        </div>
                                                        <p className="text-[10px] text-gray-500 font-medium italic">Pindai kode QR di atas menggunakan aplikasi bank atau e-wallet (Gopay/OVO/Dana).</p>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        {
                                                            banks?.map((b, i) => (
                                                                <div key={i} className={`p-4 ${darkMode ? "border-gray-700 bg-[#1a2333]" : "bg-white border-gray-200"} rounded-2xl border shadow-sm text-left`}>
                                                                    <div className="flex justify-between items-center mb-2">
                                                                        <span className="text-[10px] font-bold text-blue-600 uppercase">{b?.master_bank?.name}</span>
                                                                        <img src={b?.master_bank?.logo} alt={b?.master_bank?.name} className="h-3" />
                                                                    </div>
                                                                    <p className="text-xs text-gray-400 mb-1">Nomor Rekening:</p>
                                                                    <div className='flex items-center justify-between'>
                                                                        <p className={`text-lg font-mono font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{b?.account_number}</p>
                                                                        <Copy size={14} />
                                                                    </div>
                                                                    <p className="text-[10px] text-gray-500 mt-1">a/n {b?.account_name}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )}
                                            </div>

                                            {/* Panel Kanan: Upload Bukti */}
                                            <div className={`flex-[1.5] border-t md:border-t-0 md:border-l ${darkMode ? "border-gray-800" : "border-gray-200 "} pt-6 md:pt-0 md:pl-8`}>
                                                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Upload Bukti Transfer</p>
                                                <label className={`relative group cursor-pointer block border-2 border-dashed ${darkMode ? "bg-[#1a2333]  border-gray-700" : "border-gray-300 bg-white"} hover:border-[var(--header-primary-color)] rounded-2xl p-4 text-center transition-all`}>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                                    {imagePreview ? (
                                                        <div className="relative">
                                                            <img src={imagePreview} alt="Preview" className="h-24 mx-auto rounded-lg shadow-md" />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                                                                <span className="text-[10px] text-white font-bold">Ganti Foto</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="py-2">
                                                            <div className={`w-10 h-10 ${darkMode ? "bg-[#0f1520]" : "bg-gray-50 "} rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                                                                <Upload className="text-gray-400 group-hover:text-[var(--header-primary-color)]" size={18} />
                                                            </div>
                                                            <span className="text-[10px] text-gray-500 block">Klik untuk pilih file atau foto struk</span>
                                                            <span className="text-[9px] text-gray-400 italic">Maks. 5MB (JPG, PNG)</span>
                                                        </div>
                                                    )}
                                                </label>
                                                <div className="mt-4 flex items-start gap-2 text-[10px] text-gray-400">
                                                    <Smartphone size={12} className="shrink-0 mt-0.5" />
                                                    <p>Atau <button onClick={() => setShowMobileUpload(true)} className="text-[var(--header-primary-color)] font-bold hover:underline">Scan QR</button> di sisi kiri untuk upload langsung dari HP.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className='flex items-center justify-center mt-2 sm:mt-0'>
                                        <div className='bg-slate-200 p-2 rounded-lg'>
                                            <QRCodeCanvas value={String(token)} size={120} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                <div className="lg:col-span-1">
                    <section className={`${darkMode ? "bg-[#161d2a] border-gray-800" : "bg-white border-gray-200"} p-6 rounded-3xl border sticky top-8 shadow-md`}>
                        <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${darkMode && 'text-white'}`}>
                            <ShoppingBag className="text-[var(--header-primary-color)]" /> Ringkasan
                        </h3>

                        <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {invalidItems.length > 0 && (
                                <div className={`mb-4 p-3 rounded-xl border text-xs ${darkMode
                                    ? "bg-red-900/20 border-red-800 text-red-300"
                                    : "bg-red-50 border-red-200 text-red-600"
                                    }`}>
                                    <div className="font-semibold mb-1">
                                        ⚠ Beberapa item melebihi stok
                                    </div>

                                    <ul className="space-y-1">
                                        {invalidItems.map((item) => {
                                            const overQty = item.qty - maxStock;

                                            return (
                                                <li key={item.id}>
                                                    • {item.name_product}
                                                    {item?.name_variant ? ` (${item.name_variant})` : ''}
                                                    {" "}→ maksimal {maxStock}, kelebihan {overQty}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                            {items.length > 0 ? (
                                items.map((item) => {

                                    return (
                                        <div key={item.id} className="flex gap-4 group">
                                            <img
                                                src={item.iamge_variant || item?.iamge_product}
                                                alt={item.name_variant || item?.name_product}
                                                className={`w-16 h-16 rounded-xl object-cover border ${darkMode ? "border-gray-700" : "border-gray-100"}`}
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h4 className={`font-semibold text-xs ${darkMode && "text-white"} truncate`}>
                                                    {item.name_product}
                                                    {item?.name_variant ? ` (${item?.name_variant})` : ''}
                                                </h4>

                                                <p className={`text-emerald-500 font-bold text-sm mt-0.5`}>
                                                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                                                </p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <div className={`flex items-center ${darkMode ? "bg-[#0f1520] border-gray-800" : "bg-gray-100 border-gray-200"} rounded-lg p-1 border`}>
                                                        <button
                                                            disabled={true}
                                                            className={`p-1 ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"} rounded-md transition-colors text-gray-500`}
                                                        >
                                                            <Minus size={12} className='opacity-30' />
                                                        </button>

                                                        <span className="text-xs font-bold px-2 min-w-[20px] text-center">
                                                            {item.qty}
                                                        </span>

                                                        <button
                                                            disabled={true}
                                                            className={`p-1 ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"} rounded-md transition-colors text-gray-500`}
                                                        >
                                                            <Plus size={12} className={'opacity-30'} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-10 opacity-50">
                                    <ShoppingBag size={40} className="mx-auto mb-2 text-gray-300" />
                                    <p className="text-xs text-gray-400 italic">Keranjang belanja Anda kosong.</p>
                                </div>
                            )}
                        </div>

                        <div className={`space-y-3 border-t ${darkMode ? "border-gray-800" : "border-gray-100"} pt-6 text-[13px]`}>
                            <div className={`flex justify-between ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <span>Subtotal</span>
                                <span>Rp {(Number(total)).toLocaleString('id-ID')}</span>
                            </div>
                            <div className={`flex justify-between ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <span>Pembayaran Uniq</span>
                                <span>Rp {(Number(uniq)).toLocaleString('id-ID')}</span>
                            </div>
                            {/* <div className={`flex justify-between ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                <span>Ongkos Kirim</span>
                                <span className="text-green-600 font-bold">Rp {shipping.toLocaleString('id-ID')}</span>
                            </div> */}
                            <div className={`flex justify-between text-lg font-black pt-4 border-t ${darkMode ? "text-white border-gray-800" : "border-gray-100"} mt-4`}>
                                <span>Total Bayar</span>
                                <span className="text-emerald-500">Rp {(Number(grantTotal)).toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4">
                            {/* Input Nama */}
                            <div>
                                <label className={`block text-xs font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    NAMA PENERIMA <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${darkMode
                                        ? `bg-[#0f1520] text-white ${!customerName && items.length > 0 ? "border-red-900/50 focus:border-red-500" : "border-gray-800 focus:border-[var(--header-primary-color)]"}`
                                        : `bg-gray-50 ${!customerName && items.length > 0 ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[var(--header-primary-color)]"}`
                                        }`}
                                />
                                {!customerName && items.length > 0 && (
                                    <p className="text-[10px] text-red-500 mt-1 italic">* Nama wajib diisi untuk pengiriman</p>
                                )}
                            </div>

                            {/* Input WhatsApp */}
                            <div>
                                <label className={`block text-xs font-bold mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    NOMOR WHATSAPP <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Contoh: 0812..."
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    className={`w-full p-3 rounded-xl border text-sm outline-none transition-all ${darkMode
                                        ? `bg-[#0f1520] text-white ${(phoneNumber && !phoneNumber.startsWith('628')) || (items.length > 0 && !phoneNumber) ? "border-red-900/50 focus:border-red-500" : "border-gray-800 focus:border-[var(--header-primary-color)]"}`
                                        : `bg-gray-50 ${(phoneNumber && !phoneNumber.startsWith('628')) || (items.length > 0 && !phoneNumber) ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[var(--header-primary-color)]"}`
                                        }`}
                                />

                                {items.length > 0 && !phoneNumber ? (
                                    <p className="text-[10px] text-red-500 mt-1 italic">* Nomor WA wajib diisi</p>
                                ) : phoneNumber && !phoneNumber.startsWith('628') ? (
                                    <div className="flex items-center gap-1 mt-1 text-red-500">
                                        <span className="text-[10px] font-medium italic">Format salah! Gunakan awalan 628</span>
                                    </div>
                                ) : phoneNumber && phoneNumber.length < 10 ? (
                                    <p className="text-[10px] text-orange-500 mt-1 italic">Nomor terlalu pendek...</p>
                                ) : null}
                            </div>
                        </div>

                    </section>
                </div>
            </div>
            {
                loading && <Loading />
            }
        </div>
    );
};

export default DetailCheckoutComponent;