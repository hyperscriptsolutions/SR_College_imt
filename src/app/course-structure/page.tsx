import React from "react";
import Link from "next/link";
import {
  Layers,
  BookMarked,
  Clock,
  GraduationCap,
  Award,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertCircle,
} from "lucide-react";
import CourseStructure from "@/components/CourseStructure";
import PublicLayout from "@/components/PublicLayout";
import { getCurriculum } from "@/lib/dataStore";

export const metadata = {
  title: "DHLS Course Structure & Syllabus | SR College of Education",
  description:
    "Explore the 1-Year, 18-subject curriculum for the Diploma in Hearing Language and Speech (DHLS) across Semester 1 and Semester 2, referenced from NIED.",
};

export default function CourseStructurePage() {
  const curriculum = getCurriculum();

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
            <span className="text-white font-semibold">Course Structure</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            DHLS Academic Curriculum &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29D7FF] via-[#2684FF] to-[#9B6DFF]">Semester Syllabus</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
            A comprehensive, modular 1-Year curriculum comprising 18 subjects organized across two academic semesters, referenced directly from published NIED course specifications.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <Clock className="w-4 h-4 text-[#29D7FF]" />
              <span>Program Duration: <strong>1 Year (2 Semesters)</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <BookMarked className="w-4 h-4 text-[#9B6DFF]" />
              <span>Total Subjects: <strong>18 Core Disciplines</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Evaluation: <strong>Assessments, Projects &amp; Viva</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Overview Highlights */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#F5F8FF] border border-[#2684FF]/15">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2684FF] uppercase tracking-wider mb-2">
                <span>Semester 1 Focus</span>
              </div>
              <h3 className="text-lg font-bold text-[#071B3D] mb-2">
                Communication, Language &amp; Vocal Anatomy (9 Subjects)
              </h3>
              <p className="text-xs sm:text-sm text-[#536B8E] leading-relaxed">
                Foundational study covering Personality Development, Classical Communication Models, Linguistic Expression, Oral &amp; Written Skills, Language Interpreting, Anatomy &amp; Physiology of the Speech Mechanism, and Continuous Internal Assessment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F8FF] border border-[#9B6DFF]/20">
              <div className="flex items-center gap-2 text-xs font-bold text-[#9B6DFF] uppercase tracking-wider mb-2">
                <span>Semester 2 Focus</span>
              </div>
              <h3 className="text-lg font-bold text-[#071B3D] mb-2">
                Audiology, Sign Language, Pathology &amp; Viva (9 Subjects)
              </h3>
              <p className="text-xs sm:text-sm text-[#536B8E] leading-relaxed">
                Advanced studies in Oral Expression, Indian Sign Language (ISL), Digital Communications, Auditory Sound Physics, Introductory Speech-Language Pathology, Community Rehabilitation, Legal Writing, Project Submission, and Comprehensive Viva.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Curriculum Accordion Component */}
      <CourseStructure initialCurriculum={curriculum} />

      {/* Curriculum Reference Disclosure */}
      <section className="py-12 bg-[#F5F8FF] border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-white border border-[#2684FF]/20 shadow-sm flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-[#2684FF] flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#536B8E] leading-relaxed">
              <strong className="text-[#071B3D] block mb-1">
                Official Curriculum Source Attribution:
              </strong>
              The 18-subject curriculum outline presented above is referenced from the official syllabus published by the National Institute for Empowerment of Persons with Multiple Disabilities (NIED) for the Diploma in Hearing Language and Speech. Batch schedules, instructional medium, classroom modes, and laboratory sessions at SR College of Education, Rohtak are structured according to academic session guidelines.
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/eligibility-admission"
              className="px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#2684FF] to-[#9B6DFF] hover:brightness-110 shadow-lg shadow-[#2684FF]/30 transition-all flex items-center gap-2"
            >
              <span>Check Eligibility &amp; Apply</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/faqs"
              className="px-6 py-3 rounded-full font-semibold text-sm text-[#071B3D] bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-sm"
            >
              <span>Frequently Asked Questions</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
