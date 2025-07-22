import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";

export default function ResetPasswordModal({ isOpen, token, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-md"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Set New Password</h2>
                            <button onClick={onClose}>
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <ResetPasswordForm token={token} onSuccess={onClose} />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
