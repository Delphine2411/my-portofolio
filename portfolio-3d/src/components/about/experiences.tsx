"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';


function ExperienceSection() {
  const experiences = [
    {
      year: "2023 - Present",
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      description: "Leading development of cutting-edge web applications using Next.js and Three.js"
    },
    {
      year: "2021 - 2023",
      title: "Front-End Developer",
      company: "Digital Solutions Co.",
      description: "Built responsive and interactive user interfaces for various clients"
    },
    {
      year: "2019 - 2021",
      title: "Junior Developer",
      company: "StartUp Labs",
      description: "Developed and maintained multiple web projects using modern frameworks"
    }
  ];

  return (
    <section className="relative bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white text-center mb-16"
        >
          Work <span className="text-[#10b981]">Experience</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#10b981]/30" />
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto md:text-left'} md:w-1/2`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 border-2 border-[#10b981]/30 rounded-2xl p-6 hover:border-[#10b981] transition-all"
              >
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#10b981] rounded-full" />
                <span className="text-[#10b981] font-bold text-sm">{exp.year}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{exp.title}</h3>
                <p className="text-gray-400 font-semibold">{exp.company}</p>
                <p className="text-gray-500 mt-2">{exp.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default ExperienceSection;