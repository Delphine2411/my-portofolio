"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function CircularCarousel() {
    const items = [
        { src: "/p1.png", name: "Denis NOUDEKE", role: "Backend Developer" },
        { src: "/p2.png", name: "Delphine KPANKPAN", role: "Frontend Developer" },
        { src: "/p3.png", name: "Mr Gaillardo", role: "Project Manager" },
        { src: "/p4.png", name: "Mr Pierre", role: "CEO" },
    ]
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [items.length])

    return (
        <div className="p-6 flex flex-col items-center gap-8">
            <div className="relative w-64 h-64 transition-colors">
                {/* Animated Rings from user's image */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-white opacity-20 dark:opacity-20" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-4px] rounded-full border-b-2 border-purple-500 opacity-50 transition-colors"
                />

                <div className="absolute inset-2 rounded-full border-2 border-slate-100 dark:border-white/10 transition-colors" />

                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-[#1a1c22] shadow-2xl transition-colors">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={index}
                            src={items[index].src}
                            initial={{ opacity: 0, scale: 1.1, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
                            transition={{ duration: 1 }}
                            className="w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </div>
            </div>

            <div className="text-center h-16">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
                            {items[index].name}
                        </h3>
                        <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{items[index].role}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex gap-2">
                {items.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === index ? "bg-purple-500 w-4" : "bg-white/10"
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}
