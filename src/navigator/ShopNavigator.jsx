import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator";

export default function ShopNavigator() {
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator>
            <Tabs.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    headerShown: false, tabBarIcon: ({ focused, size }) => (
                        <FontAwesome name={focused ? "heart" : "heart-o"} size={size} />
                    ),
                }}
            />
        </Tabs.Navigator>
    )
}