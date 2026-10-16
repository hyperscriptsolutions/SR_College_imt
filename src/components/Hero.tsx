"use client";

import React from "react";
import Link from "next/link";
import SoundWaveVisualizer from "./SoundWaveVisualizer";
import { ArrowDown, MessageSquare, Clock, GraduationCap, Laptop, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";
import type { CourseContent, AppearanceSettings } from "@/lib/dataStore";

interface HeroProps {
  content?: CourseContent;
  appearance?: AppearanceSettings;
}

export default function Hero({ content, appearance }: HeroProps) {
  const headline = content?.heroHeadline || "Understand Hearing. Discover Speech. Empower Communication.";
  const supporting = content?.heroSupporting || "Explore the Diploma in Hearing Language and Speech (DHLS) and discover how communication, language and hearing come together.";
  const description = content?.description || "This foundational 1-year academic curriculum explores the scientific mechanisms of human speech organs, linguistic articulation, acoustic soundwaves, and community rehabilitation principles.";
  const duration = content?.duration || "1 Year";
  const eligibility = content?.eligibility || "12th & Above";
  const mode = content?.mode || "Online / Offline (As listed by NIED)";
  const primaryCta = content?.primaryCtaText || "Explore the DHLS Course";
  const secondaryCta = content?.secondaryCtaText || "Enquire About Admission";
  const showWaveform = appearance?.showWaveform ?? true;

  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-36 pb-20 md:pb-28 bg-gradient-to-b from-[#071B3D] via-[#0A224D] to-[#071B3D] text-white overflow-hidden"
    >
      {/* Background Decorative Ambient Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] md:h-[500px] bg-gradient-to-tr from-[#2684FF]/20 via-[#9B6DFF]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-96 h-96 bg-[#29D7FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#9B6DFF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Decorative Elements */}
      <div className="hidden lg:flex items-center gap-2.5 absolute top-40 left-12 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xl text-xs font-medium text-slate-100 animate-float pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#29D7FF] animate-pulse" />
        <span>Indian Sign Language (ISL)</span>
      </div>

      <div className="hidden lg:flex items-center gap-2.5 absolute top-56 right-16 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xl text-xs font-medium text-slate-100 animate-float-delayed pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-[#29D7FF]" />
        <span>Auditory Acoustic Science</span>
      </div>

      <div className="hidden xl:flex items-center gap-2.5 absolute bottom-36 left-20 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-xl text-xs font-medium text-slate-100 animate-float pointer-events-none">
        <MessageSquare className="w-3.5 h-3.5 text-[#9B6DFF]" />
        <span>Speech & Language Pathology</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Institution Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2684FF]/15 border border-[#2684FF]/30 text-xs font-semibold text-[#29D7FF] tracking-wide mb-6">
              <ShieldCheck className="w-3.5 h-3.5 text-[#29D7FF]" />
              <span>SR COLLEGE OF EDUCATION • ROHTAK</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              Understand <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#29D7FF] via-[#2684FF] to-[#9B6DFF]">Hearing.</span>
              <br />
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2684FF] to-white">Speech.</span>
              <br />
              Empower <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#29D7FF] to-[#9B6DFF]">Communication.</span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-lg sm:text-xl font-medium text-slate-200 max-w-2xl mx-auto lg:mx-0 mb-4 leading-relaxed">
              {supporting}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link
                href="/about-dhls"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-[#2684FF] via-[#3B82F6] to-[#9B6DFF] hover:brightness-110 shadow-lg shadow-[#2684FF]/30 hover:shadow-xl transition-all duration-200 text-center active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{primaryCta}</span>
                <ArrowDown className="w-4 h-4 -rotate-90" />
              </Link>
              <Link
                href="/eligibility-admission#enquiry"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-semibold text-slate-100 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200 text-center backdrop-blur-md flex items-center justify-center gap-2"
              >
                <span>{secondaryCta}</span>
              </Link>
            </div>

            {/* Reference Information Chips (NIED) */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-3">
                Curriculum Reference Details (As Published by NIED)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-[#2684FF]/20 text-[#29D7FF]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-slate-400 font-medium">Duration</div>
                    <div className="text-sm font-bold text-white">{duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-[#9B6DFF]/20 text-[#9B6DFF]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-slate-400 font-medium">Eligibility</div>
                    <div className="text-sm font-bold text-white">{eligibility}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] text-slate-400 font-medium">Mode (NIED Ref)</div>
                    <div className="text-sm font-bold text-white truncate max-w-[130px]">{mode}</div>
                  </div>
                </div>

              </div>

              {/* Reference Disclaimer */}
              <div className="mt-3 flex items-start gap-1.5 text-[11px] text-slate-300">
                <AlertCircle className="w-3.5 h-3.5 text-[#29D7FF] flex-shrink-0 mt-0.5" />
                <span>
                  Reference course specifications published by NIED. SR College of Education admission availability, batch modes, and institutional guidelines must be confirmed directly.
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Soundwave & Dynamic Audio Graphic */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {showWaveform && <SoundWaveVisualizer className="w-full" barCount={28} />}

            {/* Quick Informational Preview Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#29D7FF] mb-2 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Core Discipline Focus
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                DHLS bridges communication theories, human vocal apparatus mechanics, auditory acoustics, and Indian Sign Language to cultivate foundational awareness in speech and hearing sciences.
              </p>
            </div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 text-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            aria-label="Scroll to What is DHLS section"
          >
            <span>Learn More About The Course</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#29D7FF]" />
          </a>
        </div>

      </div>
    </section>
  );
}
