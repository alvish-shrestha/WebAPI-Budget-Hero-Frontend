import { signInWithGoogle, signInWithFacebook } from "../../utils/authProviders.js";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SocialLoginButtons() {
    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={signInWithGoogle}
                className="flex items-center gap-3 bg-white border rounded-lg px-4 py-2 hover:shadow transition"
            >
                <FcGoogle className="text-xl" />
                Sign in with Google
            </button>
            <button
                onClick={signInWithFacebook}
                className="flex items-center gap-3 bg-white border rounded-lg px-4 py-2 hover:shadow transition"
            >
                <FaFacebook className="text-xl text-blue-600" />
                Sign in with Facebook
            </button>
        </div>
    );
}
