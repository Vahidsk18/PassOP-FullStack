import { useTheme } from "../context_api/ThemeContext";

export default function AuthErrorHandler({ children, error }) {

    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (!error) return children;

    return (
        <div
            className={`min-h-screen flex flex-col items-center justify-center px-4 ${isDark
                ? "bg-[#080C17] text-white"
                : "bg-[#e8f5ee] text-gray-800"
                }`}
        >
            <div
                className={`max-w-md w-full text-center p-8 rounded-2xl shadow-lg border ${isDark
                    ? "bg-[#0e1422] border-[#2a3350]"
                    : "bg-white border-green-200"
                    }`}
            >
                <div className="text-5xl mb-4">
                    ⚠️
                </div>

                <h1 className="text-2xl font-bold mb-2">
                    Something went wrong
                </h1>

                <p
                    className={`text-sm mb-6 ${isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                        }`}
                >
                    {error.message}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">

                    <button
                        onClick={() =>
                            window.location.replace("/")
                        }
                        className="px-5 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
                    >
                        Go Home
                    </button>

                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                        className={`px-5 py-2 rounded-full border text-sm font-semibold ${isDark
                            ? "border-[#2a3350] text-gray-300"
                            : "border-green-300 text-green-600"
                            }`}
                    >
                        Try Again
                    </button>

                </div>

            </div>
        </div>
    );
}