import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GoalForm from "../components/auth/Goal/GoalForm.jsx";

export default function GoalModal({ isOpen, onClose, onSuccess, initialData }) {
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
                    className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        ref={modalRef}
                        className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <GoalForm
                            onClose={onClose}
                            onSuccess={onSuccess}
                            initialData={initialData}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
