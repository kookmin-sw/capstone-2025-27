import { buyPoints, getUser } from "@/api";
import { useUser } from "@/components/contexts/UserContext";
import Popup from "@/components/Popup";
import { responsiveStyleSheet } from "@/components/responsive";
import { bgColor, cardColor, primaryColor } from "@/components/styles";
import UserQandACard from "@/components/UserQandACard";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function MyPage() {

  const { user, saveUser } = useUser()

  function signOut() {
    saveUser(null)
    router.push("/signIn")
  }

  async function getData() {
      const u = await getUser()
      const saveU = {
        id: u.username,
        email: u.email,
        username: u.username,
        points: u.points,
        password: "",
      }
      saveUser(null)
      saveUser(saveU)
  }
  useFocusEffect(
    useCallback(() => {
      getData()
    }, [])
  )

  function TransactionCard() {
  
    const { user } = useUser()
  
    function toPurchase() {
      router.push("/(mycontent)/purchase")
    }
    function toSell() {
      router.push("/(mycontent)/sell")
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
            onPress={toPurchase}
          >
            <Text style={styles.buttonText}>포인트 구매</Text>
          </Pressable>
  
          <Pressable
            style={styles.button}
            onPress={toSell}
          >
            <Text style={styles.buttonText}>포인트 판매</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  if(!user) {
    return (
      <View>
        <Text>마이페이지를 사용하기 위해 로그인 해주세요</Text>
        <Pressable onPress={signOut} style={styles.selectButton}>
          <Text style={styles.selectButtonText}>로그인하러 가기</Text>
        </Pressable>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
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
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 12,
      },
      purchaseInput: {
        margin: 20,
        backgroundColor: bgColor,
        fontSize: 15,

      }
});
