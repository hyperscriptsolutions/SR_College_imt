import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  AlertCircle,
  Phone,
  Clock,
  Award,
  Users,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import Eligibility from "@/components/Eligibility";
import AdmissionEnquiry from "@/components/AdmissionEnquiry";
import PublicLayout from "@/components/PublicLayout";
import { getCourseContent } from "@/lib/dataStore";

export const metadata = {
  title: "Eligibility & Admission | S.R College of Education",
  description:
    "Review eligibility criteria (12th PCM / PCB & Above) and submit an official admission enquiry for the Diploma in Hearing Language and Speech (DHLS) at S.R College of Education, Rohtak.",
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

          <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <GraduationCap className="w-4 h-4 text-[#D9AD54]" />
              <span>Criterion: <strong>12th (PCM / PCB) and Above</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Users className="w-4 h-4 text-[#D9AD54]" />
              <span>Intake: <strong>30 Seats</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Clock className="w-4 h-4 text-[#D9AD54]" />
              <span>Duration: <strong>1 Year Regular (Offline)</strong></span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Award className="w-4 h-4 text-[#D9AD54]" />
              <span>Recognition: <strong>Rehabilitation Council of India (RCI)</strong></span>
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
                Central NBER-RCI Admission Notice (30 Seats Intake):
              </strong>
              DHLS has an intake capacity of 30 seats. Admissions are conducted centrally through registration on the NBER-RCI portal, generally during the months of August to October. Candidates must complete the online registration process and follow the prescribed counselling and admission procedure. S.R College of Education, Rohtak assists candidates with verified schedule updates and admission desk counseling.
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: 3-Step Process (Eligibility Component) */}
      <Eligibility />

      {/* Academic Assessment & Examination Infrastructure (img_14) */}
      <section className="py-14 sm:py-18 bg-white border-y border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Photograph: img_14 */}
            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 w-full rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-md group bg-slate-100">
                <Image
                  src="https://res.cloudinary.com/ozrdoi7q/image/upload/v1792760851/WhatsApp_Image_2026-10-23_at_6.29.36_PM.jpg"
                  alt="Students seated in individual writing-arm chairs in the spacious examination hall at S.R. College of Education"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-300"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-[#172A50]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 shadow-xs flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#D9AD54]" />
                  <span>Academic &amp; Examination Hall</span>
                </div>
              </div>
            </div>

            {/* Narrative & Details */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172A50]/10 border border-[#172A50]/20 text-xs font-bold text-[#172A50] tracking-wide mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#D9AD54]" />
                <span>Academic Rigor &amp; Assessment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172A50] tracking-tight mb-4">
                Structured Examination &amp; Lecture Environment
              </h2>
              <p className="text-sm sm:text-base text-[#718096] leading-relaxed mb-6">
                Students at S.R. College of Education complete their theoretical coursework and RCI-prescribed semester assessments in well-lit, spacious examination and lecture halls equipped with individual ergonomic tablet chairs, cross-ventilation, and strict proctoring standards.
              </p>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8]">
                  <CheckCircle className="w-5 h-5 text-[#8B1745] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#172A50] block font-bold">Standardized Assessment Protocol</strong>
                    <span className="text-[#718096]">Continuous internal evaluations, semester theory papers, and project reviews conducted according to RCI / NBER guidelines.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8]">
                  <CheckCircle className="w-5 h-5 text-[#D9AD54] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#172A50] block font-bold">Individual Writing Workstations</strong>
                    <span className="text-[#718096]">Dedicated seating designed to provide comfortable writing posture and focused concentration during lengthy exam sessions.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                Speak directly with an S.R College admissions counselor for guidance regarding documentation, eligibility verification, and campus visits.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 flex-shrink-0">
              <a
                href="tel:9896302035"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] transition-all shadow-md font-mono cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>9896302035</span>
              </a>

              <a
                href="tel:7404153253"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] transition-all shadow-md font-mono cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>7404153253</span>
              </a>

              <a
                href="tel:9992700255"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-mono cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#D9AD54]" />
                <span>9992700255</span>
              </a>

              <a
                href="tel:9306040793"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-mono cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#D9AD54]" />
                <span>9306040793</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
