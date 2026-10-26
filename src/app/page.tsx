import React from "react";
import PublicLayout from "@/components/PublicLayout";
import Hero from "@/components/Hero";
import AboutDHLS from "@/components/AboutDHLS";
import WhatYouWillExplore from "@/components/WhatYouWillExplore";
import CampusFacilitiesGallery from "@/components/CampusFacilitiesGallery";
import PhotoGallery from "@/components/PhotoGallery";
import HomeContactPreview from "@/components/HomeContactPreview";
import { getCourseContent, getAppearanceSettings } from "@/lib/dataStore";

export default function HomePage() {
  const content = getCourseContent();
  const appearance = getAppearanceSettings();

  return (
    <PublicLayout>
      {/* 1. Hero with Acoustic & Speech Frequency Wave & CTAs */}
      <Hero content={content} appearance={appearance} />

      {/* 2. Introduction to the DHLS Course & 3 Core Pillars */}
      <AboutDHLS />

      {/* 3. Real Campus Video Walkthrough & Clinical Infrastructure */}
      <CampusFacilitiesGallery />

      {/* 4. Core Discipline Focus Section (Communication Theories, Human Vocal Apparatus, Auditory Acoustics, Indian Sign Language) */}
      <WhatYouWillExplore showDisciplines={appearance.showDisciplines} />

      {/* 5. Life at S.R. College of Education - Photo Gallery Preview */}
      <PhotoGallery
        isPreview
        limit={6}
        showViewAll
        title="Life at S.R. College of Education"
        subtitle="Explore our campus, learning spaces, facilities, and memorable moments through photographs."
      />

      {/* 6. Compact College Contact Preview & Direct Enquire Action */}
      <HomeContactPreview />
    </PublicLayout>
  );
}
