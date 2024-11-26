"use client";
import React, { useEffect } from "react";
import { useAuth } from "@/providers/AuthContext";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { fetchRoleByName } from "@/utils/dbFunctions";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";



const ProtectedPage: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [authLoading, user, router]);

    if (authLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Spinner />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const handleEditClick = async () => {
        try {
            const fetchRole = await fetchRoleByName(user?.role || "");
            if (fetchRole?.edit) {
                router.push("/edit");
            } else {
                alert("You do not have permission to edit your profile.");
            }
        } catch (error) {
            console.error("Error fetching role:", error);
            alert("Unable to check permissions. Please try again.");
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Failed to log out. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <div className="bg-blue-500 text-white rounded-full h-24 w-24 flex items-center justify-center text-2xl font-bold">
                        {user.name.charAt(0)}
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                    <span
                        className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${user.isAdmin ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                            }`}
                    >
                        {user.role}
                    </span>
                    <span
                        className={`mt-1 px-3 py-1 rounded-full text-sm font-medium ${user.isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                            }`}
                    >
                        {user.isActive ? "Active" : "Inactive"}
                    </span>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                    <button
                        onClick={handleEditClick}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProtectedPage;
