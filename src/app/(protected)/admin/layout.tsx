"use client"


import Nav, { NavLink } from "@/components/Nav"
import AdminRoutes from "@/providers/AdminRoutes"

import React from "react"
import { Toaster } from "react-hot-toast"

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <AdminRoutes>
            <div className="bg-white min-h-screen w-screen text-black">
                <Nav>
                    <NavLink href="/admin" >Vrc</NavLink>
                </Nav>
                <Toaster />
                {children}

            </div>
        </AdminRoutes >
    )
}

export default Layout
