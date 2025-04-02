import axios from "axios"

declare global {
    interface USER {
        email: string,
        username: string,
        password: string,
        roadmapId: number,
    }
    interface TODO {
        date: Date,
        todos: Array<string>
    }
    interface STEP {
        description: string,
        startPeriod: Date,
        endPeriod: Date,
        dailyTodos: Array<TODO>
    }
    interface ROADMAP {
        steps: Array<STEP>,
        id: number
    }
}

export const defaultUser : USER = {
    email: "",
    username: "",
    password: "",
    roadmapId: 0,
}

const todo1 : TODO = {
    date: new Date(),
    todos: [
        "what are <header> and <body> tags", 
        "what are <href /> and <stylesheet> tags",
        "try making an html file"
    ]
}
const step1 : STEP = {
    description: "Learn HTML basics",
    startPeriod: new Date(),
    endPeriod: new Date(),
    dailyTodos: [todo1]
}
const roadmap : ROADMAP = {
    steps: [step1],
    id: 1
}

export function getUserRoadmap(user : USER) : ROADMAP {
    // get user.roadmapId to find roadmap user in on
    return roadmap
}

export async function userSignIn(user : USER) : Promise<boolean> {
    try {
        const response = await axios.get(`/login/${user.email}`);
        console.log(response.data);
        return true
    } catch (error) {
        console.log("Error Signing In: ", error);
        return false
    }
}
export async function userSignUp(user : USER) : Promise<boolean> {
    try {
        const response = await axios.post(`/signup/${user}`)
        return true
    } catch (error) {
        console.log("Error Signing Up: ", error)
        return false
    }
}
