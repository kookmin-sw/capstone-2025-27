import { Text, View, StyleSheet, Pressable } from "react-native"
import { primaryColor, secondaryColor, tertiaryColor } from "./styles"
import { useUser } from "./contexts/UserContext"
import { useEffect, useState } from "react"
import { responsiveStyleSheet } from "./responsive"

type Props = {
    question : QUESTION
    onPress : () => void
}

export default function QuestionCard({ question, onPress } : Props) {
    const { user } = useUser()
    const [isMyQuestion, setIsMyQuestion] = useState<boolean>(false)

    useEffect(() => {
        if (user?.id === question.authorId) {
            setIsMyQuestion(true)
        }
    }, [])

    return (
        <Pressable onPress={onPress}>
            <View style={isMyQuestion ? styles.mycard : styles.card}>
                <View style={styles.header}>
                    <Text style={styles.category}>{question.category}</Text>
                    <Text style={styles.reward}>{question.reward}P</Text>
                </View>
                <Text style={styles.title}>{question.title}</Text>
                <Text style={styles.meta}>
                    마감일: {new Date(question.deadline).toLocaleDateString()} | 등록일: {new Date(question.createdTime).toLocaleDateString()}
                </Text>
            </View>
        </Pressable>
    )
}

const styles = responsiveStyleSheet({
    card: {
        backgroundColor: primaryColor,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    mycard: {
        backgroundColor: primaryColor,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: tertiaryColor,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    category: {
        fontSize: 12,
        color: "#888",
    },
    reward: {
        fontSize: 12,
        fontWeight: "bold",
        color: secondaryColor,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },
    meta: {
        fontSize: 12,
        color: "#999",
    },
});