import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { useTheme } from '../context_api/ThemeContext'

export default function Footer() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <footer className={`text-center py-6 text-sm flex justify-center items-center gap-2 transition-colors duration-300 ${isDark ? 'text-gray-600' : 'text-gray-600'}`}>
            <a href="https://github.com/Vahidsk18/" target="_blank" rel="noopener noreferrer">
                <FaGithub className={`text-base transition-colors ${isDark ? 'hover:text-gray-300' : 'hover:text-gray-900'}`} />
            </a>
            <span>Made with ❤️ — ©Vsk {new Date().getFullYear()}</span>
        </footer>
    )
}