import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartScreen() {

    return(
        <SafeAreaView style={styles.container}>
            <View style={{margin: 15}}>
                <Image source={require("../../assets/paw.png")} 
                style={{
                    width: 58,
                    height: 50,
                }}/>
            </View>
            <View style={{
                flex: 1,
                alignItems: "flex-end",
            
            }}>
                <Image source={require("../../assets/Dog.png")}
                style={{
                    width: 370,
                    height: 500,
                    resizeMode: "contain",
                }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#B3E0DB",
        flex: 1,
    },
})