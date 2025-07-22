import { useFormik } from "formik";
import * as Yup from "yup";
import { useConfirmResetPassword } from "../../hooks/useResetPasswordUser.js";

export default function ResetPasswordForm({ token, onSuccess }) {
    const { mutate, isPending } = useConfirmResetPassword();

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().min(6, "At least 6 characters").required("Required"),
        }),
        onSubmit: (values) => {
            mutate(
                { token, password: values.password },
                {
                    onSuccess,
                }
            );
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input
                type="password"
                name="password"
                placeholder="New password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full border rounded-md px-4 py-2"
            />
            {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
                {isPending ? "Resetting..." : "Reset Password"}
            </button>
        </form>
    );
}
