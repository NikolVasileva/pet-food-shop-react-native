import { Image, StyleSheet } from "react-native";
import { ScrollView, Text, View } from "react-native";
import CountdownTimer from "../components/CountdownTimer";
import { useEffect, useState } from "react";
import { shopService } from "../services";
import Toast from "react-native-toast-message";
import ProductCard from "../components/ProductCard";

export default function OfferScreen() {
    const [promoProducts, setPromoProducts] = useState([]);

    useEffect(() => {
        async function fetchPromoData() {
            try {
                const promoResult = await shopService.fetchPromoProducts();
                setPromoProducts(promoResult.data);
                // const normalizedProducts = promoResult.data.map(item => ({
                //     ...item,
                //     price: Number(item.price),
                //     isPromoPrice: item.isPromoPrice ? Number(item.isPromoPrice) : null,
                // }));
    
                // setPromoProducts(normalizedProducts);
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: error.message || "Cannot load data!",
                    topOffset: 160,
                });
            }
        }

        fetchPromoData()
    }, [])

    return (
        <ScrollView>
            <View>
                <View style={styles.bannerContainer}>
                    <Image source={require("../../assets/offer-banner.png")}
                        style={styles.bannerImage} />
                </View>
                <View style={{ gap: 20, padding: 5, paddingVertical: 20 }}>
                    <Text style={styles.headline}>Speacial Easter Deals</Text>
                    <Text style={styles.secondHeadline}>Hurry up!</Text>
                    <CountdownTimer endDate={new Date(2026, 4, 15, 23, 59, 59)} />
                </View>
            </View>
            {/* Best Sellers Section */}
            <View style={styles.cardSection}>
                <View style={styles.sectionRow}>
                    {promoProducts.map((product) => (
                        <View key={product.id} style={styles.card}>
                            <ProductCard {...product} />
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bannerContainer: {
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        overflow: "hidden",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bannerImage: {
        width: "100%",
        height: 250,
        // borderBottomRightRadius: 100,
        // borderBottomLeftRadius: 100,
    },
    headline: {
        fontSize: 24,
        color: "#262825",
        fontWeight: "600",
        alignItems: "center",
        textAlign: "center"
    },
    secondHeadline: {
        fontSize: 16,
        fontWeight: "800",
        color: "#808080",
        alignItems: "center",
        textAlign: "center"
    },
    card: {
        width: "48%",
        marginBottom: 20,
        gap: 12,
    },
    sectionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
        // width: "100%",
    },
    cardSection: {
        padding: 16,
        paddingBottom: 8,
        gap: 12,
    },
    card: {
        width: "48%",
        marginBottom: 20,
        gap: 12,
    }
})