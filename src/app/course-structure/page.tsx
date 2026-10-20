import React from "react";
import Link from "next/link";
import {
  BookMarked,
  Clock,
  Award,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import CourseStructure from "@/components/CourseStructure";
import PublicLayout from "@/components/PublicLayout";
import { getCurriculum } from "@/lib/dataStore";

export const metadata = {
  title: "DHLS Course Structure & Syllabus | S. R. College of Education",
  description:
    "Explore the 1-Year, 18-subject curriculum for the Diploma in Hearing Language and Speech (DHLS) across Semester 1 and Semester 2, referenced from NIED.",
};

export default function CourseStructurePage() {
  const curriculum = getCurriculum();

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
            <span className="text-white font-semibold">Course Structure</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            DHLS Academic Curriculum &amp; <span className="text-[#D9AD54]">Semester Syllabus</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
            A comprehensive, modular 1-Year curriculum comprising 18 subjects organized across two academic semesters, referenced directly from published NIED course specifications.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Clock className="w-4 h-4 text-[#D9AD54]" />
              <span>Program Duration: <strong>1 Year (2 Semesters)</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <BookMarked className="w-4 h-4 text-[#D9AD54]" />
              <span>Total Subjects: <strong>18 Core Disciplines</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Award className="w-4 h-4 text-[#D9AD54]" />
              <span>Evaluation: <strong>Assessments, Projects &amp; Viva</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Overview Highlights */}
      <section className="py-12 bg-[#FFFCF6] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8B1745] uppercase tracking-wider mb-2">
                <span>Semester 1 Focus</span>
              </div>
              <h3 className="text-lg font-bold text-[#172A50] mb-2">
                Communication, Language &amp; Vocal Anatomy (9 Subjects)
              </h3>
              <p className="text-xs sm:text-sm text-[#718096] leading-relaxed">
                Foundational study covering Personality Development, Classical Communication Models, Linguistic Expression, Oral &amp; Written Skills, Language Interpreting, Anatomy &amp; Physiology of the Speech Mechanism, and Continuous Internal Assessment.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#D9AD54] uppercase tracking-wider mb-2">
                <span>Semester 2 Focus</span>
              </div>
              <h3 className="text-lg font-bold text-[#172A50] mb-2">
                Audiology, Sign Language, Pathology &amp; Viva (9 Subjects)
              </h3>
              <p className="text-xs sm:text-sm text-[#718096] leading-relaxed">
                Advanced studies in Oral Expression, Indian Sign Language (ISL), Digital Communications, Auditory Sound Physics, Introductory Speech-Language Pathology, Community Rehabilitation, Legal Writing, Project Submission, and Comprehensive Viva.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Curriculum Accordion Component */}
      <CourseStructure initialCurriculum={curriculum} />

      {/* Curriculum Reference Disclosure */}
      <section className="py-12 bg-[#FFFCF6] border-t border-[#E8E2D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-2xs flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-[#D9AD54] flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#718096] leading-relaxed">
              <strong className="text-[#172A50] block mb-1">
                Official Curriculum Source Attribution:
              </strong>
              The 18-subject curriculum outline presented above is referenced from the official syllabus published by the National Institute for Empowerment of Persons with Multiple Disabilities (NIED) for the Diploma in Hearing Language and Speech. Batch schedules, instructional medium, classroom modes, and laboratory sessions at S. R. College of Education, Rohtak are structured according to academic session guidelines.
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/eligibility-admission"
              className="px-7 py-3.5 rounded-full font-bold text-sm text-white bg-[#8B1745] hover:bg-[#721238] shadow-md transition-all flex items-center gap-2"
            >
              <span>Check Eligibility &amp; Apply</span>
              <ArrowRight className="w-4 h-4 text-[#D9AD54]" />
            </Link>
            <Link
              href="/faqs"
              className="px-6 py-3.5 rounded-full font-semibold text-sm text-[#172A50] bg-white hover:bg-stone-50 border border-[#E8E2D8] transition-all shadow-2xs"
            >
              <span>Frequently Asked Questions</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
