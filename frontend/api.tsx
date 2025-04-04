
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
        todos: Array<TODO>
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
    content: "todo example 1",
    accomplished: false
}
const exDaily1 : DAILY = {
    date: new Date(),
    todos: [exTodo1, exTodo1, exTodo1, exTodo1, exTodo1]
}
const step1 : STEP = {
    description: "Learn HTML basics",
    startPeriod: new Date(),
    endPeriod: new Date(),
    dailies: [exDaily1, exDaily1, exDaily1, exDaily1, exDaily1]
}
const roadmap : ROADMAP = {
    steps: [step1, step1, step1],
    id: 1,
    startDate: new Date(),
    endDate: new Date()
}

export function getUserRoadmap(user : USER) : ROADMAP {
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
