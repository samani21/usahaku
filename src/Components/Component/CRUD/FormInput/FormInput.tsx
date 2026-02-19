import { SelectOption } from "@/types/Public";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";
import React, { ChangeEvent, useMemo, useState } from "react";
import { useEffect, useRef } from "react";
type Props = {
    label: string;
    type:
    | "text"
    | "number"
    | "file"
    | "textarea"
    | "select"
    | "price"
    | "autocomplete"
    | "checkbox"
    | "switch"
    | "image"
    | "password";

    name: string;
    value?: any;
    onChange: (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    error?: string;
    min?: number;
    max?: number;
    required?: boolean;
    options?: SelectOption[];
    placeholder?: string;
};

const FormInput = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    min = 0,
    required = false,
    options = [],
    placeholder,
    max,
}: Props) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);


    const isFile = type === "file";
    const isTextArea = type === "textarea";
    const isSelect = type === "select";
    const isPrice = type === "price";
    const isAutocomplete = type === "autocomplete";

    const baseInput =
        "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-800 transition duration-150";
    const errorStyle = error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
        : "border-gray-300";
    const fileStyle =
        "file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-800 hover:file:bg-zinc-300";

    useEffect(() => {
        if (isAutocomplete) {
            const selected = options.find(
                (opt) => opt.value.toString() === value?.toString()
            );
            if (selected) {
                setSearch(selected.label);
            }
        }
    }, [value, options, isAutocomplete]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (type === "image" && value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [value, type]);

    /* ============================= */
    /* FORMAT RUPIAH */
    /* ============================= */
    const formatRupiah = (val: string | number) => {
        if (!val) return "";
        const number = val.toString().replace(/\D/g, "");
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "");
        const formatted = formatRupiah(raw);

        e.target.value = formatted;

        const sendEvent = {
            ...e,
            target: {
                ...e.target,
                name,
                value: raw,
            },
        };

        onChange(sendEvent as any);
    };

    /* ============================= */
    /* AUTOCOMPLETE FILTER */
    /* ============================= */
    const filteredOptions = useMemo(() => {
        if (!search) return options;
        return options.filter((opt) =>
            opt.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, options]);

    /* ============================= */
    /* RENDER INPUT */
    /* ============================= */
    const renderInput = () => {
        if (isPrice) {
            return (
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 text-sm">
                        Rp
                    </span>
                    <input
                        type="text"
                        name={name}
                        value={formatRupiah(value ?? "")}
                        onChange={handlePriceChange}
                        placeholder={placeholder}
                        className={`${baseInput} pl-10 ${errorStyle}`}
                    />
                </div>
            );
        }

        if (isSelect) {
            return (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${baseInput} ${errorStyle}`}
                >
                    <option value="">-- Pilih {label} --</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            );
        }

        if (isAutocomplete) {
            return (
                <div ref={wrapperRef} className="relative">
                    <input
                        type="text"
                        placeholder={`Cari ${label}`}
                        value={search}
                        onFocus={() => setOpen(true)}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setOpen(true);
                        }}
                        className={`${baseInput} ${errorStyle}`}
                    />

                    {open && (
                        <div className="absolute z-20 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => (
                                    <div
                                        key={opt.value}
                                        onClick={() => {
                                            setSearch(opt.label);
                                            setOpen(false);

                                            const fakeEvent = {
                                                target: {
                                                    name,
                                                    value: opt.value,
                                                },
                                            };

                                            onChange(fakeEvent as any);
                                        }}
                                        className="p-2 hover:bg-green-50 cursor-pointer text-sm"
                                    >
                                        {opt.label}
                                    </div>
                                ))
                            ) : (
                                <div className="p-2 text-sm text-gray-400">
                                    Tidak ditemukan
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        }


        if (isTextArea) {
            return (
                <textarea
                    name={name}
                    value={value as string}
                    onChange={onChange}
                    rows={3}
                    className={`${baseInput} ${errorStyle}`}
                />
            );
        }
        if (type === "checkbox") {
            return (
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name={name}
                        checked={!!value}
                        onChange={(e) =>
                            onChange({
                                ...e,
                                target: {
                                    ...e.target,
                                    name,
                                    value: e.target.checked,
                                },
                            } as any)
                        }
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                </label>
            );
        }
        if (type === "switch") {
            return (
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                        {label}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            onChange({
                                target: {
                                    name,
                                    value: !value,
                                },
                            } as any)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${value ? "bg-green-600" : "bg-gray-300"
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${value ? "translate-x-6" : "translate-x-1"
                                }`}
                        />
                    </button>
                </div>
            );
        }
        if (type === "image") {
            return (
                <div className="space-y-3">
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg border"
                        />
                    )}

                    <input
                        type="file"
                        accept="image/*"
                        name={name}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setPreview(URL.createObjectURL(file));

                                onChange({
                                    ...e,
                                    target: {
                                        ...e.target,
                                        name,
                                        value: file,
                                    },
                                } as any);
                            }
                        }}
                        className={`${baseInput} ${fileStyle} ${errorStyle}`}
                    />
                </div>
            );
        }
        if (type === "password") {
            return (
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name={name}
                        value={value as string}
                        onChange={onChange}
                        placeholder={placeholder}
                        className={`${baseInput} pr-10 ${errorStyle}`}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 transition"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            );
        }

        return (
            <input
                type={isFile ? "file" : type}
                name={name}
                {...(!isFile && { value })}
                onChange={onChange}
                min={type === "number" ? min : undefined}
                max={type === "number" ? max : undefined}
                step="1"
                placeholder={placeholder}
                className={`${baseInput} ${isFile ? fileStyle : ""} ${errorStyle}`}
            />
        );
    };

    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-800 uppercase font-semibold">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {renderInput()}

            {error && (
                <p className="text-xs text-red-500 flex items-center mt-1">
                    <AlertTriangle size={14} className="mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;
