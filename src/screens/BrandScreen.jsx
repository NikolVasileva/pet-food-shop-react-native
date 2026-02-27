import { Image, StyleSheet, Text, View } from "react-native";
import { shopService } from "../services";
import { useEffect, useState } from "react";

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

    return(
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={{ uri: brand.logo }}
                    style={{
                        width: 200,
                        height: 100,
                        resizeMode: "cover",
                    }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 12,
        // flex: 1,
    },
    logo: {
        flex: 1,
        alignItems: "center",
    },
})