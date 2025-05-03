import { Stack } from 'expo-router';

export const screenOptions = {
  href: null,
};
export default function QuestionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: 'modal',
        animation: 'slide_from_bottom',
        headerTitleStyle: {
          fontSize: 25,
          fontWeight: 'bold'
        }
      }}
    />
  );
}
