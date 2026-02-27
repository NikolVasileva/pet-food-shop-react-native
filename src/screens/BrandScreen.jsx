import { Text, View } from "react-native";
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
        <View>
            <Text>
                {brand.title}
            </Text>
        </View>
    )
}