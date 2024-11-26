"use client"
import { cn } from "@/utils/utils"
import React, { useState } from "react"

type Props = {
    className?: string
    action?: () => void
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    children: React.ReactNode
}

const PrimaryButton = ({ className, action, children, ...props }: Props) => {
    const [isPressed, setIsPressed] = useState(false)
    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)

    return (
        <div
            className={cn("relative w-80 h-12 cursor-pointer", className)}
            onClick={action}
        >
            <button
                className={cn(
                    "rounded-xl absolute z-10 bg-[#101827] text-white w-full h-full",
                    isPressed && "transform translate-y-[6px]",
                )}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                {...props}
            >
                <p className="font-bold tracking-widest flex items-center justify-center h-full">
                    <span>{children}</span>
                </p>
            </button>
            {/* <div className="rounded-xl absolute translate-y-[6px] bg-black w-full h-full"></div> */}
        </div>
    )
}

export default PrimaryButton
