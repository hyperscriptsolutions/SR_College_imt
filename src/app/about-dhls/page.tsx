import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Clock,
  Laptop,
  Award,
  Users,
  Stethoscope,
  CheckCircle,
} from "lucide-react";
import AboutDHLS from "@/components/AboutDHLS";
import DHLSJourney from "@/components/DHLSJourney";
import PublicLayout from "@/components/PublicLayout";
import { getCourseContent } from "@/lib/dataStore";

export const metadata = {
  title: "About DHLS Course | S.R College of Education",
  description:
    "Learn about the Diploma in Hearing Language and Speech (DHLS) curriculum, its foundational pillars, communication science, and course overview at S.R College of Education, Rohtak.",
};

export default function AboutDHLSPage() {
  const content = getCourseContent();

  return (
    <PublicLayout>
      {/* Page Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-[#172A50] text-white overflow-hidden border-b border-[#26345B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb Navigation */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-300 mb-6 backdrop-blur-xs">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#D9AD54]">/</span>
            <span className="text-white font-semibold">About DHLS</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Understanding the <span className="text-[#D9AD54]">DHLS Program</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
            The <strong className="text-white">Diploma in Hearing Language and Speech (DHLS)</strong> is an offline, regular 1-year diploma course recognised by the Rehabilitation Council of India (RCI), structured around the science of human voice production, hearing evaluation, and verbal communication.
          </p>

          {/* Key Reference Stats Chips */}
          <div className="inline-flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Clock className="w-4 h-4 text-[#D9AD54]" />
              <span>Duration: <strong>{content.duration || "1 Year (Regular)"}</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <GraduationCap className="w-4 h-4 text-[#D9AD54]" />
              <span>Eligibility: <strong>{content.eligibility || "12th (PCM / PCB) & Above"}</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Laptop className="w-4 h-4 text-[#D9AD54]" />
              <span>Mode: <strong>{content.mode || "Offline (Regular)"}</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Award className="w-4 h-4 text-[#D9AD54]" />
              <span>Recognition: <strong>Rehabilitation Council of India (RCI)</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Users className="w-4 h-4 text-[#D9AD54]" />
              <span>Intake Capacity: <strong>30 Seats</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Detailed Name & Meaning Breakdown */}
      <section className="py-16 sm:py-24 bg-[#FFFCF6] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9AD54]/10 border border-[#D9AD54]/30 text-xs font-bold text-[#B88B2E] tracking-wide mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Program Definition</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172A50] tracking-tight mb-4">
                What Does <span className="text-[#8B1745]">DHLS</span> Stand For?
              </h2>
              <p className="text-base text-[#718096] leading-relaxed mb-6">
                <strong>DHLS</strong> stands for <strong>Diploma in Hearing Language and Speech</strong>. It is designed to impart structured knowledge regarding how human beings formulate thoughts into linguistic symbols, articulate sounds through vocal organs, and receive auditory stimuli.
              </p>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
                  <div className="w-7 h-7 rounded-xl bg-[#172A50] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    H
                  </div>
                  <div>
                    <h3 className="font-bold text-[#172A50]">Hearing</h3>
                    <p className="text-[#718096] text-xs leading-relaxed mt-0.5">
                      Understanding acoustic soundwaves, decibel measurements, inner ear mechanics, and basic audiometric assessment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
                  <div className="w-7 h-7 rounded-xl bg-[#8B1745] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    L
                  </div>
                  <div>
                    <h3 className="font-bold text-[#172A50]">Language</h3>
                    <p className="text-[#718096] text-xs leading-relaxed mt-0.5">
                      The cognitive, structural, and symbolic system of communication, including spoken dialects, grammar, and Indian Sign Language (ISL).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
                  <div className="w-7 h-7 rounded-xl bg-[#D9AD54] text-[#172A50] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    S
                  </div>
                  <div>
                    <h3 className="font-bold text-[#172A50]">Speech</h3>
                    <p className="text-[#718096] text-xs leading-relaxed mt-0.5">
                      The physiological and acoustic output generated through respiratory lungs, vocal cords, pharynx, and oral articulators.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Callout Card */}
            <div className="lg:col-span-6 bg-[#172A50] text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-[#26345B] relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D9AD54] uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  Academic Purpose
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Why Study Communication &amp; Hearing Sciences?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Communication is at the core of human relationships, education, and society. A foundation in DHLS introduces students to the biological apparatus, acoustic physics, and inclusive rehabilitation tools needed to understand communicative differences.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/course-structure"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] transition-all shadow-md cursor-pointer"
                  >
                    <span>View All 18 Subjects</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#172A50]" />
                  </Link>
                  <Link
                    href="/eligibility-admission"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all cursor-pointer"
                  >
                    <span>Check Eligibility</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Practical Clinical Feature: Pediatric Speech & Language Intervention (img_1) */}
      <section className="py-14 sm:py-18 bg-white border-y border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Photograph: img_1 */}
            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-md group bg-slate-100">
                <Image
                  src="https://res.cloudinary.com/ozrdoi7q/image/upload/v1792760851/WhatsApp_Image_2026-10-23_at_6.29.37_PM_1.jpg"
                  alt="Pediatric speech therapy and child language development clinic room with flashcards, alphabet tactile boxes, and therapy materials at S.R. College of Education"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#8B1745]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-xs flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#D9AD54]" />
                  <span>Clinical Speech Training Clinic</span>
                </div>
              </div>
            </div>

            {/* Narrative & Highlights */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1745]/10 border border-[#8B1745]/30 text-xs font-bold text-[#8B1745] tracking-wide mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hands-on Clinical Exposure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172A50] tracking-tight mb-4">
                Pediatric Speech &amp; Language Development Clinic
              </h2>
              <p className="text-sm sm:text-base text-[#718096] leading-relaxed mb-6">
                DHLS candidates receive immersive clinical experience in our dedicated child language resource room. Equipped with articulation training flashcards, Montessori phonics learning kits, tactile alphabet boxes, and therapeutic mirrors, students observe and conduct real speech intervention sessions.
              </p>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8]">
                  <CheckCircle className="w-5 h-5 text-[#8B1745] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#172A50] block font-bold">Child Language Stimulation Protocols</strong>
                    <span className="text-[#718096]">Hands-on practice utilizing structured language stimulation kits, toy models, and cognitive interaction tools.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8]">
                  <CheckCircle className="w-5 h-5 text-[#D9AD54] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#172A50] block font-bold">Phonetic &amp; Articulation Development</strong>
                    <span className="text-[#718096]">Supervised training to correct misarticulation, voice modulation, and oral-motor movement in pediatric cases.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core 3 Pillars (AboutDHLS component) */}
      <AboutDHLS />

      {/* Section 3: Student Learning Journey (DHLSJourney component) */}
      <DHLSJourney />

      {/* Next Step Navigation CTA Banner */}
      <section className="py-16 bg-[#FFFCF6] text-[#263238] relative border-t border-[#E8E2D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172A50] mb-4">
            Ready to Explore the Curriculum Details?
          </h2>
          <p className="text-sm sm:text-base text-[#718096] max-w-2xl mx-auto mb-8">
            Review the semester-by-semester breakdown of subjects or submit an admission enquiry directly to S.R College of Education.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/course-structure"
              className="px-7 py-3.5 rounded-full font-bold text-sm text-white bg-[#8B1745] hover:bg-[#721238] shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore Course Structure</span>
              <ArrowRight className="w-4 h-4 text-[#D9AD54]" />
            </Link>

            <Link
              href="/eligibility-admission"
              className="px-6 py-3.5 rounded-full font-semibold text-sm text-[#172A50] bg-white hover:bg-stone-50 border border-[#E8E2D8] shadow-2xs transition-all"
            >
              <span>Admission Enquiry</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
