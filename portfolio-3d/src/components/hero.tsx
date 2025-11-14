"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaFacebook } from "react-icons/fa";
import { useLanguage } from "@/src/components/contexts/language_context";
import { useEffect } from "react";

export default function HeroSection() {
   const texts = {
    fr: {
      title: "Télécharger le CV",
      role: "Développeuse Full Stack & Analyste-Économiste",
      intro: `Forte d’une double compétence en développement Full Stack et en analyse économique, 
      je m’investis dans la création de solutions logicielles fiables, performantes et pertinentes. 
      Mon approche repose sur la rigueur, la curiosité et une volonté constante d’apprendre. 
      J’accorde une importance particulière à la compréhension des besoins métiers afin de proposer des produits innovants et à forte valeur ajoutée.`,
      desc: `Passionnée par la création de solutions performantes, j’aime transformer des idées en produits concrets et utiles. 
      Les défis sont pour moi une source de motivation et d’innovation. Mon objectif : concevoir des logiciels intelligents et efficaces,
      capables de répondre avec précision aux besoins réels des utilisateurs.`,
      button: "Découvrir mes réalisations",
    },
    en: {
      title: "Download CV",
      role: "Full Stack Developer & Economic Analyst",
      intro: `I stand out for my rigor, curiosity, and commitment to continuous learning.`,
      desc: `Passionate about creating high-performance solutions, I love turning ideas into concrete, useful products. 
      Challenges are my main source of motivation and innovation. My goal is to design smart, efficient software 
      that truly meets users’ needs.`,
      button: "View My Work",
    },
  };
const { language, setLanguage } = useLanguage();
 // Sauvegarder la langue
  useEffect(() => {
  document.documentElement.setAttribute("lang", language);
}, [language]);

  const t = texts[language as keyof typeof texts] || texts.en;
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black  text-white flex items-center justify-center px-10 lg:py-0 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-10">
        {/* --- TEXTE À GAUCHE --- */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          
          <h1 className="text-6xl font-bold mt-3">KOUKOU Awogbin
          </h1>
          <h3 className="text-2xl mt-3 text-[#10b981] font-semibold">
             {t.role}
          </h3>
          <p className="text-gray-300 mt-4 max-w-md">
            {t.intro}
          </p>

          {/* --- Bouton + Icônes --- */}
          <div className="flex items-center gap-5 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 bg-transparent border-2 border-[#10b981] text-[#10b981] font-semibold rounded-full hover:bg-[#10b981] hover:text-black transition-all"
            >
              <FaDownload className="inline-block mr-2" />
              {t.title}
            </motion.button>

            <div className="flex gap-4 text-[#10b981] text-2xl">
              <FaLinkedin className="cursor-pointer hover:text-white" />
              <FaGithub className="cursor-pointer hover:text-white" />
              <FaEnvelope className="cursor-pointer hover:text-white" />
              <FaFacebook className="cursor-pointer hover:text-white" />
            </div>
          </div>
        </motion.div>

        {/* --- IMAGE AVEC ANIMATION 3D --- */}
      <div className="relative flex items-center justify-center w-[385px] h-[385px]">
      {/* --- Conteneur de l'image --- */}
      
<img src="/image/copilot.png" alt="Kladmok" className="w-full h-full objet-cover" />
      {/* --- Premier demi-cercle (entre) --- */}
      

      {/* --- Second demi-cercle (sort, rotation inverse) --- */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        className="absolute w-[420px] h-[420px] rounded-full border-b-[6px] border-[#10b981] border-l-transparent border-r-transparent border-t-transparent"
        style={{
          //boxShadow: "0 0 20px rgba(0,255,102,0.3)",
        }}
      ></motion.div>
    </div>

      </div>
    </section>
  );
}
