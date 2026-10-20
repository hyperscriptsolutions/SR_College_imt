"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CollegeLogo from "./CollegeLogo";
import { Menu, X, Phone, ArrowRight, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change or Esc key
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About DHLS", href: "/about-dhls" },
    { label: "Campus & Labs", href: "/#facilities" },
    { label: "Eligibility & Admission", href: "/eligibility-admission" },
    { label: "Course Structure", href: "/course-structure" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "bg-[#FFFCF6]/95 backdrop-blur-md shadow-xs border-b border-[#E8E2D8] py-2"
            : "bg-[#FFFCF6] border-b border-[#E8E2D8] py-2.5 sm:py-3"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center justify-between gap-3 xl:gap-6">
            {/* Logo and College Brand (Left) */}
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#172A50] rounded-lg flex-shrink-0"
              aria-label="S.R COLLEGE OF EDUCATION Homepage"
            >
              <CollegeLogo variant="navy" className="h-8 w-8 sm:h-9 sm:w-9 xl:h-10 xl:w-10" />
            </Link>

            {/* Desktop Navigation Links (Center) */}
            <nav
              className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1 mx-2"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                      isActive
                        ? "text-white bg-[#172A50] shadow-sm"
                        : "text-[#263238] hover:text-[#8B1745] hover:bg-stone-100/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Direct Call & Enquire Now (Right) */}
            <div className="hidden md:flex items-center gap-2.5 xl:gap-3 flex-shrink-0">
              <a
                href="tel:9886302035"
                className="flex items-center gap-1.5 text-xs xl:text-sm font-semibold text-[#172A50] hover:text-[#8B1745] px-3 xl:px-3.5 py-1.5 rounded-full bg-white border border-[#E8E2D8] hover:border-[#D9AD54] transition-all shadow-2xs whitespace-nowrap"
                title="Call S.R COLLEGE OF EDUCATION Admissions Desk"
              >
                <Phone className="w-3.5 h-3.5 text-[#172A50]" />
                <span className="font-mono tracking-tight font-bold">9886302035</span>
              </a>

              <Link
                href="/eligibility-admission#enquiry"
                className="inline-flex items-center gap-1.5 px-4 xl:px-5 py-2 rounded-full text-xs xl:text-sm font-bold text-white bg-[#172A50] hover:bg-[#26345B] shadow-sm transition-all duration-150 active:scale-95 whitespace-nowrap"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D9AD54]" />
              </Link>
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:9886302035"
                className="p-2 rounded-full bg-white border border-[#E8E2D8] text-[#172A50] md:hidden"
                aria-label="Call Admissions Desk"
              >
                <Phone className="w-4 h-4 text-[#172A50]" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#172A50] hover:bg-stone-100 border border-[#E8E2D8] focus:outline-none focus:ring-2 focus:ring-[#172A50]"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-[#172A50]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="fixed top-[58px] right-0 bottom-0 w-full max-w-xs bg-[#FFFCF6] border-l border-[#E8E2D8] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs uppercase font-bold text-[#172A50] tracking-wider mb-4 pb-3 border-b border-[#E8E2D8]">
                <span>DHLS Navigation</span>
                <ShieldCheck className="w-4 h-4 text-[#D9AD54]" />
              </div>
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-[#172A50] text-white shadow-xs"
                          : "text-[#263238] hover:bg-stone-100 hover:text-[#8B1745]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isActive ? "text-[#D9AD54]" : "text-stone-400"}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#E8E2D8] flex flex-col gap-3">
              <Link
                href="/eligibility-admission#enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full font-bold text-sm text-white bg-[#8B1745] hover:bg-[#721238] shadow-sm transition-all"
              >
                Enquire About DHLS
              </Link>

              <div className="p-3.5 rounded-xl bg-white border border-[#E8E2D8] text-xs text-[#263238]">
                <div className="font-bold text-[#172A50] mb-1.5">Admissions Helpline:</div>
                <div className="grid grid-cols-2 gap-1.5 font-mono font-semibold text-[11px]">
                  <a href="tel:9886302035" className="text-[#172A50] hover:text-[#8B1745] flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#D9AD54]" /> 9886302035
                  </a>
                  <a href="tel:9992700642" className="text-[#172A50] hover:text-[#8B1745] flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#D9AD54]" /> 9992700642
                  </a>
                  <a href="tel:9992700255" className="text-[#172A50] hover:text-[#8B1745] flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#D9AD54]" /> 9992700255
                  </a>
                  <a href="tel:9306040793" className="text-[#172A50] hover:text-[#8B1745] flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#D9AD54]" /> 9306040793
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
