"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CollegeLogo from "./CollegeLogo";
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface NavLinkItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // Dynamic header shadow & measurement on scroll/resize
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    const updateNavbarHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty("--navbar-height", `${height}px`);
      }
    };

    updateNavbarHeight();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateNavbarHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile drawer is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // All 7 desktop navigation links in one clean horizontal row
  const desktopNavLinks: NavLinkItem[] = [
    { label: "Home", href: "/" },
    { label: "About DHLS", href: "/about-dhls" },
    { label: "Campus & Labs", href: "/#facilities" },
    { label: "Eligibility & Admission", href: "/eligibility-admission" },
    { label: "Course Structure", href: "/course-structure" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQs", href: "/faqs" },
  ];

  // Mobile navigation links includes Contact Us as an additional item
  const mobileNavLinks: NavLinkItem[] = [
    ...desktopNavLinks,
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
          isScrolled
            ? "bg-[#FFFCF6]/95 backdrop-blur-md shadow-xs border-[#E8E2D8] py-2"
            : "bg-[#FFFCF6] border-[#E8E2D8] py-2.5 sm:py-3"
        }`}
        role="banner"
      >
        {/* Full-width container with responsive edge padding — removes unwanted artificial blank margins on left & right */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          {/*
            Three distinct areas:
            1. Left: Branding (Logo + College Name) - strictly flex-shrink-0
            2. Center: Navigation Links - flex-1 min-w-0, centered with ample space, all 7 links visible
            3. Right: Contact Phone + Enquire CTA - strictly flex-shrink-0
          */}
          <div className="flex items-center justify-between gap-3 xl:gap-6 w-full">
            
            {/* AREA 1: Branding (Far Left) */}
            <div className="flex items-center flex-shrink-0 z-20">
              <Link
                href="/"
                className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#172A50] rounded-lg flex-shrink-0"
                aria-label="S.R. College of Education Homepage"
              >
                <CollegeLogo
                  variant="navy"
                  showText={false}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold tracking-tight text-xs sm:text-sm text-[#172A50] leading-tight whitespace-nowrap group-hover:text-[#8B1745] transition-colors">
                    S.R. COLLEGE OF EDUCATION
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-medium tracking-wide text-[#718096] whitespace-nowrap hidden sm:block">
                    Rohtak, Haryana • Estd. Institution
                  </span>
                </div>
              </Link>
            </div>

            {/* AREA 2: Navigation Links (Center, Desktop xl+) - All 7 links fully displayed with zero clipping */}
            <nav
              className="hidden xl:flex items-center justify-center gap-1 xl:gap-2 2xl:gap-3 flex-1 min-w-0 px-2"
              aria-label="Main Navigation"
            >
              {desktopNavLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] 2xl:text-sm font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
                      isActive
                        ? "text-white bg-[#172A50] shadow-2xs font-bold"
                        : "text-[#172A50]/90 hover:text-[#8B1745] hover:bg-[#172A50]/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* AREA 3: Contact & CTA (Far Right) */}
            <div className="flex items-center justify-end gap-2 xl:gap-3 flex-shrink-0 z-20">
              {/* Phone Helpline with dedicated icon badge (Desktop xl+) */}
              <a
                href="tel:9896302035"
                className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 xl:px-3.5 xl:py-2 rounded-full bg-white border border-[#E8E2D8] hover:border-[#D9AD54] text-[#172A50] hover:text-[#8B1745] transition-all shadow-2xs whitespace-nowrap group"
                title="Call Admissions Helpdesk: 9896302035"
              >
                <span className="w-5 h-5 rounded-full bg-[#172A50]/5 flex items-center justify-center text-[#172A50] group-hover:bg-[#8B1745]/10 group-hover:text-[#8B1745] transition-colors flex-shrink-0">
                  <Phone className="w-3 h-3" />
                </span>
                <span className="font-semibold text-xs xl:text-sm tracking-wide">9896302035</span>
              </a>

              {/* Enquire Now CTA (Desktop xl+) */}
              <Link
                href="/eligibility-admission#enquiry"
                className="hidden xl:inline-flex items-center gap-2 px-4 py-1.5 xl:px-4.5 xl:py-2 rounded-full text-xs xl:text-sm font-bold text-white bg-[#172A50] hover:bg-[#26345B] shadow-sm transition-all duration-150 active:scale-95 whitespace-nowrap group"
              >
                <span>Enquire Now</span>
                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="w-2.5 h-2.5 text-[#D9AD54] transition-transform duration-150 group-hover:translate-x-0.5" />
                </span>
              </Link>

              {/* Mobile / Tablet Call Button (< xl) */}
              <a
                href="tel:9896302035"
                className="xl:hidden w-9 h-9 rounded-full bg-white border border-[#E8E2D8] text-[#172A50] hover:bg-stone-50 flex items-center justify-center transition-colors shadow-2xs"
                aria-label="Call Admissions Desk: 9896302035"
              >
                <Phone className="w-4 h-4 text-[#172A50]" />
              </a>

              {/* Mobile / Tablet Hamburger Toggle (< xl) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden w-9 h-9 rounded-xl text-[#172A50] hover:bg-stone-100 border border-[#E8E2D8] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#172A50] transition-colors cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile / Tablet Drawer Menu (< xl) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-[#172A50]/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-[#FFFCF6] border-l border-[#E8E2D8] shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            {/* Drawer Header with proper icon spacing */}
            <div className="p-5 border-b border-[#E8E2D8] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <CollegeLogo variant="navy" showText={false} className="h-7 w-7 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-extrabold text-xs text-[#172A50]">
                    S.R. COLLEGE OF EDUCATION
                  </span>
                  <span className="text-[10px] text-[#718096]">
                    DHLS Navigation Portal
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-lg text-[#172A50] hover:bg-stone-100 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links with balanced icon spacing */}
            <div className="p-5 flex-1">
              <div className="text-[11px] uppercase font-bold text-[#718096] tracking-wider mb-3">
                Menu
              </div>

              <nav className="flex flex-col gap-1.5">
                {mobileNavLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-[#172A50] text-white shadow-xs font-bold"
                          : "text-[#263238] hover:bg-white hover:text-[#8B1745]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {link.href === "/gallery" && (
                          <Sparkles className="w-3.5 h-3.5 text-[#D9AD54] flex-shrink-0" />
                        )}
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 flex-shrink-0 ${
                          isActive ? "text-[#D9AD54]" : "text-stone-400"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions with balanced icon spacing */}
            <div className="p-5 border-t border-[#E8E2D8] bg-white flex flex-col gap-3">
              <Link
                href="/eligibility-admission#enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full font-bold text-sm text-white bg-[#172A50] hover:bg-[#26345B] shadow-sm transition-all flex items-center justify-center gap-2 group"
              >
                <span>Enquire About DHLS</span>
                <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-2.5 h-2.5 text-[#D9AD54]" />
                </span>
              </Link>

              {/* Admissions Helpline Contacts */}
              <div className="p-3.5 rounded-xl bg-[#FFFCF6] border border-[#E8E2D8] text-xs">
                <div className="flex items-center justify-between font-bold text-[#172A50] mb-2.5">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D9AD54] flex-shrink-0" />
                    Admissions Helpline
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 font-mono text-[11px] font-semibold">
                  <a
                    href="tel:9896302035"
                    className="text-[#172A50] hover:text-[#8B1745] flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-[#D9AD54] flex-shrink-0" /> 9896302035
                  </a>
                  <a
                    href="tel:7404153253"
                    className="text-[#172A50] hover:text-[#8B1745] flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-[#D9AD54] flex-shrink-0" /> 7404153253
                  </a>
                  <a
                    href="tel:9992700255"
                    className="text-[#172A50] hover:text-[#8B1745] flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-[#D9AD54] flex-shrink-0" /> 9992700255
                  </a>
                  <a
                    href="tel:9306040793"
                    className="text-[#172A50] hover:text-[#8B1745] flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-[#D9AD54] flex-shrink-0" /> 9306040793
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
