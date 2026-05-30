'use client';

import { OutletsType } from '@/types/Admin/OutletType';
import { ProductsType } from '@/types/Admin/ProductsType';
import { XIcon } from 'lucide-react';
import { QRCodeCanvas } from "qrcode.react";
type Props = {
    onClose: () => void;
    product: ProductsType | null;
    selectOutlet: string;
    outlets: OutletsType[];
}

const ModalDetailQRCode = ({ onClose, product, selectOutlet, outlets }: Props) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                {/* Header Modal */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-lg font-black text-slate-900">QR Product {product?.name}</h3>
                        {/* <p className="text-xs text-slate-500 mt-0.5">Arahkan kamera ke QR Code untuk dialihkan ke halaman detail produk.</p> */}
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className='flex items-center justify-center'>
                    <QRCodeCanvas value={String(`${baseUrl}/${product?.slug_business}/${selectOutlet === 'Semua' ? "" : selectOutlet}/detail-product/${product?.qrcode}`)} size={200} />
                </div>
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-2.5">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ModalDetailQRCode;