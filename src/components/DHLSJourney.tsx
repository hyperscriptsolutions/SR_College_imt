"use client";

import React, { useState } from "react";
import { Compass, BookCheck, ClipboardList, PhoneCall, Award, ArrowRight } from "lucide-react";

export default function DHLSJourney() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      stage: "01",
      title: "Explore the Course",
      icon: Compass,
      description: "Review the regular 1-year offline curriculum, 2 semesters, and 18 subjects recognized by RCI.",
      tag: "Self-Review",
    },
    {
      stage: "02",
      title: "Check Eligibility",
      icon: BookCheck,
      description: "Verify that you meet the listed entry qualification of '12th (PCM or PCB) and Above' from any recognized board.",
      tag: "Verification",
    },
    {
      stage: "03",
      title: "Register on NBER-RCI Portal",
      icon: ClipboardList,
      description: "DHLS has an intake capacity of 30 seats. Admissions are conducted centrally through online registration on the NBER-RCI portal (August to October).",
      tag: "Central Admission (30 Seats)",
    },
    {
      stage: "04",
      title: "Contact the College",
      icon: PhoneCall,
      description: "Speak with our dedicated admissions representatives via phone, email, or campus visit in Rohtak.",
      tag: "Direct Interaction",
    },
    {
      stage: "05",
      title: "Counselling & Admission",
      icon: Award,
      description: "Follow the prescribed online counselling and admission procedure to complete enrollment at S. R. College of Education.",
      tag: "Prescribed Counselling",
    },
  ];

  return (
    <section id="journey" className="py-20 sm:py-28 bg-[#172A50] text-white relative overflow-hidden border-t border-[#26345B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#D9AD54] uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#D9AD54]" />
            Student Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Your DHLS Journey
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            A transparent step-by-step pathway for students interested in discovering the Diploma in Hearing Language and Speech program.
          </p>
        </div>

        {/* Desktop Horizontal Timeline (visible on lg+) */}
        <div className="hidden lg:block relative mb-16">
          {/* Continuous progress connector line */}
          <div
            className="absolute top-12 left-16 right-16 h-0.5 bg-[#D9AD54]/40 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {stages.map((st, idx) => {
              const Icon = st.icon;
              const isActive = activeStage === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStage(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveStage(idx);
                    }
                  }}
                  aria-pressed={isActive}
                >
                  {/* Stage Number & Icon Circle */}
                  <div className="relative mb-5">
                    <div
                      className={`w-22 h-22 rounded-3xl flex flex-col items-center justify-center shadow-md transition-all duration-200 ${
                        isActive
                          ? "bg-[#26345B] border-2 border-[#D9AD54] ring-2 ring-[#D9AD54]/50 scale-105"
                          : "bg-[#1E2E50] border-2 border-[#D9AD54]/30 hover:border-[#D9AD54] hover:scale-105"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 mb-1 transition-colors ${
                          isActive ? "text-[#D9AD54]" : "text-slate-300 group-hover:text-white"
                        }`}
                      />
                      <span className={`text-[11px] font-bold ${isActive ? "text-white" : "text-slate-400"}`}>
                        {st.stage}
                      </span>
                    </div>
                  </div>

                  {/* Stage Tag */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-2.5 py-0.5 rounded-full border transition-colors ${
                      isActive
                        ? "text-[#D9AD54] bg-[#D9AD54]/20 border-[#D9AD54]"
                        : "text-slate-300 bg-white/5 border-white/10"
                    }`}
                  >
                    {st.tag}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-base font-bold mb-2 transition-colors ${
                      isActive ? "text-[#D9AD54]" : "text-white group-hover:text-[#D9AD54]"
                    }`}
                  >
                    {st.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs leading-relaxed max-w-[200px] transition-colors ${
                      isActive ? "text-white font-medium" : "text-slate-300"
                    }`}
                  >
                    {st.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (visible on sm/md) */}
        <div className="lg:hidden relative border-l-2 border-[#D9AD54]/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10 mb-14">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            const isActive = activeStage === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStage(idx)}
                className="relative group cursor-pointer"
                role="button"
                tabIndex={0}
              >
                {/* Node indicator */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full border-4 border-[#172A50] flex items-center justify-center text-xs font-bold shadow-md transition-colors ${
                    isActive ? "bg-[#D9AD54] text-[#172A50]" : "bg-white/20 text-white"
                  }`}
                >
                  {st.stage}
                </div>

                <div
                  className={`p-5 rounded-2xl border backdrop-blur-xs transition-all ${
                    isActive
                      ? "bg-[#26345B] border-[#D9AD54] shadow-md ring-1 ring-[#D9AD54]/40"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#D9AD54]" : "text-slate-300"}`} />
                      <h3 className={`text-base font-bold ${isActive ? "text-[#D9AD54]" : "text-white"}`}>
                        {st.title}
                      </h3>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        isActive
                          ? "bg-[#D9AD54]/20 border-[#D9AD54] text-[#D9AD54]"
                          : "bg-white/10 border-white/10 text-slate-300"
                      }`}
                    >
                      {st.tag}
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isActive ? "text-white font-medium" : "text-slate-300"}`}>
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Callout */}
        <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            <strong className="text-white">Informational Pathway:</strong> This journey outlines the standard procedure for prospective applicants to explore the course and communicate with the college. It does not imply that admissions are automatically open or guaranteed.
          </p>
          <a
            href="/eligibility-admission#enquiry"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] px-6 py-3 rounded-full shadow-md transition-colors cursor-pointer"
          >
            <span>Start by Submitting an Enquiry</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#172A50]" />
          </a>
        </div>

      </div>
    </section>
  );
}
