"use client";

import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Save,
  Clock,
  Award,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import type { CourseOffering } from "@/lib/dataStore";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseOffering[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      if (res.ok && data.success) {
        setCourses(data.courses || []);
      } else {
        setSaveError(data.error || "Failed to load courses");
      }
    } catch {
      setSaveError("Network error while loading courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleFieldChange = (index: number, field: keyof CourseOffering, value: any) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveSuccess(null);
      setSaveError(null);

      const res = await fetch("/api/admin/courses", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courses }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaveSuccess("Course programs updated successfully!");
        setCourses(data.courses);
      } else {
        setSaveError(data.error || "Failed to save courses");
      }
    } catch {
      setSaveError("Network error while saving courses");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#2684FF]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-[#13264A] dark:text-white flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-[#2684FF]" />
            <span>Academic Courses Offered ({courses.length})</span>
          </h1>
          <p className="text-xs text-[#536B8E] dark:text-slate-400 mt-1">
            Manage the 5 official courses displayed on the homepage, admission enquiry form, and eligibility matrix.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchCourses}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer text-[#13264A] dark:text-white"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-[#2684FF] hover:bg-[#1f6ecc] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Courses Editor List */}
      <div className="space-y-6">
        {courses.map((course, idx) => (
          <div
            key={course.id || idx}
            className="p-6 rounded-2xl bg-white dark:bg-[#13264A]/40 border border-slate-200 dark:border-white/10 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold text-[#2684FF] px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40">
                #{idx + 1} • {course.shortCode}
              </span>
              <span className="text-xs text-[#536B8E] dark:text-slate-400 font-semibold">
                ID: {course.id}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#13264A] dark:text-slate-300 mb-1">
                  Full Course Name
                </label>
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => handleFieldChange(idx, "name", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs font-semibold text-[#13264A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#13264A] dark:text-slate-300 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={course.duration}
                  onChange={(e) => handleFieldChange(idx, "duration", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs font-semibold text-[#13264A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#13264A] dark:text-slate-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={course.category}
                  onChange={(e) => handleFieldChange(idx, "category", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs font-semibold text-[#13264A] dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#13264A] dark:text-slate-300 mb-1">
                  Affiliation / Recognition
                </label>
                <input
                  type="text"
                  value={course.affiliation}
                  onChange={(e) => handleFieldChange(idx, "affiliation", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs font-semibold text-[#13264A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#13264A] dark:text-slate-300 mb-1">
                  Seats Intake
                </label>
                <input
                  type="text"
                  value={course.seats || ""}
                  onChange={(e) => handleFieldChange(idx, "seats", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs font-semibold text-[#13264A] dark:text-white"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#13264A] dark:text-slate-300 mb-1">
                  Eligibility Requirement
                </label>
                <textarea
                  rows={2}
                  value={course.eligibility}
                  onChange={(e) => handleFieldChange(idx, "eligibility", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs text-[#13264A] dark:text-white"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#13264A] dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={course.description}
                  onChange={(e) => handleFieldChange(idx, "description", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 text-xs text-[#13264A] dark:text-white"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

