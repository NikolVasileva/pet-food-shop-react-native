import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import BrandScreen from "../screens/BrandScreen";

export default function HomeNavigator() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="BrandScreen" component={BrandScreen}  
            options={({ route }) =>({
                    headerShown: true,             // показваме хедъра
                    headerTitle: route.params.brandName,  // заглавие
                    headerBackTitleVisible: false, // премахва текста на бутона Back
                    headerStyle: {
                        backgroundColor: "#00B8BD", // цветът на лентата
                    },
                    headerTintColor: "#fff", // цветът на стрелката и текста
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                })} />
        </Stack.Navigator>
    )
}