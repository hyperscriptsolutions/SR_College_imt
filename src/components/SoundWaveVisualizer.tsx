"use client";

import React, { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Activity, Info, Radio } from "lucide-react";

interface SoundWaveProps {
  className?: string;
  barCount?: number;
}

export default function SoundWaveVisualizer({
  className = "",
  barCount = 36,
}: SoundWaveProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState<number>(1000);
  const [heights, setHeights] = useState<number[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Audiometric Octave Bands taught in DHLS Audiology spanning 125 Hz to 8,000 Hz
  const octaveBands = [
    { label: "125 Hz", freq: 125, desc: "Sub-harmonic Bass" },
    { label: "250 Hz", freq: 250, desc: "Vowel Fundamentals" },
    { label: "500 Hz", freq: 500, desc: "Voiced Speech Energy" },
    { label: "1,000 Hz", freq: 1000, desc: "Speech Clarity Core" },
    { label: "2,000 Hz", freq: 2000, desc: "Consonant Contrast" },
    { label: "4,000 Hz", freq: 4000, desc: "Sibilants (s, sh, f)" },
    { label: "8,000 Hz", freq: 8000, desc: "Upper Auditory Limit" },
  ];

  // Initial wave pattern
  useEffect(() => {
    const initial = Array.from({ length: barCount }, (_, i) => {
      const centerFactor = 1 - Math.abs((i - barCount / 2) / (barCount / 2));
      return Math.max(16, Math.sin((i / barCount) * Math.PI) * 72 * centerFactor + 16);
    });
    setHeights(initial);
  }, [barCount]);

  // Undulating wave animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHeights((prev) =>
        prev.map((val, i) => {
          const centerFactor = 1 - Math.abs((i - barCount / 2) / (barCount / 2));
          const wavePhase = Math.sin(Date.now() / 420 + i * 0.28);
          const dynamicHeight = Math.max(
            14,
            (wavePhase * 34 + 40) * centerFactor + (isPlayingAudio ? 14 : 6)
          );
          return dynamicHeight;
        })
      );
    }, 90);

    return () => clearInterval(interval);
  }, [barCount, isPlayingAudio]);

  // Clean Web Audio API synthesis for genuine reference tone
  const playTone = (freq: number) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      // Stop any existing oscillator
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {}
      }

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

      // Safe, gentle volume with soft fade-in
      gain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.07, audioCtxRef.current.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setSelectedFreq(freq);
      setIsPlayingAudio(true);
    } catch (err) {
      console.warn("Web Audio API not supported or blocked by browser:", err);
    }
  };

  const stopTone = () => {
    if (gainRef.current && audioCtxRef.current) {
      try {
        gainRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.1
        );
        setTimeout(() => {
          if (oscRef.current) {
            oscRef.current.stop();
            oscRef.current.disconnect();
            oscRef.current = null;
          }
        }, 120);
      } catch {
        if (oscRef.current) {
          oscRef.current.stop();
          oscRef.current = null;
        }
      }
    }
    setIsPlayingAudio(false);
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopTone();
    } else {
      playTone(selectedFreq);
    }
  };

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-7 bg-[#071B3D]/95 border border-[#29D7FF]/30 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {/* Glow Orbs in Background */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#29D7FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#9B6DFF]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#29D7FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#29D7FF]" />
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Acoustic &amp; Speech Frequency Wave
            </h3>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-[#29D7FF] font-semibold tracking-wide">
              Auditory Perception Range
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#9B6DFF]/20 text-[#A99BFF] border border-[#9B6DFF]/30 font-mono">
              125 Hz – 8,000 Hz
            </span>
          </div>
        </div>

        {/* Genuine Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 border ${
            isPlayingAudio
              ? "bg-[#29D7FF] text-[#071B3D] border-[#29D7FF] shadow-lg shadow-[#29D7FF]/30"
              : "bg-white/10 text-white border-white/15 hover:bg-white/15"
          }`}
          aria-label={isPlayingAudio ? "Stop Reference Tone" : "Play Reference Tone"}
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#071B3D] animate-pulse" />
              <span>Playing {selectedFreq} Hz</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-300" />
              <span>Play {selectedFreq} Hz Tone</span>
            </>
          )}
        </button>
      </div>

      {/* Waveform Bar Graphic (Cyan to Purple Gradient) */}
      <div
        className="flex items-center justify-center gap-1 sm:gap-1.5 h-24 sm:h-28 px-1"
        aria-hidden="true"
      >
        {heights.map((h, idx) => {
          const ratio = idx / (barCount - 1);
          const isMid = ratio > 0.2 && ratio < 0.8;

          return (
            <div
              key={idx}
              className="w-1.5 sm:w-2 rounded-full transition-all duration-150 ease-out"
              style={{
                height: `${h}px`,
                background: isMid
                  ? "linear-gradient(180deg, #29D7FF 0%, #9B6DFF 100%)"
                  : "linear-gradient(180deg, #2684FF 0%, #102B58 100%)",
                boxShadow: isMid ? "0 0 14px rgba(41, 215, 255, 0.45)" : "none",
              }}
            />
          );
        })}
      </div>

      {/* Exact Frequency Scale displaying 125 Hz and 8,000 Hz */}
      <div className="mt-3 px-1">
        {/* Frequency Axis Line & Range Indicator */}
        <div className="relative pt-2 pb-1">
          <div className="h-1 w-full bg-white/10 rounded-full relative overflow-hidden">
            {/* Highlighted Speech Perception Band in Center (250Hz - 4000Hz) */}
            <div
              className="absolute top-0 bottom-0 left-[14%] right-[14%] bg-gradient-to-r from-[#29D7FF] via-[#9B6DFF] to-[#2684FF] rounded-full shadow-[0_0_8px_rgba(41,215,255,0.6)]"
              title="Primary Human Speech Perception Band"
            />
          </div>

          {/* Scale Labels: Explicitly showcasing 125 Hz, Auditory Perception Range, and 8,000 Hz */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-300 mt-1.5">
            <span className="font-bold text-[#29D7FF]">125 Hz</span>
            <span className="text-slate-400 hidden xs:inline">250 Hz</span>
            <span className="text-slate-400 hidden sm:inline">500 Hz</span>
            <span className="px-2 py-0.5 rounded bg-[#2684FF]/20 text-white font-sans font-semibold text-[10px] border border-[#2684FF]/40">
              Auditory Perception Range
            </span>
            <span className="text-slate-400 hidden sm:inline">2,000 Hz</span>
            <span className="text-slate-400 hidden xs:inline">4,000 Hz</span>
            <span className="font-bold text-[#9B6DFF]">8,000 Hz</span>
          </div>
        </div>
      </div>

      {/* Interactive Octave Band Frequency Selector */}
      <div className="mt-5 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2.5">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-[#29D7FF]" />
            Audiometric Octave Frequency Synthesizer:
          </span>
          <span className="text-[#29D7FF] text-[10px]">Select frequency to test</span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 sm:gap-2">
          {octaveBands.map((band) => (
            <button
              key={band.freq}
              onClick={() => {
                setSelectedFreq(band.freq);
                if (isPlayingAudio) {
                  playTone(band.freq);
                }
              }}
              className={`p-2 rounded-xl text-center border transition-all ${
                selectedFreq === band.freq
                  ? "bg-[#29D7FF]/25 border-[#29D7FF] text-white shadow-md shadow-[#29D7FF]/20 ring-1 ring-[#29D7FF]/50"
                  : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="text-[11px] sm:text-xs font-bold font-mono">{band.label}</div>
              <div className="text-[8px] text-slate-400 hidden lg:block truncate mt-0.5">
                {band.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Informational Subtext */}
      <div className="mt-4 flex items-start gap-2.5 text-[11px] text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10">
        <Info className="w-4 h-4 text-[#29D7FF] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Auditory Perception Range:</strong> Standard audiometric evaluation maps hearing thresholds between <span className="text-[#29D7FF] font-semibold">125 Hz</span> and <span className="text-[#9B6DFF] font-semibold">8,000 Hz</span>. The DHLS curriculum covers acoustics, decibel calibration, speech banana frequencies, and auditory rehabilitation principles.
        </p>
      </div>
    </div>
  );
}
