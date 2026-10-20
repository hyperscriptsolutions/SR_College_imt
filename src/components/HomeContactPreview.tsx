"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export default function HomeContactPreview() {
  return (
    <section className="py-16 sm:py-24 bg-[#FFFCF6] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Card Container */}
        <div className="rounded-3xl bg-white border border-[#E8E2D8] shadow-sm p-7 sm:p-10 lg:p-12 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Content: Verified Campus Information (2x2 Grid) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172A50]/10 border border-[#172A50]/20 text-xs font-bold text-[#172A50] uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D9AD54]" />
                Verified by Institutional Campus
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172A50] tracking-tight mb-3">
                Connect with S.R College of Education
              </h2>

              <p className="text-xs sm:text-sm text-[#718096] leading-relaxed mb-6">
                Have questions regarding the Diploma in Hearing Language and Speech (DHLS) curriculum, eligibility criteria, or upcoming academic intake? Our admissions guidance desk is available to assist you.
              </p>

              {/* 2x2 Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-[#263238]">
                
                {/* Campus Address */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8]">
                  <div className="p-2 rounded-xl bg-[#172A50]/10 text-[#172A50] flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#8B1745]" />
                  </div>
                  <div>
                    <strong className="block text-[#172A50] font-bold mb-0.5">Campus Address:</strong>
                    <span className="text-[#718096] leading-snug">
                      S.R College of Education, IMT, Sector 30-B, Delhi Road, Rohtak, Haryana
                    </span>
                  </div>
                </div>

                {/* Helpline Numbers */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8]">
                  <div className="p-2 rounded-xl bg-[#172A50]/10 text-[#172A50] flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#D9AD54]" />
                  </div>
                  <div>
                    <strong className="block text-[#172A50] font-bold mb-0.5">Helpline Numbers:</strong>
                    <div className="font-mono text-[#172A50] font-bold flex flex-col gap-0.5">
                      <div className="space-x-1">
                        <a href="tel:9896302035" className="hover:text-[#8B1745] hover:underline">9896302035</a>
                        <span>/</span>
                        <a href="tel:7404153253" className="hover:text-[#8B1745] hover:underline">7404153253</a>
                      </div>
                      <div className="space-x-1">
                        <a href="tel:9992700255" className="hover:text-[#8B1745] hover:underline">9992700255</a>
                        <span>/</span>
                        <a href="tel:9306040793" className="hover:text-[#8B1745] hover:underline">9306040793</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Desk */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8]">
                  <div className="p-2 rounded-xl bg-[#172A50]/10 text-[#172A50] flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-[#8B1745]" />
                  </div>
                  <div>
                    <strong className="block text-[#172A50] font-bold mb-0.5">Email Desk:</strong>
                    <a href="mailto:srcollegeeducation@gmail.com" className="text-[#172A50] hover:text-[#8B1745] hover:underline font-medium">
                      srcollegeeducation@gmail.com
                    </a>
                  </div>
                </div>

                {/* Campus Hours */}
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8]">
                  <div className="p-2 rounded-xl bg-[#172A50]/10 text-[#172A50] flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#D9AD54]" />
                  </div>
                  <div>
                    <strong className="block text-[#172A50] font-bold mb-0.5">Campus Hours:</strong>
                    <span className="text-[#718096]">Monday – Saturday: 9:00 AM – 4:00 PM</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Action Box: Deep Navy with Gold Button */}
            <div className="lg:col-span-5 bg-[#172A50] text-white p-7 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between border border-[#26345B]">
              <div>
                <span className="text-xs uppercase font-bold text-[#D9AD54] tracking-wider block mb-1.5">
                  Ready to Take the Next Step?
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                  Submit an Official Admission Enquiry
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Complete the online form and our team will get in touch with you soon with all the details you need.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/eligibility-admission#enquiry"
                  className="w-full text-center py-3.5 px-5 rounded-xl font-bold text-sm text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>Fill Admission Enquiry</span>
                  <ArrowRight className="w-4 h-4 text-[#172A50]" />
                </Link>

                <Link
                  href="/contact-us"
                  className="w-full text-center py-3 px-5 rounded-xl font-semibold text-xs text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
                >
                  View Full Campus Details &amp; Map
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
