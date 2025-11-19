"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
//mport { useLanguage } from ""; // ton contexte
import { useLanguage } from "@/src/components/contexts/language_context";
import * as THREE from "three";


const footerText = {
  fr: {
    title1: "CONSTRUISONS",
    title2: "QUELQUE CHOSE D’EXCEPTIONNEL",
    subtitle: "N’hésitez pas à me contacter pour vos projets, collaborations ou simplement pour échanger quelques idées.",
    circleText: "DISPONIBLE POUR DES PROJETS • DISPONIBLE POUR DES PROJETS •",
    contact: "ME CONTACTER",
    whatsapp: "WHATSAPP",
    follow: "SUIVEZ-MOI",
    rights: "Tous droits réservés",
    design: "Design & Développement",
    powered: "Propulsé par",
  },

  en: {
    title1: "LET’S BUILD",
    title2: "SOMETHING EXCEPTIONAL",
    subtitle: "Feel free to contact me for projects, collaborations, or just to share ideas.",
    circleText: "AVAILABLE FOR PROJECTS • AVAILABLE FOR PROJECTS •",
    contact: "CONTACT ME",
    whatsapp: "WHATSAPP",
    follow: "FOLLOW ME",
    rights: "All rights reserved",
    design: "Design & Development",
    powered: "Powered by",
  },

  es: {
    title1: "CONSTRUYAMOS",
    title2: "ALGO EXCEPCIONAL",
    subtitle: "No dudes en contactarme para proyectos, colaboraciones o simplemente para compartir ideas.",
    circleText: "DISPONIBLE PARA PROYECTOS • DISPONIBLE PARA PROYECTOS •",
    contact: "CONTACTARME",
    whatsapp: "WHATSAPP",
    follow: "SÍGUEME",
    rights: "Todos los derechos reservados",
    design: "Diseño & Desarrollo",
    powered: "Desarrollado con",
  },
};

export default function Footer() {
  const { language: lang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // --- Ton animation Three.js ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 150, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function animate() {
      if (!canvas) return;
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* --- TITRES --- */}
        <motion.div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {footerText[lang].title1} <br /> {footerText[lang].title2}
            </h2>

            <p className="text-gray-400 text-sm">
              {footerText[lang].subtitle}
            </p>
          </motion.div>

          {/* Cercle animé */}
          <motion.div className="flex justify-end items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="relative w-48 h-48"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                  />
                </defs>

                <text className="text-[10px] fill-[#10b981] font-semibold tracking-wider">
                  <textPath href="#circlePath">
                    {footerText[lang].circleText}
                  </textPath>
                </text>
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-[#10b981] flex items-center justify-center"
                >
                  <span className="text-2xl">→</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* --- CONTACT --- */}
        <motion.div className="grid md:grid-cols-3 gap-8 mt-8 pt-12 border-t border-gray-800">
          {/* Email */}
          <motion.div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              {footerText[lang].contact}
            </h3>
            <motion.a
              href="mailto:delphinekpankpan11@gmail.com"
              whileHover={{ x: 5, color: "#10b981" }}
              className="text-lg transition-colors"
            >
              delphinekpankpan11@gmail.com
            </motion.a>
          </motion.div>

          {/* WhatsApp */}
          <motion.div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              {footerText[lang].whatsapp}
            </h3>
            <motion.a
              href="tel:+22961961587"
              whileHover={{ x: 5, color: "#10b981" }}
              className="text-lg transition-colors"
            >
              +229 61 96 15 87
            </motion.a>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              {footerText[lang].follow}
            </h3>
            <div className="space-y-2">
              {[ "LinkedIn"].map((social) => (
                <motion.a
                  key={social}
                  href="https://www.linkedin.com/in/delphine-kpankpan"
                  whileHover={{ x: 5, color: "#10b981" }}
                  className="block text-lg transition-colors"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* --- COPYRIGHT --- */}
        <motion.div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2025, {footerText[lang].rights}</p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <span>
              {footerText[lang].design}:{" "}
              <span className="text-[#10b981]">Delphine Kpankpan</span>
            </span>
            <span>
              {footerText[lang].powered}:{" "}
              <span className="text-[#10b981]">Next.js & Three.js</span>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}