import { Image, StyleSheet } from "react-native";
import { ScrollView, Text, View } from "react-native";

export default function OfferScreen() {
    return (
        <ScrollView>
            <View>
                <View style={styles.bannerContainer}>
                    <Image source={require("../../assets/offer-banner.png")}
                        style={styles.bannerImage} />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    bannerContainer: {
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bannerImage: {
        width: "100%",
        height: 250,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100, 
    }
})