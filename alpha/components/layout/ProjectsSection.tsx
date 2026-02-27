"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

export default function ProjectsSection() {
    const projects = [
        {
            title: "Fintech Dashboard",
            category: "Product Design",
            image: "/p1.png",
            color: "from-blue-500",
            link: "/"
        },
        {
            title: "AI Chat Interface",
            category: "Development",
            image: "/p2.png",
            color: "from-purple-500",
            link: "/"

        },
        {
            title: "E-commerce Redesign",
            category: "UI/UX",
            image: "/p3.png",
            color: "from-emerald-500",
            link: "/"
        },
        {
            title: "NFT Marketplace",
            category: "Branding",
            image: "/p4.png",
            color: "from-pink-500",
            link: ""
        },
        {
            title: "Crypto Wallet",
            category: "Security",
            image: "/p1.png",
            color: "from-amber-500",
            link: "/"

        },
        {
            title: "Travel App",
            category: "Mobile",
            image: "/p2.png",
            color: "from-blue-400",
            link: "/"
        }
    ]

    return (
        <div className="py-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-0.5 w-10 bg-orange-500" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-600 dark:text-orange-500">Portfolio</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter">
                        Une immersion dans <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-purple-600">nos réalisations.</span>
                    </h2>
                </div>
                <div className="flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10">
                    {["All", "Design", "Dev"].map(filter => (
                        <button key={filter} className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${filter === "All" ? 'bg-white dark:bg-white/10 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white/60'}`}>
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative h-[450px] rounded-[3rem] overflow-hidden cursor-pointer"
                    >
                        {/* Interactive Background */}
                        <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${project.color} to-slate-900 transition-all duration-700 group-hover:scale-110`}
                        />

                        {/* Decorative Blur Element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/20 blur-[80px] rounded-full group-hover:bg-white/30 transition-all duration-700" />

                        {/* Content Overlay - Glassmorphism */}
                        <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-white shadow-xl"
                                >
                                    {project.category}
                                </motion.span>

                                <div className="flex gap-3 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                                    <button className="p-3 rounded-2xl bg-white text-slate-900 hover:bg-orange-500 hover:text-white transition-all shadow-xl">
                                        <ExternalLink size={20} />
                                    </button>
                                    <button className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-xl">
                                        <Github size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <motion.div
                                    className="space-y-2 translate-y-6 group-hover:translate-y-0 transition-transform duration-500"
                                >
                                    <h3 className="text-3xl lg:text-5xl font-black text-white leading-none tracking-tighter italic">
                                        {project.title.split(' ')[0]} <br />
                                        <span className="text-white/40 group-hover:text-white transition-colors duration-700">
                                            {project.title.split(' ').slice(1).join(' ')}
                                        </span>
                                    </h3>
                                    <p className="text-white/40 text-xs lg:text-sm font-medium max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                        Une approche innovante mêlant design d&apos;exception et performance technique pour une expérience utilisateur inégalée.
                                    </p>
                                </motion.div>

                                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-transparent transition-all duration-1000 ease-out" />
                            </div>
                        </div>

                        {/* Hover Border Glow */}
                        <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/20 rounded-[3rem] transition-colors duration-700" />
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center pt-8">
                <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                    Voir toutes les réalisations
                    <div className="p-1 rounded-full bg-white/10 dark:bg-black/10 group-hover:translate-x-1 transition-transform">
                        <ExternalLink size={12} />
                    </div>
                </button>
            </div>
        </div>
    )
}
