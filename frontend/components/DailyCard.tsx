import { Text, View } from "react-native"
import TodoCard from "./TodoCard"
import { CardView } from "./CardView"
import { useState } from "react"
import { timelineStyles } from "./styles"
import { TimeLineDot } from "./TimeLine"

type Props = {
    daily: DAILY
}
export default function DailyCard({ daily } : Props) {

    const [showDetails, setShowDetails] = useState(false)
    function DailyDetails() {
        if (showDetails) {
            return (
                <View>
                    {daily.todos.map((todo) => (
                        <TodoCard todo={todo} />
                    ))}
                </View>
            )
        } else return
    }

    return (
        <View style={timelineStyles.dotAndLineView}>
            <TimeLineDot />
            <View style={timelineStyles.event}>
                <Text>{daily.date.toDateString()}</Text>
                <DailyDetails />
            </View>
        </View>
    )
}