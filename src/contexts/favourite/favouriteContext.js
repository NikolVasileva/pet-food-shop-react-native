import { createContext, useContext } from "react";

export const FavouriteContext = createContext();

export function useFavouriteContext() {
    return useContext(FavouriteContext);
}