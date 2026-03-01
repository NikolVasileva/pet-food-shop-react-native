import { createContext, useContext } from "react";

export const CartContext = createContext();

export function useCartContext() {
    return useContext(CartContext);
}