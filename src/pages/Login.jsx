import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white shadow-xl rounded-lg flex overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 bg-red-500 text-white p-8 relative">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-red-300 rounded-t-[50%] z-0"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-center mb-4">Sign in</h2>
            <p className="text-center text-sm mb-6">Please sign in with your account</p>

            <form className="space-y-4">
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded bg-gray-200 text-black"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label>Password:</label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded bg-gray-200 text-black"
                    placeholder="Enter password"
                  />
                  <span className="absolute right-3 top-2.5 cursor-pointer">👁️</span>
                </div>
              </div>
              <div className="text-right text-xs underline cursor-pointer">Forgot Password?</div>
              <button className="w-full bg-[#391b1b] py-2 rounded font-bold">SIGN IN</button>
            </form>

            <div className="my-4 text-center text-sm">or sign in with</div>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-center bg-white text-black rounded py-2 shadow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>
              <button className="w-full flex items-center justify-center bg-white text-black rounded py-2 shadow">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="w-5 h-5 mr-2" />
                Sign in with Facebook
              </button>
            </div>

            <div className="mt-6 text-xs text-white text-center">
              Don’t have an account? <span className="text-blue-200 cursor-pointer underline">Sign up</span>
            </div>
          </div>
        </div>

        {/* Right: Image/Graphic */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-orange-50 p-6">
          <div className="text-center">
            <img
              src="/src/assets/login_page_image.png"
              alt="Budget Hero Illustration"
              className="w-full max-w-xs"
            />
            <h2 className="text-2xl font-bold mt-4 text-gray-800">BUDGET HERO</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
