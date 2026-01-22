"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈

type StatKey = "projects" | "clients" | "awards" | "Months";

const translations = {
  fr: {
    stats: [
      { label: "Projets finis", value: 4, key: "projects" },
      { label: "Clients heureux", value: 4, key: "clients" },
      { label: "Projets personnels", value: 3, key: "awards" },
      { label: "Années d'expérience", value: 1, key: "Months" },
    ],
  },
  en: {
    stats: [
      { label: "Completed Projects", value: 4, key: "projects" },
      { label: "Happy Clients", value: 4, key: "clients" },
      { label: "Personal Projects", value: 3, key: "awards" },
      { label: "Years of Experience", value: 1, key: "Months" },
    ],
  },
  es: {
    stats: [
      { label: "Proyectos terminados", value: 4, key: "projects" },
      { label: "Clientes satisfechos", value: 4, key: "clients" },
      { label: "Proyectos personales", value: 3, key: "awards" },
      { label: "Años de experiencia", value: 1, key: "Months" },
    ],
  },
};

function StatsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const [counts, setCounts] = useState<Record<StatKey, number>>({
    projects: 0,
    clients: 0,
    awards: 0,
    Months: 0,
  });

  useEffect(() => {
    t.stats.forEach((stat) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCounts((prev) => ({ ...prev, [stat.key]: end }));
          clearInterval(timer);
        } else {
          setCounts((prev) => ({ ...prev, [stat.key]: Math.floor(start) }));
        }
      }, 16);
    });
  }, [t.stats]);

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-black py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {t.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-[#10b981] mb-2">
                {counts[stat.key as StatKey]}+
              </div>
              <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
