import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import CartDeliveryScreen from "../screens/CartDeliveryScreen";

export default function CartNavigator() {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cart" component={CartScreen}
                options={{ headerShown: false }} />
            <Stack.Screen name="CartDeliveryScreen" component={CartDeliveryScreen}
                options={{ headerShown: true, title: "Delivery information" }} />
        </Stack.Navigator>
    )
}