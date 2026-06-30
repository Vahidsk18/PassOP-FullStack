import { useState } from 'react'
import { MdDarkMode, MdLightMode, MdLogout } from 'react-icons/md'
import { useTheme } from '../context_api/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import { FidgetSpinner } from 'react-loader-spinner'
import { useAuth } from '../context_api/AuthContext'

function Navbar() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'
    const navigate = useNavigate()

    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const {
        user,
        logout,
        isAuthenticated
    } = useAuth()

    const handleLogout = () => {
        setIsLoggingOut(true)

        setTimeout(() => {
            logout()
            setIsLoggingOut(false) // Fixed: Put this inside the timeout so it hides after logout completes
            navigate('/')
        }, 500)
    }

    return (
        <>
            {/* Logout Spinner */}
            {isLoggingOut && (
                <div className="fixed inset-0 z-50 flex flex-col gap-4 justify-center items-center bg-[#0f172a]">
                    <FidgetSpinner
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="fidget-spinner-loading"
                    />
                    <p className="text-green-400 font-medium text-sm tracking-wider animate-pulse">
                        Logging you out securely...
                    </p>
                </div>
            )}

            {/* Fixed: Added 'sticky top-0 z-40' to keep navbar pinned nicely and fix spacing conflicts */}
            <nav
                className={`sticky top-0 z-40 w-full transition-colors duration-300 ${isDark
                    ? 'bg-[#0f172a]'
                    : 'bg-white border-b border-green-100'
                    } text-white shadow-md`}
            >
                <div className="h-16 flex items-center justify-between px-6 md:px-8">

                    {/* Logo */}
                    <Link to="/">
                        <h1
                            className={`text-2xl font-bold tracking-wide ${isDark
                                ? 'text-white'
                                : 'text-gray-800'
                                }`}
                        >
                            {"<"}
                            <span className="text-green-400">
                                PassOP
                            </span>
                            {"/>"}
                        </h1>
                    </Link>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-4">

                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-300 font-medium text-sm shadow-md"
                            >
                                <span>{user?.username}</span>
                                <MdLogout size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-1.5 rounded-lg border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 font-medium text-sm"
                            >
                                Login / Signup
                            </button>
                        )}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-green-400 cursor-pointer"
                        >
                            {isDark
                                ? <MdLightMode size={20} />
                                : <MdDarkMode size={20} />
                            }
                        </button>

                    </div>

                    {/* Mobile */}
                    <div className="flex md:hidden items-center gap-2">

                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-all font-medium text-xs shadow-sm"
                            >
                                <span>{user?.username}</span>
                                <MdLogout size={14} />
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="px-2 py-1 rounded-md border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all font-medium text-xs"
                            >
                                Login / Signup
                            </button>
                        )}

                        <button
                            onClick={toggleTheme}
                            className="p-1.5 rounded-lg text-green-400 cursor-pointer"
                        >
                            {isDark
                                ? <MdLightMode size={18} />
                                : <MdDarkMode size={18} />
                            }
                        </button>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar