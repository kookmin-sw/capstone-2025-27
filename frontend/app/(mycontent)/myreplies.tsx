import { getUserReplyQuestions } from "@/api";
import { useUser } from "@/components/contexts/UserContext";
import QuestionCard from "@/components/QuestionCard";
import { responsiveStyleSheet } from "@/components/responsive";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

export default function MyAnswers() {
  const {user} = useUser()
  const [userReplyQuestions, setUserReplyQuestions] = useState<Array<QUESTION>>();

  useEffect(() => {
    if (typeof user?.id !== "string") return;
    const fetchData = async () => {
      const questions = await getUserReplyQuestions(user?.id)
      setUserReplyQuestions(questions)
    }
    fetchData()
  }, [])
    
  return (
    <GestureHandlerRootView>
      <FlatList
        data={userReplyQuestions}
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