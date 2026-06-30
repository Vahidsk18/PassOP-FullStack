import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context_api/AuthContext";
import { showSuccess, showError } from "../utils/toast";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { useTheme } from "../context_api/ThemeContext";
import API from "../api/axiosInstance";

function Login() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm(prev => ({

            ...prev,

            [e.target.name]: e.target.value

        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await API.post(
                "/auth/login",
                form
            );

            login(res.data);

            showSuccess("Login Successful");

            navigate("/manager");

        } catch (err) {

            showError(
                err.response?.data?.message ||
                "Login Failed"
            );
        }
    };

    return (
        <div className={`min-h-[calc(100vh-64px)] transition-colors duration-300 flex items-start justify-center px-4 py-16 md:py-16
      ${isDark ? 'bg-[#0f172a]' : 'bg-[#e8f5ee]'}`}
            style={isDark ? {
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            } : {
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.09) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }}
        >
            {/* MATCHED UI CARD: Changed max width to max-w-[380px] md:max-w-md, 
        padding to p-7, border radius to rounded-[2.75rem], and matched shadows 
      */}
            <div className={`w-full max-w-[380px] md:max-w-md rounded-[2.75rem] border p-7 shadow-md transition-all
        ${isDark
                    ? 'bg-[#1e293b]/95 border-gray-700'
                    : 'bg-white/95 border-green-200'
                }`}
            >
                {/* MATCHED HEADER: Updated wrapper and layout sizing properties to correspond to Register */}
                <div className="text-center mb-6">
                    <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors
            ${isDark ? 'bg-green-900/50' : 'bg-green-100'}`}>
                        <FaLock className={`text-2xl ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Welcome Back
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        {/* MATCHED LABELS: Altered size metrics to text-xs with mb-1.5 margins */}
                        <label className={`block text-xs mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Email
                        </label>
                        <div className="relative">
                            {/* MATCHED FORM FIELDS: Adjusted internal padding, type scaling (text-sm), and icon baselines */}
                            <FaEnvelope className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className={`w-full py-3 pl-9 pr-4 rounded-2xl border focus:outline-none focus:ring-1 text-sm transition-all
                  ${isDark
                                        ? 'bg-[#0f172a] border-gray-700 text-white placeholder-gray-500 focus:border-green-500'
                                        : 'bg-white border-green-200 text-gray-800 placeholder-gray-400 focus:border-green-500'
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`block text-xs mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Password
                        </label>
                        <div className="relative">
                            <FaLock className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className={`w-full py-3 pl-9 pr-4 rounded-2xl border focus:outline-none focus:ring-1 text-sm transition-all
                  ${isDark
                                        ? 'bg-[#0f172a] border-gray-700 text-white placeholder-gray-500 focus:border-green-500'
                                        : 'bg-white border-green-200 text-gray-800 placeholder-gray-400 focus:border-green-500'
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    {/* MATCHED ACTION BUTTON: Modified animation click parameters and height structures */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-green-500 hover:bg-green-600 active:scale-[0.97] text-black font-semibold py-3.5 rounded-2xl transition-all text-sm"
                    >
                        Sign In
                    </button>
                </form>

                {/* MATCHED FOOTER: Scaled down text classes to text-xs with mt-5 separation */}
                <p className={`text-center mt-5 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-green-500 hover:text-green-600">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login