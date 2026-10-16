import React from "react";
import { Compass, BookCheck, ClipboardList, PhoneCall, Award, ArrowRight } from "lucide-react";

export default function DHLSJourney() {
  const stages = [
    {
      stage: "01",
      title: "Explore the Course",
      icon: Compass,
      description: "Review the full curriculum, 2 semesters, and 18 subjects published in the NIED course outline.",
      tag: "Self-Review",
    },
    {
      stage: "02",
      title: "Check Eligibility",
      icon: BookCheck,
      description: "Verify that you meet the listed entry qualification of '12th and Above' from any recognized board.",
      tag: "Verification",
    },
    {
      stage: "03",
      title: "Confirm Admission Status",
      icon: ClipboardList,
      description: "Check directly with SR College of Education to verify if DHLS admissions are currently open for this session.",
      tag: "College Confirmation",
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
      title: "Follow Official Process",
      icon: Award,
      description: "Complete verified documentation and institutional formalities according to official college guidelines.",
      tag: "Enrollment Steps",
    },
  ];

  return (
    <section id="journey" className="py-20 sm:py-28 bg-[#10264A] text-white relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#367BFF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A99BFF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#A99BFF] uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#367BFF]" />
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
            className="absolute top-12 left-16 right-16 h-1 bg-gradient-to-r from-[#367BFF] via-[#A99BFF] to-[#367BFF] opacity-40 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {stages.map((st, idx) => {
              const Icon = st.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center group">
                  {/* Stage Number & Icon Circle */}
                  <div className="relative mb-5">
                    <div className="w-24 h-24 rounded-3xl bg-[#0B1A33] border-2 border-[#367BFF]/40 group-hover:border-[#367BFF] flex flex-col items-center justify-center shadow-lg shadow-[#0B1A33]/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[#367BFF]/25">
                      <Icon className="w-7 h-7 text-[#367BFF] mb-1 group-hover:text-[#A99BFF] transition-colors" />
                      <span className="text-[11px] font-extrabold text-slate-400">
                        {st.stage}
                      </span>
                    </div>
                  </div>

                  {/* Stage Tag */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A99BFF] mb-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {st.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#367BFF] transition-colors">
                    {st.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed max-w-[200px]">
                    {st.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline (visible on sm/md) */}
        <div className="lg:hidden relative border-l-2 border-[#367BFF]/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-10 mb-14">
          {stages.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="relative group">
                {/* Node indicator */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#367BFF] border-4 border-[#10264A] flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {st.stage}
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#367BFF]" />
                      <h3 className="text-base font-bold text-white">
                        {st.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-semibold text-[#A99BFF] px-2 py-0.5 rounded-full bg-white/10">
                      {st.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Callout */}
        <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            <strong className="text-white">Informational Pathway:</strong> This journey outlines the standard procedure for prospective applicants to explore the course and communicate with the college. It does not imply that admissions are automatically open or guaranteed.
          </p>
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#367BFF] hover:bg-[#286DEC] px-5 py-2.5 rounded-full shadow-md transition-colors"
          >
            <span>Start by Submitting an Enquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
