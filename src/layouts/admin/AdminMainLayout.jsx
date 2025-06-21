import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { LogOut, X } from "lucide-react";

export default function AdminMainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const getPageTitle = () => {
    if (location.pathname.includes("feedback")) return "Feedback Management";
    if (location.pathname.includes("system-activity")) return "System Activity Logs";
    return "User Management";
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const closeModal = () => {
    setAnimateOut(true);
  };

  useEffect(() => {
    if (animateOut) {
      const timer = setTimeout(() => {
        setAnimateOut(false);
        setShowModal(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animateOut]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
            {getPageTitle()}
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white shadow rounded-xl p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {(showModal || animateOut) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div
            className={`bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative ${
              animateOut ? "animate-fadeOut" : "animate-fadeIn"
            }`}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
