import React, { useEffect, useState } from "react";
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
import Sidebar from "../../layouts/Sidebar.jsx";

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
            <Sidebar
                username={username}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* Main Content */}
            <div className="flex-1 p-10">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-800">Statistics</h1>
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
