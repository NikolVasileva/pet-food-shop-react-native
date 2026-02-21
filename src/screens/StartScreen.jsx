import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainButton from "../components/MainButton";
import useAuth from "../contexts/auth/useAuth";

export default function StartScreen({ navigation }) {

    const { width } = Dimensions.get("window");
    // const { isLoading } = useAuth()

    const registerPressHandler = () => {
        navigation.navigate("RegisterScreen")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 15 }}>
                <Image source={require("../../assets/paw.png")}
                    style={{
                        width: 58,
                        height: 50,
                    }} />
            </View>
            <View style={{
                width: width,
                height: "100%",
                alignItems: "flex-end",
                overflow: "hidden"

            }}>
                <Image source={require("../../assets/Dog.png")}
                    style={{
                        width: 385,
                        height: 510,
                        resizeMode: "cover",
                    }} />
            </View>
            <View style={styles.whiteContainer}>
                <View style={{ paddingHorizontal: 40, paddingVertical: 70, gap: 30, alignItems: "center" }}>
                    <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center", color: "#324B49" }}>Evertything needed for you <Text style={{ color: "#00B8BD" }}>lovely friend</Text>!</Text>
                    <MainButton title="Register Now" onPress={registerPressHandler} />
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                        <Text style={styles.linkText}>
                            Have an account? Log in.
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#B3E0DB",
        backgroundColor: "#00B8BD",
        flex: 1,
    },
    whiteContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        zIndex: 100,
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
    },
    linkText: {
        fontSize: 14,
        fontWeight: "bold", 
        color: "#324B49", 
        marginTop: 30, 
        textAlign: "center",
        textDecorationLine: "underline",
        textDecorationColor: "#324B49", 
    },
})