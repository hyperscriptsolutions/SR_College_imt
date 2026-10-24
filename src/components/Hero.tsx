"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SoundWaveVisualizer from "./SoundWaveVisualizer";
import {
  Calendar,
  GraduationCap,
  Laptop,
  ArrowRight,
  MapPin,
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

const HERO_PHOTO_CLOUD =
  "https://res.cloudinary.com/ozrdoi7q/image/upload/v1792807565/Sunny_SR_College_Campus_Entrance.png";
const HERO_PHOTO_LOCAL = "/images/sunny_campus_entrance.png";

export default function Hero({ content, appearance }: HeroProps) {
  const duration = content?.duration || "1 Year (Regular)";
  const eligibility = content?.eligibility || "12th (PCM / PCB) & Above";
  const mode = content?.mode || "Offline (Regular)";
  const primaryCta = content?.primaryCtaText || "Explore the DHLS Course";
  const secondaryCta = content?.secondaryCtaText || "Enquire About Admission";
  const showWaveform = appearance?.showWaveform ?? true;

  const [photoSrc, setPhotoSrc] = useState<string>(HERO_PHOTO_CLOUD);

  return (
    <>
      {/* 1. Cinematic Full-Bleed Campus Hero Banner with Direct Text Overlay */}
      <section
        id="hero"
        className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] flex items-center pt-28 sm:pt-36 pb-16 sm:pb-24 text-white overflow-hidden"
      >
        {/* Full-bleed Campus Photo Background - Fully Visible */}
        <div className="absolute inset-0 z-0">
          <Image
            src={photoSrc}
            alt="S.R. College of Education Campus Entrance Gate - Rohtak, Haryana"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
            onError={() => setPhotoSrc(HERO_PHOTO_LOCAL)}
          />

          {/* Clean dark gradient overlay: leaves campus entrance gate on left fully clear & sunny, darkens right side for pristine white text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30 lg:bg-gradient-to-r lg:from-black/25 lg:via-black/55 lg:to-black/85 pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            
            {/* Left Column Spacer (on desktop): Keeps the main campus entrance gate & students 100% unobstructed */}
            <div className="hidden lg:block lg:col-span-5" />

            {/* Right Column: Direct Text Overlay matching the reference banner layout */}
            <div className="col-span-12 lg:col-span-7 flex flex-col justify-center">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#172D55]/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wide shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#E1B34F]" />
                  <span>S.R COLLEGE OF EDUCATION • ROHTAK</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#981747]/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-sm">
                  <Award className="w-3.5 h-3.5 text-[#E1B34F]" />
                  <span>Recognised by RCI</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Regular 1-Year Diploma (Offline)</span>
                </div>
              </div>

              {/* Main Headline - Bold White with Gold Accents */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.12] mb-5 drop-shadow-md">
                Understand Hearing.
                <br />
                Discover <span className="text-[#E1B34F]">Speech.</span>
                <br />
                <span className="text-[#FBBF24]">Empower</span> Communication.
              </h1>

              {/* Supporting Headline */}
              <p className="text-base sm:text-lg lg:text-xl font-semibold text-white/95 mb-3 leading-relaxed drop-shadow-sm">
                Explore the Diploma in Hearing Language and Speech (DHLS) and discover how communication, language and hearing come together.
              </p>

              {/* Curriculum Description */}
              <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed mb-8 max-w-2xl drop-shadow-xs font-normal">
                An offline, regular 1-year diploma course recognised by the Rehabilitation Council of India (RCI). The curriculum explores the scientific mechanisms of speech organs, linguistic articulation, acoustic soundwaves, audiology, and community rehabilitation.
              </p>

              {/* High-Contrast Pill Action Buttons matching reference style */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                {/* Blue/Navy Primary Pill Button */}
                <Link
                  href="/about-dhls"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-[#172D55] hover:bg-[#0f1d38] border border-white/25 shadow-xl hover:shadow-2xl transition-all duration-150 active:scale-95"
                >
                  <span>{primaryCta}</span>
                  <ArrowRight className="w-4 h-4 text-[#E1B34F]" />
                </Link>

                {/* Yellow/Gold Secondary Pill Button */}
                <Link
                  href="/eligibility-admission#enquiry"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-[#172D55] bg-[#E1B34F] hover:bg-[#d4a540] shadow-xl hover:shadow-2xl transition-all duration-150 active:scale-95"
                >
                  <span>{secondaryCta}</span>
                </Link>
              </div>

              {/* Translucent Course Highlights */}
              <div className="pt-6 border-t border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  
                  {/* Duration */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xs">
                    <div className="p-2 rounded-xl bg-[#981747]/50 text-[#E1B34F] border border-white/10">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Duration</div>
                      <div className="text-xs sm:text-sm font-bold text-white">{duration}</div>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xs">
                    <div className="p-2 rounded-xl bg-[#E1B34F]/30 text-[#E1B34F] border border-white/10">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Eligibility</div>
                      <div className="text-xs sm:text-sm font-bold text-white">{eligibility}</div>
                    </div>
                  </div>

                  {/* Mode */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white shadow-xs">
                    <div className="p-2 rounded-xl bg-white/20 text-[#E1B34F] border border-white/10">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 font-semibold uppercase tracking-wider">Mode</div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">{mode}</div>
                    </div>
                  </div>

                </div>

                {/* Sub-chips row */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white">
                      <Users className="w-3.5 h-3.5 text-[#E1B34F]" />
                      <span>30 Seats Intake • NBER-RCI Portal (Aug-Oct)</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white">
                      <Mic className="w-3.5 h-3.5 text-[#E1B34F]" />
                      <span>Speech &amp; Audiology Pathology</span>
                    </div>
                  </div>

                  <a
                    href="#about"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#E1B34F] hover:text-white transition-colors"
                  >
                    <span>Learn More About The Course</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Auditory Acoustic Frequency Wave & Core Discipline Strip */}
      {showWaveform && (
        <section className="bg-[#FBF8F1] py-12 sm:py-16 border-b border-[#E8E2D8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#172D55]/10 text-[#172D55] text-xs font-bold uppercase tracking-wider mb-2">
                Interactive Auditory Science
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172D55]">
                Acoustic Soundwaves &amp; Frequency Range
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-2">
                Experience the auditory perception spectrum (125 Hz – 8,000 Hz) taught in the DHLS audiology &amp; speech pathology curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <SoundWaveVisualizer className="w-full bg-white border border-[#E8E2D8] shadow-md" barCount={36} />
              </div>
              <div className="lg:col-span-4 flex flex-col gap-4">
                
                {/* Core Discipline Focus Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs hover:shadow-md transition-shadow flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#E1B34F]/20 text-[#B88B2E] flex-shrink-0 mt-0.5">
                    <BookOpen className="w-5 h-5 text-[#B88B2E]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#172D55] uppercase tracking-wide mb-1">
                      Core Discipline Focus
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      The DHLS curriculum covers the key areas of human communication, acoustics, speech and language, and practical rehabilitation skills.
                    </p>
                  </div>
                </div>

                {/* Practical Training Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs hover:shadow-md transition-shadow flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#981747]/15 text-[#981747] flex-shrink-0 mt-0.5">
                    <Award className="w-5 h-5 text-[#981747]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#172D55] uppercase tracking-wide mb-1">
                      Practical Training
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      Hands-on laboratory training, clinical exposure and real-world experience to build confidence and professional skills.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
