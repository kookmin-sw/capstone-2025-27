import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { unitSpaceHeight, unitSpaceWidth } from "./styles";
import DailyCard from "./DailyCard";
import { useState } from "react";

type Props = {
    step: STEP
}
export default function SetCard({ step } : Props) {
    const [show, setShow] = useState(false)

    function StepDetails() {
        if (show) {
            return (
                <View>
                    {step.dailies.map((daily) => (
                        <DailyCard key={daily.id} daily={daily}></DailyCard>
                    ))}
                </View>
            )
        } else {
            return
        }
    }
    function changeShow() {
        setShow(!show)
    }
    return (
        <View>
            <TouchableOpacity style={styles.hidden} onPress={changeShow}>
                <Text>{step.description}</Text>
            </TouchableOpacity>
            <StepDetails />
        </View>
    )
}


const styles = StyleSheet.create({
    hidden: {
        marginBlock: unitSpaceHeight(3),
        marginInline: unitSpaceWidth(10),
        borderWidth: unitSpaceWidth(1),
        padding: unitSpaceHeight(3)
    }
})