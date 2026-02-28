import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function CategoryCard({
    id,
    image,
    name,
    onPress
}) {

    // const categoryImages = {
    //     dog: require("../../assets/dog-icon.png"),
    //     cat: require("../../assets/cat-icon.png"),
    //     bird: require("../../assets/bird-icon.png"),
    //     fish: require("../../assets/fish-icon.png"),
    //     mouse: require("../../assets/mouse-icon.png"),
    // };

    return (
        <TouchableOpacity onPress={() => onPress(id)}>
            <LinearGradient
                colors={["#00B8BD", "#F2A305"]}
                style={styles.gradientBorder}
            >
                <View style={styles.container}>
                    <Image source={image}
                        style={{
                            width: 50,
                            height: 50,
                            resizeMode: "cover",
                        }} />
                </View>
            </LinearGradient>
            <Text style={styles.content}>{name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    gradientBorder: {
        padding: 1, 
        borderRadius: 50,
    },
    container: {
        backgroundColor: "#CDECED",
        borderRadius: 50,
        borderWidth: 1,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        // marginBottom: 12,
    },
    content: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: "center",
        justifyContent: 'space-between',
        fontWeight: "bold",
        color: "#00B8BD",
    },
})