import React, { useState, useEffect } from "react";

export default function UserForm({ initialData, onClose, onSubmit, isLoading }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.username || "",
                email: initialData.email || "",
                password: "",
                role: initialData.role || "user",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const isEdit = Boolean(initialData);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
                {isEdit ? "Edit User" : "Create New User"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full px-3 py-2 border rounded"
                />
                {!isEdit && (
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                )}
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <div className="flex gap-4 pt-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    {isEdit ? (isLoading ? "Updating..." : "Update") : (isLoading ? "Creating..." : "Create")}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
