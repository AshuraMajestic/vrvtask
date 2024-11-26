"use client";

import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

// Nav component
export default function Nav({ children }: { children: ReactNode }) {
    return (
        <nav className="bg-primary text-primary-foreground flex justify-center px-4 py-4">
            {children}
        </nav>
    );
}

// NavLink component
export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
    return (
        <Link
            {...props}
            className="font-bold text-3xl"
        />
    );
}
