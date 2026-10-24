"use client";

import React, { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Info } from "lucide-react";

interface SoundWaveProps {
  className?: string;
  barCount?: number;
}

export default function SoundWaveVisualizer({
  className = "",
  barCount = 32,
}: SoundWaveProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState<number>(1000);
  const [heights, setHeights] = useState<number[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Audiometric Octave Bands in DHLS Audiology spanning 125 Hz to 8,000 Hz
  const octaveBands = [
    { label: "125 Hz", freq: 125, desc: "Sub-bass" },
    { label: "250 Hz", freq: 250, desc: "Vocal F0" },
    { label: "500 Hz", freq: 500, desc: "Vowel 1st" },
    { label: "1,000 Hz", freq: 1000, desc: "Speech Ref" },
    { label: "2,000 Hz", freq: 2000, desc: "Consonant" },
    { label: "4,000 Hz", freq: 4000, desc: "Sibilant" },
    { label: "8,000 Hz", freq: 8000, desc: "Upper Air" },
  ];

  // Initial wave pattern
  useEffect(() => {
    const initial = Array.from({ length: barCount }, (_, i) => {
      const centerFactor = 1 - Math.abs((i - barCount / 2) / (barCount / 2));
      return Math.max(12, Math.sin((i / barCount) * Math.PI) * 58 * centerFactor + 14);
    });
    setHeights(initial);
  }, [barCount]);

  // Undulating wave animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHeights((prev) =>
        prev.map((val, i) => {
          const centerFactor = 1 - Math.abs((i - barCount / 2) / (barCount / 2));
          const wavePhase = Math.sin(Date.now() / 400 + i * 0.32);
          const dynamicHeight = Math.max(
            12,
            (wavePhase * 28 + 36) * centerFactor + (isPlayingAudio ? 12 : 4)
          );
          return dynamicHeight;
        })
      );
    }, 85);

    return () => clearInterval(interval);
  }, [barCount, isPlayingAudio]);

  // Clean Web Audio API synthesis for genuine reference tone (starts ONLY on user click)
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

      // Safe, gentle volume with soft fade-in ramp
      gain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, audioCtxRef.current.currentTime + 0.08);

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
      className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-white border border-[#E8E2D8] text-[#172D55] shadow-md hover:shadow-lg transition-shadow ${className}`}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E1B34F] animate-pulse" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#172D55]">
              Acoustic &amp; Speech Frequency Wave
            </h3>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] text-[#64748B] font-medium tracking-wide">
              Auditory Perception Range
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#981747]/10 text-[#981747] border border-[#981747]/20 font-mono font-semibold">
              125 Hz – 8,000 Hz
            </span>
          </div>
        </div>

        {/* Tone Play Toggle Button */}
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all duration-150 border cursor-pointer self-start sm:self-auto ${
            isPlayingAudio
              ? "bg-[#981747] text-white border-[#981747] shadow-md active:scale-95"
              : "bg-white hover:bg-stone-50 text-[#172D55] border-[#E8E2D8] shadow-2xs hover:border-[#E1B34F]"
          }`}
          aria-label={isPlayingAudio ? "Stop Reference Tone" : "Play 1000 Hz Reference Tone"}
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#E1B34F] animate-pulse" />
              <span>Playing {selectedFreq} Hz</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#981747]" />
              <span>Play {selectedFreq} Hz Tone</span>
            </>
          )}
        </button>
      </div>

      {/* Waveform Bar Graphic with Multi-Color Acoustic Gradient */}
      <div
        className="flex items-center justify-center gap-1 sm:gap-1.5 h-20 sm:h-24 px-1 my-2"
        aria-hidden="true"
      >
        {heights.map((h, idx) => {
          const ratio = idx / (barCount - 1);
          // High-contrast multi-color gradient matching project design system
          let barBg = "linear-gradient(180deg, #CBD5E1 0%, #94A3B8 100%)";
          if (ratio > 0.15 && ratio <= 0.4) {
            barBg = "linear-gradient(180deg, #981747 0%, #B8285F 100%)";
          } else if (ratio > 0.4 && ratio <= 0.65) {
            barBg = "linear-gradient(180deg, #E1B34F 0%, #D9AD54 100%)";
          } else if (ratio > 0.65 && ratio <= 0.88) {
            barBg = "linear-gradient(180deg, #0284C7 0%, #172D55 100%)";
          }

          return (
            <div
              key={idx}
              className="w-1.5 sm:w-2 rounded-full transition-all duration-150 ease-out shadow-xs"
              style={{
                height: `${h}px`,
                background: barBg,
              }}
            />
          );
        })}
      </div>

      {/* Frequency Scale Labels Line */}
      <div className="relative pt-2 pb-1 border-t border-[#E8E2D8]">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#64748B]">
          <span className="font-bold text-[#981747]">125 Hz</span>
          <span className="text-[#94A3B8] hidden xs:inline">500 Hz</span>
          <span className="text-[#172D55] font-semibold font-sans text-[10px] px-2.5 py-0.5 rounded-full bg-stone-100 border border-[#E8E2D8] shadow-2xs">
            1,000 Hz (Core Speech)
          </span>
          <span className="text-[#94A3B8] hidden xs:inline">4,000 Hz</span>
          <span className="font-bold text-[#0284C7]">8,000 Hz</span>
        </div>
      </div>

      {/* Interactive Octave Band Frequency Selector (Cards Row) */}
      <div className="mt-3 pt-3 border-t border-[#E8E2D8]">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
          {octaveBands.map((band) => {
            const isSelected = selectedFreq === band.freq;
            return (
              <button
                key={band.freq}
                onClick={() => {
                  setSelectedFreq(band.freq);
                  if (isPlayingAudio) {
                    playTone(band.freq);
                  }
                }}
                className={`py-2 px-1 rounded-xl text-center border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#172D55] border-[#172D55] text-white shadow-md ring-2 ring-[#E1B34F]"
                    : "bg-stone-50 hover:bg-white border-[#E8E2D8] text-[#172D55] shadow-2xs hover:border-[#E1B34F]"
                }`}
              >
                <div className={`text-[11px] font-bold font-mono ${isSelected ? "text-white" : "text-[#172D55]"}`}>
                  {band.label}
                </div>
                <div className={`text-[8px] truncate mt-0.5 ${isSelected ? "text-[#E1B34F] font-medium" : "text-[#64748B]"}`}>
                  {band.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Informational Subtext */}
      <div className="mt-3.5 flex items-start gap-2.5 text-[11px] text-[#475569] bg-stone-50 p-3 rounded-xl border border-[#E8E2D8] shadow-2xs">
        <Info className="w-4 h-4 text-[#981747] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#172D55]">Auditory Perception Range:</strong> Standard audiometric evaluation maps hearing thresholds between <span className="text-[#981747] font-bold">125 Hz</span> and <span className="text-[#0284C7] font-bold">8,000 Hz</span>. The DHLS curriculum covers acoustics, detection, and foundational speech and language pathways.
        </p>
      </div>
    </div>
  );
}
