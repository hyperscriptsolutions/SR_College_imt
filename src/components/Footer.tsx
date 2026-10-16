"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CollegeLogo from "./CollegeLogo";
import { Phone, Mail, MapPin, Globe, Shield, ArrowUp, Lock } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#071B3D] text-white pt-16 pb-12 border-t border-[#2684FF]/20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2684FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#9B6DFF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Column 1: College Emblem & Bio */}
          <div className="lg:col-span-5">
            <CollegeLogo variant="light" className="h-12 w-12 mb-4" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mb-6">
              SR College of Education is a recognized educational institution situated in Rohtak, Haryana. 
              This portal is dedicated exclusively to the Diploma in Hearing Language and Speech (DHLS) curriculum.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-[#29D7FF]" />
              <span>Official Institutional Information Portal</span>
            </div>
          </div>

          {/* Column 2: Multi-Page Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-[#29D7FF] uppercase tracking-wider mb-4">
              DHLS Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home &amp; Waveform
                </Link>
              </li>
              <li>
                <Link href="/about-dhls" className="hover:text-white transition-colors">
                  About DHLS Program
                </Link>
              </li>
              <li>
                <Link href="/eligibility-admission" className="hover:text-white transition-colors">
                  Eligibility &amp; Admission
                </Link>
              </li>
              <li>
                <Link href="/course-structure" className="hover:text-white transition-colors">
                  Semester 1 &amp; 2 Subjects
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  Contact &amp; Directions
                </Link>
              </li>
              <li>
                <Link
                  href="/eligibility-admission#enquiry"
                  className="hover:text-[#29D7FF] font-semibold text-[#2684FF] transition-colors"
                >
                  Admission Enquiry Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Campus Details */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold text-[#29D7FF] uppercase tracking-wider mb-4">
              Verified Contact Details
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2684FF] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  L.M.T., Sector 30-B, Kheri Sadh, Delhi Road, Rohtak – 124001, Haryana, India.
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2684FF] flex-shrink-0" />
                <div className="flex items-center gap-2 font-mono">
                  <a href="tel:9416968076" className="text-white hover:underline">
                    9416968076
                  </a>
                  <span>/</span>
                  <a href="tel:9896302035" className="text-white hover:underline">
                    9896302035
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2684FF] flex-shrink-0" />
                <a href="mailto:srcollegeeducation@gmail.com" className="text-white hover:underline">
                  srcollegeeducation@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#2684FF] flex-shrink-0" />
                <a
                  href="https://www.srcoe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#29D7FF] hover:underline"
                >
                  www.srcoe.com
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#29D7FF]" />
                <span>Back to Top</span>
              </button>

              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#29D7FF] transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Legal & Educational Disclosure Banner */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-8 text-[11px] sm:text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-200">Curriculum Attribution &amp; Institutional Notice:</strong> Course syllabus, duration, mode, and subject designations are presented for informational and educational awareness, referenced from the public curriculum published by the National Institute for Empowerment of Persons with Multiple Disabilities (NIED). Institutional admissions, session schedules, official recognitions, and fee schedules are determined exclusively by SR College of Education, Rohtak. No unverified clinical licenses or commercial employment guarantees are implied.
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} SR College of Education, Rohtak. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-400">
            Diploma in Hearing Language and Speech (DHLS) Information Portal
          </p>
        </div>

      </div>
    </footer>
  );
}
