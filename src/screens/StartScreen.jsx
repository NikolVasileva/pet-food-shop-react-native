import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartScreen() {

    const { width, height } = Dimensions.get("window")

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
                <View style={{paddingHorizontal: 40, paddingVertical: 70, gap: 30, alignItems: "center"}}>
                    <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>Evertything needed for you <Text style={{color: "#B6B2E1"}}>lovely friend</Text>!</Text>
                    <Pressable style={{width: 300}}>
                        <Text style={{fontWeight: "bold", fontSize: 22, backgroundColor: "#B3E0DB", paddingHorizontal: 60, paddingVertical: 15, borderRadius: 25, textAlign:"center"}}>Register Now</Text>
                    </Pressable>
                    <Text style={{fontWeight: "bold"}}>Have an account? Log in.</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#B3E0DB",
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
})