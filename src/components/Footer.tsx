"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import CollegeLogo from "./CollegeLogo";
import { Phone, Mail, MapPin, Shield, ArrowUp, Lock } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#172A50] text-white pt-16 pb-12 border-t border-[#26345B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Column 1: College Emblem & Bio */}
          <div className="lg:col-span-4">
            <CollegeLogo variant="light" className="h-11 w-11 mb-4" />
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-5">
              S. R. College of Education is a recognized academic institution in Rohtak, Haryana. 
              This premier destination for Diploma in Hearing, Language and Speech (DHLS).
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D9AD54]">
              <Shield className="w-4 h-4 text-[#D9AD54]" />
              <span className="font-medium text-slate-200">Official Institution | Information Portal</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-[#D9AD54] uppercase tracking-wider mb-4 pb-1 border-b border-[#26345B]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#D9AD54] transition-colors">
                  Home &amp; Overview
                </Link>
              </li>
              <li>
                <Link href="/about-dhls" className="hover:text-[#D9AD54] transition-colors">
                  About DHLS Program
                </Link>
              </li>
              <li>
                <Link href="/eligibility-admission" className="hover:text-[#D9AD54] transition-colors">
                  Eligibility &amp; Admission
                </Link>
              </li>
              <li>
                <Link href="/course-structure" className="hover:text-[#D9AD54] transition-colors">
                  Course Structure
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#D9AD54] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#D9AD54] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/eligibility-admission#enquiry"
                  className="hover:text-white font-semibold text-[#D9AD54] transition-colors"
                >
                  Admission Enquiry Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-[#D9AD54] uppercase tracking-wider mb-4 pb-1 border-b border-[#26345B]">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/eligibility-admission" className="hover:text-[#D9AD54] transition-colors">
                  RTI
                </Link>
              </li>
              <li>
                <Link href="/about-dhls" className="hover:text-[#D9AD54] transition-colors">
                  Student Corner
                </Link>
              </li>
              <li>
                <Link href="/course-structure" className="hover:text-[#D9AD54] transition-colors">
                  Downloads
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#D9AD54] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[#D9AD54] transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Get in Touch & Social Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-[#D9AD54] uppercase tracking-wider mb-4 pb-1 border-b border-[#26345B]">
              Get in Touch
            </h4>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9AD54] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  S. R. College of Education, IMT, Sector 30-B, Delhi Road, Rohtak, Haryana
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D9AD54] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <a href="tel:9886302035" className="text-white hover:underline">9886302035</a>
                    <span>/</span>
                    <a href="tel:9992700642" className="text-white hover:underline">9992700642</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="tel:9992700255" className="text-white hover:underline">9992700255</a>
                    <span>/</span>
                    <a href="tel:9306040793" className="text-white hover:underline">9306040793</a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D9AD54] flex-shrink-0" />
                <a href="mailto:srcollegeeducation@gmail.com" className="text-white hover:underline">
                  srcollegeeducation@gmail.com
                </a>
              </div>

              {/* Social Media Links */}
              <div className="pt-2 flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#8B1745] flex items-center justify-center text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#8B1745] flex items-center justify-center text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#8B1745] flex items-center justify-center text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#8B1745] flex items-center justify-center text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#26345B] flex items-center justify-between text-xs text-slate-400">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#D9AD54] transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#26345B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} S. R. College of Education, Rohtak. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#D9AD54]" />
            </button>
            <span>|</span>
            <Link href="/faqs" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>|</span>
            <Link href="/faqs" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
