import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../contexts/auth/useAuth";
import { authService } from "../services";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserScreen({}) {
    const { user, auth, logout, setUser } = useAuth(); 
    const [email, setEmail] = useState(user?.email || "");
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const saveEmail = async () => {
        if (!email.includes("@")) {
            return Alert.alert("Invalid email", "Please enter a valid email address");
        }
    
        if (!auth?.accessToken) {
            return Alert.alert("Error", "You must be logged in to update email.");
        }
    
        try {
            setIsSaving(true);
            const updatedUser = await authService.updateUser(
                user.id,
                { email },
                auth.accessToken
            );
    
            if (updatedUser && updatedUser.email) {
                setUser(updatedUser);
                console.log("Updated user:", updatedUser);
                Alert.alert("Success", `Email updated to ${updatedUser.email}`); // <- виждате новия имейл
                setIsEditing(false);
            } else {
                Alert.alert("Success", "Email updated successfully!"); // fallback
            }
        } catch (err) {
            console.log(err.response || err);
            Alert.alert("Error", "Failed to update email.");
            console.log("Updating user", user.id, { email }, auth.accessToken);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (user?.email) setEmail(user.email);
    }, [user]);

    const handleLogout = () => {
        logout();
        Alert.alert("Logout", "You have been logged out");
    };

    return (
        <SafeAreaView style={{flex: 1}}>
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
                        <Text style={[styles.input, { flex: 1, paddingVertical: 12 }]}>
                            {email}
                        </Text>
                    )}
                    {!isEditing && (
                        <TouchableOpacity
                            onPress={() => setIsEditing(true)}
                            style={{ marginLeft: 8 }}
                        >
                            <FontAwesome name="pencil" size={20} color="#00B8BD" />
                        </TouchableOpacity>
                    )}
                </View>

                {isEditing && (
                    <TouchableOpacity
                        style={[styles.button, { marginTop: 10, opacity: isSaving ? 0.5 : 1 }]}
                        onPress={saveEmail}
                        disabled={isSaving}
                    >
                        <Text style={styles.buttonText}>
                            {isSaving ? "Saving..." : "Save Changes"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.group}>
                <TouchableOpacity
                    style={[styles.button, styles.logoutButton]}
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16, 
        backgroundColor: "#f8f8f8",
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