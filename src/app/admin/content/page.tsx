"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BookOpen,
  Eye,
  Sliders,
} from "lucide-react";

interface ContentForm {
  courseTitle: string;
  heroHeadline: string;
  heroSupporting: string;
  description: string;
  duration: string;
  eligibility: string;
  mode: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  isPublished: boolean;
}

export default function AdminContentPage() {
  const [form, setForm] = useState<ContentForm>({
    courseTitle: "",
    heroHeadline: "",
    heroSupporting: "",
    description: "",
    duration: "",
    eligibility: "",
    mode: "",
    primaryCtaText: "",
    secondaryCtaText: "",
    isPublished: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const loadContent = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const data = await res.json();
        setForm(data.content);
      }
    } catch {
      setNotification({ type: "error", message: "Failed to load course content." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setNotification(null);

    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setNotification({ type: "success", message: "DHLS course content updated successfully." });
        setForm(data.content);
      } else {
        setNotification({ type: "error", message: data.error || "Failed to update content." });
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
        <span className="text-xs text-[#536B8E]">Loading course content editor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            DHLS Course Content Management
          </h1>
          <p className="text-xs sm:text-sm text-[#536B8E] mt-1">
            Modify public-facing headings, descriptions, and reference specifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#0A1E3D] border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-[#29D7FF]" />
            <span>Preview Public Page</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Notification Toast */}
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

      {/* Content Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* 1. Publication Status Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold">Public Publication Status</div>
              <div className="text-xs text-[#536B8E] mt-0.5">
                Enable or disable visibility of the DHLS information page on the public domain.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2684FF]" />
            </label>
          </div>
        </div>

        {/* 2. Course Identity & Headlines */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-[#2684FF]">
            <BookOpen className="w-4 h-4" />
            <span>Hero & Course Identification</span>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
              Course Official Title
            </label>
            <input
              type="text"
              required
              value={form.courseTitle}
              onChange={(e) => setForm({ ...form, courseTitle: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
              Main Hero Headline
            </label>
            <input
              type="text"
              required
              value={form.heroHeadline}
              onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
              Supporting Headline
            </label>
            <textarea
              rows={2}
              required
              value={form.heroSupporting}
              onChange={(e) => setForm({ ...form, heroSupporting: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
              Program Overview Description
            </label>
            <textarea
              rows={3}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20 resize-none"
            />
          </div>
        </div>

        {/* 3. Reference Specifications */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-[#29D7FF]">
            <Sliders className="w-4 h-4" />
            <span>Reference Specifications (NIED Curriculum)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
                Course Duration
              </label>
              <input
                type="text"
                required
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
                Eligibility
              </label>
              <input
                type="text"
                required
                value={form.eligibility}
                onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
                Mode (Reference)
              </label>
              <input
                type="text"
                required
                value={form.mode}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
              />
            </div>
          </div>
        </div>

        {/* 4. Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={loadContent}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Changes</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-7 py-3 rounded-xl text-xs font-bold text-white bg-[#2684FF] hover:bg-[#1E74E8] shadow-md shadow-[#2684FF]/25 hover:shadow-lg transition-all flex items-center gap-2 active:scale-95 disabled:opacity-70"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Content...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save & Publish Changes</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
