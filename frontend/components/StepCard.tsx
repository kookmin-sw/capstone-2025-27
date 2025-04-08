import { StyleSheet, Text, TouchableOpacity, View, Animated, Platform, UIManager } from "react-native";
import { timelineStyles, unitSpaceHeight, unitSpaceWidth } from "./styles";
import DailyCard from "./DailyCard";
import { useRef, useState } from "react";
import TimeLine from "./TimeLine";

type Props = {
    step: STEP
}
export default function SetCard({ step } : Props) {
    const [showDetails, setShowDetails] = useState(false)
    const animation = useRef(new Animated.Value(0)).current
    const contentHeight = useRef(0)

    function changeShow() {
        const finalValue = showDetails ? 0 : 350
        setShowDetails(!showDetails)

        Animated.timing(animation, {
            toValue: finalValue,
            duration: 600,
            useNativeDriver: false
        }).start()
    }
    return (
        <View>
            <TouchableOpacity style={styles.titleView} onPress={changeShow}>
                <Text style={styles.titleText}>{step.description}</Text>
            </TouchableOpacity>
            <Animated.View style={{ height: animation, overflow: "hidden" }}>
                <View style={timelineStyles.view} onLayout={(e) => {
                    contentHeight.current = e.nativeEvent.layout.height
                }}>
                    <TimeLine />
                    <View style={timelineStyles.eventView}>
                        <Text style={timelineStyles.stepPeriodText}>
                            {step.startPeriod.toDateString()} - {step.endPeriod.toDateString()}
                        </Text>
                        {step.dailies.map((daily) => (
                            <DailyCard key={daily.id} daily={daily}></DailyCard>
                        ))}
                    </View>
                </View>
            </Animated.View>
        </View>
    )
}


const styles = StyleSheet.create({
    titleView: {
        marginBlockStart: unitSpaceHeight(10),
        marginInline: unitSpaceWidth(10),
        borderWidth: unitSpaceWidth(1),
        padding: unitSpaceHeight(3),
        borderCurve: "circular",
        borderRadius: unitSpaceHeight(3),
        overflow: "hidden"
    },
    titleText: {
        fontSize: unitSpaceHeight(5),
    }
})