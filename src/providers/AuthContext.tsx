"use client"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "../utils/firebase"
import { doc, getDoc } from "firebase/firestore"
import { User } from "@/utils/types"

interface AuthContextType {
    user: User | null
    userID: string | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const [user, setUser] = useState<User | null>(null)
    const [userID, setUserId] = useState<string | null>(null) // New userId state
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {

                setUserId(user.uid) // Store the user ID

                const userDoc = await getDoc(doc(db, "users", user.uid))
                setUser(userDoc.data() as User)
            } else {
                setUser(null)
                setUserId(null) // Clear user ID if no user
                router.push("/login")
                console.log("No user")
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [router])

    return (
        <AuthContext.Provider value={{ user, userID, loading }}>
            {" "}
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
