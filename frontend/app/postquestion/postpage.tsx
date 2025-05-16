// app/question/new.tsx
import { View, Text, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { responsiveStyleSheet } from "@/components/responsive";
import { secondaryColor } from "@/components/styles";
import { categories, uploadQuestion } from "@/api";
import { useUser } from "@/components/contexts/UserContext";
import DateInput from "@/components/DateInput";
import SelectCategory from "@/components/SelectCategory";

export default function NewQuestionPage() {
  const router = useRouter();
  const { user } = useUser()

  if (user == null) return

  const [question, setQuestion] = useState<QUESTION>({
    id: "",
    authorId: user.id,
    title: "",
    category: "",
    content: "",
    reward: 0,
    createdTime: new Date(),
    deadline: new Date(),
    selectedAnswerId: null,
    autoSelected: false
  })

  function minReward() {
    return 0 // use AI to decide minReward??
  }
  function checktitle() {
    return (question.title !== "")
  }
  function checkcontent() {
    return (question.content !== "")
  }
  function checkcategory() {
    return (question.category !== "")
  }
  function checkreward() {
    return (question.reward > minReward())
  }

  const handleSubmit = async () => {
    console.log("handleSubmit")
    if (checktitle() && checkcontent() && checkcategory() && checkreward()) {
      const res = await uploadQuestion(question, user)
      if (res) router.back();
      else {
        Alert.alert("질문 실패", "질문을 올리지 못했습니다")
      }
    } else {
      Alert.alert("질문 실패", "질문을 올리지 못했습니다")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>카테고리</Text>
      <SelectCategory
        value={question.category}
        onValueChange={(chosen : any) => setQuestion((prev) => ({...prev, category: chosen}))}
        items={[
          { label: categories[0], value: categories[0]},
          { label: categories[1], value: categories[0]},
          { label: categories[2], value: categories[0]},
          { label: categories[3], value: categories[0]},
          { label: categories[4], value: categories[0]},
          { label: categories[5], value: categories[0]},
          { label: categories[6], value: categories[0]},
          { label: categories[7], value: categories[0]},
        ]}
      />
      <View style={styles.divider} />
      <Text style={styles.label}>제목</Text>
      <TextInput
        style={styles.input}
        value={question.title}
        onChangeText={(text) => setQuestion((prev) => ({...prev, title: text}))}
        placeholder="질문 제목을 입력하세요"
      />
      <Text style={styles.label}>내용</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={question.content}
        onChangeText={(text) => setQuestion((prev) => ({...prev, content: text}))}
        placeholder="질문 내용을 입력하세요"
        multiline
      />
      <Text style={styles.label}>보상</Text>
      <TextInput
        style={styles.rewardInput}
        value={question.reward.toString() || ''}
        onChangeText={(text) => {
          const num = parseFloat(text);
          if (isNaN(num)) {
            setQuestion((prev) => ({...prev, reward: (0)}))
          } else {
            setQuestion((prev) => ({...prev, reward: (num)}))
          }
        }}
        placeholder="현상금을 입력하세요"
        keyboardType="numeric"
      />
      <View style={styles.divider} />
      <Text style={styles.label}>답변기한</Text>
      <DateInput date={question.deadline} onChange={(date : any) => setQuestion((prev) => ({...prev, deadline: date}))} />
      <Button color={secondaryColor} title="질문 등록" onPress={handleSubmit} />
    </View>
  );
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
});
