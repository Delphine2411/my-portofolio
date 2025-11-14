"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';
import CTASection from './cta_section';

// Section Hero avec animation 3D
function HeroSection() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(0x00FF66, 2);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(0xff6b35, 1.5);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Cubes flottants
        const cubes: THREE.Mesh[] = [];
        for (let i = 0; i < 10; i++) {
          const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
          const material = new THREE.MeshStandardMaterial({
            color: i % 2 === 0 ? 0x00FF66 : 0xff6b35,
            metalness: 0.8,
            roughness: 0.2
          });
          const cube = new THREE.Mesh(geometry, material);
          cube.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          );
          scene.add(cube);
          cubes.push(cube);
        }

    let time = 0;
    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;
      
      cubes.forEach((cube, i) => {
        cube.rotation.x = time * (0.5 + i * 0.1);
        cube.rotation.y = time * (0.3 + i * 0.1);
        cube.position.y = Math.sin(time + i) * 2;
      });

      pointLight1.position.x = Math.sin(time) * 5;
      pointLight2.position.x = Math.cos(time) * 5;

      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
      <motion.div style={{ y }} className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6"
        >
          Mes <span className="text-[#10b981]">Réalisations</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
        >
          Découvrez mes projets créatifs et innovants
        </motion.p>
      </motion.div>
    </section>
  );
}

// Section Filtres
type FilterSectionProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};
function FilterSection({ activeFilter, setActiveFilter }: FilterSectionProps) {
  const filters = ['Tous', 'Web Design', 'Application', '3D Design', 'UI/UX', 'Branding'];

  return (
    <section className="bg-gray-900 py-12 sticky top-0 z-40 backdrop-blur-md bg-gray-900/80 border-b border-[#00FF66]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-[#10b981] text-black shadow-lg shadow-[#10b981]/50'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

// Carte de projet avec effet 3D
type Project = {
  id?: number;
  title: string;
  description: string;
  category: string;
  year: string;
  tags: string[];
  gradient: string;
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gray-800 rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Image du projet */}
      <div className="relative h-64 bg-gradient-to-br from-[#10b981]/20 to-gray-900 overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full flex items-center justify-center"
        >
          <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${project.gradient} blur-2xl`} />
        </motion.div>
        
        {/* Overlay au hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center"
        >
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
            className="px-6 py-3 bg-[#10b981] text-black font-bold rounded-full hover:bg-[#10b981]/90"
          >
            Voir le projet
          </motion.button>
        </motion.div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-[#10b981]/20 text-[#10b981] text-xs font-semibold rounded-full">
            {project.category}
          </span>
          <span className="text-gray-500 text-sm">{project.year}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Section Projets avec grille
function ProjectsSection({ activeFilter }: { activeFilter: string }) {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Une plateforme e-commerce moderne avec paiement intégré",
      category: "Web Design",
      year: "2024",
      tags: ["Next.js", "Stripe", "Tailwind"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Portfolio 3D",
      description: "Portfolio interactif avec animations Three.js",
      category: "3D Design",
      year: "2024",
      tags: ["Three.js", "React", "GSAP"],
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Mobile Banking App",
      description: "Application bancaire avec interface intuitive",
      category: "Application",
      year: "2023",
      tags: ["React Native", "Firebase", "UI/UX"],
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "Brand Identity Design",
      description: "Identité visuelle complète pour startup tech",
      category: "Branding",
      year: "2023",
      tags: ["Logo", "Charte", "Print"],
      gradient: "from-pink-500 to-purple-600"
    },
    {
      id: 5,
      title: "Dashboard Analytics",
      description: "Interface d'analyse de données en temps réel",
      category: "UI/UX",
      year: "2024",
      tags: ["Figma", "React", "Chart.js"],
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      id: 6,
      title: "Streaming Platform",
      description: "Plateforme de streaming vidéo avec lecteur personnalisé",
      category: "Web Design",
      year: "2023",
      tags: ["Next.js", "Video.js", "AWS"],
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  const filteredProjects = activeFilter === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// Section Processus avec timeline
function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Découverte",
      description: "Analyse des besoins et définition des objectifs",
      icon: "🔍"
    },
    {
      number: "02",
      title: "Conception",
      description: "Création des maquettes et prototypes interactifs",
      icon: "✏️"
    },
    {
      number: "03",
      title: "Développement",
      description: "Codage et intégration des fonctionnalités",
      icon: "💻"
    },
    {
      number: "04",
      title: "Livraison",
      description: "Tests, déploiement et formation",
      icon: "🚀"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-black to-gray-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white text-center mb-16"
        >
          Mon <span className="text-[#10b981]">Processus</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative bg-gray-800 rounded-2xl p-6 border-2 border-[#10b981]/30 hover:border-[#00FF66] transition-all"
            >
              <div className="text-6xl mb-4">{step.icon}</div>
              <div className="text-[#10b981] text-5xl font-bold mb-2 opacity-20">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section Témoignages
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marie Dupont",
      role: "CEO, TechStart",
      text: "Un travail exceptionnel ! Le projet a dépassé toutes nos attentes. L'attention aux détails et la créativité sont remarquables.",
      rating: 5
    },
    {
      name: "Jean Martin",
      role: "Directeur Marketing",
      text: "Collaboration fluide et résultats impressionnants. Je recommande vivement pour tout projet web.",
      rating: 5
    },
    {
      name: "Sophie Bernard",
      role: "Founder, DesignCo",
      text: "Expertise technique et sens du design parfaitement combinés. Un vrai plaisir de travailler ensemble.",
      rating: 5
    }
  ];

  return (
    <section className="bg-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white text-center mb-16"
        >
          Ce qu&ldquo;ils <span className="text-[#10b981]">disent</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-[#00FF66]/50 transition-all"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-[#10b981] text-2xl">★</span>
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">{testimonial.text}</p>
              <div>
                <p className="text-white font-bold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section CTA


// Page principale
export default function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState('Tous');

  return (
    <div className="bg-black min-h-screen">
      <HeroSection />
      <FilterSection activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <ProjectsSection activeFilter={activeFilter} />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}