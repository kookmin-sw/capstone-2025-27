import { useEffect, useState } from "react"
import { useUser } from "./contexts/UserContext"
import { responsiveStyleSheet } from "./responsive"
import { cardColor, primaryColor, secondaryColor } from "./styles"
import { Pressable, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"

type Props = {
  reply: REPLY
  isMyQuestion?: boolean
  selectedId: string
  toggleSelect: (id : string, authorId : string) => void
}
export default function ReplyCard({ reply, isMyQuestion, selectedId, toggleSelect } : Props) {

    const [isMyReply, setIsMyReply] = useState<boolean>(false)
    const { user } = useUser()


  function CheckBox({ reply, selectedId, toggleSelect } : Props) {
      const [selected, setSelected] = useState(false);
      useEffect(() => {
        if (selectedId == reply.id) {
          setSelected((prev) => !prev)
        }
      }, [selectedId])

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

    useEffect(() => {
      if (reply.authorId == user?.id) {
        console.log("reply: ", reply.authorId, "user: ", user.id)
        setIsMyReply(true)
      }
    }, [])
    return (
      <View style={isMyReply ? styles.myCard : styles.card}>
        <View>
          <Text style={styles.title}>{reply.authorId}</Text>
          <Text>{reply.content}</Text>
          <Text style={styles.meta}>
            등록일: {new Date(reply.createdTime).toLocaleDateString()}
          </Text>
        </View>
          {isMyQuestion ?  <CheckBox reply={reply} selectedId={selectedId} toggleSelect={toggleSelect} /> : <View></View>}
      </View>
    )
}

const styles = responsiveStyleSheet({
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
})