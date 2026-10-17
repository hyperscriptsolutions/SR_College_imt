"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgressBar from "./ScrollProgressBar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFCF6] text-[#263238] selection:bg-[#D9AD54]/30 selection:text-[#172A50]">
      <ScrollProgressBar />
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}
