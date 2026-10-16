import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ClipboardCheck,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
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
      <section className="relative pt-32 sm:pt-40 pb-20 bg-gradient-to-b from-[#071B3D] via-[#0A224D] to-[#071B3D] text-white overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#2684FF]/20 via-[#9B6DFF]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-10 w-80 h-80 bg-[#29D7FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb Navigation */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-300 mb-6 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#29D7FF]">/</span>
            <span className="text-white font-semibold">Eligibility &amp; Admission</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            DHLS Eligibility &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29D7FF] via-[#2684FF] to-[#9B6DFF]">Admission Process</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
            Clear, honest information regarding the published eligibility qualifications and the verified admission counseling procedure for the Diploma in Hearing Language and Speech.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <GraduationCap className="w-4 h-4 text-[#29D7FF]" />
              <span>Criterion: <strong>12th and Above</strong> (Higher Secondary)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <Clock className="w-4 h-4 text-[#9B6DFF]" />
              <span>Duration: <strong>1 Academic Year (2 Semesters)</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Institutional Disclosure Notice */}
      <section className="py-8 bg-amber-500/10 border-y border-amber-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 text-xs sm:text-sm text-amber-950 leading-relaxed">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-900 block mb-1">
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
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#071B3D] via-[#102B58] to-[#071B3D] text-white p-8 sm:p-10 shadow-xl border border-[#29D7FF]/25 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-bold text-[#29D7FF] tracking-wider block mb-1">
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-[#071B3D] bg-[#29D7FF] hover:bg-[#6ee5ff] transition-all shadow-md font-mono"
              >
                <Phone className="w-4 h-4" />
                <span>Call 9416968076</span>
              </a>

              <a
                href="tel:9896302035"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-mono"
              >
                <Phone className="w-4 h-4" />
                <span>Call 9896302035</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
