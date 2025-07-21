import React, { useEffect, useState } from "react";
import {
    MessageCircle,
    LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layouts/Sidebar";
import { motion } from "framer-motion";
import moreBgImage from "../../assets/images/more-bg.png";
import FeedbackModal from "../../modal/FeedbackModal";
import AccountInfoModal from "../../modal/AccountInfoModal";
import { LogoutModal } from "../../modal/LogoutModal";

export default function MoreForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("User");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isAccountInfoModalOpen, setIsAccountInfoModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // ✅ for logout confirmation

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) setUsername(storedName);
    }, []);

    return (
        <div className="min-h-screen flex font-sans">
            <Sidebar
                username={username}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* Side Area with Background Image */}
            <div
                className="flex-1 p-8 flex justify-center relative"
                style={{
                    backgroundImage: `url(${moreBgImage})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                {/* Overlay to soften background */}
                <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm z-0" />

                <div className="w-full max-w-3xl relative z-10">
                    {/* Top Section */}
                    <div className="mb-10 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-1">More</h1>
                            <p className="text-gray-500">Settings & personal preferences</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Logged in as</p>
                            <h2 className="text-md font-semibold text-blue-600">{username}</h2>
                        </div>
                    </div>

                    {/* Card with Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-white rounded-2xl shadow border p-6 md:p-8 space-y-6"
                    >
                        {/* ✅ Account Info opens modal */}
                        <button
                            onClick={() => setIsAccountInfoModalOpen(true)}
                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200 w-full text-left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4 4 0 017 17h10a4 4 0 011.879.804M15 11a4 4 0 10-6 0m6 0a4 4 0 11-6 0" />
                            </svg>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Account Info</h3>
                                <p className="text-sm text-gray-500">View or edit your personal details</p>
                            </div>
                        </button>

                        {/* Feedback opens modal */}
                        <button
                            onClick={() => setIsFeedbackModalOpen(true)}
                            className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200 w-full text-left"
                        >
                            <MessageCircle className="w-5 h-5 text-blue-600 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Feedback</h3>
                                <p className="text-sm text-gray-500">Share your thoughts with us</p>
                            </div>
                        </button>

                        {/* Logout opens modal */}
                        <button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="flex items-start gap-4 w-full text-left p-4 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
                        >
                            <LogOut className="w-5 h-5 text-red-500 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Logout</h3>
                                <p className="text-sm text-gray-500">Sign out of your account</p>
                            </div>
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Modals */}
            <FeedbackModal
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
            />

            <AccountInfoModal
                isOpen={isAccountInfoModalOpen}
                onClose={() => setIsAccountInfoModalOpen(false)}
                onUsernameChange={(newName) => {
                    setUsername(newName || "User");
                    localStorage.setItem("username", newName || "User");
                }}
            />

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onCancel={() => setIsLogoutModalOpen(false)}
                onConfirm={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("username");
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
            />
        </div>
    );
}
