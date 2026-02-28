import { Image, StyleSheet } from "react-native";
import { ScrollView, Text, View } from "react-native";
import CountdownTimer from "../components/CountdownTimer";

export default function OfferScreen() {
    return (
        <ScrollView>
            <View>
                <View style={styles.bannerContainer}>
                    <Image source={require("../../assets/offer-banner.png")}
                        style={styles.bannerImage} />
                </View>
                <View style={{ gap: 15, padding: 5, }}>
                    <Text style={{ fontSize: 24, color: "#262825", fontWeight: "medium", alignItems: "center", textAlign: "center" }}>Promo Deals</Text>
                    <Text style={{ fontSize: 16, color: "#808080", alignItems: "center", textAlign: "center" }}>The Best Promo Deals</Text>
                    <CountdownTimer endDate={new Date(2026, 4, 15, 23, 59, 59)} />
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