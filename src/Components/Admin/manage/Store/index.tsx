"use client"
import React, { ReactElement, useEffect, useState } from "react";
import {
    Avatar,
    AvatarImage,
    Button,
    Card,
    CardContent,
    Input,
    Label,
    Textarea,
} from "@/Components/ui/Outlite";

import { Upload, MapPin, Save } from "lucide-react";
import { motion } from "framer-motion";
import { Get } from "@/utils/Get";
import { Post } from "@/utils/Post";
import MapPreview from "@/Components/Component/Maps/MapPreview";
import ModalMaps from "@/Components/Component/Maps/ModalMaps";
import { BusinessType } from "@/types/Admin/BusinessType";
import Cropper from "react-easy-crop";
type LocationItem = {
    id: number;
    lat: number;
    lng: number;
    name: string;
    address: string;
};
export default function BusinessProfile() {
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [openCrop, setOpenCrop] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        category: "produk",
        verified: '',
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [dataAddress, setDataAddress] = useState<LocationItem | null>(null)

    const [openMapId, setOpenMapId] = useState<number | null>(null);

    const [addresses, setAddresses] = useState<LocationItem[]>([
        { id: 1, name: '', address: "", lat: 0, lng: 0 },
    ]);
    const handleChange = (key: any, value: string) => setForm((s) => ({ ...s, [key]: value }));

    const addAddress = () =>
        setAddresses((a) => [...a, { id: addresses?.length + 1, name: "", address: "", lat: 0, lng: 0 }]);

    const updateAddress = (id: number | null, key: any, val: string | number) =>
        setAddresses((a) => a.map((it) => (it.id === id ? { ...it, [key]: val } : it)));

    const removeAddress = (id: number) => setAddresses((a) => (a.length === 1 ? a : a.filter((it) => it.id !== id)));


    useEffect(() => {
        getBusiness()
    }, [])

    const onLogoChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setOpenCrop(true);
        };
        reader.readAsDataURL(file);
    };



    const handleSave = async () => {
        try {
            setLoadingButton(true);

            const formData = new FormData();

            formData.append("name", form.name);
            formData.append("slug", form.slug);
            formData.append("description", form.description);
            formData.append("category", form.category);

            addresses.forEach((addr, i) => {
                formData.append(`addresses[${i}][id]`, String(addr.id));
                formData.append(`addresses[${i}][address]`, addr.address);
                formData.append(`addresses[${i}][name]`, addr.name);
                formData.append(`addresses[${i}][lat]`, String(addr.lat) ?? "");
                formData.append(`addresses[${i}][lng]`, String(addr.lng) ?? "");
            });

            if (logoFile) formData.append("logo", logoFile);
            const res = await Post("/business", formData);
            if (res) {
                setLoadingButton(false)
            }
        } catch (err: any) {
            setLoadingButton(false);

            console.log(err.message || "Gagal mengambil data");
        }
    };

    const getBusiness = async () => {
        try {
            const data = await Get<{ success: boolean; data: BusinessType }>("/business/show");
            if (data?.success) {
                const business = {
                    name: data?.data?.name,
                    slug: data?.data?.slug,
                    description: data?.data?.description,
                    category: data?.data?.category,
                    verified: data?.data?.verified_status === 1 ? "Terverifikasi" : "Belum diverifikasi",
                }
                setAddresses(data?.data?.store)
                setForm(business)
                setLogoPreview(data?.data?.logo_url)
            }
        } catch (err: any) {
            console.log(err.message || "Gagal mengambil data");
        }
    }

    const getCroppedImg = (imageSrc: string, crop: any) => {
        return new Promise<string>((resolve) => {
            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d")!;

                canvas.width = crop.width;
                canvas.height = crop.height;

                ctx.drawImage(
                    image,
                    crop.x,
                    crop.y,
                    crop.width,
                    crop.height,
                    0,
                    0,
                    crop.width,
                    crop.height
                );

                resolve(canvas.toDataURL("image/jpeg"));
            };
        });
    };


    return (
        <div>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-zinc-800">Profil Bisnis</h1>
                    <Button variant={loadingButton ? "disable" : "default"} className="flex items-center gap-2" disabled={loadingButton ? true : false} onClick={handleSave}>
                        {
                            loadingButton ? "...Proses" :
                                <>
                                    <Save size={16} /> Simpan
                                </>
                        }
                    </Button>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="rounded-2xl sm:p-6 shadow-sm">
                        <CardContent className="space-y-6 p-0">
                            <div className="flex items-center gap-6">
                                <Avatar className="w-24 h-24 border-2 border-white shadow-md">
                                    {
                                        logoPreview ?
                                            <AvatarImage src={logoPreview} /> :
                                            <div className="w-full h-48 bg-zinc-300" />
                                    }
                                </Avatar>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <label htmlFor="logo" className="cursor-pointer flex items-center gap-2">
                                        <Upload size={16} /> Ganti Logo
                                    </label>
                                </Button>
                                <input id="logo" type="file" accept="image/*" onChange={onLogoChange} className="hidden" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label>Nama Bisnis</Label>
                                    <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Contoh: Toko Bunda" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>Slug / URL</Label>
                                    <div className="flex items-center">
                                        <span className="bg-zinc-200 px-3 py-2 rounded-l-md border border-zinc-300 text-sm text-zinc-600">
                                            usahaku.com/
                                        </span>
                                        <Input value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} className="rounded-l-none" placeholder="tokobunda" />
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                                    <Label>Deskripsi</Label>
                                    <Textarea value={form.description ?? ''} onChange={(e) => handleChange("description", e.target.value)} rows={4} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>Kategori</Label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => handleChange("category", e.target.value)}
                                        className="border border-zinc-300 rounded-md p-2 text-sm bg-white"
                                    >
                                        <option value="Produk">Produk</option>
                                        <option value="Warung makan/kedai">Warung makan/kedai</option>
                                        <option value="Jasa">Jasa</option>
                                        <option value="Campuran">Campuran</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>Status Verifikasi</Label>
                                    <Input disabled value={form.verified ? "Terverifikasi" : "Belum Terverifikasi"} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="rounded-2xl p-6 shadow-sm space-y-4">
                        <h2 className="text-lg font-semibold text-zinc-700 flex items-center gap-2">
                            <MapPin size={18} /> Alamat & Lokasi
                        </h2>

                        <div className="space-y-4">
                            {addresses?.map((addr, i) => (
                                <div key={addr.id} className="flex flex-col gap-2 p-4 border border-zinc-200 rounded-xl bg-zinc-50">
                                    <Label>Nama Outlite</Label>
                                    <Input value={addr.name} onChange={(e) => updateAddress(addr.id, "name", e.target.value)} disabled />
                                    <Label>Alamat</Label>
                                    <Textarea value={addr.address} onChange={(e) => updateAddress(addr.id, "address", e.target.value)} disabled />

                                </div>
                            ))}
                        </div>

                        {addresses?.find((a) => a?.lat != 0 && a?.lng != 0) ?
                            <MapPreview addresses={addresses} /> : <CardContent className="w-full h-40 bg-zinc-300 rounded-md flex items-center justify-center text-zinc-600 text-sm">
                                (Map Preview)
                            </CardContent>}
                    </Card>
                </motion.div>
            </div>

            <ModalMaps openMapId={openMapId} setOpenMapId={setOpenMapId} updateAddress={updateAddress} addresses={addresses} dataAddress={dataAddress} />
            {openCrop && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
                        <div className="relative w-full h-64">
                            <Cropper
                                image={imageSrc!}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={(_, croppedAreaPixels) =>
                                    setCroppedAreaPixels(croppedAreaPixels)
                                }
                            />
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setOpenCrop(false)}>
                                Batal
                            </Button>

                            <Button
                                onClick={async () => {
                                    const croppedImage = await getCroppedImg(
                                        imageSrc!,
                                        croppedAreaPixels
                                    );

                                    setLogoPreview(croppedImage);

                                    // convert base64 ke file
                                    const blob = await fetch(croppedImage).then(r => r.blob());
                                    const file = new File([blob], "logo.jpg", {
                                        type: "image/jpeg",
                                    });

                                    setLogoFile(file);
                                    setOpenCrop(false);
                                }}
                            >
                                Gunakan
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
