import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";

export default function RootNavigator() {
   
    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthNavigator} />
        </Stack.Navigator>
    )
}