import { useUser } from "@/components/contexts/UserContext";
import { responsiveStyleSheet } from "@/components/responsive";
import { bgColor, primaryColor } from "@/components/styles";
import { TransactionCard } from "@/components/TransactionCard";
import UserQandACard from "@/components/UserQandACard";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";

export default function MyPage() {

  const { user, saveUser } = useUser()

  function signOut() {
    saveUser(null)
    router.push("/signIn")
  }

  if (!user) return null;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <TransactionCard />

      <UserQandACard />


      <Pressable onPress={signOut} style={styles.selectButton}>
        <Text style={styles.selectButtonText}>로그아웃</Text>
      </Pressable>
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
    selectButton: {
      marginTop: 50,
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
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
});