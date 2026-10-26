import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PublicLayout from "@/components/PublicLayout";
import PhotoGallery from "@/components/PhotoGallery";
import {
  ChevronRight,
  Home,
  Camera,
  MapPin,
  Calendar,
  Phone,
  ArrowRight,
  ShieldCheck,
  Building2,
  Stethoscope,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Photo Gallery | Life at S.R. College of Education, Rohtak",
  description:
    "Explore photographs of S.R. College of Education campus, classrooms, audiology laboratories, speech clinics, and DHLS student training activities in Rohtak, Haryana.",
  keywords: [
    "S.R. College of Education photos",
    "DHLS college gallery",
    "Rohtak college campus photos",
    "audiology lab photographs",
    "speech therapy clinic pictures",
    "IMT Rohtak college",
  ],
  openGraph: {
    title: "Photo Gallery | Life at S.R. College of Education, Rohtak",
    description:
      "Explore photographs of S.R. College of Education campus, classrooms, audiology laboratories, speech clinics, and DHLS student training activities.",
    url: "https://www.srcoe.com/gallery",
    siteName: "S.R. College of Education",
    locale: "en_IN",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <PublicLayout>
      {/* Hero / Header Banner */}
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-b from-[#172A50] to-[#26345B] text-white relative overflow-hidden">
        {/* Subtle Decorative Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9AD54]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 mb-6"
          >
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-[#D9AD54] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#D9AD54] font-semibold">Photo Gallery</span>
          </nav>

          {/* Heading and Subtitle */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D9AD54] text-xs font-bold uppercase tracking-wider mb-4">
              <Camera className="w-3.5 h-3.5" />
              <span>Institutional Photographic Archive</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Life at S.R. College of Education
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              Explore our campus, learning spaces, facilities, and memorable moments through photographs. Experience our soundproof audiometry booths, clinical speech rehabilitation suites, and academic lecture halls.
            </p>

            {/* Quick Highlights Pills */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-white/10 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-[#D9AD54]" />
                Sector 30-B, IMT Rohtak
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D9AD54]" />
                RCI Recognized DHLS Center
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full">
                <Building2 className="w-3.5 h-3.5 text-[#D9AD54]" />
                Genuine Campus Infrastructure
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Photo Gallery Component */}
      <PhotoGallery
        isPreview={false}
        title="Photo Gallery Collection"
        subtitle="Filter by department and click any photograph to open the high-resolution lightbox view."
      />

      {/* Campus Visit Invitation Callout */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#172A50] to-[#0F1E38] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#D9AD54]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9AD54]/20 text-[#D9AD54] text-xs font-bold uppercase tracking-wider mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>Visit Us in Person</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Want to Tour Our Campus &amp; Labs?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Photographs offer a glimpse, but visiting our department gives you a complete picture. Prospective DHLS students and parents are welcome to visit our campus at Sector 30-B, IMT Rohtak to inspect the audiometric booths, speech articulation clinics, and consult with our counseling team.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/eligibility-admission#enquiry"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-white bg-[#8B1745] hover:bg-[#721238] shadow-md transition-all duration-150 active:scale-95"
                >
                  <span>Book a Campus Visit</span>
                  <ArrowRight className="w-4 h-4 text-[#D9AD54]" />
                </Link>

                <a
                  href="tel:9896302035"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-150"
                >
                  <Phone className="w-4 h-4 text-[#D9AD54]" />
                  <span>Call: 9896302035</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
