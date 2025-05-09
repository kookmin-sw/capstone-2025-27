import { StyleSheet, View } from "react-native";
import SignIn from "./signIn";
import { bgColor } from "@/components/styles";

export default function App() {
  return (
    <View>
      <SignIn />
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: bgColor
  }
})