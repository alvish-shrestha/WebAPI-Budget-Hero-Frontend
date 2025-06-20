import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const linkClass = ({ isActive }) =>
        `block px-4 py-2 rounded hover:bg-red-400 ${isActive ? "bg-red-500 text-white" : "text-white"
        }`;

    return (
        <aside className="w-64 bg-red-600 text-white min-h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">Budget Hero</h2>
            <nav className="flex flex-col gap-2">
                <NavLink to="/admin" className={linkClass}>
                    User
                </NavLink>
                <NavLink to="/admin/feedback" className={linkClass}>
                    Feedback
                </NavLink>
                <NavLink to="/admin/system-activity" className={linkClass}>
                    System Activity
                </NavLink>
            </nav>
        </aside>
    );
}
