import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function MainButton({
    title,
    onPress,
    style,
    disabled = false,
}) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.6} disabled={disabled} style={[styles.buttonStyle, style ]}>
            <View>
                <Text style={{fontWeight: "bold", fontSize: 22, textAlign: "center"}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#B3E0DB", 
        paddingHorizontal: 60, 
        paddingVertical: 15, 
        borderRadius: 25, 
    },
})