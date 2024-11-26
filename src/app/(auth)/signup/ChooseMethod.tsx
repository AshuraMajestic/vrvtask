"use client"
import React from "react"
import SecondaryButton from "@/components/SecondaryButton"
import { FcGoogle } from "react-icons/fc"
import { MdEmail } from "react-icons/md"
import Link from "next/link"

type Props = {
    setCurrStep: React.Dispatch<React.SetStateAction<number>>
    handleSignupWithGoogle: () => void
    loading: boolean
    error: string
}

const ChooseMethod = ({
    setCurrStep,
    handleSignupWithGoogle,
    loading,
    error,
}: Props) => {
    const handleSignupWithEmail = () => {
        setCurrStep(1)
    }

    return (
        <div className="flex flex-col items-center justify-between gap-y-8 lg:gap-y-20">
            {/* header */}
            <div>
                <h1 className="text-2xl font-semibold text-center">Sign up</h1>
                <p className="text-sm text-center mt-2">
                    Choose a signup method
                </p>
            </div>

            <div>
                {/* Google signup button */}
                <SecondaryButton
                    className="mb-6"
                    icon={<FcGoogle className="w-6 h-6" />}
                    action={handleSignupWithGoogle}
                    disabled={loading}
                >
                    Sign up with Google
                </SecondaryButton>

                {/* Email signup button */}
                <SecondaryButton
                    icon={<MdEmail className="w-6 h-6" />}
                    action={handleSignupWithEmail}
                >
                    Sign up with Email
                </SecondaryButton>

                {error && (
                    <p className="text-red-500 text-center text-md mt-5 ">
                        {error}
                    </p>
                )}
            </div>

            {/* login link */}
            <div className=" mt-10 lg:mt-[6px]">
                <p className="text-sm ">
                    Already have an account?{" "}
                    <Link href="/login">
                        <span className="ml-2  text-[#101827] underline hover:underline hover:cursor-pointer">
                            Log in
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ChooseMethod
