"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SoundWaveVisualizer from "./SoundWaveVisualizer";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
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
  const heroHeadline =
    content?.heroHeadline || "Understand Hearing. Discover Speech. Empower Communication.";
  const heroSupporting =
    content?.heroSupporting ||
    "Explore the Diploma in Hearing Language and Speech (DHLS) and discover how communication, language and hearing come together.";
  const description =
    content?.description ||
    "An offline, regular 1-year diploma course recognised by the Rehabilitation Council of India (RCI). The curriculum explores the scientific mechanisms of speech organs, linguistic articulation, acoustic soundwaves, audiology, and community rehabilitation.";
  const showWaveform = appearance?.showWaveform ?? true;

  const [photoSrc, setPhotoSrc] = useState<string>(HERO_PHOTO_CLOUD);
  const trackRef = useRef<HTMLDivElement>(null);

  // Accessibility: respect user's reduced motion settings
  const prefersReduced = useReducedMotion();
  const isReduced = prefersReduced || appearance?.animationIntensity === "reduced";

  // Track scroll progress exclusively through this designated hero section
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // 1. Initial State Prompt: visible at scrollY = 0, quickly fades out as soon as the user scrolls
  const promptOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);
  const promptY = useTransform(scrollYProgress, [0, 0.04], isReduced ? [0, 0] : [0, 8]);

  // 2. Contrast Overlay Gradient: deepens immediately on first scroll for crisp text contrast
  const overlayOpacity = useTransform(scrollYProgress, [0.01, 0.08], [0.15, 1]);

  // 3. Unified Single-Scroll Reveal: ALL marked items come in TOGETHER on 1 scroll!
  const contentOpacity = useTransform(scrollYProgress, [0.01, 0.08], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.01, 0.08], isReduced ? [0, 0] : [16, 0]);

  // All marked elements share the same fast reveal
  const badgesOpacity = contentOpacity;
  const badgesY = contentY;
  const headlineOpacity = contentOpacity;
  const headlineY = contentY;
  const descOpacity = contentOpacity;
  const descY = contentY;
  const ctaOpacity = contentOpacity;
  const ctaY = contentY;
  const highlightsOpacity = contentOpacity;
  const highlightsY = contentY;

  const ctaPointerEvents = useTransform(scrollYProgress, (p) => (p > 0.02 ? "auto" : "none"));
  const highlightsPointerEvents = useTransform(scrollYProgress, (p) => (p > 0.02 ? "auto" : "none"));

  // Smooth scroll to the reading plateau upon clicking the explore prompt
  const handleScrollDown = () => {
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetScroll = scrollTop + rect.top + trackRef.current.offsetHeight * 0.15;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* =========================================================================
          MOBILE / TABLET VIEW (< lg): Matches user's reference website (JP International School)
          - Full-width campus photograph on top in natural aspect ratio (zero zoom)
          - Centered text content directly below on dark navy background
          - Smooth natural page scroll
         ========================================================================= */}
      <section
        id="hero-mobile"
        className="block lg:hidden w-full bg-[#0B1528] text-white"
        style={{
          paddingTop: "var(--navbar-height, 64px)",
        }}
      >
        {/* 1. Full-Width Campus Photo on Top (Exact Image Aspect Ratio 1678:937 for Zero Cropping & Zero Zoom) */}
        <div className="relative w-full aspect-[1678/937] overflow-hidden bg-[#0B1528] border-b border-white/10">
          <Image
            src={photoSrc}
            alt="S.R. College of Education Campus Entrance Gate - Rohtak, Haryana"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover object-center"
            onError={() => setPhotoSrc(HERO_PHOTO_LOCAL)}
          />
        </div>

        {/* 2. Dark Navy Content Block (Directly below photo, matching reference layout) */}
        <div className="px-3.5 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 bg-[#0B1528] text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#172D55] border border-white/20 text-white text-[10px] sm:text-xs font-semibold shadow-sm">
                <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E1B34F]" />
                <span>S.R COLLEGE OF EDUCATION • ROHTAK</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#981747] border border-white/20 text-white text-[10px] sm:text-xs font-semibold shadow-sm">
                <Award className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E1B34F]" />
                <span>Recognised by RCI</span>
              </div>
            </div>

            {/* Main Headline (Bold White, Centered, Scaled for 320px - 768px) */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight mb-2 sm:mb-3">
              Understand Hearing. Discover <span className="text-[#E1B34F]">Speech.</span>{" "}
              <span className="text-[#FBBF24]">Empower</span> Communication.
            </h1>

            {/* Subtitle (Bold Yellow, Centered - matches reference layout) */}
            <p className="text-xs sm:text-sm md:text-base font-bold text-[#E1B34F] mb-2 sm:mb-3 leading-snug max-w-xl">
              {heroSupporting}
            </p>

            {/* Description (Light Gray, Centered, Perfectly Proportioned) */}
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-5 max-w-2xl font-normal">
              {description}
            </p>

            {/* Action Pill Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3.5 w-full sm:w-auto mb-5 sm:mb-6">
              <Link
                href="/about-dhls"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-[#172D55] hover:bg-[#0f1d38] border border-white/25 shadow-xl transition-all active:scale-95 text-center"
              >
                <span>{primaryCta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E1B34F]" />
              </Link>

              <Link
                href="/eligibility-admission#enquiry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-[#172D55] bg-[#E1B34F] hover:bg-[#d4a540] shadow-xl transition-all active:scale-95 text-center"
              >
                <span>{secondaryCta}</span>
              </Link>
            </div>

            {/* Course Highlights (Duration, Eligibility, Mode) - Robust 3-Col Grid */}
            <div className="w-full grid grid-cols-3 gap-1.5 sm:gap-3 pt-3.5 sm:pt-4 border-t border-white/15">
              <div className="flex flex-col items-center p-1.5 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-white min-w-0">
                <div className="p-1 sm:p-1.5 rounded-lg bg-[#981747]/60 text-[#E1B34F] mb-1">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 font-semibold uppercase tracking-wider truncate w-full">
                  Duration
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-bold text-white line-clamp-2 leading-tight">
                  {duration}
                </div>
              </div>

              <div className="flex flex-col items-center p-1.5 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-white min-w-0">
                <div className="p-1 sm:p-1.5 rounded-lg bg-[#E1B34F]/35 text-[#E1B34F] mb-1">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 font-semibold uppercase tracking-wider truncate w-full">
                  Eligibility
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-bold text-white line-clamp-2 leading-tight">
                  {eligibility}
                </div>
              </div>

              <div className="flex flex-col items-center p-1.5 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-white min-w-0">
                <div className="p-1 sm:p-1.5 rounded-lg bg-white/20 text-[#E1B34F] mb-1">
                  <Laptop className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 font-semibold uppercase tracking-wider truncate w-full">
                  Mode
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm font-bold text-white line-clamp-2 leading-tight">
                  {mode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DESKTOP / LAPTOP VIEW (>= lg): Cinematic Scroll-Triggered Sticky Hero Track
          - Preserved exactly as requested: "on laptop its working good"
         ========================================================================= */}
      <section
        ref={trackRef}
        id="hero"
        className="hidden lg:block relative w-full h-[175vh] bg-[#0B1528]"
        style={{
          paddingTop: "var(--navbar-height, 76px)",
        }}
      >
        {/* Pinned Sticky Hero Viewport - Strictly Positioned Below Navbar with Top Clearance */}
        <div
          className="sticky z-20 w-full overflow-hidden flex flex-col justify-start xl:justify-center text-white bg-[#0B1528] pt-4 sm:pt-6 lg:pt-6 pb-4"
          style={{
            top: "var(--navbar-height, 76px)",
            height: "calc(100dvh - var(--navbar-height, 76px))",
          }}
        >
          {/* Full-bleed Campus Photo Background on Desktop */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            <Image
              src={photoSrc}
              alt="S.R. College of Education Campus Entrance Gate - Rohtak, Haryana"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_35%]"
              onError={() => setPhotoSrc(HERO_PHOTO_LOCAL)}
            />

            {/* Dynamic Dark Gradient Overlay for Desktop */}
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/65 to-black/92 pointer-events-none"
            />
          </div>

          {/* Initial State Scroll Prompt: indicates interactivity, gently fades away upon scrolling */}
          <motion.div
            style={{
              opacity: promptOpacity,
              y: promptY,
            }}
            onClick={handleScrollDown}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer group select-none pointer-events-auto"
            aria-label="Scroll to explore SR College campus and DHLS course"
          >
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] group-hover:text-[#E1B34F] transition-colors">
              Scroll to Explore
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-white/80 flex items-start justify-center p-1 backdrop-blur-sm bg-black/40 shadow-lg group-hover:border-[#E1B34F] transition-colors">
              <div className="w-1.5 h-2 rounded-full bg-[#E1B34F] animate-bounce" />
            </div>
          </motion.div>

          {/* Animated Hero Content Container on Desktop - Safe padding ensures badges never clip under navbar */}
          <div className="relative z-10 w-full mt-2 lg:mt-3 xl:my-auto py-1">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div className="grid grid-cols-12 gap-6 xl:gap-8 items-center w-full">
                {/* Left Column Spacer (on desktop): Keeps campus entrance gate & students clear */}
                <div className="col-span-5" />

                {/* Right Column: Direct Text Overlay matching reference layout */}
                <div className="col-span-7 flex flex-col justify-start xl:justify-center">
                  {/* 1. Badges Row - Clean, spaced, and guaranteed 100% visible below navbar */}
                  <motion.div
                    style={{ opacity: badgesOpacity, y: badgesY }}
                    className="flex flex-wrap items-center gap-2 xl:gap-2.5 mb-2.5 xl:mb-3.5"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#172D55]/95 backdrop-blur-md border border-white/25 text-white text-[11px] xl:text-xs font-semibold tracking-wide shadow-sm">
                      <MapPin className="w-3.5 h-3.5 text-[#E1B34F]" />
                      <span>S.R COLLEGE OF EDUCATION • ROHTAK</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1745]/95 backdrop-blur-md border border-white/25 text-white text-[11px] xl:text-xs font-semibold shadow-sm">
                      <Award className="w-3.5 h-3.5 text-[#E1B34F]" />
                      <span>Recognised by RCI</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-[11px] xl:text-xs font-semibold text-white shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Regular 1-Year Diploma (Offline)</span>
                    </div>
                  </motion.div>

                  {/* 2. Main Headline */}
                  <motion.h1
                    style={{ opacity: headlineOpacity, y: headlineY }}
                    className="text-3xl lg:text-[38px] xl:text-[46px] 2xl:text-[50px] font-extrabold text-white tracking-tight leading-[1.14] mb-3 xl:mb-4 drop-shadow-md"
                  >
                    {heroHeadline ===
                    "Understand Hearing. Discover Speech. Empower Communication." ? (
                      <>
                        Understand Hearing.
                        <br />
                        Discover <span className="text-[#E1B34F]">Speech.</span>
                        <br />
                        <span className="text-[#FBBF24]">Empower</span> Communication.
                      </>
                    ) : (
                      heroHeadline
                    )}
                  </motion.h1>

                  {/* 3. Supporting Headline & Curriculum Description */}
                  <motion.div style={{ opacity: descOpacity, y: descY }}>
                    <p className="text-base lg:text-lg xl:text-xl font-semibold text-white/95 mb-2 xl:mb-2.5 leading-snug drop-shadow-sm">
                      {heroSupporting}
                    </p>

                    <p className="text-xs lg:text-[13px] xl:text-sm text-slate-200 leading-relaxed mb-4 xl:mb-5 max-w-2xl drop-shadow-xs font-normal">
                      {description}
                    </p>
                  </motion.div>

                  {/* 4. High-Contrast Action Pill Buttons */}
                  <motion.div
                    style={{
                      opacity: ctaOpacity,
                      y: ctaY,
                      pointerEvents: ctaPointerEvents,
                    }}
                    className="flex flex-row items-center gap-3 mb-4 xl:mb-5"
                  >
                    <Link
                      href="/about-dhls"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 xl:py-3 rounded-full text-xs xl:text-sm font-bold text-white bg-[#172D55] hover:bg-[#0f1d38] border border-white/25 shadow-xl hover:shadow-2xl transition-all duration-150 active:scale-95"
                    >
                      <span>{primaryCta}</span>
                      <ArrowRight className="w-4 h-4 text-[#E1B34F]" />
                    </Link>

                    <Link
                      href="/eligibility-admission#enquiry"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 xl:py-3 rounded-full text-xs xl:text-sm font-bold text-[#172D55] bg-[#E1B34F] hover:bg-[#d4a540] shadow-xl hover:shadow-2xl transition-all duration-150 active:scale-95"
                    >
                      <span>{secondaryCta}</span>
                    </Link>
                  </motion.div>

                  {/* 5. Translucent Course Highlights */}
                  <motion.div
                    style={{
                      opacity: highlightsOpacity,
                      y: highlightsY,
                      pointerEvents: highlightsPointerEvents,
                    }}
                    className="pt-3 xl:pt-4 border-t border-white/20"
                  >
                    <div className="grid grid-cols-3 gap-2.5 xl:gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5 p-2 xl:p-2.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 text-white shadow-xs">
                        <div className="p-1.5 rounded-lg bg-[#981747]/50 text-[#E1B34F] border border-white/10 flex-shrink-0">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9px] xl:text-[10px] text-slate-300 font-semibold uppercase tracking-wider truncate">
                            Duration
                          </div>
                          <div className="text-[11px] xl:text-xs font-bold text-white truncate">
                            {duration}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 p-2 xl:p-2.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 text-white shadow-xs">
                        <div className="p-1.5 rounded-lg bg-[#E1B34F]/30 text-[#E1B34F] border border-white/10 flex-shrink-0">
                          <GraduationCap className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9px] xl:text-[10px] text-slate-300 font-semibold uppercase tracking-wider truncate">
                            Eligibility
                          </div>
                          <div className="text-[11px] xl:text-xs font-bold text-white truncate">
                            {eligibility}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 p-2 xl:p-2.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/20 text-white shadow-xs">
                        <div className="p-1.5 rounded-lg bg-white/20 text-[#E1B34F] border border-white/10 flex-shrink-0">
                          <Laptop className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[9px] xl:text-[10px] text-slate-300 font-semibold uppercase tracking-wider truncate">
                            Mode
                          </div>
                          <div className="text-[11px] xl:text-xs font-bold text-white truncate">
                            {mode}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 pt-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[10px] xl:text-[11px] font-semibold text-white">
                          <Users className="w-3 h-3 text-[#E1B34F]" />
                          <span>30 Seats Intake • NBER-RCI Portal (Aug-Oct)</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[10px] xl:text-[11px] font-semibold text-white">
                          <Mic className="w-3 h-3 text-[#E1B34F]" />
                          <span>Speech &amp; Audiology Pathology</span>
                        </div>
                      </div>

                      <a
                        href="#about"
                        className="inline-flex items-center gap-1 text-[11px] xl:text-xs font-semibold text-[#E1B34F] hover:text-white transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Auditory Acoustic Frequency Wave & Core Discipline Strip */}
      {showWaveform && (
        <section className="bg-[#FBF8F1] py-12 sm:py-16 border-b border-[#E8E2D8] relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#172D55]/10 text-[#172D55] text-xs font-bold uppercase tracking-wider mb-2">
                Interactive Auditory Science
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172D55]">
                Acoustic Soundwaves &amp; Frequency Range
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-2">
                Experience the auditory perception spectrum (125 Hz – 8,000 Hz) taught in the DHLS
                audiology &amp; speech pathology curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <SoundWaveVisualizer
                  className="w-full bg-white border border-[#E8E2D8] shadow-md"
                  barCount={36}
                />
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
                      The DHLS curriculum covers the key areas of human communication, acoustics,
                      speech and language, and practical rehabilitation skills.
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
                      Hands-on laboratory training, clinical exposure and real-world experience to
                      build confidence and professional skills.
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
