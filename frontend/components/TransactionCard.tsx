import { Pressable, StyleSheet, Text, View } from "react-native";
import { useUser } from "./contexts/UserContext";
import { responsiveStyleSheet } from "./responsive";
import { bgColor, cardColor, primaryColor, secondaryColor } from "./styles";
import { useRouter } from "expo-router";

export function TransactionCard() {
  const router = useRouter()

  const { user } = useUser()

  function toPurchasePage() {
    router.push('/(mycontent)/purchase')
  }

  if (user?.id == undefined) {
    return (
      <View>
        <Text>유저 정보를 찾을 수 없음</Text>
      </View>
    )
  }
  return (
    <View style={styles.card}>
      <Text style={styles.title}>나의 포인트</Text>
      <Text style={styles.pointText}>보유 포인트:{user.points}</Text>

      <View style={styles.buttonRow}>
        <Pressable
          style={styles.button}
          onPress={toPurchasePage}
        >
          <Text style={styles.buttonText}>포인트 구매</Text>
        </Pressable>

        <Pressable
          style={styles.button}
        >
          <Text style={styles.buttonText}>포인트 판매</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = responsiveStyleSheet({
  card: {
    backgroundColor: cardColor,
    borderRadius: 12,
    borderColor: primaryColor,
    borderWidth: 1,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  emoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  pointText: {
    fonSize: 30,
    textAlign: 'center',
    marginBottom: 12,
  }
})