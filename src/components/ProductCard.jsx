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
            {/* {isPromoPrice
                ? <View style={styles.promoLabel}>
                    <Text style={styles.promoText}>Promo</Text>
                </View> : null
            } */}

            {isPromoPrice && (
                <View style={styles.promoLabel}>
                    <Text style={styles.promoText}>Promo</Text>
                </View>
            )}
            <View style={[styles.card]}>
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {/* {isBestSeller
                    ? <View style={styles.bestSellerLabel}>
                        <Text style={styles.sellerText}>Best Seller</Text>
                    </View> : null} */}
                {isBestSeller && (
                    <View style={styles.bestSellerLabel}>
                        <Text style={styles.sellerText}>Best Seller</Text>
                    </View>
                )}

                <Text style={[styles.title]}>{name}</Text>
                {/* {isPromoPrice
                    ?
                    <View style={styles.promoPriceSection}>
                        <Text style={[styles.promoPrice]}>{isPromoPrice} €</Text>
                        <Text style={[styles.secondPrice]}>{price} €</Text>
                    </View>
                    :
                    <Text style={[styles.price]}>{price} €</Text>
                } */}

                {isPromoPrice ? (
                    <View style={styles.promoPriceSection}>
                        <Text style={styles.promoPrice}>{isPromoPrice} €</Text>
                        <Text style={styles.secondPrice}>{price} €</Text>
                    </View>
                ) : (
                    <Text style={styles.price}>{price} €</Text>
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        // overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        padding: 10,
        width: "100%",
        height: 350,
        padding: 15,
        position: "relative"
    },
    brand: {
        fontSize: 16,
        color: "#262825",
        marginBottom: 5,
    },
    title: {
        fontSize: 17,
        color: "#262825",
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "500"
    },
    price: {
        fontSize: 16,
        color: "#262825",
        textAlign: "center",
        fontWeight: "500",
        // padding: 10,
    },
    promoPrice: {
        fontSize: 16,
        color: "#262825",
        textAlign: "center",
        fontWeight: "500",
    },
    image: {
        width: "100%",
        height: 180,
        resizeMode: "contain",
        marginBottom: 30
    },
    secondPrice: {
        textDecorationLine: "line-through",
        fontSize: 16,
        color: '#7C7C7C',
        textAlign: "center",
        // padding: 10,
    },
    promoPriceSection: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    promoLabel: {
        backgroundColor: "#F2A305",
        position: "absolute",
        top: 10,
        padding: 5,
        zIndex: 2,
        left: 137,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    bestSellerLabel: {
        backgroundColor: "#00B8BD",
        position: "absolute",
        bottom: 137,
        padding: 5,
        zIndex: 2,
        left: 0,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    promoText: {
        fontWeight: "bold"
    },
    sellerText: {
        fontWeight: "bold",
        color: "#fff"
    }
})
