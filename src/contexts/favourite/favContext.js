import { createContext, useContext } from "react";

export const FavContext = createContext();

export function useFavContext() {
    return useContext(FavContext);
}