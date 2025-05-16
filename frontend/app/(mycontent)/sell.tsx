import { sellPoints } from "@/api";
import { responsiveStyleSheet } from "@/components/responsive";
import { secondaryColor } from "@/components/styles";
import { useState } from "react";
import { Button } from "react-native";
import { Text } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";

export default function Sell() {
  const [chosenPoints, setChosenPoints] = useState(0)

  async function sPoints() {
    sellPoints(chosenPoints)
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.label}>포인트</Text>
      <TextInput
        style={styles.input}
        value={chosenPoints.toString()}
        onChangeText={(text) => {
          const num = parseInt(text);
          if (isNaN(num)) setChosenPoints(0)
          else setChosenPoints(num)
        }}
        />
        <Button color={secondaryColor} title="포인트 판매" onPress={sPoints} />
    </GestureHandlerRootView>
  )
}
const styles = responsiveStyleSheet({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
})