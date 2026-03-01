import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator";
import CartScreen from "../screens/CartScreen";
import { useCart } from "../contexts/cart/CartProvider";
import { Text, View } from "react-native";
import CartNavigator from "./CartNavigator";

export default function ShopNavigator() {
    const Tabs = createBottomTabNavigator();
    const { items } = useCart();
    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Tabs.Navigator screenOptions={{
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#000",
            headerShown: false,
          }}>
            <Tabs.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    headerShown: false, tabBarIcon: ({ focused, size }) => (
                        <Ionicons name={focused ? "home-sharp" : "home-outline"} size={size}
                        color={focused ? "#00B8BD" : "#000"}  />
                    ),
                }}
            />
            <Tabs.Screen 
                name="Cart" 
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <Ionicons name="cart-outline" size={size} color={color} />
                            {cartCount > 0 && (
                                <View style={{
                                    position: "absolute",
                                    right: -6,
                                    top: -3,
                                    backgroundColor: "red",
                                    borderRadius: 8,
                                    width: 16,
                                    height: 16,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{ color: "#fff", fontSize: 10, fontWeight: "bold" }}>
                                        {cartCount}
                                    </Text>
                                </View>
                            )}
                        </View>
                    )
                }}
            />
        </Tabs.Navigator>
    )
}