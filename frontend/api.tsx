
import axios from "axios"
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'
import * as WebBrowser from 'expo-web-browser'

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
        selectedAnswerAuthorId: string | null,
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
  'ALL', '법률', '가정', '의견',
  '현장', '육아', '응급처지', '추천', '진로', '지식'
]

export async function buyPoints(amount : number, email : string, name : string, phoneNumber: string) {
  var a : number | null = amount
  if (a == 0) a = null
  const token = await SecureStore.getItemAsync("token");
  const url = `https://capstone-2025-27-cashqna-payment-git-master-samjjng01s-projects.vercel.app/payment?amount=${a}&email=${email}&name${name}&phone=${phoneNumber}&token=${token}`
  WebBrowser.openBrowserAsync(url);
}
export async function sellPoints(amount : number) {
  try {
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.post(`${BASE_URL}/point/withdraw`,
      {
        amount: amount
      }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(`sellPoints status:`, response.headers)
    if (response.status === 401) return false
    return true;
  } catch (error) {
      console.log(`Error : sellPoints`, error)
  }
  return false
}

export async function uploadQuestion(question: QUESTION, user: USER) {
  const uploadData = {
    title: question.title,
    category: question.category,
    content: question.content,
    reward: question.reward,
    deadline: dayjs(question.deadline).format('YYYY-MM-DDTHH:mm:ss')
  }
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
export async function setChosenReply(questionId: string, replyId: string) {
  const response = await set(`questions/answers/reward`, "setChosenReply", {
    questionId: questionId,
    replyId: replyId
  })
  return response
}

async function set(URL: string, name: string, body: object) {
  try {
    console.log(URL, body)
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
  const data = await get(`questions/${questionId}/replies`, "getQuestionReplies")
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
    if (category == "ALL") category = ""
    const token = await SecureStore.getItemAsync("token");
    const response = await axios.get(`${BASE_URL}/questions/search`, {
      params: {
        category: category,
        keyword: encodeURIComponent(query) 
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(`getQuestionsByQueryCategory status: `, response.status)
    if (response.status === 401) return null
    console.log(response.data)
    return response.data;
  } catch (error) {
      console.log(`Error from getQuestionByQueryCategory: `, error)
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
