"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Video,
  Camera,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  Stethoscope,
  Headphones,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

interface CampusVideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  localSrc: string;
  cloudSrc: string;
  poster: string;
}

interface CampusPhotoItem {
  id: string;
  title: string;
  category: "all" | "audiology" | "speech" | "classrooms" | "admin" | "campus";
  categoryLabel: string;
  tag: string;
  description: string;
  specs: string[];
  localSrc: string;
  cloudSrc: string;
}

const CAMPUS_VIDEOS: CampusVideoItem[] = [
  {
    id: "vid-1",
    title: "Campus & DHLS Academic Corridor Walkthrough",
    category: "Campus Tour",
    duration: "0:10",
    description:
      "First-hand walkthrough of the bright academic block, department hallways, and welcoming facilities at S.R College of Education, Sector 30-B, IMT Rohtak.",
    localSrc: "/videos/campus_tour_1.mp4",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/video/upload/v1792479950/WhatsApp_Video_2026-10-19_at_10.14.46_PM.mp4",
    poster: "/images/ear_anatomy_classroom.png",
  },
  {
    id: "vid-2",
    title: "Speech Therapy & Clinical Articulation Lab",
    category: "Speech Clinic",
    duration: "0:10",
    description:
      "Inspection of the clinical consultation room equipped with speech therapy articulation mirrors, diagnostic charts, language toys, and acoustic wall panels.",
    localSrc: "/videos/campus_tour_2.mp4",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/video/upload/v1792479951/WhatsApp_Video_2026-10-19_at_10.18.54_PM.mp4",
    poster: "/images/campus_building_2.jpg",
  },
  {
    id: "vid-3",
    title: "Soundproof Audiometric Testing Chamber",
    category: "Audiology Lab",
    duration: "0:10",
    description:
      "Walkthrough of the specialized sound-isolated audiometry chamber with double-glazed observation window designed for Pure Tone Audiometry and clinical assessment.",
    localSrc: "/videos/campus_tour_3.mp4",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/video/upload/v1792479952/WhatsApp_Video_2026-10-19_at_10.14.43_PM.mp4",
    poster: "/images/campus_building_3.jpg",
  },
  {
    id: "vid-4",
    title: "Practical Workshop & Seminar Hall",
    category: "Workshop Hall",
    duration: "0:15",
    description:
      "Wood-paneled community training hall, demonstration podium, modular speech apparatus, and collaborative student workstations.",
    localSrc: "/videos/campus_tour_4.mp4",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/video/upload/v1792479952/WhatsApp_Video_2026-10-19_at_9.41.15_PM.mp4",
    poster: "/images/community_classroom.png",
  },
  {
    id: "vid-5",
    title: "Speech Anatomy & Physiological Science Lab",
    category: "Anatomy Lab",
    duration: "0:10",
    description:
      "Detailed view of anatomical human brain, eye, vocal organ charts, and clinical demonstration tables in the department laboratory.",
    localSrc: "/videos/campus_tour_5.mp4",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/video/upload/v1792479951/WhatsApp_Video_2026-10-19_at_10.14.44_PM.mp4",
    poster: "/images/biology_lab_interior.png",
  },
];

