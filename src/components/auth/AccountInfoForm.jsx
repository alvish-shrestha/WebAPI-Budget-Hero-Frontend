import React, { useEffect, useState } from "react";
import { useGetUserProfile, useUpdateUserProfile } from "../../hooks/useAccountInfoUser.js";
import { toast } from "react-toastify";

export default function AccountInfoForm({ onSuccess }) {
    const { data, isLoading } = useGetUserProfile();
    const updateUser = useUpdateUserProfile();

    const [formData, setFormData] = useState({ username: "", email: "" });
    const [initialData, setInitialData] = useState({ username: "", email: "" });

    useEffect(() => {
        if (data) {
            const loaded = {
                username: data.username || "",
                email: data.email || "",
            };
            setFormData(loaded);
            setInitialData(loaded); // For reset
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData(initialData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser.mutate(formData, {
            onSuccess: (res) => {
                const updated = res?.data;

                // Update form & localStorage
                setFormData({
                    username: updated?.username || "",
                    email: updated?.email || "",
                });
                localStorage.setItem("username", updated?.username);
                if (onSuccess) onSuccess();
            },
            onError: (err) => {
                toast.error(err?.message || "Update failed ❌");
            },
        });
    };

    if (isLoading || !formData.username) {
        return <div className="text-center py-6">Loading profile...</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm font-medium">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md shadow-sm"
                />
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={updateUser.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
                >
                    {updateUser.isPending ? "Updating..." : "Update Account"}
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    disabled={updateUser.isPending}
                    className="flex-1 border border-gray-400 text-gray-700 hover:bg-gray-100 py-2 rounded-md"
                >
                    Reset
                </button>
            </div>
        </form>
    );
}
