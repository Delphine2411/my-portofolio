"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function TeamSection() {
    const team = [
        {
            src: "/p1.png",
            name: "Denis NOUDEKE",
            role: "Backend Developer",
            bio: "Expert en design d'interface et développement full-stack avec une passion pour les expériences utilisateur fluides.",
            socials: [Twitter, Github, Linkedin]
        },
        {
            src: "/p2.png",
            name: "KPANKPAN Delphine",
            role: "Frontend Developer",
            bio: "Spécialiste React et Next.js, Marc transforme les designs complexes en code performant et accessible.",
            socials: [Twitter, Github, Linkedin]
        },
        {
            src: "/p3.png",
            name: "Mr Gaillardo",
            role: "Project Manager",
            bio: "Julien se concentre sur la psychologie de l'utilisateur pour créer des parcours intuitifs et engageants.",
            socials: [Twitter, Github, Linkedin]
        },
        {
            src: "/p4.png",
            name: "Mr Pierre",
            role: "UX/UI Designer",
            bio: "Sophie assure la cohérence entre la vision du client et l'exécution technique pour un succès garanti.",
            socials: [Twitter, Github, Linkedin]
        },
    ]

    return (
        <div className="space-y-12">
            <div className="max-w-2xl">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic uppercase tracking-tighter">Notre Équipe</h3>
                <p className="text-slate-500 dark:text-white/40 font-medium">Les visages derrière vos projets les plus ambitieux.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative flex flex-col bg-white dark:bg-white/5 rounded-[2.5rem] p-6 border border-slate-200 dark:border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/5"
                    >
                        <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6">
                            <Image
                                src={member.src}
                                alt={member.name}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{member.name}</h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500">{member.role}</p>
                            <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed font-medium pt-2 line-clamp-3">
                                {member.bio}
                            </p>
                        </div>

                        <div className="flex gap-3 pt-6 mt-auto border-t border-slate-100 dark:border-white/5">
                            {member.socials.map((Icon, j) => (
                                <button key={j} className="text-slate-400 hover:text-orange-500 transition-colors">
                                    <Icon size={16} />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