const CAMPUS_PHOTOS: CampusPhotoItem[] = [
  {
    id: "photo-0",
    title: "Main Campus Entrance & DHLS Center Gate",
    category: "campus",
    categoryLabel: "Campus Gate",
    tag: "Main Entrance",
    description:
      "The official main entrance of S.R. College of Education, Industrial Model Township (IMT), Rohtak, featuring on-site counseling, academic blocks, and the dedicated DHLS department.",
    specs: [
      "Official RCI DHLS academic department wing",
      "Prime location at IMT Rohtak, Garhi Bohar, Haryana",
      "Direct on-campus student counseling & admissions office",
    ],
    localSrc: "/images/hero_campus_main.jpg",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/image/upload/v1792760849/WhatsApp_Image_2026-10-22_at_12.34.53_PM.jpg",
  },
  {
    id: "photo-1",
    title: "Soundproof Audiometric Testing Chamber",
    category: "audiology",
    categoryLabel: "Audiology Lab",
    tag: "Acoustic Isolation",
    description:
      "Specialized sound-treated audiometry room equipped with an observation window for Pure Tone Audiometry and Speech Audiometry examinations.",
    specs: [
      "Perforated acoustic sound-absorption tiles",
      "Double-glazed observation window",
      "Dedicated audiometer operator console desk",
    ],
    localSrc: "/images/campus_building_3.jpg",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/image/upload/v1792482733/WhatsApp_Image_2026-10-20_at_1.17.50_PM_2.jpg",
  },
  {
    id: "photo-2",
    title: "Speech-Language Therapy & Articulation Clinic",
    category: "speech",
    categoryLabel: "Speech Clinic",
    tag: "Clinical Consultation",
    description:
      "Clinical consultation room designed for one-on-one speech therapy, articulation training, and language assessment with patients and pediatric cases.",
    specs: [
      "Mounted speech articulation training mirror",
      "Pediatric language intervention tools & toys",
      "Sound-treated acoustic ceiling & panels",
    ],
    localSrc: "/images/campus_building_2.jpg",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/image/upload/v1792482733/WhatsApp_Image_2026-10-20_at_1.17.50_PM.jpg",
  },
  {
    id: "photo-3",
    title: "Ear Anatomy & Audiology Lecture Hall",
    category: "classrooms",
    categoryLabel: "Lecture Hall",
    tag: "Theory & Lecture",
    description:
      "Comfortable air-cooled classroom with student writing tablet chairs, teacher podium, whiteboard, and comprehensive anatomical ear wall charts.",
    specs: [
      "Detailed human ear balance & structure charts",
      "Ergonomic student tablet-armchairs",
      "Integrated audio-visual teaching podium",
    ],
    localSrc: "/images/ear_anatomy_classroom.png",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/image/upload/v1792482740/Bright_Ear_Anatomy_Classroom.png",
  },
  {
    id: "photo-4",
    title: "Speech Anatomy & Biology Practical Lab",
    category: "audiology",
    categoryLabel: "Science Lab",
    tag: "Anatomy & Physiology",
    description:
      "Sunlit practical laboratory with high-ceiling ventilation, clinical demonstration tables, and charts covering the human nervous system, vocal tract, and brain.",
    specs: [
      "Human brain, eye & speech organ diagrams",
      "Sturdy laboratory examination tables",
      "Ample natural daylight & climate control",
    ],
    localSrc: "/images/biology_lab_interior.png",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/image/upload/v1792482740/Bright_Biology_Lab_Classroom_Interior.png",
  },
  {
    id: "photo-5",
    title: "Wood-Paneled Seminar & Community Hall",
    category: "classrooms",
    categoryLabel: "Workshop Hall",
    tag: "Community Training",
    description:
      "Spacious wood-paneled workshop hall for collaborative group study, clinical case conferences, and community-based rehabilitation practice.",
    specs: [
      "Acoustic warm wood-paneled walls",
      "Modular sorting materials & presentation board",
      "Glass storage cabinets for teaching aids",
    ],
    localSrc: "/images/community_classroom.png",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/image/upload/v1792482740/Bright_Wood-Paneled_Community_Classroom.png",
  },
  {
    id: "photo-6",
    title: "Department Administration & Counseling Office",
    category: "admin",
    categoryLabel: "Administration",
    tag: "Admissions Desk",
    description:
      "Executive administration office at S.R College of Education, Sector 30-B, IMT Rohtak where candidates receive personalized admission counseling.",
    specs: [
      "Dedicated student counseling desk",
      "Institutional verification archives",
      "On-campus helpdesk for RCI guidance",
    ],
    localSrc: "/images/campus_building_1.jpg",
    cloudSrc:
      "https://res.cloudinary.com/ozrdoi7q/image/upload/v1792482733/WhatsApp_Image_2026-10-20_at_1.17.50_PM_1.jpg",
  },
];

