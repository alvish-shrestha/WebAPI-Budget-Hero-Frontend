import React, { useState } from "react";
import {
  useAdminFeedback,
  useUpdateFeedback,
  useDeleteFeedback,
} from "../../hooks/admin/useAdminFeedback";

export default function FeedbackTable() {
  const { data, isPending, error } = useAdminFeedback();
  const updateFeedback = useUpdateFeedback();
  const deleteFeedback = useDeleteFeedback();

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    status: "open",
    priority: "medium",
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
    setFormData({
      subject: "",
      message: "",
      status: "open",
      priority: "medium",
    });
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
            closePopup();
            resetForm();
          },
        }
      );
    }
  };

  const handleEdit = (feedback) => {
    setFormData({
      subject: feedback.subject,
      message: feedback.message,
      status: feedback.status,
      priority: feedback.priority,
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
      onSuccess: () => setShowDeleteModal(false),
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

  if (isPending) return <div>Loading feedback...</div>;
  if (error) return <div className="text-red-500">Failed to load feedback</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Feedback Management</h1>

      {/* Popup Form */}
      {showPopup && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 ${animatePopup ? "animate-fadeIn" : "animate-fadeOut"
            }`}
          onClick={closePopup}
        >
          <form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            className={`bg-white rounded-xl p-6 shadow-md w-full max-w-lg ${animatePopup ? "animate-slideFadeIn" : ""
              }`}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Feedback</h2>

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

              <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md shadow-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md shadow"
              >
                Update
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
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Status</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Priority</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((fb) => (
            <tr key={fb._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{fb.subject}</td>
              <td className="py-2 px-4">{fb.message}</td>
              <td className="py-2 px-4">{fb.userId}</td>
              <td className="py-2 px-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-sm font-medium">
                  {fb.status === "open" && <span className="text-green-600">🟢 Open</span>}
                  {fb.status === "in-progress" && <span className="text-yellow-600">🟡 In Progress</span>}
                  {fb.status === "resolved" && <span className="text-blue-600">🔵 Resolved</span>}
                  {fb.status === "closed" && <span className="text-gray-600">⚫ Closed</span>}
                </span>
              </td>

              <td className="py-2 px-4">
                <span className="inline-flex items-center px-2 py-1 rounded text-sm font-medium">
                  {fb.priority === "low" && <span className="text-green-600">🟢 Low</span>}
                  {fb.priority === "medium" && <span className="text-orange-500">🟠 Medium</span>}
                  {fb.priority === "high" && <span className="text-red-600">🔴 High</span>}
                </span>
              </td>

              <td className="py-2 px-4">
                <div className="flex gap-2">
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
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm animate-scaleIn">
            <h3 className="text-lg font-semibold mb-4">Confirm delete this feedback?</h3>
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
