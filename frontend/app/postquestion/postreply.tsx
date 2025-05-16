import { uploadReply } from "@/api";
import { responsiveStyleSheet } from "@/components/responsive";
import { cardColor, secondaryColor } from "@/components/styles";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function PostReply() {
  const [reply, setReply] = useState("")
  const { questionId } = useLocalSearchParams()

  async function saveReply() {
    const res = uploadReply(reply, String(questionId))
  }
  return (
    <>
      <View style={[styles.myCard, {marginTop: 100}]}>
        <TextInput
          value={reply}
          onChangeText={setReply}
          multiline
          placeholder="답변 내용을 입력해주세요"
          />
      </View>
          <Pressable onPress={saveReply}>
            <Text>답변</Text>
          </Pressable>
    </>
  )
}
const styles = responsiveStyleSheet({
  myCard: {
    margin: 20,
    backgroundColor: cardColor,
    borderRadius: 12,
    borderColor: secondaryColor,
    borderWidth: 2,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

})