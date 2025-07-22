import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm.jsx";

export default function ForgotPasswordModal({ isOpen, onClose }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

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
                        className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()} // prevent clicks inside modal from closing
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Forgot Password</h2>
                            <button onClick={onClose}>
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <ForgotPasswordForm onSuccess={onClose} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
