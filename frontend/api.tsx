
//STEP:
// startDate : DATE
// endDate : DATE
// dailies: list<DAILY>

// DAILY:
// date : DATE
// todos: list<TODO>

// TODO:
// todo: string
// accomplished : boolean


declare global {
    interface USER {
        email: string,
        username: string,
        password: string,
    }
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

export const defaultUser : USER = {
    email: "",
    username: "",
    password: "",
}
const exTodo1 : TODO = {
    date: new Date(),
    content: "할일 1",
    accomplished: false
}
const exTodo2 : TODO = {
    date: new Date(),
    content: "할일 2",
    accomplished: false
}
const exDaily1 : DAILY = {
    date: new Date(2025, 3, 1),
    todos: [exTodo1, exTodo2, exTodo1, exTodo2, exTodo1],
    id: 1,
    color: "#ababab"
}
const exDaily2 : DAILY = {
    date: new Date(),
    todos: [exTodo1, exTodo1, exTodo2, exTodo1, exTodo2],
    id: 2,
    color: "#ababab"
}
const step1 : STEP = {
    description: "HTML 기초 배우기",
    startPeriod: new Date(),
    endPeriod: new Date(),
    dailies: [exDaily1, exDaily2, exDaily1, exDaily2, exDaily1]
}
const step2 : STEP = {
    description: "JAVASCRIPT 기초 배우기",
    startPeriod: new Date(),
    endPeriod: new Date(),
    dailies: [exDaily1, exDaily1, exDaily2, exDaily1, exDaily2]
}
const roadmap : ROADMAP = {
    steps: [step1, step2, step1],
    id: 1,
    startDate: new Date(),
    endDate: new Date()
}

export function getUserRoadmap(userId : number) : ROADMAP {
    // get user.roadmapId to find roadmap user in on
    return roadmap
}

export function userSignIn(user : USER) : boolean {
    // check user info in database
    return false // success true, fail false
}
export function userSignUp(user : USER) : boolean {
    // create new user with user credentials
    return false // success true, fail false
}

export function toKoreanDate(date : Date) : string {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    })
}