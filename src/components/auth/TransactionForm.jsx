import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddTransaction, useUpdateTransaction, useDeleteTransaction } from "../../hooks/useTransactionUser";
import { toast } from "react-toastify";
import { UpdateTransactionModal } from "../../modal/UpdateTransactionModal.jsx";

export default function TransactionForm({ onClose, onSuccess, initialData }) {
    const { mutate: addTransaction, isPending: isAdding } = useAddTransaction();
    const { mutate: updateTransaction, isPending: isUpdating } = useUpdateTransaction();
    const { mutate: deleteTransaction, isPending: isDeleting } = useDeleteTransaction();

    const isEditMode = Boolean(initialData?._id);

    const incomeCategories = [
        { label: "💼 Salary", value: "Salary" },
        { label: "🧑‍💻 Freelance", value: "Freelance" },
        { label: "📈 Investment", value: "Investment" },
        { label: "🎁 Gift", value: "Gift" },
        { label: "📦 Other", value: "Other" },
    ];

    const expenseCategories = [
        { label: "🍽️ Food", value: "Food" },
        { label: "🚗 Transport", value: "Transport" },
        { label: "🛍️ Shopping", value: "Shopping" },
        { label: "💡 Utilities", value: "Utilities" },
        { label: "💊 Health", value: "Health" },
        { label: "🎬 Entertainment", value: "Entertainment" },
        { label: "📦 Other", value: "Other" },
    ];

    const accountOptions = [
        { label: "💵 Cash", value: "Cash" },
        { label: "🏦 Bank", value: "Bank" },
        { label: "📱 Wallet", value: "Wallet" },
    ];

    const validationSchema = Yup.object({
        type: Yup.string().required("Transaction type is required"),
        amount: Yup.number()
            .typeError("Must be a number")
            .positive("Amount must be positive")
            .required("Amount is required"),
        category: Yup.string().required("Category is required"),
        account: Yup.string().required("Account is required"),
        date: Yup.date().required("Date is required"),
        note: Yup.string().required("Note is required"),
        description: Yup.string(),
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [pendingValues, setPendingValues] = useState(null);

    const confirmUpdate = () => {
        updateTransaction(
            { id: initialData._id, data: pendingValues },
            {
                onSuccess: () => {
                    formik.resetForm();
                    onClose?.();
                    onSuccess?.();
                },
                onError: () => toast.error("Failed to update transaction"),
            }
        );
        setShowConfirmModal(false);
    };

    const formik = useFormik({
        initialValues: {
            type: initialData?.type || "expense",
            amount: initialData?.amount || "",
            category: initialData?.category || "",
            account: initialData?.account || "",
            date: initialData?.date?.split("T")[0] || new Date().toISOString().split("T")[0],
            note: initialData?.note || "",
            description: initialData?.description || "",
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (isEditMode) {
                setPendingValues(values)
                setShowConfirmModal(true)
            } else {
                addTransaction(values, {
                    onSuccess: () => {
                        resetForm();
                        onClose?.();
                        onSuccess?.();
                    },
                    onError: () => toast.error("Failed to add transaction"),
                });
            }
        },
    });

    const handleDelete = () => {
        toast.info(
            ({ closeToast }) => (
                <div className="space-y-2">
                    <p>Are you sure you want to delete this transaction?</p>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => {
                                deleteTransaction(initialData._id, {
                                    onSuccess: () => {
                                        closeToast();
                                        onClose?.();
                                        onSuccess?.();
                                    },
                                    onError: () => {
                                        closeToast();
                                    },
                                });
                            }}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                        >
                            Yes
                        </button>
                        <button
                            onClick={closeToast}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
                        >
                            No
                        </button>
                    </div>
                </div>
            ),
            {
                autoClose: false,
                closeOnClick: false,
                closeButton: false,
                draggable: false,
            }
        );
    };


    const categoryOptions =
        formik.values.type === "income" ? incomeCategories : expenseCategories;

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-xl w-full mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6 text-gray-800 font-sans transition-all"
        >
            <h2 className="text-3xl font-bold text-center text-[#F55345] mb-4">
                {isEditMode ? "Edit Transaction" : "Add Transaction"}
            </h2>

            {/* Transaction Type */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Transaction Type</label>
                <div className="relative">
                    <select
                        {...formik.getFieldProps("type")}
                        className="appearance-none w-full bg-white border border-gray-300 rounded-md px-5 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                    >
                        <option value="income">💼 Income</option>
                        <option value="expense">💸 Expense</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        ▼
                    </div>
                </div>
                {formik.touched.type && formik.errors.type && (
                    <p className="text-sm text-red-500">{formik.errors.type}</p>
                )}
            </div>

            {/* Date */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Date</label>
                <input
                    type="date"
                    {...formik.getFieldProps("date")}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                />
                {formik.touched.date && formik.errors.date && (
                    <p className="text-sm text-red-500">{formik.errors.date}</p>
                )}
            </div>

            {/* Amount */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Amount</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        Rs.
                    </span>
                    <input
                        type="number"
                        placeholder="e.g. 1200"
                        {...formik.getFieldProps("amount")}
                        className="pl-12 border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                    />
                </div>
                {formik.touched.amount && formik.errors.amount && (
                    <p className="text-sm text-red-500">{formik.errors.amount}</p>
                )}
            </div>

            {/* Category */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Category</label>
                <div className="relative">
                    <select
                        {...formik.getFieldProps("category")}
                        className="appearance-none w-full bg-white border border-gray-300 rounded-md px-5 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                    >
                        <option value="">Select Category</option>
                        {categoryOptions.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        ▼
                    </div>
                </div>
                {formik.touched.category && formik.errors.category && (
                    <p className="text-sm text-red-500">{formik.errors.category}</p>
                )}
            </div>

            {/* Account */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Account</label>
                <div className="relative">
                    <select
                        {...formik.getFieldProps("account")}
                        className="appearance-none w-full bg-white border border-gray-300 rounded-md px-5 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                    >
                        <option value="">Select Account</option>
                        {accountOptions.map(({ label, value }) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                        ▼
                    </div>
                </div>
                {formik.touched.account && formik.errors.account && (
                    <p className="text-sm text-red-500">{formik.errors.account}</p>
                )}
            </div>

            {/* Note */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Note</label>
                <input
                    type="text"
                    placeholder="Add a note..."
                    {...formik.getFieldProps("note")}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                />
                {formik.touched.note && formik.errors.note && (
                    <p className="text-sm text-red-500">{formik.errors.note}</p>
                )}
            </div>

            {/* Description */}
            <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Description (Optional)</label>
                <input
                    type="text"
                    placeholder="Short description..."
                    {...formik.getFieldProps("description")}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#F55345] transition"
                />
            </div>

            {/* Buttons */}
            {isEditMode ? (
                <div className="flex justify-between items-center gap-4">
                    <button
                        type="submit"
                        className="flex-1 bg-[#F55345] text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-all"
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update Transaction"}
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-12 h-12 flex items-center justify-center border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold text-lg rounded-full transition-all"
                        disabled={isDeleting}
                        title="Delete Transaction"
                    >
                        🗑
                    </button>
                </div>
            ) : (
                <button
                    type="submit"
                    className="w-full bg-[#F55345] text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-all"
                    disabled={isAdding}
                >
                    {isAdding ? "Adding..." : "Add Transaction"}
                </button>
            )}
            <UpdateTransactionModal
                isOpen={showConfirmModal}
                onConfirm={confirmUpdate}
                onCancel={() => setShowConfirmModal(false)}
            />
        </form>
    );
}
