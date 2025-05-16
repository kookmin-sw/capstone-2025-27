import { View, Text, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import { authStyles, unitPixel } from "@/components/styles";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { userSignUp, exUser } from "../api"
import AppIcon from "@/components/AppIcon";

export default function SignUp() {

  const [user, setUser] = useState<USER>(exUser);
  const router = useRouter()

  const login = async () : Promise<boolean> => {
    const res = await userSignUp(user)
    if (res) {
      router.push("/signIn")
    } else {
      console.log("Unable to create user")
    }
    return res;
  }

  return (
  <ScrollView style={{paddingBlockStart: unitPixel(30)}}>
    <Text style={authStyles.titleText}>회원가입</Text>
    <AppIcon />
    <View style={authStyles.inputField}>
      <View>
        <Text style={authStyles.subText}>아이디</Text>
        <TextInput 
        style={authStyles.textInput} 
        placeholder="아이디" 
        value={user.username} 
        onChangeText={(username) => {setUser({...user, username: username})}}
        autoCorrect={false}
        autoCapitalize="none"
          />
      </View>
      <View>
        <Text style={authStyles.subText}>이메일</Text>
        <TextInput
        style={authStyles.textInput} 
        placeholder="이메일" value={user.email} 
        onChangeText={(mail) => setUser({...user, email:mail})}
        keyboardType="email-address"
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
          <Text style={authStyles.buttonText}>회원가입</Text>
        </TouchableOpacity>
        <Link href={"/signIn"} asChild>
          <TouchableOpacity>
            <Text style={authStyles.goto}>로그인 하러 가기</Text>
          </TouchableOpacity>
        </Link>
      </View>
  </ScrollView>
)}
