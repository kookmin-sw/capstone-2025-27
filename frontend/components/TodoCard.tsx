import { StyleSheet, Text, View } from "react-native"
import { unitSpaceHeight } from "./styles"

type Props = {
    todo: TODO
}
export default function TodoCard({ todo } : Props) {
    return (
        <View style={styles.viewStyle}>
            <Text>Hi from TodoCard</Text>
            <Text>{todo.content}</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    viewStyle: {
        marginBlock: unitSpaceHeight(1)
    }
})