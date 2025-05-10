import { createContext, useContext, useState } from "react"

interface UserContextValue {
    user : USER | null,
    saveUser : (user : USER | null) => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export function UserProvider({ children } : any) {
    const [user, saveUser] = useState<USER | null>(null)
    return (
        <UserContext.Provider value={{user, saveUser}}>
            { children }
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}