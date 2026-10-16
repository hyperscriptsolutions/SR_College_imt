"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  X,
  Save,
} from "lucide-react";

interface SubjectItem {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  isPublished: boolean;
  sortOrder: number;
}

interface SemesterData {
  id: number;
  name: string;
  tagline: string;
  subjects: SubjectItem[];
}

export default function AdminCurriculumPage() {
  const [curriculum, setCurriculum] = useState<SemesterData[]>([]);
  const [selectedSemId, setSelectedSemId] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Subject Add/Edit Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectItem | null>(null);
  const [modalForm, setModalForm] = useState({
    code: "",
    title: "",
    category: "Core Foundations",
    description: "",
  });

  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<SubjectItem | null>(null);

  const loadCurriculum = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/curriculum");
      if (res.ok) {
        const data = await res.json();
        setCurriculum(data.curriculum);
      }
    } catch {
      setNotification({ type: "error", message: "Failed to load curriculum subjects." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCurriculum();
  }, []);

  const currentSemester = curriculum.find((s) => s.id === selectedSemId);

  const handleOpenAdd = () => {
    setEditingSubject(null);
    setModalForm({
      code: `DHLS-${selectedSemId}0${(currentSemester?.subjects.length || 0) + 1}`,
      title: "",
      category: "Core Foundations",
      description: "",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (subject: SubjectItem) => {
    setEditingSubject(subject);
    setModalForm({
      code: subject.code,
      title: subject.title,
      category: subject.category,
      description: subject.description,
    });
    setModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (editingSubject) {
      // Edit existing subject
      try {
        const res = await fetch("/api/admin/curriculum", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            semesterId: selectedSemId,
            subjectId: editingSubject.id,
            code: modalForm.code,
            title: modalForm.title,
            category: modalForm.category,
            description: modalForm.description,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setCurriculum(data.curriculum);
          setNotification({ type: "success", message: "Subject updated successfully." });
          setModalOpen(false);
        } else {
          setNotification({ type: "error", message: data.error || "Failed to update subject." });
        }
      } catch {
        setNotification({ type: "error", message: "Failed to communicate with server." });
      }
    } else {
      // Add new subject
      try {
        const res = await fetch("/api/admin/curriculum", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            semesterId: selectedSemId,
            code: modalForm.code,
            title: modalForm.title,
            category: modalForm.category,
            description: modalForm.description,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setCurriculum(data.curriculum);
          setNotification({ type: "success", message: "New subject added successfully." });
          setModalOpen(false);
        } else {
          setNotification({ type: "error", message: data.error || "Failed to add subject." });
        }
      } catch {
        setNotification({ type: "error", message: "Failed to add subject." });
      }
    }
  };

  const handleTogglePublish = async (subject: SubjectItem) => {
    try {
      const res = await fetch("/api/admin/curriculum", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          semesterId: selectedSemId,
          subjectId: subject.id,
          isPublished: !subject.isPublished,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurriculum(data.curriculum);
        setNotification({
          type: "success",
          message: `Subject ${!subject.isPublished ? "published" : "hidden from public view"}.`,
        });
      }
    } catch {
      setNotification({ type: "error", message: "Failed to change publication status." });
    }
  };

  const handleReorder = async (subject: SubjectItem, direction: "up" | "down") => {
    try {
      const res = await fetch("/api/admin/curriculum", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          semesterId: selectedSemId,
          subjectId: subject.id,
          moveDirection: direction,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCurriculum(data.curriculum);
      }
    } catch {
      setNotification({ type: "error", message: "Failed to reorder subjects." });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(
        `/api/admin/curriculum?semesterId=${selectedSemId}&subjectId=${deleteTarget.id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setCurriculum(data.curriculum);
        setNotification({ type: "success", message: `Subject "${deleteTarget.title}" deleted.` });
      } else {
        setNotification({ type: "error", message: data.error || "Failed to delete subject." });
      }
    } catch {
      setNotification({ type: "error", message: "Error deleting subject." });
    } finally {
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#2684FF]" />
        <span className="text-xs text-[#536B8E]">Loading curriculum editor...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Semesters & Subject Management
          </h1>
          <p className="text-xs sm:text-sm text-[#536B8E] mt-1">
            Configure the 18 semester-wise subjects, descriptions, order, and public visibility.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2684FF] hover:bg-[#1E74E8] shadow-md shadow-[#2684FF]/25 hover:shadow-lg transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject to {currentSemester?.name}</span>
        </button>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs ${
            notification.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Semester Switcher Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        {curriculum.map((sem) => (
          <button
            key={sem.id}
            onClick={() => setSelectedSemId(sem.id)}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedSemId === sem.id
                ? "bg-[#071B3D] dark:bg-[#2684FF] text-white shadow-md"
                : "bg-white dark:bg-[#0A1E3D] text-[#536B8E] hover:text-[#13264A] dark:hover:text-white border border-slate-200 dark:border-white/10"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{sem.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
              {sem.subjects.length} Subjects
            </span>
          </button>
        ))}
      </div>

      {/* Subjects Table & Card List */}
      <div className="rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">{currentSemester?.name} Syllabus</h3>
            <p className="text-xs text-[#536B8E]">{currentSemester?.tagline}</p>
          </div>
          <span className="text-xs text-[#536B8E]">
            {currentSemester?.subjects.length} total topics
          </span>
        </div>

        <div className="space-y-3">
          {currentSemester?.subjects.map((subj, idx) => (
            <div
              key={subj.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                subj.isPublished
                  ? "bg-slate-50/50 dark:bg-white/5 border-slate-200/80 dark:border-white/10"
                  : "bg-slate-100/40 dark:bg-white/[0.02] border-dashed border-slate-300 dark:border-white/10 opacity-70"
              }`}
            >
              {/* Left: Code, Title, Category */}
              <div className="flex items-start gap-3.5">
                <span className="text-xs font-mono font-bold text-slate-400 mt-1">
                  #{idx + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#2684FF] bg-[#2684FF]/10 px-2 py-0.5 rounded-md">
                      {subj.code}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/60 dark:bg-white/10 px-2 py-0.5 rounded-full">
                      {subj.category}
                    </span>
                    {!subj.isPublished && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-500/20 px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-[#13264A] dark:text-white">
                    {subj.title}
                  </h4>
                  <p className="text-xs text-[#536B8E] mt-1 line-clamp-1 max-w-xl">
                    {subj.description}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto flex-shrink-0">
                {/* Reorder Up */}
                <button
                  onClick={() => handleReorder(subj, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-20 hover:bg-slate-200/60 dark:hover:bg-white/10"
                  title="Move Up"
                  aria-label="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                {/* Reorder Down */}
                <button
                  onClick={() => handleReorder(subj, "down")}
                  disabled={idx === (currentSemester.subjects.length - 1)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-20 hover:bg-slate-200/60 dark:hover:bg-white/10"
                  title="Move Down"
                  aria-label="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Publish Toggle */}
                <button
                  onClick={() => handleTogglePublish(subj)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    subj.isPublished
                      ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/20"
                      : "text-slate-400 hover:bg-slate-200/60"
                  }`}
                  title={subj.isPublished ? "Publicly Visible (Click to Hide)" : "Hidden (Click to Publish)"}
                  aria-label="Toggle publication"
                >
                  {subj.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                {/* Edit */}
                <button
                  onClick={() => handleOpenEdit(subj)}
                  className="p-1.5 rounded-lg text-[#2684FF] hover:bg-[#2684FF]/10 transition-colors"
                  title="Edit Subject"
                  aria-label="Edit Subject"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => setDeleteTarget(subj)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 transition-colors"
                  title="Delete Subject"
                  aria-label="Delete Subject"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subject Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200 dark:border-[#29D7FF]/20 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10 mb-6">
              <h3 className="text-lg font-bold">
                {editingSubject ? "Edit Subject" : `Add Subject to ${currentSemester?.name}`}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-[#536B8E] uppercase tracking-wider">
                  Subject Code
                </label>
                <input
                  type="text"
                  required
                  value={modalForm.code}
                  onChange={(e) => setModalForm({ ...modalForm, code: e.target.value })}
                  placeholder="DHLS-101"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-[#536B8E] uppercase tracking-wider">
                  Subject Title
                </label>
                <input
                  type="text"
                  required
                  value={modalForm.title}
                  onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
                  placeholder="e.g. Auditory Acoustics"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-[#536B8E] uppercase tracking-wider">
                  Discipline Category
                </label>
                <select
                  value={modalForm.category}
                  onChange={(e) => setModalForm({ ...modalForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20 cursor-pointer"
                >
                  <option value="Core Foundations">Core Foundations</option>
                  <option value="Linguistic Articulation">Linguistic Articulation</option>
                  <option value="Biological Foundations">Biological Foundations</option>
                  <option value="Auditory Science">Auditory Science</option>
                  <option value="Visual-Gestural Language">Visual-Gestural Language</option>
                  <option value="Clinical Overview">Clinical Overview</option>
                  <option value="Social Integration">Social Integration</option>
                  <option value="Legal Frameworks">Legal Frameworks</option>
                  <option value="Academic Evaluation">Academic Evaluation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-[#536B8E] uppercase tracking-wider">
                  Subject Explanation / Learning Focus
                </label>
                <textarea
                  rows={3}
                  required
                  value={modalForm.description}
                  onChange={(e) => setModalForm({ ...modalForm, description: e.target.value })}
                  placeholder="Concise, verified description of what this subject covers..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#2684FF] hover:bg-[#1E74E8] shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingSubject ? "Update Subject" : "Add Subject"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200 dark:border-[#29D7FF]/20 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 text-rose-500 mb-4">
              <div className="p-3 rounded-2xl bg-rose-500/10">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#13264A] dark:text-white">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#536B8E] leading-relaxed mb-6">
              Are you sure you want to permanently delete the subject{" "}
              <strong className="text-[#13264A] dark:text-white font-semibold">
                &ldquo;{deleteTarget.title}&rdquo; ({deleteTarget.code})
              </strong>
              ? This action will immediately remove it from the public curriculum.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/25 transition-colors"
              >
                Yes, Delete Subject
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
