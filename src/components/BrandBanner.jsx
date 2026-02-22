import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function BrandBanner({
    logo
}) {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.content}>
                <Image source={{ uri: logo }}
                    style={{
                        width: 100,
                        height: 50,
                        resizeMode: "cover",
                    }} />
            </View>
        </TouchableOpacity>
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
    },
    content: {
        flex: 1,
    },
})