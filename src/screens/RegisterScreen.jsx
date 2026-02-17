import { View, Image, Text, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainButton from "../components/MainButton";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useAuth } from "../contexts/auth/useAuth";
import { FontAwesome } from "@expo/vector-icons";



export default function RegisterScreen({ navigation }) {
    const { width } = Dimensions.get("window");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { register, isLoading } = useAuth()

    const [isFocusedField, setIsFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {

        if (!email && !password && !confirmPassword) {
            return Toast.show({
                type: "error",
                text1: "All fields are required!",
                topOffset: 160,
            })
        }

        if (!email.trim()) {
            return Toast.show({
                type: "error",
                text1: "Email is required!",
                topOffset: 160,
            })
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            return Toast.show({
                type: "error",
                text1: "Please enter a valid email",
                topOffset: 160,
            })
        }

        if (!password) {
            return Toast.show({
                type: "error",
                text1: "Password is required!",
                topOffset: 160,
            })
        } else if (password.length < 4) {
            return Toast.show({
                type: "error",
                text1: "Password must be at least 4 characters!",
                topOffset: 160,
            })
        }

        if (password !== confirmPassword) {
            return Toast.show({
                type: "error",
                text1: "Password missmatch!",
                topOffset: 160,
            })
        }
    }

    const registerHandler = async () => {
        if (!validate()) return

        await register(email, password, confirmPassword)
        navigation.navigate("LoginScreen")
    }

    return (
        <SafeAreaView style={styles.container}>
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
                        style={{ flex: 1 }}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                        >
                            <TextInput
                                style={[styles.input, isFocusedField === "email" && styles.inputFocused]}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                placeholderTextColor={"#c2c2c2"}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onFocus={() => setIsFocusedField("email")}
                                onBlur={() => setIsFocusedField(null)}
                            />
                            <View>
                                <TextInput
                                    style={[styles.input, isFocusedField === "password" && styles.inputFocused]}
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Password"
                                    placeholderTextColor={"#c2c2c2"}
                                    keyboardType="name-phone-pad"
                                    autoCapitalize="none"
                                    secureTextEntry={!showPassword}
                                    autoCorrect={false}
                                    onFocus={() => setIsFocusedField("password")}
                                    onBlur={() => setIsFocusedField(null)}
                                />
                                <FontAwesome
                                    name={showPassword ? "eye" : "eye-slash"}
                                    size={18}
                                    color="#007175"
                                    style={{
                                        position: "absolute",
                                        right: 20,
                                        top: 18,
                                    }}
                                    onPress={() => setShowPassword(!showPassword)}
                                />

                            </View>
                            <TextInput
                                style={[styles.input, isFocusedField === "confirmPassword" && styles.inputFocused]}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm Password"
                                placeholderTextColor={"#c2c2c2"}
                                keyboardType="name-phone-pad"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onFocus={() => setIsFocusedField("confirmPassword")}
                                onBlur={() => setIsFocusedField(null)}
                            />

                            <MainButton title="Register" onPress={registerHandler} disabled={isLoading} style={{ marginTop: 70 }} />
                            <Text style={{ fontWeight: "bold", color: "#324B49", marginTop: 30, textAlign: "center" }}>Have an account? Log in.</Text>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#B4FAF8",
        // backgroundColor: "#CFFCFB",
        backgroundColor: "#00B8BD",
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
        borderColor: "#00B8BD",
    },
    inputFocused: {
        borderColor: "#4A90E2",
        backgroundColor: "#F0F7FF",
    },
})
