import { View, Image, Text, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainButton from "../components/MainButton";
import { Platform } from "react-native";
import { ScrollView } from "react-native";


export default function RegisterScreen() {
    const { width, height } = Dimensions.get("window");

    return (
        <SafeAreaView style={styles.container}>
            {/* <View style={{ margin: 15 }}>
                <Image source={require("../../assets/paw.png")}
                    style={{
                        width: 58,
                        height: 50,
                    }} />
            </View> */}
            <View style={{ width: width, height: "100%", alignItems: "center" }}>

                <Image source={require("../../assets/registation-dog.png")}
                    style={{
                        width: 300,
                        height: 250,
                        resizeMode: "cover",
                        zIndex: 2,
                        position: "relative"
                    }} />
                <View style={styles.whiteContainer}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 35, color: "#324B49", fontWeight: "bold", textAlign: "center", paddingVertical: 20 }}>Register</Text>
                    </View>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}
                    >
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

                        <MainButton title="Register" style={{ marginTop: 70 }} />
                        <Text style={{ fontWeight: "bold", color: "#324B49", marginTop: 30, textAlign: "center" }}>Have an account? Log in.</Text>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#B3E0DB",
        flex: 1,
        position: "relative"
    },
    whiteContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        top: 175,
        height: "100%",
        zIndex: 1,
        elevation: 5,
        padding: 30,

    },
    input: {
        padding: 15,
        borderRadius: 25,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 2,
        borderColor: "#B3E0DB",
    },
})
