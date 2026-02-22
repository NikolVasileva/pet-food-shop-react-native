import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { FontAwesome } from "@expo/vector-icons";

export default function ShopNavigator() {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false, tabBarIcon: ({ focused, size }) => (
                        <FontAwesome name={focused ? "heart" : "heart-o"} size={size} />
                    ),
                }}
            />
        </Tabs.Navigator>
    )
}