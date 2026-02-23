import { api } from "./api";

export async function fetchGetAllBrands() {
    return api.get("/brands")
}

export async function fetchGetAllCategories() {
    return api.get("/category")
}

export async function fetchGetAllProducts() {
    return api.get("/products")
}