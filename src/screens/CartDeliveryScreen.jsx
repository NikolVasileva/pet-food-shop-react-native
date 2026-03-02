import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useCart } from "../contexts/cart/CartProvider";
import { CommonActions } from '@react-navigation/native';

export default function CartDeliveryScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { items, total, clearCart } = useCart();

  const pressOrderHandler = () => {
    if (!name || !phone || !address) {
      return Alert.alert("Error", "Please fill all fields");
    }

    if (phone.replace(/\D/g, "").length < 10) {
      return Alert.alert("Error", "Phone number must be at least 10 digits");
    }

    clearCart();

    setName("");
    setPhone("");
    setAddress("");

    setOrderPlaced(true);
  };

  const goHomeHandler = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }],
      })
    );
  };

  if (orderPlaced) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.banner}>
          <FontAwesome name="check-circle" size={60} color="#00B8BD" />
          <Text style={styles.bannerText}>Order placed successfully!</Text>
          <TouchableOpacity style={styles.homeButton} onPress={goHomeHandler}>
            <Text style={styles.homeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Delivery Details</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />

            <Text style={styles.totalText}>Total: {total.toFixed(2)} €</Text>

            <TouchableOpacity style={styles.placeOrderButton} onPress={pressOrderHandler}>
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: "#F7F7F7" 
},
  scrollContainer: { 
    flexGrow: 1, 
    padding: 16 
},
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#00B8BD", 
    marginBottom: 24, 
    textAlign: "center" 
},
  form: { 
    flex: 1 
},
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  placeOrderButton: {
    backgroundColor: "#00B8BD",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  placeOrderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "right",
    color: "#333",
  },
  banner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  bannerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#333",
    textAlign: "center",
  },
  homeButton: {
    backgroundColor: "#00B8BD",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
  },
  homeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});