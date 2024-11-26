"use client";
import InputBox from "@/components/InputBox";
import PrimaryButton from "@/components/PrimaryButton";
import { auth, getFirebaseErrorMessage } from "@/utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>(""); // Explicitly typed as string
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false); // Explicitly typed as boolean
    const [error, setError] = useState<string>(""); // Explicitly typed as string

    const sendVerificationEmail = async (): Promise<void> => {
        setError("");
        setIsEmailSent(false);
        try {
            if (email) {
                await sendPasswordResetEmail(auth, email);
                console.log("Verification email sent");
                setIsEmailSent(true);
            }
        } catch (error: unknown) { // Properly typed as unknown
            if (error instanceof Error) {
                console.log(error.message);
                setError(getFirebaseErrorMessage(error.message));
            } else {
                console.error("An unexpected error occurred:", error);
                setError("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="flex flex-col gap-y-8 lg:gap-y-16">
            <h1 className="text-2xl font-semibold text-center">
                Forgot Password?
            </h1>
            {/* email input */}
            <InputBox
                state={email}
                setState={setEmail}
                id="email"
                type="email"
                label="Email"
                placeholder="Enter Email"
            />
            <div className="flex flex-col items-center">
                {error && (
                    <p className="text-red-500 text-center text-md mb-3">
                        {error}
                    </p>
                )}
                {isEmailSent && (
                    <p className="text-bluePrimaryColor text-center text-md mb-3">
                        Email Sent Successfully!
                    </p>
                )}
                {/* send verification email button */}
                <PrimaryButton action={sendVerificationEmail}>
                    Send Verification Email
                </PrimaryButton>
            </div>
        </div>
    );
};

export default ForgotPassword;
