"use client"
import React, { useState } from "react"
import PasswordInputBox from "./PasswordInputBox"
import PrimaryButton from "./PrimaryButton"
import { confirmPasswordReset } from "firebase/auth"
import { auth } from "@/utils/firebase"
import { useRouter } from "next/navigation"
import SecondaryButton from "./SecondaryButton"

type Props = {
    oobCode: string | null
}

const ResetPassword = ({ oobCode }: Props) => {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [isPasswordReset, setIsPasswordReset] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        try {
            setLoading(true)

            if (password !== confirmPassword) {
                setError("Passwords do not match!")
                setLoading(false)
                return
            }

            if (!oobCode) {
                setError("Something went wrong! Please try again.")
                setLoading(false)
                return
            }

            await confirmPasswordReset(auth, oobCode, confirmPassword)
            setIsPasswordReset(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="text-2xl font-semibold text-center">
                Reset Password!
            </h1>
            {isPasswordReset ? (
                <div className="flex flex-col gap-6 ">
                    <h1 className="text-2xl">Reset Successful ! </h1>
                    <SecondaryButton
                        type="button"
                        action={() => {
                            router.push("/login")
                        }}
                    >
                        Log In
                    </SecondaryButton>
                </div>
            ) : (
                <form
                    className="flex flex-col gap-6 gap-y-10"
                    onSubmit={handlePasswordReset}
                >
                    <div className="flex flex-col gap-y-6">
                        <PasswordInputBox
                            state={password}
                            setState={setPassword}
                        />
                        <PasswordInputBox
                            state={confirmPassword}
                            setState={setConfirmPassword}
                            label="Confirm Password"
                            placeholder="Re-enter Password"
                        />
                    </div>
                    <div>
                        {error && (
                            <p className="text-red-500 text-center text-md mb-2">
                                {error}
                            </p>
                        )}
                        <PrimaryButton type="submit" disabled={loading}>
                            CONTINUE
                        </PrimaryButton>
                    </div>
                </form>
            )}
        </>
    )
}

export default ResetPassword
