import React from "react";
import PublicLayout from "@/components/PublicLayout";
import Hero from "@/components/Hero";
import AboutDHLS from "@/components/AboutDHLS";
import WhatYouWillExplore from "@/components/WhatYouWillExplore";
import CampusFacilitiesGallery from "@/components/CampusFacilitiesGallery";
import HomeContactPreview from "@/components/HomeContactPreview";
import { getCourseContent, getAppearanceSettings } from "@/lib/dataStore";

export default function HomePage() {
  const content = getCourseContent();
  const appearance = getAppearanceSettings();

  return (
    <PublicLayout>
      {/* 1. Hero with Acoustic & Speech Frequency Wave, 125 Hz - 8,000 Hz scale & CTAs */}
      <Hero content={content} appearance={appearance} />

      {/* 2. Introduction to the DHLS Course & 3 Core Pillars */}
      <AboutDHLS />

      {/* 3. Real Campus Video Walkthrough & Clinical Infrastructure Photo Gallery */}
      <CampusFacilitiesGallery />

      {/* 4. Core Discipline Focus Section (4 Cards: Communication Theories, Human Vocal Apparatus, Auditory Acoustics, Indian Sign Language) */}
      <WhatYouWillExplore showDisciplines={appearance.showDisciplines} />

      {/* 5. Compact College Contact Preview & Direct Enquire Action */}
      <HomeContactPreview />
    </PublicLayout>
  );
}
