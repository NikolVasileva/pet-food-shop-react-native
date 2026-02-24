import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({
    id,
    image,
    name,
    price,
    isPromo
}) {
    return (
        <TouchableOpacity>
            <View style={[styles.card]}>
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <Text style={[styles.title]}>{name}</Text>
                {isPromo 
                ? 
                <View>
                    <Text style={[styles.isPromo]}>${isPromo}</Text>
                    <Text style={[styles.price, styles.secondPrice]}>${price}</Text>
                </View>
                : 
                <Text style={[styles.price]}>${price}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        // overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        padding: 10,
        width: "100%",
        height: 270,
    },
    brand: {
        fontSize: 16,
        color: '#262825',
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        color: '#262825',
        marginBottom: 15,
    },
    price: {
        fontSize: 14,
        color: '#7C7C7C',
        textAlign: "center",
        padding: 10,
    },
    promoPrice: {
        fontSize: 18,
        color: '#925076',
        textAlign: "center",
        padding: 0,
    },
    image: {
        width: "100%",
        height: 150,
    },
    secondPrice: {
        textDecorationLine: "line-through",
    }
})
