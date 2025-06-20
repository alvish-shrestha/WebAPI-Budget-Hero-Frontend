import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminMainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Fixed width) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}