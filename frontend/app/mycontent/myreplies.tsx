import { getUserQuestions } from "@/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function MyAnswers() {
    const { userId } = useLocalSearchParams()
    const [userQuestions, setUserQuestions] = useState<Array<QUESTION>>();

    useEffect(() => {
        if (typeof userId !== "string") return;
        const fetchData = async () => {
            const questions = await getUserQuestions(userId)
            setUserQuestions(questions)
        }
        fetchData()
    }, [])
    
    return (
        <View>
            <Text>My Answers</Text>
        </View>
    )
}