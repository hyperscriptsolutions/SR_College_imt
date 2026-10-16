import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Navigation,
} from "lucide-react";
import CollegeContact from "@/components/CollegeContact";
import PublicLayout from "@/components/PublicLayout";

export const metadata = {
  title: "Contact Us & Campus Location | SR College of Education",
  description:
    "Contact SR College of Education, Rohtak for DHLS course counseling, admission guidance, telephone helplines, email support, and interactive campus directions.",
};

export default function ContactUsPage() {
  return (
    <PublicLayout>
      {/* Page Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-gradient-to-b from-[#071B3D] via-[#0A224D] to-[#071B3D] text-white overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#2684FF]/20 via-[#9B6DFF]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-10 w-80 h-80 bg-[#29D7FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumb Navigation */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-300 mb-6 backdrop-blur-md">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#29D7FF]">/</span>
            <span className="text-white font-semibold">Contact Us</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29D7FF] via-[#2684FF] to-[#9B6DFF]">SR College of Education</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
            Connect with our academic administration and admissions counseling desk located in Rohtak, Haryana for in-person campus visits, verified DHLS enrollment information, and guidance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:9416968076"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-[#071B3D] bg-[#29D7FF] hover:bg-[#6be4ff] transition-all shadow-md font-mono"
            >
              <Phone className="w-4 h-4" />
              <span>Call 9416968076</span>
            </a>
            <a
              href="tel:9896302035"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-mono"
            >
              <Phone className="w-4 h-4" />
              <span>Call 9896302035</span>
            </a>
            <Link
              href="/eligibility-admission#enquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#2684FF] to-[#9B6DFF] hover:brightness-110 transition-all shadow-md"
            >
              <span>Enquire About DHLS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main College Location & Interactive Maps Component */}
      <CollegeContact />
    </PublicLayout>
  );
}
