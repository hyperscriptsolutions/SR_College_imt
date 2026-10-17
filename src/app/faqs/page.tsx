import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  AlertCircle,
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
      <section className="relative pt-32 sm:pt-40 pb-20 bg-[#172A50] text-white overflow-hidden border-b border-[#26345B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb Navigation */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-300 mb-6 backdrop-blur-xs">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#D9AD54]">/</span>
            <span className="text-white font-semibold">FAQs</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Frequently Asked <span className="text-[#D9AD54]">Questions</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-6">
            Everything prospective students and parents need to know about the Diploma in Hearing Language and Speech (DHLS) curriculum, eligibility, syllabus, and admission procedures.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-200 backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-[#D9AD54]" />
            <span>Answers grounded strictly in published curriculum specifications and verified college channels.</span>
          </div>
        </div>
      </section>

      {/* Main FAQ Accordion Component */}
      <FAQSection initialFaqs={faqs} />

      {/* Verification Notice Banner */}
      <section className="py-12 bg-[#FFFCF6] border-t border-[#E8E2D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-3xl bg-white border border-[#E8E2D8] shadow-2xs flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-[#D9AD54] flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#718096] leading-relaxed">
              <strong className="text-[#172A50] block mb-1">
                Notice Regarding Fees &amp; Batch Scheduling:
              </strong>
              Official fee schedules, installment modes, and academic calendar dates are not listed as fixed amounts online to ensure candidates receive current, verified figures directly from the SR College admissions office. Contact our helpdesk for direct assistance.
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/eligibility-admission#enquiry"
              className="px-7 py-3.5 rounded-full font-bold text-sm text-white bg-[#8B1745] hover:bg-[#721238] shadow-md transition-all flex items-center gap-2"
            >
              <span>Submit Admission Enquiry</span>
              <ArrowRight className="w-4 h-4 text-[#D9AD54]" />
            </Link>
            <Link
              href="/contact-us"
              className="px-6 py-3.5 rounded-full font-semibold text-sm text-[#172A50] bg-white hover:bg-stone-50 border border-[#E8E2D8] transition-all shadow-2xs"
            >
              <span>Contact Admissions Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
