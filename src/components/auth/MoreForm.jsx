import { useEffect, useState } from "react";
import {
    Calendar,
    BarChart3,
    MoreHorizontal,
    Menu,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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
            <div
                className={`transition-all duration-300 ${
                    isCollapsed ? "w-20" : "w-80"
                } bg-gradient-to-b from-red-400 to-red-500 p-4 flex flex-col items-center`}
            >
                {/* Top Row */}
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

                {/* Sidebar Items */}
                <div className="flex flex-col space-y-4 w-full items-center">
                    {sidebarItems.map((item, index) => {
                        const isActive = location.pathname === item.route;

                        return (
                            <button
                                key={index}
                                onClick={() => navigate(item.route)}
                                className={`w-full flex items-center ${
                                    isCollapsed ? "justify-center" : "justify-start space-x-3 px-4"
                                } py-3 rounded-2xl transition-all duration-200 ${
                                    isActive
                                        ? "bg-white text-gray-800 shadow-md"
                                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                                }`}
                            >
                                <item.icon className="w-6 h-6" />
                                {!isCollapsed && <span className="font-medium">{item.label}</span>}
                            </button>
                        );
                    })}
                </div>
            </div>

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
