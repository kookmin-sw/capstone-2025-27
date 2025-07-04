import { Stack } from "expo-router"

export const screenOptions = {
    href: null
}
export default function MyContentLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerTitleStyle: {
                    fontSize: 25,
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen name="myquestions" options={{ title: "내 질문들"}} />
            <Stack.Screen name="myreplies" options={{ title: "내 답변들"}} />
            <Stack.Screen name="purchase" options={{ title: "포인트 구매"}} />
            <Stack.Screen name="sell" options={{ title: "포인트 판매"}} />
        </Stack>
    )
}