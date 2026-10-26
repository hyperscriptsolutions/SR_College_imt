"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MapPin,
  Camera,
  ArrowRight,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  GALLERY_PHOTOS,
  GalleryPhoto,
  getAvailableCategories,
} from "@/lib/galleryData";

interface PhotoGalleryProps {
  isPreview?: boolean;
  limit?: number;
  showViewAll?: boolean;
  title?: string;
  subtitle?: string;
}

export default function PhotoGallery({
  isPreview = false,
  limit = 6,
  showViewAll = false,
  title = "Life at S.R. College of Education",
  subtitle = "Explore our campus, learning spaces, facilities, and memorable moments through photographs.",
}: PhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  // Dynamically obtain available categories that actually have photos
  const categories = getAvailableCategories();

  // Filter photos based on active category
  const filteredPhotos = React.useMemo(() => {
    let photos = GALLERY_PHOTOS;
    if (selectedCategory !== "all") {
      photos = photos.filter((p) => p.category === selectedCategory);
    }
    if (isPreview && limit) {
      photos = photos.slice(0, limit);
    }
    return photos;
  }, [selectedCategory, isPreview, limit]);

  // Open lightbox and save active element for accessibility focus restoration
  const openLightbox = (index: number) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    if (lastActiveElementRef.current) {
      lastActiveElementRef.current.focus();
    }
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        nextPhoto();
      } else if (e.key === "ArrowLeft") {
        prevPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextPhoto, prevPhoto]);

  // Body scroll locking when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [lightboxIndex]);

  // Touch swipe support for mobile lightbox navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Only trigger horizontal swipe if horizontal movement is larger than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const currentPhoto: GalleryPhoto | undefined =
    lightboxIndex !== null ? filteredPhotos[lightboxIndex] : undefined;

  return (
    <section
      id="gallery"
      className="py-16 sm:py-24 bg-[#FFFCF6] relative border-b border-[#E8E2D8] overflow-hidden"
      aria-label="Photo Gallery Section"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9AD54]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#172A50]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172A50]/5 border border-[#172A50]/10 text-[#172A50] text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5 text-[#D9AD54]" />
            <span>Campus Visual Tour</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172A50] tracking-tight mb-4">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-[#718096] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Category Filter Tabs (Dynamic: only shows categories with available photos) */}
        <div className="flex items-center justify-center mb-10 sm:mb-12">
          <div
            className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs max-w-full"
            role="tablist"
            aria-label="Gallery categories"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#172A50] text-white shadow-xs"
                      : "text-[#263238] hover:text-[#172A50] hover:bg-stone-100"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? "bg-[#D9AD54] text-[#172A50]"
                        : "bg-stone-100 text-[#718096]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              role="button"
              tabIndex={0}
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              aria-label={`View photograph: ${photo.title}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E8E2D8] shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-[#172A50] focus-visible:ring-offset-2"
            >
              {/* Image Container with subtle zoom on hover */}
              <div className="relative w-full aspect-4/3 sm:aspect-16/10 bg-stone-100 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 3 ? "eager" : "lazy"}
                  priority={index < 2}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Category Badge overlay on top-left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-[#172A50]/90 text-white backdrop-blur-xs shadow-xs border border-white/20">
                    <Sparkles className="w-2.5 h-2.5 text-[#D9AD54]" />
                    {photo.categoryLabel}
                  </span>
                </div>

                {/* Expand icon on top-right */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="w-8 h-8 rounded-full bg-white/90 text-[#172A50] flex items-center justify-center shadow-md backdrop-blur-xs">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Gradient vignette at bottom of image */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#172A50]/90 via-[#172A50]/40 to-transparent pointer-events-none transition-opacity duration-300" />

                {/* Overlaid quick details at the foot of image */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white z-10">
                  <h3 className="font-bold text-sm sm:text-base leading-snug line-clamp-1 drop-shadow-sm group-hover:text-[#D9AD54] transition-colors">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-200 mt-1">
                    <MapPin className="w-3 h-3 text-[#D9AD54] flex-shrink-0" />
                    <span className="line-clamp-1">{photo.location}</span>
                  </div>
                </div>
              </div>

              {/* Caption Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white border-t border-[#E8E2D8]/60">
                <p className="text-xs sm:text-sm text-[#718096] line-clamp-2 leading-relaxed">
                  {photo.description}
                </p>

                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#172A50] group-hover:text-[#8B1745] flex items-center gap-1 transition-colors">
                    <span>Enlarge Photo</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D9AD54] transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                  <span className="text-[11px] text-[#718096]">S.R. College of Education</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Photos CTA (Displayed for homepage preview or when requested) */}
        {(isPreview || showViewAll) && (
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-white bg-[#172A50] hover:bg-[#26345B] shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group"
            >
              <Layers className="w-4 h-4 text-[#D9AD54]" />
              <span>View All Campus Photos ({GALLERY_PHOTOS.length})</span>
              <ArrowRight className="w-4 h-4 text-[#D9AD54] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && currentPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${currentPhoto.title}`}
          className="fixed inset-0 z-50 bg-[#0B1528]/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 transition-opacity animate-in fade-in duration-200"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar: Counter & Close Button */}
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-20 pb-2">
            <div className="flex items-center gap-2 sm:gap-3 text-white">
              <span className="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/20">
                Photo {lightboxIndex + 1} of {filteredPhotos.length}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#D9AD54] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                {currentPhoto.categoryLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#D9AD54] cursor-pointer"
              aria-label="Close photo viewer (Escape)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Center Stage: Image and Previous/Next Controls */}
          <div className="relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-2 sm:my-4">
            {/* Previous Button */}
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-1 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#172A50] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D9AD54] cursor-pointer shadow-lg"
              aria-label="Previous photograph (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Main Image */}
            <div className="relative w-full h-[55vh] sm:h-[68vh] max-h-[750px]">
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 85vw"
                className="object-contain drop-shadow-2xl select-none"
              />
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-1 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#172A50] text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D9AD54] cursor-pointer shadow-lg"
              aria-label="Next photograph (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Bottom Bar: Photo Title, Location & Description */}
          <div className="w-full max-w-4xl mx-auto z-20 bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-2">
              <h3 className="text-base sm:text-xl font-bold text-white">
                {currentPhoto.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#D9AD54] font-medium flex-shrink-0">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentPhoto.location}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentPhoto.description}
            </p>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span className="hidden sm:inline">Use Arrow keys (← →) or swipe to navigate • Esc to close</span>
              <span className="sm:hidden">Swipe left / right to navigate</span>
              <span className="font-semibold text-slate-300">S.R. College of Education, Rohtak</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
