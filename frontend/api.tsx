
//STEP:
// startDate : DATE
// endDate : DATE
// dailies: list<DAILY>

import axios from "axios"

// DAILY:
// date : DATE
// todos: list<TODO>

// TODO:
// todo: string
// accomplished : boolean


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

export function userSignIn(user : USER) : boolean {
    // try {
    //     fetch("https://auth/login")
    // } catch (error) {
    //     console.log("Error while login : ", error)
    // }
    return true // success true, fail false
}
export async function userSignUp(user : USER) : Promise<boolean> {
    // try {
    //     axios.post('https://auth/signup', {user})
    //     .then(response => console.log(response))
    //     return true;
    // } catch (error) {
    //     console.log("Error while signUp : ", error)
    // }
    return true // success true, fail false
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

export const exUser : USER = {
    id: "12794",
    username: "josh",
    email: "joshuahanlim777@gmail.com",
    password: "11111",
    points: 2000,
}
const exQuestion1 : QUESTION = {
    authorId: "12794",
    title: "my first question",
    category: "IT",
    content: "What is the radius of the Earth?",
    reward: 100,
    createdTime: new Date(2025, 3, 15),
    deadline: new Date(2025, 4, 15),
    id: "24321",
    selectedAnswerId: null,
    autoSelected: false
}
const exQuestion2 : QUESTION = {
    authorId: "12794",
    title: "제발 아무나 도와주세요",
    category: "IT",
    content: "라면 끓일 때 면 먼저 넣나요 가루 먼저 넣나요",
    reward: 100,
    createdTime: new Date(2025, 3, 25),
    deadline: new Date(2025, 4, 25),
    id: "24226",
    selectedAnswerId: null,
    autoSelected: false
}
const exQuestion3 : QUESTION = {
    authorId: "14894",
    title: "정말 AI 못미더워서 물어봅니다",
    category: "IT",
    content: "지구가 평평하다는 얘기는 사실인가요?",
    reward: 300,
    createdTime: new Date(2025, 3, 27),
    deadline: new Date(2025, 4, 20),
    id: "24396",
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
    authorId: "14782",
    questionId: "24321",
    id: "37258",
    content: "probably something like 12345km",
    createdTime: new Date(2025, 3, 19)
}
const exQuestions = [exQuestion1, exQuestion2, exQuestion3]
const exReplies = [exReply1, exReply2]

export function buyPoints(userId : string, amount : number) {
    console.log("User:",userId, " buying ", amount, "points")
}
export function sellPoints(userId : string, amount : number) {
    console.log("User:", userId, " selling ", amount, "points")
}

export function uploadQuestion(question: QUESTION) {
    console.log("User:", question.authorId, " asking with header ", question.title)
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
export function getUserQuestions(userId: string) {
    return exQuestions
}
export function getUserReplyQuestions(userId: string) {
    return exQuestions
}

export function getQuestionReplies(questionId: string) {
    return exReplies
}