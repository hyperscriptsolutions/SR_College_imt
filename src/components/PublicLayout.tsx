"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgressBar from "./ScrollProgressBar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FF] text-[#13264A] selection:bg-[#2684FF] selection:text-white">
      <ScrollProgressBar />
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}
