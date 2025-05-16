import { getUserQuestions } from "@/api";
import { useUser } from "@/components/contexts/UserContext";
import QuestionCard from "@/components/QuestionCard";
import { responsiveStyleSheet } from "@/components/responsive";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

export default function MyQuestions() {

  const { user } = useUser()

  const [questions, setQuestions] = useState<Array<QUESTION>>()

  async function getData() {
    if (user == undefined) return
    const qs = await getUserQuestions(user.username)
    setQuestions(qs)
  }
  useEffect(() => {
    // user questions들을 답변 완료와 답변 완료 아닌 것들로 나누면 좋을 거 같은데..
    // 여기서 for loop 돌려서 하면 되긴 하는데 api로 나누어 받는것이 빠르지 않을까?
    // getUserQuestionsChosen(), getUserQuestionsNotChosen()
    getData()
  }, [])

  return (
    <GestureHandlerRootView>
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuestionCard
              question={item}
              onPress={() => router.push(`/question/${item.id}`)}
            />
        )}
        contentContainerStyle={styles.container}
        /> 
    </GestureHandlerRootView>
  )
}

const styles = responsiveStyleSheet({
  container: {
    padding: 16,
    paddingBottom: 80
  }
})