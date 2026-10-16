import React from "react";
import { MessageSquareText, Headphones, Activity, BookOpen, CheckCircle, Info } from "lucide-react";

export default function AboutDHLS() {
  const pillarCards = [
    {
      title: "Communication and Language",
      icon: MessageSquareText,
      gradient: "from-[#367BFF] to-[#1A54D6]",
      iconBg: "bg-[#367BFF]/10 text-[#367BFF]",
      description:
        "Explores the fundamentals of interpersonal communication theories, language acquisition, oral and written expression, and multi-modal interaction techniques.",
      highlights: [
        "Communication dynamics & linguistic theories",
        "Oral and written language mastery",
        "Language interpretation & expression models",
      ],
    },
    {
      title: "Understanding Hearing",
      icon: Headphones,
      gradient: "from-[#A99BFF] to-[#7056E8]",
      iconBg: "bg-[#A99BFF]/15 text-[#7056E8]",
      description:
        "Introduces the acoustic physics of sound, how the human ear receives and decodes frequencies, and introductory audiological evaluation principles.",
      highlights: [
        "Acoustics, decibels & frequency spectrums",
        "Mechanics of auditory perception",
        "Introductory audiological concepts",
      ],
    },
    {
      title: "Speech and Language",
      icon: Activity,
      gradient: "from-[#10264A] to-[#1A3A6D]",
      iconBg: "bg-[#10264A]/10 text-[#10264A]",
      description:
        "Examines the biological anatomy and physiology of speech mechanisms, vocal articulators, voice production, and foundational speech-language pathology.",
      highlights: [
        "Anatomy & physiology of vocal organs",
        "Mechanisms of speech articulation",
        "Foundational speech and language pathology",
      ],
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#F5F7FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#367BFF]/10 border border-[#367BFF]/20 text-xs font-bold text-[#367BFF] uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10264A] tracking-tight mb-4">
            What is DHLS?
          </h2>
          <p className="text-base sm:text-lg text-[#586885] leading-relaxed">
            <strong className="text-[#10264A]">DHLS</strong> stands for{" "}
            <span className="text-[#367BFF] font-semibold">Diploma in Hearing Language and Speech</span>. It is a 
            structured academic curriculum focused on the foundational study of human communication, speech articulation, 
            auditory acoustics, and language development.
          </p>
        </div>

        {/* 3 Visual Core Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pillarCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 card-hover-shadow flex flex-col justify-between"
              >
                {/* Top accent bar on hover */}
                <div
                  className={`absolute top-0 left-8 right-8 h-1 bg-gradient-to-r ${card.gradient} rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div>
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#10264A] mb-3 group-hover:text-[#367BFF] transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#586885] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {card.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-[#17233C] font-medium">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Academic Disclaimer */}
        <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-[#586885] leading-relaxed">
            <strong className="text-[#10264A] font-semibold">Important Clarification:</strong>{" "}
            The DHLS course provides foundational theoretical and laboratory learning in communication, hearing, and speech disciplines. 
            In keeping with regulatory standards, completion of an academic diploma does not automatically imply independent clinical practice, 
            statutory licensure, or guaranteed employment. Professional accreditation requirements depend on governing regulatory bodies.
          </div>
        </div>

      </div>
    </section>
  );
}
