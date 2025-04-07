import { Text, View } from "react-native"
import TodoCard from "./TodoCard"
import { CardView } from "./CardView"

type Props = {
    daily: DAILY
}
export default function DailyCard({ daily } : Props) {
    return (
        <CardView color={daily.color}>
            <Text>Hi from DailyCard</Text>
            <Text>{daily.date.toDateString()}</Text>
            {daily.todos.map((todo) => (
                <TodoCard todo={todo} />
            ))}
        </CardView>
    )
}

function Past({ daily } : Props) {
    return (
        <CardView color={daily.color}></CardView>
    )
}