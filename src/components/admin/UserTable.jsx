import React, { useState } from 'react';
import {
    useAdminUser,
    useDeleteOneUser,
    useUpdateOneUser,
} from '../../hooks/admin/useAdminUser';
import { toast } from 'react-toastify';

export default function AdminUserManagement() {
    const { data, isPending, error } = useAdminUser();
    const deleteUser = useDeleteOneUser();
    const updateUser = useUpdateOneUser();

    const [formData, setFormData] = useState({
        username: '', email: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode) {
            updateUser.mutate(
                { id: selectedId, data: formData },
                {
                    onSuccess: () => {
                        resetForm();
                    },
                }
            );
        }
    };

    const handleEdit = (user) => {
        setFormData({ username: user.username, email: user.email });
        setSelectedId(user._id);
        setEditMode(true);
    };



    const openDeleteModal = (id) => {
        setDeleteUserId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        deleteUser.mutate(deleteUserId, {
            onSuccess: () => {
                setShowDeleteModal(false);
                setDeleteUserId(null);
            },
        });
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteUserId(null);
    };

    const resetForm = () => {
        setFormData({ username: '', email: '' });

        setEditMode(false);
        setSelectedId(null);
    };

    if (isPending) return <div>Loading users...</div>;
    if (error) return <div className="text-red-500">Failed to load users</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-green-700 mb-4">Admin User Management</h1>

            {editMode && (
                <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
                    <div className="mb-2">
                        <label className="block mb-1 text-sm">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="border p-2 rounded w-full"
                        />
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            disabled={updateUser.isLoading}
                        >
                            {updateUser.isLoading ? 'Updating...' : 'User Updated'}
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}


            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-2 px-4 text-left">Username</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.map((user) => (
                        <tr key={user._id} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4">{user.username}</td>
                            <td className="py-2 px-4 text-blue-600">{user.email}</td>
                            <td className="py-2 px-4 text-center flex gap-2 justify-center">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => openDeleteModal(user._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
                    onClick={cancelDelete}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-red-600">
                            Confirm Deletion
                        </h3>
                        <p className="mb-4">Are you sure you want to delete this user?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={confirmDelete}
                                disabled={deleteUser.isLoading}
                            >
                                {deleteUser.isLoading ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deleteUser.isError && (
                <div className="text-red-600 mt-2">
                    {deleteUser.error?.message || 'Error deleting user'}
                </div>
            )}
        </div>
    );
}
