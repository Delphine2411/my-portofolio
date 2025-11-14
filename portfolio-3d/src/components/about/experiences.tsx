"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context";
import { useEffect } from "react";

export default function ExperienceSection() {
  // 🌍 Langue sélectionnée
  //const [lang, setLang] = useState("fr");

  // 🌍 Textes multilingues
  type Language = "fr" | "en" | "es";

  interface Experience {
    year: string;
    title: string;
    company: string;
    description: string;
  }

  const texts: Record<Language, { title: string; markerTitle: string; experiences: Experience[] }> = {
    fr: {
      title: "Expériences Professionnelles",
      markerTitle: "Expérience",
      experiences: [
        {
          year: "2025 - Présent",
          title: "Développeuse Full Stack Junior",
          company: "Freelance",
          description:
            "Je conçois et développe des applications web modernes avec Next.js et Three.js.",
        },
        {
          year: "18/04 - 01/10/2025",
          title: "Développeuse Front-End",
          company: "Globodai",
          description:
            "Création d'interfaces utilisateur réactives et interactives pour divers clients.",
        },
      ],
    },

    en: {
      title: "Work Experience",
      markerTitle: "Experience",
      experiences: [
        {
          year: "2025 - Present",
          title: "Junior Full Stack Developer",
          company: "Freelance",
          description:
            "Developing modern and high-performance web applications using Next.js and Three.js.",
        },
        {
          year: "18/04 - 01/10/2025",
          title: "Front-End Developer",
          company: "Globodai",
          description:
            "Built responsive and interactive user interfaces for various clients.",
        },
      ],
    },

    es: {
      title: "Experiencia Laboral",
      markerTitle: "Experiencia",
      experiences: [
        {
          year: "2025 - Presente",
          title: "Desarrolladora Full Stack Junior",
          company: "Freelance",
          description:
            "Desarrollo aplicaciones web modernas y de alto rendimiento con Next.js y Three.js.",
        },
        {
          year: "18/04 - 01/10/2025",
          title: "Desarrolladora Front-End",
          company: "Globodai",
          description:
            "Creación de interfaces de usuario responsivas e interactivas para varios clientes.",
        },
      ],
    },
  };

  const { language, setLanguage } = useLanguage();
   // Sauvegarder la langue
    useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);
  
    const content = texts[language as Language] || texts.en;

  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

       

        {/* Titre */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white text-center mb-16"
        >
          {content.title.split(" ")[0]}{" "}
          <span className="text-[#10b981]">
            {content.title.replace(content.title.split(" ")[0], "")}
          </span>
        </motion.h2>

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#10b981]/30" />

          {content.experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0
                  ? "md:pr-1/2 md:text-right"
                  : "md:pl-1/2 md:ml-auto md:text-left"
              } md:w-1/2`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 border-2 border-[#10b981]/30 rounded-2xl p-6 hover:border-[#10b981] transition-all"
              >
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#10b981] rounded-full" />

                <span className="text-[#10b981] font-bold text-sm">
                  {exp.year}
                </span>

                <h3 className="text-2xl font-bold text-white mt-2">
                  {exp.title}
                </h3>

                <p className="text-gray-400 font-semibold">{exp.company}</p>

                <p className="text-gray-500 mt-2">{exp.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
