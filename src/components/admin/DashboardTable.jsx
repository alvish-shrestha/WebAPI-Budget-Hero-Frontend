import React from "react";
import { Users, MessageCircle, ActivitySquare } from "lucide-react";

export default function DashboardStatsCard({ stats }) {
  const cards = [
    {
      title: "Users",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      count: stats.users,
      color: "bg-blue-100 text-blue-800",
    },
    {
      title: "Feedbacks",
      icon: <MessageCircle className="w-6 h-6 text-green-600" />,
      count: stats.feedbacks,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "System Activities",
      icon: <ActivitySquare className="w-6 h-6 text-yellow-600" />,
      count: stats.activities,
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-xl p-6 shadow-md ${card.color} flex items-center gap-4 animate-slideFadeIn`}
          style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
        >
          <div className="p-3 rounded-full bg-white shadow">{card.icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-2xl font-bold">{card.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
