import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { Role, User } from "./types";

export const fetchUser = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users: {
      id: string;
      email: string;
      name: string;
      isAdmin: boolean;
      role: string;
      isActive: boolean;
    }[] = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        isAdmin: doc.data().isAdmin,
        role: doc.data().role,
        isActive: doc.data().isActive,
      });
    });
    return users;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
};
export const fetchRoles = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "roles"));
    const roles: Role[] = [];
    querySnapshot.forEach((doc) => {
      roles.push({
        id: doc.id,
        name: doc.data().name,
        read: doc.data().read,
        edit: doc.data().edit,
        delete: doc.data().delete,
      });
    });
    return roles;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Failed to fetch roles.");
  }
};

export const fetchRoleByName = async (
  roleName: string
): Promise<Role | null> => {
  try {
    const rolesRef = collection(db, "roles"); // Reference to the roles collection
    const q = query(rolesRef, where("name", "==", roleName)); // Query to match role name
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No role found with name: ${roleName}`);
      return null; // Return null if no matching role is found
    }

    // Assuming role names are unique, take the first result
    const doc = querySnapshot.docs[0];
    const role: Role = {
      id: doc.id,
      name: doc.data().name,
      read: doc.data().read,
      edit: doc.data().edit,
      delete: doc.data().delete,
    };

    return role;
  } catch (error) {
    console.error("Error fetching role by name:", error);
    throw new Error("Failed to fetch role.");
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userRef = doc(db, "users", userId); // Reference to the user document
    const userSnap = await getDoc(userRef); // Fetch the document

    if (userSnap.exists()) {
      // Transform and return the user data
      const data = userSnap.data();
      const user: User = {
        id: userSnap.id, // Add document ID to the user object
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        role: data.role,
        isActive: data.isActive,
      };
      return user;
    } else {
      console.log(`User with ID ${userId} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user.");
  }
};
