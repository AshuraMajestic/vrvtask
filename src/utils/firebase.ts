import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const getFirebaseErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "The user account has been disabled.";
    case "auth/user-not-found":
      return "No user found with this email address.";
    case "auth/invalid-credential":
      return "The Email or Password is incorrect. Please try again.";
    case "auth/wrong-password":
      return "The password is incorrect. Please try again.";
    case "auth/email-already-in-use":
      return "The email address is already in use by another account.";
    case "auth/operation-not-allowed":
      return "This operation is not allowed. Please contact support.";
    case "auth/weak-password":
      return "The password is too weak. Please choose a stronger password.";
    case "auth/requires-recent-login":
      return "This operation is sensitive and requires recent authentication. Please log in again.";
    case "auth/invalid-action-code":
      return "The action code is invalid. Please try again.";
    case "auth/expired-action-code":
      return "The action code has expired. Please try again.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many requests. Please wait a while and try again.";
    case "auth/internal-error":
      return "An internal error has occurred. Please try again later.";
    default:
      return "An unknown error has occurred. Please try again.";
  }
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, db, auth, storage, getFirebaseErrorMessage };
