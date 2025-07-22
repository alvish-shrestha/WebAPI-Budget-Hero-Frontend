import { useParams, useNavigate } from "react-router-dom";
import ResetPasswordModal from "../modal/ResetPasswordModal";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/login");
    };

    return (
        <div>
            <ResetPasswordModal isOpen={true} token={token} onClose={handleClose} />
        </div>
    );
}
