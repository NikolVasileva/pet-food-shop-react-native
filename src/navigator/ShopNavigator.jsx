import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator";
import CartScreen from "../screens/CartScreen";

export default function ShopNavigator() {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator screenOptions={{
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#000",
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
                component={CartScreen}
                options={{
                    headerShown: false, tabBarIcon: ({ focused, size }) => (
                        <Ionicons name={focused ? "cart-sharp" : "cart-outline"} size={size}
                        color={focused ? "#00B8BD" : "#000"}  />
                    ),
                }}
            />
        </Tabs.Navigator>
    )
}