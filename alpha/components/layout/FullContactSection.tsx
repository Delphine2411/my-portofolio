import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, MapPin, Mail, Phone, Github, Linkedin, MessageSquare, CheckCircle2 } from "lucide-react"

export default function FullContactSection({ setActive }: { setActive?: (id: string) => void }) {
    const [selectedTag, setSelectedTag] = useState("Nouveau Projet")
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = () => {
        setIsSent(true)
        setTimeout(() => setIsSent(false), 3000)
    }

    return (
        <div className="py-8 space-y-12">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Discutons de votre <span className="text-blue-600">Vision</span></h2>
                <p className="text-slate-600 dark:text-white/40 text-lg font-medium leading-relaxed">
                    Que vous ayez une question ou un projet ambitieux, nous sommes là pour vous aider à franchir la prochaine étape.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="col-span-1 lg:col-span-2 space-y-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 pl-1">Nom Complet</label>
                            <input
                                placeholder="Votre nom"
                                className="w-full p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-purple-500/50 transition-all text-slate-800 dark:text-white placeholder:text-slate-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 pl-1">Email</label>
                            <input
                                placeholder="votre@email.com"
                                className="w-full p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-purple-500/50 transition-all text-slate-800 dark:text-white placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 pl-1">Sujet de Conversation</label>
                        <div className="flex flex-wrap gap-2">
                            {["Nouveau Projet", "Collaboration", "Question", "Autre"].map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-4 py-2 rounded-xl border transition-all text-xs font-bold ${selectedTag === tag ? 'bg-purple-500 text-white border-purple-500' : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/40 hover:bg-purple-500/10 hover:text-purple-500'}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 pl-1">Message</label>
                        <textarea
                            rows={5}
                            placeholder="Dites-nous tout..."
                            className="w-full p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 outline-none focus:border-purple-500/50 transition-all text-slate-800 dark:text-white placeholder:text-slate-300 resize-none"
                        />
                    </div>

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {isSent ? (
                                <motion.div
                                    key="sent"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex items-center gap-3 text-emerald-500 font-black text-sm"
                                >
                                    <CheckCircle2 size={24} />
                                    Message envoyé avec succès !
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="button"
                                    onClick={handleSubmit}
                                    className="px-10 py-5 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-black font-black text-sm flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-purple-500/20"
                                >
                                    Envoyer le Message
                                    <Send size={18} />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Contact info side */}
                <div className="space-y-10 col-span-1">
                    <div className="p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] bg-white dark:bg-white/20 border border-slate-200 dark:border-white/10 shadow-xl space-y-8">
                        <div className="flex gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl max-h-fit">
                                <MapPin className="text-blue-500" size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white">Localisation</h4>
                                <p className="text-xs text-slate-500 dark:text-white/40 font-medium mt-1">Cotonou, Bénin</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="p-3 bg-purple-500/10 rounded-xl max-h-fit">
                                <Mail className="text-purple-500" size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white">Email</h4>
                                <a
                                    href="mailto:contact@alpha-studio.com"
                                    className="text-xs text-slate-500 dark:text-white/40 font-medium mt-1 hover:text-purple-500 transition-colors"
                                >
                                    contact@alpha-studio.com
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="p-3 bg-emerald-500/10 rounded-xl max-h-fit">
                                <Phone className="text-emerald-500" size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-800 dark:text-white">Téléphone</h4>
                                <a
                                    href="tel:+2290166373921"
                                    className="text-xs text-slate-500 dark:text-white/40 font-medium mt-1 hover:text-emerald-500 transition-colors"
                                >
                                    +229 01 66 37 39 21
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 px-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20">Suivez-nous</h4>
                        <div className="flex gap-4">
                            {[
                                { Icon: Github, href: "https://github.com/alpha-studio" },
                                { Icon: Linkedin, href: "https://linkedin.com/company/alpha-studio" },
                                { Icon: MessageSquare, href: "https://twitter.com/alpha_studio" }
                            ].map(({ Icon, href }, i) => (
                                <motion.a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(168, 85, 247, 0.1)" }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-400 hover:text-purple-500 transition-all flex items-center justify-center"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
