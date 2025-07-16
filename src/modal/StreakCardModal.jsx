import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StreakCard from "../cards/StreakCard"; // adjust path if needed

export default function StreakCardModal({ isOpen, onClose, streakData }) {
    const modalRef = useRef();

    // ESC to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    // Click outside to close
    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose?.();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        ref={modalRef}
                        className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-700">Your Streak</h2>
                            <button onClick={onClose} className="text-gray-500 text-xl">
                                ×
                            </button>
                        </div>
                        <StreakCard streakData={streakData} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
