import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-financial-dashboard-cfb572b3f6e5.herokuapp.com/api",
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;