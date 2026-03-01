import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import BrandScreen from "../screens/BrandScreen";
import OfferScreen from "../screens/OfferScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ProductScreen from "../screens/ProductScreen";

export default function HomeNavigator() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{ headerShown: false }} />

            <Stack.Screen name="BrandScreen" component={BrandScreen}
                options={({ route }) => ({
                    headerShown: true,          
                    headerTitle: route.params.brandName,  
                    headerBackTitleVisible: false, 
                    headerStyle: {
                        backgroundColor: "#00B8BD", 
                    },
                    headerTintColor: "#fff",
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
                    headerShown: true,       
                    headerTitle: route.params.categoryName, 
                    headerBackTitleVisible: false, 
                    headerStyle: {
                        backgroundColor: "#00B8BD",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                })} />
            <Stack.Screen name="ProductScreen" component={ProductScreen}
                options={({ route }) => ({
                    headerShown: true,   
                    title: "About the product",
                    headerBackTitleVisible: false, 
                    headerStyle: {
                        backgroundColor: "#00B8BD", 
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                })} />
        </Stack.Navigator>
    )
}