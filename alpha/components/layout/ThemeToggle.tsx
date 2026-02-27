"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const theme = localStorage.getItem("theme")
            return theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
        }
        return true
    })

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDark])

    const toggleTheme = () => {
        const newTheme = !isDark
        setIsDark(newTheme)
        if (newTheme) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }

    return (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group"
        >
            {isDark ? (
                <Sun size={24} className="text-white/40 group-hover:text-amber-400 transition-colors" />
            ) : (
                <Moon size={24} className="text-black/40 group-hover:text-indigo-600 transition-colors" />
            )}
        </motion.button>
    )
}
