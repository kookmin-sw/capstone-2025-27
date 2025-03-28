import { View, Text, ScrollView, TextInput, StyleSheet, Button, TouchableOpacity } from "react-native";
import { authStyles, unitSpaceHeight, unitSpaceWidth } from "@/components/styles";

export default function SignIn() {
    return (
    <ScrollView style={{paddingBlockStart: unitSpaceHeight(15)}}>
        <Text style={authStyles.titleText}>로그인</Text>
        <View style={authStyles.inputField}>
            <View>
                <Text style={authStyles.subText}>이메일</Text>
                <TextInput style={authStyles.textInput} placeholder="이메일" />
            </View>
            <View>`
                <Text style={authStyles.subText}>비밀번호</Text>
                <TextInput style={authStyles.textInput} placeholder="비밀번호" />`
            </View>
        </View>
        <TouchableOpacity style={authStyles.button}>
            <Text style={authStyles.buttonText}>로그인</Text>
        </TouchableOpacity>
    </ScrollView>
)}
