import { getToken } from "@/store/authStore";
import axios, { AxiosInstance } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const getTenant = () => {
    if (typeof window === "undefined") return null;

    const host = window.location.hostname;
    const path = window.location.pathname;

    // 👉 CASE 1: subdomain (toko-sepatu.localhost)
    if (host.includes(".localhost")) {
        const subdomain = host.split(".")[0];
        return subdomain;
    }

    // 👉 CASE 2: path (localhost/toko-sepatu)
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 0) {
        return segments[0];
    }

    return null;
};
// helper ambil device
const getDevice = () => {
    return {
        device_id: localStorage.getItem("device_id"),
        device_token: localStorage.getItem("token"),
    };
};


// axios instance
export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔥 REQUEST INTERCEPTOR
apiClient.interceptors.request.use(async (config) => {
    const token = getToken();

    // ✅ AUTH USER
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // ✅ DEVICE
    let { device_id, device_token } = getDevice();

    config.headers["X-Device-Id"] = device_id;
    config.headers["X-Device-Token"] = device_token;

    // ✅ TENANT
    const tenant = getTenant();
    if (tenant) {
        config.headers["X-Tenant"] = tenant;
    }

    return config;
});