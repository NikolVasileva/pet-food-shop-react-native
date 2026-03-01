import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({
    id,
    image,
    name,
    price,
    isPromoPrice,
    isBestSeller,
    onPress
}) {
    return (
        <TouchableOpacity onPress={() => onPress(id)}>
            <View style={styles.card}>
                {/* Floating Labels */}
                {isPromoPrice && (
                    <View style={styles.promoLabel}>
                        <Text style={styles.promoText}>Promo</Text>
                    </View>
                )}
                {isBestSeller && (
                    <View style={styles.bestSellerLabel}>
                        <Text style={styles.sellerText}>Best Seller</Text>
                    </View>
                )}

                {/* Product Image */}
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode="contain"
                />

                {/* Product Info */}
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>{name}</Text>
                    {isPromoPrice ? (
                        <View style={styles.promoPriceSection}>
                            <Text style={styles.promoPrice}>{isPromoPrice} €</Text>
                            <Text style={styles.secondPrice}>{price} €</Text>
                        </View>
                    ) : (
                        <Text style={styles.price}>{price} €</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        padding: 12,
        marginBottom: 20,
        position: "relative",
    },
    image: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        marginBottom: 12,
    },
    info: {
        alignItems: "center",
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 8,
        color: "#262825",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#262825",
    },
    promoPriceSection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    promoPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#00B8BD",
    },
    secondPrice: {
        fontSize: 14,
        color: "#7C7C7C",
        textDecorationLine: "line-through",
    },
    promoLabel: {
        position: "absolute",
        top: 12,
        left: 12,
        backgroundColor: "#F2A305",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        zIndex: 2,
    },
    promoText: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 12,
    },
    bestSellerLabel: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "#00B8BD",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        zIndex: 2,
    },
    sellerText: {
        fontWeight: "bold",
        color: "#fff",
        fontSize: 12,
    },
});
