"use client"

import { motion } from "framer-motion"
import { Monitor, Smartphone, Palette, Zap, Cpu, BarChart3 } from "lucide-react"

export default function ServicesSection() {
    const services = [
        {
            icon: <Palette className="text-pink-500" />,
            title: "Design UI/UX",
            desc: "Interfaces intuitives et centrées utilisateur qui convertissent et fidélisent.",
            tags: ["Figma", "Prototypage", "User Research"]
        },
        {
            icon: <Monitor className="text-blue-500" />,
            title: "Web App Development",
            desc: "Applications web robustes utilisant les derniers frameworks modernes.",
            tags: ["Next.js", "React", "TypeScript"]
        },
        {
            icon: <Smartphone className="text-emerald-500" />,
            title: "Mobile Solutions",
            desc: "Expériences mobiles natives et cross-platform performantes.",
            tags: ["React Native", "Swift", "Flutter"]
        },
        {
            icon: <Cpu className="text-purple-500" />,
            title: "Systèmes Scalables",
            desc: "Architecture backend cloud puissante et APIs sécurisées.",
            tags: ["Node.js", "Go", "AWS"]
        },
        {
            icon: <BarChart3 className="text-amber-500" />,
            title: "Stratégie & SEO",
            desc: "Optimisation de votre visibilité et analyse de croissance.",
            tags: ["Analytics", "Marketing", "Audit"]
        },
        {
            icon: <Zap className="text-orange-500" />,
            title: "Performance",
            desc: "Optimisation de vitesse et de Core Web Vitals pour un web rapide.",
            tags: ["Lighthouse", "Edge", "Vercel"]
        }
    ]

    return (
        <div className="py-8 space-y-12">
            <div className="max-w-3xl">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Solutions Complètes pour votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Croissance</span></h2>
                <p className="text-slate-600 dark:text-white/40 text-lg leading-relaxed">
                    Nous transformons la complexité en simplicité. Notre approche holistique garantit que chaque aspect de votre produit numérique est optimisé pour le succès.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl hover:border-purple-500/20 transition-all group"
                    >
                        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl w-fit mb-6 group-hover:bg-purple-500/10 transition-colors">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{service.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-white/40 leading-relaxed mb-6 font-medium">
                            {service.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {service.tags.map(tag => (
                                <span key={tag} className="text-[10px] px-2 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/20 font-bold uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
