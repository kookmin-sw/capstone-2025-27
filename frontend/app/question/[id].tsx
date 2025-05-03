import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { getQuestionById, getQuestionReplies } from "@/api";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/components/contexts/UserContext";
import { responsiveStyleSheet } from "@/components/responsive";

export default function QuestionDetailPage() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const [question, setQuestion] = useState<QUESTION>();
    const [replies, setReplies] = useState<Array<REPLY>>();
    const [selectedId, setSelectedId] = useState<string>();

    const { user } = useUser()
    const [isMyQuestion, setIsMyQuestion] = useState<boolean>(false)

    const toggleSelect = (replyId : string) => {
      setSelectedId(replyId);
    };

    useEffect(() => {
        if (typeof id !== "string") return

        const fetchData = async () => {
            const question = getQuestionById(id)
            if(question == undefined) return null

            setQuestion(question)
            navigation.setOptions({ title : question.title })

            const replies = getQuestionReplies(question.id)
            setReplies(replies)

            if (user?.id === question.authorId) {
                setIsMyQuestion(true)
            }
        }
        fetchData();
    }, [id]);

    if (!question) return <Text>Loading...</Text>;

    type RCProps = {
        reply: REPLY
    }
    function ReplyCard({ reply } : RCProps) {
        return (
            <View style={styles.card}>
                <View>
                    <Text style={styles.title}>{reply.authorId}</Text>
                    <Text>{reply.content}</Text>
                    <Text style={styles.meta}>
                        등록일: {new Date(reply.createdTime).toLocaleDateString()}
                    </Text>
                </View>
                {isMyQuestion ?  <CheckBox reply={reply} /> : <View></View>}
            </View>
        )
    }

    function CheckBox({ reply } : RCProps) {
        const [selected, setSelected] = useState(false);
        useEffect(() => {
            if (selectedId == reply.id) {
                setSelected((prev) => !prev)
            }
        }, [selectedId])

        return (
            <Pressable onPress={() => toggleSelect(reply.id)} style={styles.checkboxWrapper}>
                <Ionicons
                name={selected ? 'checkbox' : 'square-outline'}
                size={32} // Slightly larger than default
                color={selected ? '#ff7e36' : '#bbb'}
                />
            </Pressable>
        )
    }

    return (
        <View style={{ padding: 20 }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{question.title}</Text>
                <Text>{question.category}</Text>
                <Text>{question.reward}P</Text>
                <Text>{question.content}</Text>
            </View>
            <View>
                <FlatList
                    data={replies}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ReplyCard reply={item} />
                    )}
                    contentContainerStyle={styles.container}
                />
            </View>
        </View>
    );
}

const styles = responsiveStyleSheet({
    container: {
      paddingTop: 50,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 12,
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
    title: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 6,
    },
    meta: {
      fontSize: 12,
      color: "#999",
    },
    textContainer: {
      flex: 1,
      paddingRight: 12,
    },
    checkboxWrapper: {
      padding: 4,
    },
  });
  