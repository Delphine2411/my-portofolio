"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

export default function Footer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 🎬 Configuration de la scène Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // 💡 Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x10b981, 2, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // 🌀 Création du torus (cercle 3D)
    const torusGeometry = new THREE.TorusGeometry(2, 0.1, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x10b981,
      emissiveIntensity: 0.3,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI / 4;
    scene.add(torus);

    // ✨ Particules flottantes
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 🔁 Animation
    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      torus.rotation.y = time * 0.5;
      torus.rotation.z = time * 0.3;
      particles.rotation.y = time * 0.1;

      pointLight.position.x = Math.sin(time) * 3;
      pointLight.position.y = Math.cos(time) * 3;

      renderer.render(scene, camera);
    }
    animate();

    // 📱 Responsive
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  // 🔤 Animations Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* 🎨 Canvas 3D en arrière-plan */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
        style={{ width: "100%", height: "100%" }}
      />

      {/* 🌐 Contenu du footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12 items-start"
        >
          {/* 🎯 Bloc gauche */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              CONSTRUISONS<br />
              QUELQUE CHOSE D’EXCEPTIONNEL
            </h2>
            <p className="text-gray-400 text-sm">
              N’hésitez pas à me contacter pour vos projets, collaborations ou
              simplement pour échanger quelques idées.
            </p>
          </motion.div>

          {/* 🔁 Cercle animé */}
          <motion.div
            variants={itemVariants}
            className="flex justify-end items-center"
          >
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
                    DISPONIBLE POUR DES PROJETS • DISPONIBLE POUR DES PROJETS •
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

        {/* 📬 Informations de contact */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-8 mt-8 pt-12 border-t border-gray-800"
        >
          {/* Email */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              ME CONTACTER
            </h3>
            <motion.a
              href="mailto:kpankpand@gmail.com"
              whileHover={{ x: 5, color: "#10b981" }}
              className="text-lg transition-colors"
            >
              kpankpand@gmail.com
            </motion.a>
          </motion.div>

          {/* Téléphone */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              WHATSAPP
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
          <motion.div variants={itemVariants}>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
              SUIVEZ-MOI
            </h3>
            <div className="space-y-2">
              {["Facebook", "TikTok", "Instagram", "LinkedIn"].map((social) => (
                <motion.a
                  key={social}
                  href={`#${social.toLowerCase()}`}
                  whileHover={{ x: 5, color: "#10b981" }}
                  className="block text-lg transition-colors"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600"
        >
          <p>© 2025, Tous droits réservés</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>
              Design & Développement :{" "}
              <span className="text-[#10b981]">Awogbin Kpankpan</span>
            </span>
            <span>
              Propulsé par{" "}
              <span className="text-[#10b981]">Next.js & Three.js</span>
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
