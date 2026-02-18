import { SelectOption } from '@/types/Public';
import { AlertTriangle } from 'lucide-react';
import React, { ChangeEvent } from 'react'

type Props = {
    label: string;
    type: 'text' | 'number' | 'file' | 'textarea' | 'select' | 'price';
    name: string;
    value?: string | number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    error?: string;
    min?: number;
    max?: number;
    required?: boolean;
    options?: SelectOption[];
    placeholder?: string;
}

const FormInput = ({ label, type, name, value, onChange, error, min = 0, required = false, options = [], placeholder, max }: Props) => {
    const isFile = type === 'file';
    const isTextArea = type === 'textarea';
    const isSelect = type === 'select';
    const isPrice = type === 'price';

    const fileInputClasses = 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-800 hover:file:bg-zinc-300 transition duration-150';

    const baseInputClasses = `w-full p-3 border rounded-lg focus:ring-zinc-500 focus:border-zinc-500 bg-white text-gray-800 transition duration-150`;
    const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : 'border-gray-300';
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        let raw = e.target.value.replace(/\./g, "");  // hapus semua titik

        // Jika kosong, tetap lanjut
        const numeric = raw ? parseInt(raw, 10) : "";

        // Format pakai titik per 3 angka
        const formatted =
            numeric !== ""
                ? numeric.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : "";

        // Update tampilan
        e.target.value = formatted;

        // Kirim ke parent dengan angka murni
        const sendEvent = {
            ...e,
            target: {
                ...e.target,
                value: numeric.toString(),
                name: e.target.name,
            },
        };

        onChange(sendEvent as any);
    };

    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="text-sm font-medium text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {isPrice ? (
                <input
                    id={name}
                    type="text"
                    name={name}
                    value={isPrice ? (value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "") : value}
                    onChange={isPrice ? handlePriceChange : onChange}
                    className={`${baseInputClasses} ${isFile ? fileInputClasses : ''} ${errorClasses}`}
                    placeholder={placeholder ?? ''}
                />
            ) : isSelect ? (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${baseInputClasses} ${errorClasses}`}
                >
                    <option value="">
                        -- Pilih {label} --
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : isTextArea ? (
                <textarea
                    id={name}
                    name={name}
                    value={value as string}
                    onChange={onChange}
                    rows={3}
                    className={`${baseInputClasses} ${errorClasses}`}
                // required={required}
                />
            ) : (
                <input
                    id={name}
                    type={isFile ? 'file' : type}
                    name={name}
                    {...(!isFile && { value: value })}
                    onChange={onChange}
                    min={type === 'number' ? min : undefined}
                    max={type === 'number' ? max : undefined}
                    className={`${baseInputClasses} ${isFile ? fileInputClasses : ''} ${errorClasses}`}
                    // required={required}
                    step="1"
                    placeholder={type === 'number' && value === '' && !error ? '0' : placeholder ?? undefined}
                />
            )}
            {error && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                    <AlertTriangle size={14} className="mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormInput