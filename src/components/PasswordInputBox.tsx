"use client"
import { cn } from "@/utils/utils"
import React, { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

type Props = {
    className?: string
    label?: string
    placeholder?: string
    state: string
    setState: React.Dispatch<React.SetStateAction<string>>
}

const PasswordInputBox = ({
    className,
    state,
    label = "password",
    placeholder = "Enter Password",
    setState,
}: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className={cn("", className)}>
            <label htmlFor="password" className="block text-black/70 mb-2">
                {label}
            </label>

            <div className="relative w-80 h-12">
                <input
                    value={state}
                    onChange={(e) => {
                        setState(e.target.value)
                    }}
                    required
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="bg-white border border-boxBorderColor rounded-xl w-full h-full  px-3 shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
                    placeholder={placeholder}
                />
                <span
                    className=" absolute right-0 top-[25%] items-center pr-3 text-black"
                    onClick={() => {
                        setShowPassword((prev) => !prev)
                    }}
                >
                    {showPassword ? (
                        <FaRegEyeSlash className="w-6 h-6" />
                    ) : (
                        <FaRegEye className="w-6 h-6" />
                    )}
                </span>
            </div>
        </div>
    )
}

export default PasswordInputBox
