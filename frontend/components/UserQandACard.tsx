import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from './contexts/UserContext';


export default function UserQandACard() {
  const router = useRouter();
  const { user } = useUser()

  return (
    <View style={styles.card}>
      <Text style={styles.title}>나의 활동</Text>
      <View style={styles.buttonRow}>
        <Pressable
          style={styles.button}
          onPress={() => router.push(`/mycontent/myquestions?user=${user?.id}`)}
        >
          <Text style={styles.emoji}>📋</Text>
          <Text style={styles.buttonText}>나의 질문 목록</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => router.push(`/mycontent/myreplies?user=${user?.id}`)}
        >
          <Text style={styles.emoji}>💬</Text>
          <Text style={styles.buttonText}>나의 답변 목록</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
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
});
