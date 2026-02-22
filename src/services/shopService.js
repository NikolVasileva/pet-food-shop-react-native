import { api } from "./api";

export async function fetchGetAllBrands() {
    return api.get("/brands")
}