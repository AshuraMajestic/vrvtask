import React from "react"
import { ImSpinner6 } from "react-icons/im"

const Spinner = () => {
    return (
        <div className="w-full min-h-screen flex items-center justify-center lg:py-28 py-20">
            <ImSpinner6 className="animate-spin w-10 h-10 text-bluePrimaryColor " />
        </div>
    )
}

export default Spinner
