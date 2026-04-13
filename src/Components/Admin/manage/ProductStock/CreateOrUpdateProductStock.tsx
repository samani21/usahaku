"use client";
import FormInput from "@/Components/Component/CRUD/FormInput/FormInput";
import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { Get } from "@/utils/Get";
import { ProductStockType } from "@/types/Admin/ProductStockType";
import { ProductsType } from "@/types/Admin/ProductsType";

type Props = {
    handleFormSubmit: (form: FormData, id: number | null) => void;
    data: ProductStockType | null;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

interface OptionsType {
    label: string;
    value: number;
}
const selectOptions: OptionsType[] = [
    { label: "Option 1", value: 1 },
    { label: "Option 2", value: 2 },
    { label: "Option 3", value: 3 },
];

const CreateOrUpdateProductStock = ({ handleFormSubmit, data, loading, setLoading }: Props) => {
    const [form, setForm] = useState<any>({
        outlet_id: "",
        product_id: "",
        date: "",
        product_varian_id: "",
        stock: "",
    });
    const [error, setError] = useState<any>({
        product_id: null,
        outlet_id: null,
        date: null,
        product_varian_id: null,
        stock: null,
    })
    const [icon, setIcon] = useState<string>('')

    const [productOption, setProductOptions] = useState<OptionsType[]>()
    const [outletOption, setOutletOption] = useState<OptionsType[]>()
    const [products, setProducts] = useState<ProductsType[]>()


    useEffect(() => {
        setForm({
            product_id: '',
            product_variant_id: '',
            stock: ''
        })
        if (data) {
            setForm({
                product_id: data?.product_id,
                product_variant_id: data?.product_variant_id,
                stock: data?.stock
            });
        }
        getProduct()
        getOutlet()
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
    const getProduct = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('products?limit=10000');
            if (res?.success) {
                const productStock = res?.data?.map((item: any) => ({
                    label: item.name,   // sesuaikan dengan field API
                    value: item.id,
                })) ?? [];
                setProductOptions(productStock);
            }
        } catch (e) {

        }
    }

    const getOutlet = async () => {
        try {
            const res = await Get<{ success: Boolean, data: any }>('outlet?limit=10000');
            if (res?.success) {
                const outlets = res?.data?.map((item: any) => ({
                    label: item.name,   // sesuaikan dengan field API
                    value: item.id,
                })) ?? [];
                setProducts(res?.data);
                setOutletOption(outlets);
            }
        } catch (e) {

        }
    }

    const variantOptions = useMemo(() => {
        const product = products?.find((p) => p?.id === form.product_id)?.variants
        return product?.map((item: any) => ({
            label: item.name,   // sesuaikan dengan field API
            value: item.id,
        })) ?? [];
    }, [form.product_id])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (form?.product_id == "") {
            setError({
                product_id: "Product harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.outlet_id == "") {
            setError({
                outlet_id: "Outlet harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.date == "") {
            setError({
                date: "Tanggal harus diisi"
            })
            setLoading(false);
            return;
        }
        if (variantOptions?.length > 0 && form?.product_variant_id == "") {
            setError({
                product_variant_id: "Variant harus diisi"
            })
            setLoading(false);
            return;
        }
        if (form?.stock == "") {
            setError({
                stock: "stock harus diisi"
            })
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('product_id', form?.product_id);
        formData.append('product_variant_id', form?.product_variant_id ?? null);
        formData.append('stock', form?.stock);
        formData.append('outlet_id', form?.outlet_id);
        formData.append('date', form?.date);
        handleFormSubmit(formData, data?.id ?? null)
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
                type="autocomplete"
                label="Product"
                name="product_id"
                value={form.product_id}
                onChange={handleChange}
                options={productOption}
                error={error?.product_id}
            />
            <FormInput
                type="autocomplete"
                label="Outlet"
                name="outlet_id"
                value={form.outlet_id}
                onChange={handleChange}
                options={outletOption}
                error={error?.outlet_id}
            />

            {
                variantOptions?.length > 0 &&
                <FormInput
                    type="autocomplete"
                    label="Produk Variant"
                    name="product_variant_id"
                    value={form.product_variant_id}
                    onChange={handleChange}
                    options={variantOptions}
                    error={error?.product_variant_id}
                />

            }
            {/* NUMBER */}
            <FormInput
                type="number"
                label="Stock"
                name="stock"
                value={form.stock ?? 0}
                onChange={handleChange}
                placeholder="Type number"
                error={error?.stock}
            />
            <FormInput
                type="date"
                label="Tanggal"
                name="date"
                value={form.date ?? 0}
                onChange={handleChange}
                error={error?.date}
            />
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

export default CreateOrUpdateProductStock;
