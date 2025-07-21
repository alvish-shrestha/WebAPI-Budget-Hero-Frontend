import React, { useState } from "react";
import { useCreateFeedback } from "../../hooks/useFeedbackUser.js";

export default function FeedbackForm({ onSuccess }) {
    const createFeedback = useCreateFeedback();
    const [formData, setFormData] = useState({
        subject: "",
        message: "",
        priority: "medium",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createFeedback.mutate(formData, {
            onSuccess: () => {
                setFormData({ subject: "", message: "", priority: "medium" });
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm font-medium">Subject</label>
                <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full px-4 py-2 border rounded-md shadow-sm"
                />
            </div>

            <div>
                <label className="text-sm font-medium">Priority</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md shadow-sm"
                >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟠 Medium</option>
                    <option value="high">🔴 High</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={createFeedback.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
                {createFeedback.isPending ? "Submitting..." : "Submit Feedback"}
            </button>
        </form>
    );
}
