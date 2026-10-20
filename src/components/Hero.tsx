"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SoundWaveVisualizer from "./SoundWaveVisualizer";
import {
  Calendar,
  GraduationCap,
  Laptop,
  ArrowRight,
  MapPin,
  Sparkles,
  BookOpen,
  Award,
  Mic,
  Users,
} from "lucide-react";
import type { CourseContent, AppearanceSettings } from "@/lib/dataStore";

interface HeroProps {
  content?: CourseContent;
  appearance?: AppearanceSettings;
}

export default function Hero({ content, appearance }: HeroProps) {
  const duration = content?.duration || "1 Year (Regular)";
  const eligibility = content?.eligibility || "12th (PCM / PCB) & Above";
  const mode = content?.mode || "Offline (Regular)";
  const primaryCta = content?.primaryCtaText || "Explore the DHLS Course";
  const secondaryCta = content?.secondaryCtaText || "Enquire About Admission";
  const showWaveform = appearance?.showWaveform ?? true;

  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 bg-[#FFFCF6] text-[#263238] overflow-hidden"
    >
      {/* Subtle organic background ambient accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D9AD54]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#8B1745]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Headlines & Course Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#172A50] text-white text-xs font-semibold tracking-wide shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#D9AD54]" />
                <span>S. R. COLLEGE OF EDUCATION • ROHTAK</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#8B1745] text-white text-xs font-semibold shadow-xs">
                <Award className="w-3.5 h-3.5 text-[#D9AD54]" />
                <span>Recognised by RCI</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E2D8] text-xs font-semibold text-[#8B1745] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#8B1745]" />
                <span>Regular 1-Year Diploma (Offline)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl xl:text-[54px] font-extrabold tracking-tight text-[#172A50] leading-[1.12] mb-5">
              Understand Hearing.
              <br />
              Discover <span className="text-[#D9AD54]">Speech.</span>
              <br />
              <span className="text-[#8B1745]">Empower</span> Communication.
            </h1>

            {/* Supporting Headline */}
            <p className="text-base sm:text-lg font-medium text-[#263238] mb-3 leading-relaxed">
              Explore the Diploma in Hearing Language and Speech (DHLS) and discover how communication, language and hearing come together.
            </p>

            {/* Curriculum Description */}
            <p className="text-sm sm:text-base text-[#718096] mb-8 leading-relaxed max-w-xl">
              An offline, regular 1-year diploma course recognised by the Rehabilitation Council of India (RCI). The curriculum explores the scientific mechanisms of speech organs, linguistic articulation, acoustic soundwaves, audiology, and community rehabilitation.
            </p>

            {/* Primary Burgundy & Secondary Outlined CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-9">
              <Link
                href="/about-dhls"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-[#8B1745] hover:bg-[#721238] shadow-md hover:shadow-lg transition-all duration-150 active:scale-95"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-[#D9AD54]" />
              </Link>
              <Link
                href="/eligibility-admission#enquiry"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-[#172A50] bg-white hover:bg-stone-50 border border-[#E8E2D8] shadow-2xs transition-all duration-150"
              >
                <span>{secondaryCta}</span>
              </Link>
            </div>

            {/* Reference Information Cards */}
            <div className="pt-6 border-t border-[#E8E2D8]">
              <div className="text-[11px] sm:text-xs uppercase font-bold text-[#718096] tracking-wider mb-3">
                Course Details (Recognised by Rehabilitation Council of India - RCI)
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                
                {/* Duration */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
                  <div className="p-2 rounded-xl bg-[#8B1745]/10 text-[#8B1745]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#718096] font-semibold uppercase">Duration</div>
                    <div className="text-xs sm:text-sm font-bold text-[#172A50]">{duration}</div>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
                  <div className="p-2 rounded-xl bg-[#D9AD54]/15 text-[#B88B2E]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#718096] font-semibold uppercase">Eligibility</div>
                    <div className="text-xs sm:text-sm font-bold text-[#172A50]">{eligibility}</div>
                  </div>
                </div>

                {/* Mode */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
                  <div className="p-2 rounded-xl bg-[#172A50]/10 text-[#172A50]">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-[#718096] font-semibold uppercase">Mode</div>
                    <div className="text-xs sm:text-sm font-bold text-[#172A50] truncate">{mode}</div>
                  </div>
                </div>

              </div>

              {/* Sub-chips row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#718096] pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E2D8] text-[11px] font-semibold text-[#172A50]">
                    <Users className="w-3.5 h-3.5 text-[#B88B2E]" />
                    <span>30 Seats Intake • NBER-RCI Portal (Aug-Oct)</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8E2D8] text-[11px] font-semibold text-[#172A50]">
                    <Mic className="w-3.5 h-3.5 text-[#8B1745]" />
                    <span>Speech &amp; Audiology Pathology</span>
                  </div>
                </div>

                <a
                  href="#about"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#172A50] hover:text-[#8B1745] transition-colors"
                >
                  <span>Learn More About The Course</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9AD54]" />
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Photograph, Frequency Visualizer & Complementary Info Cards */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            
            {/* Audiologist Testing Student Photograph */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-md bg-stone-100 h-64 sm:h-72 w-full">
              <Image
                src="/images/hero_audiologist.jpg"
                alt="Audiologist and speech-hearing specialist conducting hearing test with student wearing headphones"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172A50]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-semibold bg-[#172A50]/80 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                  Clinical Audiometry &amp; Acoustic Analysis
                </span>
                <span className="text-[11px] text-slate-200 hidden sm:inline">
                  S. R. College of Education Lab
                </span>
              </div>
            </div>

            {/* Interactive Audiometric Frequency Visualizer Console */}
            {showWaveform && (
              <SoundWaveVisualizer className="w-full" barCount={32} />
            )}

            {/* Two Compact Academic Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#D9AD54]/15 text-[#B88B2E] flex-shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#172A50] uppercase tracking-wide mb-1">
                    Core Discipline Focus
                  </div>
                  <p className="text-[11px] text-[#718096] leading-relaxed">
                    The DHLS curriculum covers the key areas of human communication, acoustics, speech and language, and practical rehabilitation skills.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#8B1745]/10 text-[#8B1745] flex-shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#172A50] uppercase tracking-wide mb-1">
                    Practical Training
                  </div>
                  <p className="text-[11px] text-[#718096] leading-relaxed">
                    Hands-on laboratory training, clinical exposure and real-world experience to build confidence and professional skills.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
