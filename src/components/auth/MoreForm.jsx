import React, { useEffect, useState } from "react";
import {
    Calendar,
    BarChart3,
    MoreHorizontal,
    Menu,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../layouts/Sidebar.jsx";

export default function MoreForm() {
    const navigate = useNavigate();
    const location = useLocation(); // ⬅️ used to get current route
    const [username, setUsername] = useState("User");
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) setUsername(storedName);
    }, []);

    const sidebarItems = [
        { icon: Calendar, label: "Transactions", route: "/dashboard" },
        { icon: BarChart3, label: "Stats", route: "/stats" },
        { icon: MoreHorizontal, label: "More", route: "/more" },
    ];

    const confirmLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#fff7f5] to-[#fbe3df] flex font-sans">
            {/* Sidebar */}
            <Sidebar
                username={username}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* Main Content */}
            <div className="flex-1 p-10">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Statistics</h1>
                    <button
                        onClick={confirmLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition duration-200"
                    >
                        Logout
                    </button>
                </div>

                {/* Stats Content */}
                <div className="bg-white p-10 rounded-2xl shadow border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">More</h2>
                    <p className="text-gray-500">You can show charts, insights, etc. here.</p>
                </div>
            </div>
        </div>
    );
}
