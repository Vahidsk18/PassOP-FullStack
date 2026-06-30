import React from 'react'
import { useTheme } from '../context_api/ThemeContext'
import { usePasswords } from '../hooks/usePasswords'
import PasswordForm from './PasswordForm'
import PasswordTable from './PasswordTable'
import Footer from './Footer'

export default function Manager() {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const {
        passwordArray,
        isLoading,
        form,
        editIndex,
        handleChange,
        savePassword,
        updatePassword,
        deletePassword,
        startEdit,
        decrypt,
    } = usePasswords()

    return (
        <div
            className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'bg-[#080C17]' : 'bg-[#e8f5ee]'}`}
            style={isDark
                ? { backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }
                : { backgroundImage: 'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }
            }
        >
            <div className="flex-1">
                <PasswordForm
                    form={form}
                    editIndex={editIndex}
                    handleChange={handleChange}
                    onSave={editIndex !== null ? updatePassword : savePassword}
                />

                <div className="mt-10">
                    <PasswordTable
                        passwordArray={passwordArray}
                        isLoading={isLoading}
                        onEdit={startEdit}
                        onDelete={deletePassword}
                        decrypt={decrypt}
                    />
                </div>
            </div>

            <Footer />
        </div>
    )
}