"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, CheckCircle2, Phone, Mail } from "lucide-react";
import type { FAQItem } from "@/lib/dataStore";

interface FAQSectionProps {
  initialFaqs?: FAQItem[];
}

export default function FAQSection({ initialFaqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default

  const fallbackFaqs = [
    {
      question: "What does DHLS stand for?",
      answer:
        "DHLS stands for Diploma in Hearing Language and Speech. It is an educational diploma program focused on the foundational study of human communication, speech and language articulation, auditory acoustics, and speech mechanisms.",
    },
    {
      question: "How long is the DHLS course according to NIED?",
      answer:
        "According to the official course information published on the NIED portal, the DHLS course has a duration of 1 Year, structured across two academic semesters.",
    },
    {
      question: "What educational qualification is listed for eligibility?",
      answer:
        "As listed in the referenced NIED documentation, the eligibility criterion is '12th and Above'. Applicants who have completed their 10+2 / Higher Secondary education or higher from a recognized board can explore this program. Specific stream criteria or marks requirements should be confirmed directly with the college.",
    },
    {
      question: "What subjects are included in DHLS?",
      answer:
        "The curriculum comprises 18 subjects across two semesters. Semester 1 includes Personality Development & Communication Skills, Communication Theories, Expressionism of the Language, Developing Oral & Written Skills, Command Over Targeted Language, Language Interpreting, Communication Language & Speech, Anatomy & Physiology of the Speech Mechanism, and Internal Assessment. Semester 2 includes Oral Expression, Indian Sign Language (ISL), Communicative English & Computers, Audiology, Speech & Language Pathology, Community-Based Rehabilitation, Legal Language & Writing, Internal Assessment & Project, and Viva.",
    },
    {
      question: "Is the course available online or offline according to NIED?",
      answer:
        "According to the information listed by NIED, the course is referenced as available in Online / Offline modes. However, classroom lectures, practical lab sessions, and internal assessments are subject to the specific operational mode adopted by the college for any given academic batch.",
    },
    {
      question: "How can I contact SR College of Education?",
      answer:
        "You can contact SR College of Education via phone at 9416968076 or 9052002305, by email at srcollegeofeducation@gmail.com, or by visiting the campus located at L.M.T., Sector 30-A, Near Saint Gate, Rohtak – 124001, Haryana, India. You can also submit the admission enquiry form on this website.",
    },
    {
      question: "Is DHLS admission currently available at SR College?",
      answer:
        "Admissions for specific academic batches, seat capacity, and intake status are scheduled periodically by SR College of Education. Because admission openings vary by academic session, prospective students are advised to submit an enquiry or call the college admissions office directly to confirm current availability.",
    },
    {
      question: "What are the current fees and admission requirements?",
      answer:
        "Official fee structures, installment schedules, and mandatory enrollment documentation must be confirmed directly with SR College of Education. The institution does not publish unverified fee amounts online to ensure students receive accurate, up-to-date financial and academic guidance.",
    },
  ];

  const publishedFaqs =
    initialFaqs && initialFaqs.length > 0
      ? initialFaqs.filter((f) => f.isPublished !== false).sort((a, b) => a.sortOrder - b.sortOrder)
      : fallbackFaqs;

  const faqs = publishedFaqs.length > 0 ? publishedFaqs : fallbackFaqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 sm:py-28 bg-[#FFFCF6] relative border-t border-[#E8E2D8]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9AD54]/10 border border-[#D9AD54]/30 text-xs font-bold text-[#B88B2E] uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#D9AD54]" />
            Clear &amp; Honest Answers
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172A50] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#718096] leading-relaxed">
            Find answers regarding the DHLS curriculum based on published NIED specifications and verified SR College of Education contact channels.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#172A50] shadow-sm ring-1 ring-[#172A50]/40"
                    : "bg-white border-[#E8E2D8] hover:border-[#D9AD54] shadow-2xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-[#172A50] flex items-center gap-3">
                    <span className="text-xs font-bold text-[#8B1745] bg-[#8B1745]/10 px-2.5 py-0.5 rounded-md">
                      Q{index + 1}
                    </span>
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? "bg-[#172A50] text-white" : "bg-stone-100 text-[#718096]"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-[#718096] leading-relaxed border-t border-stone-100">
                    <div className="flex items-start gap-3 mt-3">
                      <CheckCircle2 className="w-5 h-5 text-[#8B1745] flex-shrink-0 mt-0.5" />
                      <div>{faq.answer}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Contact Bar for Any Other Questions */}
        <div className="rounded-3xl bg-white border border-[#E8E2D8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-[#172A50] mb-1">
              Have another question about DHLS?
            </h4>
            <p className="text-xs sm:text-sm text-[#718096]">
              Our admissions team is available to address your inquiries directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:9416968076"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#172A50] bg-white border border-[#E8E2D8] hover:border-[#D9AD54] transition-colors shadow-2xs"
            >
              <Phone className="w-4 h-4 text-[#D9AD54]" />
              <span className="font-mono">9416968076</span>
            </a>
            <a
              href="mailto:srcollegeofeducation@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1745] hover:bg-[#721238] transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#D9AD54]" />
              <span>Email Admissions</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
