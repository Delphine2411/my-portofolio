"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export default function TopPreview() {
  return (
    <div className="min-h-[400px] lg:h-[40%] flex flex-col items-start justify-center px-6 lg:px-12 py-12 lg:py-0 bg-white dark:bg-[#111318] relative transition-colors overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -ml-24 -mb-24" />

      <div className="relative z-10 max-w-2xl space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/*<span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            Available for New Projects
          </span>*/}
          <h1 className="text-3xl lg:text-5xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
            Transformons vos idées en <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Réalité Digitale</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-slate-500 dark:text-white/40 leading-relaxed font-medium"
        >
          Design UI/UX d&apos;exception et développement full-stack pour des expériences web mémorables et performantes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="justify-center items-center gap-4 pt-4"
        >
          <button className="px-8 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-500/10">
            Voir mes Projets
            <ArrowUpRight size={18} />
          </button>

          {/* <button className="px-6 py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white/60 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
            <PlayCircle size={18} />
            Démo Vidéo
          </button>*/}
        </motion.div>
      </div>



    </div>
  )
}