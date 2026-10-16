"use client";

import React, { useState, useEffect } from "react";
import {
  Palette,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Sun,
  Moon,
  Activity,
  Layers,
} from "lucide-react";

interface AppearanceSettings {
  themeMode: "light" | "dark";
  accentColor: string;
  showWaveform: boolean;
  showDisciplines: boolean;
  animationIntensity: "reduced" | "standard" | "enhanced";
}

export default function AdminAppearancePage() {
  const [settings, setSettings] = useState<AppearanceSettings>({
    themeMode: "light",
    accentColor: "#2684FF",
    showWaveform: true,
    showDisciplines: true,
    animationIntensity: "standard",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const safeAccents = [
    { label: "Electric Blue (Default)", value: "#2684FF", preview: "bg-[#2684FF]" },
    { label: "Vibrant Cyan", value: "#29D7FF", preview: "bg-[#29D7FF]" },
    { label: "Royal Purple", value: "#9B6DFF", preview: "bg-[#9B6DFF]" },
    { label: "Deep Institutional Navy", value: "#102B58", preview: "bg-[#102B58]" },
  ];

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/appearance");
      if (res.ok) {
        const data = await res.json();
        setSettings(data.appearance);
      }
    } catch {
      setNotification({ type: "error", message: "Failed to load appearance settings." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setNotification(null);

    try {
      const res = await fetch("/api/admin/appearance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: "success", message: "Website appearance settings updated." });
        setSettings(data.appearance);
      } else {
        setNotification({ type: "error", message: data.error || "Failed to save settings." });
      }
    } catch {
      setNotification({ type: "error", message: "Network error occurred." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#2684FF]" />
        <span className="text-xs text-[#536B8E]">Loading appearance settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Website Appearance Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#536B8E] mt-1">
          Customize safe branding accents, visual component cards, and animation intensity for the public DHLS portal.
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs ${
            notification.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Accent Color Selection */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2684FF] pb-2 border-b border-slate-100 dark:border-white/10">
            <Palette className="w-4 h-4" />
            <span>Permitted Accent Palette</span>
          </div>

          <p className="text-xs text-[#536B8E]">
            Choose a curated primary accent hue applied to buttons, badges, and focal interactive elements.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {safeAccents.map((acc) => {
              const isSelected = settings.accentColor === acc.value;
              return (
                <div
                  key={acc.value}
                  onClick={() => setSettings({ ...settings, accentColor: acc.value })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? "border-[#2684FF] bg-blue-50/50 dark:bg-[#2684FF]/10 ring-2 ring-[#2684FF]/30"
                      : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full ${acc.preview} shadow-sm border border-white/20 flex-shrink-0`} />
                    <span className="text-xs font-bold text-[#13264A] dark:text-white">
                      {acc.label}
                    </span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#2684FF]" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Component Toggles */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#29D7FF] pb-2 border-b border-slate-100 dark:border-white/10">
            <Activity className="w-4 h-4" />
            <span>Permitted Visual Modules</span>
          </div>

          {/* Waveform Toggle */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-white/10">
            <div>
              <div className="text-xs font-bold text-[#13264A] dark:text-white">
                Acoustic & Speech Frequency Waveform Visualizer
              </div>
              <div className="text-[11px] text-[#536B8E] mt-0.5">
                Displays the animated frequency bar visualizer and interactive auditory reference tone generator in the hero area.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showWaveform}
                onChange={(e) => setSettings({ ...settings, showWaveform: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2684FF]" />
            </label>
          </div>

          {/* Core Disciplines Toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-xs font-bold text-[#13264A] dark:text-white">
                Core Discipline Focus Section
              </div>
              <div className="text-[11px] text-[#536B8E] mt-0.5">
                Displays the 4 interactive theme cards (Communication Theories, Vocal Apparatus, Auditory Acoustics, ISL).
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showDisciplines}
                onChange={(e) => setSettings({ ...settings, showDisciplines: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2684FF]" />
            </label>
          </div>
        </div>

        {/* Animation Intensity */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9B6DFF] pb-2 border-b border-slate-100 dark:border-white/10">
            <Sparkles className="w-4 h-4" />
            <span>Animation & Motion Intensity</span>
          </div>

          <p className="text-xs text-[#536B8E]">
            Tune motion effects across the public landing page while respecting system accessibility configurations.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-1">
            {(["reduced", "standard", "enhanced"] as const).map((level) => {
              const isSelected = settings.animationIntensity === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSettings({ ...settings, animationIntensity: level })}
                  className={`p-3 rounded-2xl border text-center transition-all capitalize text-xs font-bold ${
                    isSelected
                      ? "bg-[#2684FF] text-white border-[#2684FF] shadow-sm"
                      : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-7 py-3 rounded-xl text-xs font-bold text-white bg-[#2684FF] hover:bg-[#1E74E8] shadow-md shadow-[#2684FF]/25 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Applying Settings...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Appearance Settings</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
