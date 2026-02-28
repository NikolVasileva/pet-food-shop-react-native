import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { shopService } from "../services";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ProductCard from "../components/ProductCard";

export default function BrandScreen({
    route,
    navigation
}) {

    const { brandId } = route.params;
    const [brand, setBrand] = useState(null);
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchBrand() {
            const brandResult = await shopService.fetchBrandsById(brandId);
            setBrand(brandResult.data);

            const productResult = await shopService.fetchProductsByBrand(brandId);
            setProducts(productResult.data)
        }

        fetchBrand();
    }, [brandId])

    if (!brand) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={{ uri: brand.logo }}
                        style={{
                            width: 200,
                            height: 100,
                            resizeMode: "cover",
                        }} />
                </View>
                <Text style={styles.description}>{brand.description}</Text>
                <View style={styles.pointsSection}>
                    <View style={styles.points}>
                        <MaterialIcons name="pets" size={20} color="#F2A305" />
                        <Text style={styles.pointsText}>{brand.year} year</Text>
                    </View>
                    <View style={styles.points}>
                        <MaterialIcons name="pets" size={20} color="#00B8BD" />
                        <Text style={styles.pointsText}>{brand.country}</Text>
                    </View>
                    <View style={styles.points}>
                        <MaterialIcons name="pets" size={20} color="#FA163F" />
                        <Text style={styles.pointsText}>{brand.priceRange} food</Text>
                    </View>
                </View>
            </View>
            {/* Products Section */}
            <View style={styles.cardSection}>
                <Text style={styles.sectionTitle}>Top Products</Text>
                <View style={styles.sectionRow}>

                    {products.map((product) => (
                        <View style={styles.card}>
                            <ProductCard key={product.id} {...product} />
                        </View>
                    ))}

                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 25,
        gap: 15,
        // flex: 1,
    },
    logo: {
        flex: 1,
        alignItems: "center",
    },
    description: {
        textAlign: "center",
        fontSize: 17,
        padding: 10,
    },
    points: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        gap: 5,
    },
    pointsText: {
        fontSize: 15,
        fontWeight: "800",
    },
    pointsSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 25,
    },
    sectionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
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
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#333',
        marginBottom: 12,
        // color: "#00B8BD",
        color: "#000",
        textAlign: "center",
        textDecorationLine: "underline",
        textDecorationColor: "#00B8BD",
        textDecorationStyle: "double"
    },
})