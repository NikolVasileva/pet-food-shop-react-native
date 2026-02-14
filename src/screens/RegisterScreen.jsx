import { View, Image, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function RegisterScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ margin: 15 }}>
                <Image source={require("../../assets/paw.png")}
                    style={{
                        width: 58,
                        height: 50,
                    }} />
            </View>
            <View>
                <Text style={{ fontSize: 35, color: "#324B49", fontWeight: "bold", textAlign: "center", paddingVertical: 30 }}>Register</Text>
            </View>
            <View style={{gap: 10}}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={"#c2c2c2"}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={"#c2c2c2"}
                    keyboardType="name-phone-pad"
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor={"#c2c2c2"}
                    keyboardType="name-phone-pad"
                    secureTextEntry={true}
                />
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
    input: {
        padding: 15,
        borderRadius: 20,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 2,
        borderColor: '#AAD5D1',
    }
})