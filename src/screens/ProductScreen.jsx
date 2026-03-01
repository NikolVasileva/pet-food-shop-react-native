import { Text, View } from "react-native";

export default function ProductScreen({
    route,
    navigation
}) {
    const { productId } = route.params;

    return(
        <View>
            <Text>Test</Text>
        </View>
    )
}