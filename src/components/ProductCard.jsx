import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({
    image,
    name,
    price,
    promoPrice
}) {
    return (
        <TouchableOpacity>
            <View>
                <Image source={image}
                    style={{
                        width: 50,
                        height: 50,
                        resizeMode: "cover",
                    }} />
                <Text>{name}</Text>
                <Text>{price}</Text>
            </View>
        </TouchableOpacity>
    )
}