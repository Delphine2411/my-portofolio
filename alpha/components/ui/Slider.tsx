"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function Slider({ label }: { label: string }) {
  const [value, setValue] = useState(50)

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-500 dark:text-white/60">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <motion.input
        type="range"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        whileTap={{ scale: 1.02 }}
        className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
      />
    </div>
  )
}