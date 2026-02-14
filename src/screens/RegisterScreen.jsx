import { View, Image, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function RegisterScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 15 }}>
                <Image source={require("../../assets/paw.png")}
                    style={{
                        width: 58,
                        height: 50,
                }}/>
            </View>
            <View>
                <Text style={{fontSize: 35, color: "#324B49", fontWeight: "bold", textAlign: "center"}}>Register</Text>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F1F1F1",
        flex: 1,
        padding: 20,
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