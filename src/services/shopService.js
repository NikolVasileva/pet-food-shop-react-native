import { api } from "./api";

export async function fetchGetAllBrands() {
    return api.get("/brands")
}

export async function fetchBrandsById(brandId) {
    if (!brandId) {
        throw new Error('No ID provided!');
    }

    return api.get(`/brands/${brandId}`)
}

export async function fetchProductsByBrand(brandId) {
    return api.get(`/products?brand=${brandId}`);
};

export async function fetchGetAllCategories() {
    return api.get("/category")
}

export async function fetchGetAllProducts() {
    return api.get("/products")
}

export async function fetchBestSellersProducts() {
    return api.get("/products?isBestSeller=true")
}
