"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export default function HomeContactPreview() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F5F8FF] to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Container with approved glass-morphic styling and subtle blue glow */}
        <div className="rounded-3xl bg-white border border-[#2684FF]/20 shadow-xl p-8 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#29D7FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#9B6DFF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2684FF]/10 border border-[#2684FF]/20 text-xs font-bold text-[#2684FF] uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Institutional Campus
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071B3D] tracking-tight mb-3">
                Connect with SR College of Education
              </h2>
              <p className="text-sm sm:text-base text-[#536B8E] leading-relaxed mb-6">
                Have questions regarding the Diploma in Hearing Language and Speech (DHLS) curriculum, eligibility criteria, or upcoming academic intake? Our admissions guidance desk is available to assist you.
              </p>

              {/* Contact Information Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#13264A]">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FF] border border-[#2684FF]/10">
                  <MapPin className="w-4 h-4 text-[#2684FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#071B3D]">Campus Address:</strong>
                    <span className="text-[#536B8E] leading-snug">
                      L.M.T., Sector 30-B, Kheri Sadh, Delhi Road, Rohtak – 124001, Haryana
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FF] border border-[#2684FF]/10">
                  <Phone className="w-4 h-4 text-[#2684FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#071B3D]">Helpline Numbers:</strong>
                    <div className="font-mono text-[#2684FF] font-semibold space-x-2">
                      <a href="tel:9416968076" className="hover:underline">9416968076</a>
                      <span>/</span>
                      <a href="tel:9896302035" className="hover:underline">9896302035</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FF] border border-[#2684FF]/10">
                  <Mail className="w-4 h-4 text-[#2684FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#071B3D]">Email Desk:</strong>
                    <a href="mailto:srcollegeeducation@gmail.com" className="text-[#2684FF] hover:underline">
                      srcollegeeducation@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F5F8FF] border border-[#2684FF]/10">
                  <Clock className="w-4 h-4 text-[#2684FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#071B3D]">Campus Hours:</strong>
                    <span className="text-[#536B8E]">Monday – Saturday: 9:00 AM – 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#071B3D] via-[#102B58] to-[#071B3D] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between border border-[#29D7FF]/25">
              <div>
                <span className="text-xs uppercase font-bold text-[#29D7FF] tracking-wider block mb-1">
                  Ready to Take the Next Step?
                </span>
                <h3 className="text-xl font-bold mb-2">
                  Submit an Official Admission Enquiry
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Complete our student-friendly enquiry form to receive verified curriculum counseling directly from SR College admissions staff.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/eligibility-admission#enquiry"
                  className="w-full text-center py-3 px-5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-[#2684FF] to-[#9B6DFF] hover:brightness-110 shadow-lg shadow-[#2684FF]/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Fill Admission Enquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact-us"
                  className="w-full text-center py-3 px-5 rounded-2xl font-semibold text-xs text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
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
