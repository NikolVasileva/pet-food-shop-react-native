import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { shopService } from "../services";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function BrandScreen({
    route,
    navigation
}) {

    const { brandId } = route.params;
    const [brand, setBrand] = useState(null)

    useEffect(() => {
        async function fetchBrand() {
            const result = await shopService.fetchBrandsById(brandId);
            setBrand(result.data);
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
        marginBottom: 12,
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
    }
})