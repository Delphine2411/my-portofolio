"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

import TeamSection from "./TeamSection"

export default function AboutSection({ setActive }: { setActive?: (id: string) => void }) {
    const stats = [
        { label: "Projets", value: "14+", size: "w-48 h-48 lg:w-72 lg:h-72", z: "z-10", opacity: "bg-orange-500/10" },
        { label: "Expérience", value: "9.3+", size: "w-40 h-40 lg:w-56 lg:h-56", z: "z-20", opacity: "bg-orange-500/20" },
        { label: "Clients", value: "6.8+", size: "w-32 h-32 lg:w-40 lg:h-40", z: "z-30", opacity: "bg-orange-500/40" },
        { label: "Prix", value: "4+", size: "w-20 h-20 lg:w-24 lg:h-24", z: "z-40", opacity: "bg-orange-600" },
    ]

    return (
        <div className="space-y-16 py-8">
            {/* Intro section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                        Nous combinons <span className="text-orange-600">créativité</span> et <span className="text-orange-500">stratégie</span> pour des résultats exceptionnels.
                    </h2>
                    <p className="text-slate-600 dark:text-white/40 text-lg leading-relaxed">
                        Alpha Studio est un collectif de designers et développeurs passionnés par l&apos;innovation numérique. Nous aidons les entreprises à transformer leur vision en réalité tangible.
                    </p>
                    <div
                        onClick={() => setActive?.("Contact")}
                        className="flex items-center gap-4 pt-4 cursor-pointer group"
                    >
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-[#14161c] bg-slate-200 dark:bg-white/10 group-hover:border-orange-500/30 transition-all" />
                            ))}
                        </div>
                        <p className="text-sm font-bold text-slate-500 dark:text-white/30 tracking-widest uppercase group-hover:text-orange-500 transition-colors">Rencontrez l&apos;équipe</p>
                    </div>
                </motion.div>

                <div className="relative flex items-center justify-center py-20 lg:py-0">
                    <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-end justify-center">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                                className={`absolute rounded-full flex flex-col items-center justify-start pt-6 ${stat.size} ${stat.z} ${stat.opacity} shadow-2xl shadow-orange-500/10 border border-white/5`}
                                style={{
                                    bottom: 0,
                                }}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-xl font-bold text-orange-600/60 dark:text-orange-400/60">
                                        <span className="text-orange-600/40 dark:text-orange-400/40 mr-0.5"></span>
                                        {stat.value.replace('', '')}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <TeamSection />

            {/* Vision Section - Premium Redesign */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative group cursor-default"
            >
                {/* Dynamic Background Elements */}
                <div className="absolute inset-0 overflow-hidden rounded-[3.5rem]">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            x: [0, 50, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -90, 0],
                            x: [0, -50, 0],
                            y: [0, 30, 0]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-purple-500/10 blur-[120px] rounded-full"
                    />
                </div>

                {/* Glassmorphic Container */}
                <div className="relative z-10 p-8 lg:p-16 rounded-[2.5rem] lg:rounded-[3.5rem] bg-white/40 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:shadow-[0_48px_80px_-16px_rgba(249,115,22,0.15)] group-hover:-translate-y-2 group-hover:border-orange-500/20">
                    <div className="max-w-4xl space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="h-0.5 w-12 bg-orange-500" />
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-600 dark:text-orange-500">Notre Vision</span>
                        </div>

                        <h3 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                            Réinventer le futur <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-purple-600">à travers l&apos;excellence.</span>
                        </h3>
                        <p className="text-xl lg:text-2xl text-slate-600 dark:text-white/60 leading-relaxed font-medium">
                            &quot;Nous croyons en un web où la <span className="text-slate-900 dark:text-white">beauté visuelle</span> ne sacrifie jamais la <span className="text-slate-900 dark:text-white">performance</span>. Notre mission est de démocratiser l&apos;exceptionnel en créant des solutions qui inspirent, engagent et transforment durablement.&quot;
                        </p>
                        <div className="pt-8 flex flex-wrap gap-12">
                            <div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">100%</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Impact</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">∞</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Innovation</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">0</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">Compromis</p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Icon */}
                    <div className="absolute top-10 lg:top-16 right-10 lg:right-16 cursor-pointer">
                        <div className="p-4 rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-500/20 hover:scale-110 active:scale-95 transition-all">
                            <Sparkles size={24} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
