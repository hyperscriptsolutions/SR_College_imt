import React from "react";
import { GraduationCap, FileCheck, PhoneCall, AlertTriangle, ArrowRight } from "lucide-react";

export default function Eligibility() {
  const steps = [
    {
      stepNumber: "01",
      title: "Review Your Qualification",
      icon: GraduationCap,
      badge: "Eligibility: 12th & Above",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description:
        "According to the referenced NIED curriculum, the eligibility criterion is '12th and Above'. Students who have successfully completed their 10+2 / Higher Secondary education from a recognized education board are eligible to explore this course.",
      note: "No specific stream or minimum cut-off marks are presupposed; please confirm official college criteria.",
    },
    {
      stepNumber: "02",
      title: "Review Course Guidelines",
      icon: FileCheck,
      badge: "Reference Syllabus",
      badgeColor: "bg-[#367BFF]/10 text-[#367BFF] border-[#367BFF]/20",
      description:
        "Understand the curriculum subjects spanning across 2 semesters, including speech mechanics, communication theories, sign language, and audiological fundamentals. Ensure the curriculum aligns with your learning interests.",
      note: "Curriculum structure is referenced from published NIED documentation.",
    },
    {
      stepNumber: "03",
      title: "Confirm Admission Availability",
      icon: PhoneCall,
      badge: "Direct Verification",
      badgeColor: "bg-[#A99BFF]/15 text-[#7056E8] border-[#A99BFF]/30",
      description:
        "Get in touch directly with the SR College of Education administration to verify current admission status, seat allocation, batch commencement dates, and applicable documentation requirements.",
      note: "SR College of Education confirms its own official admissions and batch intake.",
    },
  ];

  return (
    <section id="eligibility" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10264A]/5 border border-[#10264A]/10 text-xs font-bold text-[#10264A] uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#367BFF]" />
            Eligibility & Verification Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10264A] tracking-tight mb-4">
            Is This Course for You?
          </h2>
          <p className="text-base sm:text-lg text-[#586885] leading-relaxed">
            The published NIED documentation lists the entry eligibility as{" "}
            <span className="font-bold text-[#10264A] bg-[#F0EDFF] px-2.5 py-0.5 rounded-md text-[#367BFF]">
              12th and Above
            </span>
            . Follow this straightforward 3-step process to evaluate your eligibility and confirm admission details.
          </p>
        </div>

        {/* Step-by-Step Progress Presentation */}
        <div className="relative mb-16">
          
          {/* Desktop connecting progress line */}
          <div
            className="hidden md:block absolute top-1/2 left-16 right-16 h-1 bg-gradient-to-r from-[#367BFF] via-[#A99BFF] to-[#10264A] -translate-y-12 z-0 opacity-30"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F5F7FC] rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 card-hover-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Step Number & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-extrabold text-[#367BFF]/80 tracking-tight">
                        {step.stepNumber}
                      </span>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>

                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-[#10264A] mb-5">
                      <Icon className="w-6 h-6 text-[#367BFF]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#10264A] mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#586885] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Footnote inside card */}
                  <div className="pt-4 border-t border-slate-200/60 text-xs text-slate-500 italic">
                    {step.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official College Confirmation Alert */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-[#10264A] to-[#1A3A6D] text-white p-6 sm:p-8 shadow-xl border border-[#367BFF]/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#367BFF]/20 text-[#A99BFF] flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                  Official College Confirmation Required
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  While NIED specifies "12th and Above", SR College of Education must officially confirm current session admission criteria, seat availability, and batch intake. Contact our admissions desk to verify today.
                </p>
              </div>
            </div>

            <a
              href="/eligibility-admission#enquiry"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#2684FF] hover:bg-[#1f6ecc] shadow-md shadow-[#2684FF]/30 transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Enquire for Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
