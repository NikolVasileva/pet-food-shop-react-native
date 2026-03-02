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

  const addToFavorites = async (productId) => {
    try {
      const userFav = favorites.find(f => f.userId === user.id);
      if (!userFav) return;
  
      if (userFav.products.includes(productId)) return;
  
      const updatedProducts = [...userFav.products, productId];
  
      await api.put(`/favorites/${userFav.id}`, {
        ...userFav,
        products: updatedProducts
      });
  
      setFavorites(prev =>
        prev.map(f =>
          f.id === userFav.id
            ? { ...f, products: updatedProducts }
            : f
        )
      );
  
    } catch (error) {
      console.log("Cannot add favorite", error);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const userFav = favorites.find(f => f.userId === user.id);
      if (!userFav) return;
  
      const updatedProducts = userFav.products.filter(
        (p) => p !== productId
      );
  
      const updatedFav = {
        ...userFav,
        products: updatedProducts
      };
  
      await favService.updateFavorites(userFav.id, updatedFav);
  
      setFavorites(prev =>
        prev.map(f =>
          f.id === userFav.id ? updatedFav : f
        )
      );
  
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