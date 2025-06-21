import React, { useState } from "react";
import {
  useAdminUser,
  useDeleteOneUser,
  useUpdateOneUser,
  useCreateUser,
} from "../../hooks/admin/useAdminUser";
import { toast } from "react-toastify";

export default function UserTable() {
  const { data, isPending, error } = useAdminUser();
  const deleteUser = useDeleteOneUser();
  const updateUser = useUpdateOneUser();
  const createUser = useCreateUser();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "user",
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // NEW: Manage showing/hiding the popup with animation
  const [showPopup, setShowPopup] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "user",
    });
    setEditMode(false);
    setSelectedId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userPayload = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };

    if (editMode) {
      updateUser.mutate(
        {
          id: selectedId,
          data: userPayload,
        },
        {
          onSuccess: () => {
            resetForm();
            closePopup();
          },
        }
      );
    } else {
      createUser.mutate(formData, {
        onSuccess: () => {
          resetForm();
          closePopup();
        },
        onError: () => {
          console.error(error);
          toast.error("Failed to create user");
        },
      });
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      password: "",
      role: user.role || "user",
    });
    setSelectedId(user._id);
    setEditMode(true);
    openPopup();
  };

  const openDeleteModal = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteUser.mutate(deleteUserId, {
      onSuccess: () => {
        toast.success("User deleted");
        setShowDeleteModal(false);
        setDeleteUserId(null);
      },
      onError: () => {
        toast.error("Error deleting user");
      },
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteUserId(null);
  };

  // NEW: Open popup and trigger animation
  const openPopup = () => {
    setShowPopup(true);
    setTimeout(() => setAnimatePopup(true), 10);
  };

  // NEW: Close popup with fadeOut animation
  const closePopup = () => {
    setAnimatePopup(false);
    setTimeout(() => {
      setShowPopup(false);
      resetForm();
      setEditMode(false);
      setSelectedId(null);
    }, 300); // match animation duration
  };

  // NEW: handle Create User button click to open popup for creation
  const handleCreateClick = () => {
    resetForm();
    setEditMode(false);
    openPopup();
  };

  if (isPending) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">Failed to load users</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6">User Management</h1>

      {/* NEW: Create User button to open popup */}
      <button
        onClick={handleCreateClick}
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow"
      >
        Create User
      </button>

      {/* Popup form */}
      {showPopup && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 ${
            animatePopup ? "animate-fadeIn" : "animate-fadeOut"
          }`}
          onClick={closePopup}
        >
          <form
            onSubmit={handleSubmit}
            className={`bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-10 w-full max-w-lg ${
              animatePopup ? "animate-slideFadeIn" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editMode ? "Edit User" : "Create New User"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
                />
              </div>

              {!editMode && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-green-200 focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md shadow"
                disabled={createUser.isLoading || updateUser.isLoading}
              >
                {editMode
                  ? updateUser.isLoading
                    ? "Updating..."
                    : "Update User"
                  : createUser.isLoading
                  ? "Creating..."
                  : "Create User"}
              </button>

              <button
                type="button"
                onClick={closePopup}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-md shadow"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* User Table */}
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
              Username
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
              Email
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
              Role
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((user) => (
            <tr key={user._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4 text-blue-600">{user.email}</td>
              <td className="py-2 px-4 capitalize">{user.role || "user"}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(user._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Delete User?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
