"use client"
import React, { useEffect, ReactNode } from "react" // Import React here
import { useAuth } from "./AuthContext"
import { useRouter } from "next/navigation"
import PrimaryButton from "@/components/PrimaryButton"
import { signOut } from "firebase/auth"
import { auth } from "@/utils/firebase"

const AdminRoutes = ({ children }: { children: ReactNode }) => {
    const { loading, user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            return router.push("/login")
        }
    }, [loading, user, router])

    if (loading) {
        return <>Loading...</>
    }

    if (user && !user.isAdmin) {
        return (
            <div className="flex items-center justify-center w-full min-h-screen">
                <div className="flex flex-col justify-center items-center gap-y-10">
                    <h3 className="text-xl font-semibold tracking-wider">
                        You are not an Admin. Please sign in with an Admin
                        Account
                    </h3>
                    <PrimaryButton
                        action={() => {
                            signOut(auth)
                            router.push("/login")
                        }}
                    >
                        Sign In
                    </PrimaryButton>
                </div>
            </div>
        )
    }

    if (user && user.isAdmin) {
        return <>{children}</>
    }
    return null
}

export default AdminRoutes
