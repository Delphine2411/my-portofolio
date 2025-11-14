"use client";

import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaFacebook, FaPhone } from "react-icons/fa";
import Link from 'next/link';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function ContactSection() {
  const canvasRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Configuration de la scène
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ff88, 2, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00cc66, 1.5, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Création des sphères avec géométrie et matériau
    const spheres = [];
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

    // Sphère 1
    const material1 = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x00ff88,
      emissiveIntensity: 0.2
    });
    const sphere1 = new THREE.Mesh(sphereGeometry, material1);
    sphere1.position.set(-3, 2, -5);
    scene.add(sphere1);
    spheres.push({ mesh: sphere1, speed: 0.5, offset: 0 });

    // Sphère 2
    const material2 = new THREE.MeshStandardMaterial({
      color: 0x00cc66,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x00cc66,
      emissiveIntensity: 0.2
    });
    const sphere2 = new THREE.Mesh(sphereGeometry, material2);
    sphere2.position.set(3, -2, -8);
    scene.add(sphere2);
    spheres.push({ mesh: sphere2, speed: 0.7, offset: Math.PI });

    // Sphère 3
    const material3 = new THREE.MeshStandardMaterial({
      color: 0x00ff44,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x00ff44,
      emissiveIntensity: 0.2
    });
    const sphere3 = new THREE.Mesh(sphereGeometry, material3);
    sphere3.position.set(0, 0, -10);
    scene.add(sphere3);
    spheres.push({ mesh: sphere3, speed: 0.3, offset: Math.PI / 2 });

    // Particules
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotation et mouvement des sphères
      spheres.forEach(({ mesh, speed, offset }) => {
        mesh.rotation.x = Math.sin(time * speed + offset) * 0.3;
        mesh.rotation.y = Math.cos(time * speed + offset) * 0.3;
        mesh.position.y += Math.sin(time * speed + offset) * 0.002;
      });

      // Rotation des particules
      particles.rotation.y = time * 0.1;
      particles.rotation.x = time * 0.05;

      // Animation des lumières
      pointLight1.position.x = Math.sin(time * 0.5) * 5;
      pointLight1.position.y = Math.cos(time * 0.5) * 5;

      renderer.render(scene, camera);
    }

    animate();

    // Gestion du redimensionnement
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Nettoyage
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      sphereGeometry.dispose();
      material1.dispose();
      material2.dispose();
      material3.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("✅ Message envoyé avec succès !");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        alert("❌ Échec de l’envoi. Réessaie plus tard.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("⚠️ Une erreur est survenue.");
    }
  };

  

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Canvas 3D en arrière-plan */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Effet de vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/60 to-black pointer-events-none" />

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-bold text-center mb-16"
        >
          <span className="text-white">Contacter </span>
          <span className="text-[#10b981]">Moi</span>
        </motion.h1>

        <div className="flex items-center gap-5 mt-8">


          
        </div>
{/* Barre latérale fixe d'icônes sociales */}
<motion.div
  initial={{ x: -80, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="fixed left-15 mt-12 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 text-[#10b981] text-4xl z-50"
>
  {/* Ligne décorative */}
  <div className="w-[2px] h-20 bg-[#10b981]/50 mb-2" />

  {/* Icônes */}
  <Link
    href="https://github.com/awogbin2411"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Profil GitHub de Delphine Kpankpan"
  >
    <FaGithub className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
  </Link>

  <Link
    href="https://www.linkedin.com/in/delphine-kpankpan"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Profil LinkedIn de Delphine Kpankpan"
  >
    <FaLinkedin className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
  </Link>

  <Link
    href="mailto:delphinekpankpan11@gmail.com"
    aria-label="Envoyer un email"
  >
    <FaEnvelope className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
  </Link>

  <Link
    href="https://www.facebook.com/ton.profil"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Profil Facebook de Delphine Kpankpan"
  >
    <FaFacebook className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
  </Link>

  <Link
    href="tel:+22943832687"
    aria-label="Appeler Delphine Kpankpan"
  >
    <FaPhone className="cursor-pointer hover:text-white hover:scale-125 transition-transform duration-300" />
  </Link>

  {/* Ligne décorative */}
  <div className="w-[2px] h-20 bg-[#10b981]/50 mt-2" />
</motion.div>

        {/* Grille du formulaire */}
        <div className="grid md:grid-cols-[1fr,1.2fr] gap-6 mt-8">
          {/* Colonne gauche - Champs de saisie */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-5"
          >
            {['fullName', 'email', 'phone', 'subject'].map((field, index) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  placeholder={
                    field === 'fullName' ? 'Full Name' :
                      field === 'email' ? 'Email' :
                        field === 'phone' ? 'Phone Number' :
                          'Subject'
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-6 py-3.5 bg-transparent border-2 border-[#10b981] rounded-full text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Colonne droite - Message et bouton */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex-1"
            >
              <textarea
                name="message"
                placeholder="Ton Message"
                value={formData.message}
                onChange={handleChange}
                rows="7"
                className="w-full h-full px-6 py-4 bg-transparent border-2 border-[#10b981] rounded-3xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-500/20 transition-all duration-300 resize-none"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 136, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="px-10 py-3.5 bg-[#10b981] hover:bg-green-400 text-black font-semibold rounded-full transition-all duration-300 self-start shadow-lg shadow-green-500/30"
            >
              Envoyer un Message
            </motion.button>
          </motion.div>
        </div>

        {/* Badge flottant */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute -bottom-8 -right-50 md:bottom-0 md:right-0"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-red-500"
          >
            <div className="text-center leading-tight ">
              <div className="text-red-600 font-bold text-[10px]">I LOVE</div>
              <div className="text-red-600 font-bold text-[10px]">MY JOBS</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}