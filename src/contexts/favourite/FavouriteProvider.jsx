import { createContext, useContext, useState } from "react";
import { favouriteService } from "../../services";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const loadFavoritesFromUser = async (userId) => {
    try {
      const result = await favouriteService.fetchFavorites(userId);
      setFavorites(result.data); 
    } catch (err) {
      console.log("Cannot load favorites", err);
    }
  };


  const addToFavorites = async (userId, productId) => {
    try {
      const result = await favouriteService.addFavorite(userId, productId);
      setFavorites((prev) => [...prev, result.data]); 
 
    } catch (err) {
      console.log("Cannot add favorite", err);
    }
  };

  const removeFromFavorites = async (favoriteId) => {
    try {
      await favouriteService.removeFavorite(favoriteId);
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
    } catch (err) {
      console.log("Cannot remove favorite", err);
    }
  };


  const isFavorite = (productId) => {
    return favorites.some((f) => f.productId === productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loadFavoritesFromUser,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);