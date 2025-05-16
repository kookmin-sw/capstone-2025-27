import { useCallback, useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { getQuestions, getQuestionsByQueryCategory } from "@/api";
import QuestionCard from "../../components/QuestionCard";
import { useFocusEffect, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { secondaryColor } from "@/components/styles";
import { useUser } from "@/components/contexts/UserContext";
import { responsiveStyleSheet } from "@/components/responsive";
import SearchBar from "@/components/SearchBar";

export default function QuestionPage() {
  const [questions, setQuestions] = useState<Array<QUESTION>>([]);
  const router = useRouter();
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const debouncedQuery = useDebounce(query, 300)

  const [loadingData, setLoadingData] = useState<boolean>(true)

  const { user } = useUser()

  const fetchData = async () => {
    const allQuestions = await getQuestions();
    setQuestions(allQuestions);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData().then(() => {
        setLoadingData(false)
      })
    },[])
  )

  useEffect(() => {
    const shouldFetch = (debouncedQuery && debouncedQuery.length > 0) || category !== 'All';

    if (!shouldFetch) return;
    const fetchData = async () => {
      const queryQuestions = await getQuestionsByQueryCategory(query, category)
      setQuestions(queryQuestions);
    }
    fetchData()
  }, [debouncedQuery, category])

  if(loadingData) return (
    <Text style={{textAlign: "center", paddingBlockStart: 200}}>Loading Data...</Text>
  )
  return (
    <View style={styles.wrapper}>
      <SearchBar value={query} onChangeText={setQuery} selectedCategory={category} setSelectedCategory={setCategory} />
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
      <Pressable
        style={styles.fab}
        onPress={() => router.push("/postquestion/postpage")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = responsiveStyleSheet({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: secondaryColor,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
});



function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}