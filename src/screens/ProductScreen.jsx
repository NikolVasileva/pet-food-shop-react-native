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

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    {/* <Image source={require("../../assets/dog-product.jpg")}
                    style={{
                        width: 120,
                        height: 100,
                        resizeMode: "cover",
                    }} /> */}
                    <Image source={{ uri: product.image }}
                        style={{
                            width: 200,
                            height: 300,
                            resizeMode: "cover",
                        }} />
                </View>
            </View>
            <View>
                {product.isBestSeller && (
                    <View style={styles.bestSellerLabel}>
                        <Text style={styles.sellerText}>Best Seller</Text>
                    </View>
                )}
                <View>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
                <Image source={require("../../assets/dog-product2.png")}
                    style={{
                        width: 200,
                        height: 200,
                        resizeMode: "cover",
                        position: "absolute",
                        top: 200,
                        right: 0,
                    }} />
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
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
        position: "relative",
    },
    description: {
        textAlign: "center",
        fontSize: 18,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    bestSellerLabel: {
        backgroundColor: "#00B8BD",
        position: "absolute",
        bottom: 107,
        padding: 5,
        zIndex: 2,
        left: 180,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    sellerText: {
        fontWeight: "bold",
        color: "#fff"
    }

})