"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useLanguage } from "@/src/components/contexts/language_context";


type Language = "fr" | "en" | "es";
type Theme = "dark" | "light";

type Translations = {
  [key in Language]: {
    home: string;
    about: string;
    realisations: string;
    services: string;
    contact: string;
  };
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "dark";
    }
    return "dark";
  });
  const { language, setLanguage } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const pathname = usePathname();

  // Appliquer le thème au document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Sauvegarder la langue
  useEffect(() => {
  document.documentElement.setAttribute("lang", language);
}, [language]);


  // Changer le thème
  const toggleTheme = () => {
    setTheme((prev) => prev === "dark" ? "light" : "dark");
  };

  // Changer la langue
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  const translations: Translations = {
    fr: {
      home: "Accueil",
      about: "À propos",
      realisations: "Mes réalisations",
      services: "Services",
      contact: "Contact"
    },
    en: {
      home: "Home",
      about: "About",
      realisations: "My work",
      services: "Services",
      contact: "Contact"
    },
    es: {
      home: "Inicio",
      about: "Acerca de",
      realisations: "Mis trabajos",
      services: "Servicios",
      contact: "Contacto"
    }
  };

  const links = [
    { name: translations[language].home, path: "/home", key: "home" },
    { name: translations[language].about, path: "/about", key: "about" },
    { name: translations[language].realisations, path: "/realisations", key: "realisations" },
    { name: translations[language].services, path: "/services", key: "services" },
    { name: translations[language].contact, path: "/contact", key: "contact" },
  ];

  const languages: Array<{ code: Language; name: string; flag: string }> = [
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" }
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-[#0b0c10]/80 backdrop-blur-md border-b border-[#00FF66]/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        {/* LOGO */}
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">
            KLAD<span className="text-[#00FF66]">MOK</span>
          </h1>
        </Link>

        {/* Liens Desktop */}
        <ul className="hidden md:flex gap-8 text-lg">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <motion.li
                key={link.key}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <Link
                  href={link.path}
                  className={`cursor-pointer transition-colors ${
                    isActive ? "text-[#00FF66]" : "hover:text-[#00FF66]"
                  }`}
                >
                  {link.name}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#00FF66]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.li>
            );
          })}
        </ul>

        {/* Actions Desktop (Theme + Language) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Bouton Theme */}
         {/* <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-800 hover:bg-[#00FF66]/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <FiSun className="text-[#00FF66] text-xl" />
            ) : (
              <FiMoon className="text-[#00FF66] text-xl" />
            )}
          </motion.button>*/}

          {/* Bouton Language */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-2 rounded-full bg-gray-800 hover:bg-[#00FF66]/20 transition-colors flex items-center gap-2"
              aria-label="Change language"
            >
              <FiGlobe className="text-[#00FF66] text-xl" />
              <span className="text-sm font-semibold uppercase">{language}</span>
            </motion.button>

            {/* Menu déroulant des langues */}
            <AnimatePresence>
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 bg-gray-900 border border-[#00FF66]/30 rounded-xl shadow-xl overflow-hidden"
                >
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{ backgroundColor: "rgba(0, 255, 102, 0.1)" }}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                        language === lang.code ? "bg-[#00FF66]/20 text-[#00FF66]" : "text-white"
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Menu Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {/* Theme Mobile */}
         {/* <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 text-2xl"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <FiSun className="text-[#00FF66]" />
            ) : (
              <FiMoon className="text-[#00FF66]" />
            )}
          </motion.button>*/}

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl focus:outline-none"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Menu déroulant mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0b0c10]/95 border-t border-[#00FF66]/20 overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-6 py-8 text-lg">
              {links.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.key}>
                    <Link
                      href={link.path}
                      className={`cursor-pointer transition-colors ${
                        isActive ? "text-[#00FF66]" : "hover:text-[#00FF66]"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Language selector mobile */}
            <div className="flex justify-center gap-4 pb-6">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    language === lang.code
                      ? "bg-[#00FF66] text-black"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  {lang.flag} {lang.code.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}