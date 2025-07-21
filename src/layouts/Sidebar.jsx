import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Calendar, BarChart3, MoreHorizontal, Target } from "lucide-react";

export default function Sidebar({ isCollapsed, setIsCollapsed, username }) {
    const navigate = useNavigate();
    const location = useLocation();

    // // Update username if changed in localStorage
    // useEffect(() => {
    //     const stored = localStorage.getItem("username");
    //     if (stored) setUsername(stored);
    // }, []);

    const sidebarItems = [
        { icon: Calendar, label: "Transactions", route: "/dashboard" },
        { icon: BarChart3, label: "Stats", route: "/stats" },
        { icon: Target, label: "Goal", route: "/goals" },
        { icon: MoreHorizontal, label: "More", route: "/more" },
    ];

    return (
        <div
            className={`transition-all duration-300 ${isCollapsed ? "w-20" : "w-80"
                } bg-gradient-to-b from-red-400 to-red-500 p-4 flex flex-col items-center`}
        >
            <div className="w-full mb-6 flex items-center justify-between">
                {!isCollapsed && (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl py-3 px-4 border border-white/20 text-white font-semibold text-base">
                        Hi, {username}
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-2 transition"
                >
                    <Menu className="w-6 h-6 text-white" />
                </button>
            </div>

            <div className="flex flex-col space-y-4 w-full items-center">
                {sidebarItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => navigate(item.route)}
                        className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-start space-x-3 px-4"
                            } py-3 rounded-2xl transition-all duration-200 ${location.pathname === item.route
                                ? "bg-white text-gray-800 shadow-md"
                                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                            }`}
                    >
                        <item.icon className="w-6 h-6" />
                        {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </button>
                ))}
            </div>
        </div>
    );
}
