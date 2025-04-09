import { StyleSheet, Text, TouchableOpacity, View, Animated, Platform, UIManager } from "react-native";
import { stepCardStyles, timelineStyles, unitSpaceHeight, unitSpaceWidth } from "./styles";
import DailyCard from "./DailyCard";
import { useRef, useState } from "react";
import TimeLine from "./TimeLine";
import { toKoreanDate } from "@/api";

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
            <TouchableOpacity style={stepCardStyles.titleView} onPress={changeShow}>
                <Text style={stepCardStyles.titleText}>{step.description}</Text>
            </TouchableOpacity>
            <Animated.View style={{ height: animation, overflow: "hidden" }}>
                <View style={timelineStyles.view} onLayout={(e) => {
                    contentHeight.current = e.nativeEvent.layout.height
                }}>
                    <TimeLine />
                    <View style={timelineStyles.eventView}>
                        <Text style={timelineStyles.stepPeriodText}>
                            FROM: {toKoreanDate(step.startPeriod)}
                        </Text>
                        <Text style={timelineStyles.stepPeriodText}>
                            TO: {toKoreanDate(step.endPeriod)}
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
