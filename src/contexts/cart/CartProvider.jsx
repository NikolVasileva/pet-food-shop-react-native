import { createContext, useContext, useState } from "react";
import { useSecureState } from "../auth/useSecureState";
import { useAuth } from "../auth/useAuth";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const { auth } = useAuth();
    const userId = auth?.user?.id;

    const key = userId ? `cart_${userId}` : "dummy_cart";
    const [items, setItems] = useSecureState(key, []);

    const [voucher, setVoucher] = useState(null);

    const addToCart = (product, quantity = 1, setVoucherCode) => {
        if (!userId) return;

        setItems(prev => {
            const existing = prev.find(i => i.product.id === product.id);
            const updated = existing
                ? prev.map(i =>
                    i.product.id === product.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                )
                : [...prev, { product, quantity }];

            if (voucher) setVoucher(null);
            if (setVoucherCode) setVoucherCode("");

            return updated;
        });
    };

    const removeFromCart = (productId, setVoucherCode) => {
        if (!userId) return;
        setItems(prev => {
            const updated = prev.filter(i => i.product.id !== productId);
            if (voucher) setVoucher(null);
            if (setVoucherCode) setVoucherCode("");
            return updated;
        });
    };

    const updateQuantity = (productId, quantity, setVoucherCode) => {
        if (!userId) return;
        setItems(prev => {
            const updated = prev.map(i =>
                i.product.id === productId ? { ...i, quantity } : i
            );
            if (voucher) setVoucher(null);
            if (setVoucherCode) setVoucherCode("");
            return updated;
        });
    };

    const subtotal = items.reduce((acc, item) => {
        const price = item.product.isPromoPrice ? item.product.isPromoPrice : item.product.price;
        return acc + price * item.quantity;
    }, 0);

    const applyVoucher = (code) => {
        const validVouchers = { "SAVE20": 0.2 }; 
        const discount = validVouchers[code.toUpperCase()];
        if (!discount || items.length === 0) return false; 

        setVoucher({ code, discount });
        return true;
    };

    const total = voucher ? subtotal * (1 - voucher.discount) : subtotal;

    return (
        <CartContext.Provider value={{
            items,
            subtotal,
            total,
            voucher,
            addToCart,
            removeFromCart,
            updateQuantity,
            applyVoucher
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);