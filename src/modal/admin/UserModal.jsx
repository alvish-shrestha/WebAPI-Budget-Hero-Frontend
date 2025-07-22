import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserForm from "../../components/admin/Forms/UserForm.jsx";

export default function UserModal({ isOpen, onClose, onSubmit, initialData, isLoading }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
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
                        className="relative bg-white p-6 rounded-lg w-full max-w-xl shadow-xl"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl"
                        >
                            &times;
                        </button>
                        <UserForm
                            initialData={initialData}
                            onClose={onClose}
                            onSubmit={onSubmit}
                            isLoading={isLoading}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
