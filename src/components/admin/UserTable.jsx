import React, { useState } from "react";
import {
  useAdminUser,
  useDeleteOneUser,
  useUpdateOneUser,
  useCreateUser,
} from "../../hooks/admin/useAdminUser";
import { toast } from "react-toastify";
import UserModal from "../../modal/admin/UserModal";
import {DeleteUserModal} from "../../modal/admin/DeleteUserModal.jsx";

export default function UserTable() {
  const { data, isPending, error } = useAdminUser();
  const deleteUser = useDeleteOneUser();
  const updateUser = useUpdateOneUser();
  const createUser = useCreateUser();

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [animateDeleteModal, setAnimateDeleteModal] = useState(false);

  const handleCreateClick = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = (formData) => {
    const payload = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };

    if (isEditMode) {
      updateUser.mutate(
          { id: selectedUser._id, data: payload },
          {
            onSuccess: () => {
              toast.success("User updated successfully");
              closeModal();
            },
            onError: () => toast.error("Failed to update user"),
          }
      );
    } else {
      createUser.mutate(formData, {
        onSuccess: () => {
          toast.success("User created successfully");
          closeModal();
        },
        onError: () => toast.error("Failed to create user"),
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setIsEditMode(false);
  };

  const openDeleteModal = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true);
    setTimeout(() => setAnimateDeleteModal(true), 10);
  };

  const confirmDelete = () => {
    deleteUser.mutate(deleteUserId, {
      onSuccess: () => {
        toast.success("User deleted successfully");
        closeDeleteModal();
      },
      onError: () => toast.error("Error deleting user"),
    });
  };

  const cancelDelete = () => closeDeleteModal();

  const closeDeleteModal = () => {
    setAnimateDeleteModal(false);
    setTimeout(() => {
      setShowDeleteModal(false);
      setDeleteUserId(null);
    }, 300);
  };

  if (isPending) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">Failed to load users</div>;

  return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">User Management</h1>

        <button
            onClick={handleCreateClick}
            className="mb-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow"
        >
          Create User
        </button>

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

        {/* User Modal */}
        <UserModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
            initialData={selectedUser}
            isLoading={createUser.isLoading || updateUser.isLoading}
        />

        {/* Delete confirmation modal */}
        <DeleteUserModal
            isOpen={showDeleteModal}
            onCancel={cancelDelete}
            onConfirm={confirmDelete}
        />
      </div>
  );
}
