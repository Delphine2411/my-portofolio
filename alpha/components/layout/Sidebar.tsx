"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Briefcase, Folder, Mail } from "lucide-react"

export default function Sidebar({
  active,
  setActive
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  const menuItems = [
    { id: "Accueil", icon: <Home size={20} />, label: "Accueil" },
    { id: "Àpropos", icon: <User size={20} />, label: "À propos" },
    { id: "Services", icon: <Briefcase size={20} />, label: "Services" },
    { id: "Projets", icon: <Folder size={20} />, label: "Projets" },
    { id: "Contact", icon: <Mail size={20} />, label: "Contact" },
  ]

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="lg:initial-none lg:animate-none bg-white dark:bg-[#14161c] border-t lg:border-t-0 lg:border-r border-slate-200 dark:border-white/10 flex flex-row lg:flex-col items-center justify-around lg:justify-start py-4 lg:py-6 gap-2 lg:gap-6 fixed lg:relative bottom-0 left-0 w-full lg:w-20 z-50 transition-colors"
    >
      {menuItems.map((item) => (
        <Icon
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={active === item.id}
          onClick={() => setActive(item.id)}
        />
      ))}
    </motion.div>
  )
}

function Icon({
  icon,
  label,
  isActive,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative w-full flex justify-center items-center">
      {/* Active Dot Indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="activeDot"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute left-0 w-1 h-5 bg-purple-500 rounded-r-full"
          />
        )}
      </AnimatePresence>

      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          p-2 rounded-xl cursor-pointer flex flex-col items-center gap-1 group transition-all duration-300 w-[75%]
          ${isActive
            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
            : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/40 hover:bg-slate-200 dark:hover:bg-white/10"}
        `}
      >
        <div className={`${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`}>
          {icon}
        </div>
        <span className={`text-[10px] ${isActive ? "text-purple-600 dark:text-purple-400" : "group-hover:text-slate-600 dark:group-hover:text-white/80"} transition-colors font-medium text-center`}>
          {label}
        </span>
      </motion.div>
    </div>
  )
}