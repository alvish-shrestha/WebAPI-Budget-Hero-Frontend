import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

// Emoji map
const emojiMap = {
    travel: "✈️",
    trip: "🌍",
    fitness: "💪",
    home: "🏠",
    car: "🚗",
    education: "📚",
    wedding: "💍",
    savings: "💰",
    emergency: "🚨",
    vacation: "🏖️",
    default: "🎯",
};

export default function GoalCard({ goal, onEdit, onDelete, onContribute }) {
    const { title, targetAmount, currentAmount = 0, deadline } = goal;

    const percentage = Math.min(
        Math.round((currentAmount / targetAmount) * 100),
        100
    );

    const hasReached100 = percentage === 100;
    const confettiLaunchedRef = useRef(false);

    // Launch confetti only once
    useEffect(() => {
        if (hasReached100 && !confettiLaunchedRef.current) {
            confettiLaunchedRef.current = true;
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.5 },
            });
        }
    }, [hasReached100]);

    // Get emoji based on title
    const lowerTitle = title?.toLowerCase() || "";
    const emoji =
        Object.keys(emojiMap).find((key) => lowerTitle.includes(key)) || "default";

    // Progress bar color
    let progressColor = "bg-red-500";
    if (percentage >= 80) progressColor = "bg-green-500";
    else if (percentage >= 30) progressColor = "bg-yellow-400";

    // Days remaining calculation
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 flex flex-col justify-between space-y-4 hover:shadow-lg transition"
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{emojiMap[emoji]}</span>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Target: Rs. {targetAmount.toLocaleString()} <br />
                            Saved: Rs. {currentAmount.toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="space-x-2">
                    <button
                        title="Edit Goal"
                        onClick={() => onEdit(goal)}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Edit
                    </button>
                    <button
                        title="Delete Goal"
                        onClick={() => onDelete(goal)}
                        className="text-sm text-red-500 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                        className={`h-3 ${progressColor} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                {hasReached100 && (
                    <div className="text-sm text-green-600 font-semibold mt-2">
                        🎉 Goal Achieved!
                    </div>
                )}
            </div>

            {/* Deadline and Days Remaining */}
            {/* Deadline and Contribute Row */}
            <div className="flex justify-between items-center text-sm text-gray-600">
                <div>
                    Deadline:{" "}
                    <span className="font-medium">
                        {deadlineDate.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                    <br />
                    {daysRemaining >= 0 ? (
                        <span className="text-xs text-gray-500">
                            ⏳ {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} remaining
                        </span>
                    ) : (
                        <span className="text-xs text-red-400">⚠️ Past deadline</span>
                    )}
                </div>

                {/* Contribute Button on the right */}
                <button
                    title="Contribute to Goal"
                    onClick={() => onContribute(goal)}
                    className="text-sm text-green-600 hover:underline font-medium whitespace-nowrap"
                >
                    ➕ Contribute
                </button>
            </div>


        </motion.div>
    );
}