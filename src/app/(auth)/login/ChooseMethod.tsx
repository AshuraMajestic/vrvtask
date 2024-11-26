"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

import SecondaryButton from "@/components/SecondaryButton";
import { useRouter } from "next/navigation";
import { loginWithGoogle } from "@/utils/authFunctions";

type Props = {
    setCurrStep: React.Dispatch<React.SetStateAction<number>>;
};

const ChooseMethod = ({ setCurrStep }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleLoginWithGoogle = async () => {
        try {
            setError("");
            setLoading(true);

            await loginWithGoogle();
            router.push("/");
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
                setError(err.message);
            } else {
                console.error("An unexpected error occurred during Google login.");
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLoginWithEmail = () => {
        setCurrStep(1);
    };

    return (
        <div className="flex flex-col items-center justify-between gap-y-8 lg:gap-y-20">
            {/* Heading */}
            <div>
                <h1 className="text-2xl font-semibold text-center">Log in</h1>
                <p className="text-sm text-center mt-2">Choose a login method</p>
            </div>

            <div>
                {/* Google login button */}
                <SecondaryButton
                    className="mb-6"
                    icon={<FcGoogle className="w-6 h-6" />}
                    action={handleLoginWithGoogle}
                    disabled={loading}
                >
                    Login with Google
                </SecondaryButton>

                {/* Email login button */}
                <SecondaryButton
                    icon={<MdEmail className="w-6 h-6" />}
                    action={handleLoginWithEmail}
                >
                    Log in with Email
                </SecondaryButton>

                {error && (
                    <p className="text-red-500 text-center text-md mt-5">
                        {error}
                    </p>
                )}
            </div>

            {/* Sign up link */}
            <div className="mt-20 lg:mt-[6px]">
                <p className="text-sm">
                    {"Don't"} have an account?{" "}
                    <Link href="/signup">
                        <span className="ml-2 text-[#101827] underline hover:underline hover:cursor-pointer">
                            Sign up
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ChooseMethod;
