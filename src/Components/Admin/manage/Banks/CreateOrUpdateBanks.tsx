"use client";
import FormInput from "@/Components/Component/CRUD/FormInput/FormInput";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AlertTriangle, Check, ImageIcon, Scissors } from "lucide-react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import ImagePreview from "@/Components/Component/CRUD/FormInput/ImagePreview";
import { CategoriesType } from "@/types/Admin/CategoriesType";
import Alert, { AlertComponent } from "@/Components/Component/Alert";
import { Get } from "@/utils/Get";
import { BanksType } from "@/types/Admin/Banks";

type Props = {
    handleFormSubmit: (form: FormData, id: number | null) => void;
    data: BanksType | null;
}

interface OptionsType {
    label: string;
    value: number;
}
const CreateOrUpdateBanks = ({ handleFormSubmit, data }: Props) => {
    const [form, setForm] = useState<any>({
        account_name: "",
        account_number: "",
        master_bank_id: "",
    });
    const [error, setError] = useState<any>({
        account_name: null,
        account_number: null,
        master_bank_id: null,
    })
    const [loading, setLoading] = useState(false);

    const [banks, setBanks] = useState<OptionsType[]>()


    useEffect(() => {
        setForm({
            account_name: '',
            account_number: '',
            master_bank_id: '',
        })
        if (data) {
            setForm({
                account_name: data?.account_name,
                account_number: data?.account_number,
                master_bank_id: data?.master_bank_id,
            });
        }
        getBanks()
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
    const getBanks = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('master-banks?limit=10000');
            if (res?.success) {
                console.log('res', res)
                const banks = res?.data?.map((item: any) => ({
                    label: item.name,   // sesuaikan dengan field API
                    value: item.id,
                })) ?? [];

                setBanks(banks);
            }
        } catch (e) {

        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (form?.account_name == '') {
            setError({
                account_name: "Nama harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.account_number == '') {
            setError({
                account_number: "Nomor Akun harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.master_bank_id == '') {
            setError({
                master_bank_id: "Bank Harus dipilih"
            })
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('account_name', form?.account_name);
        formData.append('account_number', form?.account_number);
        formData.append('master_bank_id', form?.master_bank_id);
        handleFormSubmit(formData, data?.id ?? null)
        setLoading(false);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* TEXT */}
            <FormInput
                type="text"
                label="Nama Akun"
                name="account_name"
                value={form.account_name}
                onChange={handleChange}
                placeholder="Type text"
            />


            {/* NUMBER */}
            <FormInput
                type="number"
                label="Nomor Akun"
                name="account_number"
                value={form.account_number}
                onChange={handleChange}
                placeholder="Type number"
            />


            {/* SELECT */}
            <FormInput
                type="select"
                label="Bank"
                name="master_bank_id"
                value={form.master_bank_id}
                onChange={handleChange}
                options={banks}
            />


            {/* SUBMIT BUTTON */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold transition ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                    }`}
            >
                {loading ? "Loading..." : "SUBMIT"}
            </button>
        </form>
    );
};

export default CreateOrUpdateBanks;
