import { createContext, useContext, useEffect, useState } from "react";
import { favService } from "../../services";
import { useAuth } from "../auth/useAuth";


const FavContext = createContext();

export default function FavProvider({ children }) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      loadFavoritesFromUser(user.id);
    }
  }, [user]);

  const loadFavoritesFromUser = async (userId) => {
    try {
      const result = await favService.fetchFavorites(userId);
      setFavorites(result.data); 
    } catch (err) {
      console.log("Cannot load favorites", err);
    }
  };


  const addToFavorites = async (userId, productId) => {
    try {
      const result = await favService.addFavorite(userId, productId);
      setFavorites((prev) => [...prev, result.data]); 
 
    } catch (err) {
      console.log("Cannot add favorite", err);
    }
  };

  const removeFromFavorites = async (favoriteId) => {
    try {
      await favService.removeFavorite(favoriteId);
      setFavorites((prev) => prev.filter((f) => f.id !== favoriteId));
    } catch (err) {
      console.log("Cannot remove favorite", err);
    }
  };


  const isFavorite = (productId) => {
    return favorites.some((f) => f.productId === productId);
  };

  return (
    <FavContext.Provider
      value={{
        favorites,
        loadFavoritesFromUser,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavContext.Provider>
  );
}

export function useFavContext() {
  return useContext(FavContext);
}