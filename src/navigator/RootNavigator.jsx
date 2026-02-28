import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import ShopNavigator from "./ShopNavigator";
import { useAuth } from "../contexts/auth/useAuth";
import HomeNavigator from "./HomeNavigator";

export default function RootNavigator() {
   
    const Stack = createNativeStackNavigator();
    const { isAuthenticated } = useAuth()

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated
            ? <Stack.Screen name="Shop" component={ShopNavigator} />
            : <Stack.Screen name="Auth" component={AuthNavigator} />
            }
        </Stack.Navigator>
    )
}