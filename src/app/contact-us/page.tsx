import React from "react";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
} from "lucide-react";
import CollegeContact from "@/components/CollegeContact";
import CampusFacilitiesGallery from "@/components/CampusFacilitiesGallery";
import PublicLayout from "@/components/PublicLayout";

export const metadata = {
  title: "Contact Us & Campus Location | S. R. College of Education",
  description:
    "Contact S. R. College of Education, Rohtak for DHLS course counseling, admission guidance, telephone helplines, email support, and interactive campus directions.",
};

export default function ContactUsPage() {
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
            <span className="text-white font-semibold">Contact Us</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Contact <span className="text-[#D9AD54]">S. R. College of Education</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
            Connect with our academic administration and admissions counseling desk located in Rohtak, Haryana for in-person campus visits, verified DHLS enrollment information, and guidance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:9896302035"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] transition-all shadow-md font-mono cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#172A50]" />
              <span>Call 9896302035</span>
            </a>
            <a
              href="tel:7404153253"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] transition-all shadow-md font-mono cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#172A50]" />
              <span>Call 7404153253</span>
            </a>
            <a
              href="tel:9992700255"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-mono cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#D9AD54]" />
              <span>Call 9992700255</span>
            </a>
            <a
              href="tel:9306040793"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all font-mono cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#D9AD54]" />
              <span>Call 9306040793</span>
            </a>
            <Link
              href="/eligibility-admission#enquiry"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#8B1745] hover:bg-[#721238] transition-all shadow-md cursor-pointer"
            >
              <span>Enquire About DHLS</span>
              <ArrowRight className="w-4 h-4 text-[#D9AD54]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main College Location & Interactive Maps Component */}
      <CollegeContact />

      {/* Interactive Video Tour and Photo Gallery of Campus Facilities */}
      <CampusFacilitiesGallery />
    </PublicLayout>
  );
}
