import { useEffect, useState } from "react";
import {
    Calendar,
    BarChart3,
    MoreHorizontal,
    Menu,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    LineChart,
    Line,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { useGetTransaction } from "../../hooks/useTransactionUser.js";
import { parseISO, format } from "date-fns";

export default function StatsForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("User");
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { data, isSuccess } = useGetTransaction();
    const transactions = data?.data || [];

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

    // ========== Bar Chart Data ========== //
    const monthlySummary = transactions.reduce((acc, txn) => {
        const date = parseISO(txn.date);
        const month = format(date, "MMM yyyy");
        const amount = parseFloat(txn.amount);
        if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
        if (txn.type === "income") acc[month].income += amount;
        if (txn.type === "expense") acc[month].expense += amount;
        return acc;
    }, {});
    const monthlyData = Object.values(monthlySummary);

    // ========== Line Chart Data ========== //
    const expenseTrend = transactions
        .filter((txn) => txn.type === "expense")
        .reduce((acc, txn) => {
            const date = format(parseISO(txn.date), "yyyy-MM-dd");
            const amount = parseFloat(txn.amount);
            const existing = acc.find((e) => e.date === date);
            if (existing) existing.expense += amount;
            else acc.push({ date, expense: amount });
            return acc;
        }, [])
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // ========== Pie Chart Data ========== //
    const categoryData = transactions
        .filter((txn) => txn.type === "expense")
        .reduce((acc, txn) => {
            const category = txn.category || "Other";
            const amount = parseFloat(txn.amount) || 0;
            acc[category] = (acc[category] || 0) + amount;
            return acc;
        }, {});
    const pieChartData = Object.entries(categoryData).map(([name, value]) => ({
        name,
        value,
    }));

    const COLORS = [
        "#4E79A7", // Blue
        "#F28E2B", // Orange
        "#E15759", // Red
        "#76B7B2", // Teal
        "#59A14F", // Green
        "#EDC948", // Yellow
        "#B07AA1", // Purple
        "#FF9DA7", // Pink
        "#9C755F", // Brown
    ];

    return (
        <div className="min-h-screen bg-gradient-to-tr from-[#fff7f5] to-[#fbe3df] flex font-sans">
            {/* Sidebar */}
            <div className={`transition-all duration-300 ${isCollapsed ? "w-20" : "w-80"} bg-gradient-to-b from-red-400 to-red-500 p-4 flex flex-col items-center`}>
                <div className="w-full mb-6 flex items-center justify-between">
                    {!isCollapsed && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl py-3 px-4 border border-white/20 text-white font-semibold text-base">
                            Hi, {username}
                        </div>
                    )}
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-2 transition">
                        <Menu className="w-6 h-6 text-white" />
                    </button>
                </div>
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

                {/* ================== Pie Chart ================== */}
                <div className="bg-white p-6 mb-10 rounded-2xl shadow border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Expenses by Category</h2>
                    {pieChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={150}
                                    label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500">No expense data available.</p>
                    )}
                </div>

                {/* ================== Bar Chart ================== */}
                <div className="bg-white p-6 mb-10 rounded-2xl shadow border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Income vs Expense</h2>
                    {monthlyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="income" fill="#4E79A7" />
                                <Bar dataKey="expense" fill="#E15759" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500">No transaction data available.</p>
                    )}
                </div>

                {/* ================== Line Chart ================== */}
                <div className="bg-white p-6 rounded-2xl shadow border">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Expense Trend Over Time</h2>
                    {expenseTrend.length > 0 ? (
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={expenseTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="expense" stroke="#E15759" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500">No expense data available for trends.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
