import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  AlertCircle,
  Phone,
  Clock,
} from "lucide-react";
import Eligibility from "@/components/Eligibility";
import AdmissionEnquiry from "@/components/AdmissionEnquiry";
import PublicLayout from "@/components/PublicLayout";
import { getCourseContent } from "@/lib/dataStore";

export const metadata = {
  title: "Eligibility & Admission | SR College of Education",
  description:
    "Review eligibility criteria (12th & Above) and submit an official admission enquiry for the Diploma in Hearing Language and Speech (DHLS) at SR College of Education, Rohtak.",
};

export default function EligibilityAdmissionPage() {
  const content = getCourseContent();

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
            <span className="text-white font-semibold">Eligibility &amp; Admission</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            DHLS Eligibility &amp; <span className="text-[#D9AD54]">Admission Process</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
            Clear, honest information regarding the published eligibility qualifications and the verified admission counseling procedure for the Diploma in Hearing Language and Speech.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <GraduationCap className="w-4 h-4 text-[#D9AD54]" />
              <span>Criterion: <strong>12th and Above</strong> (Higher Secondary)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Clock className="w-4 h-4 text-[#D9AD54]" />
              <span>Duration: <strong>1 Academic Year (2 Semesters)</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Institutional Disclosure Notice */}
      <section className="py-6 bg-[#FFFCF6] border-b border-[#E8E2D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-2xl bg-white border border-[#D9AD54]/40 flex items-start gap-3.5 text-xs sm:text-sm text-[#263238] shadow-2xs leading-relaxed">
            <AlertCircle className="w-5 h-5 text-[#B88B2E] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-[#172A50] block mb-1">
                Transparency &amp; Batch Availability Notice:
              </strong>
              Course specifications (1 Year, 12th &amp; Above eligibility, Online/Offline mode) are referenced from the official curriculum published by NIED. Admissions at SR College of Education, Rohtak are subject to institutional calendar scheduling, seat quotas, and official batch sanctioning. Submitting an enquiry allows the college admissions desk to provide verified, up-to-date schedule confirmation without making premature guarantees.
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: 3-Step Process (Eligibility Component) */}
      <Eligibility />

      {/* Section 2: Interactive Admission Enquiry Form connected to /api/enquire */}
      <div id="enquiry">
        <AdmissionEnquiry />
      </div>

      {/* Section 3: Admissions Helpdesk Support Bar */}
      <section className="py-16 bg-[#FFFCF6] border-t border-[#E8E2D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#172A50] text-white p-7 sm:p-9 shadow-xl border border-[#26345B] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#D9AD54] tracking-wider block mb-1">
                Direct Admissions Consultation
              </span>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Need Immediate Assistance with Your Application?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Speak directly with an SR College admissions counselor for guidance regarding documentation, eligibility verification, and campus visits.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
              <a
                href="tel:9416968076"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] transition-all shadow-md font-mono cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Call 9416968076</span>
              </a>

              <a
                href="tel:9052002305"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-mono cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#D9AD54]" />
                <span>Call 9052002305</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
