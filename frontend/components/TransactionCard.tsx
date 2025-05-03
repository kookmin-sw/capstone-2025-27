import { Text, View } from "react-native";
import { useUser } from "./contexts/UserContext";

export function TransactionCard() {

    const { user } = useUser()

    if (user?.id == undefined) {
        return (
            <View>
                <Text>유저 정보를 찾을 수 없음</Text>
            </View>
        )
    }
    return (
        <View>
            <Text>보유 포인트:{user.points}</Text>
        </View>
    )
}