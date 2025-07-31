import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useCreateGoal, useUpdateGoal, useDeleteGoal } from "../../../hooks/useGoalUser.js";
import { ConfirmDeleteModal } from "../../../modal/ConfirmDeleteGoalModal.jsx";

export default function GoalForm({ onClose, onSuccess, initialData }) {
    const isEditMode = Boolean(initialData?._id);
    const { mutate: createGoal, isPending: isCreating } = useCreateGoal();
    const { mutate: updateGoal, isPending: isUpdating } = useUpdateGoal();
    const { mutate: deleteGoal, isPending: isDeleting } = useDeleteGoal();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const validationSchema = Yup.object({
        title: Yup.string().required("Goal title is required"),
        targetAmount: Yup.number()
            .typeError("Must be a number")
            .positive("Amount must be positive")
            .required("Target amount is required"),
        deadline: Yup.date().required("Deadline is required"),
    });

    const formik = useFormik({
        initialValues: {
            title: initialData?.title || "",
            targetAmount: initialData?.targetAmount || "",
            currentAmount: initialData?.currentAmount || 0,
            deadline: initialData?.deadline?.split("T")[0] || new Date().toISOString().split("T")[0],
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const payload = {
                ...values,
                targetAmount: Number(values.targetAmount),
                currentAmount: Number(values.currentAmount || 0),
            };

            const onSuccessHandler = () => {
                resetForm();
                onClose?.();
                onSuccess?.();
            };

            if (isEditMode) {
                updateGoal(
                    { id: initialData._id, data: payload },
                    { onSuccess: onSuccessHandler }
                );
            } else {
                createGoal(payload, {
                    onSuccess: onSuccessHandler,
                });
            }
        },
    });

    const confirmDelete = () => {
        deleteGoal(initialData._id, {
            onSuccess: () => {
                onClose?.();
                onSuccess?.();
            },
            onError: () => toast.error("Failed to delete goal"),
        });
        setShowDeleteModal(false);
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="space-y-6 text-gray-800 font-sans"
        >
            <h2 className="text-3xl font-bold text-center text-[#F55345] mb-4">
                {isEditMode ? "Edit Goal" : "Add Goal"}
            </h2>

            {/* Goal Title */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Goal Title</label>
                <input
                    type="text"
                    {...formik.getFieldProps("title")}
                    placeholder="e.g. Thailand Trip"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                />
                {formik.touched.title && formik.errors.title && (
                    <p className="text-sm text-red-500">{formik.errors.title}</p>
                )}
            </div>

            {/* Target Amount */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Target Amount</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        Rs.
                    </span>
                    <input
                        type="number"
                        {...formik.getFieldProps("targetAmount")}
                        className="pl-12 border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                    />
                </div>
                {formik.touched.targetAmount && formik.errors.targetAmount && (
                    <p className="text-sm text-red-500">{formik.errors.targetAmount}</p>
                )}
            </div>

            {/* Deadline */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Deadline</label>
                <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    {...formik.getFieldProps("deadline")}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                />
                {formik.touched.deadline && formik.errors.deadline && (
                    <p className="text-sm text-red-500">{formik.errors.deadline}</p>
                )}
            </div>

            {/* Buttons */}
            {isEditMode ? (
                <div className="flex justify-between items-center gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-[#F55345] text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-all"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update Goal"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="w-12 h-12 flex items-center justify-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold text-lg rounded-full transition-all"
                        disabled={isDeleting}
                        title="Delete Goal"
                    >
                        🗑
                    </button>
                </div>
            ) : (
                <button
                    type="submit"
                    className="w-full bg-[#F55345] text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-all"
                    disabled={isCreating}
                >
                    {isCreating ? "Adding..." : "Add Goal"}
                </button>
            )}

            {/* Confirmation Modal */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
                title="Delete Goal"
                message={`Are you sure you want to delete "${initialData?.title}"?`}
            />
        </form>
    );
}
