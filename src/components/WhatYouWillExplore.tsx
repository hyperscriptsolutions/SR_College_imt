"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Mic,
  Headphones,
  HandMetal,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

interface WhatYouWillExploreProps {
  showDisciplines?: boolean;
}

export default function WhatYouWillExplore({ showDisciplines = true }: WhatYouWillExploreProps) {
  const [selectedTheme, setSelectedTheme] = useState<number>(0);

  if (showDisciplines === false) {
    return null;
  }

  const themes = [
    {
      id: 0,
      title: "Communication Theories",
      subtitle: "Interpersonal Models & Linguistic Signals",
      icon: MessageSquare,
      gradient: "from-[#2684FF] to-[#102B58]",
      accentBg: "bg-[#2684FF]/10 text-[#2684FF]",
      borderHover: "hover:border-[#2684FF]",
      overview:
        "Understand the foundational frameworks of human dialogue, message encoding, transmission channels, and interpretive feedback loops.",
      keyTopics: [
        "Classical & modern communication models (Shannon-Weaver, Berlo)",
        "Overcoming psychological, physical, and environmental barriers",
        "Active listening dynamics and assertive verbal interaction",
        "Developing oral and written expression in educational contexts",
      ],
      practicalPerspective:
        "Cultivates structured awareness of how human messages are conceived, structured, delivered, and perceived.",
    },
    {
      id: 1,
      title: "Human Vocal Apparatus",
      subtitle: "Anatomy & Physiology of Speech Organs",
      icon: Mic,
      gradient: "from-[#9B6DFF] to-[#5A24D6]",
      accentBg: "bg-[#9B6DFF]/15 text-[#9B6DFF]",
      borderHover: "hover:border-[#9B6DFF]",
      overview:
        "Examine the biological mechanisms responsible for voice production, phonation, resonant filtering, and articulatory precision.",
      keyTopics: [
        "Respiratory airflow and lung volume support",
        "Laryngeal phonation and vocal fold vibrations",
        "Pharyngeal, oral, and nasal resonance cavities",
        "Articulators: tongue, lips, teeth, and soft/hard palate",
      ],
      practicalPerspective:
        "Provides foundational biological comprehension of speech sound production without making unverified clinical treatment claims.",
    },
    {
      id: 2,
      title: "Auditory Acoustics",
      subtitle: "Sound Waves & Auditory Perception",
      icon: Headphones,
      gradient: "from-[#29D7FF] to-[#2684FF]",
      accentBg: "bg-[#29D7FF]/15 text-[#071B3D]",
      borderHover: "hover:border-[#29D7FF]",
      overview:
        "Explore the physical properties of sound waves, frequency decibels, and how the human auditory pathway decodes acoustic vibrations.",
      keyTopics: [
        "Physical acoustics: frequency, amplitude, wavelength, and pitch",
        "Outer, middle, and inner ear anatomical structures",
        "Auditory perception thresholds and decibel calibration",
        "Introductory screening principles in audiology",
      ],
      practicalPerspective:
        "Builds a rigorous scientific grasp of how sound travels through physical mediums and is processed by the human auditory system.",
    },
    {
      id: 3,
      title: "Indian Sign Language",
      subtitle: "Visual-Gestural Communication",
      icon: HandMetal,
      gradient: "from-[#071B3D] to-[#102B58]",
      accentBg: "bg-[#071B3D]/10 text-[#071B3D]",
      borderHover: "hover:border-[#071B3D]",
      overview:
        "Discover Indian Sign Language (ISL) as a complete visual-gestural language with distinct grammatical, spatial, and semantic structures.",
      keyTopics: [
        "ISL manual alphabet and standardized finger-spelling",
        "Spatial grammar, facial expressions, and body orientation",
        "Conversational vocabulary for day-to-day interactions",
        "Community-based rehabilitation and inclusive communication support",
      ],
      practicalPerspective:
        "Equips students with foundational bilingual and multimodal skills to facilitate accessible communication across diverse communities.",
    },
  ];

  return (
    <section id="explore" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2684FF]/10 border border-[#2684FF]/20 text-xs font-bold text-[#2684FF] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Core Discipline Focus
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071B3D] tracking-tight mb-4">
            Core Discipline Focus
          </h2>
          <p className="text-base sm:text-lg text-[#536B8E] leading-relaxed">
            The DHLS curriculum centers around four verified academic disciplines. Click on any discipline below to inspect its core syllabus modules and educational purpose.
          </p>
        </div>

        {/* 4 Interactive Discipline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {themes.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedTheme === theme.id;

            return (
              <div
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 text-left border relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#071B3D] text-white border-[#29D7FF] shadow-2xl scale-[1.02] ring-2 ring-[#29D7FF]/50"
                    : "bg-[#F5F8FF] text-[#13264A] border-slate-200/80 hover:bg-white hover:border-[#2684FF]/40 hover:shadow-lg"
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
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                        isSelected
                          ? "bg-[#2684FF] text-white shadow-md shadow-[#2684FF]/40"
                          : `${theme.accentBg}`
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isSelected
                          ? "bg-white/10 text-white border border-white/20"
                          : "bg-slate-200/60 text-slate-600"
                      }`}
                    >
                      Focus 0{theme.id + 1}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className={`text-lg font-bold mb-1.5 leading-snug ${
                      isSelected ? "text-white" : "text-[#071B3D]"
                    }`}
                  >
                    {theme.title}
                  </h3>
                  <p
                    className={`text-xs font-medium mb-4 ${
                      isSelected ? "text-[#29D7FF]" : "text-[#536B8E]"
                    }`}
                  >
                    {theme.subtitle}
                  </p>

                  {/* Overview snippet */}
                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected ? "text-slate-200" : "text-[#536B8E]"
                    }`}
                  >
                    {theme.overview}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div
                  className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
                    isSelected
                      ? "border-white/15 text-[#29D7FF]"
                      : "border-slate-200/60 text-[#2684FF]"
                  }`}
                >
                  <span>{isSelected ? "Active Focus" : "Inspect Focus"}</span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isSelected ? "translate-x-0.5 -translate-y-0.5" : ""
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Spotlight Panel */}
        <div className="rounded-3xl bg-[#F5F8FF] border border-slate-200/80 p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2684FF] bg-[#2684FF]/10 px-3 py-1 rounded-full mb-3">
                <span>Academic Spotlight</span>
                <span>•</span>
                <span>Focus 0{themes[selectedTheme].id + 1}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071B3D] mb-3">
                {themes[selectedTheme].title}:{" "}
                <span className="text-[#2684FF]">{themes[selectedTheme].subtitle}</span>
              </h3>

              <p className="text-sm sm:text-base text-[#536B8E] leading-relaxed mb-6">
                {themes[selectedTheme].overview}
              </p>

              <div className="space-y-3 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#071B3D]">
                  Curricular Modules Covered:
                </div>
                {themes[selectedTheme].keyTopics.map((topic, tIdx) => (
                  <div key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#13264A]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#071B3D] uppercase tracking-wider mb-3">
                    <HelpCircle className="w-4 h-4 text-[#2684FF]" />
                    <span>Educational Context</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#536B8E] leading-relaxed mb-4">
                    {themes[selectedTheme].practicalPerspective}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 italic">
                  Note: Subject areas reflect educational modules referenced from NIED publications and do not imply unverified clinical license or independent healthcare practice.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Action Link to Full 18-Subject Curriculum */}
        <div className="mt-12 text-center">
          <Link
            href="/course-structure"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2684FF] to-[#9B6DFF] hover:brightness-110 shadow-lg shadow-[#2684FF]/25 transition-all"
          >
            <span>Explore All 18 Subjects in Semester 1 &amp; 2</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
