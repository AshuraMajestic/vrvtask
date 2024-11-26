"use client"
import PrimaryButton from "@/components/PrimaryButton"
import SecondaryButton from "@/components/SecondaryButton"
import InputBox from "@/components/InputBox"
import PasswordInputBox from "@/components/PasswordInputBox"
import Link from "next/link"
import React, { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { getFirebaseErrorMessage } from "@/utils/firebase"
import { validateEmail, validatePassword } from "@/utils/utils"

type Props = {
    handleSignupWithGoogle: () => void
    handleSignupWithEmail: (
        name: string,
        email: string,
        password: string,
    ) => Promise<void>
}

const EnterDetails = ({
    handleSignupWithGoogle,
    handleSignupWithEmail,
}: Props) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        try {
            setLoading(true)
            if (!name) return setError("Name is required")
            if (!email) return setError("Email is required")
            if (password.length < 8)
                return setError("Password must be at least 8 characters long")
            if (!isChecked)
                return setError("Please Agree to the Terms & Privacy Policy")
            if (!validateEmail(email))
                return setError("Please Enter A Valid Email ID")
            if (!validatePassword(password))
                return setError(
                    "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
                )

            await handleSignupWithEmail(name, email, password)
        } catch (error) {
            const firebaseError = error as { code: string; message: string };
            console.error(firebaseError.code, firebaseError.message);
            setError(() => {
                return getFirebaseErrorMessage(firebaseError.code);
            });
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSignup}>
            <InputBox
                label="Name"
                placeholder="Enter Name"
                id="name"
                type="text"
                state={name}
                setState={setName}
            />
            <InputBox
                label="Email"
                placeholder="Enter Email"
                id="email"
                type="email"
                state={email}
                setState={setEmail}
            />
            <PasswordInputBox state={password} setState={setPassword} />
            {/* checkbox */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded-2xl focus:ring-0 bg-boxBgColor text-boxBgColor"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="terms" className="ml-2 block">
                    I agree to the{" "}
                    <Link href="#" className="text-[#101827] hover:underline">
                        Terms & Privacy Policy
                    </Link>
                </label>
            </div>
            {error && (
                <p className="text-red-500 text-center text-md mt-5 ">
                    {error}
                </p>
            )}
            <PrimaryButton type="submit" disabled={loading}>
                {loading ? (
                    <span className="text-gray-500">loading...</span>
                ) : (
                    "CONTINUE"
                )}
            </PrimaryButton>
            <div>
                <p className="text-slate-600 text-sm mb-1">Or sign up with </p>
                <SecondaryButton
                    type="button"
                    icon={<FcGoogle className="w-6 h-6" />}
                    action={handleSignupWithGoogle}
                    disabled={loading}
                >
                    Sign up with Google
                </SecondaryButton>
            </div>
        </form>
    )
}

export default EnterDetails
