import { api } from "./api";

export async function register(email, password) {
    const result = await api.post("/register", { email, password });

    return result.data;
};

export async function login(email, password) {
    const result = await api.post("/login", { email, password });

    return result.data;
};
