import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { ScrollView, Text, View } from "react-native";
import { shopService } from "../services";
import ProductCard from "../components/ProductCard";


export default function CategoryScreen({
    route,
    navigation
}) {
    const { categoryId } = route.params;
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([])

    const productCardPressHandler = (productId) => {
        navigation.navigate("ProductScreen", { productId })
    }

    useEffect(() => {
        async function fetchCategory() {
            const categoryResult = await shopService.fetchCategoriesById(categoryId)
            setCategory(categoryResult.data);

            const productResult = await shopService.fetchProductsByCategory(categoryId);
            setProducts(productResult.data)
        }

        fetchCategory();
    }, [categoryId])

    if (!category) {
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
                    <Image source={{ uri: category.image }}
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: "cover",
                        }} />
                </View>
                <Text style={styles.description}>“The greatness of a nation and its moral progress can be judged by the way its animals are treated.”</Text>
                <Text style={styles.author}>Mahatma Gandhi</Text>
            </View>
            {/* Products Section */}
            <View style={styles.cardSection}>
                <Text style={styles.sectionTitle}>Top Products</Text>
                <View style={styles.sectionRow}>

                    {products.map((product) => (
                        <View style={styles.card} key={product.id} >
                            <ProductCard {...product} onPress={productCardPressHandler}/>
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
        paddingHorizontal: 10,
        fontStyle: "italic"
    },
    author: {
        fontSize: 17,
        fontStyle: "italic",
        fontWeight: "600"
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