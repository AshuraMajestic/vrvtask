import { NextResponse } from "next/server";
import { User } from "@/utils/types";
import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    await initAdmin();
    const db = getFirestore();
    const { name, email, uid } = await req.json();

    if (!email || !uid) {
      throw new Error("Email and uid are required");
    }

    // Create the user object
    const user: User = {
      id: uid,
      name: name || email.split("@")[0],
      email,
      isAdmin: false,
      role: "user",
      isActive: true,
    };

    // Save the user to the Firestore database
    await db.collection("users").doc(uid).set(user);

    return NextResponse.json({
      message: "User created successfully",
      user,
    });
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error creating role in Firestore", error);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
