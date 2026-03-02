import { createContext, useContext, useEffect, useState } from "react";
import { favService } from "../../services";
import { useAuth } from "../auth/useAuth";


const FavContext = createContext();

export default function FavProvider({ children }) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([]);

  const initUserFavorites = async (userId) => {
    try {
      const res = await favService.fetchFavoritesByUserId(userId);
  
      if (res.data.length === 0) {
        const newFav = {
          userId,
          products: []
        };
  
        const created = await favService.createFavorites(newFav);
        setFavorites([created.data]);
      } else {
        setFavorites(res.data);
      }
  
    } catch (err) {
      console.log("Cannot init favorites", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      initUserFavorites(user.id);
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
    const userFav = favorites.find(f => f.userId === user.id);
    if (!userFav || userFav.products.includes(productId)) return;
  
    const updatedProducts = [...userFav.products, productId];
    const updatedFav = { ...userFav, products: updatedProducts };
  
    await favService.updateFavorites(userFav.id, updatedFav);
  
    setFavorites(prev =>
      prev.map(f => f.id === userFav.id ? updatedFav : f)
    );
  };
  
  const removeFromFavorites = async (productId) => {
    const userFav = favorites.find(f => f.userId === user.id);
    if (!userFav) return;
  
    const updatedProducts = userFav.products.filter(p => p !== productId);
    const updatedFav = { ...userFav, products: updatedProducts };
  
    await favService.updateFavorites(userFav.id, updatedFav);
  
    setFavorites(prev =>
      prev.map(f => f.id === userFav.id ? updatedFav : f)
    );
  };


  const isFavorite = (productId) => {
    if (!user || !favorites) return false;
    const userFav = favorites.find(f => f.userId === user.id);
    return userFav?.products.includes(productId) ?? false;
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