"use client"

import { motion } from "framer-motion"
import { Mail, Phone, ExternalLink } from "lucide-react"

export default function Timeline() {
  const contacts = [
    {
      icon: <Mail className="text-purple-500" size={24} />,
      label: "Email",
      value: "contact@alpha-studio.com",
      href: "mailto:contact@alpha-studio.com"
    },
    {
      icon: <Phone className="text-blue-500" size={24} />,
      label: "Téléphone",
      value: "+229 01 66 37 39 21",
      href: "tel:+2290166373921"
    }
  ]

  return (
    <div className="h-auto lg:h-[40%] bg-slate-50 dark:bg-[#0d0f13] border-t border-slate-200 dark:border-white/10 p-6 transition-colors">
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-white/20 mb-2">Restons en Contact</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.href}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white dark:bg-[#181a20] rounded-2xl p-5 shadow-sm dark:shadow-none border border-slate-200 dark:border-white/5 flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl group-hover:bg-purple-500/10 dark:group-hover:bg-purple-500/10 transition-colors">
                  {contact.icon}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/30 mb-0.5">{contact.label}</p>
                  <p className="text-sm font-semibold text-slate-700 dark:text-white/90">{contact.value}</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-slate-300 dark:text-white/10 group-hover:text-purple-500 transition-colors" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}