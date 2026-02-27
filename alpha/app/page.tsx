"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Sidebar from "@/components/layout/Sidebar"
import TopPreview from "@/components/layout/TopPreview"
import Timeline from "@/components/layout/Timeline"
import CircularCarousel from "@/components/layout/CircularCarousel"
import ThemeToggle from "@/components/layout/ThemeToggle"
import ProcessSection from "@/components/layout/ProcessSection"
import AboutSection from "@/components/layout/AboutSection"
import ServicesSection from "@/components/layout/ServicesSection"
import ProjectsSection from "@/components/layout/ProjectsSection"
import FullContactSection from "@/components/layout/FullContactSection"

export default function Home() {
  const [active, setActive] = useState("Accueil")

  const getSubTitle = (id: string) => {
    switch (id) {
      case "Àpropos": return "Apprenez-en plus sur notre studio et notre vision."
      case "Services": return "Découvrez comment nous pouvons propulser votre business."
      case "Projets": return "Une immersion dans nos réalisations les plus ambitieuses."
      case "Contact": return "Dites-nous bonjour et parlons de votre projet."
      default: return ""
    }
  }

  return (
    <div className="h-screen bg-white dark:bg-[#0f1115] text-slate-900 dark:text-white lg:overflow-hidden transition-colors duration-300">
      <div className="flex flex-col lg:grid lg:grid-cols-[80px_1fr] h-full">

        <Sidebar active={active} setActive={setActive} />

        <main className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {active === "Accueil" ? (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col lg:grid lg:grid-cols-[280px_1fr_320px] h-full pb-32 lg:pb-0 overflow-y-auto lg:overflow-hidden"
              >
                {/* 0. Mobile TopBar - Order 0 on Mobile, Hidden on Desktop */}
                <div className="order-0 lg:hidden p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between bg-slate-50 dark:bg-[#14161c] shrink-0 sticky top-0 z-10 transition-colors">
                  <h2 className="text-lg font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">Alpha</h2>
                  <ThemeToggle />
                </div>

                {/* 1. Hero / TopPreview - Order 1 on Mobile, Middle on Desktop */}
                <div className="order-1 lg:col-start-2 lg:row-start-1 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f1115] transition-colors min-h-[400px] lg:h-[40%] flex flex-col shrink-0">
                  <TopPreview setActive={setActive} />
                </div>

                {/* 2. Process Section - Order 2 on Mobile, Left on Desktop */}
                <div className="order-2 lg:col-start-1 lg:row-span-2 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#14161c] transition-colors shrink-0">
                  <div className="hidden lg:flex p-4 border-b border-slate-200 dark:border-white/5 items-center justify-between">
                    <h2 className="text-lg font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">Alpha</h2>
                    <ThemeToggle />
                  </div>
                  <ProcessSection setActive={setActive} />
                </div>

                {/* 3. Equipe / CircularCarousel - Order 3 on Mobile, Right on Desktop */}
                <div className="order-3 lg:col-start-3 lg:row-span-2 flex flex-col bg-slate-50 dark:bg-[#14161c] transition-colors border-b lg:border-b-0 border-slate-200 dark:border-white/10 shrink-0">
                  <h2 className="text-lg font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40 p-4 text-center">Equipe</h2>
                  <CircularCarousel />
                </div>

                {/* 4. Timeline / Restons en contact - Order 4 on Mobile, Middle Bottom on Desktop */}
                <div className="order-4 lg:col-start-2 lg:row-start-2 border-r border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0d0f13] transition-colors lg:h-[60%] flex flex-col shrink-0">
                  <Timeline setActive={setActive} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                transition={{ duration: 0.4 }}
                className="h-full w-full overflow-y-auto bg-slate-50 dark:bg-[#0f1115] p-8 lg:p-12 pb-32 lg:pb-12 transition-colors"
              >
                <div className="max-w-6xl mx-auto space-y-12">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-8">
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                        {active === "Àpropos" ? "À propos" : active}
                      </h1>
                      <p className="text-slate-500 dark:text-white/40 font-medium">
                        {getSubTitle(active)}
                      </p>
                    </div>
                    <ThemeToggle />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {active === "Àpropos" && <AboutSection setActive={setActive} />}
                    {active === "Services" && <ServicesSection setActive={setActive} />}
                    {active === "Projets" && <ProjectsSection setActive={setActive} />}
                    {active === "Contact" && <FullContactSection setActive={setActive} />}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}