"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchUser } from "@/utils/dbFunctions";
import { db } from "@/utils/firebase";
import { User } from "@/utils/types";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Page() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUser();
                setUsers(userData);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        const userToDelete = users.find((user) => user.id === id);

        if (!userToDelete) {
            toast.error("User not found.");
            return;
        }

        if (userToDelete.isAdmin) {
            toast.error("You cannot delete an admin.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(db, "users", id));
            setUsers(users.filter((user) => user.id !== id));
            toast.success("User deleted successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete the user.");
        }
    };

    const handleAddRole = () => {
        router.push("/admin/main/role");
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Users</h1>
                <Button onClick={handleAddRole}>Add New Role</Button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Admin Status</TableHead>
                            <TableHead>Active Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.isAdmin ? "Yes" : "No"}</TableCell>
                                <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push(`/admin/main/edit/${user.id}`)}
                                        className="mr-2"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
