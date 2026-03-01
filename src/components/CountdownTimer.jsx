import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CountdownTimer({ endDate }) {
    // const [time, setTime] = useState(Date.now());
    // const [endTime, setEndTime] = useState(endDate);

    const getTimeLeft = () => {
        const diff = new Date(endDate).getTime() - Date.now();

        if (diff <= 0) {
            return null
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        }
    }
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft())
        }, 1000)

        return () => clearInterval(interval)
    }, [endDate])

    if (!timeLeft) {
        return <Text style={styles.expired}>The promo deal ended</Text>;
    }

    const pad = (num) => {
        if (num < 10) {
            return "0" + num
        }
        return String(num)
    }

    return (
        <View style={styles.container}>
            {timeLeft.days > 0 && (
                <View style={styles.elements}>
                    <Text style={[styles.circleText, styles.circle]}>{timeLeft.days}</Text>
                    <Text style={styles.time}>days</Text>
                </View>
                // <View style={styles.elements}>
                //     <View style={styles.circle}>
                //         <Text style={styles.circleText}>{pad(timeLeft.hours)}</Text>
                //     </View>
                //     <Text style={styles.time}>hours</Text>
                // </View>
            )}
            <View style={styles.elements}>
                <Text style={[styles.circleText, styles.circle]}>{pad(timeLeft.hours)}</Text>
                <Text style={styles.time}>hours</Text>
            </View>
            <View style={styles.elements}>
                <Text style={[styles.circleText, styles.circle]}>{pad(timeLeft.minutes)}</Text>
                <Text style={styles.time}>min</Text>
            </View>
            <View style={styles.elements}>
                <Text style={[styles.circleText, styles.circle]}>{pad(timeLeft.seconds)}</Text>
                <Text style={styles.time}>sec</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    time: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    expired: {
        fontSize: 14,
        color: "#999",
    },
    elements: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    circle: {
        backgroundColor: "#00B8BD",
        borderRadius: 25,
        padding: 12,
    },
    circleText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
    }
});
