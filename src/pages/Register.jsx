import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import React from 'react';
import signUpImage from '../assets/sign_up_image.png';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white shadow-xl rounded-lg flex overflow-hidden">
                {/* Left Section - Form */}
                <div className="w-full md:w-1/2 bg-red-500 text-white p-8 relative">
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-red-300 rounded-t-[50%] z-0"></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>
                        <p className="text-center text-sm mb-6">Create an account</p>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                                    placeholder="Enter username"
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                                        placeholder="Enter password"
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-600" />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                                        placeholder="Confirm password"
                                    />
                                    <span
                                        className="absolute right-3 top-2.5 cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-600" />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <button className="w-full bg-[#391b1b] py-2 rounded font-bold">SIGN UP</button>
                        </form>

                        <div className="my-4 text-center text-sm">or sign up with</div>

                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-center bg-white text-black rounded py-2 shadow">
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                                    alt="Google"
                                    className="w-5 h-5 mr-2"
                                />
                                Sign up with Google
                            </button>
                            <button className="w-full flex items-center justify-center bg-white text-black rounded py-2 shadow">
                                <img
                                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                                    alt="Facebook"
                                    className="w-5 h-5 mr-2"
                                />
                                Sign up with Facebook
                            </button>
                        </div>

                        <div className="mt-6 text-xs text-white text-center">
                            <div className="mt-6 text-xs text-white text-center">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-200 cursor-pointer underline">Sign in</Link>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Right Section - Image */}
                <div className="w-1/2 hidden md:flex items-center justify-center bg-orange-50 p-6">
                    <div className="text-center">
                        <img
                            src={signUpImage}
                            alt="Sign Up Visual"
                            className="w-full max-w-xs"
                        />
                        <h2 className="text-2xl font-bold mt-4 text-gray-800">BUDGET HERO</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
