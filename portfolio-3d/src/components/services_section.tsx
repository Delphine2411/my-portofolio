"use client";

import { FaCode, FaPaintBrush, FaDesktop } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈

const translations = {
  fr: {
    sectionTitle: "Ce que je ferai pour vous",
    button: "En savoir plus",
    services: [
      {
        title: "Création Graphique & Identité Visuelle",
        description:
          "Je conçois des visuels percutants, modernes et cohérents avec votre marque. Logos, affiches, bannières ou interfaces, chaque création vise à refléter votre personnalité et à capter l’attention dès le premier regard.",
      },
      {
        title: "Développement Web sur Mesure",
        description:
          "Je développe des sites et applications performants, responsives et optimisés pour le référencement (SEO). Que ce soit un portfolio, un site vitrine ou une plateforme dynamique, chaque ligne de code est pensée pour la fluidité et l’impact.",
      },
      {
        title: "Design UI/UX & Expérience Utilisateur",
        description:
          "J’allie esthétique et ergonomie pour créer des interfaces intuitives, engageantes et centrées sur l’utilisateur. Mon objectif : offrir une expérience fluide et agréable, où chaque interaction a du sens.",
      },
    ],
  },
  en: {
    sectionTitle: "What I’ll do for you",
    button: "Read More",
    services: [
      {
        title: "Graphic Design & Brand Identity",
        description:
          "I craft bold and modern visuals that reflect your brand’s essence. From logos and posters to web interfaces, each design aims to capture attention and tell your story through impactful visuals.",
      },
      {
        title: "Custom Web Development",
        description:
          "I build responsive, high-performance websites and applications, optimized for SEO and user experience. Whether it’s a portfolio, business site, or complex platform, every line of code serves clarity and efficiency.",
      },
      {
        title: "UI/UX Design & User Experience",
        description:
          "I blend creativity with usability to design intuitive, engaging, and accessible interfaces. My goal: make each interaction seamless and meaningful, leaving a lasting impression on every user.",
      },
    ],
  },
  es: {
    sectionTitle: "Lo que haré por ti",
    button: "Leer más",
    services: [
      {
        title: "Diseño Gráfico e Identidad de Marca",
        description:
          "Creo visuales modernos y llamativos que reflejan la esencia de tu marca. Desde logotipos y carteles hasta interfaces web, cada diseño busca captar la atención y contar tu historia.",
      },
      {
        title: "Desarrollo Web Personalizado",
        description:
          "Construyo sitios web y aplicaciones responsivas y de alto rendimiento, optimizados para SEO y experiencia de usuario. Ya sea un portafolio, sitio empresarial o plataforma compleja, cada línea de código está pensada para la eficiencia.",
      },
      {
        title: "Diseño UI/UX y Experiencia de Usuario",
        description:
          "Combino creatividad y usabilidad para diseñar interfaces intuitivas, atractivas y accesibles. Mi objetivo: hacer que cada interacción sea fluida y significativa.",
      },
    ],
  },
};

export default function ServicesSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const icons = [FaPaintBrush, FaCode, FaDesktop];

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="lg:text-4xl text-3xl font-bold mt-2 text-[#10b981]">{t.sectionTitle}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {t.services.map((service, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={index}
              initial="initial"
              whileInView="visible"
              whileHover="hovered"
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl text-center border border-[#10b981] shadow-lg overflow-hidden perspective-1000 flex flex-col h-full"
            >
              {/* Background Layer with 3D Rotation */}
              <motion.div
                className="absolute inset-0 bg-[#0a0a0a] bg-opacity-40 z-0 origin-center"
                variants={{
                  initial: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: index * 0.2 } },
                  hovered: {
                    rotateY: 15,
                    rotateX: 5,
                    scale: 1.1,
                    boxShadow: "0px 0px 40px rgba(16, 185, 129, 0.2)",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                  }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              {/* Fixed Content Section */}
              <motion.div
                className="relative z-10 flex flex-col h-full"
                variants={{
                  initial: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.2 + 0.2 } },
                  hovered: { scale: 1.02 }
                }}
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 flex items-center justify-center bg-[#1a0f3d] rounded-full shadow-inner border border-[#10b981]/30"
                  >
                    <Icon size={40} className="text-[#10b981]" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed flex-grow">{service.description}</p>
                <div className="mt-auto">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(16, 185, 129, 0.6)",
                      }}
                      className="px-6 py-2 bg-[#10b981] text-black font-semibold rounded-full shadow-lg hover:bg-emerald-400 transition-all font-inter"
                    >
                      {t.button}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
