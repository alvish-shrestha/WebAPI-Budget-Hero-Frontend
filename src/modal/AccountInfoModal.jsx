import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AccountInfoForm from "../components/auth/AccountInfoForm.jsx";

export default function AccountInfoModal({ isOpen, onClose }) {
    const backdropRef = useRef(null);

    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) {
            onClose(); // Close modal when clicked outside
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={backdropRef}
                    className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center"
                    onClick={handleBackdropClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* ❌ Close button */}
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            &times;
                        </button>

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Info</h2>
                        <AccountInfoForm onSuccess={onClose} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
