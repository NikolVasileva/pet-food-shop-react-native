import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";

export default function CartNavigator() {
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cart" component={CartScreen}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}