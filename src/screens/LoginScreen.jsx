import { View, Image, Text, StyleSheet, TextInput, Dimensions, KeyboardAvoidingView, TouchableOpacity, } from "react-native";
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
    const { login, isLoading, error, clearError } = useAuth()

    const [isFocusedField, setIsFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({
        email: false,
        password: false,
    });

    const validate = () => {
        const errors = { email: "", password: "", confirmPassword: "" };

        if (!email.trim()) errors.email = "Email is required!";
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Please enter a valid email";

        if (!password) errors.password = "Password is required!";
        else if (password.length < 4) errors.password = "Password must be at least 4 characters!";


        setFieldErrors(errors);

        return !Object.values(errors).some(Boolean);
    };

    // const registerHandler = async () => {
    //     if (!validate()) return;

    //     const result = await register(email, password);

    //     if (!result.success) {
    //         Toast.show({
    //             type: "error",
    //             text1: result.message,
    //             topOffset: 160,
    //         });
    //         clearError();
    //         return; 
    //     }

    //     Toast.show({
    //         type: "success",
    //         text1: "Registration successful!",
    //         topOffset: 160,
    //     });
    //     navigation.navigate("LoginScreen");
    // };

    const loginHandler = async () => {
        if (!validate()) return;
        clearError();

        try {
            const result = await login(email, password);

            if (!result.success) {
                Toast.show({
                    type: "error",
                    text1: result.message || "Registration failed",
                    topOffset: 160,
                });
                setFieldErrors((prev) => ({ ...prev, email: " " }));
                return;
            }

            Toast.show({
                type: "success",
                text1: "Login successful!",
                topOffset: 160,
            });

            // navigation.navigate("LoginScreen");
        } catch (error) {
            Toast.show({
                type: "error",
                text1: err.message || "Something went wrong!",
                topOffset: 160,
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: width, height: "100%", alignItems: "center" }}>

                <Image source={require("../../assets/login-cat.png")}
                    style={{
                        width: 300,
                        height: 205,
                        resizeMode: "cover",
                        zIndex: 2,
                        position: "relative"
                    }} />
                <View style={styles.whiteContainer}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 35, color: "#324B49", fontWeight: "bold", textAlign: "center", paddingVertical: 20 }}>Log in</Text>
                    </View>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={{ flex: 1 }}>
                        <ScrollView
                            contentContainerStyle={styles.scrollContent}
                            keyboardShouldPersistTaps="handled"
                        >
                            {fieldErrors.email ? (
                                <Text style={styles.errorText}>{fieldErrors.email}</Text>
                            ) : null}
                            <TextInput
                                style={[styles.input, isFocusedField === "email" && styles.inputFocused, fieldErrors.email && styles.inputError]}
                                value={email}
                                // onChangeText={setEmail}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setFieldErrors((prev) => ({ ...prev, email: "" }));
                                }}
                                placeholder="Email"
                                placeholderTextColor={"#c2c2c2"}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onFocus={() => setIsFocusedField("email")}
                                onBlur={() => setIsFocusedField(null)}
                            />


                            {fieldErrors.password ? (
                                <Text style={styles.errorText}>{fieldErrors.password}</Text>
                            ) : null}
                            <View>
                                <TextInput
                                    style={[styles.input, isFocusedField === "password" && styles.inputFocused, fieldErrors.password && styles.inputError]}
                                    value={password}
                                    // onChangeText={setPassword}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        setFieldErrors((prev) => ({ ...prev, password: "" }));
                                    }}
                                    placeholder="Password"
                                    placeholderTextColor={"#c2c2c2"}
                                    // keyboardType="name-phone-pad"
                                    autoCapitalize="none"
                                    secureTextEntry={!showPassword}
                                    autoCorrect={false}
                                    onFocus={() => setIsFocusedField("password")}
                                    onBlur={() => setIsFocusedField(null)}
                                />
                                <FontAwesome
                                    name={showPassword ? "eye" : "eye-slash"}
                                    size={18}
                                    color="#473000"
                                    style={{
                                        position: "absolute",
                                        right: 20,
                                        top: 18,
                                    }}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            </View>

                            <MainButton title="Log in" onPress={loginHandler} disabled={isLoading} style={{ marginTop: 70, backgroundColor: "#F2A305", }} />
                            {/* <Text style={{ fontWeight: "bold", color: "#324B49", marginTop: 30, textAlign: "center" }}>Have an account? Log in.</Text> */}
                            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                                <Text style={styles.linkText}>
                                    Don't have an account? Register.
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.demoInfo}>
                                <Text style={styles.demoTitle}>Demo Account:</Text>
                                <Text style={styles.demoText}>test@abv.bg / test</Text>
                            </View>
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
        backgroundColor: "#F2A305",
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
        borderColor: "#F2A305",
    },
    inputFocused: {
        borderColor: "#4A90E2",
        backgroundColor: "#F0F7FF",
    },
    inputError: {
        borderColor: "red",
        backgroundColor: "#ffe6e6",
    },
    errorText: {
        color: "red",
        marginTop: 2,
        marginBottom: 5,
        marginLeft: 15,
        fontSize: 14,
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
    demoInfo: {
        marginTop: 40,
        padding: 16,
        backgroundColor: "#FFE9B5",
        borderRadius: 12,
        alignItems: "center",
    },
    demoTitle: {
        fontSize: 16,
        color: "#324B49",
        fontWeight: "600",
        marginBottom: 4,
    },
    demoText: {
        fontSize: 16,
        color: "#324B49",
    },
})