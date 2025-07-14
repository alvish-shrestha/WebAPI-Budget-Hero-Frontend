import { useEffect, useState } from "react";
import {
  Calendar,
  BarChart3,
  MoreHorizontal,
  Plus,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  format,
  parseISO,
  isToday,
  startOfMonth,
  endOfMonth,
  subMonths,
  addMonths,
  isWithinInterval,
} from "date-fns";
import { useGetTransaction } from "../../hooks/useTransactionUser.js";
import TransactionModal from "../../modal/TransactionModal.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { LogoutModal } from "../../modal/LogoutModal.jsx";

export default function DashboardForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { data, isSuccess } = useGetTransaction();
  const transactions = data?.data || [];

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const filteredTransactions = transactions.filter((txn) => {
    const txnDate = parseISO(txn.date);
    return isWithinInterval(txnDate, { start: monthStart, end: monthEnd });
  });

  const incomeTotal = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenseTotal = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

  const netTotal = incomeTotal - expenseTotal;

  const iconMap = {
    Salary: "💼",
    Freelance: "🧑‍💻",
    Investment: "📈",
    Gift: "🎁",
    Other: "📦",
    Food: "🍽️",
    Transport: "🚗",
    Shopping: "🛍️",
    Utilities: "💡",
    Health: "💊",
    Entertainment: "🎬",
  };

  const groupByDate = (transactions) => {
    const sorted = [...transactions].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return sorted.reduce((acc, txn) => {
      const date = format(parseISO(txn.date), "yyyy-MM-dd");
      if (!acc[date]) acc[date] = [];
      acc[date].push(txn);
      return acc;
    }, {});
  };

  const groupedTransactions = groupByDate(filteredTransactions);

  const sidebarItems = [
    { icon: Calendar, label: "Transactions", route: "/dashboard" },
    { icon: BarChart3, label: "Stats", route: "/stats" },
    { icon: MoreHorizontal, label: "More", route: "/more" },
  ];

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };


  return (
      <div className="min-h-screen bg-gradient-to-tr from-[#fff7f5] to-[#fbe3df] flex font-sans">
        {/* Sidebar */}
        <div
            className={`transition-all duration-300 ${
                isCollapsed ? "w-20" : "w-80"
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

          {/* Sidebar Menu Items */}
          <div className="flex flex-col space-y-4 w-full items-center">
            {sidebarItems.map((item, index) => (
                <button
                    key={index}
                    onClick={() => navigate(item.route)}
                    className={`w-full flex items-center ${
                        isCollapsed ? "justify-center" : "justify-start space-x-3 px-4"
                    } py-3 rounded-2xl transition-all duration-200 ${
                        location.pathname === item.route
                            ? "bg-white text-gray-800 shadow-md"
                            : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                >
                  <item.icon className="w-6 h-6" />
                  {!isCollapsed && (
                      <span className="font-medium">{item.label}</span>
                  )}
                </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">Welcome to Budget Hero</h1>
            <p
                onClick={confirmLogout}
                className="text-red-600 hover:text-red-700 underline cursor-pointer font-semibold text-xl"
            >
              Logout
            </p>
            <LogoutModal
                isOpen={showLogoutModal}
                onConfirm={handleLogout}
                onCancel={cancelLogout}
            />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                label: "Income",
                value: `Rs. ${incomeTotal.toFixed(2)}`,
                color: "text-blue-600",
                icon: "💰",
                bg: "bg-blue-50",
                shadow: "shadow-[0_8px_20px_rgba(59,130,246,0.15)]",
              },
              {
                label: "Expense",
                value: `Rs. ${expenseTotal.toFixed(2)}`,
                color: "text-red-500",
                icon: "💸",
                bg: "bg-red-50",
                shadow: "shadow-[0_8px_20px_rgba(239,68,68,0.15)]",
              },
              {
                label: "Total",
                value: `Rs. ${netTotal.toFixed(2)}`,
                color: "text-gray-800",
                icon: "🧾",
                bg: "bg-gray-100",
                shadow: "shadow-[0_8px_20px_rgba(107,114,128,0.15)]",
              },
            ].map((item, index) => (
                <div
                    key={index}
                    className={`flex items-center space-x-4 p-6 rounded-2xl ${item.bg} ${item.shadow} transition-all duration-300`}
                >
                  <div className="text-4xl">{item.icon}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{item.label}</p>
                    <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                  </div>
                </div>
            ))}
          </div>

          {/* Transaction History with Month Navigation */}
          <div className="rounded-2xl p-6 bg-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
              <div className="flex items-center space-x-4">
                <button
                    onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1 border rounded-lg"
                >
                  ← Prev
                </button>
                <p className="text-gray-700 font-medium">
                  {format(currentMonth, "MMMM yyyy")}
                </p>
                <button
                    onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium px-3 py-1 border rounded-lg"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Animated Transaction List */}
            <AnimatePresence mode="wait">
              <motion.div
                  key={format(currentMonth, "yyyy-MM")}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8 max-h-[500px] overflow-y-auto pr-2"
              >
                {Object.entries(groupedTransactions).map(([date, txns]) => (
                    <div key={date}>
                      <h3 className="text-md font-bold text-gray-600 mb-3">
                        {isToday(parseISO(date))
                            ? "Today"
                            : format(parseISO(date), "MMMM d, yyyy")}
                      </h3>
                      <div className="space-y-3">
                        {txns.map((item, index) => {
                          const icon = iconMap[item.category] || "📦";
                          return (
                              <div
                                  key={index}
                                  onClick={() => {
                                    setEditTransaction(item);
                                    setIsModalOpen(true);
                                  }}
                                  className="cursor-pointer flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                                    {icon}
                                  </div>
                                  <div>
                                    <p
                                        className={`font-semibold ${
                                            item.type === "expense"
                                                ? "text-red-500"
                                                : "text-blue-600"
                                        }`}
                                    >
                                      {item.note}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                      {item.category} | {item.account}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p
                                      className={`font-bold text-lg ${
                                          item.type === "expense"
                                              ? "text-red-500"
                                              : "text-blue-600"
                                      }`}
                                  >
                                    Rs. {Number(item.amount).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                          );
                        })}
                      </div>
                    </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Floating Add Button */}
          <button
              onClick={() => setIsModalOpen(true)}
              className="fixed bottom-8 right-8 w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          >
            <Plus className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
          </button>

          <TransactionModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setEditTransaction(null);
              }}
              onSuccess={() => {}}
              initialData={editTransaction}
          />
        </div>
      </div>
  );
}
