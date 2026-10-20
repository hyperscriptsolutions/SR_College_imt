import React from "react";
import Image from "next/image";
import { MessageSquareText, Headphones, Activity, BookOpen, CheckCircle, Info } from "lucide-react";

export default function AboutDHLS() {
  const pillarCards = [
    {
      title: "Communication and Language",
      icon: MessageSquareText,
      iconBg: "bg-[#8B1745]/10 text-[#8B1745]",
      description:
        "Explores the fundamentals of interpersonal communication, language acquisition, oral and written expression, and multi-modal interaction techniques.",
      highlights: [
        "Communication dynamics & linguistic theories",
        "Oral and written language analysis",
        "Language intervention & generation models",
      ],
      image: "/images/biology_lab_interior.png",
      imageAlt: "S. R. College speech biology and anatomy laboratory interior with anatomical charts",
    },
    {
      title: "Understanding Hearing",
      icon: Headphones,
      iconBg: "bg-[#D9AD54]/15 text-[#B88B2E]",
      description:
        "Introduces the basics of the auditory system, hearing loss, and the use of diagnostic frequencies, audiometric procedures, and qualitative evaluation principles.",
      highlights: [
        "Acoustics, mechanics & frequency spectrums",
        "Methods of audiological testing",
        "Introductory knowledge of hearing aids",
      ],
      image: "/images/campus_building_3.jpg",
      imageAlt: "S. R. College soundproof audiometric testing chamber with observation control window",
    },
    {
      title: "Speech and Language",
      icon: Activity,
      iconBg: "bg-[#172A50]/10 text-[#172A50]",
      description:
        "Examines the biological underpinnings, psychology of speech mechanisms, voice articulators, voice production, and foundational speech-language pathology.",
      highlights: [
        "Anatomy & physiology of vocal organs",
        "Mechanisms of speech production",
        "Considerations in speech and language pathology",
      ],
      image: "/images/campus_building_2.jpg",
      imageAlt: "S. R. College speech-language therapy consultation room and articulation clinical lab",
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FFFCF6] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9AD54]/10 border border-[#D9AD54]/30 text-xs font-bold text-[#B88B2E] uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#D9AD54]" />
            Curriculum Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172A50] tracking-tight mb-4">
            What is <span className="text-[#D9AD54]">DHLS?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#718096] leading-relaxed">
            <strong className="text-[#172A50]">DHLS</strong> stands for{" "}
            <span className="text-[#172A50] font-semibold">Diploma in Hearing Language and Speech</span>. It is an 
            offline, regular 1-year diploma course recognised by the Rehabilitation Council of India (RCI), focused on 
            the comprehensive study of human communication, vocal mechanics, auditory acoustics, and speech-language rehabilitation.
          </p>
        </div>

        {/* 3 Academic Cards with Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pillarCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#172A50] mb-2.5">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#718096] leading-relaxed mb-5">
                    {card.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 mb-6">
                    {card.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#263238] font-medium">
                        <CheckCircle className="w-4 h-4 text-[#8B1745] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Photograph */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-[#E8E2D8] mt-2 bg-stone-100">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted Clarification Note */}
        <div className="max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-[#D9AD54]/15 text-[#B88B2E] flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-[#718096] leading-relaxed">
            <strong className="text-[#172A50] font-semibold">Academic Accreditation:</strong>{" "}
            The DHLS program at S. R. College of Education, Rohtak is an offline, regular 1-year diploma course recognised by the Rehabilitation Council of India (RCI). It delivers rigorous classroom instruction, specialized audiology instrumentation labs, and clinical speech-language therapy training.
          </div>
        </div>

      </div>
    </section>
  );
}
