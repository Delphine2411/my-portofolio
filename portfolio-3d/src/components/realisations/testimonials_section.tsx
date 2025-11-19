"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/components/contexts/language_context"; // 👈

const translations = {
  fr: {
    title1: "Ce qu’ils",
    title: "disent",
    testimonials: [
      {
        name: "Luckas",
        role: "client, Govisa",
        text: "Un travail exceptionnel ! Le projet a dépassé toutes nos attentes. L'attention aux détails et la créativité sont remarquables.",
        rating: 5,
      },
      {
        name: "Denis NOUDEKE",
        role: "Responsable des stagiaires, Globodai",
        text: "Collaboration fluide et résultats impressionnants. Je recommande vivement pour toute entreprise.",
        rating: 5,
      },
      {
        name: "Gustave",
        role: "Client, Akambi Consulting",
        text: "Expertise technique et sens du design parfaitement combinés. Un vrai plaisir de travailler ensemble.",
        rating: 5,
      },
    ],
  },
  en: {
    title1: "What they",
    title: " say",
    testimonials: [
      {
        name: "Luckas",
        role: "Client, Govisa",
        text: "Exceptional work! The project exceeded all our expectations. Attention to detail and creativity are outstanding.",
        rating: 5,
      },
      {
        name: "Denis NOUDEKE",
        role: "Internship Manager, Globodai",
        text: "Smooth collaboration and impressive results. I highly recommend for any business.",
        rating: 5,
      },
      {
        name: "Gustave",
        role: "Client, Akambi Consulting",
        text: "Technical expertise and design sense perfectly combined. A real pleasure to work together.",
        rating: 5,
      },
    ],
  },
  es: {
    title1: "Lo que ",
    title: "dicen",
    testimonials: [
      {
        name: "Luckas",
        role: "Cliente, Govisa",
        text: "¡Trabajo excepcional! El proyecto superó todas nuestras expectativas. La atención al detalle y la creatividad son sobresalientes.",
        rating: 5,
      },
      {
        name: "Denis NOUDEKE",
        role: "Responsable de pasantías, Globodai",
        text: "Colaboración fluida y resultados impresionantes. Lo recomiendo ampliamente para cualquier empresa.",
        rating: 5,
      },
      {
        name: "Gustave",
        role: "Cliente, Akambi Consulting",
        text: "Experiencia técnica y sentido del diseño perfectamente combinados. Un verdadero placer trabajar juntos.",
        rating: 5,
      },
    ],
  },
};

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="bg-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:text-5xl text-3xl font-bold text-white text-center mb-16"
        >
          {t.title1} <span className="text-[#10b981]">{t.title}</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {t.testimonials.map((testimonial, index) => (
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
