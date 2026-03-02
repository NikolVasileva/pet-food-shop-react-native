import { api } from "./api";

export async function register(email, password) {
    const result = await api.post("/register", { email, password });

    return result.data;
};

export async function login(email, password) {
    const result = await api.post("/login", { email, password });

    return result.data;
};

// export async function updateUser(id, userData, token) {
//     const headers = token ? { Authorization: `${token}` } : {};
//     const result = await api.put(`/users/${id}`, userData, { headers });
//     return result.data;
// }

export async function updateUser(id, userData, token) {
    if (!token) throw new Error("No access token provided");

    const headers = {
        Authorization: `Bearer ${token}`
    };

    const result = await api.patch(`/users/${id}`, userData, { headers });
    return result.data;
}