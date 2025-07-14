import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContributeGoal } from "../hooks/useGoalUser";
import { toast } from "react-toastify";

export default function ContributeModal({ isOpen, onClose, goal, onSuccess }) {
    const [amount, setAmount] = useState("");
    const { mutate: contributeGoal } = useContributeGoal();

    const handleContribute = () => {
        const newAmount = parseInt(amount);
        if (!newAmount || newAmount <= 0) return toast.error("Enter valid amount");

        contributeGoal(
            {
                id: goal._id, amount: newAmount
            },
            {
                onSuccess: () => {
                    setAmount("");
                    onClose?.();
                    onSuccess?.();
                },
                onError: () => toast.error("Failed to contribute"),
            }
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            Contribute to "{goal?.title}"
                        </h2>

                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleContribute}
                                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                            >
                                Contribute
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
