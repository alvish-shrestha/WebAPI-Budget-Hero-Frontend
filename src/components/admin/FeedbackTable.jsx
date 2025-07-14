import React, { useState } from "react";
import {
  useAdminFeedback,
  useCreateFeedback,
  useUpdateFeedback,
  useDeleteFeedback,
} from "../../hooks/admin/useAdminFeedback";
import { toast } from "react-toastify";

export default function FeedbackTable() {
  const { data, isPending, error } = useAdminFeedback();
  const createFeedback = useCreateFeedback();
  const updateFeedback = useUpdateFeedback();
  const deleteFeedback = useDeleteFeedback();

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [animatePopup, setAnimatePopup] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFeedbackId, setDeleteFeedbackId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ subject: "", message: "" });
    setEditMode(false);
    setSelectedId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateFeedback.mutate(
        {
          id: selectedId,
          data: formData,
        },
        {
          onSuccess: () => {
            // toast.success("Feedback updated");
            closePopup();
            resetForm();
          },
        }
      );
    } else {
      createFeedback.mutate(formData, {
        onSuccess: () => {
          closePopup();
          resetForm();
        },
        // onError: () => toast.error("Failed to create feedback"),
      });
    }
  };

  const handleEdit = (feedback) => {
    setFormData({
      subject: feedback.subject,
      message: feedback.message,
    });
    setSelectedId(feedback._id);
    setEditMode(true);
    openPopup();
  };

  const openDeleteModal = (id) => {
    setDeleteFeedbackId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteFeedback.mutate(deleteFeedbackId, {
      onSuccess: () => {
        // toast.success("Feedback deleted");
        setShowDeleteModal(false);
      },
    //   onError: () => toast.error("Error deleting feedback"),
    });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteFeedbackId(null);
  };

  const openPopup = () => {
    setShowPopup(true);
    setTimeout(() => setAnimatePopup(true), 10);
  };

  const closePopup = () => {
    setAnimatePopup(false);
    setTimeout(() => {
      setShowPopup(false);
      resetForm();
    }, 300);
  };

  const handleCreateClick = () => {
    resetForm();
    openPopup();
  };

  if (isPending) return <div>Loading feedback...</div>;
  if (error) return <div className="text-red-500">Failed to load feedback</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Feedback Management</h1>

      <button
        onClick={handleCreateClick}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow"
      >
        Create Feedback
      </button>

      {/* Popup Form */}
      {showPopup && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 ${
            animatePopup ? "animate-fadeIn" : "animate-fadeOut"
          }`}
          onClick={closePopup}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-xl p-6 shadow-md w-full max-w-lg ${
              animatePopup ? "animate-slideFadeIn" : ""
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editMode ? "Edit Feedback" : "Create Feedback"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow"
              >
                {editMode ? "Update" : "Create"}
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

      {/* Feedback Table */}
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Subject</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Message</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">User ID</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((fb) => (
            <tr key={fb._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{fb.subject}</td>
              <td className="py-2 px-4">{fb.message}</td>
              <td className="py-2 px-4">{fb.userId}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => handleEdit(fb)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(fb._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm animate-scaleIn">
            <h3 className="text-lg font-semibold mb-4">
              Confirm delete this feedback?
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