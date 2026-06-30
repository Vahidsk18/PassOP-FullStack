import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaPlusSquare } from 'react-icons/fa'
import { useTheme } from '../context_api/ThemeContext'

export default function PasswordForm({ form, editIndex, handleChange, onSave }) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [showPassword, setShowPassword] = useState(false)

    const inputClass = `h-10 rounded-full border px-5 text-sm outline-none focus:ring-2 focus:ring-green-500 transition-all
        ${isDark
            ? 'bg-[#0e1422] border-[#2a33       50] text-gray-200 placeholder-gray-600'
            : 'bg-white border-green-300 text-gray-700'}`

    return (
        <div className="max-w-3xl mx-auto pt-10 px-4">
            {/* Title */}
            <div className="text-center mb-6">
                <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {'<'}Pass<span className="text-green-500">OP</span>{'/>'}
                </h1>
                <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    Your own Password Manager
                </p>
            </div>

            {/* Website URL */}
            <input
                type="text"
                placeholder="Website URL"
                name="website"
                value={form.website}
                onChange={handleChange}
                className={`w-full mb-4 ${inputClass}`}
            />

            {/* Username + Password row */}
            <div className="flex gap-3 mb-5">
                <input
                    type="text"
                    placeholder="Email / Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className={`flex-1 ${inputClass}`}
                />

                <div className="relative w-48">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className={`w-full pr-10 ${inputClass}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showPassword
                            ? <FaEyeSlash className="text-sm text-gray-500" />
                            : <FaEye className="text-sm text-gray-500" />}
                    </button>
                </div>
            </div>

            {/* Save / Edit button */}
            <div className="flex justify-center">
                <button
                    onClick={onSave}
                    className="flex items-center gap-2 px-7 py-2 text-sm font-semibold rounded-full bg-green-500 hover:bg-green-600 active:scale-95 transition-all shadow-md text-white"
                >
                    <FaPlusSquare className="text-base animate-bounce" />
                    {editIndex !== null ? 'Edit Password' : 'Save Password'}
                </button>
            </div>
        </div>
    )
}