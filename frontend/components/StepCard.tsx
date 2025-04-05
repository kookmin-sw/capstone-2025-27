import { StyleSheet, Text, View } from "react-native";
import { unitSpaceHeight } from "./styles";
import DailyCard from "./DailyCard";

type Props = {
    step: STEP
}
export default function SetCard({ step } : Props) {
    return (
        <View>
            <Text>Hi from SetCard</Text>
            <Text>{step.description}</Text>
            {step.dailies.map((daily) => (
                <DailyCard key={daily.id} daily={daily}></DailyCard>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        margin: unitSpaceHeight(5)
    }
})