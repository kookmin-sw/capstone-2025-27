import { View, Text, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import { authStyles, unitPixel } from "@/components/styles";
import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { userSignIn, exUser } from "../api"
import { useUser } from "@/components/contexts/UserContext";

export default function SignIn() {

    const [user, setUser] = useState<USER>(exUser);
    const router = useRouter()
    const { saveUser } = useUser();

    const login = async () : Promise<boolean> => {
        console.log(user.email, " --- ", user.password)
        const res = await userSignIn(user)
        if (res) {
            saveUser(user)
            router.push("/(tabs)")
        } else {
            console.log("Incorrect Username or Password")
        }
        router.push("/(tabs)")
        return res;
    }

    return (
    <ScrollView style={{paddingBlockStart: unitPixel(30)}}>
        <Text style={authStyles.titleText}>로그인</Text>
        <View style={authStyles.inputField}>
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
