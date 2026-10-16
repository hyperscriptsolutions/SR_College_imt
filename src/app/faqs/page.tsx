import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import FAQSection from "@/components/FAQSection";
import PublicLayout from "@/components/PublicLayout";
import { getFAQs } from "@/lib/dataStore";

export const metadata = {
  title: "DHLS Frequently Asked Questions | SR College of Education",
  description:
    "Find clear answers regarding the DHLS diploma program duration, eligibility criteria, subjects, study mode, and admission enquiry channels at SR College of Education, Rohtak.",
};

export default function FAQsPage() {
  const faqs = getFAQs();

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
            <span className="text-white font-semibold">FAQs</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29D7FF] via-[#2684FF] to-[#9B6DFF]">Questions</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-6">
            Everything prospective students and parents need to know about the Diploma in Hearing Language and Speech (DHLS) curriculum, eligibility, syllabus, and admission procedures.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-200 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#29D7FF]" />
            <span>Answers ground strictly in published NIED specifications and verified college channels.</span>
          </div>
        </div>
      </section>

      {/* Main FAQ Accordion Component */}
      <FAQSection initialFaqs={faqs} />

      {/* Verification Notice Banner */}
      <section className="py-12 bg-white border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-[#F5F8FF] border border-[#2684FF]/20 flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-[#2684FF] flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#536B8E] leading-relaxed">
              <strong className="text-[#071B3D] block mb-1">
                Notice Regarding Fees &amp; Batch Scheduling:
              </strong>
              Official fee schedules, installment modes, and academic calendar dates are not listed as fixed amounts online to ensure candidates receive current, verified figures directly from the SR College admissions office. Contact our helpdesk for direct assistance.
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/eligibility-admission#enquiry"
              className="px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#2684FF] to-[#9B6DFF] hover:brightness-110 shadow-lg shadow-[#2684FF]/30 transition-all flex items-center gap-2"
            >
              <span>Submit Admission Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact-us"
              className="px-6 py-3 rounded-full font-semibold text-sm text-[#071B3D] bg-white hover:bg-slate-50 border border-slate-200 transition-all shadow-sm"
            >
              <span>Contact Admissions Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
