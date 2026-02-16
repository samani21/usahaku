// utils/apiClient.ts (Kode sudah benar)
import { getToken } from "@/store/authStore";
import axios, { AxiosInstance } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Buat instance axios dengan baseURL
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    // Content-Type: undefined sudah benar untuk upload file (multipart/form-data)
    // dan JSON. Axios akan menangani secara otomatis.
    headers: {
        'Content-Type': undefined,
    },
});

// Interceptor untuk menambahkan token ke setiap request
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);