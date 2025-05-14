import { Stack } from "expo-router"

export const screenOptions = {
  href: null
}
export default function PostquestionLayout() {
  return (
    <Stack
      screenOptions={{
        title: "질문하기",
        headerShown: true,
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold'
        }
      }}
    />
  )
}