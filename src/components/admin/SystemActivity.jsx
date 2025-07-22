import React, { useState } from "react";
import { useAdminSystemActivity, useGetOneSystemActivity } from "../../hooks/admin/useAdminSystemActivity";
import SystemActivityChart from "./SystemActivityChart"; // 📊 Chart component

export default function SystemActivity() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, error, isFetching } = useAdminSystemActivity({ page, limit });
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
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(activity.date).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{activity.user?.username || "System"}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {activity.entriesAdded > 0 && (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-sm mr-2">
                        📝 {activity.entriesAdded} entries
                      </span>
                        )}
                        {activity.goalsCreated > 0 && (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-sm mr-2">
                        🎯 {activity.goalsCreated} goals
                      </span>
                        )}
                        {activity.notificationsSent > 0 && (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-sm">
                        📨 {activity.notificationsSent} notifications
                      </span>
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {activity.entriesAdded > 0 && `📝 ${activity.entriesAdded} entries `}
                        {activity.goalsCreated > 0 && `🎯 ${activity.goalsCreated} goals `}
                        {activity.notificationsSent > 0 && `📨 ${activity.notificationsSent} notifications`}
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>

              {/* 📊 Chart Below Table */}
              {activities.length > 0 && (
                  <SystemActivityChart activityData={activities} />
              )}

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1 || isFetching}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
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
                      <p>
                        <strong>Timestamp:</strong>{" "}
                        {new Date(detailData?.data?.date).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      <p><strong>User:</strong> {detailData?.data?.user?.username || "System"}</p>
                      {detailData?.data?.entriesAdded > 0 && (
                          <p><strong>Action:</strong> 📝 {detailData.data.entriesAdded} entries</p>
                      )}
                      <p>
                        <strong>Description:</strong>{" "}
                        {detailData?.data?.entriesAdded > 0 && `📝 ${detailData.data.entriesAdded} entries`}
                      </p>
                      {detailData?.data?.ipAddress && (
                          <p><strong>IP Address:</strong> {detailData.data.ipAddress}</p>
                      )}
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
