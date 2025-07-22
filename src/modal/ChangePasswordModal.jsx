import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ChangePasswordForm from "../components/auth/ChangePasswordForm.jsx";

export default function ChangePasswordModal({ isOpen, onClose }) {
    const modalRef = useRef();

    // ✅ ESC key closes modal
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // ✅ Click outside modal closes it
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose?.();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        ref={modalRef}
                        className="relative bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Close icon top right */}
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Change Password
                        </h2>

                        {/* ✅ Separated Form Component */}
                        <ChangePasswordForm onClose={onClose} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
