import React from "react";
import { NavLink } from "react-router-dom";
import { Users, MessageCircle, Activity, Home } from "lucide-react";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-4 rounded-xl shadow-md transition-all duration-200 font-medium 
     ${isActive
      ? "bg-red-500 text-white"
      : "bg-white text-gray-700 hover:bg-red-100 hover:text-red-600"
    }`;

  return (
    <aside className="w-72 min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-tight">Budget Hero</h1>
        <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
      </div>

      <nav className="flex flex-col gap-6 w-full">
        <NavLink to="/admin" end className={linkClass}>
          <Home className="w-6 h-6" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users className="w-6 h-6" />
          <span>User Management</span>
        </NavLink>

        <NavLink to="/admin/feedback" className={linkClass}>
          <MessageCircle className="w-6 h-6" />
          <span>Feedback</span>
        </NavLink>

        <NavLink to="/admin/system-activity" className={linkClass}>
          <Activity className="w-6 h-6" />
          <span>System Activity</span>
        </NavLink>
      </nav>
    </aside>
  );
}
