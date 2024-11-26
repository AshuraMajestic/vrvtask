"use client"
import React from "react"
import ChooseMethod from "./ChooseMethod"
import EnterDetails from "./EnterDetails"

const LoginPage = () => {
    const [currStep, setCurrStep] = React.useState(0)

    const stepArr = [
        <ChooseMethod key={0} setCurrStep={setCurrStep} />,
        <EnterDetails key={1} />,
    ]

    return (
        <div className="flex flex-col items-center justify-center w-full h-full lg:gap-y-20">
            {stepArr[currStep]}
        </div>
    )
}

export default LoginPage
