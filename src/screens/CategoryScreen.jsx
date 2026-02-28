import { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { ScrollView, Text, View } from "react-native";
import { shopService } from "../services";

export default function CategoryScreen({
    route
}) {
    const { categoryId } = route.params;
    const [category, setCategory] = useState(null);

    useEffect(() => {
        async function fetchCategory() {
            const categoryResult = await shopService.fetchCategoriesById(categoryId)
            setCategory(categoryResult.data);

            // const productResult = await shopService.fetchProductsByBrand(brandId);
            // setProducts(productResult.data)
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
                            width: 200,
                            height: 100,
                            resizeMode: "cover",
                        }} />
                </View>
            </View>
            <Text>{category.name}</Text>
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
    }
})