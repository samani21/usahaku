"use client";
import FormInput from "@/Components/Component/CRUD/FormInput/FormInput";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SelectOption } from "@/types/Public";
import { OutletsType } from "@/types/Admin/OutletType";
import dynamic from "next/dynamic";
const MapWithSearch = dynamic(() => import('@/Components/Component/Maps/MapWithSearch'), {
    ssr: false,
});
type Props = {
    handleFormSubmit: (form: FormData, id: number | null) => void;
    data: OutletsType | null;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    onCancel: () => void;
}


const selectOptions: SelectOption[] = [
    { label: "Senin", value: "Senin" },
    { label: "Selasa", value: "Selasa" },
    { label: "Rabu", value: "Rabu" },
    { label: "Kamis", value: "Kamis" },
    { label: "Jum'at", value: "Jum'at" },
    { label: "Sabtu", value: "Sabtu" },
    { label: "Minggu", value: "Minggu" },
];
const CreateOrUpdateOutlet = ({ handleFormSubmit, data, loading, setLoading, onCancel }: Props) => {
    const [form, setForm] = useState<any>({
        name: "",
        address: "",
        day_open: "",
        day_close: "",
        time_open: "",
        time_close: "",
    });
    const [error, setError] = useState<any>({
        name: null,
        address: null,
        day_open: null,
        day_close: null,
        time_open: null,
        time_close: null,
    })
    const [latLng, setLatLng] = useState<{
        lat: number,
        lng: number,
    } | null>(null)
    useEffect(() => {
        setLatLng(null);
        setForm({
            name: '',
            address: '',
            day_open: '',
            day_close: '',
            time_open: '',
            time_close: '',
        })
        if (data) {
            if (data?.lat) {
                setLatLng({
                    lat: data?.lat,
                    lng: data?.lng,
                })
            }
            setForm({
                name: data?.name,
                address: data?.address,
                day_open: data?.day_open,
                day_close: data?.day_close,
                time_open: data?.time_open,
                time_close: data?.time_close,
            });
        }
    }, [])
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        console.log('name', name, value);
        if (files) {
            setForm((prev: any) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setForm((prev: any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (form?.name == "") {
            setError({
                name: "Nama outlet harus diisi"
            })
            setLoading(false);
            return;
        }

        if (form?.address == "") {
            setError({
                address: "Alaamt harus diisi"
            })
            setLoading(false);
            return;
        }

        if (form?.day_open == "") {
            setError({
                day_open: "Jam buka harus diplih"
            })
            setLoading(false);
            return;
        }

        if (form?.day_close == "") {
            setError({
                day_close: "Jam tutup harus dipilih"
            })
            setLoading(false);
            return;
        }

        if (form?.time_open == "") {
            setError({
                time_open: "Jam buka harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.time_close == "") {
            setError({
                time_close: "Jam tutup harus diisi"
            })
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', form?.name);
        formData.append('address', form?.address);
        formData.append('day_open', form?.day_open);
        formData.append('day_close', form?.day_close);
        formData.append('time_open', form?.time_open);
        formData.append('time_close', form?.time_close);
        if (latLng) {
            formData.append('lat', String(latLng?.lat));
            formData.append('lng', String(latLng?.lng));

        }
        handleFormSubmit(formData, data?.id ?? null)
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* NUMBER */}
            <FormInput
                type="text"
                label="Nama Outlet"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama outlet"
                error={error?.name}
                required
            />
            <FormInput
                type="textarea"
                label="Alamat"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Type number"
                error={error?.address}
                required
            />
            <FormInput
                type="select"
                label="Hari Buka"
                name="day_open"
                value={form.day_open ?? 0}
                options={selectOptions}
                onChange={handleChange}
                error={error?.day_open}
                required
            />
            <FormInput
                type="select"
                label="Hari Tutup"
                name="day_close"
                value={form.day_close}
                options={selectOptions}
                onChange={handleChange}
                error={error?.day_close}
                required
            />
            <FormInput
                type="time"
                label="Jam Buka"
                name="time_open"
                value={form.time_open}
                options={selectOptions}
                onChange={handleChange}
                error={error?.time_open}
                required
            />
            <FormInput
                type="time"
                label="Jam Tutup"
                name="time_close"
                value={form.time_close}
                options={selectOptions}
                onChange={handleChange}
                error={error?.time_close}
                required
            />
            <div className='sm:w-lg'>
                <MapWithSearch onSelect={(lat, lng) => setLatLng({
                    lat: lat,
                    lng: lng
                })}
                    lat={latLng?.lat ?? 0}
                    lng={latLng?.lng ?? 0} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Tombol Batal */}
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="flex-1 py-3 rounded-xl font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
                >
                    BATAL
                </button>

                {/* Tombol Simpan */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex-[2] py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${loading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-black text-white hover:bg-gray-800 shadow-lg active:scale-[0.98]"
                        }`}
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>MEMPROSES...</span>
                        </>
                    ) : (
                        "SIMPAN DATA"
                    )}
                </button>
            </div>
        </form>
    );
};

export default CreateOrUpdateOutlet;
