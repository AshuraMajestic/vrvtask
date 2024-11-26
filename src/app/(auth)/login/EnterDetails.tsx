"use client";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import InputBox from "@/components/InputBox";
import PasswordInputBox from "@/components/PasswordInputBox";
import { getFirebaseErrorMessage } from "@/utils/firebase";

import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/utils";
import {
    checkIfUserExists,
    loginWithGoogle,
    signInWithEmail,
} from "@/utils/authFunctions";

const EnterDetails = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSigninWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            setLoading(true);

            if (!email) {
                setError("Email is required");
                return;
            }
            if (password.length === 0) {
                setError("Password is required");
                return;
            }

            if (!validateEmail(email)) {
                setError("Please Enter A Valid Email ID");
                return;
            }

            const doesUserExist = await checkIfUserExists(email);
            if (!doesUserExist) {
                setLoading(false);
                setError("User does not exist. Please Signup!");
                return;
            }

            await signInWithEmail(email, password);

            router.push("/");
        } catch (error) {
            const firebaseError = error as { code: string; message: string };
            console.error(firebaseError.code, firebaseError.message);
            setError(() => {
                return getFirebaseErrorMessage(firebaseError.code);
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLoginWithGoogle = async () => {
        try {
            setError("");
            setLoading(true);

            await loginWithGoogle();

            router.push("/");
        } catch (error) {
            const firebaseError = error as { message: string };
            console.error(firebaseError.message);
            setError(firebaseError.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = () => {
        router.push("/forgot-password");
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSigninWithEmail}>
            {/* email input */}
            <InputBox
                label="Email"
                placeholder="Enter Email"
                id="email"
                state={email}
                setState={setEmail}
                type="email"
            />
            {/* password input */}
            <PasswordInputBox state={password} setState={setPassword} />

            {/* continue button */}
            <div>
                {error && (
                    <p className="text-red-500 text-center text-md mt-5 mb-3">
                        {error}
                    </p>
                )}
                <p
                    className="text-sm mb-1 text-[#101827] hover:underline cursor-pointer"
                    onClick={handleForgotPassword}
                >
                    Forgot Password?
                </p>
                <PrimaryButton type="submit" disabled={loading}>
                    CONTINUE
                </PrimaryButton>
            </div>

            {/* log in with google button */}
            <div>
                <p className="text-slate-600 text-sm mb-1">Or Log in with </p>
                <SecondaryButton
                    type="button"
                    icon={<FcGoogle className="w-6 h-6" />}
                    className="mb-1"
                    action={handleLoginWithGoogle}
                    disabled={loading}
                >
                    Log in with Google
                </SecondaryButton>
            </div>
        </form>
    );
};

export default EnterDetails;
