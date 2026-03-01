import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useCart } from "../contexts/cart/CartProvider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
    const { items, total, removeFromCart, updateQuantity } = useCart();

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.safe}>
                <Text style={styles.title}>Cart</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <Text style={styles.title}>Your Cart</Text>
            <ScrollView style={styles.container}>
                {items.map(({ product, quantity }) => (
                    <View key={product.id} style={styles.cartItem}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{product.name}</Text>
                            <Text style={styles.itemPrice}>{(product.price * quantity).toFixed(2)} €</Text>
                        </View>

                        <View style={styles.quantityRow}>
                            <TouchableOpacity
                                style={styles.qtyButton}
                                onPress={() => updateQuantity(product.id, quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                <Text style={styles.qtyText}>−</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantity}>{quantity}</Text>

                            <TouchableOpacity
                                style={styles.qtyButton}
                                onPress={() => updateQuantity(product.id, quantity + 1)}
                            >
                                <Text style={styles.qtyText}>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeFromCart(product.id)}
                            >
                                <Text style={styles.removeText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <View style={styles.totalSection}>
                    <Text style={styles.totalText}>Total: {total.toFixed(2)} €</Text>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={styles.checkoutText}>Payment</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: "#F7F7F7",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 16,
        color: "#00B8BD",
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 50,
    },
    emptyText: {
        fontSize: 18,
        color: "#555",
    },
    cartItem: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    itemInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    itemName: {
        fontSize: 18,
        fontWeight: "500",
        flex: 1,
        marginRight: 10,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: "bold",
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    qtyButton: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: "#EFEFEF",
        justifyContent: "center",
        alignItems: "center",
    },
    qtyText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    quantity: {
        fontSize: 18,
        fontWeight: "bold",
        width: 40,
        textAlign: "center",
    },
    removeButton: {
        marginLeft: "auto",
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: "#FF6B6B",
        borderRadius: 8,
    },
    removeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    totalSection: {
        marginTop: 20,
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    totalText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "right",
    },
    checkoutButton: {
        backgroundColor: "#00B8BD",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    checkoutText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});