import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../contexts/auth/useAuth";

export default function UserScreen({}) {
    const { user, logout } = useAuth(); 
    const [email, setEmail] = useState(user?.email || "");
    const [isEditing, setIsEditing] = useState(false);

    const saveEmail = () => {
        if (!email.includes("@")) {
            return Alert.alert("Invalid email", "Please enter a valid email address");
        }
        Alert.alert("Success", `Email updated to ${email}`);
        setIsEditing(false);
    };

    useEffect(() => {
        if (user?.email) setEmail(user.email);
      }, [user]);

    const handleLogout = () => {
        logout();
        Alert.alert("Logout", "You have been logged out");
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Settings</Text>

            <View style={styles.group}>
                <Text style={styles.label}>Email</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {isEditing ? (
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    ) : (
                        <Text style={[styles.input, { flex: 1, paddingVertical: 12 }]}>{email}</Text>
                    )}
                    <TouchableOpacity
                        onPress={() => {
                            if (isEditing) saveEmail();
                            else setIsEditing(true);
                        }}
                        style={{ marginLeft: 8 }}
                    >
                        <FontAwesome
                            name={isEditing ? "check" : "pencil"}
                            size={20}
                            color="#00B8BD"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.group}>
                <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: "#f8f8f8" 
    },
    title: { 
        fontSize: 28, 
        fontWeight: "bold", 
        marginBottom: 24, 
        color: "#00B8BD", 
        textAlign: "center" 
    },
    group: { 
        marginBottom: 20 
    },
    label: { 
        fontSize: 16, 
        marginBottom: 8, 
        color: "#333" 
    },
    input: { 
        backgroundColor: "#fff", 
        padding: 12, 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: "#ddd", 
        fontSize: 16 
    },
    button: { 
        marginTop: 8, 
        backgroundColor: "#00B8BD", 
        padding: 12, 
        borderRadius: 10, 
        alignItems: "center" 
    },
    logoutButton: { 
        backgroundColor: "#FF6B6B" 
    },
    buttonText: { 
        color: "#fff", 
        fontWeight: "bold", 
        fontSize: 16 
    },
});