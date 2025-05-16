
import axios from "axios"
import * as SecureStore from 'expo-secure-store'

const BASE_URL = "https://capstone-2025-27-backend.onrender.com";

export async function userSignIn(user : USER) : Promise<USER | null> {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username: user.username,
      password: user.password
    })
    const token = response.data.token
    await SecureStore.deleteItemAsync("token")
    await SecureStore.setItemAsync("token", token);

    if (response.status === 401) return null
    return response.data;
  } catch (error) {
      console.log("Error while login : ", error)
  }
  return null
}
export async function userSignUp(user : USER) : Promise<boolean> {
  try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        email: user.email,
        username: user.username,
        password: user.password
      }, {
        withCredentials: true
      })
      return true;
  } catch (error) {
      console.log("Error while signUp : ", error)
  }
  return false
}
export async function getUser() {
  const data = await get(`user`, "getUser")
  return {
    id: data.userName,
    email: data.userEmail,
    username: data.userName,
    points: data.point
  }
}

declare global {
    interface USER {
        id: string,
        email: string,
        username: string,
        password?: string,
        points: number,
    }
    interface QUESTION {
        id: string,
        authorId: string,
        title: string,
        category: string,
        content: string,
        reward: number,
        createdTime: Date,
        deadline: Date,
        selectedAnswerId: string | null,
        autoSelected: boolean,
    }
    interface REPLY {
        authorId: string,
        questionId: string,
        id: string,
        content: string,
        createdTime: Date,
    }
}

export const categories = [
  '1', '2', '3', '4',
  '5', '6', '7', '8', '9', '10'
]

