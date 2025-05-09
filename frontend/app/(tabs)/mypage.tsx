import { useUser } from "@/components/contexts/UserContext";
import { responsiveStyleSheet } from "@/components/responsive";
import { TransactionCard } from "@/components/TransactionCard";
import UserQandACard from "@/components/UserQandACard";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

export default function MyPage() {

  const { user } = useUser()

  if (!user) return null;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <TransactionCard />

      <UserQandACard />
    </ScrollView>
  )
}

const styles = responsiveStyleSheet({
  container: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#777",
  },
});