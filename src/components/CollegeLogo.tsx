import React from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "navy";
  showText?: boolean;
}

export default function CollegeLogo({
  className = "h-12 w-12",
  variant = "navy",
  showText = true,
}: LogoProps) {
  const isDarkBg = variant === "light";
  const primaryColor = isDarkBg ? "#FFFFFF" : "#172A50";
  const accentColor = isDarkBg ? "#D9AD54" : "#D9AD54";
  const textColor = isDarkBg ? "text-white" : "text-[#172A50]";
  const subtextColor = isDarkBg ? "text-slate-300" : "text-[#718096]";

  return (
    <div className="flex items-center gap-3">
      {/* Institutional Crest SVG */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} flex-shrink-0 transition-transform duration-300 hover:scale-105`}
        aria-label="S.R College of Education Emblem"
      >
        {/* Shield background */}
        <defs>
          <linearGradient id="crestGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172A50" />
            <stop offset="100%" stopColor="#26345B" />
          </linearGradient>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9AD54" />
            <stop offset="100%" stopColor="#F5D076" />
          </linearGradient>
        </defs>

        {/* Outer Circular Laurel / Shield Ring */}
        <circle cx="50" cy="50" r="46" stroke="url(#goldGrad)" strokeWidth="2.5" strokeDasharray="4 2" />
        <circle cx="50" cy="50" r="42" fill="url(#crestGrad)" />

        {/* Inner Shield contour */}
        <path
          d="M50 18 C65 18 72 26 72 44 C72 66 50 78 50 78 C50 78 28 66 28 44 C28 26 35 18 50 18 Z"
          fill="#111F3B"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
        />

        {/* Sound Wave & Speech Rays inside Crest */}
        <path d="M42 42 Q42 50 42 58" stroke="#D9AD54" strokeWidth="2" strokeLinecap="round" />
        <path d="M46 36 Q46 50 46 64" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M50 32 Q50 50 50 68" stroke="#D9AD54" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M54 36 Q54 50 54 64" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M58 42 Q58 50 58 58" stroke="#D9AD54" strokeWidth="2" strokeLinecap="round" />

        {/* Open Book Foundation at base of shield */}
        <path
          d="M36 68 Q50 64 50 71 Q50 64 64 68 Q50 60 36 68 Z"
          fill="#D9AD54"
          opacity="0.95"
        />

        {/* Letters "S.R" */}
        <text
          x="50"
          y="30"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="bold"
          letterSpacing="0.5"
          fontFamily="system-ui"
        >
          S.R
        </text>

        {/* Star accent at bottom */}
        <polygon points="50,81 52,85 56,85 53,88 54,92 50,89 46,92 47,88 44,85 48,85" fill="#D9AD54" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight text-sm sm:text-base xl:text-lg leading-tight whitespace-nowrap ${textColor}`}>
            S.R COLLEGE OF EDUCATION
          </span>
          <span className={`text-[10px] sm:text-[11px] xl:text-xs font-medium tracking-wide whitespace-nowrap ${subtextColor}`}>
            Rohtak, Haryana • Estd. Institution
          </span>
        </div>
      )}
    </div>
  );
}
