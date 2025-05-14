
import axios from "axios"
import * as SecureStore from 'expo-secure-store'

const BASE_URL = "http://192.168.229.119:8080";

declare global {
    interface TODO {
        date: Date,
        content: string,
        accomplished: boolean
    }
    interface DAILY {
        date: Date,
        todos: Array<TODO>,
        id: number,
        color: string
    }
    interface STEP {
        description: string,
        startPeriod: Date,
        endPeriod: Date,
        dailies: Array<DAILY>
    }
    interface ROADMAP {
        steps: Array<STEP>,
        id: number,
        startDate: Date,
        endDate: Date,
    }
}

export async function userSignIn(user : USER) : Promise<USER | null> {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username: user.username,
        password: user.password
      })
      console.log("from userSignIn : ", response.data)
      const token = response.data.token
      await SecureStore.deleteItemAsync("token")
      await SecureStore.setItemAsync("token", token);

      if (response.status === 401) return null
      return exUser;
    } catch (error) {
        console.log("Error while login : ", error)
    }
    return null // success true, fail false
}
export async function userSignUp(user : USER) : Promise<boolean> {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, {
          email: user.email,
          username: user.username,
          password: user.password
        })
        console.log(response.data)
        return true;
    } catch (error) {
        console.log("Error while signUp : ", error)
    }
    return false // success true, fail false
}
// new app

declare global {
    interface USER {
        id: string,
        email: string,
        username: string,
        password: string,
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

export function buyPoints(userId : string, amount : number) {
    console.log("User:",userId, " buying ", amount, "points")
}
export function sellPoints(userId : string, amount : number) {
    console.log("User:", userId, " selling ", amount, "points")
}

export async function uploadQuestion(question: QUESTION, user: USER) {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.post(`${BASE_URL}/questions`, {
      title: question.title,
      content: question.content,
      reward: question.reward,
      deadline: question.deadline,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log("uploadQuestion status:", response.status)
    if (response.status === 401) return false
    return true;
  } catch (error) {
      console.log("Error while login : ", error)
  }
  return false // success true, fail false
}
export function uploadReply(answer: REPLY) {
    console.log("User:", answer.authorId, " answering question:", answer.questionId)
}

export function chooseReply(questionId: string, answerId: string) {
    console.log("Answer:", answerId, " chosend for question:", questionId)
}

export function getUser(userId: string) {
    return exUser
}
export function getQuestions() {
    return exQuestions
}
export function getQuestionById(questionId: string) {
    const q = getQuestions()
    for (var question of q) {
        if (question.id == questionId) return question
    }
}
export function getUserQuestions(userId: string | null) {
  var qs = []
  for(var question of exQuestions) {
    if (question.authorId == userId) {
      qs.push(question)
    }
  }
  return qs
}
export function getUserReplyQuestions(userId: string) {
    return exQuestions
}

export function getQuestionReplies(questionId: string) {
    return exReplies
}

export function getQuestionsByQueryCategory(query: string, category: string) {
  return [exQuestion1, exQuestion2]
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
