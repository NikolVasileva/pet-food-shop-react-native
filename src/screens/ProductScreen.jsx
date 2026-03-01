import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { shopService } from "../services";
import { useCart } from "../contexts/cart/CartProvider.jsx";


export default function ProductScreen({ route, navigation }) {
    const { productId } = route.params;

    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const { addToCart } = useCart()


    useEffect(() => {
        async function fetchProduct() {
            try {
                const productResult = await shopService.fetchGetProductsById(productId);
                setProduct(productResult.data);
            } catch (error) {
                console.log("Cannot load the product", error);
            }
        }

        fetchProduct();
    }, [productId]);

    if (!product || !product.image) return null;

    const increaseQty = () => setQuantity((q) => q + 1);

    const decreaseQty = () => {
        if (quantity > 1) setQuantity((q) => q - 1);
    };

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.imageSection}>
                {product.isBestSeller && (
                    <View style={styles.bestSellerBadge}>
                        <Text style={styles.badgeText}>Best Seller</Text>
                    </View>
                )}

                {product.isPromoPrice && (
                    <View style={styles.promoBadge}>
                        <Text style={styles.badgeText}>Promo</Text>
                    </View>
                )}

                <Image source={{ uri: product.image }} style={styles.productImage} />
            </View>

            <View style={styles.infoCard}>
                {/* Title + Favorite */}
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{product.name}</Text>

                    <TouchableOpacity
                        style={[
                            styles.favoriteButton,
                            isFavorite && styles.favoriteActive
                        ]}
                        onPress={toggleFavorite}
                    >
                        <Text style={styles.favoriteIcon}>
                            {isFavorite ? "❤️" : "🤍"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.description}>{product.description}</Text>

                {/* Price */}
                <View style={styles.priceSection}>
                    {product.isPromoPrice ? (
                        <>
                            <Text style={styles.promoPrice}>
                                {product.isPromoPrice} €
                            </Text>
                            <Text style={styles.oldPrice}>
                                {product.price} €
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.price}>{product.price} €</Text>
                    )}
                </View>

                {/* Quantity */}
                <View style={styles.quantitySection}>
                    <TouchableOpacity style={styles.qtyButton} onPress={decreaseQty}>
                        <Text style={styles.qtyText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantity}>{quantity}</Text>

                    <TouchableOpacity style={styles.qtyButton} onPress={increaseQty}>
                        <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Order */}
                <TouchableOpacity style={styles.orderButton} onPress={() => addToCart(product, quantity)}>
                    <Text style={styles.orderText}>Поръчай ({quantity}) </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#F7F7F7",
    },

    imageSection: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        position: "relative",
    },

    productImage: {
        width: 260,
        height: 300,
        resizeMode: "contain",
    },

    infoCard: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 24,
        padding: 22,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 5,
    },

    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        flex: 1,
    },

    favoriteButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#F2F2F2",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },

    favoriteActive: {
        backgroundColor: "#FFECEC",
    },

    favoriteIcon: {
        fontSize: 22,
    },

    description: {
        fontSize: 16,
        color: "#555",
        marginBottom: 20,
        lineHeight: 22,
    },

    priceSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 25,
    },

    price: {
        fontSize: 26,
        fontWeight: "bold",
    },

    promoPrice: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#00B8BD",
    },

    oldPrice: {
        fontSize: 18,
        color: "#888",
        textDecorationLine: "line-through",
    },

    bestSellerBadge: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "#00B8BD",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        zIndex: 2,
    },

    promoBadge: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#F2A305",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        zIndex: 2,
    },

    badgeText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 13,
    },

    quantitySection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        gap: 20,
    },

    qtyButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#EFEFEF",
        justifyContent: "center",
        alignItems: "center",
    },

    qtyText: {
        fontSize: 22,
        fontWeight: "bold",
    },

    quantity: {
        fontSize: 20,
        fontWeight: "bold",
        width: 40,
        textAlign: "center",
    },

    orderButton: {
        backgroundColor: "#00B8BD",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        shadowColor: "#00B8BD",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 6,
    },

    orderText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
});