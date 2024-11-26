import React, { createContext, useContext, useState, ReactNode } from "react"

type PopupContextType = {
    isPopupOpen: boolean
    openPopup: () => void
    closePopup: () => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const openPopup = () => setIsPopupOpen(true)
    const closePopup = () => setIsPopupOpen(false)

    return (
        <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    )
}

export const usePopup = () => {
    const context = useContext(PopupContext)
    if (!context) {
        throw new Error("usePopup must be used within a PopupProvider")
    }
    return context
}
