import { createContext, useContext, useState } from "react";
import { useSecureState } from "../auth/useSecureState";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const [items, setItems] = useSecureState("cart", []);
    const [voucher, setVoucher] = useState(null);

    const discountVoucher = "SAVE20";

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

    const clearCart = () => {
        setItems([]);
    };

    // const total = items.reduce(
    //     (acc, item) => acc + item.product.price * item.quantity,
    //     0
    // );

    const applyVoucher = (code) => {
        if (code.toUpperCase() === discountVoucher) {
            setVoucher({ code, discount: 0.2 });
            return true;
        }
        return false;
    };

    const clearVoucher = () => setVoucher(null);

    const subtotal = items.reduce(
        (acc, item) => {
            const price = item.product.isPromo && item.product.isPromoPrice
                ? item.product.isPromoPrice
                : item.product.price;
            return acc + price * item.quantity;
        },
        0
    );

    const total = voucher ? subtotal * (1 - voucher.discount) : subtotal;

    return (
        <CartContext.Provider
            value={{ 
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                total,
                subtotal,
                voucher,
                applyVoucher,
                clearVoucher,
                clearCart 
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);