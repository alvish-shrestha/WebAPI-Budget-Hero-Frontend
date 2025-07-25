import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import { useLoginUser } from "../../hooks/useLoginUser";
import { Eye, EyeOff } from "lucide-react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import ForgotPasswordModal from "../../modal/ForgotPasswordModal.jsx";
import { auth, googleProvider, facebookProvider } from "../../firebase";
import {signInWithPopup} from "firebase/auth";
import {toast} from "react-toastify";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLoginUser();

  const navigate = useNavigate();
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const validationSchema = Yup.object(
    {
      email: Yup.string().email("invalid email").required("Email required"),
      password: Yup.string().min(8, "Min 8 character required").required("Password required")
    }
  )

  const formik = useFormik(
    {
      initialValues: {
        // states of input
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: (data) => {
        // data is an obect of state of values, email, password
        mutate(data, {
          onSuccess: (response) => {
            const role = response?.data?.role;
            const username = response?.data?.username;

            // save to local storage
            localStorage.setItem("username", username);

            if (role === "admin") {
              navigate("/admin", { replace: true });
            } else {
              navigate("/dashboard", { replace: true });
            }
          },
        })
      }
    }
  )

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user info (optional)
      localStorage.setItem("username", user.displayName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("provider", "google");

      toast.success(`Welcome, ${user.displayName || "User"}!`);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In failed. Please try again.");
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      localStorage.setItem("username", user.displayName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("provider", "facebook");

      toast.success(`Welcome, ${user.displayName || "User"}!`);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
      toast.error("Facebook Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid lg:grid-cols-2">
        <div className="relative bg-gradient-to-br from-red-400 via-red-500 to-red-600 p-8 lg:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/90 via-red-500/90 to-red-600/90"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-300/30 rounded-full"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-300/20 rounded-full"></div>

          <div className="relative z-10 max-w-sm mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Sign in</h1>
              <p className="text-red-100 text-lg">Please sign in with your account</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white font-semibold text-lg mb-2">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full bg-red-200/50 border-0 text-gray-800 placeholder:text-gray-600 h-12 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Enter your email"
                  required
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-200 text-sm mt-1">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-white font-semibold text-lg mb-2">
                  Password:
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full bg-red-200/50 border-0 text-gray-800 placeholder:text-gray-600 h-12 rounded-lg px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white-600 hover:text-white-800"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="text-right mt-2">
                  <a
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-red-100 hover:text-white text-sm underline cursor-pointer"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 text-lg rounded-lg transition-colors ${isPending ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                SIGN IN
              </button>
            </form>

            <ForgotPasswordModal
                isOpen={isForgotModalOpen}
                onClose={() => setIsForgotModalOpen(false)}
            />

            <div className="mt-6 text-center">
              <p className="text-red-100 mb-4">or sign in with</p>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <button
                  type="button"
                  onClick={handleFacebookSignIn}
                  className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 rounded-lg flex items-center justify-center gap-3 transition-colors"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Sign in with Facebook
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-red-100">
                Don't have an account?{" "}
                <a href="/sign-up" className="text-white font-semibold underline hover:no-underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center bg-gray-50 p-8">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="relative w-80 h-80 mx-auto">
                <svg viewBox="0 0 400 400" className="w-full h-full">

                  <circle cx="100" cy="100" r="20" fill="#EF4444" opacity="0.3" />
                  <circle cx="320" cy="80" r="15" fill="#EF4444" opacity="0.5" />
                  <circle cx="350" cy="200" r="25" fill="#EF4444" opacity="0.2" />
                  <circle cx="80" cy="300" r="18" fill="#EF4444" opacity="0.4" />

                  <path
                    d="M200 80 C220 80 240 100 240 120 C240 140 220 160 200 160 C180 160 160 140 160 120 C160 100 180 80 200 80 Z"
                    fill="#EF4444"
                  />
                  <path
                    d="M200 160 L160 180 L140 220 L120 280 L120 320 L140 320 L160 280 L180 240 L220 240 L240 280 L260 320 L280 320 L280 280 L260 220 L240 180 Z"
                    fill="#EF4444"
                  />

                  <path d="M160 180 L120 200 L100 240 L120 250 L140 220 L160 200" fill="#EF4444" />
                  <path d="M240 180 L280 200 L300 240 L280 250 L260 220 L240 200" fill="#EF4444" />

                  <circle cx="120" cy="120" r="25" fill="#374151" />
                  <text x="120" y="130" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">
                    $
                  </text>

                  <circle cx="280" cy="140" r="20" fill="#374151" />
                  <text x="280" y="148" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                    $
                  </text>

                  <circle cx="320" cy="240" r="22" fill="#374151" />
                  <text x="320" y="248" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
                    $
                  </text>

                  <ellipse cx="300" cy="300" rx="40" ry="25" fill="#EF4444" />
                  <circle cx="310" cy="295" r="3" fill="#374151" />
                  <path d="M340 300 L350 295 L350 305 Z" fill="#EF4444" />
                  <rect x="295" y="285" width="10" height="8" fill="#374151" rx="2" />

                  <path
                    d="M320 180 L360 140 M350 140 L360 140 L360 150"
                    stroke="#374151"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              BUDGET
              <br />
              <span className="text-red-500">HERO</span>
            </h2>

            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Take control of your finances and become your own budget hero. Track expenses, save money, and achieve
              your financial goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}