import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function SystemActivityChart({ activityData }) {
    const formattedData = activityData.map((activity) => ({
        date: new Date(activity.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        }),
        entries: activity.entriesAdded,
        goals: activity.goalsCreated,
        notifications: activity.notificationsSent,
    }));

    return (
        <div className="w-full h-[400px] mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">System Activity Overview</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="entries" fill="#6366f1" name="📝 Entries" />
                    <Bar dataKey="goals" fill="#10b981" name="🎯 Goals" />
                    <Bar dataKey="notifications" fill="#f59e0b" name="📨 Notifications" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
