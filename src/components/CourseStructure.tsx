"use client";

import React, { useState } from "react";
import {
  Layers,
  ChevronDown,
  BookMarked,
  UserCheck,
  MessageCircle,
  FileText,
  PenTool,
  Globe2,
  Ear,
  Brain,
  HandMetal,
  Cpu,
  HeartHandshake,
  Scale,
  Award,
  Sparkles,
  Info,
} from "lucide-react";
import type { SemesterData, SubjectItem } from "@/lib/dataStore";

interface CourseStructureProps {
  initialCurriculum?: SemesterData[];
}

export default function CourseStructure({ initialCurriculum }: CourseStructureProps) {
  const [activeSemester, setActiveSemester] = useState<1 | 2>(1);
  const [expandedSubject, setExpandedSubject] = useState<string | null>("s1-8");

  // Fallback default subjects if not passed from server
  const fallbackSem1 = [
    {
      id: "s1-1",
      code: "DHLS-101",
      title: "Personality Development and Communication Skills",
      category: "Personal & Interpersonal Growth",
      description: "Focuses on self-confidence, interpersonal communication etiquette, active listening, voice modulation, and professional presentation techniques.",
      isPublished: true,
      sortOrder: 1,
    },
    {
      id: "s1-2",
      code: "DHLS-102",
      title: "Communication Theories",
      category: "Theoretical Linguistics",
      description: "Covers classical and contemporary models of communication, encoding and decoding messages, barriers to effective dialogue, and feedback loop mechanisms.",
      isPublished: true,
      sortOrder: 2,
    },
    {
      id: "s1-3",
      code: "DHLS-103",
      title: "Expressionism of the Language",
      category: "Language Articulation",
      description: "Explores expressive nuances in language, emotional tonality, syntax structures, vocabulary choices, and how communicative intent is conveyed.",
      isPublished: true,
      sortOrder: 3,
    },
    {
      id: "s1-4",
      code: "DHLS-104",
      title: "Developing Language Oral and Written Skills",
      category: "Core Skills Development",
      description: "Practical training in structured writing, reading comprehension, pronunciation, articulation clarity, and syntactic sentence construction.",
      isPublished: true,
      sortOrder: 4,
    },
    {
      id: "s1-5",
      code: "DHLS-105",
      title: "Command Over Targeted Language",
      category: "Linguistic Fluency",
      description: "Strengthening linguistic mastery, grammatical precision, idiomatic comprehension, and fluency in the designated instructional language.",
      isPublished: true,
      sortOrder: 5,
    },
    {
      id: "s1-6",
      code: "DHLS-106",
      title: "Language Interpreting",
      category: "Applied Translation",
      description: "Fundamentals of real-time linguistic interpretation, cross-lingual message preservation, contextual meaning transfer, and assistive communication conversion.",
      isPublished: true,
      sortOrder: 6,
    },
    {
      id: "s1-7",
      code: "DHLS-107",
      title: "Communication, Language and Speech",
      category: "Core Foundations",
      description: "Examines the triad relationship connecting cognition, language coding, acoustic speech generation, and listener comprehension.",
      isPublished: true,
      sortOrder: 7,
    },
    {
      id: "s1-8",
      code: "DHLS-108",
      title: "Anatomy and Physiology of the Speech Mechanism",
      category: "Biological Foundations",
      description: "Explores the biological apparatus responsible for human speech: respiratory support, vocal fold phonation in the larynx, pharyngeal resonation, and articulators.",
      isPublished: true,
      sortOrder: 8,
    },
    {
      id: "s1-9",
      code: "DHLS-109",
      title: "Internal Assessment",
      category: "Academic Evaluation",
      description: "Continuous internal academic appraisal including coursework evaluations, subject quizzes, student presentations, and periodic midterm reviews.",
      isPublished: true,
      sortOrder: 9,
    },
  ];

  const fallbackSem2 = [
    {
      id: "s2-1",
      code: "DHLS-201",
      title: "Oral Expression of the Language",
      category: "Speech Articulation",
      description: "Advanced practices in spoken fluency, pronunciation accuracy, intonation, pitch variation, and conversational spontaneity.",
      isPublished: true,
      sortOrder: 1,
    },
    {
      id: "s2-2",
      code: "DHLS-202",
      title: "Indian Sign Language (ISL) as a Language",
      category: "Visual-Gestural Language",
      description: "Study of Indian Sign Language (ISL) grammar, spatial linguistics, manual finger-spelling alphabet, facial expressions, and gestural communication structures.",
      isPublished: true,
      sortOrder: 2,
    },
    {
      id: "s2-3",
      code: "DHLS-203",
      title: "Communicative English and Computer Fundamentals",
      category: "Digital & Language Tools",
      description: "Essential computer literacy, documentation processing, digital communication, and English language comprehension tailored for educational setups.",
      isPublished: true,
      sortOrder: 3,
    },
    {
      id: "s2-4",
      code: "DHLS-204",
      title: "Audiology (Sound and Hearing)",
      category: "Auditory Science",
      description: "Introduction to the acoustic properties of sound (frequency, pitch, amplitude), hearing anatomy (outer, middle, inner ear), and introductory principles of audiology.",
      isPublished: true,
      sortOrder: 4,
    },
    {
      id: "s2-5",
      code: "DHLS-205",
      title: "Speech and Language Pathology",
      category: "Clinical Overview",
      description: "Introduction to common speech and language variations, articulation difficulties, voice impairments, and foundational concepts of communicative rehabilitation.",
      isPublished: true,
      sortOrder: 5,
    },
    {
      id: "s2-6",
      code: "DHLS-206",
      title: "Community-Based Rehabilitation",
      category: "Social Integration",
      description: "Principles of inclusive education, family counseling, community awareness, and support systems for individuals with speech and hearing diversities.",
      isPublished: true,
      sortOrder: 6,
    },
    {
      id: "s2-7",
      code: "DHLS-207",
      title: "Legal Language and Legal Writing",
      category: "Legal Frameworks",
      description: "Understanding statutory frameworks, disability rights legislation, documentation norms, formal record keeping, and ethical parameters.",
      isPublished: true,
      sortOrder: 7,
    },
    {
      id: "s2-8",
      code: "DHLS-208",
      title: "Internal Assessment and Project",
      category: "Practical Submission",
      description: "Comprehensive coursework portfolio, project assignment submission, case study documentation, and practical internal evaluations.",
      isPublished: true,
      sortOrder: 8,
    },
    {
      id: "s2-9",
      code: "DHLS-209",
      title: "Viva",
      category: "Comprehensive Oral Exam",
      description: "Summative oral examination assessing the candidate's understanding of course subjects, practical insights, and holistic knowledge of DHLS fundamentals.",
      isPublished: true,
      sortOrder: 9,
    },
  ];

  const sem1 = initialCurriculum?.find((s) => s.id === 1)?.subjects.filter((s) => s.isPublished) || fallbackSem1;
  const sem2 = initialCurriculum?.find((s) => s.id === 2)?.subjects.filter((s) => s.isPublished) || fallbackSem2;

  const currentSubjects = activeSemester === 1 ? sem1 : sem2;

  const getSubjectIcon = (category: string) => {
    switch (category) {
      case "Biological Foundations":
        return Brain;
      case "Auditory Science":
        return Ear;
      case "Visual-Gestural Language":
        return HandMetal;
      case "Theoretical Linguistics":
        return MessageCircle;
      case "Digital & Language Tools":
        return Cpu;
      case "Social Integration":
        return HeartHandshake;
      case "Legal Frameworks":
        return Scale;
      case "Practical Submission":
        return BookMarked;
      case "Academic Evaluation":
      case "Comprehensive Oral Exam":
        return Award;
      default:
        return Sparkles;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  return (
    <section id="structure" className="py-20 sm:py-28 bg-[#F5F8FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2684FF]/10 border border-[#2684FF]/20 text-xs font-bold text-[#2684FF] uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Curriculum & Syllabus Explorer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071B3D] tracking-tight mb-4">
            Course Structure
          </h2>
          <p className="text-base sm:text-lg text-[#536B8E] leading-relaxed">
            The DHLS syllabus published by NIED is structured across two comprehensive semesters. Click any subject below to explore its description and core learning focus.
          </p>
        </div>

        {/* Semester Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveSemester(1)}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 ${
                activeSemester === 1
                  ? "bg-[#071B3D] text-white shadow-md shadow-[#071B3D]/25"
                  : "text-[#536B8E] hover:text-[#071B3D] hover:bg-slate-50"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#2684FF]" />
              <span>Semester 1</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                {sem1.length} Subjects
              </span>
            </button>

            <button
              onClick={() => setActiveSemester(2)}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-200 ${
                activeSemester === 2
                  ? "bg-[#071B3D] text-white shadow-md shadow-[#071B3D]/25"
                  : "text-[#536B8E] hover:text-[#071B3D] hover:bg-slate-50"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#9B6DFF]" />
              <span>Semester 2</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                {sem2.length} Subjects
              </span>
            </button>
          </div>
        </div>

        {/* Semester Title Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-2xl font-extrabold text-[#071B3D]">
              {activeSemester === 1 ? "Semester 1 Curriculum" : "Semester 2 Curriculum"}
            </h3>
            <p className="text-xs sm:text-sm text-[#536B8E]">
              {activeSemester === 1
                ? "Foundations of Communication, Speech Anatomy, Language Expression & Assessment"
                : "Audiology, Indian Sign Language (ISL), Speech Pathology & Rehabilitation"}
            </p>
          </div>

          <div className="text-xs font-semibold text-[#2684FF] bg-[#2684FF]/10 px-3 py-1.5 rounded-full">
            Click on any card to view detailed outline
          </div>
        </div>

        {/* Interactive Subject Grid / Accordion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {currentSubjects.map((subj) => {
            const Icon = getSubjectIcon(subj.category);
            const isExpanded = expandedSubject === subj.id;

            return (
              <div
                key={subj.id}
                onClick={() => toggleExpand(subj.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 text-left flex flex-col justify-between ${
                  isExpanded
                    ? "bg-white border-[#2684FF] shadow-lg shadow-[#2684FF]/10 ring-1 ring-[#2684FF]"
                    : "bg-white border-slate-200 hover:border-[#2684FF]/50 hover:shadow-md"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    toggleExpand(subj.id);
                  }
                }}
                aria-expanded={isExpanded}
              >
                <div>
                  {/* Top row: Code & Category Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {subj.code}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-700 border-slate-200">
                      {subj.category}
                    </span>
                  </div>

                  {/* Subject Title & Icon */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-slate-100 text-[#071B3D] flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-[#2684FF]" />
                    </div>
                    <h4 className="text-base font-bold text-[#071B3D] leading-snug">
                      {subj.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p
                    className={`text-xs text-[#536B8E] leading-relaxed transition-all duration-200 ${
                      isExpanded ? "line-clamp-none mt-2" : "line-clamp-2"
                    }`}
                  >
                    {subj.description}
                  </p>
                </div>

                {/* Footer expansion indicator */}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#2684FF]">
                  <span>{isExpanded ? "Show Less" : "Explore Subject"}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-[#2684FF]" : "text-slate-400"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparent Institutional Notice */}
        <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-start gap-3.5">
          <Info className="w-5 h-5 text-[#2684FF] flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#536B8E] leading-relaxed">
            <strong className="text-[#071B3D] font-semibold">Institutional Clarification:</strong>{" "}
            The subjects listed above reflect the official curriculum referenced from the published NIED portal. 
            Fee structures, semester examinations, and admission schedules are subject to institutional confirmation by 
            SR College of Education. No clinical practice guarantees or payment commitments are assumed.
          </p>
        </div>

      </div>
    </section>
  );
}
