import React from 'react'
import { FidgetSpinner } from 'react-loader-spinner'
import { useTheme } from '../context_api/ThemeContext'
import PasswordRow from './PasswordRow'

export default function PasswordTable({ passwordArray, isLoading, onEdit, onDelete, decrypt }) {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
                <FidgetSpinner
                    visible
                    height="50"
                    width="50"
                    ariaLabel="fidget-spinner-loading"
                    wrapperClass="fidget-spinner-wrapper"
                    ballColors={['#22c55e', '#22c55e', '#22c55e']}
                    backgroundColor="#e2e8f0"
                />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Fetching your vault...
                </span>
            </div>
        )
    }

    if (passwordArray.length === 0) {
        return (
            <div className="flex justify-center">
                <div className={`flex items-center gap-3 px-8 py-4 rounded-3xl shadow-sm border ${isDark ? 'bg-[#0e1422] border-[#2a3350] text-gray-500' : 'bg-white border-green-200 text-gray-500'}`}>
                    <span className="text-xl">📭</span>
                    <span className="text-base font-medium">No Passwords Saved Yet</span>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 pb-10">
            <h2 className={`text-xl text-center font-bold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                Your Passwords
            </h2>

            <div
                className={`w-full overflow-x-auto no-scrollbar rounded-xl shadow-md border ${isDark ? 'border-[#2a3350]' : 'border-green-200'
                    }`}
            >
                <table className="min-w-full text-sm border-collapse">
                    <thead>
                        <tr className={isDark ? 'bg-[#0f1e35] text-green-400' : 'bg-[#2e7d4f] text-white'}>
                            {['S.No', 'Website', 'Username', 'Password', 'Actions'].map((h) => (
                                <th
                                    key={h}
                                    className="py-3 px-5 text-center font-semibold tracking-wide whitespace-nowrap"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {passwordArray.map((p, i) => (
                            <PasswordRow
                                key={p._id}
                                entry={p}
                                index={i}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                decrypt={decrypt}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}