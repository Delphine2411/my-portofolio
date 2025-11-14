"use client";
// components/Hero3D.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Mesh } from "three";
import { useEffect, useRef, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

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

  // Quand le texte en h2 finit, on affiche le bouton
  useEffect(() => {
    const totalTypingTime = 7000 + 1000; // délai du <p> + délai du <h2>
    const timer = setTimeout(() => setShowButton(true), totalTypingTime);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 1]} />
        <OrbitControls enableZoom={false} />
        
        {/* 3 sphères avec des vitesses et couleurs différentes */}
        <MovingSphere color="#dd0606" speed={1.5} offset={0} />
        <MovingSphere color="#10b981" speed={1.2} offset={2} />
        <MovingSphere color="#f59e0b" speed={1.0} offset={4} />
      </Canvas>

      <div className="absolute text-center text-white">
        
        <h1 className="text-5xl font-bold">Salut, je suis Awogbin 👋</h1>
        <p className="text-lg mt-3">
  <TypeAnimation
    sequence={[
      "Développeur Web  & Designer 3D & Créateur de portfolio",  
     
      
    ]}
    wrapper="span"
    cursor={true}
    repeat={0}
    style={{ display: "inline-block" }}
  />
</p>

<h2 className="text-3xl mt-5">
  <TypeAnimation
    sequence={[
      5000, // délai avant de commencer l'animation du h2 (12s ici)
      "Bienvenue dans mon espace personnel !", 2000,
    ]}
    wrapper="span"
    cursor={true}
    repeat={0}
    style={{ display: "inline-block" }}
  />
</h2>

{/* --- BOUTON 3D ANIMÉ --- */}
<Link href={"/home"}>
      {showButton && (
        <motion.button
          // --- Apparition cinématique ---
          initial={{ y: 100, scale: 0.5, opacity: 0 }}
          animate={{
            y: 0,
            scale: [1, 1.1, 1], // petit rebond
            opacity: [0, 1, 1],
          }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94], // courbe naturelle "easeOutBack"
          }}
          // --- Clignotement permanent ---
          whileInView={{
            opacity: [1, 0.6, 1],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: 1.2, // commence après apparition
            },
          }}
          whileHover={{
            scale: 1.15,
            rotateY: 10,
            boxShadow: "0px 0px 25px #f59e0b",
          }}
          className="mt-8 px-10 py-3 bg-[#10b985] text-white font-semibold rounded-xl shadow-lg hover:bg-transparent transition-all duration-300"
        >
         Lisez-moi !
        </motion.button>
      )}
    </Link>

      </div>
    </div>
  );
}
