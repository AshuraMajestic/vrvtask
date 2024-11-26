"use client"
import { cn } from "@/utils/utils"
import React, { useState } from "react"

type Props = {
    icon?: React.ReactNode
    className?: string
    action: () => void
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    children: React.ReactNode
}

const SecondaryButton = ({
    icon,
    className,
    action,
    children,
    ...props
}: Props) => {
    const [isPressed, setIsPressed] = useState(false)

    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)

    return (
        <div className={cn("relative w-80 h-12 cursor-pointer", className)}>
            <button
                onClick={action}
                className={cn(
                    "rounded-xl absolute z-10 bg-white border-2 border-boxBorderColor w-full h-full ",
                    isPressed && "transform translate-y-[6px]",
                )}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                {...props}
            >
                <p className=" flex items-center justify-center h-full">
                    {icon}
                    <span className={cn("", icon && "pl-2")}>{children}</span>
                </p>
            </button>
            <div className="rounded-xl absolute translate-y-[6px] bg-boxBorderColor w-full h-full"></div>
        </div>
    )
}

export default SecondaryButton
