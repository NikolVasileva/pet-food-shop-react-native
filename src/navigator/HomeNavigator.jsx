import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import BrandScreen from "../screens/BrandScreen";
import OfferScreen from "../screens/OfferScreen";
import CategoryScreen from "../screens/CategoryScreen";

export default function HomeNavigator() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="BrandScreen" component={BrandScreen}
                options={({ route }) => ({
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
            <Stack.Screen name="OfferScreen" component={OfferScreen}
                options={{
                    headerShown: true,
                    title: "Easter Offer",
                    headerStyle: {
                        backgroundColor: "#00B8BD",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen}
                options={({ route }) => ({
                    headerShown: true,             // показваме хедъра
                    headerTitle: route.params.categoryName,  // заглавие
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