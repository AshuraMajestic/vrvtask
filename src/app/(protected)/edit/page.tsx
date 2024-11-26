"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import InputBox from "@/components/InputBox";
import { fetchRoles } from "@/utils/dbFunctions";
import { useRouter } from "next/navigation";
import InputBoxReadOnly from "@/components/InputBoxReadOnly";
import { useAuth } from "@/providers/AuthContext";

type OptionSelect = {
    value: string;
    label: string;
};

const EditUserForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user, loading: authloading } = useAuth();
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [roleOptions, setRoleOptions] = useState<OptionSelect[]>([]);
    const [selectedRole, setSelectedRole] = useState<OptionSelect | null>(null);

    useEffect(() => {
        if (!user?.id) {
            setError("User ID is missing from search params");
            return;
        }

        // Fetch user data based on the ID
        const fetchUserData = async () => {
            try {
                setName(user.name);
                setEmail(user.email);
                setIsActive(user.isActive);
                setIsAdmin(user.isAdmin);
                setSelectedRole({ value: user.role || "", label: user.role || "" });

            } catch (error) {
                console.error("Error fetching user data:", error);
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("Failed to fetch user details");
                }
            }
        }
        fetchUserData();
    }, [user?.id, user?.name, user?.email, user?.isActive, user?.isAdmin, user?.role]); // Include all user properties you're using


    useEffect(() => {
        const fetchRolesHere = async () => {
            try {
                const rolesDocs = await fetchRoles();
                const fetchedRoles = rolesDocs.map((doc) => ({
                    value: doc.name,
                    label: doc.name,
                }));
                setRoleOptions(fetchedRoles);
                setRoleOptions(roleOptions);
            } catch (error) {
                console.error("Error fetching roles:", error);
                setError("Failed to fetch roles");
            }
        };
        fetchRolesHere();
    }, [roleOptions]);

    const handleUserUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!selectedRole) {
                setError("Please select a role");
                return;
            }

            const updatedUserDoc = {
                name,
                email,
                isActive,
                isAdmin,
                role: selectedRole.value,
            };

            await setDoc(doc(db, `users/${user?.id}`), updatedUserDoc);
            console.log("User updated in Firestore");
            router.push('/')

        } catch (error) {
            console.error("Error updating user:", error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Unknow Error Occured");
            }
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (loading || authloading) {
        return (
            <div className="flex justify-center items-center h-full">
                <CgSpinner className="animate-spin text-white w-8 h-8" />
            </div>
        );
    }

    return (
        <form
            onSubmit={handleUserUpdate}
            className="flex justify-center items-center flex-col gap-y-4 py-4 px-7 max-w-screen  text-black"
        >
            <h2 className="font-semibold text-lg tracking-wider">
                Edit Your Details
            </h2>

            <InputBox
                type="text"
                label="Name"
                placeholder="Enter name"
                state={name}
                setState={setName}
                className="bg-[#374151] text-white"
            />
            <InputBoxReadOnly
                type="email"
                label="Email"
                placeholder="Enter email"
                state={email}
                setState={setEmail}
                className="bg-[#374151] text-white"
            />




            <div className="flex items-center gap-3">
                <label className="text-black/70">Active:</label>
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                />
            </div>



            <div className="flex gap-x-5 w-full justify-center mt-2">

                <button
                    className="border flex items-center gap-x-3 py-2 bg-black justify-center rounded-lg font-medium border-bluePrimaryColor bg-bluePrimaryColor hover:bg-blueSecondaryColor w-1/2 text-white"
                    type="submit"
                    disabled={loading}
                >
                    {!loading && "Update"}
                    {loading && (
                        <CgSpinner className="animate-spin text-black w-6 h-6" />
                    )}
                </button>
            </div>
        </form>
    );
};

export default EditUserForm;
