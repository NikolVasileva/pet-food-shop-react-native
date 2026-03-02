import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from "react-native";
import { useCart } from "../contexts/cart/CartProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import * as Clipboard from 'expo-clipboard';

export default function CartScreen({ navigation }) {
    const { items, total, removeFromCart, updateQuantity } = useCart();
    const [voucherCode, setVoucherCode] = useState("");
    const [applied, setApplied] = useState(false);

    const discountVoucher = "SAVE20";

    const totalWithDiscount = applied ? total * 0.8 : total;

    const applyVoucher = () => {
        if (voucherCode.toUpperCase() === discountVoucher) {
            setApplied(true);
            Alert.alert("Success", "Voucher applied! You get 20% off.");
        } else {
            Alert.alert("Invalid", "This voucher code is not valid.");
        }
    };

    const copyVoucher = async () => {
        await Clipboard.setStringAsync(discountVoucher);
        Alert.alert("Copied!", `Voucher code ${discountVoucher} copied to clipboard.`);
    };

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.safe}>
                <Text style={styles.title}>Cart</Text>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                </View>
            </SafeAreaView>
        );
    }

    const pressDeliveryHandler = () => {
        navigation.navigate("CartDeliveryScreen")
    }

    return (
        <SafeAreaView style={styles.safe}>
            <Text style={styles.title}>Your Cart</Text>
            <ScrollView style={styles.container}>
                {items.map(({ product, quantity }) => (
                    <View key={product.id} style={styles.cartItem}>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{product.name}</Text>
                            <Text style={styles.itemPrice}>{(product.price * quantity).toFixed(2)} €</Text>
                        </View>

                        <View style={styles.quantityRow}>
                            <TouchableOpacity
                                style={styles.qtyButton}
                                onPress={() => updateQuantity(product.id, quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                <Text style={styles.qtyText}>−</Text>
                            </TouchableOpacity>

                            <Text style={styles.quantity}>{quantity}</Text>

                            <TouchableOpacity
                                style={styles.qtyButton}
                                onPress={() => updateQuantity(product.id, quantity + 1)}
                            >
                                <Text style={styles.qtyText}>+</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeFromCart(product.id)}
                            >
                                <Text style={styles.removeText}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* Vaucher section*/}
                <View style={styles.voucherSection}>
                    <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Have a voucher?</Text>

                    <View style={styles.voucherRow}>
                        <TextInput
                            style={styles.voucherInput}
                            placeholder="Enter voucher code"
                            value={voucherCode}
                            onChangeText={setVoucherCode}
                        />
                        <TouchableOpacity style={styles.applyButton} onPress={applyVoucher}>
                            <Text style={styles.buttonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.copyButton} onPress={copyVoucher}>
                        <Text style={styles.copyText}>Copy voucher code: {discountVoucher}</Text>
                    </TouchableOpacity>
                </View>

                {/* Total section*/}
                <View style={styles.totalSection}>
                    <Text style={styles.totalText}>
                        Total: {totalWithDiscount.toFixed(2)} €
                        {applied && " (20% off applied)"}
                    </Text>
                    <TouchableOpacity style={styles.checkoutButton} onPress={pressDeliveryHandler}>
                        <Text style={styles.checkoutText}>Next step</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: "#F7F7F7",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 16,
      color: "#00B8BD",
    },
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 50,
    },
    emptyText: {
      fontSize: 18,
      color: "#555",
    },
    cartItem: {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    itemInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    itemName: {
      fontSize: 18,
      fontWeight: "500",
      flex: 1,
      marginRight: 10,
    },
    itemPrice: {
      fontSize: 18,
      fontWeight: "bold",
    },
    quantityRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    qtyButton: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: "#EFEFEF",
      justifyContent: "center",
      alignItems: "center",
    },
    qtyText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    quantity: {
      fontSize: 18,
      fontWeight: "bold",
      width: 40,
      textAlign: "center",
    },
    removeButton: {
      marginLeft: "auto",
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: "#FF6B6B",
      borderRadius: 8,
    },
    removeText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    totalSection: {
      marginTop: 20,
      padding: 16,
      backgroundColor: "#fff",
      borderRadius: 16,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    },
    totalText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
      textAlign: "right",
    },
    checkoutButton: {
      backgroundColor: "#00B8BD",
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
    },
    checkoutText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
    voucherSection: {
      marginTop: 20,
      marginBottom: 10,
      padding: 16,
      backgroundColor: "#fff",
      borderRadius: 16,
    },
    voucherRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    voucherInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      padding: 10,
      fontSize: 16,
      backgroundColor: "#F7F7F7",
    },
    applyButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: "#00B8BD",
      borderRadius: 12,
      marginTop: 12,
      alignSelf: "flex-start",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    copyButton: {
      marginTop: 8,
    },
    copyText: {
      color: "#00B8BD",
      fontWeight: "bold",
    },
    dashedSeparator: {
      width: 1,
      height: 40,
      borderStyle: "dashed",
      borderWidth: 1,
      borderColor: "#00B8BD",
      marginHorizontal: 8,
    },
    copyIcon: {
      padding: 4,
    },
  });