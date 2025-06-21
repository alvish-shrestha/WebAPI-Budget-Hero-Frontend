import React, { useState } from "react";
import { useAdminSystemActivity, useGetOneSystemActivity } from "../../hooks/admin/useAdminSystemActivity";

export default function SystemActivity() {
  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  // Selected activity id for detail modal
  const [selectedId, setSelectedId] = useState(null);

  // Fetch paginated list
  const { data, isLoading, error, isFetching } = useAdminSystemActivity({ page, limit });

  // Fetch detail for selected activity
  const { data: detailData, isLoading: detailLoading } = useGetOneSystemActivity(selectedId);

  const activities = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const closeDetailModal = () => setSelectedId(null);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">System Activity Logs</h1>

      {isLoading ? (
        <p>Loading activities...</p>
      ) : error ? (
        <p className="text-red-600">Failed to load activities</p>
      ) : activities.length === 0 ? (
        <p className="text-center py-4 text-gray-600">No system activity found.</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Timestamp</th>
                <th className="border border-gray-300 px-4 py-2 text-left">User</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr
                  key={activity._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedId(activity._id)}
                >
                  <td className="border border-gray-300 px-4 py-2">{new Date(activity.timestamp).toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{activity.user?.username || "System"}</td>
                  <td className="border border-gray-300 px-4 py-2 capitalize">{activity.action}</td>
                  <td className="border border-gray-300 px-4 py-2">{activity.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1 || isFetching}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages || isFetching}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Detail Modal */}
      {selectedId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={closeDetailModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {detailLoading ? (
              <p>Loading details...</p>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Activity Details</h2>
                <p><strong>Timestamp:</strong> {new Date(detailData?.data?.timestamp).toLocaleString()}</p>
                <p><strong>User:</strong> {detailData?.data?.user?.username || "System"}</p>
                <p><strong>Action:</strong> {detailData?.data?.action}</p>
                <p><strong>Description:</strong> {detailData?.data?.description}</p>
                <p><strong>IP Address:</strong> {detailData?.data?.ipAddress || "N/A"}</p>
                <p><strong>Additional Info:</strong> {detailData?.data?.additionalInfo || "None"}</p>

                <button
                  onClick={closeDetailModal}
                  className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
