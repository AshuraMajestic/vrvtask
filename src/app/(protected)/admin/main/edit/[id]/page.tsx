"use client";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { db } from "@/utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import InputBox from "@/components/InputBox";
import { fetchRoles, getUserById } from "@/utils/dbFunctions";
import { useParams, useRouter } from "next/navigation";
import InputBoxReadOnly from "@/components/InputBoxReadOnly";
import { User } from "@/utils/types";

type OptionSelect = {
    value: string;
    label: string;
};

const EditUserForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [userData, setUserData] = useState<User>();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [roleOptions, setRoleOptions] = useState<OptionSelect[]>([]);
    const [selectedRole, setSelectedRole] = useState<OptionSelect | null>(null);

    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        if (!id) {
            setError("User ID is missing from search params");
            return;
        }

        // Fetch user data based on the ID
        const fetchUserData = async () => {
            try {
                const data = await getUserById(id + "");

                if (data) {
                    setUserData(data);

                    setName(data.name);
                    setEmail(data.email);
                    setIsActive(data.isActive);
                    setIsAdmin(data.isAdmin);
                    setSelectedRole({ value: data.role || "", label: data.role || "" });
                } else {
                    setError("User not found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user details");
            }
        };

        fetchUserData();
    }, [id]);

    useEffect(() => {
        const fetchRolesHere = async () => {
            try {
                const rolesDocs = await fetchRoles();
                const fetchedRoles = rolesDocs.map((doc) => ({
                    value: doc.name,
                    label: doc.name,
                }));
                setRoleOptions(fetchedRoles);
            } catch (error) {
                console.error("Error fetching roles:", error);
                setError("Failed to fetch roles");
            }
        };
        fetchRolesHere();
    }, []);

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

            await setDoc(doc(db, `users/${id}`), updatedUserDoc);
            console.log("User updated in Firestore");
            router.push('/admin')

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
            console.error("Error updating user:", error);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!userData) {
        return (
            <div className="flex justify-center items-center h-full">
                <CgSpinner className="animate-spin text-white w-8 h-8" />
            </div>
        );
    }
    const handleClick = () => {
        router.push('/admin')
    }
    return (
        <form
            onSubmit={handleUserUpdate}
            className="flex justify-center items-center flex-col gap-y-4 py-4 px-7 max-w-screen bg-[#0f1629] text-white"
        >
            <h2 className="font-semibold text-lg tracking-wider">
                Edit User Details
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

            <div className="w-full">
                <label className="block text-white mb-2">Role</label>
                <Select
                    options={roleOptions}
                    value={selectedRole}
                    onChange={(selected) => setSelectedRole(selected as OptionSelect)}
                    classNamePrefix="react-select"
                    placeholder="Select role"
                    menuShouldScrollIntoView
                    maxMenuHeight={150}
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: "#2F4050",
                            borderColor: "#425568",
                            borderRadius: "0.75rem",
                            color: "#ffffff", // Ensures white text for selected value
                            minHeight: "3rem",
                            maxWidth: "20rem",
                            height: "auto",
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: "#ffffff", // White text for placeholder
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: "#ffffff", // White text for selected value
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: "#2F4050",
                            color: "#ffffff", // White text inside the dropdown
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected
                                ? "#2F4050"
                                : state.isFocused
                                    ? "#00B2FF"
                                    : "#2F4050",
                            color: "#ffffff", // White text for dropdown options
                        }),
                    }}
                />
            </div>


            <div className="flex items-center gap-3">
                <label className="text-white/70">Active:</label>
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                />
            </div>

            <div className="flex items-center gap-3">
                <label className="text-white/70">Admin:</label>
                <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                />
            </div>

            <div className="flex gap-x-5 w-full mt-2">
                <button
                    type="button"
                    className="border rounded-lg font-medium border-boxBorderColor w-full py-2 hover:bg-boxBorderColor"
                    disabled={loading}
                    onClick={handleClick}
                >
                    Cancel
                </button>
                <button
                    className="border flex items-center gap-x-3 justify-center rounded-lg font-medium border-bluePrimaryColor bg-bluePrimaryColor hover:bg-blueSecondaryColor w-full text-white"
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
