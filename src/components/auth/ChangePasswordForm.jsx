import { useState } from "react";
import { useChangePasswordUser } from "../../hooks/useChangePasswordUser";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordForm({ onClose }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const mutation = useChangePasswordUser();

    const handleSubmit = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        mutation.mutate(
            { currentPassword, newPassword },
            {
                onSuccess: () => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    onClose();
                },
            }
        );
    };

    return (
        <div className="space-y-4">
            {/* Current Password */}
            <div className="relative">
                <input
                    type={showCurrent ? "text" : "password"}
                    placeholder="Current Password"
                    className="w-full border p-2 rounded pr-10"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-2 top-2.5 text-gray-500"
                    onClick={() => setShowCurrent((prev) => !prev)}
                >
                    {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            {/* New Password */}
            <div className="relative">
                <input
                    type={showNew ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full border p-2 rounded pr-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-2 top-2.5 text-gray-500"
                    onClick={() => setShowNew((prev) => !prev)}
                >
                    {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
                <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm New Password"
                    className="w-full border p-2 rounded pr-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute right-2 top-2.5 text-gray-500"
                    onClick={() => setShowConfirm((prev) => !prev)}
                >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            {/* Submit */}
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                onClick={handleSubmit}
                disabled={mutation.isLoading}
            >
                {mutation.isLoading ? "Updating..." : "Update Password"}
            </button>
        </div>
    );
}
