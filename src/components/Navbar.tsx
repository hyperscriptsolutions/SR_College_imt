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
      setIsScrolled(window.scrollY > 20);
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
    { label: "Eligibility & Admission", href: "/eligibility-admission" },
    { label: "Course Structure", href: "/course-structure" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#071B3D]/95 backdrop-blur-md shadow-lg shadow-[#071B3D]/25 py-2.5 border-b border-[#2684FF]/25"
            : "bg-[#071B3D]/85 backdrop-blur-sm py-3.5 border-b border-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and College Brand */}
            <Link
              href="/"
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2684FF] rounded-lg"
              aria-label="SR College of Education Homepage"
            >
              <CollegeLogo variant="light" className="h-10 w-10 sm:h-11 sm:w-11" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "text-white bg-[#2684FF]/30 border border-[#29D7FF]/50 shadow-sm shadow-[#2684FF]/25"
                        : "text-slate-200 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Direct Call & Primary CTA */}
            <div className="hidden md:flex items-center gap-2.5 xl:gap-3">
              <a
                href="tel:9416968076"
                className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-white px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title="Call SR College Admissions Desk"
              >
                <Phone className="w-3.5 h-3.5 text-[#29D7FF]" />
                <span className="font-mono">9416968076</span>
              </a>

              <Link
                href="/eligibility-admission#enquiry"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs xl:text-sm font-bold text-white bg-gradient-to-r from-[#2684FF] via-[#3B82F6] to-[#9B6DFF] hover:brightness-110 shadow-md shadow-[#2684FF]/30 hover:shadow-lg hover:shadow-[#2684FF]/45 transition-all duration-200 active:scale-95"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:9416968076"
                className="p-2 rounded-xl bg-white/10 text-white md:hidden"
                aria-label="Call Admissions Desk"
              >
                <Phone className="w-4 h-4 text-[#29D7FF]" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#2684FF]"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="fixed top-[60px] right-0 bottom-0 w-full max-w-xs bg-[#071B3D] border-l border-[#2684FF]/25 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs uppercase font-bold text-[#29D7FF] tracking-wider mb-4">
                <span>DHLS Navigation</span>
                <ShieldCheck className="w-4 h-4 text-[#9B6DFF]" />
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
                          ? "bg-[#2684FF]/25 border border-[#29D7FF]/40 text-white shadow-sm"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isActive ? "text-[#29D7FF]" : "text-slate-400"}`} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="/eligibility-admission#enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#2684FF] to-[#9B6DFF] shadow-lg shadow-[#2684FF]/30 hover:brightness-110 transition-all"
              >
                Enquire About DHLS
              </Link>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <div className="font-semibold text-white mb-1.5">Admissions Helpline:</div>
                <div className="flex flex-col gap-1 font-mono">
                  <a href="tel:9416968076" className="text-[#29D7FF] hover:underline flex items-center gap-1.5">
                    <Phone className="w-3 h-3" /> 9416968076
                  </a>
                  <a href="tel:9896302035" className="text-[#29D7FF] hover:underline flex items-center gap-1.5">
                    <Phone className="w-3 h-3" /> 9896302035
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
