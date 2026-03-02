import { api } from "./api";

export async function fetchFavorites() {
    return api.get("/favorites");
};

export async function fetchFavoritesByUserId(userId) {
    return api.get(`/favorites?userId=${userId}`); 
  }

// export async function addFavorite(productId) {
//     return api.post(`/favorites/${productId}`)
// };

export async function addFavorite(userId, productId) {
    return api.post(`/favorites`, {
        userId,
        productId
    });
};

export async function removeFavorite(productId) {
    return api.delete(`/favorites/${productId}`)
};
