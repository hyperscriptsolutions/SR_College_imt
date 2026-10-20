"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  Mic,
  Headphones,
  HandMetal,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

interface WhatYouWillExploreProps {
  showDisciplines?: boolean;
}

export default function WhatYouWillExplore({ showDisciplines = true }: WhatYouWillExploreProps) {
  const [selectedTheme, setSelectedTheme] = useState<number>(3); // ISL highlighted by default as in reference screenshot

  if (showDisciplines === false) {
    return null;
  }

  const themes = [
    {
      id: 0,
      title: "Communication Theories",
      subtitle: "Theoretical Foundations & Interpersonal Dynamics",
      icon: MessageSquare,
      iconColor: "text-[#8B1745]",
      iconBg: "bg-[#8B1745]/10",
      image: "/images/community_classroom.png",
      imageAlt: "S.R COLLEGE OF EDUCATION wood-paneled seminar and communication lecture hall",
      description:
        "Understand the foundations of communication, language and interpersonal interaction.",
      spotlightDescription:
        "Explore classical and contemporary communication models, psychological and environmental barriers, and the foundational dynamics of interpersonal speech perception.",
      keyTopics: [
        "Classical & modern communication models (Shannon-Weaver, Berlo)",
        "Overcoming psychological, physical, and environmental barriers",
        "Active listening dynamics and assertive verbal interaction",
        "Developing oral and written expression in educational contexts",
      ],
      educationalContext:
        "Cultivates structured awareness of how human messages are conceived, structured, delivered, and perceived across diverse clinical and educational environments.",
    },
    {
      id: 1,
      title: "Human Vocal Apparatus",
      subtitle: "Biological Speech Mechanics & Phonation",
      icon: Mic,
      iconColor: "text-[#B88B2E]",
      iconBg: "bg-[#D9AD54]/15",
      image: "/images/biology_lab_interior.png",
      imageAlt: "S.R COLLEGE OF EDUCATION biological speech mechanics and human anatomy laboratory",
      description:
        "Study the structure and function of the vocal system and its role in speech production.",
      spotlightDescription:
        "Examine the anatomy and physiology of respiration, phonation, resonance, and articulation, establishing how human anatomical structures work synchronously to produce speech.",
      keyTopics: [
        "Respiratory airflow and lung volume support mechanisms",
        "Laryngeal phonation and vocal fold vibration biomechanics",
        "Pharyngeal, oral, and nasal resonance cavity shaping",
        "Articulators: tongue, lips, teeth, and soft/hard palate functions",
      ],
      educationalContext:
        "Provides foundational biological comprehension of speech sound production mechanisms essential for identifying anatomical speech issues.",
    },
    {
      id: 2,
      title: "Auditory Acoustics",
      subtitle: "Physics of Sound Waves & Psychoacoustics",
      icon: Headphones,
      iconColor: "text-[#172A50]",
      iconBg: "bg-[#172A50]/10",
      image: "/images/ear_anatomy_classroom.png",
      imageAlt: "S.R COLLEGE OF EDUCATION ear anatomy and psychoacoustic auditory perception classroom",
      description:
        "Explore sound waves, hearing mechanisms, and their impact on communication.",
      spotlightDescription:
        "Investigate the physical properties of sound waves, frequency decibel calibration, auditory perception thresholds, and the biomechanics of outer, middle, and inner ear transduction.",
      keyTopics: [
        "Physical acoustics: frequency, amplitude, wavelength, and pitch",
        "Outer, middle, and inner ear anatomical transmission structures",
        "Auditory perception thresholds and decibel calibration",
        "Introductory screening principles in audiological assessments",
      ],
      educationalContext:
        "Builds a rigorous scientific grasp of how sound travels through physical mediums and is perceived by the human ear, forming the basis for audiometric screening.",
    },
    {
      id: 3,
      title: "Indian Sign Language",
      subtitle: "Visual-Gestural Communication & Inclusive Linguistics",
      icon: HandMetal,
      iconColor: "text-[#D9AD54]",
      iconBg: "bg-white/10",
      image: "/images/campus_building_2.jpg",
      imageAlt: "S.R COLLEGE OF EDUCATION clinical articulation mirror and visual communication suite",
      description:
        "Learn the basics of Indian Sign Language (ISL) and its role in inclusive communication.",
      spotlightDescription:
        "Discover Indian Sign Language (ISL) as a complete visual-gestural language with distinct grammatical, spatial, and semantic structures.",
      keyTopics: [
        "ISL manual alphabets, basic word vocabulary, and syntactic grammar",
        "Spatial grammar, facial expressions, and body orientation",
        "Everyday vocabulary for day-to-day inclusive interactions",
        "Community-based rehabilitation and inclusive communication support",
      ],
      educationalContext:
        "Equips students with foundational bilingual and multi-modal skills to facilitate accessible communication across diverse deaf and hard-of-hearing communities.",
    },
  ];

  const currentTheme = themes[selectedTheme];

  return (
    <section id="explore" className="py-20 sm:py-28 bg-[#FFFCF6] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9AD54]/10 border border-[#D9AD54]/30 text-xs font-bold text-[#B88B2E] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D9AD54]" />
            Course Discipline Focus
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172A50] tracking-tight mb-4">
            Core Discipline <span className="text-[#8B1745]">Focus</span>
          </h2>
          <p className="text-base sm:text-lg text-[#718096] leading-relaxed">
            The DHLS curriculum covers a range of four verified academic disciplines. Click on any discipline below to inspect its core syllabus modules and educational purpose.
          </p>
        </div>

        {/* 4 Academic Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedTheme === theme.id;

            return (
              <div
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`cursor-pointer rounded-3xl p-6 sm:p-7 transition-all duration-300 text-left border relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#172A50] text-white border-[#26345B] shadow-xl scale-[1.02] ring-2 ring-[#D9AD54]/40"
                    : "bg-white text-[#263238] border-[#E8E2D8] shadow-xs hover:border-[#D9AD54] hover:shadow-md hover:scale-[1.01]"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedTheme(theme.id);
                  }
                }}
                aria-pressed={isSelected}
              >
                <div>
                  {/* Top Bar with Icon & Focus Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-200 ${
                        isSelected
                          ? "bg-white/10 text-[#D9AD54]"
                          : `${theme.iconBg} ${theme.iconColor}`
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors duration-200 ${
                        isSelected
                          ? "bg-white/10 text-slate-300 border border-white/15"
                          : "bg-stone-100 text-[#718096]"
                      }`}
                    >
                      Focus 0{theme.id + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-lg font-bold mb-2 transition-colors duration-200 ${
                      isSelected ? "text-white" : "text-[#172A50]"
                    }`}
                  >
                    {theme.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs leading-relaxed mb-6 transition-colors duration-200 ${
                      isSelected ? "text-slate-200" : "text-[#718096]"
                    }`}
                  >
                    {theme.description}
                  </p>
                </div>

                {/* Bottom Link */}
                <div
                  className={`pt-4 border-t flex items-center justify-between text-xs font-bold transition-colors duration-200 ${
                    isSelected
                      ? "border-white/15 text-[#D9AD54]"
                      : "border-stone-100 text-[#8B1745]"
                  }`}
                >
                  <span>{isSelected ? "Active Focus" : "Explore Focus"}</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isSelected ? "translate-x-1" : ""
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Academic Spotlight Section */}
        <div className="rounded-3xl bg-white border border-[#E8E2D8] p-6 sm:p-9 shadow-sm mb-12 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Photograph */}
            <div className="lg:col-span-4 relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-[#E8E2D8] bg-stone-100 shadow-2xs">
              <Image
                key={currentTheme.id}
                src={currentTheme.image}
                alt={currentTheme.imageAlt}
                fill
                className="object-cover object-center transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>

            {/* Middle Content */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8B1745] mb-2.5">
                <span>ACADEMIC SPOTLIGHT</span>
                <span>•</span>
                <span>FOCUS 0{currentTheme.id + 1}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#172A50] mb-3">
                {currentTheme.title} : {currentTheme.subtitle}
              </h3>

              <p className="text-xs sm:text-sm text-[#718096] leading-relaxed mb-5">
                {currentTheme.spotlightDescription}
              </p>

              <div className="space-y-2.5">
                {currentTheme.keyTopics.map((topic, tIdx) => (
                  <div key={tIdx} className="flex items-start gap-2.5 text-xs text-[#263238] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#8B1745] flex-shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Educational Context Card */}
            <div className="lg:col-span-3">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8] shadow-2xs flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#172A50] uppercase tracking-wider mb-2.5">
                    <BookOpen className="w-4 h-4 text-[#D9AD54]" />
                    <span>Educational Context</span>
                  </div>
                  <p className="text-xs text-[#718096] leading-relaxed">
                    {currentTheme.educationalContext}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Centered Primary Burgundy CTA Button */}
        <div className="text-center">
          <Link
            href="/course-structure"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-[#8B1745] hover:bg-[#721238] shadow-md hover:shadow-lg transition-all duration-150 active:scale-95"
          >
            <span>Explore All DHLS Subjects in Semester 1 &amp; 2</span>
            <ArrowRight className="w-4 h-4 text-[#D9AD54]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
