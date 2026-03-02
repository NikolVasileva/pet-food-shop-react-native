import { api } from "./api";

export async function fetchFavorites() {
  return api.get("/favorites");
}

export async function fetchFavoritesByUserId(userId) {
  return api.get(`/favorites?userId=${userId}`);
}

export async function updateFavorites(favId, data) {
  return api.put(`/favorites/${favId}`, data);
}
