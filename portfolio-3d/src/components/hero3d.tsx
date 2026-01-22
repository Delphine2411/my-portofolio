"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Mesh } from "three";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

// 🌍 Sphère animée
function MovingSphere({ color, speed, offset }: { color: string; speed: number; offset: number }) {
  const meshRef = useRef<Mesh | null>(null);


  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    meshRef.current.position.x = Math.sin(clock.getElapsedTime() * speed + offset) * 8;
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * speed * 0.5) * 1.8;
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <MeshDistortMaterial color={color} distort={0.3} speed={speed} />
    </Sphere>
  );
}

export default function Hero3D() {
  const [showButton, setShowButton] = useState(false);
  const [lang, setLang] = useState<"fr" | "en" | "es">("fr"); // 🌍 Langue par défaut

  // 🌍 Textes multilingues
  const text = {
    fr: {
      hello: "Salut 👋, je suis",
      job: "Développeuse Web / Mobile Full Stack & Designer 3D & Créateur de portfolio",
      welcome: "Bienvenue dans mon espace personnel !",
      button: "Lisez-moi !",
    },
    en: {
      hello: "Hi 👋, I'm ",
      job: "Web / Mobile Full Stack Developer & 3D Designer & Portfolio Creator",
      welcome: "Welcome to my personal space!",
      button: "Read Me!",
    },
    es: {
      hello: "Hola 👋, soy",
      job: "Desarrollador Web / Mobile Full Stack & Diseñador 3D & Creador de Portafolios",
      welcome: "¡Bienvenido a mi espacio personal!",
      button: "Léeme!",
    },
  };

  // Affichage du bouton après l'animation
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">

      {/* 🌍 Sélecteur de langue */}
      <div className="absolute top-6 right-6 z-50 flex gap-3">
        {["fr", "en", "es"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l as "fr" | "en" | "es")}
            className={`px-4 py-1 rounded-full border transition ${lang === l
                ? "bg-[#10b981] text-black border-[#10b981]"
                : "border-gray-600 text-white hover:bg-gray-800"
              }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* --- SCÈNE 3D --- */}
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 1]} />
        <OrbitControls enableZoom={false} />

        <MovingSphere color="#dd0606" speed={1.5} offset={0} />
        <MovingSphere color="#10b981" speed={1.2} offset={2} />
        <MovingSphere color="#f59e0b" speed={1.0} offset={4} />
      </Canvas>

      {/* --- CONTENU TEXTE --- */}
      <div className="absolute text-center text-white">

        {/* Titre */}
        <h1 className="lg:text-5xl text-3xl font-bold">{text[lang].hello}</h1>

        {/* Job animé */}
        <p className="lg:text-lg mt-3 text-[#10b981]">
          <TypeAnimation
            key={lang}
            sequence={[text[lang].job]}
            wrapper="span"
            cursor={true}
            repeat={0}
            style={{ display: "inline-block" }}
          />
        </p>

        {/* Sous-texte animé */}
        <h2 className="lg:text-3xl text-2xl text-gray-400 mt-5">
          <TypeAnimation
            key={lang}  // ⭐ Force le composant à se recréer quand la langue change
            sequence={[
              5000,
              text[lang].welcome,
              2000
            ]}
            wrapper="span"
            cursor={true}
            repeat={0}
            style={{ display: "inline-block" }}
          />
        </h2>

        {/* --- BOUTON ANIMÉ --- */}
        <Link href={"/home"}>
          {showButton && (
            <motion.button
              initial={{ y: 100, scale: 0.5, opacity: 0 }}
              animate={{
                y: 0,
                scale: [1, 1.1, 1],
                opacity: [0, 1, 1],
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileInView={{
                opacity: [1, 0.6, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1.2,
                },
              }}
              whileHover={{
                scale: 1.15,
                rotateY: 10,
                boxShadow: "0px 0px 25px #f59e0b",
              }}
              className="mt-8 px-10 py-3 bg-[#10b981] text-white font-semibold rounded-xl shadow-lg hover:bg-transparent transition-all duration-300"
            >
              {text[lang].button}
            </motion.button>
          )}
        </Link>
      </div>
    </div>
  );
}
