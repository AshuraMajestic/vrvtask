"use client"
import { useSearchParams } from "next/navigation"
import ResetPassword from "@/components/ResetPassword"
import { Suspense } from "react"

const AuthActions = () => {
    const searchParams = useSearchParams()
    const mode = searchParams.get("mode")
    const oobCode = searchParams.get("oobCode")

    return (
        <div className="flex flex-col items-center justify-center w-full h-full lg:gap-y-14 gap-y-10">
            {mode === "resetPassword" && <ResetPassword oobCode={oobCode} />}
        </div>
    )
}

export default function AuthActionsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthActions />
        </Suspense>
    )
}
