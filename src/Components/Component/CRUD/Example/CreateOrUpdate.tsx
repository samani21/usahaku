"use client";
import FormInput from "@/Components/Component/CRUD/FormInput/FormInput";
import React, { useState } from "react";

const CreateOrUpdate = () => {
    const [form, setForm] = useState<any>({
        text: "",
        number: "",
        textarea: "",
        select: "",
        autocomplete: "",
        price: "",
        file: null,
    });

    const [loading, setLoading] = useState(false);

    const selectOptions = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
    ];

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;

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

        console.log("FORM RESULT:", form);

        setTimeout(() => {
            setLoading(false);
            alert("Submit berhasil 🚀");
        }, 1200);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* TEXT */}
            <FormInput
                type="text"
                label="TEXT"
                name="text"
                value={form.text}
                onChange={handleChange}
                placeholder="Type text"
            />


            {/* NUMBER */}
            <FormInput
                type="number"
                label="NUMBER"
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder="Type number"
            />

            {/* TEXTAREA */}
            <FormInput
                type="textarea"
                label="TEXTAREA"
                name="textarea"
                value={form.textarea}
                onChange={handleChange}
                placeholder="Type textarea"
            />

            {/* SELECT */}
            <FormInput
                type="select"
                label="SELECT"
                name="select"
                value={form.select}
                onChange={handleChange}
                options={selectOptions}
            />

            {/* AUTOCOMPLETE */}
            <FormInput
                type="autocomplete"
                label="AUTOCOMPLETE"
                name="autocomplete"
                value={form.autocomplete}
                onChange={handleChange}
                options={selectOptions}
            />

            {/* PRICE */}
            <FormInput
                type="price"
                label="PRICE (RUPIAH)"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="100000"
            />

            {/* FILE */}
            <FormInput
                type="file"
                label="FILE"
                name="file"
                onChange={handleChange}
            />

            <FormInput
                type="checkbox"
                label="Checkbox"
                name="is_featured"
                value={form.is_featured}
                onChange={handleChange}
            />

            <FormInput
                type="switch"
                label="Switch"
                name="is_active"
                value={form.is_active}
                onChange={handleChange}
            />

            <FormInput
                type="image"
                label="Image Upload"
                name="thumbnail"
                onChange={handleChange}
            />

            <FormInput
                type="password"
                label="PASSWORD"
                name="password"
                value={form.password ?? ''}
                onChange={handleChange}
                placeholder="Masukkan password"
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

export default CreateOrUpdate;
