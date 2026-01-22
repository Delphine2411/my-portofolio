"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from "@/src/components/contexts/language_context";
import { useEffect } from "react";



// Section Bio avec cartes animées
function BioSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const texts = {
    fr: {
      title: "À propos de moi",
      role: "Développeuse Full Stack & Analyste-Économiste",
      intro: `Je me distingue par ma rigueur, ma curiosité et mon engagement dans un apprentissage continu.`,
      desc: `Passionnée par la création de solutions performantes, j’aime transformer des idées en produits concrets et utiles. 
      Les défis sont pour moi une source de motivation et d’innovation. Mon objectif : concevoir des logiciels intelligents et efficaces,
      capables de répondre avec précision aux besoins réels des utilisateurs.`,
      button: "Découvrir mes réalisations",
      button1: "Télécharger CV",
      me: "Je suis "
    },
    en: {
      title: "About Me",
      role: "Full Stack Developer & Economic Analyst",
      intro: `I stand out for my rigor, curiosity, and commitment to continuous learning.`,
      desc: `Passionate about creating high-performance solutions, I love turning ideas into concrete, useful products. 
      Challenges are my main source of motivation and innovation. My goal is to design smart, efficient software 
      that truly meets users’ needs.`,
      button: "View My Work",
      button1: "Download CV",
      me: "I'm "
    },
    es: {
  title: "Sobre Mí",
  role: "Desarrolladora Full Stack y Analista Económica",
  intro: `Me destaco por mi rigor, curiosidad y compromiso con el aprendizaje continuo.`,
  desc: `Apasionada por la creación de soluciones de alto rendimiento, me encanta transformar ideas en productos concretos y útiles. 
  Los desafíos son mi principal fuente de motivación e innovación. Mi objetivo es diseñar software inteligente y eficiente 
  que realmente satisfaga las necesidades de los usuarios.`,
  button: "Ver Mis Proyectos",
  button1: "Descargar CV",
  me: "Soy ",
},

  };

  const { language, setLanguage } = useLanguage();
   // Sauvegarder la langue
    useEffect(() => {
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const t = texts[language as keyof typeof texts] || texts.en;

  

  return (
    <section className="relative bg-gradient-to-b from-black to-gray-900 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative w-full aspect-square bg-gradient-to-br from-[#00FF66]/20 to-gray-800 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF66]/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/image/da.png" alt="Kladmok" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-16 -right-16">
                <div className="w-64 h-64 bg-[#00FF66]/30 rounded-full blur-3xl animate-pulse" />
              </div>
             
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-5xl font-bold text-white">
              {t.me} <span className="text-[#10b981]">Delphine KPANKPAN</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
               {t.intro}
            </p>
            <p className="text-gray-400 leading-relaxed">
             {t.desc}
            </p>
            <a
              href="/files/CV_Delphine_KPANKPAN.pdf"
              download="CV_Delphine_KPANKPAN.pdf"
            >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 102, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#10b981] text-black font-bold rounded-full hover:bg-[#10b981]/90 transition-all"
            >
              {t.button1}
            </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default BioSection;