// components/modals/ConfirmUpdateModal.jsx
import { motion, AnimatePresence } from "framer-motion";

export function UpdateTransactionModal({ isOpen, onConfirm, onCancel }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-xl p-6 shadow-xl w-[90%] max-w-sm"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Confirm Update
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to update this transaction?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-[#F55345] hover:bg-red-600"
                            >
                                Yes, Update
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
