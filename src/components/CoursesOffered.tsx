"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import type { CourseOffering } from "@/lib/dataStore";

interface CoursesOfferedProps {
  courses?: CourseOffering[];
}

export default function CoursesOffered({ courses = [] }: CoursesOfferedProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  return (
    <section id="courses" className="py-16 sm:py-24 bg-[#FFFCF6] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172A50]/5 border border-[#172A50]/10 text-[#172A50] text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-[#D9AD54]" />
            <span>Academic Programs 2026–27</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172A50] tracking-tight leading-tight mb-4">
            Courses Offered at S.R. College of Education
          </h2>
          <p className="text-base sm:text-lg text-[#718096] leading-relaxed">
            Recognized by NCTE & RCI, affiliated to Maharshi Dayanand University (MDU), Rohtak.
            Choose from professional programs in general teacher training, special education, clinical psychology, and audiology.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#172A50] text-white shadow-sm"
                    : "bg-white text-[#172A50] border border-[#E8E2D8] hover:border-[#172A50]/30 hover:bg-stone-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map((course, idx) => (
            <div
              key={course.id || idx}
              className="academic-card flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#E8E2D8] hover:shadow-lg transition-all duration-200 group relative"
            >
              {/* Card Top: Category & Seats */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#172A50]/5 text-[#172A50] border border-[#172A50]/10">
                    {course.category}
                  </span>
                  {course.seats && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8B1745] bg-[#8B1745]/5 px-2.5 py-0.5 rounded-full">
                      <Users className="w-3 h-3" />
                      {course.seats}
                    </span>
                  )}
                </div>

                {/* Course Name */}
                <h3 className="text-xl sm:text-2xl font-bold text-[#172A50] mb-2 group-hover:text-[#8B1745] transition-colors">
                  <Link href={`/courses/${course.id}`} className="hover:underline">
                    {course.name}
                  </Link>
                </h3>

                {/* Duration & Affiliation Pills */}
                <div className="flex flex-col gap-1.5 mb-4 text-xs font-semibold text-[#718096]">
                  <div className="flex items-center gap-2 text-[#172A50]">
                    <Clock className="w-3.5 h-3.5 text-[#D9AD54] shrink-0" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#172A50] shrink-0" />
                    <span className="truncate">{course.affiliation}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#718096] leading-relaxed mb-5 line-clamp-3">
                  {course.description}
                </p>

                {/* Eligibility Block */}
                <div className="p-3.5 rounded-xl bg-[#FFFCF6] border border-[#E8E2D8] mb-5">
                  <div className="text-[10px] font-extrabold uppercase text-[#172A50] tracking-wider mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-[#D9AD54]" />
                    <span>Eligibility</span>
                  </div>
                  <p className="text-xs text-[#263238] font-medium leading-snug">
                    {course.eligibility}
                  </p>
                </div>

                {/* Highlights */}
                {course.highlights && course.highlights.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {course.highlights.map((highlight: string, hIdx: number) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-[#263238]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Card Footer: Action Buttons */}
              <div className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center gap-2 mt-auto">
                <Link
                  href={`/courses/${course.id}#enquiry`}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-center text-xs font-bold text-white bg-[#172A50] hover:bg-[#26345B] shadow-xs transition-all flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
                >
                  <span>Enquire Admission</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9AD54] transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={`/courses/${course.id}`}
                  className="w-full sm:w-auto py-2.5 px-3.5 rounded-xl text-center text-xs font-semibold text-[#172A50] bg-stone-100 hover:bg-stone-200 border border-[#E8E2D8] transition-all flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global Admissions Assistance Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#172A50] to-[#26345B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-[#D9AD54]" />
              <span>Dedicated Admission Desk</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">
              Need Counseling on Course Eligibility or Career Scope?
            </h3>
            <p className="text-xs sm:text-sm text-stone-200">
              Speak directly with our academic coordinators for B.Ed, M.Ed, PGDRP, and DHLS admissions guidance.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/courses"
              className="px-5 py-2.5 rounded-full bg-white text-[#172A50] hover:bg-stone-100 text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="tel:9896302035"
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-bold shadow-xs transition-all"
            >
              Call 9896302035
            </a>
            <Link
              href="/eligibility-admission#enquiry"
              className="px-5 py-2.5 rounded-full bg-[#D9AD54] text-[#172A50] hover:bg-[#c99d44] text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>Submit Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

