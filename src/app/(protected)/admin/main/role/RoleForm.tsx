"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateRoleForm = () => {
    const [role, setRole] = useState("");
    const [permissions, setPermissions] = useState({
        read: false,
        edit: false,
        delete: false,
    });
    const router = useRouter();
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "role") setRole(value);
    };

    // Fix: Update the correct permission based on the checkbox id
    const handlePermissionChange = (permission: string, checked: boolean) => {
        setPermissions((prev) => ({
            ...prev,
            [permission]: checked,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        // Validate the role name
        if (!role) {
            setError("Role Name is required");
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_DEPLOYMENT_URL}/api/create-role`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: role, read: permissions.read, edit: permissions.edit, delete: permissions.delete }),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Something went wrong");
            }

            const { role: createdRole } = await res.json();
            console.log("Role created:", createdRole);
            return router.push("/admin/main");
        } catch (error) {
            console.error("Error creating role:", error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error occurred");
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Card className="p-6 w-[400px] shadow-md">
                <h2 className="text-xl font-bold mb-4 text-center">Create Role</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="role" className="block text-sm font-medium">
                            Role Name
                        </Label>
                        <Input
                            id="role"
                            name="role"
                            placeholder="Enter Role Name"
                            value={role}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <Label className="block text-sm font-medium mb-2">Permissions</Label>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="read"
                                    name="read"
                                    checked={permissions.read}
                                    onCheckedChange={(checked) =>
                                        handlePermissionChange("read", checked as boolean)
                                    }
                                />
                                <Label htmlFor="read">Read</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="edit"
                                    name="edit"
                                    checked={permissions.edit}
                                    onCheckedChange={(checked) =>
                                        handlePermissionChange("edit", checked as boolean)
                                    }
                                />
                                <Label htmlFor="edit">Edit</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="delete"
                                    name="delete"
                                    checked={permissions.delete}
                                    onCheckedChange={(checked) =>
                                        handlePermissionChange("delete", checked as boolean)
                                    }
                                />
                                <Label htmlFor="delete">Delete</Label>
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button type="submit" className="w-full">
                        Create Role
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default CreateRoleForm;
