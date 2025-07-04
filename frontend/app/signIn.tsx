import { View, Text, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import { authStyles, unitPixel } from "@/components/styles";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { userSignIn, getUser } from "../api"
import { useUser } from "@/components/contexts/UserContext";
import AppIcon from "@/components/AppIcon";

export default function SignIn() {

  const [user, setUser] = useState<USER>({
    email: "",
    username: "",
    id: "",
    points: 0
  });
  const router = useRouter()
  const { saveUser } = useUser();

  const login = async () => {
    const res = await userSignIn(user)
    if (res != null) {
      const u = await getUser()
      const saveU = {
        id: u.username,
        email: u.email,
        username: u.username,
        points: u.points,
        password: "",
      }
      saveUser(saveU)
      router.push("/(tabs)")
    } else {
      Alert.alert("로그인 실패", "아이디와 비밀번호를 확인해주세요")
    }
  }

  return (
  <ScrollView style={{paddingBlockStart: unitPixel(30)}}>
    <Text style={authStyles.titleText}>로그인</Text>
    <AppIcon />
    <View style={authStyles.inputField}>
      <View>
        <Text style={authStyles.subText}>아이디</Text>
        <TextInput
        style={authStyles.textInput} 
        placeholder="아이디" value={user?.username} 
        onChangeText={(username) => setUser({...user, username: username})}
        autoCapitalize="none"
        autoCorrect={false}
        />
      </View>
      <View>
        <Text style={authStyles.subText}>비밀번호</Text>
        <TextInput 
        style={authStyles.textInput} 
        secureTextEntry={true} 
        placeholder="비밀번호" 
        value={user.password} 
        onChangeText={(pwd) => {setUser({...user, password: pwd})}}
        autoCorrect={false}
        autoCapitalize="none"
          />
      </View>
      </View>
      <View style={{alignItems: "center"}}>
        <TouchableOpacity style={authStyles.button} onPress={login}>
          <Text style={authStyles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <Link href={"/signUp"} asChild>
          <TouchableOpacity>
            <Text style={authStyles.goto}>계정 만들러 가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
  </ScrollView>
)}
