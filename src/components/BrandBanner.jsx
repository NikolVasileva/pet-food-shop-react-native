import { Image, TouchableOpacity, View } from "react-native";

export default function BrandBanner({
    logo
}) {
    return (
        <TouchableOpacity>
            <Image source={{ uri: logo}}
                style={{
                    width: 300,
                    height: 205,
                    resizeMode: "cover",
                }} />
        </TouchableOpacity>
    )
}