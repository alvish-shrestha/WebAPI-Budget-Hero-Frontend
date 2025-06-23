import React from "react";
import { motion } from "framer-motion";

export default function LearnMoreForm() {
  return (
    <motion.div
      className="min-h-screen bg-[#FFF7F4] text-[#1F2937] px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-[#1F2937]">Learn More About Budget Hero</h1>
        <p className="text-lg mb-4">
          Budget Hero is a personal finance platform that helps you track your expenses, analyze your financial
          patterns, and achieve your savings goals. Our visual tools and automation features make managing
          money simple and intuitive.
        </p>
        <p className="text-lg mb-4">
          Whether you're budgeting for your household, planning a trip, or investing for the future, Budget Hero
          gives you the insight you need to make smart decisions.
        </p>
        <p className="text-lg mb-4">
          Key features include:
        </p>
        <ul className="list-disc ml-6 text-lg space-y-2">
          <li>Expense tracking with charts and visuals</li>
          <li>Goal-based savings planning</li>
          <li>Secure account integration</li>
          <li>Alerts and budgeting tips</li>
        </ul>
      </div>
    </motion.div>
  );
}
