"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈
import ProcessSection from './process_section';
import TestimonialSection from './testimonials_section';
import * as THREE from 'three';
import Link from 'next/link';
import Image from 'next/image';
import CTASection from './cta_section';

const translations = {
  fr: {
    heroTitle1: "Mes",
    heroTitle: "Réalisations",
    heroSubtitle: "Découvrez mes projets créatifs et innovants",
    filters: ["Tous", "Front-End", "FullStack", "Backend", "UI/UX", "3D Design"],
    viewProject: "Voir le projet",
  },
  en: {
    heroTitle1: "My",
    heroTitle: "Projects",
    heroSubtitle: "Explore my creative and innovative works",
    filters: ["All", "Front-End", "FullStack", "Backend", "UI/UX", "3D Design"],
    viewProject: "View Project",
  },
  es: {
    heroTitle1: "Mis",
    heroTitle: "Proyectos",
    heroSubtitle: "Descubre mis proyectos creativos e innovadores",
    filters: ["Todos", "Front-End", "FullStack", "Backend", "UI/UX", "3D Design"],
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
              className={`px-6 py-3 rounded-full font-semibold transition-all ${activeFilter === filter
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
  image?: string;
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
      initial={{ opacity: 1, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gray-800 rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Image du projet */}
      <div className="relative h-64 bg-gradient-to-br from-[#10b981]/20 to-gray-900 overflow-hidden shrink-0">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full flex items-center justify-center"
        >
          <Image
            src={project.image || ''}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
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
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-[#10b981]/20 text-[#10b981] text-xs font-semibold rounded-full">
            {project.category}
          </span>
          {year && <span className="text-gray-500 text-sm">{year}</span>}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
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
        web: "Front-End",
        app: "FullStack",
        branding: "Backend",
        uiux: "UI/UX",
        three: "3D Design",
      },
      projects: [
        { id: 1, title: "Plateforme E-Commerce", description: "Une plateforme d'apprentissage moderne avec paiement intégré", category: "Front-End" },
        { id: 2, title: "Portfolio 3D", description: "Portfolio interactif avec animations", category: "FullStack", },
        { id: 3, title: "Application web pour les visas et voyages", description: "Application Govisa avec interface intuitive", category: "Front-End" },
        { id: 4, title: "Un site web", description: "Une interface regroupant les differents reseaux sociaux de l'enfant d'or.", category: "3D Design" },
        { id: 5, title: "Application web pour les entrepreneurs", description: "Propulser les idées d’entreprise des startups grâce aux mentors, aux experts ou à des agents IA.", category: "Front-End" },
        { id: 6, title: "Portfolio 3D", description: "Site web 3D interactif pour la presentation de la structure MINDSET-TIC.", category: "3D Design" },
        { id: 7, title: "Portfolio 3d", description: "Portfolio 3D interactif pour la presentation du profile de Denis N..", category: "3D Design" },
        { id: 8, title: "Application web pour les voitures et motos", description: "Plateforme E-commerce pour la gestion de contrat d'achat/vente et troc de voiture et de moto", category: "FullStack" },
       // { id: 9, title: "Application web", description: "AgriLink est une plateforme numérique qui connecte les producteurs agricoles, les investisseurs et les consommateurs afin de dynamiser la chaîne de valeur agricole au Bénin.", category: "FullStack" },
        { id: 10, title: "Site web pour Alpha Bcom", description: "Site web pour présenter les services de Alpha Bcom", category: "FullStack" },
        //{ id: 11, title: "Site ebook de Boaz", description: "Site pour la vente de document", category: "FullStack" },
      ],
    },
    en: {
      categories: {
        all: "All",
        web: "Front-End",
        app: "FullStack",
        branding: "Backend",
        uiux: "UI/UX",
        three: "3D Design",
      },
      projects: [
        { id: 1, title: "E-Commerce Platform", description: "A modern learning platform with integrated payment", category: "Front-End" },
        { id: 2, title: "3D Portfolio", description: "Interactive portfolio with animations", category: "3D Design" },
        { id: 3, title: "Web application for visas and travel", description: "Govisa app with intuitive interface", category: "Front-End" },
        { id: 4, title: "A website", description: "An interface gathering the different social networks of l'enfant d'or.", category: "3D Design" },
        { id: 5, title: "Web application for entrepreneurs", description: "Boosting startup business ideas with mentors, experts, or AI agents.", category: "Front-End" },
        { id: 6, title: "3D Portfolio", description: "Interactive 3D website for presenting the MINDSET-TIC structure.", category: "3D Design" },
        { id: 7, title: "3D Portfolio", description: "Interactive 3D portfolio for presenting Denis N.'s profile.", category: "3D Design" },
        { id: 8, title: "Web application for cars and motorcycles", description: "E-commerce platform for purchase/sale contracts and car/motorcycle bartering management.", category: "FullStack" },
        //{ id: 9, title: "Web application", description: "AgriLink is a digital platform connecting agricultural producers, investors, and consumers to boost the agricultural value chain in Benin.", category: "FullStack" },
        { id: 10, title: "Website for Alpha Bcom", description: "Website to showcase Alpha Bcom's services.", category: "FullStack" },
        //{ id: 11, title: "Boaz E-book website", description: "Website for selling documents.", category: "FullStack" },
      ],
    },
    es: {
      categories: {
        all: "Todos",
        web: "Front-End",
        app: "FullStack",
        branding: "Backend",
        uiux: "UI/UX",
        three: "3D Design",
      },
      projects: [
        { id: 1, title: "Plataforma E-Commerce", description: "Una plataforma de aprendizaje moderna con pago integrado", category: "Front-End" },
        { id: 2, title: "Portafolio 3D", description: "Portafolio interactivo con animaciones", category: "3D Design" },
        { id: 3, title: "Aplicación web para visas y viajes", description: "Aplicación Govisa con interfaz intuitiva", category: "Front-End" },
        { id: 4, title: "Un sitio web", description: "Una interfaz agrupando las diferentes redes sociales de l'enfant d'or.", category: "3D Design" },
        { id: 5, title: "Aplicación web para emprendedores", description: "Impulsar las ideas empresariales de las startups con mentores, expertos o agentes de IA.", category: "Front-End" },
        { id: 6, title: "Portafolio 3D", description: "Sitio web 3D interactivo para la presentación de la estructura MINDSET-TIC.", category: "3D Design" },
        { id: 7, title: "Portafolio 3D", description: "Portafolio 3D interactivo para presentar el perfil de Denis N.", category: "3D Design" },
        { id: 8, title: "Aplicación web para coches y motos", description: "Plataforma E-commerce para la gestión de contratos de compra/venta y trueque de coches y motos.", category: "FullStack" },
       // { id: 9, title: "Aplicación web", description: "AgriLink es una plataforma digital que conecta a productores agrícolas, inversores y consumidores para dinamizar la cadena de valor agrícola en Benín.", category: "FullStack" },
        { id: 10, title: "Sitio web para Alpha Bcom", description: "Sitio web para presentar los servicios de Alpha Bcom.", category: "FullStack" },
        //{ id: 11, title: "Sitio de E-book de Boaz", description: "Sitio para la venta de documentos.", category: "FullStack" },
      ],
    },
  };

  const projectMeta = [
    {
      id: 1,
      year: "2025",
      tags: ["Next.js", "UI/UX", "Tailwindcss"],
      image: "/image/akambi.png",
      link: "https://akambiconsulting.com/",
    },
    {
      id: 2,
      year: "2025",
      tags: ["Next.js", "Tailwindcss", "Three.js"],
      image: "/image/ad.png",
      link: "https://aga-l8lv.vercel.app/",
    },
    {
      id: 3,
      year: "2025",
      tags: ["Next.js", "Tailwindcss", "Three.js"],
      image: "/image/govisa.png",
      link: "https://govisa-stg-5527065b3b0a.herokuapp.com/fr",
    },
    {
      id: 4,
      year: "2025",
      tags: ["Next.js", "Tailwindcss", "UI/UX"],
      image: "/image/leo.png",
      link: "https://leo-pi-woad.vercel.app/",
    },
    {
      id: 5,
      year: "2025",
      tags: ["Next.js", "Tailwindcss", "UI/UX"],
      image: "/image/startup.png",
      link: "https://startup-mentor-stg-d27dfe3fd64e.herokuapp.com/",
    },
    {
      id: 6,
      year: "2025",
      tags: ["Next.js", "Tailwindcss", "UI/UX"],
      image: "/image/mindset.png",
      link: "https://mindsettic.vercel.app/",
    },
    {
      id: 7,
      year: "2024",
      tags: ["Figma", "React", "Chart.js"],
      image: "/image/denis.png",
      link: "https://denis-psi.vercel.app/",
    },
    {
      id: 8,
      year: "2023",
      tags: ["Next.js", "Video.js", "AWS"],
      image: "/image/alpha.png",
      link: "https://voiture.alphabcom.com/",
    },
   // {
   //   id: 9,
   //   year: "2023",
    //  tags: ["Next.js", "Video.js", "AWS"],
    //  image: "/image/agri.png",
    //  link: "https://agricollect-blue.vercel.app/",
   // },
    {
      id: 10,
      year: "2023",
      tags: ["Next.js", "Video.js", "AWS"],
      image: "/image/alp.png",
      link: "https://my-portofolio-peach-xi.vercel.app/",
    },
    //{
     // id: 11,
    //  year: "2023",
    //  tags: ["Next.js", "Video.js", "AWS"],
     // image: "/image/boaz.png",
     // link: "https://hboaz.vercel.app/",
    //},
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