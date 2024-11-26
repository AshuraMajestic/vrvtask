import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const checkIfUserExists = async (email: string) => {
  try {
    const res = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );

    if (res.docs.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message); // Use the error message explicitly
    } else {
      console.log("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);

    if (res.user.email) {
      const userExists = await checkIfUserExists(res?.user?.email);

      if (!userExists) {
        throw new Error("User does not exist. Please Signup!");
      }
    }
    return res.user;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message); // Use the error message explicitly
    } else {
      console.log("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message); // Use the error message explicitly
    } else {
      console.log("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message); // Use the error message explicitly
    } else {
      console.log("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
};

export const signUpWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    return res.user;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message); // Use the error message explicitly
    } else {
      console.log("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
};
