import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CountdownTimer({endDate}) {
    // const [time, setTime] = useState(Date.now());
    // const [endTime, setEndTime] = useState(endDate);

    const getTimeLeft = () => {
        const diff = new Date(endDate).getTime() - Date.now();

        if (diff <= 0){
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
            <>
              <Text style={styles.time}>{timeLeft.days} дни : </Text>
            </>
          )}
          <Text style={styles.time}>{pad(timeLeft.hours)} ч. : </Text>
          <Text style={styles.time}>{pad(timeLeft.minutes)} мин. : </Text>
          <Text style={styles.time}>{pad(timeLeft.seconds)} сек. </Text>
        </View>
      );
    
}

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    time: {
      fontSize: 18,
      fontWeight: "600",
      color: "#925076",
    },
    expired: {
      fontSize: 14,
      color: "#999",
    },
  });
  