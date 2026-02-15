import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";


export default function AuthNavigator() {

    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
    )
}