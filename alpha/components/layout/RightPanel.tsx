"use client"

import { motion } from "framer-motion"
import Slider from "../ui/Slider"

export default function RightPanel() {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-50 dark:bg-[#14161c] border-l border-slate-200 dark:border-white/10 p-6 space-y-6 w-90 h-100 justify-center items-center transition-colors shadow-inner dark:shadow-none"
    >
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Adjust Colors</h2>

      <Section title="White Balance">
        <Slider label="Temperature" />
        <Slider label="Tint" />
      </Section>

      <Section title="Tone">
        <Slider label="Brightness" />
        <Slider label="Contrast" />
        <Slider label="Saturation" />
      </Section>

      {/*<Section title="Creative">
        <Slider label="Hue" />
        <Slider label="Sharpness" />
        <Slider label="Blur" />
        <Slider label="Opacity" />
      </Section>*/}
    </motion.div>
  )
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm text-slate-500 dark:text-white/60 font-medium uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  )
}