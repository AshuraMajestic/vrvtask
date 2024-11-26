import { NextResponse } from "next/server";
import { Role } from "@/utils/types"; // Ensure Role is imported correctly
import { initAdmin } from "@/utils/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

export async function POST(req: Request) {
  try {
    await initAdmin();
    const db = getFirestore();
    const { name, read, edit, delete: del } = await req.json();

    // Validate the input
    if (!name) {
      throw new Error("Role name is required");
    }
    if (read === undefined || edit === undefined || del === undefined) {
      throw new Error("Permissions (read, edit, delete) are required");
    }

    // Generate a custom ID using uuid
    const id = uuidv4();

    // Create the role object with the generated ID
    const role: Role = {
      id,
      name,
      read,
      edit,
      delete: del,
    };

    // Save the role to the Firestore database with the generated ID
    await db.collection("roles").doc(id).set(role);

    // Return the role along with the generated ID
    return NextResponse.json({
      message: "Role created successfully",
      role,
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
