"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈
import ProcessSection from './process_section';
import TestimonialSection from './testimonials_section';
import * as THREE from 'three';
import Link from 'next/link';
import CTASection from './cta_section';

const translations = {
  fr: {
    heroTitle1: "Mes",
    heroTitle: "Réalisations",
    heroSubtitle: "Découvrez mes projets créatifs et innovants",
    filters: ["Tous", "Web Design", "Application", "3D Design", "UI/UX", "Branding"],
    viewProject: "Voir le projet",
  },
  en: {
    heroTitle1: "My",
    heroTitle: "Projects",
    heroSubtitle: "Explore my creative and innovative works",
    filters: ["All", "Web Design", "Application", "3D Design", "UI/UX", "Branding"],
    viewProject: "View Project",
  },
  es: {
    heroTitle1: "Mis",
    heroTitle: "Proyectos",
    heroSubtitle: "Descubre mis proyectos creativos e innovadores",
    filters: ["Todos", "Diseño Web", "Aplicación", "Diseño 3D", "UI/UX", "Branding"],
    viewProject: "Ver Proyecto",
  },
};

// Section Hero avec animation 3D
function HeroSection() {
  const canvasRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];
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
           {t.heroTitle1} <span className="text-[#10b981]">{t.heroTitle}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
        >
          {t.heroSubtitle}
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
export function FilterSection({ activeFilter, setActiveFilter }: FilterSectionProps) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="bg-gray-900 py-12 sticky top-0 z-40 backdrop-blur-md bg-gray-900/80 border-b border-[#00FF66]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4">
          {t.filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-[#10b981] text-black shadow-lg shadow-[#10b981]/50"
                  : "bg-gray-800 text-white hover:bg-gray-700"
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
  year?: string;
  tags?: string[];
  gradient?: string;
  link?: string;
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const year = project.year ?? "";
  const tags = project.tags ?? [];
  const gradient = project.gradient ?? "from-gray-600 to-gray-800";
  const link = project.link ?? "#";

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
          <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${gradient} blur-2xl`} />
        </motion.div>
        
        {/* Overlay au hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/60 flex items-center justify-center"
        >
          <Link href={link}>
            <motion.button
          
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ delay: 0.1 }}
            className="px-6 py-3 bg-[#10b981] text-black font-bold rounded-full hover:bg-[#10b981]/90"
          >
            {t.viewProject}
            
          </motion.button>
            </Link>
          
        </motion.div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-[#10b981]/20 text-[#10b981] text-xs font-semibold rounded-full">
            {project.category}
          </span>
          {year && <span className="text-gray-500 text-sm">{year}</span>}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
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
  const translations = {
  fr: {
    categories: {
      all: "Tous",
      web: "Web Design",
      app: "Application",
      branding: "Branding",
      uiux: "UI/UX",
      three: "3D Design",
    },
    projects: [
      {
        id: 1,
        title: "Plateforme E-Commerce",
        description: "Une plateforme d'apprentissage moderne avec paiement intégré",
        category: "Application",
      },
      {
        id: 2,
        title: "Portfolio 3D",
        description: "Portfolio interactif avec animations",
        category: "3D Design",
      },
      {
        id: 3,
        title: "Application web pour les visas et voyages",
        description: "Application Govisa avec interface intuitive",
        category: "Application",
      },
      {
        id: 4,
        title: "Application web pour les entrepreneurs",
        description: "Propulser les idées d’entreprise des startups grâce aux mentors, aux experts ou à des agents IA.",
        category: "Application",
      },
      ///{
       // id: 5,
       // title: "Dashboard Analytics",
        //description: "Interface d'analyse de données en temps réel",
        //category: "UI/UX",
     // },
     // {
       // id: 6,
        //title: "Plateforme de Streaming",
        //description: "Plateforme de streaming vidéo avec lecteur personnalisé",
       // category: "Web Design",
      //},
    ],
  },
  en: {
    categories: {
      all: "All",
      web: "Web Design",
      app: "Application",
      branding: "Branding",
      uiux: "UI/UX",
      three: "3D Design",
    },
    projects: [
      {
        id: 1,
        title: "E-Commerce Platform",
        description: "A modern learning platform with integrated payment",
        category: "Application",
      },
      {
        id: 2,
        title: "3D Portfolio",
        description: "Interactive portfolio with animations",
        category: "3D Design",
      },
      {
        id: 3,
        title: "Web application for visas and travel",
        description: "Govisa app with intuitive interface",
        category: "Application",
      },
      {
        id: 4,
        title: "Web application for entrepreneurs",
        description: "Boosting startup business ideas with mentors, experts, or AI agents.",
        category: "Application",
      },
     // {
       // id: 5,
        //title: "Dashboard Analytics",
        //description: "Real-time data analytics interface",
        //category: "UI/UX",
     // },
      //{
        //id: 6,
        //title: "Streaming Platform",
       // description: "Video streaming platform with custom player",
       // category: "Web Design",
      //},
    ],
  },
  es: {
    categories: {
      all: "Todos",
      web: "Diseño Web",
      app: "Aplicación",
      branding: "Branding",
      uiux: "UI/UX",
      three: "Diseño 3D",
    },
    projects: [
      {
        id: 1,
        title: "Plataforma E-Commerce",
        description: "Una plataforma de aprendizaje moderna con pago integrado",
        category: "Diseño Web",
      },
      {
        id: 2,
        title: "Portafolio 3D",
        description: "Portafolio interactivo con animaciones",
        category: "Diseño 3D",
      },
      {
        id: 3,
        title: "Aplicación web para visas y viajes",
        description: "Aplicación Govisa con interfaz intuitiva",
        category: "Aplicación",
      },
      {
        id: 4,
        title: "Aplicación web para emprendedores",
        description: "Impulsar las ideas empresariales de las startups con mentores, expertos o agentes de IA.",
        category: "Aplicación",
      },
     // {
       // id: 5,
       // title: "Dashboard de Analítica",
       // description: "Interfaz de análisis de datos en tiempo real",
       // category: "UI/UX",
      //},
     // {
       // id: 6,
       // title: "Plataforma de Streaming",
        //description: "Plataforma de video con reproductor personalizado",
        //category: "Diseño Web",
     // },
    ],
  },
};

const projectMeta = [
  {
    id: 1,
    year: "2025",
    tags: ["Next.js", "UI/UX", "Tailwindcss"],
    gradient: "from-blue-500 to-purple-600",
    link: "https://akambiconsulting.com/",
  },
  {
    id: 2,
    year: "2025",
    tags: ["Next.js", "Tailwindcss", "Three.js"],
    gradient: "from-green-500 to-teal-600",
    link: "https://my-portofolio-delphine.vercel.app/",
  },
  {
    id: 3,
    year: "2025",
    tags: ["Next.js", "Tailwindcss", "UI/UX"],
    gradient: "from-orange-500 to-red-600",
    link: "https://govisa-stg-5527065b3b0a.herokuapp.com/fr",
  },
  {
    id: 4,
    year: "2025",
    tags: ["Next.js", "Tailwindcss", "UI/UX"],
    gradient: "from-pink-500 to-purple-600",
    link: "https://startup-mentor-stg-d27dfe3fd64e.herokuapp.com/",
  },
 // {
   // id: 5,
   // year: "2024",
   // tags: ["Figma", "React", "Chart.js"],
   // gradient: "from-cyan-500 to-blue-600",
   // link: "/",
 // },
 // {
  //  id: 6,
   // year: "2023",
  //  tags: ["Next.js", "Video.js", "AWS"],
  //  gradient: "from-yellow-500 to-orange-600",
   // link: "/",
 // },
];
  const { language } = useLanguage();
  const t = translations[language];

  const translatedFilter = Object.values(t.categories).includes(activeFilter)
    ? activeFilter
    : t.categories.all;

  const filteredProjects =
    translatedFilter === t.categories.all
      ? t.projects
      : t.projects.filter((p) => p.category === translatedFilter);

  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={translatedFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => {
              const meta = projectMeta.find((m) => m.id === project.id);
              return (
                <ProjectCard
                  key={project.id}
                  project={{ ...project, ...meta }}
                  index={index}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
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
      <TestimonialSection />
      <CTASection />
    </div>
  );
}