export async function buyPoints(rsp : any) {
  const token = await SecureStore.getItemAsync("token");

  try {
    await axios.post(
      `${BASE_URL}/point/charge`,
      { impUid: rsp.imp_uid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert('포인트 충전 성공!');
  } catch (err: any) {
    console.error(err);
    alert(
      '결제 실패: 백엔드 처리 중 오류 발생: ' +
        (err.response?.data?.message || '알 수 없는 오류')
    );
  }
}
export function sellPoints(userId : string, amount : number) {
    console.log("User:", userId, " selling ", amount, "points")
}

export async function uploadQuestion(question: QUESTION, user: USER) {
  const uploadData = {
    title: question.title,
    category: question.category,
    content: question.content,
    reward: question.reward,
    deadline: question.deadline.toISOString().slice(0, 19)
  }
  console.log("api", uploadData)
  const response = await set("questions", "uploadQuestions", uploadData)
  return response
}
export async function uploadReply(replyContent: string, questionId: string) {
  const response = await set("replies", "uploadReply", {
    questionId: questionId,
    content: replyContent
  })
  return response
}
export async function chooseReply(questionId: string, replyId: string) {
  const response = await set(`questions/replies/reward`, "chooseReply", {
    questionId: questionId,
    replyId: replyId
  })
  return response
}

async function set(URL: string, name: string, body: object) {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.post(`${BASE_URL}/${URL}`,
      body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(`${name} status:`, response.status)
    if (response.status === 401) return false
    return true;
  } catch (error) {
      console.log(`Error : ${name}`, error)
  }
  return false
}

export async function getQuestions() {
  const data = await get(`questions`, "getQuestions")
  return data
}
export async function getQuestionById(questionId: string) {
  const data = await get(`questions/${questionId}`, "getQuestionById")
  return data
}
export async function getQuestionReplies(questionId: string) {
  const data = await get(`replies/${questionId}`, "getQuestionReplies")
  return data
}
export async function getUserQuestions(userId: string | null) {
  const data = await get(`questions/user`, "getUserQuestions")
  return data
}
export async function getUserReplyQuestions(userId: string) {
  const data = await get(`replies/user`, "getUserReplyQuestions")
}
export async function getQuestionsByQueryCategory(query: string, category: string) {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.get(`${BASE_URL}/questions/search`, {
      params: {
        category: category,
        keyword: query 
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(`${name} status: `, response.status)
    if (response.status === 401) return null
    return response.data;
  } catch (error) {
      console.log(`Error from set: `, error)
  }
  return null
}

async function get(URL: string, name: string) {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.get(`${BASE_URL}/${URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(`${name} status: `, response.status)
    if (response.status === 401) return null
    return response.data;
  } catch (error) {
      console.log(`Error from : ${name}`, error)
  }
  return null
}




































export const exUser : USER = {
  id: "bobthebuilder",
  username: "bobthebuilder",
  email: "joshuahanlim777@gmail.com",
  password: "11111",
  points: 2000,
}
const exQuestion1 : QUESTION = {
  authorId: "steve hawking",
  title: "빠른 답변 부탁드립니다",
  category: "과학",
  content: "What is the radius of the Earth?",
  reward: 5000,
  createdTime: new Date(2025, 3, 15),
  deadline: new Date(2025, 4, 15),
  id: "24321",
  selectedAnswerId: null,
  autoSelected: false
}
const exQuestion2 : QUESTION = {
  authorId: "stephan curry",
  title: "제발 아무나 도와주세요",
  category: "부엌",
  content: "라면 끓일 때 면 먼저 넣나요 가루 먼저 넣나요",
  reward: 10000,
  createdTime: new Date(2025, 3, 25),
  deadline: new Date(2025, 4, 25),
  id: "24226",
  selectedAnswerId: null,
  autoSelected: false
}
const exQuestion3 : QUESTION = {
  authorId: "bobthebuilder",
  title: "정말 AI 못미더워서 물어봅니다",
  category: "과학",
  content: "지구가 평평하다는 얘기는 사실인가요?",
  reward: 300,
  createdTime: new Date(2025, 3, 27),
  deadline: new Date(2025, 4, 22),
  id: "24396",
  selectedAnswerId: null,
  autoSelected: false
}
const exQuestion4 : QUESTION = {
  authorId: "bobthebuilder",
  title: "이건 뭐가 뭔가요",
  category: "IT",
  content: "운영체제는 왜 여러개 있는거죠? 맥북은 운영체제인가요?",
  reward: 5000,
  createdTime: new Date(2025, 4, 1),
  deadline: new Date(2025, 4, 23),
  id: "29873",
  selectedAnswerId: null,
  autoSelected: false
}
const exQuestion5 : QUESTION = {
  authorId: "anotherUser",
  title: "미싱하는데 연기나는건 뭔가요",
  category: "가전",
  content: "지구가 평평하다는 얘기는 사실인가요?",
  reward: 20000,
  createdTime: new Date(2025, 4, 1),
  deadline: new Date(2025, 4, 23),
  id: "28573",
  selectedAnswerId: null,
  autoSelected: false
}
const exQuestion6 : QUESTION = {
  authorId: "anotherUser",
  title: "세탁기 돌릴 때 부서지는 소리",
  category: "가전",
  content: "세탁기가 돌아갈 때 마다 부서지는 소리가 나는데 정상인가요? 어떻게 고치는거죠?",
  reward: 30000,
  createdTime: new Date(2025, 4, 10),
  deadline: new Date(2025, 4, 30),
  id: "24378",
  selectedAnswerId: null,
  autoSelected: false
}
const exReply1 : REPLY = {
  authorId: "13621",
  questionId: "24321",
  id: "315623",
  content: "The radius of Earth is something",
  createdTime: new Date(2025, 3, 18)
}
const exReply2 : REPLY = {
  authorId: "otherguy",
  questionId: "24321",
  id: "37258",
  content: "probably something like 12345km",
  createdTime: new Date(2025, 3, 19)
}
const exQuestions = [exQuestion1, exQuestion2, exQuestion3, exQuestion4, exQuestion5, exQuestion6]
const exReplies = [exReply1, exReply2]
