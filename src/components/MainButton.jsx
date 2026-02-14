import { Pressable, StyleSheet, View, Text } from "react-native";

export default function MainButton({
    title,
    onPress,
    style,
}) {
    return (
        <Pressable onPress={onPress} style={[styles.buttonContainer, style]}>
            <View>
                <Text style={{fontWeight: "bold", fontSize: 22, textAlign: "center"}}>{title}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#B3E0DB", 
        paddingHorizontal: 60, 
        paddingVertical: 15, 
        borderRadius: 25, 
    }
})