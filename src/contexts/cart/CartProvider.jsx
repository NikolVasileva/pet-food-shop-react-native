import { createContext, useContext } from "react";
import { usePersistedState } from "../auth/usePersistedState";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [items, setItems] = usePersistedState("cart", []);

    const addToCart = (product, quantity = 1) => {
        setItems(prevItems => {
            const existing = prevItems.find(item => item.product.id === product.id);

            if (existing) {
                return prevItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, { product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setItems(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const total = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, updateQuantity, total }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);