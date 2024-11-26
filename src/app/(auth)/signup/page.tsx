"use client";
import React, { Suspense, useState } from "react";
import ChooseMethod from "@/app/(auth)/signup/ChooseMethod";
import EnterDetails from "./EnterDetails";

import { useRouter } from "next/navigation";
import {
    checkIfUserExists,
    signUpWithEmail,
    signUpWithGoogle,
} from "@/utils/authFunctions";
import toast from "react-hot-toast";

const Signup = () => {
    const [currStep, setCurrStep] = useState<number>(0);

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSignupWithGoogle = async () => {
        try {
            setLoading(true);
            setError("");
            // Firebase auth sign up with Google
            const { uid, displayName, email } = await signUpWithGoogle();

            // Check if user already exists
            const doesUserExist = await checkIfUserExists(email!);
            if (doesUserExist) {
                toast("User Already Exists. Please Login!");
                setLoading(false);
                return;
            }

            // Create user
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}/api/create-user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: displayName, email, uid }),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Something went wrong");
            }

            const user = await res.json();
            console.log(user);

            return router.push("/");
        } catch (error) {
            const err = error as { message: string };
            console.log(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignupWithEmail = async (
        name: string,
        email: string,
        password: string
    ) => {
        try {
            // Check if user already exists
            const doesUserExist = await checkIfUserExists(email);
            if (doesUserExist) {
                toast("User Already Exists. Please Login!");
                setLoading(false);
                return;
            }

            // Firebase auth sign up with email and password
            const { uid } = await signUpWithEmail(email, password);

            // Create user
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}/api/create-user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, uid }),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Something went wrong");
            }

            const { user } = await res.json();
            console.log(user);
            return router.push("/");
        } catch (error) {
            const err = error as { message: string };
            console.log(err.message);
            setError(err.message);
            throw new Error(err.message); // Propagate the error
        }
    };

    const stepArr = [
        <ChooseMethod
            key={0}
            setCurrStep={setCurrStep}
            handleSignupWithGoogle={handleSignupWithGoogle}
            loading={loading}
            error={error}
        />,
        <EnterDetails
            key={1}
            handleSignupWithGoogle={handleSignupWithGoogle}
            handleSignupWithEmail={handleSignupWithEmail}
        />,
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full h-full lg:gap-y-20">
            {stepArr[currStep]}
        </div>
    );
};

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Signup />
        </Suspense>
    );
}
