import { buyPoints } from "@/api";
import { responsiveStyleSheet } from "@/components/responsive";
import { bgColor, secondaryColor } from "@/components/styles";
import { useState } from "react";
import { Button, Text, View } from "react-native";
import { GestureHandlerRootView, Pressable, TextInput } from "react-native-gesture-handler";

export default function Purchase() {
  const [chosenPoints, setChosenPoints] = useState(0)
  const [inputName, setInputName] = useState("")
  const [inputEmail, setInputEmail] = useState("")
  const [inputPhone, setInputPhone] = useState("")

  function purchasePoints() {
    console.log("puchase", chosenPoints, "points")
    buyPoints(
      chosenPoints,
      inputEmail,
      inputName,
      inputPhone,
    )
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        value={inputName}
        onChangeText={setInputName}
        placeholder="질문 제목을 입력하세요"
      />
      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={[styles.input]}
        value={inputEmail}
        onChangeText={setInputEmail}
        placeholder="질문 내용을 입력하세요"
      />
      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={[styles.input]}
        value={inputPhone}
        onChangeText={setInputPhone}
        placeholder="질문 내용을 입력하세요"
      />
      <Text style={styles.label}>포인트</Text>
      <TextInput
        style={[styles.rewardInput, {marginBottom: 100}]}
        value={chosenPoints.toString()}
        onChangeText={(text) => {
          const num = parseInt(text);
          if (isNaN(num)) {
            setChosenPoints(0)
          } else {
            setChosenPoints(num)
          }
        }}
        placeholder="현상금을 입력하세요"
        keyboardType="numeric"
      />
      <Button color={secondaryColor} title="질문 등록" onPress={purchasePoints} />
      
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
  rewardInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  divider: {
    height: 1,
    backgroundColor: secondaryColor,
    marginVertical: 40
  },
  purchaseInput: {
    margin: 20,
    backgroundColor: bgColor,
    fontSize: 15,
  }
});