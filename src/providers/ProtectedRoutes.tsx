import { useAuth } from "./AuthContext"
import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"


const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
    const { loading, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [loading, user, router])


    if (loading) {
        return <></>
    }

    // If user is authenticated, render the children (protected content)
    if (user) {
        return <>{children}</>
    }

    return null
}

export default ProtectedRoutes
