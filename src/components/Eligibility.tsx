import React from "react";
import { GraduationCap, FileCheck, PhoneCall, AlertTriangle, ArrowRight } from "lucide-react";

export default function Eligibility() {
  const steps = [
    {
      stepNumber: "01",
      title: "Review Your Qualification",
      icon: GraduationCap,
      badge: "Eligibility: 12th (PCM / PCB) & Above",
      badgeColor: "bg-[#8B1745]/10 text-[#8B1745] border-[#8B1745]/20",
      description:
        "The DHLS program is an offline, regular 1-year diploma course recognised by the Rehabilitation Council of India (RCI). The entry eligibility criterion is 12th (PCM or PCB) and Above. Students who have successfully completed their 10+2 / Higher Secondary education with Physics, Chemistry, Mathematics (PCM) or Biology (PCB) from a recognized education board are eligible to apply.",
      note: "Candidates must have completed 10+2 with PCM or PCB; regular offline course recognised by RCI.",
    },
    {
      stepNumber: "02",
      title: "Review Course Guidelines",
      icon: FileCheck,
      badge: "RCI Syllabus Framework",
      badgeColor: "bg-[#D9AD54]/15 text-[#B88B2E] border-[#D9AD54]/30",
      description:
        "Understand the curriculum subjects spanning across 2 semesters, including speech mechanics, communication theories, sign language, and audiological fundamentals. Ensure the curriculum aligns with your learning interests.",
      note: "Curriculum structure is recognized by the Rehabilitation Council of India (RCI).",
    },
    {
      stepNumber: "03",
      title: "NBER-RCI Central Admission",
      icon: PhoneCall,
      badge: "Intake: 30 Seats",
      badgeColor: "bg-[#172A50]/10 text-[#172A50] border-[#172A50]/20",
      description:
        "DHLS has an intake capacity of 30 seats. Admissions are conducted centrally through registration on the NBER-RCI portal, generally during the months of August to October. Candidates must complete the online registration process and follow the prescribed counselling and admission procedure.",
      note: "Central registration via NBER-RCI portal (Aug-Oct); 30 intake capacity.",
    },
  ];

  return (
    <section id="eligibility" className="py-20 sm:py-28 bg-[#FFFCF6] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9AD54]/10 border border-[#D9AD54]/30 text-xs font-bold text-[#B88B2E] uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#D9AD54]" />
            Eligibility &amp; Verification Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172A50] tracking-tight mb-4">
            Is This Course for You?
          </h2>
          <p className="text-base sm:text-lg text-[#718096] leading-relaxed">
            The DHLS program is an offline, regular 1-year diploma course recognised by the Rehabilitation Council of India (RCI) with entry eligibility as{" "}
            <span className="font-bold text-[#172A50] bg-white border border-[#E8E2D8] px-2.5 py-0.5 rounded-md shadow-2xs">
              12th (PCM / PCB) and Above
            </span>
            . Follow this straightforward 3-step process to evaluate your eligibility and confirm admission details.
          </p>
        </div>

        {/* Step-by-Step Progress Presentation */}
        <div className="relative mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Step Number & Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-extrabold text-[#172A50]/80 tracking-tight">
                        {step.stepNumber}
                      </span>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>

                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-2xl bg-[#FFFCF6] shadow-2xs border border-[#E8E2D8] flex items-center justify-center text-[#172A50] mb-5">
                      <Icon className="w-6 h-6 text-[#172A50]" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#172A50] mb-2.5">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#718096] leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  {/* Footnote inside card */}
                  <div className="pt-4 border-t border-stone-100 text-xs text-[#718096] italic">
                    {step.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official College Confirmation Alert */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#172A50] text-white p-6 sm:p-8 shadow-xl border border-[#26345B]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-white/10 text-[#D9AD54] flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                  Central Admission on NBER-RCI Portal (30 Seats Intake)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                  DHLS has an intake capacity of 30 seats. Admissions are conducted centrally through registration on the NBER-RCI portal, generally during the months of August to October. Candidates must complete the online registration process and follow the prescribed counselling and admission procedure. Contact our admissions desk for helpdesk guidance.
                </p>
              </div>
            </div>

            <a
              href="/eligibility-admission#enquiry"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>Enquire for Confirmation</span>
              <ArrowRight className="w-4 h-4 text-[#172A50]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
