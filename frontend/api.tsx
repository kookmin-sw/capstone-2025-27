
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

export function userSignIn(user : USER) : boolean {
    // check user info in database
    return false // success true, fail false
}
export function userSignUp(user : USER) : boolean {
    // create new user with user credentials
    return false // success true, fail false
}
