import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Plus, Calendar, BarChart3, Target, MoreHorizontal } from "lucide-react";
import GoalCard from "./Goal/GoalCard.jsx";
import GoalModal from "../../modal/GoalModal.jsx";
import { useGetGoals, useDeleteGoal } from "../../hooks/useGoalUser.js";
import { ConfirmDeleteModal } from "../../modal/ConfirmDeleteGoalModal.jsx";
import { toast } from "react-toastify";
import ContributeModal from "../../modal/ContributeModal.jsx";
import Sidebar from "../../layouts/Sidebar.jsx";

export default function GoalList() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [username, setUsername] = useState("User");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editGoal, setEditGoal] = useState(null);
    const [goalToDelete, setGoalToDelete] = useState(null);
    const [contributeGoal, setContributeGoal] = useState(null)

    const { data: goals, isLoading, refetch } = useGetGoals();
    const { mutate: deleteGoal } = useDeleteGoal();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const stored = localStorage.getItem("username");
        if (stored) setUsername(stored);
    }, []);

    const handleEdit = (goal) => {
        setEditGoal(goal);
        setIsModalOpen(true);
    };

    const handleDelete = (goal) => {
        setGoalToDelete(goal);
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-tr from-[#fff7f5] to-[#fbe3df] font-sans">
            <Sidebar
                username={username}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* Main Content */}
            <div className="flex-1 p-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Your Goals</h1>
                    <button
                        onClick={() => {
                            setEditGoal(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
                    >
                        <Plus size={18} /> Add Goal
                    </button>
                </div>

                {isLoading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {goals?.data?.length > 0 ? (
                            goals.data.map((goal) => (
                                <GoalCard
                                    key={goal._id}
                                    goal={goal}
                                    onEdit={handleEdit}
                                    onDelete={() => handleDelete(goal)}
                                    onContribute={(goal) => setContributeGoal(goal)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 col-span-full">No goals yet.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            <GoalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={async () => {
                    setIsModalOpen(false);
                    await refetch();
                }}
                initialData={editGoal}
            />

            <ConfirmDeleteModal
                isOpen={!!goalToDelete}
                onConfirm={() => {
                    deleteGoal(goalToDelete._id, {
                        onSuccess: async () => {
                            setGoalToDelete(null);
                            await refetch(); // refresh list
                        },
                        onError: () => toast.error("Failed to delete goal"),
                    });
                }}
                onCancel={() => setGoalToDelete(null)}
                title="Delete Goal"
                message={`Are you sure you want to delete "${goalToDelete?.title}"?`}
            />

            <ContributeModal
                isOpen={!!contributeGoal}
                goal={contributeGoal}
                onClose={() => setContributeGoal(null)}
                onSuccess={refetch}
            />
        </div>
    );
}
