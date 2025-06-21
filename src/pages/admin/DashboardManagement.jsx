import React from "react";
import DashboardStatsCard from "../../components/admin/DashboardTable";
import useDashboardStats from "../../hooks/admin/useAdminDashboardStats";

export default function DashboardManagement() {
  const { stats, loading, error } = useDashboardStats();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Admin Dashboard Overview</h1>

      {loading ? (
        <div className="text-gray-600">Loading stats...</div>
      ) : error ? (
        <div className="text-red-500">Error fetching dashboard stats.</div>
      ) : (
        <DashboardStatsCard stats={stats} />
      )}
    </div>
  );
}
