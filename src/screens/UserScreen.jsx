import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function UserScreen() {
    // Данни на регистрирания потребител
    const [email, setEmail] = useState("user@example.com");
    const [name, setName] = useState("John Doe");

    // Функция за запазване на нов имейл
    const saveEmail = () => {
        if (!email.includes("@")) {
            return Alert.alert("Invalid email", "Please enter a valid email address");
        }
        Alert.alert("Success", `Email updated to ${email}`);
    };

    // Logout функция
    const handleLogout = () => {
        Alert.alert("Logout", "You have been logged out");
        // Тук може да добавиш логика за реален logout
    };

    // Допълнително действие: промяна на име
    const saveName = () => {
        Alert.alert("Success", `Name updated to ${name}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Settings</Text>

            <View style={styles.group}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <TouchableOpacity style={styles.button} onPress={saveName}>
                    <Text style={styles.buttonText}>Save Name</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={saveEmail}>
                    <Text style={styles.buttonText}>Save Email</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.group}>
                <TouchableOpacity style={[styles.button, styles.historyButton]} onPress={() => Alert.alert("Orders", "Here you can see your order history")}>
                    <Text style={styles.buttonText}>Order History</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#f8f8f8" },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 24, color: "#00B8BD", textAlign: "center" },
    group: { marginBottom: 20 },
    label: { fontSize: 16, marginBottom: 8, color: "#333" },
    input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", fontSize: 16 },
    button: { marginTop: 8, backgroundColor: "#00B8BD", padding: 12, borderRadius: 10, alignItems: "center" },
    logoutButton: { backgroundColor: "#FF6B6B" },
    historyButton: { backgroundColor: "#007AFF" },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});