import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { api } from "../services/api";
import { shopService } from "../services";
import Toast from "react-native-toast-message";
import BrandBanner from "../components/BrandBanner";

export default function HomeScreen() {
    const [allBrands, setAllBrands] = useState([]);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const [refreshing, setRefreshing] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setRefreshing(true);

            try {
                const allBrandsResult = await shopService.fetchGetAllBrands();
                setAllBrands(allBrandsResult.data);
            } catch (error) {
                Toast.show({
                    type: "error",
                    text1: err.message || "Cannot load data!",
                    topOffset: 160,
                });
            } finally {
                setRefreshing(false)
            }
        }
        fetchData()
    }, [toggleRefresh])

    return (
        <ScrollView>

            {/* Brand Section */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.section}
            >
                {allBrands.map((brand) => (
                    <BrandBanner key={brand.id} logo={brand.logo} />
                ))}

            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    section: {
        padding: 16,
        paddingBottom: 8,
        flexDirection: "row", // хоризонтално
        flexWrap: "wrap", // ако са много – да минават на нов ред
        gap: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginBottom: 12,
    },
})