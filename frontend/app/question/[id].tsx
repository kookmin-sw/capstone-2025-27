import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, FlatList, StyleSheet, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { getQuestionById, getQuestionReplies } from "@/api";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@/components/contexts/UserContext";
import { responsiveStyleSheet } from "@/components/responsive";
import { bgColor, cardColor, primaryColor, secondaryColor, tertiaryColor } from "@/components/styles";

export default function QuestionDetailPage() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [question, setQuestion] = useState<QUESTION>();
  const [replies, setReplies] = useState<Array<REPLY>>();
  const [selectedId, setSelectedId] = useState<string>();

  const [hasReply, setHasReply] = useState<boolean>(false); //유저가 해당 질문에 답한적 있는지 확인

  const { user } = useUser()
  const [isMyQuestion, setIsMyQuestion] = useState<boolean>(false)

  const [selectedAuthorId, setSelectedAuthorId] = useState('')

  const toggleSelect = (replyId : string, authorId : string) => {
    setSelectedId(replyId);
    setSelectedAuthorId(authorId)
  };

  const chooseReply = (replyId : string) => {
    console.log(replyId);
  }

  useEffect(() => {
    if (typeof id !== "string") return

    const fetchData = async () => {
      const question =  await getQuestionById(id)
      if(question == undefined) return null

      setQuestion(question)
      navigation.setOptions({ title : question.title })

      const replies = await getQuestionReplies(question.id)
      setReplies(replies)

      if (user?.id === question.authorId) {
        setIsMyQuestion(true)
      }
    }
      fetchData();
  }, [id]);

  if (!question) return <Text style={{textAlign: "center", paddingBlockStart: 200}}>Loading...</Text>;

  type RCProps = {
    reply: REPLY
  }
  function ReplyCard({ reply } : RCProps) {
    const [isMyReply, setIsMyReply] = useState<boolean>(false)

    useEffect(() => {
      if (reply.authorId == user?.id) {
        console.log("reply: ", reply.authorId, "user: ", user.id)
        setIsMyReply(true)
        setHasReply(true)
      }
    }, [])

    // 답변 카드
    // 내 답변일때
    return (
      <View style={isMyReply ? styles.myCard : styles.card}>
        <View>
          <Text style={styles.title}>{reply.authorId}</Text>
          <Text>{reply.content}</Text>
          <Text style={styles.meta}>
            등록일: {new Date(reply.createdTime).toLocaleDateString()}
          </Text>
        </View>
          {isMyQuestion ?  <CheckBox reply={reply} /> : <View></View>}
          {isMyReply ? <Pressable style={styles.editCommentButton}>
            <Text style={styles.editCommentText}>수정</Text>
            </Pressable> : <View></View>}
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

    // 체크박스 (답변 선택용)
    return (
      <Pressable onPress={() => toggleSelect(reply.id, reply.authorId)} style={styles.checkboxWrapper}>
        <Ionicons
        name={selected ? 'checkbox' : 'square-outline'}
        size={32}
        color={primaryColor}
        />
      </Pressable>
    )
  }

  // 선택 버튼 (답변 선택용)
  function SelectAnswer() {
    if (selectedId == null || !isMyQuestion) return
    return (
      <Pressable onPress={() => chooseReply(selectedId)} style={styles.selectButton}>
        <Text style={styles.selectButtonText}>{selectedAuthorId}에게 현상금 보상하기</Text>
      </Pressable>
    )
  }

  // 답변 제출용
  function ReplyInput() {
    const [newReplyContent, setNewReplyContent] = useState<string>()

    if (hasReply) return;
    return ( // 아직 답변을 달지 않았다면
      <View>
        <View style={[styles.myCard, {marginTop: 100}]}>
          <TextInput
            value={newReplyContent}
            onChangeText={setNewReplyContent}
            multiline
            placeholder="답변 내용을 입력해주세요"
            />
        </View>
        <Pressable style={styles.selectButton}>
          <Text style={styles.selectButtonText}>답변 달기</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={[styles.questionContainer, {flex: 1}]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View>
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
          <View style={contentStyles.categoryTag}>
            <Text style={contentStyles.categoryText}>{question.category}</Text>
          </View>
          <Text style={contentStyles.reward}>{question.reward}P</Text>
        </View>
          <Text style={contentStyles.title}>{question.title}</Text>



        <Text style={contentStyles.body}>{question.content}</Text>
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
        <ReplyInput />
      <View style={styles.footer}>
        <SelectAnswer />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = responsiveStyleSheet({
  questionContainer: {
    padding: 20,
    flex: 1
  },
  container: {
    paddingTop: 50,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: cardColor,
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
  myCard: {
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
  selectButton: {
    backgroundColor: primaryColor,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  selectButtonText: {
    color: bgColor,
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  editCommentButton: {
    backgroundColor: tertiaryColor,
    padding: 10,
    borderRadius: 4,
  },
  editCommentText: {
    color: bgColor,
  }
});
  

const contentStyles = StyleSheet.create({

  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: secondaryColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: bgColor,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2C3E50',
  },
  reward: {
    fontSize: 20,
    fontWeight: '600',
    color: primaryColor,
    marginBottom: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2C3E50',
    padding: 16,
    backgroundColor: '#F9F7F1',
    borderRadius: 12,
  },
});
