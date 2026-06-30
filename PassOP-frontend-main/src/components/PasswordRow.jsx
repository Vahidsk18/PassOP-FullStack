import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaCopy, FaEdit, FaTrash } from 'react-icons/fa'
import { showInfo } from '../utils/toast'
import { useTheme } from '../context_api/ThemeContext'

export default function PasswordRow({ entry, index, onEdit, onDelete, decrypt }) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [visible, setVisible] = useState(false)

    const decrypted = entry?.password ? decrypt(entry.password) : "";

    function copy(text) {
        window.navigator.clipboard.writeText(text)
        showInfo('Copied to clipboard!')
    }

    const rowBg = isDark
        ? `border-[#1e2a40] ${index % 2 === 0 ? 'bg-[#0b0f1c]' : 'bg-[#0e1422]'} hover:bg-[#131929]`
        : `border-green-100 ${index % 2 === 0 ? 'bg-[#f0faf4]' : 'bg-[#e6f5ec]'} hover:bg-[#d4edda]`

    const cellClass = `py-3 px-5 text-center border-r ${isDark ? 'text-gray-400 border-[#1e2a40]' : 'text-gray-700 border-green-200'}`
    const copyIcon = `shrink-0 cursor-pointer transition-colors ${isDark ? 'text-gray-600 hover:text-green-400' : 'text-gray-400 hover:text-green-600'}`

    return (
        <tr className={`border-t transition-colors duration-150 ${rowBg}`}>
            {/* S.No */}
            <td className={cellClass}>{index + 1}</td>

            {/* Website */}
            <td className={cellClass}>
                <div className="flex items-center justify-center gap-2">
                    <a
                        href={entry.website.startsWith('http') ? entry.website : `https://${entry.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={entry.website}
                        className={`max-w-[250px] block truncate hover:underline ${isDark ? 'hover:text-green-400' : 'hover:text-green-600'
                            }`}
                    >
                        {entry.website}
                    </a>

                    <FaCopy
                        onClick={() => copy(entry.website)}
                        className={copyIcon}
                        title="Copy site"
                        size={12}
                    />
                </div>
            </td>

            {/* Username */}
            <td className={cellClass}>
                <div className="flex items-center justify-center gap-1.5">
                    <span>{entry.username}</span>
                    <FaCopy onClick={() => copy(entry.username)} className={copyIcon} title="Copy username" size={12} />
                </div>
            </td>

            {/* Password */}
            <td className={cellClass}>
                <div className="flex items-center justify-center gap-1.5">
                    <span className="font-mono">
                        {visible ? decrypted : '*'.repeat(decrypted.length)}
                    </span>
                    <button
                        type="button"
                        onClick={() => setVisible(v => !v)}
                        className={`transition-colors ${isDark ? 'text-gray-600 hover:text-green-400' : 'text-gray-400 hover:text-green-600'}`}
                        title={visible ? 'Hide' : 'Show'}
                    >
                        {visible ? <FaEyeSlash size={12} /> : <FaEye size={12} />}
                    </button>
                    <FaCopy onClick={() => copy(decrypted)} className={copyIcon} title="Copy password" size={12} />
                </div>
            </td>

            {/* Actions */}
            <td className="py-3 px-5 text-center">
                <div className="flex items-center justify-center gap-4">
                    <FaEdit
                        onClick={() => onEdit(entry)}
                        className={`cursor-pointer transition-colors ${isDark ? 'text-green-500 hover:text-green-300' : 'text-green-600 hover:text-green-400'}`}
                        title="Edit"
                    />
                    <FaTrash
                        onClick={() => onDelete(entry._id)}
                        className="text-red-500 cursor-pointer hover:text-red-400 transition-colors"
                        title="Delete"
                    />
                </div>
            </td>
        </tr>
    )
}