"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, PenTool, Code2, Rocket, CheckCircle2 } from "lucide-react"

export default function ProcessSection() {
    const [activeStep, setActiveStep] = useState(0)

    const steps = [
        {
            icon: <Search className="text-blue-500" size={18} />,
            title: "Recherche",
            desc: "Analyse des besoins et étude du marché.",
        },
        {
            icon: <PenTool className="text-purple-500" size={18} />,
            title: "Design",
            desc: "Création de maquettes UI/UX modernes.",
        },
        {
            icon: <Code2 className="text-amber-500" size={18} />,
            title: "Développement",
            desc: "Codage avec les dernières technologies.",
        },
        {
            icon: <Rocket className="text-emerald-500" size={18} />,
            title: "Lancement",
            desc: "Mise en ligne et optimisation finale.",
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [steps.length])

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-md font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/30">Notre Processus</h3>
                <div className="flex gap-1">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1 h-1 rounded-full transition-all duration-500 ${i === activeStep ? 'bg-purple-500 w-3' : 'bg-slate-200 dark:bg-white/10'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-4 relative">
                {/* Progress Line */}
                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-white/5" />

                {steps.map((step, index) => {
                    const isActive = index === activeStep

                    return (
                        <motion.div
                            key={index}
                            initial={false}
                            animate={{
                                opacity: isActive ? 1 : 0.4,
                                x: isActive ? 4 : 0,
                                scale: isActive ? 1.02 : 1
                            }}
                            className="relative flex gap-4 group cursor-default transition-all duration-500"
                        >
                            {/* Active Glow Effect */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className="absolute inset-0 bg-purple-500/5 dark:bg-purple-500/10 rounded-2xl -m-2 z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            <div className={`
                relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                ${isActive ? 'bg-white dark:bg-white/10 shadow-lg border border-purple-500/20' : 'bg-slate-100 dark:bg-white/5'}
              `}>
                                {step.icon}
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-white dark:bg-[#0f1115] rounded-full p-0.5 shadow-sm"
                                    >
                                        <CheckCircle2 size={12} className="text-purple-500 fill-purple-500/10" />
                                    </motion.div>
                                )}
                            </div>

                            <div className="flex-1 py-1 relative z-10">
                                <h4 className={`text-sm font-semibold transition-colors duration-500 ${isActive ? 'text-slate-800 dark:text-white' : 'text-slate-700 dark:text-white/80'
                                    }`}>
                                    {step.title}
                                </h4>
                                <p className={`text-[11px] leading-relaxed transition-colors duration-500 ${isActive ? 'text-slate-600 dark:text-white/50' : 'text-slate-600 dark:text-white/70'
                                    }`}>
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold shadow-lg shadow-purple-500/5 hover:opacity-90 transition-all"
                >
                    Démarrer un Projet
                </motion.button>
            </div>
        </div>
    )
}
