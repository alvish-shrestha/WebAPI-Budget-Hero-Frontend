import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddTransaction } from "../../hooks/useTransactionUser";

export default function TransactionForm({ onClose, onSuccess }) {
    const { mutate, isPending } = useAddTransaction();

    const incomeCategories = [
        { label: "💼 Salary", value: "Salary" },
        { label: "🧑‍💻 Freelance", value: "Freelance" },
        { label: "📈 Investment", value: "Investment" },
        { label: "🎁 Gift", value: "Gift" },
        { label: "📦 Other", value: "Other" },
    ];

    const expenseCategories = [
        { label: "🍔 Food", value: "Food" },
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

    const formik = useFormik({
        initialValues: {
            type: "expense",
            amount: "",
            category: "",
            account: "",
            date: new Date().toISOString().split("T")[0],
            note: "",
            description: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            mutate(values, {
                onSuccess: () => {
                    resetForm();
                    onSuccess?.();
                    onClose?.();
                },
            });
        },
    });

    const categoryOptions =
        formik.values.type === "income" ? incomeCategories : expenseCategories;

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-xl w-full mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6 text-gray-800 font-sans transition-all"
        >
            <h2 className="text-3xl font-bold text-center text-[#F55345] mb-4">
                Add Transaction
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

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-[#F55345] text-white font-semibold py-3 rounded-md hover:bg-red-600 transition-all"
                disabled={isPending}
            >
                {isPending ? "Adding..." : "Add Transaction"}
            </button>
        </form>
    );
}
