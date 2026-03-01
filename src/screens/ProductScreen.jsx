import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { shopService } from "../services";

export default function ProductScreen({
    route,
    navigation
}) {
    const { productId } = route.params;

    const [product, setProduct] = useState([]);

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

    return(
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={{ uri: product.image }}
                    style={{
                        width: 200,
                        height: 300,
                        resizeMode: "cover",
                    }} />
            </View>
        </View>
    </ScrollView>

)}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        overflow: "hidden",
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