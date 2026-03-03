import { createContext, useContext } from "react";
import { useSecureState } from "../auth/useSecureState";
import { useAuth } from "../auth/useAuth";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const { auth } = useAuth();
    const userId = auth?.user?.id;

    const [items, setItems] = userId
        ? useSecureState(`cart_${userId}`, [])
        : [[], () => {}]; 

    const addToCart = (product, quantity = 1) => {
        if (!userId) return;

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
        if (!userId) return;
        setItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (!userId) return;
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