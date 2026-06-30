import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context_api/ThemeContext'
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa'
import API from '../api/axiosInstance'
import { showSuccess, showError } from '../utils/toast'
import { useAuth } from '../context_api/AuthContext'

function Register() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
    
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await API.post(
                "/auth/register",
                formData
            )
            login(res.data)
            showSuccess(
                "Registration Successful, Login"
            )

            navigate("/login")

        } catch (err) {
            showError(
                err.response?.data?.errors?.[0] ||
                err.response?.data?.message ||
                "Registration Failed"
            )
        }
    }

    return (
        /* FIXED: Changed 'items-center' to 'items-start' to pull the card up.
          FIXED: Changed 'pt-20 pb-8' to 'py-10 md:py-16' for an optimized, responsive gap.
        */
        <div className={`min-h-[calc(100vh-64px)] flex items-start justify-center px-77 transition-colors duration-300 py-16 md:py-16
      ${isDark ? 'bg-[#0f172a]' : 'bg-[#e8f5ee]'}`}
            style={isDark ? {
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            } : {
                backgroundImage: 'linear-gradient(rgba(0,0,0,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.09) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }}
        >
            <div className={`w-full max-w-[380px] md:max-w-md rounded-[2.75rem] border p-7 shadow-md transition-all
        ${isDark
                    ? 'bg-[#1e293b]/95 border-gray-700'
                    : 'bg-white/95 border-green-200'
                }`}>

                <div className="text-center mb-6">
                    <div className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center mb-3
            ${isDark ? 'bg-green-900/50' : 'bg-green-100'}`}>
                        <FaUser className={`text-2xl ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Create Account
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={`block text-xs mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Username</label>
                            <div className="relative">
                                <FaUser className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Username"
                                    className={`w-full py-3 pl-9 pr-4 rounded-2xl border focus:outline-none focus:ring-1 text-sm
                    ${isDark
                                            ? 'bg-[#0f172a] border-gray-700 text-white placeholder-gray-500 focus:border-green-500'
                                            : 'bg-white border-green-200 text-gray-800 placeholder-gray-400 focus:border-green-500'
                                        }`}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className={`block text-xs mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Email</label>
                            <div className="relative">
                                <FaEnvelope className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className={`w-full py-3 pl-9 pr-4 rounded-2xl border focus:outline-none focus:ring-1 text-sm
                    ${isDark
                                            ? 'bg-[#0f172a] border-gray-700 text-white placeholder-gray-500 focus:border-green-500'
                                            : 'bg-white border-green-200 text-gray-800 placeholder-gray-400 focus:border-green-500'
                                        }`}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className={`block text-xs mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Password</label>
                        <div className="relative">
                            <FaLock className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className={`w-full py-3 pl-9 pr-4 rounded-2xl border focus:outline-none focus:ring-1 text-sm
                  ${isDark
                                        ? 'bg-[#0f172a] border-gray-700 text-white placeholder-gray-500 focus:border-green-500'
                                        : 'bg-white border-green-200 text-gray-800 placeholder-gray-400 focus:border-green-500'
                                    }`}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-4 bg-green-500 hover:bg-green-600 active:scale-[0.97] text-black font-semibold py-3.5 rounded-2xl transition-all text-sm"
                    >
                        Create Account
                    </button>
                </form>

                <p className={`text-center mt-5 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-500 hover:text-green-600">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register