export default function CampusFacilitiesGallery() {
  const [activeTab, setActiveTab] = useState<"videos" | "photos">("videos");
  const [selectedVideo, setSelectedVideo] = useState<CampusVideoItem>(CAMPUS_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [activePhotoCategory, setActivePhotoCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const userPausedRef = useRef<boolean>(false);

  // Autoplay video when scrolled into view; pause when scrolled up or down out of view
  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;

          if (activeTab !== "videos" || !videoRef.current) return;

          if (isVisible) {
            // Scrolled into view -> Run video automatically (unless user actively paused it while in view)
            if (!userPausedRef.current && videoRef.current.paused) {
              videoRef.current.muted = isMuted;
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => setIsPlaying(true))
                  .catch(() => {
                    // Browser policy fallback: force muted autoplay
                    if (videoRef.current) {
                      videoRef.current.muted = true;
                      setIsMuted(true);
                      videoRef.current
                        .play()
                        .then(() => setIsPlaying(true))
                        .catch(() => {});
                    }
                  });
              }
            }
          } else {
            // Scrolled DOWN or UP away from this section -> pause the video immediately
            if (!videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
            // Reset user pause flag once the user has scrolled away, so returning to the section triggers autoplay again
            userPausedRef.current = false;
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5],
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [activeTab, selectedVideo, isMuted]);

  // Pause video if user switches to Photo Gallery tab
  useEffect(() => {
    if (activeTab !== "videos" && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [activeTab]);

  const handleVideoSelect = (video: CampusVideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    userPausedRef.current = false;
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 60);
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      userPausedRef.current = false;
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      userPausedRef.current = true;
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const filteredPhotos =
    activePhotoCategory === "all"
      ? CAMPUS_PHOTOS
      : CAMPUS_PHOTOS.filter((photo) => photo.category === activePhotoCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const prevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="py-20 sm:py-28 bg-[#FFFCF6] relative border-t border-[#E8E2D8] overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D9AD54]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#8B1745]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172A50] text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-[#D9AD54]" />
            <span>Campus Tour &amp; Clinical Facilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#172A50] tracking-tight leading-tight mb-4">
            Experience Our <span className="text-[#8B1745]">Infrastructure</span> &amp;{" "}
            <span className="text-[#D9AD54]">Labs</span>
          </h2>

          <p className="text-base sm:text-lg text-[#718096] leading-relaxed">
            Take a video tour and explore verified photographs of the specialized speech therapy clinics,
            soundproof audiometric isolation booth, ear anatomy lecture halls, and practical training facilities at
            S.R College of Education, Rohtak.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center mt-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs">
              <button
                onClick={() => setActiveTab("videos")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  activeTab === "videos"
                    ? "bg-[#172A50] text-white shadow-sm"
                    : "text-[#718096] hover:text-[#172A50] hover:bg-stone-50"
                }`}
              >
                <Video className="w-4 h-4 text-[#D9AD54]" />
                <span>Video Campus Tour ({CAMPUS_VIDEOS.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("photos")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  activeTab === "photos"
                    ? "bg-[#172A50] text-white shadow-sm"
                    : "text-[#718096] hover:text-[#172A50] hover:bg-stone-50"
                }`}
              >
                <Camera className="w-4 h-4 text-[#D9AD54]" />
                <span>Photo Gallery ({CAMPUS_PHOTOS.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: VIDEO CAMPUS TOUR */}
        {activeTab === "videos" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Main Featured Video Player + Description Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Video Player Column with automatic scroll-based play/pause observer */}
              <div
                ref={videoContainerRef}
                className="lg:col-span-8 bg-black rounded-3xl overflow-hidden border border-[#172A50]/20 shadow-2xl relative group"
              >
                <div className="relative aspect-video w-full bg-[#0A1120] flex items-center justify-center">
                  <video
                    ref={videoRef}
                    key={selectedVideo.id}
                    src={selectedVideo.localSrc}
                    poster={selectedVideo.poster}
                    muted={isMuted}
                    playsInline
                    loop
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onError={(e) => {
                      // Fallback to Cloudinary URL if local video is not yet cached
                      const target = e.currentTarget as HTMLVideoElement;
                      if (target.src !== selectedVideo.cloudSrc) {
                        target.src = selectedVideo.cloudSrc;
                      }
                    }}
                  />

                  {/* Play / Pause Center Overlay Button */}
                  <button
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className={`absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#172A50]/80 hover:bg-[#8B1745] text-white border-2 border-white/40 backdrop-blur-md flex items-center justify-center shadow-xl transition-all duration-200 cursor-pointer ${
                      isPlaying ? "opacity-0 group-hover:opacity-100 scale-90" : "opacity-100 scale-100"
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 text-[#D9AD54]" />
                    ) : (
                      <Play className="w-7 h-7 text-[#D9AD54] ml-1" />
                    )}
                  </button>

                  {/* Bottom Custom Control Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between text-white text-xs z-20">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlayPause}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                        title={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full transition-colors ${
                            isPlaying ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                          }`}
                        />
                        <span>{isPlaying ? "Playing in view" : "Paused"}</span>
                        <span className="text-slate-400">•</span>
                        <span>{selectedVideo.duration} • 1080p HD</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-[#8B1745] text-[10px] font-bold uppercase tracking-wider text-white">
                        {selectedVideo.category}
                      </span>
                      <button
                        onClick={toggleFullscreen}
                        className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
                        title="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video Info Banner under player */}
                <div className="p-5 sm:p-6 bg-[#172A50] text-white">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#D9AD54] uppercase tracking-wider">
                      {selectedVideo.category} • S.R College of Education
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300">
                      RCI Recognized Campus
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>

              {/* Video Playlist Selector Column */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8E2D8]">
                  <span className="text-xs font-bold text-[#172A50] uppercase tracking-wider">
                    Campus Video Playlist ({CAMPUS_VIDEOS.length})
                  </span>
                  <span className="text-[11px] text-[#718096]">Click to play</span>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {CAMPUS_VIDEOS.map((video, idx) => {
                    const isSelected = video.id === selectedVideo.id;
                    return (
                      <button
                        key={video.id}
                        onClick={() => handleVideoSelect(video)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 group cursor-pointer ${
                          isSelected
                            ? "bg-[#172A50] text-white border-[#172A50] shadow-md ring-2 ring-[#D9AD54]/50"
                            : "bg-white text-[#263238] border-[#E8E2D8] hover:border-[#172A50]/40 hover:bg-stone-50"
                        }`}
                      >
                        {/* Video Thumbnail with Play Icon */}
                        <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0 border border-black/10">
                          <Image
                            src={video.poster}
                            alt={video.title}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-200"
                            sizes="80px"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-white/90 text-[#172A50] flex items-center justify-center shadow-xs">
                              <Play className="w-3 h-3 ml-0.5 fill-current" />
                            </div>
                          </div>
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[9px] font-bold text-white">
                            {video.duration}
                          </span>
                        </div>

                        {/* Title & Category */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                isSelected
                                  ? "bg-[#D9AD54] text-[#172A50]"
                                  : "bg-[#8B1745]/10 text-[#8B1745]"
                              }`}
                            >
                              Part {idx + 1}
                            </span>
                            <span
                              className={`text-[10px] truncate ${
                                isSelected ? "text-slate-300" : "text-[#718096]"
                              }`}
                            >
                              {video.category}
                            </span>
                          </div>
                          <h4
                            className={`text-xs font-bold leading-tight line-clamp-2 ${
                              isSelected ? "text-white" : "text-[#172A50]"
                            }`}
                          >
                            {video.title}
                          </h4>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Admission Inquiry Mini Banner */}
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs mt-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8B1745] mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#D9AD54]" />
                    <span>In-Person Campus Tours</span>
                  </div>
                  <p className="text-[11px] text-[#718096] leading-relaxed mb-3">
                    Prospective students and parents are welcome to visit our department in Sector 30-B, IMT Rohtak
                    for a guided tour and live demonstration of the audiometric isolation booth.
                  </p>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#172A50] hover:text-[#8B1745] transition-colors"
                  >
                    <span>Schedule Campus Visit</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D9AD54]" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PHOTO GALLERY WITH LIGHTBOX */}
        {activeTab === "photos" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { key: "all", label: `All Facilities (${CAMPUS_PHOTOS.length})` },
                { key: "campus", label: "Main Campus (1)" },
                { key: "audiology", label: "Audiology & Labs (2)" },
                { key: "speech", label: "Speech Clinics (1)" },
                { key: "classrooms", label: "Lecture Halls (2)" },
                { key: "admin", label: "Administration (1)" },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActivePhotoCategory(filter.key)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-150 cursor-pointer ${
                    activePhotoCategory === filter.key
                      ? "bg-[#172A50] text-white shadow-xs"
                      : "bg-white text-[#718096] border border-[#E8E2D8] hover:text-[#172A50] hover:bg-stone-50"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Photo Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPhotos.map((photo, pIdx) => (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(pIdx)}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#E8E2D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                    <Image
                      src={photo.localSrc}
                      alt={photo.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    
                    {/* Top Tag Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-[#172A50]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                        {photo.tag}
                      </span>
                    </div>

                    {/* Zoom Icon Hint on Hover */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="p-2 rounded-xl bg-white/90 text-[#172A50] shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Photo Details */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold text-[#8B1745] uppercase tracking-wider mb-1.5">
                        {photo.categoryLabel}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[#172A50] mb-2 leading-snug group-hover:text-[#8B1745] transition-colors">
                        {photo.title}
                      </h3>
                      <p className="text-xs text-[#718096] leading-relaxed mb-4">
                        {photo.description}
                      </p>
                    </div>

                    {/* Key Infrastructure Specs Checklist */}
                    <div className="pt-3 border-t border-stone-100 space-y-1.5">
                      {photo.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-1.5 text-[11px] text-[#263238]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#D9AD54] flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* LIGHTBOX MODAL */}
        {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-4xl w-full bg-[#172A50] rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-[#8B1745] text-white transition-colors cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Nav Buttons */}
              <button
                onClick={prevLightbox}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#8B1745] text-white transition-colors cursor-pointer"
                title="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#8B1745] text-white transition-colors cursor-pointer"
                title="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Large Image */}
              <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
                <Image
                  src={filteredPhotos[lightboxIndex].localSrc}
                  alt={filteredPhotos[lightboxIndex].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Caption and Specs Footer */}
              <div className="p-5 sm:p-6 bg-[#172A50] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#D9AD54] uppercase tracking-wider">
                      {filteredPhotos[lightboxIndex].categoryLabel}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-300">
                      {lightboxIndex + 1} of {filteredPhotos.length}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    {filteredPhotos[lightboxIndex].title}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xl">
                    {filteredPhotos[lightboxIndex].description}
                  </p>
                </div>

                <Link
                  href="/eligibility-admission#enquiry"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-[#172A50] bg-[#D9AD54] hover:bg-[#c99c43] transition-colors whitespace-nowrap"
                >
                  <span>Admission Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#172A50]" />
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
