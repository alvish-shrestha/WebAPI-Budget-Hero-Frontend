import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import confetti from "canvas-confetti";
import { useRequestResetPassword } from "../../hooks/useResetPasswordUser.js";

export default function ForgotPasswordForm({ onSuccess }) {
    const { mutate, isPending } = useRequestResetPassword();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Enter a valid email")
                .required("Email is required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            mutate(values.email, {
                onSuccess: () => {
                    confetti({
                        particleCount: 150,
                        spread: 80,
                        origin: { y: 0.4 },
                    });
                    onSuccess?.();
                },
                onSettled: () => {
                    setSubmitting(false);
                },
            });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={formik.isSubmitting || isPending}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition disabled:opacity-50"
            >
                {formik.isSubmitting || isPending ? "Sending..." : "Send Reset Link"}
            </button>
        </form>
    );
}
