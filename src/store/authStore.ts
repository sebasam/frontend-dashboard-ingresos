import { create } from "zustand";
import api from "../api/axios";

interface User {
    id: string | number;
    email: string;
    name?: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    setAuth: (token: string, user: User) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem("token"),
    user: null,
    setAuth: (token, user) => {
        localStorage.setItem("token", token);
        set({ token, user });
    },
    login: async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        set({ token, user });
    },
    register: async (name, email, password) => {
        await api.post("/auth/register", { name, email, password });
        // auto-login
        const res = await api.post("/auth/login", { email, password });
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        set({ token, user });
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ token: null, user: null });
    },
}));
