import React from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Ear,
  Mic,
  MessageSquare,
  HandMetal,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Clock,
  Laptop,
} from "lucide-react";
import AboutDHLS from "@/components/AboutDHLS";
import DHLSJourney from "@/components/DHLSJourney";
import PublicLayout from "@/components/PublicLayout";
import { getCourseContent } from "@/lib/dataStore";

export const metadata = {
  title: "About DHLS Course | SR College of Education",
  description:
    "Learn about the Diploma in Hearing Language and Speech (DHLS) curriculum, its foundational pillars, communication science, and course overview at SR College of Education, Rohtak.",
};

export default function AboutDHLSPage() {
  const content = getCourseContent();

  return (
    <PublicLayout>
      {/* Page Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-gradient-to-b from-[#071B3D] via-[#0A224D] to-[#071B3D] text-white overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#2684FF]/20 via-[#9B6DFF]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-10 w-80 h-80 bg-[#29D7FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb Navigation */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-300 mb-6 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#29D7FF]">/</span>
            <span className="text-white font-semibold">About DHLS</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Understanding the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29D7FF] via-[#2684FF] to-[#9B6DFF]">DHLS Program</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
            The <strong className="text-white">Diploma in Hearing Language and Speech (DHLS)</strong> is an undergraduate-level diploma program structured around the science of human voice production, hearing evaluation, and verbal communication.
          </p>

          {/* Key Reference Stats Chips */}
          <div className="inline-flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <Clock className="w-4 h-4 text-[#29D7FF]" />
              <span>Duration: <strong>{content.duration || "1 Year"}</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-[#9B6DFF]" />
              <span>Eligibility: <strong>{content.eligibility || "12th & Above"}</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <Laptop className="w-4 h-4 text-emerald-400" />
              <span>Reference Framework: <strong>NIED Curriculum</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Detailed Name & Meaning Breakdown */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2684FF]/10 text-xs font-bold text-[#2684FF] tracking-wide mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Program Definition</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071B3D] tracking-tight mb-4">
                What Does <span className="text-[#2684FF]">DHLS</span> Stand For?
              </h2>
              <p className="text-base text-[#536B8E] leading-relaxed mb-6">
                <strong>DHLS</strong> stands for <strong>Diploma in Hearing Language and Speech</strong>. It is designed to impart structured knowledge regarding how human beings formulate thoughts into linguistic symbols, articulate sounds through vocal organs, and receive auditory stimuli.
              </p>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FF] border border-[#2684FF]/10">
                  <div className="w-7 h-7 rounded-xl bg-[#2684FF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    H
                  </div>
                  <div>
                    <h3 className="font-bold text-[#071B3D]">Hearing</h3>
                    <p className="text-[#536B8E] text-xs leading-relaxed mt-0.5">
                      Understanding acoustic soundwaves, decibel measurements, inner ear mechanics, and basic audiometric assessment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FF] border border-[#9B6DFF]/15">
                  <div className="w-7 h-7 rounded-xl bg-[#9B6DFF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    L
                  </div>
                  <div>
                    <h3 className="font-bold text-[#071B3D]">Language</h3>
                    <p className="text-[#536B8E] text-xs leading-relaxed mt-0.5">
                      The cognitive, structural, and symbolic system of communication, including spoken dialects, grammar, and Indian Sign Language (ISL).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FF] border border-[#29D7FF]/20">
                  <div className="w-7 h-7 rounded-xl bg-[#29D7FF] text-[#071B3D] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    S
                  </div>
                  <div>
                    <h3 className="font-bold text-[#071B3D]">Speech</h3>
                    <p className="text-[#536B8E] text-xs leading-relaxed mt-0.5">
                      The physiological and acoustic output generated through respiratory lungs, vocal cords, pharynx, and oral articulators.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Callout Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#071B3D] via-[#102B58] to-[#071B3D] text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#29D7FF]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#29D7FF]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9B6DFF]/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#29D7FF] uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" />
                  Academic Purpose
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Why Study Communication &amp; Hearing Sciences?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Communication is at the core of human relationships, education, and society. A foundation in DHLS introduces students to the biological apparatus, acoustic physics, and inclusive rehabilitation tools needed to understand communicative differences.
                </p>

                <div className="space-y-2.5 text-xs text-slate-200 mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#29D7FF] flex-shrink-0" />
                    <span>Comprehensive 1-Year curriculum spanning 18 subjects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#29D7FF] flex-shrink-0" />
                    <span>Balanced blend of theoretical linguistics and practical labs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#29D7FF] flex-shrink-0" />
                    <span>Exposure to Indian Sign Language (ISL) as a full language</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/course-structure"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-[#071B3D] bg-[#29D7FF] hover:bg-[#6be4ff] transition-all shadow-md"
                  >
                    <span>View All 18 Subjects</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/eligibility-admission"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
                  >
                    <span>Check Eligibility</span>
                  </Link>
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
      <section className="py-16 bg-[#071B3D] text-white relative border-t border-[#2684FF]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            Ready to Explore the Curriculum Details?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Review the semester-by-semester breakdown of subjects or submit an admission enquiry directly to SR College of Education.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/course-structure"
              className="px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#2684FF] to-[#9B6DFF] hover:brightness-110 shadow-lg shadow-[#2684FF]/30 transition-all flex items-center gap-2"
            >
              <span>Explore Course Structure</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/eligibility-admission"
              className="px-6 py-3 rounded-full font-semibold text-sm text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
            >
              <span>Admission Enquiry</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
