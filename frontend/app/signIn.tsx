import { View, Text, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import { authStyles, unitSpaceHeight, unitSpaceWidth } from "@/components/styles";
import { useState } from "react";
import { Link } from "expo-router";

export default function SignIn() {

    const [inputEmail, setInputEmail] = useState<string>();
    const [inputPwd, setInputPwd] = useState<string>();

    const login = () => {
        console.log(inputEmail, " --- ", inputPwd)
    }

    return (
    <ScrollView style={{paddingBlockStart: unitSpaceHeight(30)}}>
        <Text style={authStyles.titleText}>로그인</Text>
        <View style={authStyles.inputField}>
            <View>
                <Text style={authStyles.subText}>이메일</Text>
                <TextInput style={authStyles.textInput} placeholder="이메일" value={inputEmail} onChangeText={setInputEmail} />
            </View>
            <View>`
                <Text style={authStyles.subText}>비밀번호</Text>
                <TextInput style={authStyles.textInput} secureTextEntry={true} placeholder="비밀번호" value={inputPwd} onChangeText={setInputPwd} />`
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
