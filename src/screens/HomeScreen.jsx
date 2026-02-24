import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { shopService } from "../services";
import Toast from "react-native-toast-message";
import BrandCard from "../components/BrandCard";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

export default function HomeScreen() {
    const [allBrands, setAllBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [bestSellersProducts, setBestSellersProducts] = useState([]);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const [refreshing, setRefreshing] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setRefreshing(true);

            try {
                const allBrandsResult = await shopService.fetchGetAllBrands();
                setAllBrands(allBrandsResult.data);

                const allCategoriesResult = await shopService.fetchGetAllCategories();
                setCategories(allCategoriesResult.data);

                const allBestSellersProductsResult = await shopService.fetchBestSellersProducts();
                setBestSellersProducts(allBestSellersProductsResult.data);

            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: error.message || "Cannot load data!",
                    topOffset: 160,
                });
            } finally {
                setRefreshing(false)
            }
        }
        fetchData()
    }, [toggleRefresh])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                {/* Home Banner */}
                <View style={{ padding: 16 }}>
                    <Image source={require("../../assets/promo-banner.png")}
                        style={{
                            width: "100%",
                            height: 205,
                            resizeMode: "cover",
                            borderRadius: 20,
                        }} />
                </View>

                {/* Category Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.sectionBanner}
                    >
                        {categories.map((category) => (
                            <CategoryCard key={category.id} image={category.image} name={category.name} />
                        ))}

                    </ScrollView>
                </View>

                {/* Brand Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Premium Brands</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.sectionBanner}
                    >
                        {allBrands.map((brand) => (
                            <BrandCard key={brand.id} logo={brand.logo} />
                        ))}
                    </ScrollView>
                </View>

                {/* Best Sellers Section */}
                <View>
                    <Text style={styles.sectionTitle}>Best Sellers</Text>
                    <View>
                        {bestSellersProducts.map((bestSellerProduct) => (
                            <ProductCard key={bestSellerProduct.id} 
                            image={bestSellerProduct.image}
                            name={bestSellerProduct.name}
                            price={bestSellerProduct.price}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    section: {
        padding: 16,
        paddingBottom: 8,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    sectionBanner: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#333',
        marginBottom: 12,
        // color: "#00B8BD",
        color: "#000"

    },
})