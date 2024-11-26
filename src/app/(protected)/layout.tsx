"use client"

import { AuthProvider } from "@/providers/AuthContext"
import { PopupProvider } from "@/providers/PopupContext"
import ProtectedRoutes from "@/providers/ProtectedRoutes"

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <AuthProvider>
            <PopupProvider>
                <ProtectedRoutes>{children}</ProtectedRoutes>
            </PopupProvider>
        </AuthProvider>
    )
}
