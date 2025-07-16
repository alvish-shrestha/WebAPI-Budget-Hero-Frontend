import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from "react-toastify";

export default function StreakCard() {
    const [streak, setStreak] = useState(null);

    useEffect(() => {
        const fetchStreak = async () => {
            const res = await axios.get("/api/user/streak", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            const newBadges = res.data.badges || [];
            const storedBadges = JSON.parse(localStorage.getItem("badges")) || [];

            // Compare to check for newly unlocked badges
            const newlyUnlocked = newBadges.filter(b => !storedBadges.includes(b));

            if (newlyUnlocked.length > 0) {
                // Save updated badges
                localStorage.setItem("badges", JSON.stringify(newBadges));

                // Confetti animation
                confetti({
                    particleCount: 120,
                    spread: 80,
                    origin: { y: 0.6 }
                });

                // Toast notification
                newlyUnlocked.forEach(badge => {
                    toast.success(`🎉 New Badge Unlocked: ${badge}!`, {
                        position: "top-center"
                    });
                });

            } else {
                // If no new badges and nothing stored, initialize once
                if (!localStorage.getItem("badges")) {
                    localStorage.setItem("badges", JSON.stringify(newBadges));
                }
            }

            setStreak({
                ...res.data.streak,
                badges: res.data.badges || [],
            });
        };

        fetchStreak().catch(console.error);
    }, []);

    if (!streak) return null;

    const badgeEmojis = {
        "3-Day Streak": "🔥",
        "1-Week Warrior": "💪",
        "Savings Hero": "🧠",
    };

    const badgeMilestones = [
        { days: 3, name: "3-Day Streak", emoji: "🔥" },
        { days: 7, name: "1-Week Warrior", emoji: "💪" },
        { days: 14, name: "Savings Hero", emoji: "🧠" },
    ];

    const current = streak.current;
    const nextBadge = badgeMilestones.find((b) => b.days > current);
    const progress = nextBadge
        ? Math.min((current / nextBadge.days) * 100, 100)
        : 100;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-yellow-100 rounded-xl p-4 shadow-lg space-y-4"
        >
            <h2 className="text-xl font-bold text-yellow-800">🔥 Savings Streak</h2>

            <p>
                Current Streak:{" "}
                <strong>{(streak?.current ?? 1)} {(streak?.current ?? 1) === 1 ? "day" : "days"}</strong>
            </p>
            <p>
                Best Streak:{" "}
                <strong>{(streak?.best ?? 1)} {(streak?.best ?? 1) === 1 ? "day" : "days"}</strong>
            </p>

            {/* Earned Badges */}
            <div className="pt-2">
                <h3 className="font-semibold mb-2">🏅 Badges:</h3>
                {(streak.badges?.length ?? 0) === 0 ? (
                    <p className="text-sm italic text-yellow-700">
                        No badges yet — keep saving daily!
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {streak.badges.map((badge, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ scale: 0, rotate: -20, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{
                                    delay: idx * 0.1,
                                    type: "spring",
                                    stiffness: 300,
                                }}
                                className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm text-sm text-yellow-800 border border-yellow-300"
                            >
                                <span className="text-lg">{badgeEmojis[badge] || "🏆"}</span>
                                <span>{badge}</span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
