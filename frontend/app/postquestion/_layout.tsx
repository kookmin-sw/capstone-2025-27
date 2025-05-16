import { Stack } from "expo-router"

export const screenOptions = {
  href: null
}
export default function PostquestionLayout() {
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
      <Stack.Screen name="postpage" options={{title: "질문하기"}} />
      <Stack.Screen name="postreply" options={{title: "답변하기"}} />
    </Stack>
  )
}